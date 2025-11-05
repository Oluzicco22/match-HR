import React from "react";

export default function Dashboard() {
    return (
        <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow">Stat cards / charts will go here</div>
                <div className="bg-white rounded-xl p-4 shadow">More widgets</div>
            </div>
        </div>
    );
}