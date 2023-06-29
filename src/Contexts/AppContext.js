import { createContext, useReducer } from 'react';

const initialState = {};

export const AppContext = createContext(initialState);

const dispatch = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dispatch, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
