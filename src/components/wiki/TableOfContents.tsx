import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let headings: NodeListOf<HTMLElement> = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const updateToc = () => {
      headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const tocItems: TocItem[] = [];
      headings.forEach((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
        if (id && !heading.closest(".toc-ignore")) {
          if (!heading.id) heading.id = id;
          tocItems.push({
            id,
            text: heading.textContent || "",
            level: parseInt(heading.tagName.charAt(1)),
          });
        }
      });
      setToc(tocItems);

      // Clean up previous observer
      if (observer) {
        headings.forEach((heading) => {
          if (heading.id) observer!.unobserve(heading);
        });
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-20% 0% -80% 0%",
        }
      );
      headings.forEach((heading) => {
        if (heading.id) observer!.observe(heading);
      });
    };

    updateToc();

    // Watch for DOM changes to update TOC
    mutationObserver = new MutationObserver(() => {
      updateToc();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observer) {
        headings.forEach((heading) => {
          if (heading.id) observer!.unobserve(heading);
        });
        observer.disconnect();
      }
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [location]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-20">
      <div className="pb-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">
          On this page
        </h4>
        <nav className="space-y-1">
          {toc
            .filter(item => item.text !== "On this page")
            .filter(item => item.text.includes("page(s)") === false)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "block w-full text-left text-sm py-1 px-2 rounded transition-colors hover:bg-docs-border/50",
                  item.level === 1 && "font-medium",
                  item.level === 2 && "ml-2",
                  item.level === 3 && "ml-4 text-muted-foreground",
                  item.level >= 4 && "ml-6 text-muted-foreground",
                  activeId === item.id
                    ? "text-docs-accent bg-docs-border/30 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.text}
              </button>
            ))}
        </nav>
      </div>
    </div>
  );
}