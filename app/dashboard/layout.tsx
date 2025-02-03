import type React from "react";
import { Toaster } from "react-hot-toast";
import { Book, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavItem from "@/components/modules/mainpage/navItem";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden w-64 flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg lg:flex">
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center gap-2 px-6 py-4">
            <Book className="h-8 w-8" />
            <span className="text-2xl font-bold">TravelAdmin</span>
          </div>
          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-2 py-4">
              <NavItem href="/dashboard" icon={Home} isActive>
                Dashboard
              </NavItem>
            </nav>
          </ScrollArea>
          <div className="mt-auto p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-100 hover:bg-blue-600 hover:text-white"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-white shadow-sm lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <Button variant="ghost" size="icon">
              <Book className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <h1 className="text-xl font-semibold">TravelAdmin</h1>
            <Button variant="ghost" size="icon">
              <LogOut className="h-6 w-6" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
