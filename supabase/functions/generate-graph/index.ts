
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipe_name, ingredients, steps } = await req.json();

    if (!recipe_name || !ingredients || !steps) {
      throw new Error('Missing required fields: recipe_name, ingredients, or steps');
    }

    console.log('Generating graph for recipe:', recipe_name);
    console.log('Ingredients:', ingredients);
    console.log('Steps:', steps);

    // Here you would implement the actual graph generation logic
    // For now, we'll just return a success message
    const response = {
      success: true,
      message: 'Graph generated successfully',
      recipe_name,
      graph_data: {
        // Add your graph data structure here
      }
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating graph:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
