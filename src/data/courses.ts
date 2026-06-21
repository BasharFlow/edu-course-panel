import type { Course } from '../types'

export const courses: Course[] = [
  {
    id: 1,
    title: 'Frontend Temelleri',
    category: 'Web Geliştirme',
    instructor: 'Ayşe Kara',
    level: 'Başlangıç',
    status: 'Aktif',
    students: 42,
    duration: '8 hafta',
    progress: 74,
    nextSession: 'Pazartesi 19:00',
    modules: [
      {
        title: 'HTML ve semantik yapı',
        lessons: 6,
        completedLessons: 6,
      },
      {
        title: 'CSS düzen sistemleri',
        lessons: 8,
        completedLessons: 5,
      },
      {
        title: 'JavaScript temelleri',
        lessons: 10,
        completedLessons: 6,
      },
    ],
  },
  {
    id: 2,
    title: 'Vue ile Uygulama Geliştirme',
    category: 'Frontend',
    instructor: 'Can Erdem',
    level: 'Orta',
    status: 'Aktif',
    students: 31,
    duration: '6 hafta',
    progress: 62,
    nextSession: 'Çarşamba 20:00',
    modules: [
      {
        title: 'Vue component yapısı',
        lessons: 7,
        completedLessons: 7,
      },
      {
        title: 'Router ve sayfa yönetimi',
        lessons: 5,
        completedLessons: 4,
      },
      {
        title: 'State yönetimi',
        lessons: 6,
        completedLessons: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'Veritabanı ve API Mantığı',
    category: 'Backend Temelleri',
    instructor: 'Selin Koç',
    level: 'Orta',
    status: 'Planlandı',
    students: 26,
    duration: '5 hafta',
    progress: 48,
    nextSession: 'Cuma 18:30',
    modules: [
      {
        title: 'Veri modeli oluşturma',
        lessons: 5,
        completedLessons: 3,
      },
      {
        title: 'REST API mantığı',
        lessons: 7,
        completedLessons: 3,
      },
      {
        title: 'Yetkilendirme temelleri',
        lessons: 4,
        completedLessons: 1,
      },
    ],
  },
  {
    id: 4,
    title: 'E-kurs İçerik Yönetimi',
    category: 'Dijital Eğitim',
    instructor: 'Derya Uslu',
    level: 'İleri',
    status: 'Taslak',
    students: 18,
    duration: '4 hafta',
    progress: 35,
    nextSession: 'Henüz planlanmadı',
    modules: [
      {
        title: 'Ders içerik planı',
        lessons: 4,
        completedLessons: 2,
      },
      {
        title: 'Video ve doküman akışı',
        lessons: 5,
        completedLessons: 2,
      },
      {
        title: 'Ödev ve değerlendirme',
        lessons: 4,
        completedLessons: 1,
      },
    ],
  },
]