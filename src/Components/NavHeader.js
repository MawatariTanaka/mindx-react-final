import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { auth } from "../Contexts/FirebaseContext";

export default function NavHeader() {
    return (
        <Menu mode="horizontal" style={{ textAlign: "center" }}>
            <Menu.Item key="1">
                <Link to="/">Home</Link>
            </Menu.Item>
            {!auth.currentUser && (
                <>
                    <Menu.Item key="2">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/register">Register</Link>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );
}
