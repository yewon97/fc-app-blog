import Router from "@/components/Router";
import { app } from "@/firebaseApp";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const auth = getAuth(app);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser,
  );

  return (
    <>
      <ToastContainer />
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}
