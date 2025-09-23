import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const isLoggedIn = Boolean(token);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-blue-800">AuthApp</div>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link 
                href="/profile" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </Link>
              <LogoutButton className="px-4 py-2 text-blue-700 hover:text-blue-900 font-medium" />
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 text-blue-700 hover:text-blue-900 font-medium">
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
          Secure Authentication
          <span className="block text-blue-600 mt-2">Made Simple</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          A modern, secure authentication system built with Next.js. Sign up today and experience seamless user authentication with profile management.
        </p>
        
        <div className="mt-10 flex justify-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Get Started
              </Link>
              <LogoutButton className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors" />
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                I have an account
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need for secure authentication
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Sign Up</h3>
                <p className="mt-2 text-gray-600">
                  Create an account with encrypted password storage and secure validation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Login</h3>
                <p className="mt-2 text-gray-600">
                  Quick and secure login with session management and JWT tokens.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Profile Management</h3>
                <p className="mt-2 text-gray-600">
                  Complete user profile with secure data handling and update capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">AuthApp</p>
              <p className="text-gray-400 mt-2">Secure authentication for modern web applications</p>
            </div>
            <div className="flex space-x-6">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="text-gray-300 hover:text-white">
                    Get Started
                  </Link>
                  <LogoutButton className="text-gray-300 hover:text-white" />
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-300 hover:text-white">
                    Login
                  </Link>
                  <Link href="/signup" className="text-gray-300 hover:text-white">
                    Sign Up
                  </Link>
                  <Link href="/profile" className="text-gray-300 hover:text-white">
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AuthApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}