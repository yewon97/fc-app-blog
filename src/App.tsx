import Router from "@/components/Router";
import { app } from "@/firebaseApp";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export default function App() {
  const auth = getAuth(app);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser,
  );

  return <Router isAuthenticated={isAuthenticated} />;
}
