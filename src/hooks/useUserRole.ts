import { useState } from "react";

type Role = 'admin' | 'supplier' | 'buyer' | null;

interface UseUserRoleResult {
  role: Role;
  loading: boolean;
  error: string | null;
}

const useUserRole = (): UseUserRoleResult => {
  const [role] = useState<Role>(() => {
    const stored = localStorage.getItem('demo_role');
    return (stored as Role) ?? null;
  });
  return { role, loading: false, error: null };
};

export default useUserRole;
