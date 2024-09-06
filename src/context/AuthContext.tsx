import { createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/firebaseApp";

export const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
