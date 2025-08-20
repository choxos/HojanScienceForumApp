import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserProfile, NetworkingRequest } from '../../types';

const initialState: UserState = {
  profile: null,
  connections: [],
  networkingRequests: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    addConnection: (state, action: PayloadAction<string>) => {
      if (!state.connections.includes(action.payload)) {
        state.connections.push(action.payload);
      }
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      state.connections = state.connections.filter(id => id !== action.payload);
    },
    setNetworkingRequests: (state, action: PayloadAction<NetworkingRequest[]>) => {
      state.networkingRequests = action.payload;
    },
    addNetworkingRequest: (state, action: PayloadAction<NetworkingRequest>) => {
      state.networkingRequests.push(action.payload);
    },
    updateNetworkingRequest: (state, action: PayloadAction<{ id: string; status: 'accepted' | 'declined' }>) => {
      const request = state.networkingRequests.find(req => req.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProfile,
  updateProfile,
  addConnection,
  removeConnection,
  setNetworkingRequests,
  addNetworkingRequest,
  updateNetworkingRequest,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
