
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MissingIngredient {
  id: string;
  ingredient_name: string;
  status: string;
  created_at: string;
}

export const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<MissingIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
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
                className="flex items-center py-2 border-b last:border-b-0"
              >
                <span className="flex-1">{ingredient.ingredient_name}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
