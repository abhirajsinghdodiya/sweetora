import { Sweet } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SweetCard({ sweet }: { sweet: Sweet }) {
  const addToCart = useStore((state) => state.addToCart);
  const { toast } = useToast();

  const isOutOfStock = sweet.stock === 0;

  const handleAdd = () => {
    addToCart(sweet);
    toast({
      title: "Added to cart",
      description: `${sweet.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-none shadow-md h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={sweet.image} 
          alt={sweet.name} 
          className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-70' : ''}`}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Badge variant="destructive" className="text-lg px-4 py-2">Out of Stock</Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-serif text-foreground dark:text-primary-foreground">{sweet.name}</CardTitle>
          <Badge variant="outline" className="font-mono text-xs">{sweet.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{sweet.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-primary">₹{sweet.price} <span className="text-sm font-normal text-muted-foreground">/ {sweet.unit}</span></span>
          <span className="text-xs text-muted-foreground">{sweet.stock} {sweet.unit}s left</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white" 
          onClick={handleAdd} 
          disabled={isOutOfStock}
        >
          <Plus className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
