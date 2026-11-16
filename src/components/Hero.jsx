import { Globe2, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Hero({ searchInput, setSearchInput, setQuery }) {
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput.trim());
  };

  return (
    <section id="home" className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
          <Globe2 size={16} className="text-primary" />
          Discover the world, one country at a time
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Explore the world
          <span className="block text-primary">without boundaries.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Discover countries, explore cultures and learn interesting
          facts about every corner of the world.
        </p>
      </div>

      {/* Search and filter */}
      <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
        
        {/* Search Form Box */}
        <form 
          onSubmit={handleSearch}
          className="flex flex-1 items-center gap-3 rounded-xl border bg-card px-4 py-2 shadow-sm"
        >
          <Search size={19} className="shrink-0 text-muted-foreground" />

          <Input
            type="text"
            placeholder="Search for a country..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none"
          />

          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        <button className="flex h-12 items-center justify-center gap-2 rounded-xl border bg-card px-5 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
          <SlidersHorizontal size={17} />
          Filter by region
        </button>
      </div>
    </section>
  );
}

export default Hero;