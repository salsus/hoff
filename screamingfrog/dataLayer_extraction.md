# Using ScreamingFrog for dataLayer

Check Rendering: Spider > Rendering > Javascript

Configure Extraction: Configuration > Crawl Config > Custom > Custom Javascript > Add Snippet


## Custom Javascript Extraction

Paste this into the JS for the extraction

```
var sh = seoSpider;
if (!window.dataLayer || !Array.isArray(window.dataLayer))
{
sh.data({scrape_status: '(no dataLayer)'});
return;
}
return sh.data(window.dataLayer);
```


## Output

format:

| Address | Content Type | Status Code | Status | Snippet 1 1 | Snippet 1 2 | Snippet 1 3 | Snippet 1 4 |
