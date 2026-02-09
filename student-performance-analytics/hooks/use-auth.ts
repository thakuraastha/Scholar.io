'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/auth'

export function useAuth(requiredRole?: 'faculty' | 'student') {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem('scholar_user')

    if (!userStr) {
      router.push('/login')
      return
    }

    try {
      const userData = JSON.parse(userStr) as User

      if (requiredRole && userData.role !== requiredRole) {
        router.push(userData.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard')
        return
      }

      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('[v0] Auth error:', error)
      localStorage.removeItem('scholar_user')
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router, requiredRole])

  const logout = () => {
    localStorage.removeItem('scholar_user')
    setUser(null)
    setIsAuthenticated(false)
    router.push('/login')
  }

  return { user, isLoading, isAuthenticated, logout }
}
