
import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'teams',
  initialState: {
    teams:  JSON.parse(window.localStorage.getItem("teams")) ?? [],
  },
  reducers: {
    addTeam: (state, action) => {

        const teamsToAdd = Array.isArray(action.payload) ? action.payload : [action.payload];
        teamsToAdd.forEach((team) => {
          if(state.teams.find((t) => t._id === team._id)) return;
          state.teams.push(team);
        });
        localStorage.setItem("teams", JSON.stringify(state.teams));
        
    }
  },
  
});

export const { addTeam } = teamSlice.actions
export default teamSlice.reducer;

