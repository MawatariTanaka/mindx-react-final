import { useContext } from "react";
import { List, Checkbox, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { doc, setDoc } from "firebase/firestore";
import { AppContext } from "../../Contexts/AppContext";
import { db } from "../../Contexts/FirebaseContext";

export default function ToDoContainer({ showTasks }) {
    const { state, dispatch } = useContext(AppContext);
    const { toDoList: todos, userId } = state;

    const addTodo = async (value) => {
        const docRef = doc(db, "users", userId);
        const newToDo = {
            completed: false,
            text: value,
        };
        setDoc(docRef, {
            toDoList: [...todos, newToDo],
        });
        dispatch({
            type: "ADD_TODO",
            payload: value,
        });
    };

    const handleToggle = (index) => {
        const newToDoList = todos.map((todo, i) => {
            if (i === index) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });
        const docRef = doc(db, "users", userId);
        setDoc(docRef, {
            toDoList: newToDoList,
        });
        dispatch({
            type: "TOGGLE_TODO",
            payload: index,
        });
    };

    const handleDelete = (index) => {
        const newToDoList = todos.filter((todo, i) => i !== index);
        const docRef = doc(db, "users", userId);
        setDoc(docRef, {
            toDoList: newToDoList,
        });
        dispatch({
            type: "DELETE_TODO",
            payload: index,
        });
    };

    const filteredTodos =
        showTasks === "finished"
            ? todos.filter((todo) => todo.completed)
            : showTasks === "ongoing"
            ? todos.filter((todo) => !todo.completed)
            : todos;

    return (
        <div>
            <Input.Search enterButton="Add" onSearch={addTodo} />
            <List
                dataSource={filteredTodos}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <DeleteOutlined
                                onClick={() => handleDelete(index)}
                                key="delete"
                                style={{ color: "red" }}
                            />,
                        ]}
                    >
                        <Checkbox
                            checked={item.completed}
                            onChange={() => handleToggle(index)}
                        >
                            <span
                                style={{
                                    textDecoration: item.completed
                                        ? "line-through"
                                        : "none",
                                    color: item.completed ? "grey" : "inherit",
                                }}
                            >
                                {item.text}
                            </span>
                        </Checkbox>
                    </List.Item>
                )}
            />
        </div>
    );
}
