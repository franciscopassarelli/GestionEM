import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { createEmployee } from "../services/employeeService";
import { Employee } from "../types/employee";
import EmployeeForm from "../components/EmployeeForm";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: Employee) => {
    setIsSubmitting(true);
    try {
      // Ensure birthDate is not null or undefined
      const employeeData: Employee = {
        ...data,
        birthDate: data.birthDate || new Date().toISOString().split('T')[0],
      };
      
      await createEmployee(employeeData);
      toast({
        title: "Empleado añadido",
        description: "El empleado ha sido añadido correctamente",
        variant: "default",
      });
      navigate("/employees");
    } catch (error) {
      console.error("Error creating employee:", error);
      toast({
        title: "Error",
        description: "No se pudo añadir el empleado",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 md:py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Añadir Nuevo Empleado</h1>
            <p className="text-muted-foreground mt-1">
              Crear un nuevo registro de empleado
            </p>
          </motion.div>
        </div>
        
        <EmployeeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </main>
    </div>
  );
};

export default AddEmployee;