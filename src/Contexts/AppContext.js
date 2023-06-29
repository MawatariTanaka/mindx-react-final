import { createContext, useReducer } from "react";

const initialState = {
    userId: null,
    toDoList: [],
};

export const AppContext = createContext(initialState);

const appReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            const [userId, toDoList] = action.payload;
            return {
                userId,
                toDoList,
            };
        case "ADD_TODO":
            const newToDo = {
                completed: false,
                text: action.payload,
            };
            return {
                ...state,
                toDoList: [...state.toDoList, newToDo],
            };
        case "TOGGLE_TODO":
            return {
                ...state,
                toDoList: state.toDoList.map((todo, index) => {
                    const { completed } = todo;
                    if (index === action.payload) {
                        return {
                            ...todo,
                            completed: !completed,
                        };
                    }
                    return todo;
                }),
            };
        case "DELETE_TODO":
            return {
                ...state,
                toDoList: state.toDoList.filter(
                    (todo, index) => index !== action.payload
                ),
            };
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
