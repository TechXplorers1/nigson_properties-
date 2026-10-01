export type UserRole = 'admin' | 'investor' | 'client' | 'diaspora' | 'corporate';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  roleLabel: string;
  avatar?: string;
  savedPropertyIds: string[];
  membershipTier: 'Silver Member' | 'Gold Private Client' | 'Black Card Investor';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}
