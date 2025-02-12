import { useState } from "react";
import { login } from "../services/authService.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("Login successful!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-xl mb-4">Login</h2>
                <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="border p-2 w-full mb-2"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
