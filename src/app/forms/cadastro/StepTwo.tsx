"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities, getCountries, getStates } from "@/app/actions/locations";

interface Props {
  data: {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    telefone?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
  };
  onChange: (field: string, value: string) => void;
}

const formSchema = z.object({
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
  countryId: z.string().min(1, "Selecione um país"),
  stateId: z.string().min(1, "Selecione um estado"),
  cityId: z.string().min(1, "Selecione uma cidade"),
});

type FormData = z.infer<typeof formSchema>;

const StepTwoCadastro = ({ data, onChange }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      telefone: data.telefone || "",
      countryId: data.countryId || "",
      stateId: data.stateId || "",
      cityId: data.cityId || "",
    },
  });

  const [countries, setCountries] = useState<unknown[]>([]);
  const [states, setStates] = useState<unknown[]>([]);
  const [cities, setCities] = useState<unknown[]>([]);

  const countryId = watch("countryId");
  const stateId = watch("stateId");

  // Atualiza estado externo em tempo real
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && value[name as keyof typeof value]) {
        onChange(name, value[name as keyof typeof value] || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await getCountries();
      setCountries(response);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countryId) {
      const fetchStates = async () => {
        const response = await getStates(countryId);
        setStates(response);
      };
      fetchStates();
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      const fetchCities = async () => {
        const response = await getCities(stateId);
        setCities(response);
      };
      fetchCities();
    }
  }, [stateId]);

  // Aqui você pode validar os dados no submit, se quiser
  const onSubmit = (formData: FormData) => {
    console.log("Formulário válido:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-900 text-center">Cadastro</h2>
      <h3 className="text-sm text-gray-500 text-center">Só mais um passo...</h3>

      {/* TELEFONE */}
      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="telefone" className="text-xs text-gray-600">
          Telefone
        </Label>
        <Input id="telefone" type="tel" {...register("telefone")} />
        {errors.telefone && (
          <span className="text-red-500 text-xs">
            {errors.telefone.message}
          </span>
        )}
      </div>

      {/* PAÍS */}
      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="countryId" className="text-xs text-gray-600">
          País
        </Label>
        <Select
          onValueChange={(value) => {
            setValue("countryId", value);
            onChange("countryId", value);
          }}
          defaultValue={data.countryId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um país" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.countryId && (
          <span className="text-red-500 text-xs">
            {errors.countryId.message}
          </span>
        )}
      </div>

      {/* ESTADO */}
      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="stateId" className="text-xs text-gray-600">
          Estado
        </Label>
        <Select
          onValueChange={(value) => {
            setValue("stateId", value);
            onChange("stateId", value);
          }}
          disabled={!states.length}
          defaultValue={data.stateId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um estado" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.id} value={state.id}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.stateId && (
          <span className="text-red-500 text-xs">{errors.stateId.message}</span>
        )}
      </div>

      {/* CIDADE */}
      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="cityId" className="text-xs text-gray-600">
          Cidade
        </Label>
        <Select
          onValueChange={(value) => {
            setValue("cityId", value);
            onChange("cityId", value);
          }}
          disabled={!cities.length}
          defaultValue={data.cityId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma cidade" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cityId && (
          <span className="text-red-500 text-xs">{errors.cityId.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white py-2 rounded"
      >
        Validar e continuar
      </button>
    </form>
  );
};

export default StepTwoCadastro;
