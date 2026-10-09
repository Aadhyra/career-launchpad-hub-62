# Architecture Decisions

- Vite deduplicates React and React DOM and prebundles their entry points with Helmet to prevent mixed React hook dispatchers after dependency updates.

- Public page search metadata is centralized in src/lib/seo.ts and rendered through one Helmet provider; the sitemap uses that public-page allowlist so account and operational pages are excluded.
- Keep static sitewide social metadata in index.html as a non-JavaScript crawler fallback; route-specific metadata is client-rendered and does not provide per-page social previews.

- Super Admin operational counters and reports read directly from Lovable Cloud tables and subscribe to live changes, so application, enrollment, and job updates appear without placeholder data.