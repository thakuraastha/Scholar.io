'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react'
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
} from 'recharts'
import { MOCK_STUDENTS, MOCK_STUDENT_PROFILE } from '@/lib/mockData'
import { User } from '@/lib/auth'

export default function StudentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.id as string
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userStr = localStorage.getItem('scholar_user')
    if (!userStr) {
      router.push('/login')
      return
    }

    const userData = JSON.parse(userStr) as User
    if (userData.role !== 'faculty') {
      router.push('/student/dashboard')
      return
    }

    setUser(userData)
    setIsLoading(false)
  }, [router])

  const student = MOCK_STUDENTS.find((s) => s.id === studentId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/faculty/dashboard">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <p className="text-muted-foreground">Student not found</p>
        </div>
      </div>
    )
  }

  const performanceData = [
    { week: 'Week 1', gpa: 2.5, target: 3.0 },
    { week: 'Week 2', gpa: 2.4, target: 3.0 },
    { week: 'Week 3', gpa: 2.3, target: 3.0 },
    { week: 'Week 4', gpa: 2.2, target: 3.0 },
    { week: 'Week 5', gpa: 2.3, target: 3.0 },
  ]

  const riskBreakdown = [
    { category: 'Attendance', value: 100 - student.attendanceRate, color: '#ef4444' },
    { category: 'Assignment', value: 100 - student.assignmentCompletion, color: '#f97316' },
    { category: 'Engagement', value: 100 - student.engagement, color: '#eab308' },
  ]

  const statusColor =
    student.status === 'at-risk' ? 'bg-destructive' : student.status === 'warning' ? 'bg-yellow-600' : 'bg-green-600'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/faculty/dashboard">
            <Button variant="outline" size="sm" className="mb-3 border-border hover:bg-secondary bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{student.name}</h1>
          <p className="text-sm text-muted-foreground">{student.studentId}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current GPA</p>
                <p className="text-2xl font-bold text-foreground">{student.gpa.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Withdrawal Risk</p>
                <p className="text-2xl font-bold text-destructive">{student.withdrawalRisk}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                <p className="text-2xl font-bold text-foreground">{student.attendanceRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Risk Status</p>
                <Badge className={statusColor}>{student.status.charAt(0).toUpperCase() + student.status.slice(1)}</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* GPA Trend */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">GPA Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 4]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="gpa" stroke="hsl(var(--primary))" name="Current GPA" />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--accent))" name="Target GPA" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Risk Breakdown */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Risk Factors</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--destructive))" name="Risk Level %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Detailed Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Assignment Completion</p>
              <div className="bg-secondary/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all"
                  style={{ width: `${student.assignmentCompletion}%` }}
                />
              </div>
              <p className="text-sm font-semibold text-foreground mt-2">{student.assignmentCompletion}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Engagement Score</p>
              <div className="bg-secondary/20 rounded-full h-2 overflow-hidden">
                <div className="bg-accent h-full transition-all" style={{ width: `${student.engagement}%` }} />
              </div>
              <p className="text-sm font-semibold text-foreground mt-2">{student.engagement}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Failure Risk</p>
              <div className="bg-secondary/20 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-destructive h-full transition-all"
                  style={{ width: `${student.failureRisk}%` }}
                />
              </div>
              <p className="text-sm font-semibold text-foreground mt-2">{student.failureRisk}%</p>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="bg-secondary/30 border border-secondary mt-6 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Faculty Recommendations</h2>
          <ul className="space-y-3">
            <li className="flex gap-3 items-start">
              <Badge className="bg-destructive text-destructive-foreground mt-1 shrink-0">URGENT</Badge>
              <p className="text-sm text-muted-foreground">
                High withdrawal risk detected. Schedule a meeting with this student to discuss academic support options.
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <Badge className="bg-yellow-600 text-white mt-1 shrink-0">ALERT</Badge>
              <p className="text-sm text-muted-foreground">
                Attendance is declining. Consider early intervention through email or office hours.
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <Badge className="bg-primary text-primary-foreground mt-1 shrink-0">ACTION</Badge>
              <p className="text-sm text-muted-foreground">
                Connect with academic support services to provide tutoring resources.
              </p>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
