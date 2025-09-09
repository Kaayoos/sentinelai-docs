import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { WikiLayout } from "@/components/wiki/WikiLayout";
import { MarkdownRenderer } from "@/components/wiki/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllDocs } from "@/data/docs";
import { TableOfContents } from "@/components/wiki/TableOfContents";

const allDocs = getAllDocs();
const categories = allDocs.reduce((acc, doc) => {
  const category = acc.find(cat => cat.id === doc.category);
  if (category) {
    category.pages.push(doc);
  } else {
    acc.push({
      id: doc.category,
      name: doc.category, // Replace with actual category name if available
      description: "", // Replace with actual description if available
      pages: [doc]
    });
  }
  return acc;
}, []);

export default function DocsPage() {
  const { category, slug } = useParams();

  if (!category || !slug) {
    return <Navigate to="/docs/Getting%20Started/introduction" replace />;
  }

  const categoryData = categories.find(cat => cat.id === category);

  if (!categoryData) {
    return <Navigate to="/docs/Getting%20Started/introduction" replace />;
  }

  const doc = categoryData.pages.find(page => page.slug === slug);

  if (!doc) {
    return <Navigate to="/docs/Getting%20Started/introduction" replace />;
  }

  // Find previous and next pages
  const allPages = categoryData.pages.sort((a, b) => a.order - b.order);
  const currentIndex = allPages.findIndex(page => page.slug === slug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const [resolvedContent, setResolvedContent] = useState<string>("");
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (doc && typeof doc.content === "function") {
        const content = await doc.content();
        if (isMounted) setResolvedContent(content);
      } else if (doc && typeof doc.content === "string") {
        setResolvedContent(doc.content);
      }
    })();
    return () => { isMounted = false; };
  }, [doc]);

  return (

      
      <WikiLayout currentDoc={{ title: doc.title, category, slug }}>
        <article className="min-h-screen">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <span>Docs</span>
          <ChevronRight className="w-4 h-4" />
          <span>{categoryData.name}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{doc.title}</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
              <Badge variant="secondary">{categoryData.name}</Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              {categoryData.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-docs-content rounded-lg border border-docs-border p-8">
          <MarkdownRenderer content={resolvedContent} />
          
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between mt-8 pt-8 border-t border-docs-border">
          <div className="flex-1">
            {prevPage && (
              <Button variant="ghost" asChild className="p-0 h-auto">
                <a href={`/docs/${category}/${prevPage.slug}`} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">Previous</div>
                    <div className="font-medium">{prevPage.title}</div>
                  </div>
                </a>
              </Button>
            )}
          </div>
          
          <div className="flex-1 flex justify-end">
            {nextPage && (
              <Button variant="ghost" asChild className="p-0 h-auto">
                <a href={`/docs/${category}/${nextPage.slug}`} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted transition-colors">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Next</div>
                    <div className="font-medium">{nextPage.title}</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </Button>
            )}
          </div>
        </nav>
        
      </article>

    </WikiLayout>

  );
}