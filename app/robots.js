
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/ticket/",
      ],
    },
    sitemap: "https://ticket-desk-one.vercel.app/sitemap.xml",
  };
}
