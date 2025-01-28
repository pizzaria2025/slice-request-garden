import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-brand-brown">
            Brother's Pizzaria
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-brand-brown hover:text-brand-brown/80 transition-colors">
              Fazer Pedido
            </Link>
            <Link to="/menu" className="text-brand-brown hover:text-brand-brown/80 transition-colors">
              Cardápio
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6 text-brand-brown" />
              <span className="absolute -top-2 -right-2 bg-brand-brown text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;