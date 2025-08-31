import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create the Context
const AuthContext = createContext();

// API base URL (pointing to your backend)
const API_URL = 'http://localhost:5000/api';

// Configure axios defaults
axios.defaults.baseURL = API_URL;

// Define the initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

// Define a reducer function to handle actions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      // Save token to local storage
      localStorage.setItem('token', action.payload.token);
      // Set auth token for future requests
      setAuthToken(action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'AUTH_ERROR':
    case 'LOGOUT':
      // Remove token from local storage
      localStorage.removeItem('token');
      // Remove auth token from axios headers
      delete axios.defaults.headers.common['x-auth-token'];
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Set auth token in axios headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Create a provider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on app start if token exists
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    loadUser();
  }, []);

  // Action: Load User
  const loadUser = async () => {
    try {
      const res = await axios.get('/auth/me');
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Action: Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/auth/register', formData, config);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      await loadUser(); // Load user after successful registration
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'REGISTER_FAIL' });
      return { success: false, error: errorMessage };
    }
  };

  // Action: Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/auth/login', formData, config);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      await loadUser(); // Load user after successful login
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAIL' });
      return { success: false, error: errorMessage };
    }
  };

  // Action: Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Action: Clear Errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        register,
        login,
        logout,
        loadUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};