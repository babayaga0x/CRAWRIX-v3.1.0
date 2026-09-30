import ipaddress
import base64
import requests
import httpx
import asyncio
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from bs4 import BeautifulSoup
from utils.normalizer import normalize_links, detect_source
from urllib.parse import urlparse, parse_qs


app = Flask(__name__)

CORS(
    app,
    origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "https://crawllab-frontend.onrender.com",
    ],
)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["10 per minute"],
    storage_uri="memory://",
)

session = requests.Session()


@app.route("/ping")
def ping():
    return "pong", 200


@app.before_request
def redirect_www_to_root():
    host = request.host
    if host.startswith("www."):
        url = request.url.replace("//www.", "//", 1)
        return redirect(url, code=301)


def is_safe_url(url: str) -> bool:
    try:
        parsed = urlparse(url)

        if parsed.scheme not in ("http", "https"):
            return False

        hostname = parsed.hostname

        if not hostname:
            return False

        if hostname in (
            "localhost",
            "localhost.localdomain",
            "ip6-localhost",
        ):
            return False

        try:
            ip = ipaddress.ip_address(hostname)

            if (
                ip.is_private
                or ip.is_reserved
                or ip.is_loopback
                or ip.is_multicast
            ):
                return False

        except ValueError:
            pass

        return True

    except Exception:
        return False


#АСИНХРОННАЯ ФУНКЦИЯ (банка)________________________________________
async def fetch_url_safe_async(url, headers=None):


    if not headers:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

    if not is_safe_url(url):
        return None

    try:
        async with httpx.AsyncClient(timeout=3) as client:
            resp = await client.get(
                url,
                headers=headers
            )
            resp.raise_for_status()

            return resp.text

    except httpx.TimeoutException:
        return None

    except Exception:
        return None
#___________________________________________________________

#парсим бинг асинхронка________________________________________________
async def parse_bing(keyword):
    url = f"https://www.bing.com/search?q={keyword}"

    html = await fetch_url_safe_async(url)

    if not html:
        return []

    soup = BeautifulSoup(html, "html.parser")

    results = []

    for result in soup.select("li.b_algo"):
        a = result.select_one("h2 a")

        if not a:
            continue

        href = a.get("href")

        if not href:
            continue

        cleaned = clean_bing_url(href)

        if not cleaned or not is_safe_url(cleaned):
            continue

        title = a.get_text(strip=True)

        snippet_element = result.select_one(".b_caption p")
        snippet = (
            snippet_element.get_text(" ", strip=True)
            if snippet_element
            else ""
        )

        results.append({
            "url": cleaned,
            "title": title,
            "snippet": snippet,
            "source": "bing",
        })

    return results[:15]
#чистим ссылки бинга_______________________________________
def clean_bing_url(url):
    try:
        parsed = urlparse(url)

        if "bing.com" in parsed.netloc and "/ck/a" in parsed.path:
            params = parse_qs(parsed.query)

            if "u" in params:
                encoded_url = params["u"][0]

                if encoded_url.startswith("a1"):
                    encoded_url = encoded_url[2:]

                decoded = base64.b64decode(encoded_url + "==").decode("utf-8")

                if is_safe_url(decoded):
                    return decoded
        return url
    except Exception:
        return None
#парсим яху_______________________________________________
async def parse_yahoo(keyword):
    url = f"https://search.yahoo.com/search?p={keyword}"

    html = await fetch_url_safe_async(url)

    if not html:
        return []

    soup = BeautifulSoup(html, "html.parser")

    links = [
        a.get("href")
        for a in soup.select("h3.title a")
        if a.get("href")
        and a.get("href").startswith("http")
        and is_safe_url(a.get("href"))
    ]

    return links[:15]

#_____________________________________________________
#duckduckgo_______________________________________________
async def fetch_duckduckgo(keyword):
    url = (
        f"https://api.duckduckgo.com/"
        f"?q={keyword}&format=json&no_redirect=1"
    )

    html = await fetch_url_safe_async(url)

    try:
        data = session.get(
            url,
            timeout=3
        ).json()

        links = []

        if data.get("AbstractURL"):
            links.append(data["AbstractURL"])

        for topic in data.get("RelatedTopics", []):
            if isinstance(topic, dict) and "FirstURL" in topic:
                links.append(topic["FirstURL"])

        return [
            link
            for link in links
            if is_safe_url(link)
        ][:15]

    except Exception:
        return []
