import React from "react";
import { Menu } from "antd";

export default function NavToDo({ setShowTasks }) {
    return (
        <Menu mode="horizontal">
            <Menu.Item
                className="nav-to-do-item"
                style={{ flexGrow: 1 }}
                key="1"
                onClick={() => setShowTasks("all")}
            >
                <div>All</div>
            </Menu.Item>
            <Menu.Item
                className="nav-to-do-item"
                style={{ flexGrow: 1 }}
                key="2"
                onClick={() => setShowTasks("finished")}
            >
                <div>Finished</div>
            </Menu.Item>
            <Menu.Item
                className="nav-to-do-item"
                style={{ flexGrow: 1 }}
                key="3"
                onClick={() => setShowTasks("ongoing")}
            >
                <div>On Going</div>
            </Menu.Item>
        </Menu>
    );
}
