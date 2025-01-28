import PizzaCard from "./PizzaCard";

const pizzas = [
  {
    id: 1,
    name: "Margherita",
    description: "Molho de tomate, mussarela, manjericão fresco",
    price: 45.90,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Molho de tomate, mussarela, pepperoni",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
  },
  {
    id: 3,
    name: "Portuguesa",
    description: "Molho de tomate, mussarela, presunto, ovos, cebola",
    price: 52.90,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
];

const MenuSection = () => {
  return (
    <section className="py-16 bg-pizza-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nosso Cardápio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              name={pizza.name}
              description={pizza.description}
              price={pizza.price}
              image={pizza.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;