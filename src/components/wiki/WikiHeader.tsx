import { useState } from "react";
import { Search, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { getAllDocs } from "@/data/docs";
import { useNavigate } from "react-router-dom";
import config from "@/config.json";

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

const allPages = categories.flatMap(category =>
  category.pages.map(page => ({ ...page, categoryName: category.name }))
);

export function WikiHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSelect = (category: string, slug: string) => {
    navigate(`/docs/${category}/${slug}`);
    setSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-docs-border bg-docs-content/95 backdrop-blur supports-[backdrop-filter]:bg-docs-content/60">
        <div className="flex h-14 items-center px-6">
          <div className="flex flex-1 items-center justify-between">
            {/* Left side - Breadcrumbs could go here */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
              >
                <Search className="mr-2 h-4 w-4" />
                Search docs...
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>

            {/* Right side - Links */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/Kaayoos/sentinelai-docs"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 w-8 px-0"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {categories.map(category => (
            <CommandGroup key={category.id} heading={category.name}>
              {category.pages.map(page => (
                <CommandItem
                  key={page.id}
                  onSelect={() => handleSearchSelect(category.id, page.slug)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span>{page.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.name}
                    </Badge>
                  </div>
                  <ExternalLink className="h-3 w-3" />
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}