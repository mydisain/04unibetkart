import axios from 'axios';
import API_BASE_URL from '../../config/api';

// ... existing code ...

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Use the API_BASE_URL
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      
      // ... rest of the function ...
    } catch (error) {
      // ... error handling ...
    }
  }
);

// ... rest of the file ...