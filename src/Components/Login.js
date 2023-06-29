import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Contexts/FirebaseContext";
import { AppContext } from "../Contexts/AppContext";

export default function Login() {
    const { dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { email, password } = values;
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            const uid = user.uid;
            const docSnap = await getDoc(doc(db, "users", uid));
            if (docSnap.exists()) {
                dispatch({
                    type: "SET_USER",
                    payload: [uid, docSnap.data().toDoList],
                });
                navigate("/");
            }
        } catch (error) {
            alert("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: "Please enter your email!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please enter your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
}
