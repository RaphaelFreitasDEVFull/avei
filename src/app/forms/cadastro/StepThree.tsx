"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const StepThree = ({ data }: Props) => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Confira seus dados</h2>
      <div className="mt-4 space-y-2 text-left">
        <p>
          <strong>Nome:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Telefone:</strong> {data.telefone || "Não informado"}
        </p>
      </div>
    </div>
  );
};
export default StepThree;
