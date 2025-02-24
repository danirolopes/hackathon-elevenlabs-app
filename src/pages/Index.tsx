
import { ConvAI } from "@/components/ConvAI";
import { WaiterAI } from "@/components/WaiterAI";
import { BottomNav } from "@/components/BottomNav";
import { ShoppingList } from "@/components/ShoppingList";
import { Pantry } from "@/components/Pantry";
import { useState } from "react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'pantry' | 'cook' | 'shopping'>('cook');
  const [showChef, setShowChef] = useState(false);

  const renderCookView = () => {
    if (showChef) {
      return <ConvAI />;
    }
    return <WaiterAI onOrderComplete={() => setShowChef(true)} />;
  };

  const renderView = () => {
    switch (currentView) {
      case 'pantry':
        return <Pantry />;
      case 'cook':
        return renderCookView();
      case 'shopping':
        return <ShoppingList />;
      default:
        return renderCookView();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-16">
      <div className="max-w-md mx-auto">
        {renderView()}
      </div>
      <BottomNav 
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setShowChef(false); // Reset to waiter when changing views
        }}
      />
    </div>
  );
};

export default Index;
