import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzgS44iy3zLvl1Yr1_snRYG7h9sWIx1tg",
  authDomain: "gestion-empleados-4ce0c.firebaseapp.com",
  projectId: "gestion-empleados-4ce0c",
  storageBucket: "gestion-empleados-4ce0c.firebasestorage.app",
  messagingSenderId: "284352634201",
  appId: "1:284352634201:web:49fca3afa5491f856fc048",
};

const app = initializeApp(firebaseConfig);

// ✅ Exportamos Firestore
export const db = getFirestore(app);
