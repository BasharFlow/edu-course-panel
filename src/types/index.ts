export type StudentStatus = 'Aktif' | 'Takipte' | 'Pasif'

export type Student = {
  id: number
  name: string
  email: string
  course: string
  status: StudentStatus
  progress: number
  attendance: number
  lastActivity: string
}

export type CourseStatus = 'Aktif' | 'Planlandı' | 'Taslak'

export type CourseLevel = 'Başlangıç' | 'Orta' | 'İleri'

export type CourseModule = {
  title: string
  lessons: number
  completedLessons: number
}

export type Course = {
  id: number
  title: string
  category: string
  instructor: string
  level: CourseLevel
  status: CourseStatus
  students: number
  duration: string
  progress: number
  nextSession: string
  modules: CourseModule[]
}