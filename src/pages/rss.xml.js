import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return rss({
    title: "AurelionLabs — Notlar",
    description: "Burak Taş: AI, otonom sistemler ve tarım teknolojileri üzerine notlar.",
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((p) => ({
        title: p.data.title,
        description: p.data.description,
        pubDate: p.data.date,
        link: `/blog/${p.slug}/`,
      })),
  });
}
