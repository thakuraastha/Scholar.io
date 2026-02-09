// Mock authentication system for Scholar
export type UserRole = 'faculty' | 'student'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  studentId?: string
  department?: string
}

export const MOCK_USERS = {
  faculty: {
    id: 'fac-001',
    email: 'prof.johnson@university.edu',
    name: 'Prof. Johnson',
    role: 'faculty' as UserRole,
    department: 'Computer Science',
  },
  student: {
    id: 'stu-001',
    email: 'alex.smith@university.edu',
    name: 'Alex Smith',
    role: 'student' as UserRole,
    studentId: 'STU-2024-001',
  },
}

export function getUser(email: string): User | null {
  if (email === MOCK_USERS.faculty.email) return MOCK_USERS.faculty
  if (email === MOCK_USERS.student.email) return MOCK_USERS.student
  return null
}

export function validateCredentials(email: string, password: string): User | null {
  // Mock validation - in production, verify against hashed passwords
  if (
    (email === MOCK_USERS.faculty.email && password === 'faculty123') ||
    (email === MOCK_USERS.student.email && password === 'student123')
  ) {
    return getUser(email)
  }
  return null
}
