'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '../lib/axios';

interface User {
  id: number;
  nom: string;
  prenom: string;
  username: string;
  email: string;
  phone?: string;
  date_de_naissance?: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/profile');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }

    // Écouter les changements de storage (pour déconnexion depuis un autre onglet)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          fetchUser();
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname]);

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return false;
    }
    return true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return {
    isAuthenticated,
    loading,
    requireAuth,
    logout,
    user,
    refetchUser: fetchUser,
  };
}
