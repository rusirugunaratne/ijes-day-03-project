import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLock, MdPerson } from "react-icons/md";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

const LoginPage = () => {
    const {login} = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }
        if (username === "admin" && password === "123456") {
            setError(null);
            toast.success("Logged in");
            login()
            navigate("/dashboard");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-8">
                    <MdLock className="text-blue-600 w-12 h-12 mb-2" />
                    <h1 className="text-3xl font-bold text-blue-700 mb-2">Easy POS Login</h1>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Username
                        </label>
                        <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                            <MdPerson className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                className="flex-1 outline-none bg-transparent"
                                placeholder="admin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Password
                        </label>
                        <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                            <MdLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                className="flex-1 outline-none bg-transparent"
                                placeholder="******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
