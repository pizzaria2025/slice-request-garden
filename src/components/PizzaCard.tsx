import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CartForm from "./CartForm";
import { useState } from "react";

interface PriceStructure {
  pequena: number;
  media: number;
  grande: number;
}

interface PizzaCardProps {
  name: string;
  description: string;
  price: PriceStructure;
  image: string;
  category: string;
}

const PizzaCard = ({ name, description, price, image, category }: PizzaCardProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get the lowest price to display
  const startingPrice = Math.min(price.pequena, price.media, price.grande);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-brand-brown">{name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-brand-brown font-bold text-xl">
            A partir de R$ {startingPrice.toFixed(2)}
          </span>
          <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-brand-brown hover:bg-brand-brown/90 text-white"
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