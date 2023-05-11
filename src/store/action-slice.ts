import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { movebleItem, NamedRepo } from "../helpers/interfaces";

const initialState = {
  repos: {},
};
interface initialState {
  repos: {
    [name: string]: any;
  };
}
const ActionSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    addRepo(state, action: PayloadAction<NamedRepo>) {
      const repoName = Object.keys(action.payload)[0];
      const value = Object.values(action.payload)[0];
      state.repos = {
        ...state.repos,
        [repoName]: value,
      };
    },
    moveItem(state: initialState, action: PayloadAction<movebleItem>) {
      const positionInfo = action.payload;
      const path: string = positionInfo.path;
      const curPosition: string = positionInfo.curPosition;
      const moveblePosition: string = positionInfo.source;
      if (curPosition === moveblePosition) {
        return state;
      }
      state.repos[path][curPosition] = state.repos[path][curPosition].filter(
        (el: any) => {
          if (el.id === positionInfo.id) {
            state.repos[path][moveblePosition].push(el);
            return false;
          }
          return el.id !== positionInfo.id;
        }
      );
    },
  },
});
export const { addRepo, moveItem } = ActionSlice.actions;
export const selectActions = (state: any) => state.repos;
export default ActionSlice.reducer;
