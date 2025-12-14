import { useStore } from "@/lib/store";
import { SweetCard } from "@/components/sweet-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  const sweets = useStore((state) => state.sweets);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", ...new Set(sweets.map(s => s.category))];

  const filteredSweets = sweets
    .filter(sweet => sweet.name.toLowerCase().includes(search.toLowerCase()) || sweet.description.toLowerCase().includes(search.toLowerCase()))
    .filter(sweet => category === "all" || sweet.category === category)
    .sort((a, b) => {
      // Sort out of stock to last
      if (a.stock === 0 && b.stock > 0) return 1;
      if (a.stock > 0 && b.stock === 0) return -1;
      return 0;
    });

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-12 bg-secondary/30 rounded-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">Sweetora</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Authentic Indian sweets made with love, tradition, and pure ingredients. 
          Experience the taste of royalty.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-40 bg-background/95 p-4 rounded-xl border shadow-sm backdrop-blur">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for sweets..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(c => (
              <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSweets.map((sweet) => (
          <SweetCard key={sweet.id} sweet={sweet} />
        ))}
      </div>

      {filteredSweets.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">No sweets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
