import { useEffect, useState } from 'react';
import { getMe, logout as apiLogout } from '../services/api.service';
import type { User } from '../services/api.service';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, logout, refetch: fetchUser };
};