"use client";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<{
  user: { username: string; role: string } | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {}
});

import { ReactNode } from "react";
import toast from "react-hot-toast";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string) => {
    if (username === 'user' && password === 'user123') {
      const token = { username, role: 'user' };
      localStorage.setItem('token', JSON.stringify(token));
      setUser(token);
       toast.success("Login successful");
    } else if (username === 'admin' && password === 'admin123') {
      const token = { username, role: 'admin' };
      localStorage.setItem('token', JSON.stringify(token));
      setUser(token);
        toast.success("Login successful");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
