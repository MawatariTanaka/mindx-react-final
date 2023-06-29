import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "./Contexts/FirebaseContext";

import "./App.css";
import NavHeader from "./Components/NavHeader";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ToDoList from "./Components/ToDoList";

function Component404() {
    return (
        <div>
            <h1>404</h1>
        </div>
    );
}

function PrivateRoute({ user, children }) {
    return user ? children : <Navigate to="/login" />;
}

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        signOut(auth);
    }, []);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        });
    });

    return (
        <div className="App">
            <NavHeader />
            <h1>#todo</h1>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute user={user}>
                            <ToDoList />
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Component404 />} />
            </Routes>
        </div>
    );
}

export default App;
