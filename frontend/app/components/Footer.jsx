export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 text-center">
      <p>© {new Date().getFullYear()} VTMS. All rights reserved.</p>
      {/* <p className="text-sm mt-2">
        Built with ❤️ using Next.js & TailwindCSS
      </p> */}
    </footer>
  );
}
