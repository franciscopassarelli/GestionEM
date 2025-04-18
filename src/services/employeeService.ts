import { db } from "../lib/firebase"; // Asegúrate de que la ruta sea correcta
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner"; // Para mostrar notificaciones

const employeesCollection = collection(db, "employees");

// Obtener todos los empleados
export const getEmployees = async () => {
  try {
    const querySnapshot = await getDocs(employeesCollection);
    const employees = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return employees;
  } catch (error) {
    toast.error("Error fetching employees");
    throw new Error("Failed to fetch employees");
  }
};

// Obtener un empleado por ID
export const getEmployeeById = async (id) => {
  try {
    const employeeDoc = doc(db, "employees", id);
    const docSnap = await getDoc(employeeDoc);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Employee not found");
    }
  } catch (error) {
    toast.error("Error fetching employee details");
    throw new Error(`Failed to fetch employee with ID: ${id}`);
  }
};

// Crear un nuevo empleado
export const createEmployee = async (employee) => {
  try {
    const docRef = await addDoc(employeesCollection, employee);
    toast.success("Employee created successfully");
    return { id: docRef.id, ...employee };
  } catch (error) {
    toast.error("Error creating employee");
    throw new Error("Failed to create employee");
  }
};

// Actualizar un empleado
export const updateEmployee = async (employee) => {
  try {
    const employeeDoc = doc(db, "employees", employee.id);
    await updateDoc(employeeDoc, employee);
    toast.success("Employee updated successfully");
    return employee;
  } catch (error) {
    toast.error("Error updating employee");
    throw new Error("Failed to update employee");
  }
};

// Eliminar un empleado
export const deleteEmployee = async (id) => {
  try {
    const employeeDoc = doc(db, "employees", id);
    await deleteDoc(employeeDoc);
    toast.success("Employee deleted successfully");
  } catch (error) {
    toast.error("Error deleting employee");
    throw new Error(`Failed to delete employee with ID: ${id}`);
  }
};
