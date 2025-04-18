// components/ConfirmDeleteCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ConfirmDeleteCardProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteCard = ({ name, onConfirm, onCancel }: ConfirmDeleteCardProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-[350px] shadow-xl">
          <CardHeader>
            <CardTitle>¿Eliminar empleado?</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Estás por eliminar a <strong>{name}</strong>. Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={onConfirm}>
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ConfirmDeleteCard;
