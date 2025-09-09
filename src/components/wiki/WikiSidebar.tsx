import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, Book, Search, Menu, Folder, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { getAllDocs, DocPage } from "@/data/docs";
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

interface WikiSidebarProps {
  currentDoc?: {
    title: string;
    category: string;
    slug: string;
  };
}

export function WikiSidebar({ currentDoc }: WikiSidebarProps) {
  const { open, setOpen } = useSidebar();
  const collapsed = !open;
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map(category => category.id) // Expand all categories by default
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filterPages = (pages: DocPage[]) => {
    if (!searchQuery) return pages;
    return pages.filter(page =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getNavClassName = (isActive: boolean) =>
    `flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
      isActive
        ? "bg-docs-accent text-white font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="docs-scrollbar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <button
            className="flex items-center gap-3 w-full text-left"
            onClick={() => window.location.href = "/docs"}
            aria-label="Go to main page"
          >
            <div className="w-8 h-8 rounded-lg bg-docs-accent flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-semibold text-sidebar-foreground">
                  {config.site.name}
                </h1>
                <p className="text-xs text-sidebar-foreground/60">
                  Documentation
                </p>
              </div>
            )}
          </button>
        </div>



        {/* Navigation */}
        <div className="flex-1 px-4 pb-4">
          {categories.map(category => {
            const isExpanded = expandedCategories.includes(category.id);
            const filteredPages = filterPages(category.pages);

            if (searchQuery && filteredPages.length === 0) return null;

            return (
              <SidebarGroup key={category.id} className="mb-4">
                <SidebarGroupLabel asChild>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`flex items-center w-full text-left px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors`}
                  >
                    <Folder className="w-4 h-4 mr-2 text-sidebar-foreground" />
                    {!collapsed && <span>{category.name}</span>}
                    {!collapsed && (
                      isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )
                    )}
                    {collapsed && (
                      <div className="w-2 h-2 rounded-full bg-docs-accent" />
                    )}
                  </button>
                </SidebarGroupLabel>

                {(isExpanded || collapsed) && (
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filteredPages.map(page => (
                        <SidebarMenuItem key={page.id} className="pl-6">
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={`/docs/${category.id}/${page.slug}`}
                              className={({ isActive }) => getNavClassName(isActive)}
                              title={collapsed ? page.title : undefined}
                            >
                              <FileText className="w-4 h-4 mr-2 text-sidebar-foreground" />
                              {collapsed ? (
                                <div className="w-2 h-2 rounded-full bg-sidebar-foreground/40" />
                              ) : (
                                <span>{page.title}</span>
                              )}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            );
          })}
        </div>


      </SidebarContent>
    </Sidebar>
  );
}