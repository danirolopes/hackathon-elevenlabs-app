
import { ConvAI } from "@/components/ConvAI";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 pb-16">
      <div className="max-w-md mx-auto">
        <ConvAI />
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
