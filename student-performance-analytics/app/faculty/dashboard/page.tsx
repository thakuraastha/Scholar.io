'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, TrendingDown, Users, AlertCircle } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { MOCK_STUDENTS, MOCK_PERFORMANCE_METRICS, CLASS_STATISTICS } from '@/lib/mockData'
import { User } from '@/lib/auth'

export default function FacultyDashboard() {
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
    if (userData.role !== 'faculty') {
      router.push('/student/dashboard')
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

  const atRiskStudents = MOCK_STUDENTS.filter((s) => s.status === 'at-risk')
  const warningStudents = MOCK_STUDENTS.filter((s) => s.status === 'warning')

  const riskDistribution = [
    { name: 'At-Risk', value: CLASS_STATISTICS.atRiskCount, color: '#ef4444' },
    { name: 'Warning', value: CLASS_STATISTICS.warningCount, color: '#f97316' },
    { name: 'Healthy', value: CLASS_STATISTICS.healthyCount, color: '#22c55e' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Scholar</h1>
            <p className="text-sm text-muted-foreground">Faculty Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.department}</p>
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
        {/* Critical Alert */}
        {atRiskStudents.length > 0 && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <strong>{atRiskStudents.length} students</strong> are at high risk of withdrawal. Immediate intervention recommended.
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{CLASS_STATISTICS.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">At-Risk Students</p>
                <p className="text-2xl font-bold text-destructive">{CLASS_STATISTICS.atRiskCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Class Average GPA</p>
                <p className="text-2xl font-bold text-foreground">{CLASS_STATISTICS.avgGPA.toFixed(2)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-muted opacity-50" />
            </div>
          </Card>

          <Card className="bg-card border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Withdrawal Rate</p>
                <p className="text-2xl font-bold text-accent">{CLASS_STATISTICS.withdrawalRate.toFixed(1)}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-accent opacity-50" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Trend */}
          <Card className="lg:col-span-2 bg-card border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MOCK_PERFORMANCE_METRICS}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="avgGPA" stroke="hsl(var(--primary))" name="Avg GPA" />
                <Line type="monotone" dataKey="riskCount" stroke="hsl(var(--destructive))" name="At-Risk Count" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Risk Distribution */}
          <Card className="bg-card border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Risk Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" labelLine={false} label={{ fill: 'hsl(var(--foreground))' }} outerRadius={80} fill="#8884d8" dataKey="value">
                  {riskDistribution.map((entry, index) => (
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

        {/* Attendance Distribution */}
        <Card className="bg-card border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_STUDENTS.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Legend />
              <Bar dataKey="attendanceRate" fill="hsl(var(--primary))" name="Attendance %" />
              <Bar dataKey="assignmentCompletion" fill="hsl(var(--accent))" name="Assignment %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* At-Risk Students Table */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">At-Risk Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GPA</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Attendance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Withdrawal Risk</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {atRiskStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-secondary/20 transition">
                    <td className="py-3 px-4 text-sm text-foreground">{student.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{student.gpa.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{student.attendanceRate}%</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-destructive text-destructive-foreground">{student.withdrawalRisk}%</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/faculty/student/${student.id}`}>
                        <Button size="sm" variant="outline" className="border-border hover:bg-secondary bg-transparent">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
