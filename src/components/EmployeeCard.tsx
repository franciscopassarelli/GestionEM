import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format, differenceInYears } from "date-fns";
import { es } from "date-fns/locale"; // Importamos el idioma español
import { Employee } from "../types/employee";
import { Code, Edit, Trash2, Calendar, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmployeeCardProps {
  employee: Employee;
  onDelete: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onDelete }) => {
  const birthDate = new Date(employee.birthDate);
  const age = differenceInYears(new Date(), birthDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      layout
    >
      <Card className="overflow-hidden card-hover border border-border/50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{employee.fullName}</CardTitle>
            {employee.isDeveloper && (
              <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                <Code className="h-3 w-3" />
                Desarrollador
              </Badge>
            )}
          </div>
          <CardDescription className="flex items-center gap-1.5 text-sm">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            DNI: {employee.identityDocument}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {format(birthDate, "PPP", { locale: es })} ({age} años)
              </span>
            </div>
            <div className="flex gap-1.5 mt-1">
              <FileText className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm">{employee.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t border-border/30">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/edit-employee/${employee.id}`}>
              <Edit className="h-3.5 w-3.5 mr-1.5" />
              Editar
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => employee.id && onDelete(employee.id)}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Eliminar
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EmployeeCard;
