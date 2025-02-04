import { authInstance as axios, getSession, handleError, setSession } from '@/lib';
import { AuthState } from '@/types';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const useAuth = create<AuthState>((set, get) => ({
  auth: {
    token: getSession(),
    isInitialized: false,
    isAuthenticated: !!getSession(),
    loading: false,
    user: null,
    error: null,
    message: null,
    setIsInitialized: () =>
      set((state) => ({
        ...state,
        auth: { ...state.auth, isInitialized: true },
      })),
    setLoading: (value) => set((state) => ({ ...state, auth: { ...state.auth, loading: value } })),
    clearError: () => set((state) => ({ ...state, auth: { ...state.auth, error: null } })),
    clearMessage: () => set((state) => ({ ...state, auth: { ...state.auth, message: null } })),
  },
  signUp: async (data) => {
    get().auth.setLoading(true);
    try {
      const res = await axios.post('/register', data);

      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: false,
          user: res.data.data,
          loading: false,
        },
      }));
    } catch (error) {
      console.log({ error });
      setSession();
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          error: handleError(error),
          token: null,
          isAuthenticated: false,
          loading: false,
        },
      }));
    }
  },
  login: async (data) => {
    get().auth.setLoading(true);
    try {
      const res = await axios.post('/login', data);
      const accessToken = res.data.data.token;
      const { exp }  = jwtDecode(accessToken);

      // Send token to API route to set it as HTTP-only cookie
      await fetch('/api/set-cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, exp }),
      });

      setSession(accessToken);

      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          loading: false,
          user: res.data.data.user,
          message: res.data.message,
        },
      }));
    } catch (error) {
      console.log({ error });
      setSession();
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          error: handleError(error),
          token: null,
          isAuthenticated: false,
          loading: false,
        },
      }));
    }
  },
  confirmEmail: async (data) => {
    get().auth.setLoading(true);
    try {
      const res = await axios.post('/confirm-email', data);

      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: false,
          loading: false,
          message: res.data.message,
        },
      }));
    } catch (error) {
      console.log({ error });
      setSession();
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          error: handleError(error),
          token: null,
          isAuthenticated: false,
          loading: false,
        },
      }));
    }
  },
  updateUserProfile: async (data) => {
    get().auth.setLoading(true);
    try {
      const token = getSession();
      if (!token) {
        throw new Error("Not authenticated");
      }
      setSession(token);
      
      const res = await axios.put('/profile', data);
      
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          loading: false,
          message: res.data.message,
          user: res.data
        },
      }));
    } catch (error) {
      console.log({ error });
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          error: handleError(error),
          loading: false,
        },
      }));
    }
  }
}));

export default useAuth;