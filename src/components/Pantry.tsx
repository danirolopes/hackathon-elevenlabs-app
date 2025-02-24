
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PantryIngredient {
  id: string;
  ingredient_name: string;
  quantity: number;
  unit: string;
}

const units = ['units', 'grams', 'kilograms', 'milliliters', 'liters', 'teaspoons', 'tablespoons', 'cups'];

export const Pantry = () => {
  const [ingredients, setIngredients] = useState<PantryIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newIngredient, setNewIngredient] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");
  const [selectedUnit, setSelectedUnit] = useState("units");
  const { toast } = useToast();

  useEffect(() => {
    fetchPantryIngredients();
  }, []);

  const fetchPantryIngredients = async () => {
    try {
      const { data, error } = await supabase
        .from('pantry_ingredients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIngredients(data || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch pantry ingredients"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeIngredient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pantry_ingredients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setIngredients(ingredients.filter(ing => ing.id !== id));
      toast({
        title: "Success",
        description: "Ingredient removed from pantry"
      });
    } catch (error) {
      console.error('Error removing ingredient:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not remove ingredient"
      });
    }
  };

  const addIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredient.trim() || !newQuantity) return;

    try {
      const { data, error } = await supabase
        .from('pantry_ingredients')
        .insert([
          {
            ingredient_name: newIngredient.trim(),
            quantity: parseFloat(newQuantity),
            unit: selectedUnit
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setIngredients([data, ...ingredients]);
      setNewIngredient("");
      setNewQuantity("1");
      setSelectedUnit("units");
      toast({
        title: "Success",
        description: "Ingredient added to pantry"
      });
    } catch (error) {
      console.error('Error adding ingredient:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add ingredient"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="mx-4 mt-4">
      <CardHeader>
        <CardTitle>My Pantry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addIngredient} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Add ingredient..."
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            min="0"
            step="0.1"
            className="w-24"
          />
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
        
        {ingredients.length === 0 ? (
          <p className="text-center text-gray-500">No ingredients in pantry</p>
        ) : (
          <ul className="space-y-2">
            {ingredients.map((ingredient) => (
              <li 
                key={ingredient.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <span className="flex-1">
                  {ingredient.ingredient_name} - {ingredient.quantity} {ingredient.unit}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeIngredient(ingredient.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
