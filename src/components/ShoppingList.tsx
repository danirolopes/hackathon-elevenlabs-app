
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MissingIngredient {
  id: string;
  ingredient_name: string;
  status: string;
  created_at: string;
}

export const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<MissingIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMissingIngredients();
  }, []);

  const fetchMissingIngredients = async () => {
    try {
      const { data, error } = await supabase
        .from('missing_ingredients')
        .select('*')
        .eq('status', 'needed')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIngredients(data || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch ingredients"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeIngredient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('missing_ingredients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setIngredients(ingredients.filter(ing => ing.id !== id));
      toast({
        title: "Success",
        description: "Item removed from shopping list"
      });
    } catch (error) {
      console.error('Error removing ingredient:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not remove item"
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
        <CardTitle>Shopping List</CardTitle>
      </CardHeader>
      <CardContent>
        {ingredients.length === 0 ? (
          <p className="text-center text-gray-500">No ingredients needed</p>
        ) : (
          <ul className="space-y-2">
            {ingredients.map((ingredient) => (
              <li 
                key={ingredient.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <span className="flex-1">{ingredient.ingredient_name}</span>
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
