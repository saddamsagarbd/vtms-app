"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Plans", path: "/plans" },
    { name: "Companies", path: "/companies" },
    { name: "Users", path: "/users" },
    { name: "Drivers", path: "/drivers" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Trips", path: "/trips" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);

    return (
        <div className="flex h-screen bg-[#E5E5E5]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#E5E5E5] text-white flex flex-col">
                <div className="p-4 text-center font-bold text-xl text-[#484A4F]">
                    Admin Panel
                </div>
                <nav className="flex-1 mt-4 space-y-4">
                {menuItems.map((item) => (
                    <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`w-full ml-2 text-left font-semibold px-6 py-2 transition cursor-pointer hover:border-l-5 hover:pl-5  hover:text-[#484A4F]
                    ${pathname === item.path ? "text-[#484A4F] border-l-5 border-[#484A4F] pl-5" : "border-[#484A4F] text-[#BBBBBB]"}`}
                    >
                    {item.name}
                    </button>
                ))}
                </nav>
                <div className="p-4 border-gray-700">
                    <button
                        onClick={logout}
                        className={`w-full ml-2 text-left font-semibold px-6 py-2 transition cursor-pointer hover:border-l-5 hover:pl-5 text-[#BBBBBB] hover:text-[#484A4F]`}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden rounded-2xl shadow-xl">
                {/* Top Navbar */}
                <header className="h-14 bg-white shadow flex items-center justify-between px-6">
                    <h1 className="font-semibold text-gray-700">
                        {pathname.replace("/", "").toUpperCase() || "DASHBOARD"}
                    </h1>
                    <div className="text-gray-600 text-sm">
                        {user?.name || "Admin"}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 bg-white overflow-y-auto">
                    {children}
                    <ToastContainer position="top-right" autoClose={3000} />
                </main>
            </div>
        </div>
    );
}
