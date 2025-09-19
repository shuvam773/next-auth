'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'


interface User {
    _id: string;
    username: string;
    email: string;
    isVerified?: boolean;
    createdAt?: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Logout failed';
            console.log('Logout failed', message);
        }
    }

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axios.get('/api/users/me');
                setUser(response.data.data);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Error getting user details';
                console.log('Error getting user details', message);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }

        getUserDetails();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                    <button
                        onClick={onLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                user?.isVerified 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {user?.isVerified ? 'Verified' : 'Not Verified'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Account Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">User ID:</span>
                                    <span className="text-gray-800 font-mono text-sm">{user?._id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Username:</span>
                                    <span className="text-gray-800">{user?.username}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="text-gray-800">{user?.email}</span>
                                </div>
                                {user?.createdAt && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Member since:</span>
                                        <span className="text-gray-800">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/edit-profile"
                                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition duration-300"
                                >
                                    Edit Profile
                                </Link>
                                <Link
                                    href="/change-password"
                                    className="block w-full bg-gray-600 hover:bg-gray-700 text-white text-center py-2 px-4 rounded-md transition duration-300"
                                >
                                    Change Password
                                </Link>
                                {!user?.isVerified && (
                                    <button className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center py-2 px-4 rounded-md transition duration-300">
                                        Verify Email
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Security</h3>
                        <p className="text-gray-600 mb-4">Manage your account security settings</p>
                        <Link
                            href="/security"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Security Settings →
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Preferences</h3>
                        <p className="text-gray-600 mb-4">Customize your experience</p>
                        <Link
                            href="/preferences"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Preferences →
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Help & Support</h3>
                        <p className="text-gray-600 mb-4">Get help with your account</p>
                        <Link
                            href="/support"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Get Help →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}