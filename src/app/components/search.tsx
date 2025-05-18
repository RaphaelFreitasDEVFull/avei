import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, Map } from "lucide-react";

const Search = () => {
  return (
    <div className=" flex gap-4 items-center w-full">
      <div className="flex flex-col gap-2">
        <Label>Para onde ir?</Label>
        <div className="relative">
          {" "}
          <Map className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2 pointer-events-none" />
          <select
            className="appearance-none w-full pl-10 pr-8 py-2 rounded-md border border-input bg-background text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Localização
            </option>
            <option
              value="sp"
              className="bg-background text-foreground hover:bg-accent"
            >
              São Paulo
            </option>
            <option
              value="rj"
              className="bg-background text-foreground hover:bg-accent"
            >
              Rio de Janeiro
            </option>
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <Label>Até quanto? </Label>
        <div className="relative">
          <Input
            placeholder="Orçamento"
            className="pl-8"
            type="number"
            min={0}
          />
          <Coins className="absolute top-2 left-2" size={18} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Data: </Label>
        <Input type="date" placeholder="Data de Viagem" />
      </div>
    </div>
  );
};

export default Search;
