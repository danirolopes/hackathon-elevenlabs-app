
import { ConvAI } from "@/components/ConvAI";
import { BottomNav } from "@/components/BottomNav";
import { ShoppingList } from "@/components/ShoppingList";
import { Pantry } from "@/components/Pantry";
import { useState } from "react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'pantry' | 'cook' | 'shopping'>('cook');

  const renderView = () => {
    switch (currentView) {
      case 'pantry':
        return <Pantry />;
      case 'cook':
        return <ConvAI />;
      case 'shopping':
        return <ShoppingList />;
      default:
        return <ConvAI />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-16">
      <div className="max-w-md mx-auto">
        {renderView()}
      </div>
      <BottomNav 
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
      />
    </div>
  );
};

export default Index;
