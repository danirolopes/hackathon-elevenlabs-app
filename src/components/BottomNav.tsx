
import { ShoppingBasket, CookingPot, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center flex-1 py-2",
      isActive ? "text-purple-600" : "text-gray-500"
    )}
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="text-xs mt-1">{label}</span>
  </button>
);

interface BottomNavProps {
  currentView: 'pantry' | 'cook' | 'shopping';
  onViewChange: (view: 'pantry' | 'cook' | 'shopping') => void;
}

export const BottomNav = ({ currentView, onViewChange }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center px-4 pb-safe">
      <NavItem
        icon={<ShoppingBasket className="w-6 h-6" />}
        label="My Pantry"
        isActive={currentView === 'pantry'}
        onClick={() => onViewChange('pantry')}
      />
      <NavItem
        icon={<CookingPot className="w-6 h-6" />}
        label="Cook Now"
        isActive={currentView === 'cook'}
        onClick={() => onViewChange('cook')}
      />
      <NavItem
        icon={<List className="w-6 h-6" />}
        label="Shopping List"
        isActive={currentView === 'shopping'}
        onClick={() => onViewChange('shopping')}
      />
    </div>
  );
};
