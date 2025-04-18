import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import { Employee } from "../types/employee";
import EmployeeForm from "../components/EmployeeForm";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";


const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        // Verifica que el ID sea el correcto y tipo string
        const data = await getEmployeeById(id); // No lo conviertas a número

        if (!data) {
          setError("Employee not found");
          return;
        }

        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError("Failed to load employee details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (data: Employee) => {
    setIsSubmitting(true);
    try {
      // Actualiza el empleado
      await updateEmployee(data);
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
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
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Edit Employee</h1>
            <p className="text-muted-foreground mt-1">
              Update employee information
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading employee details...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Error</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => navigate("/employees")}>
              Go Back to Employees
            </Button>
          </div>
        ) : employee ? (
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        ) : null}
      </main>
    </div>
  );
};

export default EditEmployee;
