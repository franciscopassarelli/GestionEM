import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Search, PlusCircle, Loader2, Pencil, Trash } from "lucide-react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Employee } from "../types/employee";
import EmployeeCard from "../components/EmployeeCard";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge"; // Importa el Badge
import { Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmployeesList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.identityDocument.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      setIsDeleting(id);
      try {
        await deleteEmployee(id);
        setEmployees((prev) => prev.filter((employee) => employee.id !== id));

        toast({
          title: "Empleado eliminado",
          description: "El empleado ha sido eliminado con éxito.",
        });
      } catch (error) {
        console.error("Error al eliminar empleado:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el empleado. Por favor, intenta nuevamente.",
          variant: "destructive",
        });
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
            <p className="text-muted-foreground mt-1">
              Ver y gestionar los registros de tus empleados
            </p>
          </div>

          <div className="flex gap-2 flex-col sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar empleados..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button asChild>
              <Link to="/add-employee">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nuevo Empleado
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando empleados...</p>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 border border-dashed rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">No se encontraron empleados</h3>
            {searchTerm ? (
              <p className="text-muted-foreground mb-4">
                No hay resultados para "{searchTerm}". Intenta con otro término de búsqueda.
              </p>
            ) : (
              <p className="text-muted-foreground mb-4">
                Comienza agregando tu primer empleado.
              </p>
            )}
            {!searchTerm && (
              <Button asChild>
                <Link to="/add-employee">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Agregar Empleado
                </Link>
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="mb-4">
            <Button variant="outline" onClick={() => setIsGridView((prev) => !prev)}>
              {isGridView ? "Ver como lista" : "Ver como tarjetas"}
            </Button>
          </div>
        )}

        {isGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Card className="overflow-hidden border border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Empleados</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-card-foreground bg-card">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left">Nombre</th>
                      <th className="px-6 py-4 text-left">DNI</th>
                      <th className="px-6 py-4 text-left">Fecha de nacimiento</th>
                      <th className="px-6 py-4 text-left">Rol</th>
                      <th className="px-6 py-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-t border-border hover:bg-muted/30 transition"
                      >
                        <td className="px-6 py-4">{employee.fullName}</td>
                        <td className="px-6 py-4">{employee.identityDocument}</td>
                        <td className="px-6 py-4">
                          {format(new Date(employee.birthDate), "PPP", { locale: es })}
                        </td>

                        {/* Columna "Rol" */}
                        <td className="px-6 py-4 hidden md:table-cell">
                          {employee.isDeveloper ? (
                            <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                              <Code className="h-3.5 w-3.5" />
                              Desarrollador
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">No aplica</span>
                          )}
                        </td>

                        <td className="px-6 py-4 flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/edit-employee/${employee.id}`} className="flex items-center">
                              <Pencil className="h-4 w-4" />
                
                            </Link>
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(employee.id)}
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash className="h-4 w-4" />
                            
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default EmployeesList;
