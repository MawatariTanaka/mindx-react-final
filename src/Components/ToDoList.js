import { useState } from "react";
import NavToDo from "./ToDoList/NavToDo";
import ToDoContainer from "./ToDoList/ToDoContainer";

export default function ToDoList() {
    const [showTasks, setShowTasks] = useState("all");
    return (
        <div>
            <NavToDo setShowTasks={setShowTasks} />
            <ToDoContainer showTasks={showTasks} />
        </div>
    );
}
