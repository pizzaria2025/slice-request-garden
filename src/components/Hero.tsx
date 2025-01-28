import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Pizza } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591')] 
        bg-cover bg-center"
      />
      <div className="relative z-20 h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            As Melhores Pizzas da Cidade
          </h1>
          <p className="text-xl text-white mb-8">
            Ingredientes frescos, massa artesanal e muito sabor em cada fatia
          </p>
          <Button 
            onClick={() => navigate("/menu")}
            className="bg-brand-brown hover:bg-brand-brown/90 text-white px-8 py-6 text-lg flex items-center gap-2"
          >
            <Pizza className="h-6 w-6" />
            Fazer Pedido
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;