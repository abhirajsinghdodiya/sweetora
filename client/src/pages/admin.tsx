import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { user, sweets, deleteSweet, updateStock, addSweet } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [newSweet, setNewSweet] = useState({
    name: "",
    price: "",
    unit: "kg",
    image: "",
    stock: "",
    description: "",
    category: ""
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      setLocation('/auth');
      toast({ variant: "destructive", title: "Unauthorized", description: "Admin access required" });
    }
  }, [user, setLocation]);

  const handleAdd = () => {
    addSweet({
      name: newSweet.name,
      price: Number(newSweet.price),
      unit: newSweet.unit as 'kg' | 'piece',
      image: newSweet.image || "https://placehold.co/400",
      stock: Number(newSweet.stock),
      description: newSweet.description,
      category: newSweet.category
    });
    setIsAddOpen(false);
    setNewSweet({ name: "", price: "", unit: "kg", image: "", stock: "", description: "", category: "" });
    toast({ title: "Success", description: "New sweet added to inventory" });
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold">Inventory Management</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add New Sweet</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sweet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input value={newSweet.name} onChange={e => setNewSweet({...newSweet, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" value={newSweet.price} onChange={e => setNewSweet({...newSweet, price: e.target.value})} />
                </div>
                <div className="grid gap-2">
                  <Label>Stock</Label>
                  <Input type="number" value={newSweet.stock} onChange={e => setNewSweet({...newSweet, stock: e.target.value})} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Unit</Label>
                <Input value={newSweet.unit} onChange={e => setNewSweet({...newSweet, unit: e.target.value})} placeholder="kg or piece" />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input value={newSweet.category} onChange={e => setNewSweet({...newSweet, category: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input value={newSweet.description} onChange={e => setNewSweet({...newSweet, description: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label>Image URL</Label>
                <Input value={newSweet.image} onChange={e => setNewSweet({...newSweet, image: e.target.value})} />
              </div>
              <Button onClick={handleAdd}>Save Sweet</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sweets.map((sweet) => (
              <TableRow key={sweet.id}>
                <TableCell>
                  <img src={sweet.image} alt={sweet.name} className="h-10 w-10 rounded object-cover" />
                </TableCell>
                <TableCell className="font-medium">{sweet.name}</TableCell>
                <TableCell>{sweet.category}</TableCell>
                <TableCell>₹{sweet.price} / {sweet.unit}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateStock(sweet.id, Math.max(0, sweet.stock - 1))}>-</Button>
                    <span className="w-8 text-center">{sweet.stock}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateStock(sweet.id, sweet.stock + 1)}>+</Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteSweet(sweet.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
