import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

axios.defaults.withCredentials = true;

interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => {
        set({ user: null });
        axios.post("http://localhost:9090/api/auth/logout");
      },

      fetchProfile: async () => {
        try {
          const res = await axios.post(
            "http://localhost:9090/api/auth/profile"
          );
          set({ user: res.data.user });
        } catch (err) {
          set({ user: null });
        }
      },
    }),

    {
      name: "edu-auth",     
      partialize: (state) => ({
        user: state.user,    
      }),
    }
  )
);
