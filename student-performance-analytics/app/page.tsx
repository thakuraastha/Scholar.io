'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('scholar_user')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role === 'faculty') {
        router.push('/faculty/dashboard')
      } else {
        router.push('/student/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Redirecting...</div>
    </div>
  )
}
