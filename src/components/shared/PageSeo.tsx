import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPageSeo, SITE_URL } from "@/lib/seo";

export default function PageSeo() {
  const { pathname } = useLocation();
  const page = getPageSeo(pathname);
  const url = `${SITE_URL}${page.path}`;
  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={page.indexable ? "index, follow" : "noindex, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
    </Helmet>
  );
}