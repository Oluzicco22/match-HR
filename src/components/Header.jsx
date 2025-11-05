import React from "react";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white border-b">
            <div>
                <input
                    className="border rounded-full px-4 py-2 w-72"
                    placeholder="Search"
                />
            </div>

            <div className="flex items-center gap-4">
                <button onClick={handleLogout} className="text-sm px-3 py-2 rounded bg-red-50 hover:bg-red-100">
                    Logout
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"/>
                    <span className="text-sm">Norma Torphy</span>
                </div>
            </div>
        </header>
    );
}
