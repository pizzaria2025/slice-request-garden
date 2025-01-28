import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Pizza } from "lucide-react";
import { format } from "date-fns";

const PIZZA_SIZES = [
  { id: "pequena", label: "Pequena", slices: 2 },
  { id: "media", label: "Média", slices: 3 },
  { id: "grande", label: "Grande", slices: 4 },
];

const PIZZA_CATEGORIES = {
  tradicionais: [
    "ALHO", "BACALHAU", "BACALHAU TERIYAKI", "BACON", "BACON CROCANTE",
    "BACON PRIME", "BRASILEIRA", "CALABRESA", "CALABRESA A CREME 4 QUEIJOS",
    "CALABRESA CATUPIRY", "CALABRESA COM BACON", "CALABRESA COM GORGONZOLA",
    "CALABRESA COM MILHO", "BAIANA", "CHAMPIGNON", "FRANGO", "FRANGO BARBECUE",
    "FRANGO CATUPIRY", "FRANGO CHEDDAR", "FRANGO COM MILHO", "FRANGO CROCANTE",
    "FRANGO TERIYAKI", "LOMBINHO", "LOMBINHO CATUPIRY", "LOMBINHO CHEDDAR",
    "MARGUERITA", "MILHO VERDE", "MILHO VERDE CATUPIRY", "MUÇARELA", "NAPOLITANA",
    "PALMITO", "PEITO DE PERU", "PEITO DE PERU CATUPIRY", "PEITO DE PERU CHEDDAR",
    "PEPERONNI", "PEPERONNI CREAM CHEESE", "PORTUGUESA", "PRESUNTO", "QUATRO QUEIJOS",
    "Nordestino", "Nordestino CATUPIRY", "Nordestino CHEDDAR", "SICILIANA",
    "TOMATE SECO", "VEGETARIANA", "Vegetais"
  ],
  especiais: [
    "ATUM", "ATUM CATUPIRY", "ATUM TERIYAKI", "BAURU", "CAIPIRA",
    "CAMARÃO", "CAMARÃO CATUPIRY", "CAMARÃO TERIYAKI", "CINCO QUEIJOS",
    "COSTELINHA  COM BARBECUE", "FILÉ MIGNON", "FILÉ MIGNON ACEBOLADO",
    "FILÉ MINGON BARBECUE", "SALMÃO TERYAKI"
  ],
  doces: [
    "BRIGADEIRO", "BRIGADEIRO COM MORANGO", "CHOCOLATE AO LEITE",
    "CHOCOLATE BRANCO COM MORANGO", "DOCE DE LEITE", "NUTELLA COM MORANGO",
    "PAÇOQUITA", "ROMEU E JULIETA"
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
    
    const currentDate = format(new Date(), "dd/MM/yyyy 'às' HH:mm");
    
    const orderSummary = `
*Novo Pedido - Brother's Pizzaria*
${currentDate}

*Cliente:* ${name}
*Telefone:* ${phone}

*Pedido:*
Tamanho: ${size}
Sabor: ${flavor}

*Observações:* ${observations || "Nenhuma"}
*Retirar ingredientes:* ${removeIngredients || "Nenhum"}

*Endereço:*
${address.street}, ${address.number}
${address.neighborhood}
CEP: ${address.zipCode}

*Forma de Pagamento:* ${paymentMethod}
${needChange !== null ? `Precisa de troco: ${needChange ? "Sim" : "Não"}` : ""}

Obrigado por realizar seu pedido. Vai fazer pix? Nossa chave é (75) 988510206 - Jeferson Barboza
    `.trim();

    const whatsappNumber = "75991662591";
    const encodedMessage = encodeURIComponent(orderSummary);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    toast({
      title: "Pedido pronto!",
      description: "Você será redirecionado para o WhatsApp para enviar seu pedido.",
    });

    window.open(whatsappUrl, "_blank");
  };

  const PizzaSizeIcon = ({ slices }: { slices: number }) => (
    <div className="relative w-12 h-12">
      <Pizza className="w-full h-full text-brand-brown" />
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-brand-beige">
        {slices}
      </span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-brand-beige rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <Label>Tamanho da Pizza</Label>
          <RadioGroup value={size} onValueChange={setSize} className="mt-2 grid grid-cols-3 gap-4">
            {PIZZA_SIZES.map((pizzaSize) => (
              <div key={pizzaSize.id} className="flex flex-col items-center space-y-2 p-4 border rounded-lg hover:bg-brand-brown/10 cursor-pointer">
                <PizzaSizeIcon slices={pizzaSize.slices} />
                <RadioGroupItem value={pizzaSize.id} id={pizzaSize.id} className="sr-only" />
                <Label htmlFor={pizzaSize.id} className="text-center">{pizzaSize.label}</Label>
                <span className="text-sm text-gray-600">{pizzaSize.slices} fatias</span>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
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
              <SelectTrigger className="w-full">
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
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="removeIngredients">Ingredientes que deseja retirar</Label>
          <Textarea
            id="removeIngredients"
            value={removeIngredients}
            onChange={(e) => setRemoveIngredients(e.target.value)}
            placeholder="Quais ingredientes você quer remover?"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Rua</Label>
            <Input
              id="street"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              placeholder="Nome da rua"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              value={address.number}
              onChange={(e) => setAddress({ ...address, number: e.target.value })}
              placeholder="Número"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              value={address.neighborhood}
              onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
              placeholder="Bairro"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: formatZipCode(e.target.value) })}
              placeholder="00000-000"
              required
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

      <Button type="submit" className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white">
        Enviar meu pedido
      </Button>
    </form>
  );
};

export default CartForm;
