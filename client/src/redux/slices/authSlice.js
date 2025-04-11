import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage
let userInfo = null;
try {
  const storedUserInfo = localStorage.getItem('userInfo');
  if (storedUserInfo) {
    userInfo = JSON.parse(storedUserInfo);
    // Validate that the parsed userInfo has the expected structure
    if (!userInfo || !userInfo.token) {
      console.error('Invalid user info in localStorage, missing token');
      localStorage.removeItem('userInfo');
      userInfo = null;
    } else {
      console.log('Loaded user info from localStorage:', {
        id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
        tokenExists: !!userInfo.token,
        tokenLength: userInfo.token.length
      });
    }
  }
} catch (error) {
  console.error('Error loading user info from localStorage:', error);
  // If there's an error, clear the localStorage to prevent future errors
  localStorage.removeItem('userInfo');
  userInfo = null;
}

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      // Make sure this URL is correct and includes the full path to your API
      const { data } = await axios.post(
        '/api/users/login', // Change this to the full URL if needed
        { email, password },
        config
      );
      
      // Store user in localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      return data;
    } catch (error) {
      // Log the actual response for debugging
      console.error('Login error response:', error.response?.data || error.message);
      
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message || 'Login failed'
      );
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('userInfo');
  return null;
});

// Update user profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (user, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put('/api/users/profile', user, config);

      localStorage.setItem('userInfo', JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  userInfo,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        console.log('Auth state updated after login:', state.userInfo);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetSuccess } = authSlice.actions;

export default authSlice.reducer;
