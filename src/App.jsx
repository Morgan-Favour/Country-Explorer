import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Countries from "./components/Countries";
import { useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      <main>
        <Hero 
        searchInput={searchInput} 
        setSearchInput={setSearchInput}
        setQuery={setQuery} />
        <Countries query={query} />
      </main>

      <Footer />
    </div>
  );
}

export default App;