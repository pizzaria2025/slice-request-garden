import PizzaCard from "./PizzaCard";

const pizzas = {
  tradicionais: [
    {
      id: 1,
      name: "ALHO",
      description: "Molho de tomate, muçarela, orégano, alho e azeitona.",
      price: {
        pequena: 45.90,
        media: 55.90,
        grande: 65.90
      },
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      category: "tradicionais"
    },
    {
      id: 2,
      name: "BACALHAU",
      description: "Molho de tomate, muçarela, orégano, azeitona e bacalhau.",
      price: {
        pequena: 59.90,
        media: 69.90,
        grande: 79.90
      },
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      category: "tradicionais"
    },
    {
      id: 3,
      name: "CALABRESA",
      description: "Molho de tomate, muçarela, orégano, cebola e calabresa.",
      price: {
        pequena: 45.90,
        media: 55.90,
        grande: 65.90
      },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      category: "tradicionais"
    },
    // Adicione mais pizzas conforme necessário
  ],
  especiais: [
    {
      id: 30,
      name: "ATUM",
      description: "Molho de tomate, muçarela, orégano, atum e cebola.",
      price: {
        pequena: 49.90,
        media: 59.90,
        grande: 69.90
      },
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      category: "especiais"
    },
    {
      id: 31,
      name: "CAMARÃO",
      description: "Molho de tomate, muçarela, orégano, camarão e alho.",
      price: {
        pequena: 69.90,
        media: 79.90,
        grande: 89.90
      },
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      category: "especiais"
    },
    // Adicione mais pizzas conforme necessário
  ],
  doces: [
    {
      id: 45,
      name: "BRIGADEIRO",
      description: "Muçarela, brigadeiro e granulado.",
      price: {
        pequena: 39.90,
        media: 49.90,
        grande: 59.90
      },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      category: "doces"
    },
    {
      id: 46,
      name: "NUTELLA",
      description: "Massa de pizza com nutella e morangos.",
      price: {
        pequena: 49.90,
        media: 59.90,
        grande: 69.90
      },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      category: "doces"
    },
    // Adicione mais pizzas conforme necessário
  ]
};

const MenuSection = () => {
  return (
    <section className="py-16 bg-brand-beige">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-brand-brown">Nosso Cardápio</h2>
        
        {Object.entries(pizzas).map(([category, categoryPizzas]) => (
          <div key={category} className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-brand-brown capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPizzas.map((pizza) => (
                <PizzaCard
                  key={pizza.id}
                  name={pizza.name}
                  description={pizza.description}
                  price={pizza.price}
                  image={pizza.image}
                  category={pizza.category}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
