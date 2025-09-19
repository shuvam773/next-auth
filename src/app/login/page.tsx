'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import  axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('Login success', response.data);
            toast.success('Login success');
            router.push('/profile');
        } catch (err: unknown) {
            let message = 'Login failed';
            if (axios.isAxiosError(err)) {
                type ApiErrorResponse = { error?: string }
                const data = err.response?.data as unknown as ApiErrorResponse | undefined;
                message = data?.error ?? err.message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            console.log('Login failed', message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {loading ? "Processing..." : "Login"}
                </h1>
                
                <hr className="mb-6 border-gray-300" />

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full py-2 px-4 rounded-md font-semibold text-white transition duration-300 ease-in-out
                        ${buttonDisabled || loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                        }`}
                >
                    {loading ? 'Processing...' : buttonDisabled ? 'Fill all fields' : 'Login'}
                </button>

                <div className="text-center mt-4">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot Password?
                    </Link>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    )
}
