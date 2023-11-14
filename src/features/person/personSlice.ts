import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPerson, Person } from "../../interfaces/Person";

export interface PersonState {
    data: IPerson;
    list: IPerson[]
}

const initialState: PersonState = {
    data: new Person(),
    list: []
}

export const personSlice = createSlice ({
    name: 'person',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<IPerson>) => {
            state.data = action.payload
        },
        setPerson: (state, action: PayloadAction<IPerson[]>) => {
            state.list = action.payload
        },
    }
})

export const { setData, setPerson} = personSlice.actions
export default personSlice.reducer