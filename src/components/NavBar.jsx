
import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Globe2 size={21} />
          </div>

          <span className="text-lg font-bold tracking-tight">
            Country<span className="text-primary">Explorer</span>
          </span>
        </a>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            render={<a href="#home" />}
            nativeButton={false}
          >
            Home
          </Button>

          <Button
            variant="ghost"
            render={<a href="#explore" />}
            nativeButton={false}
          >
            Explore
          </Button>

          <Button
            variant="ghost"
            render={<a href="#about" />}
            nativeButton={false}
          >
            About
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
