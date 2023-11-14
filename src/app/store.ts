import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import personReducer from "../features/person/personSlice"

const customizedMiddleware = getDefaultMiddleware ({
    serializableCheck: false
})

export default configureStore({
    reducer: {
        person: personReducer
    },
    middleware: customizedMiddleware,
})