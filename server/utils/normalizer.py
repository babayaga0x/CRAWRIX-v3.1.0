from urllib.parse import urlparse, parse_qs, urlunparse
import base64

def detect_source(url):
    domain = urlparse(url).netloc.lower()

    if "stackoverflow.com" in domain or "stackexchange.com" in domain:
        return "technical"

    if "reddit.com" in domain:
        return "discussion"

    if "wikipedia.org" in domain:
        return "knowledge"

    if "news" in domain:
        return "news"

    return "general"

def normalize_url(url):
    parsed = urlparse(url)

    return urlunparse((
        parsed.scheme,
        parsed.netloc.lower(),
        parsed.path.rstrip("/"),
        "",
        parsed.query,
        ""
    ))


def normalize_links(links):
    results = []
    seen = set()

    for link in links:
        normalized = normalize_url(link)

        if normalized in seen:
            continue

        seen.add(normalized)
        results.append(normalized)

    return results
