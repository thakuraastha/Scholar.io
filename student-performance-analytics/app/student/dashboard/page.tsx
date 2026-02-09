'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, TrendingUp, BookOpen, CheckCircle, AlertCircle } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { MOCK_STUDENT_PROFILE } from '@/lib/mockData'
import { User } from '@/lib/auth'

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userStr = localStorage.getItem('scholar_user')
    if (!userStr) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(userStr) as User
    if (userData.role !== 'student') {
      router.push('/faculty/dashboard')
      return
    }

    setUser(userData)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('scholar_user')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const performanceData = [
    { week: 'Week 1', performance: 72, target: 80 },
    { week: 'Week 2', performance: 68, target: 80 },
    { week: 'Week 3', performance: 65, target: 80 },
    { week: 'Week 4', performance: 70, target: 80 },
    { week: 'Week 5', performance: 68, target: 80 },
  ]

  const gpaProgress = [
    { name: 'Current GPA', value: MOCK_STUDENT_PROFILE.currentGPA, color: '#ef4444' },
    { name: 'Gap to Target', value: MOCK_STUDENT_PROFILE.targetGPA - MOCK_STUDENT_PROFILE.currentGPA, color: '#94a3b8' },
  ]

  const isAtRisk = MOCK_STUDENT_PROFILE.currentGPA < 2.5

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Scholar</h1>
            <p className="text-sm text-muted-foreground">Student Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.studentId}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-border hover:bg-secondary bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Risk Alert */}
        {isAtRisk && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <strong>Your academic performance is below expectations.</strong> We recommend connecting with your academic advisor for support strategies.
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current GPA</p>
                <p className="text-2xl font-bold text-foreground">{MOCK_STUDENT_PROFILE.currentGPA.toFixed(2)}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Target GPA</p>
                <p className="text-2xl font-bold text-foreground">{MOCK_STUDENT_PROFILE.targetGPA.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                <p className="text-2xl font-bold text-foreground">{MOCK_STUDENT_PROFILE.attendanceRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Assignments Done</p>
                <p className="text-2xl font-bold text-foreground">
                  {MOCK_STUDENT_PROFILE.assignmentsCompleted}/{MOCK_STUDENT_PROFILE.totalAssignments}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Trend */}
          <Card className="lg:col-span-2 bg-card border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="performance" stroke="hsl(var(--primary))" name="Your Performance" />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--accent))" name="Target Score" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* GPA Progress */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">GPA Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={gpaProgress} cx="50%" cy="50%" innerRadius={40} outerRadius={80} fill="#8884d8" dataKey="value">
                  {gpaProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Exam Scores */}
        <Card className="bg-card border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Exam Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_STUDENT_PROFILE.exams}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" name="Score" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Factors & Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Factors */}
          <Card className="bg-card border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h2 className="text-lg font-semibold text-foreground">Areas of Concern</h2>
            </div>
            <ul className="space-y-2">
              {MOCK_STUDENT_PROFILE.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Strengths */}
          <Card className="bg-card border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Strengths</h2>
            </div>
            <ul className="space-y-2">
              {MOCK_STUDENT_PROFILE.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="bg-secondary/30 border border-secondary mt-6 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Actions</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 items-start">
              <Badge className="bg-primary text-primary-foreground mt-1 shrink-0">1</Badge>
              <div>
                <p className="font-medium text-foreground">Improve Attendance</p>
                <p className="text-sm text-muted-foreground">Attend at least 80% of classes to strengthen your engagement.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Badge className="bg-primary text-primary-foreground mt-1 shrink-0">2</Badge>
              <div>
                <p className="font-medium text-foreground">Complete All Assignments</p>
                <p className="text-sm text-muted-foreground">Only 55% completion rate. Focus on staying current with course work.</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <Badge className="bg-primary text-primary-foreground mt-1 shrink-0">3</Badge>
              <div>
                <p className="font-medium text-foreground">Connect with Support Services</p>
                <p className="text-sm text-muted-foreground">Schedule a meeting with your academic advisor this week.</p>
              </div>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
