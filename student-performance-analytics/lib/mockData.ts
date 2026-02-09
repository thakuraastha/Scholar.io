// Mock data for Scholar analytics

export interface StudentRiskData {
  id: string
  name: string
  studentId: string
  gpa: number
  attendanceRate: number
  assignmentCompletion: number
  withdrawalRisk: number
  failureRisk: number
  engagement: number
  lastActive: string
  status: 'at-risk' | 'warning' | 'healthy'
}

export interface PerformanceMetric {
  date: string
  students: number
  avgGPA: number
  avgAttendance: number
  riskCount: number
}

export interface StudentPerformance {
  id: string
  name: string
  currentGPA: number
  targetGPA: number
  attendanceRate: number
  assignmentsCompleted: number
  totalAssignments: number
  exams: Array<{
    name: string
    score: number
    date: string
  }>
  riskFactors: string[]
  strengths: string[]
}

export const MOCK_STUDENTS: StudentRiskData[] = [
  {
    id: 'stu-001',
    name: 'Alex Smith',
    studentId: 'STU-2024-001',
    gpa: 2.3,
    attendanceRate: 65,
    assignmentCompletion: 55,
    withdrawalRisk: 78,
    failureRisk: 42,
    engagement: 35,
    lastActive: '2024-02-08',
    status: 'at-risk',
  },
  {
    id: 'stu-002',
    name: 'Jordan Davis',
    studentId: 'STU-2024-002',
    gpa: 3.7,
    attendanceRate: 94,
    assignmentCompletion: 96,
    withdrawalRisk: 5,
    failureRisk: 2,
    engagement: 92,
    lastActive: '2024-02-09',
    status: 'healthy',
  },
  {
    id: 'stu-003',
    name: 'Casey Wong',
    studentId: 'STU-2024-003',
    gpa: 2.8,
    attendanceRate: 72,
    assignmentCompletion: 68,
    withdrawalRisk: 45,
    failureRisk: 28,
    engagement: 58,
    lastActive: '2024-02-07',
    status: 'warning',
  },
  {
    id: 'stu-004',
    name: 'Morgan Lee',
    studentId: 'STU-2024-004',
    gpa: 3.2,
    attendanceRate: 88,
    assignmentCompletion: 82,
    withdrawalRisk: 12,
    failureRisk: 8,
    engagement: 75,
    lastActive: '2024-02-09',
    status: 'healthy',
  },
  {
    id: 'stu-005',
    name: 'Riley Anderson',
    studentId: 'STU-2024-005',
    gpa: 2.1,
    attendanceRate: 48,
    assignmentCompletion: 42,
    withdrawalRisk: 85,
    failureRisk: 64,
    engagement: 28,
    lastActive: '2024-02-06',
    status: 'at-risk',
  },
  {
    id: 'stu-006',
    name: 'Taylor White',
    studentId: 'STU-2024-006',
    gpa: 3.5,
    attendanceRate: 92,
    assignmentCompletion: 88,
    withdrawalRisk: 8,
    failureRisk: 5,
    engagement: 88,
    lastActive: '2024-02-09',
    status: 'healthy',
  },
]

export const MOCK_PERFORMANCE_METRICS: PerformanceMetric[] = [
  {
    date: '2024-01-15',
    students: 120,
    avgGPA: 3.1,
    avgAttendance: 82,
    riskCount: 18,
  },
  {
    date: '2024-01-22',
    students: 120,
    avgGPA: 3.08,
    avgAttendance: 80,
    riskCount: 22,
  },
  {
    date: '2024-01-29',
    students: 120,
    avgGPA: 3.05,
    avgAttendance: 78,
    riskCount: 26,
  },
  {
    date: '2024-02-05',
    students: 120,
    avgGPA: 3.02,
    avgAttendance: 75,
    riskCount: 31,
  },
  {
    date: '2024-02-09',
    students: 120,
    avgGPA: 3.0,
    avgAttendance: 74,
    riskCount: 35,
  },
]

export const MOCK_STUDENT_PROFILE: StudentPerformance = {
  id: 'stu-001',
  name: 'Alex Smith',
  currentGPA: 2.3,
  targetGPA: 3.0,
  attendanceRate: 65,
  assignmentsCompleted: 11,
  totalAssignments: 20,
  exams: [
    { name: 'Midterm', score: 68, date: '2024-01-20' },
    { name: 'Quiz 1', score: 72, date: '2024-02-01' },
    { name: 'Quiz 2', score: 65, date: '2024-02-08' },
  ],
  riskFactors: [
    'Low attendance rate (65%)',
    'Declining assignment completion',
    'Below average exam performance',
    'Reduced engagement this week',
  ],
  strengths: ['Completed foundational concepts module', 'Participated in study group', 'Submitted recent assignment on time'],
}

export const CLASS_STATISTICS = {
  totalStudents: 120,
  atRiskCount: 18,
  warningCount: 34,
  healthyCount: 68,
  avgGPA: 3.0,
  withdrawalRate: 12.5,
}
