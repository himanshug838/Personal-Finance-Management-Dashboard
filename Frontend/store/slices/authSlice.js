import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Load user details if token exists
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data.user;
    } catch (err) {
      localStorage.removeItem('jwt_token');
      const msg = err.response?.data?.error || 'Session expired or invalid.';
      return rejectWithValue(msg);
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('jwt_token', token);
      return { token, user };
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        (!err.response
          ? 'Database connection error. Please check your backend and MongoDB connection.'
          : 'Login failed. Please check your credentials.');
      return rejectWithValue(msg);
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('jwt_token', token);
      return { token, user };
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        (!err.response
          ? 'Database connection error. Please check your backend and MongoDB connection.'
          : 'Registration failed. Please try again.');
      return rejectWithValue(msg);
    }
  }
);

// Refresh user data thunk
export const refreshUserData = createAsyncThunk(
  'auth/refreshUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data.user;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to refresh user details.';
      return rejectWithValue(msg);
    }
  }
);

// Update profile thunk
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/auth/profile', profileData);
      return { user: response.data.user, message: response.data.message };
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update profile details.';
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('jwt_token') || null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('jwt_token');
      state.token = null;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loadUser
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // refreshUserData
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
