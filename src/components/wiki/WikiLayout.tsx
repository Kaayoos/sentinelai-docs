import { SidebarProvider } from "@/components/ui/sidebar";
import { WikiSidebar } from "./WikiSidebar";
import { WikiHeader } from "./WikiHeader";
import { TableOfContents } from "./TableOfContents";
import { ReactNode } from "react";

interface WikiLayoutProps {
  children: ReactNode;
  currentDoc?: {
    title: string;
    category: string;
    slug: string;
  };
}

export function WikiLayout({ children, currentDoc }: WikiLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-docs-bg">
        <WikiSidebar currentDoc={currentDoc} />
        
        <div className="flex-1 flex flex-col">
          <WikiHeader />
          
          <div className="flex-1 flex">
            <main className="flex-1 p-6 lg:pr-0 overflow-auto docs-scrollbar">
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </main>
            
            <aside className="hidden lg:block w-64 p-6 bg-docs-content border-l border-docs-border">
              <TableOfContents />
            </aside>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}