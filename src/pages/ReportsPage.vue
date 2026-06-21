<script setup lang="ts">
import { computed } from 'vue'
import { AlertTriangle, BarChart3, CheckCircle2, TrendingUp, UsersRound } from '@lucide/vue'

import { courses } from '../data/courses'
import { students } from '../data/students'

const totalStudents = computed(() => students.length)

const averageAttendance = computed(() => {
  const total = students.reduce((sum, student) => sum + student.attendance, 0)
  return Math.round(total / students.length)
})

const averageStudentProgress = computed(() => {
  const total = students.reduce((sum, student) => sum + student.progress, 0)
  return Math.round(total / students.length)
})

const riskStudents = computed(() =>
  students.filter((student) => student.attendance < 60 || student.progress < 45),
)

const activeCourses = computed(() => courses.filter((course) => course.status === 'Aktif'))

const averageCourseProgress = computed(() => {
  const total = courses.reduce((sum, course) => sum + course.progress, 0)
  return Math.round(total / courses.length)
})

const coursePerformance = computed(() =>
  courses.map((course) => {
    const completedLessons = course.modules.reduce(
      (total, module) => total + module.completedLessons,
      0,
    )

    const totalLessons = course.modules.reduce((total, module) => total + module.lessons, 0)

    return {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      status: course.status,
      students: course.students,
      progress: course.progress,
      completedLessons,
      totalLessons,
    }
  }),
)

const reportCards = computed(() => [
  {
    title: 'Toplam öğrenci',
    value: totalStudents.value.toString(),
    description: 'Sistemde kayıtlı toplam öğrenci sayısı.',
    icon: UsersRound,
  },
  {
    title: 'Ortalama devam',
    value: `%${averageAttendance.value}`,
    description: 'Tüm öğrencilerin ortalama derse katılım oranı.',
    icon: CheckCircle2,
  },
  {
    title: 'Ortalama ilerleme',
    value: `%${averageStudentProgress.value}`,
    description: 'Öğrencilerin ders tamamlama ilerleme ortalaması.',
    icon: TrendingUp,
  },
  {
    title: 'Riskli öğrenci',
    value: riskStudents.value.length.toString(),
    description: 'Devamı veya ilerlemesi düşük öğrenciler.',
    icon: AlertTriangle,
    warning: true,
  },
])
</script>

<template>
  <main class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Raporlama</p>
        <h1>Eğitim raporları</h1>
        <p class="description">
          Öğrenci devam oranları, kurs ilerlemeleri, modül tamamlama durumları ve takip gerektiren
          öğrenciler bu ekranda özetlenir.
        </p>
      </div>
    </header>

    <section class="report-grid" aria-label="Rapor özetleri">
      <article
        v-for="card in reportCards"
        :key="card.title"
        class="report-card"
        :class="{ warning: card.warning }"
      >
        <div class="card-icon">
          <component :is="card.icon" :size="22" />
        </div>

        <span>{{ card.title }}</span>
        <strong>{{ card.value }}</strong>
        <p>{{ card.description }}</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel-card wide">
        <div class="section-header">
          <div>
            <p class="eyebrow">Kurs performansı</p>
            <h2>Kurs bazlı ilerleme</h2>
          </div>

          <BarChart3 :size="24" />
        </div>

        <div class="course-report-list">
          <article v-for="course in coursePerformance" :key="course.id" class="course-report-row">
            <div class="course-info">
              <strong>{{ course.title }}</strong>
              <span>
                {{ course.instructor }} · {{ course.students }} öğrenci ·
                {{ course.completedLessons }}/{{ course.totalLessons }} ders
              </span>
            </div>

            <span
              class="status"
              :class="{
                planned: course.status === 'Planlandı',
                draft: course.status === 'Taslak',
              }"
            >
              {{ course.status }}
            </span>

            <div class="progress-area">
              <strong>%{{ course.progress }}</strong>

              <div class="progress-track">
                <div class="progress-bar" :style="{ width: `${course.progress}%` }" />
              </div>
            </div>
          </article>
        </div>
      </article>

      <article class="panel-card">
        <div class="section-header">
          <div>
            <p class="eyebrow">Takip listesi</p>
            <h2>Riskli öğrenciler</h2>
          </div>
        </div>

        <div class="risk-list">
          <article v-for="student in riskStudents" :key="student.id" class="risk-item">
            <div>
              <strong>{{ student.name }}</strong>
              <span>{{ student.course }}</span>
            </div>

            <div class="risk-meta">
              <small>Devam %{{ student.attendance }}</small>
              <small>İlerleme %{{ student.progress }}</small>
            </div>
          </article>

          <p v-if="riskStudents.length === 0" class="empty-text">
            Takip gerektiren öğrenci bulunmuyor.
          </p>
        </div>
      </article>
    </section>

    <section class="insight-card">
      <div>
        <p class="eyebrow">Genel değerlendirme</p>
        <h2>Haftalık eğitim özeti</h2>
      </div>

      <p>
        Aktif kurs sayısı {{ activeCourses.length }}. Kursların genel ilerleme ortalaması
        %{{ averageCourseProgress }} seviyesinde. Öğrenci devam ortalaması %{{ averageAttendance }}
        olduğu için sistem genelinde katılım güçlü görünüyor; ancak düşük ilerleme ve düşük devam
        oranına sahip öğrencilerin ayrıca takip edilmesi gerekiyor.
      </p>
    </section>
  </main>
