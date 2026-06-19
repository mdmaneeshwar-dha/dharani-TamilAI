import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const STORAGE_USER = "tamilai-user";
const STORAGE_TOKEN = "tamilai-token";

// Local-only fallback storage (used when backend is unreachable / CORS fails)
const STORAGE_LOCAL_USERS = "tamilai-local-users";
type LocalUserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
};

function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_USER);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_TOKEN);
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  const saveSession = (userData: AuthUser, newToken: string) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(userData));
    localStorage.setItem(STORAGE_TOKEN, newToken);
    axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  };

  const localRegister = async (name: string, email: string, password: string) => {
    const users = safeParseJSON<LocalUserRecord[]>(
      localStorage.getItem(STORAGE_LOCAL_USERS),
      [],
    );

    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      throw new Error("Email already registered.");
    }

    const newUser: LocalUserRecord = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_LOCAL_USERS, JSON.stringify(users));

    // Simple local token; the rest of the app only needs "some" token value.
    const newToken = `local-${newUser.id}-${Date.now()}`;
    saveSession(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      newToken,
    );
  };

  const localLogin = async (email: string, password: string) => {
    const users = safeParseJSON<LocalUserRecord[]>(
      localStorage.getItem(STORAGE_LOCAL_USERS),
      [],
    );

    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!found) {
      throw new Error("Invalid credentials.");
    }
    if (found.password !== password) {
      throw new Error("Invalid credentials.");
    }

    const newToken = `local-${found.id}-${Date.now()}`;
    saveSession(
      { id: found.id, name: found.name, email: found.email },
      newToken,
    );
  };

  const isAxiosNetworkOrCorsFailure = (err: any) => {
    // axios network failure (fetch error) often has no response
    if (err?.response) return false;

    const msg = String(err?.message || "").toLowerCase();
    return (
      msg.includes("network") ||
      msg.includes("cors") ||
      msg.includes("failed to fetch") ||
      msg.includes("fetch error") ||
      msg.includes("timeout") ||
      msg.includes("ecconnrefused") ||
      msg.includes("err_connection") ||
      msg.includes("aborted")
    );
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      try {
        const response = await axios.post(`${API_BASE}/auth/login`, {
          email,
          password,
        });
        const { token: newToken, user: userData } = response.data;
        saveSession(userData, newToken);
      } catch (err: any) {
        if (isAxiosNetworkOrCorsFailure(err)) {
          await localLogin(email, password);
          return;
        }
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      try {
        const response = await axios.post(`${API_BASE}/auth/register`, {
          name,
          email,
          password,
        });
        const { token: newToken, user: userData } = response.data;
        saveSession(userData, newToken);
      } catch (err: any) {
        if (isAxiosNetworkOrCorsFailure(err)) {
          await localRegister(name, email, password);
          return;
        }
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
    delete axios.defaults.headers.common.Authorization;
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout, isLoading }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
