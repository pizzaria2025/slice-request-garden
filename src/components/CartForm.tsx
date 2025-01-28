import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const PIZZA_SIZES = [
  { id: "media", label: "Média" },
  { id: "grande", label: "Grande" },
  { id: "familia", label: "Família" },
];

const PIZZA_CATEGORIES = {
  tradicionais: [
    "Mussarela",
    "Calabresa",
    "Portuguesa",
    "Frango",
    "Margherita",
  ],
  especiais: [
    "Quatro Queijos",
    "Pepperoni",
    "Supreme",
    "Vegetariana",
    "Bacon",
  ],
  doces: [
    "Chocolate",
    "Banana com Canela",
    "Romeu e Julieta",
    "Prestígio",
  ],
};

const PAYMENT_METHODS = [
  { id: "pix", label: "PIX - (75) 988510206 - Jeferson Barboza" },
  { id: "card", label: "Cartão de crédito/débito" },
  { id: "cash", label: "Dinheiro" },
  { id: "cash_card", label: "Dinheiro e cartão" },
];

const CartForm = () => {
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [flavor, setFlavor] = useState("");
  const [observations, setObservations] = useState("");
  const [removeIngredients, setRemoveIngredients] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    number: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [needChange, setNeedChange] = useState<boolean | null>(null);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pedido enviado com sucesso!",
      description: "Em breve entraremos em contato para confirmar seu pedido.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <Label>Tamanho da Pizza</Label>
          <RadioGroup value={size} onValueChange={setSize} className="mt-2">
            {PIZZA_SIZES.map((pizzaSize) => (
              <div key={pizzaSize.id} className="flex items-center space-x-2">
                <RadioGroupItem value={pizzaSize.id} id={pizzaSize.id} />
                <Label htmlFor={pizzaSize.id}>{pizzaSize.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tradicionais">Tradicionais</SelectItem>
              <SelectItem value="especiais">Especiais</SelectItem>
              <SelectItem value="doces">Doces</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {category && (
          <div className="space-y-2">
            <Label>Sabor</Label>
            <Select value={flavor} onValueChange={setFlavor}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sabor" />
              </SelectTrigger>
              <SelectContent>
                {PIZZA_CATEGORIES[category as keyof typeof PIZZA_CATEGORIES].map((flavorOption) => (
                  <SelectItem key={flavorOption} value={flavorOption}>
                    {flavorOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="observations">Observações</Label>
          <Textarea
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Alguma observação especial?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="removeIngredients">Ingredientes que deseja retirar</Label>
          <Textarea
            id="removeIngredients"
            value={removeIngredients}
            onChange={(e) => setRemoveIngredients(e.target.value)}
            placeholder="Quais ingredientes você quer remover?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Rua</Label>
            <Input
              id="street"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              placeholder="Nome da rua"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              value={address.number}
              onChange={(e) => setAddress({ ...address, number: e.target.value })}
              placeholder="Número"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              value={address.neighborhood}
              onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
              placeholder="Bairro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: formatZipCode(e.target.value) })}
              placeholder="00000-000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Forma de Pagamento</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
            {PAYMENT_METHODS.map((method) => (
              <div key={method.id} className="flex items-center space-x-2">
                <RadioGroupItem value={method.id} id={method.id} />
                <Label htmlFor={method.id}>{method.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {(paymentMethod === "cash" || paymentMethod === "cash_card") && (
          <div className="space-y-2">
            <Label>Precisa de troco?</Label>
            <RadioGroup
              value={needChange ? "yes" : "no"}
              onValueChange={(value) => setNeedChange(value === "yes")}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="change-yes" />
                <Label htmlFor="change-yes">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="change-no" />
                <Label htmlFor="change-no">Não</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full bg-pizza-red hover:bg-pizza-red/90">
        Finalizar Pedido
      </Button>
    </form>
  );
};

export default CartForm;