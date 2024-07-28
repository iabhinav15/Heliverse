
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const allteams = createAsyncThunk("allteams", async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/teams/get-allteam`
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json()
    return data.data
});

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    teams: [],
  },
  reducers: {
    addTeam: (state, action) => {
        state.teams.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(allteams.fulfilled, (state, action) => {
      state.teams = action.payload;
    });
  }
  
});

export const { addTeam } = teamSlice.actions
export default teamSlice.reducer;

