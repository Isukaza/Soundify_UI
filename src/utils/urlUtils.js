export function parseUrl(url) {
    const urlObj = new URL(url);
    const path = urlObj.origin + urlObj.pathname.replace('//', '/').replace("*", '');
    const queryParams = urlObj.search;
    return {path, queryParams};
}