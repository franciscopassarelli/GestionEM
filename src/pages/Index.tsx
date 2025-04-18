import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
      <section className="pt-10 pb-16 md:pt-20 md:pb-24 relative overflow-hidden bg-gradient-to-b from-background to-accent/30">

          <div className="container px-4 md:px-6">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            >
              <motion.div variants={item} className="space-y-4">
                <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm mb-4">
                  Sistema de Gestión de Empleados
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simplifica el Registro de Empleados
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Una solución sencilla y elegante para gestionar la fuerza laboral de tu empresa. Agrega, edita y organiza la información de los empleados con facilidad.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="gap-1">
                    <Link to="/employees">
                      <Users className="h-5 w-5 mr-1" />
                      Ver Empleados
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="gap-1">
                    <Link to="/add-employee">
                      <UserPlus className="h-5 w-5 mr-1" />
                      Agregar Empleado
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div variants={item} className="mx-auto lg:ml-auto">
                <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg bg-card">
                  <img
                    alt="Vista previa de la app"
                    className="aspect-video object-cover w-full"
                    height="310"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                    width="550"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Características Clave</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Gestiona los registros de empleados en un solo lugar
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Interfaz de usuario simple e intuitiva
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Diseño rápido y responsivo
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        Edición y actualizaciones sin interrupciones
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
