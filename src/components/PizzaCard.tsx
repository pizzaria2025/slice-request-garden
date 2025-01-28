import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import CartForm from "./CartForm";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PizzaCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const PizzaCard = ({ name, description, price, image }: PizzaCardProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-pizza-red font-bold text-xl">
            R$ {price.toFixed(2)}
          </span>
          <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddToCart}
                className="bg-pizza-red hover:bg-pizza-red/90 text-white"
              >
                Pedir
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Faça seu pedido</DialogTitle>
              </DialogHeader>
              <CartForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;