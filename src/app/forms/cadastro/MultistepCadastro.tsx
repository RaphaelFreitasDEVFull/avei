"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StepOneCadastro from "./StepOne";
import { motion, AnimatePresence } from "framer-motion";
import StepTwoCadastro from "./StepTwo";
import StepThree from "./StepThree";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefone: "",
    countryId: "",
    stateId: "",
    cityId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const steps = 3;
  const progressPercentage = (step / steps) * 100;

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro ao cadastrar");
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro desconhecido");
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">
          Cadastro realizado com sucesso!
        </h2>
        <p>Você já pode fazer login com seus dados.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white space-y-6">
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <StepOneCadastro data={formData} onChange={handleChange} />
          )}
          {step === 2 && (
            <StepTwoCadastro data={formData} onChange={handleChange} />
          )}
          {step === 3 && <StepThree data={formData} onChange={handleChange} />}
        </motion.div>
      </AnimatePresence>

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex gap-2 justify-between">
        {step > 1 && (
          <Button onClick={handleBack} disabled={loading}>
            Voltar
          </Button>
        )}
        {step < 3 ? (
          <Button
            onClick={handleNext}
            className="w-full bg-indigo-900 text-white font-bold"
            disabled={loading}
          >
            Próximo
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="w-full bg-indigo-900 text-white font-bold"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        )}
      </div>
    </div>
  );
}