#wikipedia____________________________________________
async def fetch_wikipedia(keyword):
    url = (
        "https://en.wikipedia.org/w/api.php"
        f"?action=query&list=search"
        f"&srsearch={keyword}"
        f"&format=json"
    )

    html = await fetch_url_safe_async(url)

    try:
        data = session.get(
            url,
            timeout=3
        ).json()

        links = [
            f"https://en.wikipedia.org/wiki/"
            f"{item['title'].replace(' ', '_')}"
            for item in data.get("query", {}).get("search", [])
            if item.get("title")
        ]

        return [
            link
            for link in links
            if is_safe_url(link)
        ][:15]

    except Exception:
        return []

#reddit____________________________________________
async def fetch_reddit(keyword):
    url = (
        f"https://www.reddit.com/search.json"
        f"?q={keyword}&limit=15"
    )

    html = await fetch_url_safe_async(url)

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        data = session.get(
            url,
            headers=headers,
            timeout=3
        ).json()

        links = [
            post.get("data", {}).get("url")
            for post in data.get("data", {}).get("children", [])
            if post.get("data", {}).get("url")
            and is_safe_url(
                post.get("data", {}).get("url")
            )
        ]

        return links[:15]

    except Exception:
        return []
#____________________________________
#qwant_______________________________
async def fetch_qwant(keyword):
    url = (
        f"https://api.qwant.com/v3/search/web"
        f"?q={keyword}&count=15&t=web"
    )

    html = await fetch_url_safe_async(url)

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        data = session.get(
            url,
            headers=headers,
            timeout=3
        ).json()

        links = [
            item.get("url")
            for item in data.get("data", {})
            .get("result", {})
            .get("items", [])
            if item.get("url")
            and is_safe_url(item.get("url"))
        ]

        return links[:15]

    except Exception:
        return []


async def fetch_stackexchange(keyword):
    url = "https://api.stackexchange.com/2.3/search/advanced"

    html = await fetch_url_safe_async(url)

    params = {
        "order": "desc",
        "sort": "relevance",
        "q": keyword,
        "site": "stackoverflow",
        "pagesize": 15,
    }

    try:
        data = session.get(
            url,
            params=params,
            timeout=3
        ).json()

        links = [
            item.get("link")
            for item in data.get("items", [])
            if item.get("link")
            and is_safe_url(item.get("link"))
        ]

        return links

    except Exception:
        return []

def merge_results(results):
    merged = {}

    for result in results:
        if isinstance(result, str):
            result = {
                "url": result
            }

        url = result["url"]

        if url not in merged:
            merged[url] = {
                "url": url,
                "title": result.get("title", ""),
                "snippets": [],
                "sources": [],
            }

        if result.get("snippet"):
            merged[url]["snippets"].append(result["snippet"])

        if result.get("source"):
            merged[url]["sources"].append(result["source"])

    return list(merged.values())

@app.route("/parse", methods=["POST"])
@limiter.limit("10 per minute")
async def parse():

    data = request.get_json() or {}

    keywords = data.get("keywords", [])

    if not isinstance(keywords, list) or len(keywords) > 10:
        return jsonify(
            {
                "error": "Keywords must be a list of max 10 items"
            }
        ), 400

    results = []

    for keyword in keywords:

        if (
            not isinstance(keyword, str)
            or len(keyword) > 50
        ):
            return jsonify(
                {
                    "error": "Keywords must be strings <= 50 symbols"
                }
            ), 400

        (
            bing_links,
            yahoo_links,
            duck_links,
            wiki_links,
            reddit_links,
            qwant_links,
            se_links,
        ) = await asyncio.gather(
            parse_bing(keyword),
            parse_yahoo(keyword),
            fetch_duckduckgo(keyword),
            fetch_wikipedia(keyword),
            fetch_reddit(keyword),
            fetch_qwant(keyword),
            fetch_stackexchange(keyword),
        )

        bing_links = [
            {
                **item,
                "url": normalize_links([item["url"]])[0]
            }
            for item in bing_links
        ]

        yahoo_links = normalize_links(yahoo_links)
        duck_links = normalize_links(duck_links)
        wiki_links = normalize_links(wiki_links)
        reddit_links = normalize_links(reddit_links)
        qwant_links = normalize_links(qwant_links)
        se_links = normalize_links(se_links)

        combined_links = merge_results(
            bing_links
            + yahoo_links
            + duck_links
            + wiki_links
            + reddit_links
            + qwant_links
            + se_links
        )

        for link in combined_links:
            link["type"] = detect_source(link["url"])

        results.append(
            {
                "keyword": keyword,
                "links": combined_links,
            }
        )

    return jsonify(results)


if __name__ == "__main__":
    app.run(
        host="0.0.0.0"
    )
