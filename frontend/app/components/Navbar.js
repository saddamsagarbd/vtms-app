export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 md:px-20 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-blue-700">VTMS</div>
      <div className="space-x-6">
        <a href="#features" className="text-gray-700 hover:text-blue-600">
          Features
        </a>
        <a href="#pricing" className="text-gray-700 hover:text-blue-600">
          Pricing
        </a>
        <a href="/login" className="text-blue-700 font-semibold">
          Login
        </a>
      </div>
    </nav>
  );
}
