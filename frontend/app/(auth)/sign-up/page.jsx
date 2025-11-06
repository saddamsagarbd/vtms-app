"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [logo, setLogo] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setLogo(file);
        setPreview(URL.createObjectURL(file)); // Generate preview
        } else {
        setLogo(null);
        setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = new FormData();
        data.append("companyName", formData.companyName);
        data.append("companyEmail", formData.companyEmail);
        data.append("companyPhone", formData.companyPhone);
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        if (logo) data.append("logo", logo);

        console.log(data);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register-company`, {
                method: "POST",
                body: data,
            });

            const response = await res.json();
            if (res.ok) {
                alert("✅ Company Registered Successfully!");
                setFormData({
                    companyName: "",
                    companyEmail: "",
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setLogo(null);
                setPreview(null);
            } else {
                alert("❌ " + response.message);
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                Create Company Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1: Company Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Company Name</label>
                            <input
                            type="text"
                            placeholder="Your Company Ltd."
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Company Email</label>
                            <input
                            type="email"
                            placeholder="company@example.com"
                            value={formData.companyEmail}
                            onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Company Phone</label>
                            <input
                            type="text"
                            placeholder="017XXXXXXXX"
                            value={formData.companyPhone}
                            onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Company Logo</label>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                            {preview && (
                            <img
                                src={preview}
                                alt="Logo Preview"
                                className="mt-2 w-32 h-32 object-contain border rounded-md"
                            />
                            )}
                        </div>
                    </div>

                    {/* Column 2: Admin Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Admin Name</label>
                            <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Admin Email</label>
                            <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                            <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition mt-4"
                >
                    Sign Up
                </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-700 font-semibold">
                    Login
                </Link>
                </p>
            </div>
            </div>
    );
}
