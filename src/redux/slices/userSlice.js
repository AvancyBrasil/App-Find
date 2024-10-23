import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [], // Estado inicial do userData como um array vazio
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; // Atualiza o estado com os novos dados do usuário
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;