import { createContext, useReducer } from "react";

const initialState = {
    userId: null,
    toDoList: [],
};

export const AppContext = createContext(initialState);

const appReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
