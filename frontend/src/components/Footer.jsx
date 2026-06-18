export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-gray-600 hover:text-gray-800 transition">
              Privacy
            </a>
            <a href="/terms" className="text-gray-600 hover:text-gray-800 transition">
              Terms
            </a>
          </div>

          <div className="text-gray-600 font-medium">
            &copy; Wanderlust Private Limited
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-rose-500 transition text-2xl">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-rose-500 transition text-2xl">
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-rose-500 transition text-2xl">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
