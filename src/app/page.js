import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">Welcome to My Website</h1>
      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-[#a6e06f] hover:bg-[#95cb60] text-black py-2 px-6 rounded-md font-medium"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-6 rounded-md font-medium"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
