import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface PizzaCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const PizzaCard = ({ name, description, price, image }: PizzaCardProps) => {
  const handleAddToCart = () => {
    toast({
      title: "Pizza adicionada ao carrinho!",
      description: `${name} foi adicionada ao seu pedido.`,
    });
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
          <Button
            onClick={handleAddToCart}
            className="bg-pizza-red hover:bg-pizza-red/90 text-white"
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;