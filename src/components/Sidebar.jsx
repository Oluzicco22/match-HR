import React from "react";
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r p-4">
            <div className="mb-6 font-semibold text-lg">Match HR</div>
            <nav className="flex flex-col gap-2">
                <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
                <Link to="/dashboard/employees" className="px-3 py-2 rounded hover:bg-gray-100">Employees</Link>
                <Link to="/dashboard/hire" className="px-3 py-2 rounded hover:bg-gray-100">Hire</Link>
                <Link to="/dashboard/settings" className="px-3 py-2 rounded hover:bg-gray-100">Settings</Link>
            </nav>
        </aside>
    );
}