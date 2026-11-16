
import { Globe2 } from "lucide-react";

function Footer() {
  return (
    <footer id="about" className="border-t bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <a href="#home" className="flex items-center gap-2">
          <Globe2 size={19} className="text-primary" />

          <span className="font-bold">
            Country<span className="text-primary">Explorer</span>
          </span>
        </a>

        <p className="text-center text-sm text-muted-foreground">
          Discover the world, one country at a time.
        </p>

        <p className="text-xs text-muted-foreground">
          Built with React & REST Countries API
        </p>
      </div>
    </footer>
  );
}

export default Footer;
