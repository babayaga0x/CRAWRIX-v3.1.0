from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import ipaddress
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

app = Flask(__name__)
CORS(
    app,
    origins=[
        "http://localhost:5173",
        "https://crawllab-frontend.onrender.com",
        "https://crawrix.com",
        "https://www.crawrix.com",
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
        if hostname in ("localhost", "localhost.localdomain", "ip6-localhost"):
            return False
        try:
            ip = ipaddress.ip_address(hostname)
            if ip.is_private or ip.is_reserved or ip.is_loopback or ip.is_multicast:
                return False
        except ValueError:
            pass
        return True
    except Exception:
        return False

def fetch_url_safe(url, headers=None):
    if not headers:
        headers = {"User-Agent": "Mozilla/5.0"}
    if not is_safe_url(url):
        return None
    try:
        resp = session.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        return resp.text
    except:
        return None

def parse_bing(keyword):
    url = f"https://www.bing.com/search?q={keyword}"
    html = fetch_url_safe(url)
    if not html:
        return []
    soup = BeautifulSoup(html, "html.parser")
    links = [a.get("href") for a in soup.select("li.b_algo h2 a") if a.get("href") and is_safe_url(a.get("href"))]
    return links[:15]

def parse_yahoo(keyword):
    url = f"https://search.yahoo.com/search?p={keyword}"
    html = fetch_url_safe(url)
    if not html:
        return []
    soup = BeautifulSoup(html, "html.parser")
    links = [a.get("href") for a in soup.select("h3.title a") if a.get("href") and a.get("href").startswith("http") and is_safe_url(a.get("href"))]
    return links[:15]

def fetch_duckduckgo(keyword):
    url = f"https://api.duckduckgo.com/?q={keyword}&format=json&no_redirect=1"
    try:
        data = session.get(url, timeout=10).json()
        links = []
        if data.get("AbstractURL"):
            links.append(data["AbstractURL"])
        for topic in data.get("RelatedTopics", []):
            if isinstance(topic, dict) and "FirstURL" in topic:
                links.append(topic["FirstURL"])
        return [l for l in links if is_safe_url(l)][:15]
    except:
        return []

def fetch_wikipedia(keyword):
    url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={keyword}&format=json"
    try:
        data = session.get(url, timeout=10).json()
        links = [f"https://en.wikipedia.org/wiki/{item['title'].replace(' ', '_')}" for item in data.get("query", {}).get("search", []) if item.get("title")]
        return [l for l in links if is_safe_url(l)][:15]
    except:
        return []

def fetch_reddit(keyword):
    url = f"https://www.reddit.com/search.json?q={keyword}&limit=15"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        data = session.get(url, headers=headers, timeout=10).json()
        links = [post.get("data", {}).get("url") for post in data.get("data", {}).get("children", []) if post.get("data", {}).get("url") and is_safe_url(post.get("data", {}).get("url"))]
        return links[:15]
    except:
        return []

def fetch_qwant(keyword):
    url = f"https://api.qwant.com/v3/search/web?q={keyword}&count=15&t=web"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        data = session.get(url, headers=headers, timeout=10).json()
        links = [item.get("url") for item in data.get("data", {}).get("result", {}).get("items", []) if item.get("url") and is_safe_url(item.get("url"))]
        return links[:15]
    except:
        return []

def fetch_stackexchange(keyword):
    url = "https://api.stackexchange.com/2.3/search/advanced"
    params = {
        "order": "desc",
        "sort": "relevance",
        "q": keyword,
        "site": "stackoverflow",
        "pagesize": 15
    }
    try:
        data = session.get(url, params=params, timeout=10).json()
        links = [item.get("link") for item in data.get("items", []) if item.get("link") and is_safe_url(item.get("link"))]
        return links
    except:
        return []

@app.route("/parse", methods=["POST"])
@limiter.limit("10 per minute")
def parse():
    keywords = request.json.get("keywords", [])
    if not isinstance(keywords, list) or len(keywords) > 10:
        return jsonify({"error": "Keywords must be a list of max 10 items"}), 400

    results = []
    for keyword in keywords:
        if not isinstance(keyword, str) or len(keyword) > 50:
            return jsonify({"error": "Keywords must be strings <= 50 symbols"}), 400

        bing_links = parse_bing(keyword)
        yahoo_links = parse_yahoo(keyword)
        duck_links = fetch_duckduckgo(keyword)
        wiki_links = fetch_wikipedia(keyword)
        reddit_links = fetch_reddit(keyword)
        qwant_links = fetch_qwant(keyword)
        se_links = fetch_stackexchange(keyword)

        combined_links = list(set(
            bing_links + yahoo_links + duck_links + wiki_links +
            reddit_links + qwant_links + se_links
        ))[:15]

        results.append({"keyword": keyword, "links": combined_links})

    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
