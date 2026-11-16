import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import fetchCountries from "@/data/index.js";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function Countries({query}) {
  const limit = 25;

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  


  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await fetchCountries(limit, 0, query);
        const newCountries = result?.data?.objects ?? [];

        setCountries(newCountries);
        setOffset(newCountries.length);
        setHasMore(result?.data?.meta?.more ?? false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    getCountries();
  }, [query]);

  const loadMoreCountries = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    try {
      const result = await fetchCountries(limit, offset, query);
      const newCountries = result?.data?.objects ?? [];

      setCountries((prevCountries) => [
        ...prevCountries,
        ...newCountries,
      ]);

      setOffset((prevOffset) => prevOffset + newCountries.length);
      setHasMore(result?.data?.meta?.more ?? false);
    } catch (error) {
      console.error("Error fetching more countries:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const formatPopulation = (population) => {
    if (population == null) return "N/A";

    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "long",
      maximumFractionDigits: 1,
    }).format(population);
  };

  return (
    <section
      id="explore"
      className="mx-auto max-w-7xl px-5 pb-20 sm:px-8"
    >
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Discover
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Explore countries
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Browse countries and discover what makes each one unique.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {countries.length} countries
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="flex flex-col justify-between rounded-xl border border-border/50 bg-card p-6 shadow-sm animate-pulse h-[380px]"
            >
              {/* Image skeleton */}
              <div className="h-48 w-full bg-muted rounded-lg mb-4"></div>

              {/* Title & badge skeleton */}
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-1/2 bg-muted rounded"></div>
                <div className="h-5 w-16 bg-muted rounded-full"></div>
              </div>

              {/* Content line skeletons */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/60 rounded"></div>
                <div className="h-4 w-3/4 bg-muted/60 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Countries Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <Card
                key={country.names.common}
                className="group overflow-hidden gap-0 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden bg-muted">
                  <img
                    src={country.flag.url_png}
                    alt={`${country.names.common} flag`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <CardHeader className="pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg">
                      {country.names.common}
                    </CardTitle>

                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {country.region}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Capital</span>
                    <span className="text-right font-medium">
                      {country.capitals[0]?.name ?? "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Currency</span>
                    <span className="text-right font-medium">
                      {country.currencies[0]?.code ?? "N/A"} ({country.currencies[0]?.symbol ?? "N/A"})
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">Population</span>
                    <span className="text-right font-medium">
                      {formatPopulation(country.population)}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button variant="outline" className="w-full">
                    Explore country
                    <ArrowUpRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <Button
                onClick={loadMoreCountries}
                disabled={loadingMore}
                size="lg"
                className="px-8"
              >
                {loadingMore ? "Loading more countries..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Countries;