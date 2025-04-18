import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Save, Loader2 } from "lucide-react";
import { Employee } from "../types/employee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Select } from "@/components/ui/select"; // asegurate de tener este componente
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";





const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  identityDocument: z
    .string()
    .min(3, "El documento debe tener al menos 3 caracteres"),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  isDeveloper: z.boolean().default(false),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (data: Employee) => Promise<void>;
  isSubmitting: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const defaultValues: Partial<FormValues> = initialData
    ? {
        ...initialData,
        birthDate: initialData.birthDate
          ? new Date(initialData.birthDate)
          : undefined,
      }
    : {
        fullName: "",
        identityDocument: "",
        isDeveloper: false,
        description: "",
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: FormValues) => {
    // Se pasa 'values' directamente, ya que 'formData' no está declarado
    const employeeData: Employee = {
      fullName: values.fullName || "", // Asegura que fullName no sea undefined
      identityDocument: values.identityDocument,
      birthDate: values.birthDate.toISOString(), // Convierte la fecha a ISO string
      isDeveloper: values.isDeveloper,
      description: values.description,
    };

    if (initialData?.id) {
      employeeData.id = initialData.id;
    }

    await onSubmit(employeeData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-card p-8 rounded-xl shadow-sm border border-border/50 animate-fade-in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} className="input-focus-ring" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identityDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento de identidad</FormLabel>
                <FormControl>
                  <Input placeholder="Documento" {...field} className="input-focus-ring" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="birthDate"
  render={({ field }) => {
    const [month, setMonth] = useState<number>(
      field.value ? field.value.getMonth() : new Date().getMonth()
    );
    const [year, setYear] = useState<number>(
      field.value ? field.value.getFullYear() : new Date().getFullYear()
    );

    const handleDateChange = (date: Date | undefined) => {
      if (date) {
        field.onChange(date);
        setMonth(date.getMonth());
        setYear(date.getFullYear());
      }
    };

    const months = [...Array(12)].map((_, i) =>
      new Date(0, i).toLocaleString("es", { month: "long" })
    );

    const years = Array.from({ length: 125 }, (_, i) => 2024 - i); // años desde 2024 hasta 1900

    return (
      <FormItem className="flex flex-col">
        <FormLabel>Fecha de nacimiento</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal input-focus-ring",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? format(field.value, "PPP", { locale: es })
                  : "Seleccionar fecha"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            <div className="flex gap-2 mb-2">
              <Select
                value={month.toString()}
                onValueChange={(val) => setMonth(Number(val))}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={year.toString()}
                onValueChange={(val) => setYear(Number(val))}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Calendar
              mode="single"
              selected={field.value}
              onSelect={handleDateChange}
              month={new Date(year, month)}
              onMonthChange={() => {}} // se ignora porque usamos selects
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    );
  }}
/>

          <FormField
            control={form.control}
            name="isDeveloper"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>¿Es desarrollador?</FormLabel>
                  <FormDescription>
                    Marcá esta opción si la persona es desarrollador/a
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Breve descripción del empleado..."
                    className="resize-none input-focus-ring"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {initialData ? "Actualizar empleado" : "Agregar empleado"}
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;
