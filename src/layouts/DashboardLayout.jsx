import React from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Header/>
                <main className="p-6">
                    <Outlet/> {/* renders the selected dashboard page */}
                </main>
            </div>
        </div>
    );
}