export interface DocPage {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: () => Promise<string>;
  order: number;
}

export interface DocCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  pages: DocPage[];
}

const categories: DocCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Get started with SentinelAI, learn basics about it and the docs.",
    order: 1,
    pages: [
      {
        id: "docs-introduction",
        title: "Introduction",
        slug: "introduction",
        category: "Getting Started",
        order: 1,
        content: async () => (await import("./markdown/introduction.md?raw")).default,
      },
      {
        id: "premium",
        title: "Premium",
        slug: "premium",
        category: "Getting Started",
        order: 2,
        content: async () => (await import("./markdown/premium.md?raw")).default,
      },
    ],
  },
  {
    id: "aimoderation",
    name: "AI Moderation",
    description: "Learn how to implement AI moderation in your applications.",
    order: 2,
    pages: [
      {
        id: "docs-ai-moderation-overview",
        title: "AI Moderation Overview",
        slug: "ai-moderation-overview",
        category: "AI Moderation",
        order: 1,
        content: async () => (await import("./markdown/aimoderation/aimoderation.md?raw")).default,
      },
      {
        id: "ai-rules",
        title: "AI Rules Overview",
        slug: "ai-rules",
        category: "AI Moderation",
        order: 2,
        content: async () => (await import("./markdown/aimoderation/ai-rules.md?raw")).default,
      }
    ],
  }
];

export function getDocBySlug(category: string, slug: string): DocPage | undefined {
  const categoryData = categories.find((cat) => cat.id === category);
  return categoryData?.pages.find((page) => page.slug === slug);
}

export function getAllDocs(): DocPage[] {
  return categories.flatMap((category) => category.pages);
}