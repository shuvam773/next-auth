'use client'
import React from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function LogoutButton({ className, children }: Props) {
  const [loading, setLoading] = React.useState(false)

  const onLogout = async () => {
    try {
      setLoading(true)
      await fetch('/api/users/logout', { method: 'GET' })
      window.location.href = '/'
    } catch (error: unknown) {
      // noop
      console.log(error);
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={onLogout} className={className} disabled={loading}>
      {loading ? 'Logging out...' : (children ?? 'Logout')}
    </button>
  )
}