</template>

<style scoped>
.page {
  padding: 32px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  color: #0f172a;
  font-size: clamp(30px, 4vw, 42px);
  letter-spacing: -0.04em;
}

h2 {
  margin-bottom: 0;
  color: #0f172a;
  font-size: 22px;
  letter-spacing: -0.03em;
}

.description {
  max-width: 760px;
  margin: 12px 0 0;
  color: var(--color-muted);
  line-height: 1.7;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 18px;
}

.report-card,
.panel-card,
.insight-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.report-card {
  padding: 22px;
}

.card-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 14px;
  background: #eff6ff;
  color: var(--color-primary);
}

.report-card.warning .card-icon {
  background: #fef3c7;
  color: #b45309;
}

.report-card span {
  display: block;
  color: var(--color-muted);
  font-size: 14px;
}

.report-card strong {
  display: block;
  margin-top: 10px;
  color: #0f172a;
  font-size: 32px;
  letter-spacing: -0.04em;
}

.report-card.warning strong {
  color: #b45309;
}

.report-card p {
  margin: 10px 0 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 18px;
}

.panel-card {
  padding: 24px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}

.section-header svg {
  color: var(--color-primary);
}

.course-report-list {
  display: grid;
  gap: 14px;
}

.course-report-row {
  display: grid;
  grid-template-columns: 1fr 110px 180px;
  gap: 18px;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface-soft);
}

.course-info strong {
  display: block;
  color: #0f172a;
}

.course-info span {
  display: block;
  margin-top: 6px;
  color: var(--color-muted);
  line-height: 1.5;
}

.status {
  width: fit-content;
  padding: 7px 10px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-size: 13px;
  font-weight: 800;
}

.status.planned {
  background: #eff6ff;
  color: var(--color-primary);
}

.status.draft {
  background: #f1f5f9;
  color: #475569;
}

.progress-area strong {
  display: block;
  margin-bottom: 8px;
  color: #0f172a;
  text-align: right;
}

.progress-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #dbeafe;
}

.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: var(--color-primary);
}

.risk-list {
  display: grid;
  gap: 12px;
}

.risk-item {
  display: grid;
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  background: var(--color-surface-soft);
}

.risk-item strong {
  display: block;
  color: #0f172a;
}

.risk-item span {
  display: block;
  margin-top: 5px;
  color: var(--color-muted);
  line-height: 1.5;
}

.risk-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.risk-meta small {
  padding: 6px 9px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font-weight: 800;
}

.empty-text {
  margin: 0;
  color: var(--color-muted);
}

.insight-card {
  margin-top: 18px;
  padding: 24px;
}

.insight-card p:last-child {
  max-width: 960px;
  margin: 16px 0 0;
  color: var(--color-muted);
  line-height: 1.8;
}

@media (max-width: 1180px) {
  .report-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .course-report-row {
    grid-template-columns: 1fr;
  }

  .progress-area strong {
    text-align: left;
  }
}

@media (max-width: 760px) {
  .page {
    padding: 22px;
  }

  .report-grid {
    grid-template-columns: 1fr;
  }
}
</style>