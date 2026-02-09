'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { validateCredentials } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const user = validateCredentials(email, password)

      if (!user) {
        setError('Invalid email or password')
        setIsLoading(false)
        return
      }

      // Store user in localStorage (mock implementation)
      localStorage.setItem('scholar_user', JSON.stringify(user))

      // Redirect based on role
      if (user.role === 'faculty') {
        router.push('/faculty/dashboard')
      } else {
        router.push('/student/dashboard')
      }
    } catch (err) {
      setError('An error occurred during login')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Scholar</h1>
          <p className="text-muted-foreground">Predictive Analytics for Student Performance</p>
        </div>

        <Card className="border-border bg-card">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              {error && (
                <Alert className="border-destructive bg-destructive/10">
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            <div className="mt-6 space-y-3 text-xs text-muted-foreground">
              <div className="p-3 bg-secondary/30 rounded border border-border">
                <p className="font-semibold mb-1">Faculty Demo:</p>
                <p>Email: prof.johnson@university.edu</p>
                <p>Password: faculty123</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded border border-border">
                <p className="font-semibold mb-1">Student Demo:</p>
                <p>Email: alex.smith@university.edu</p>
                <p>Password: student123</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
