import PizzaCard from "./PizzaCard";

const pizzas = [
  {
    id: 1,
    name: "ALHO",
    description: "Molho de tomate, muçarela, orégano, alho e azeitona.",
    price: 45.90,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  },
  {
    id: 2,
    name: "BACALHAU",
    description: "Molho de tomate, muçarela, orégano, azeitona e bacalhau.",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
  },
  {
    id: 3,
    name: "CALABRESA",
    description: "Molho de tomate, muçarela, orégano, cebola e calabresa.",
    price: 45.90,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  // Adicione mais pizzas conforme necessário
];

const MenuSection = () => {
  return (
    <section className="py-16 bg-brand-beige">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-brand-brown">Nosso Cardápio</h2>
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