import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    data: string;
}

const initialState: SearchState = {
    data: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchData: (state, action: PayloadAction<string>) => {
            state.data = action.payload;
        },
    },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice;