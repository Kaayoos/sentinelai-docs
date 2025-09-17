import React, { useEffect, useState } from "react";
import { WikiLayout } from "@/components/wiki/WikiLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getAllDocs } from "@/data/docs";
import config from "@/config.json";

const categories = getAllDocs().reduce((acc, doc) => {
  const category = acc.find(cat => cat.id === doc.category);
  if (category) {
    category.pages.push(doc);
  } else {
    acc.push({
      id: doc.category,
      name: doc.category,
      description: "",
      pages: [doc]
    });
  }
  return acc;
}, [] as Array<{ id: string; name: string; description: string; pages: any[] }>);

export default function DocsHome() {
  const [categoriesWithContent, setCategoriesWithContent] = useState(categories);

  const [loadedContent, setLoadedContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchContent = async () => {
      const contentMap: Record<string, string> = {};

      for (const category of categories) {
        for (const page of category.pages) {
          try {
            const content = await page.content();
            contentMap[`${category.id}-${page.id}`] = content;
          } catch (error) {
            console.error(`Failed to load content for ${page.id}:`, error);
            contentMap[`${category.id}-${page.id}`] = "Failed to load content";
          }
        }
      }

      setLoadedContent(contentMap);
    };

    fetchContent();
  }, []);



  return (
    <WikiLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="text-center py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Welcome to {config.site.name} Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A guide to help you get started with everything you need to know about SentinelAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild>
                <a href="/docs/Getting%20Started/introduction">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://github.com/Kaayoos/sentinelai-docs" target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>



        {/* Documentation Categories */}
        <div className="py-16 px-4 bg-docs-content">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Documentation</h2>
              <p className="text-muted-foreground text-lg">
                Explore our comprehensive guides and references
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesWithContent.map((category) => (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-200 ease-in-out hover:translate-y-[-2px] border-docs-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground/90 mt-1.5 line-clamp-2">
                          {category.description || `Collection of ${category.pages.length} documentation page${category.pages.length !== 1 ? 's' : ''}`}
                        </CardDescription>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge variant="secondary" className="text-xs font-medium py-1 px-2.5 bg-muted/80 text-muted-foreground hover:bg-muted/90 transition-colors">
                          {category.pages.length} page{category.pages.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <ul className="space-y-2">
                      {category.pages.slice(0, 3).map((page) => {
                        const content = loadedContent[`${category.id}-${page.id}`];
                        const rawPreview = content ? content.split('\n')[0].replace('#', '').trim() : 'Loading...';
                        const contentPreview = rawPreview.length > 80 ? rawPreview.substring(0, 77) + '...' : rawPreview;

                        return (
                          <li key={page.id}>
                            <a
                              href={`/docs/${category.id}/${page.slug}`}
                              className="block w-full rounded-lg px-4 py-3 hover:bg-muted/60 transition-all duration-200 text-left border border-transparent hover:border-border/40"
                            >
                              <div className="flex flex-col gap-1">
                                <div className="font-medium text-sm">{page.title}</div>
                                <div className="text-xs text-muted-foreground/80 line-clamp-1">{contentPreview}</div>
                              </div>
                            </a>
                          </li>
                        );
                      })}
                    </ul>

                    {category.pages.length > 3 && (
                      <div className="pt-2">
                        <a
                          href={`/docs/${category.id}/${category.pages[0].slug}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-docs-accent/90 hover:text-docs-accent transition-colors hover:underline"
                        >
                          View all {category.pages.length} pages
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WikiLayout>
  );
}