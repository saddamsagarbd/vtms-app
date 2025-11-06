"use client";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="md:w-1/2 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Smart Vehicle & Transport Management System
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-200">
            Streamline your company’s vehicle scheduling, driver assignments,
            trip tracking, and reports — all in one SaaS platform.
          </p>
          <div className="flex gap-4">
            <a
              href="/sign-up"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-gray-100 transition"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="px-6 py-3 border border-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition"
            >
              Login
            </a>
          </div>
        </div>

        <motion.img
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          src="/vtms-hero.png"
          alt="Vehicle management dashboard"
          className="w-full md:w-1/2 mt-10 md:mt-0"
        />
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-20 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Fleet Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Vehicle Tracking",
              desc: "Monitor vehicle usage, maintenance, and performance effortlessly.",
              icon: "🚗",
            },
            {
              title: "Driver Management",
              desc: "Assign drivers, manage profiles, and track trip history.",
              icon: "🧑‍✈️",
            },
            {
              title: "Reports & Analytics",
              desc: "Generate custom reports for fuel, expenses, and trips.",
              icon: "📊",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow text-center"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Modernize Your Transport System?
        </h2>
        <p className="text-gray-200 mb-6">
          Start your free trial today and experience smart fleet automation.
        </p>
        <a
          href="/sign-up"
          className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full hover:bg-gray-100 transition"
        >
          Start Free Trial
        </a>
      </section>

      <Footer />
    </div>
  );
}
