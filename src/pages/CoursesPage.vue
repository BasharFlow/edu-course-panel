<script setup lang="ts">
import { computed, ref } from 'vue'
import { BookOpen, Clock, Plus, Search, Users } from '@lucide/vue'

import { courses } from '../data/courses'
import type { CourseStatus } from '../types'

const searchQuery = ref('')
const selectedStatus = ref<'Tümü' | CourseStatus>('Tümü')

const statusOptions: Array<'Tümü' | CourseStatus> = ['Tümü', 'Aktif', 'Planlandı', 'Taslak']

const filteredCourses = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')

  return courses.filter((course) => {
    const matchesSearch =
      course.title.toLocaleLowerCase('tr-TR').includes(query) ||
      course.category.toLocaleLowerCase('tr-TR').includes(query) ||
      course.instructor.toLocaleLowerCase('tr-TR').includes(query)

    const matchesStatus =
      selectedStatus.value === 'Tümü' || course.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

const activeCourseCount = computed(() => courses.filter((course) => course.status === 'Aktif').length)

const totalStudentCount = computed(() =>
  courses.reduce((total, course) => total + course.students, 0),
)

const averageProgress = computed(() => {
  const total = courses.reduce((sum, course) => sum + course.progress, 0)
  return Math.round(total / courses.length)
})

function getCompletedLessonCount(courseId: number) {
  const course = courses.find((item) => item.id === courseId)

  if (!course) {
    return 0
  }

  return course.modules.reduce((total, module) => total + module.completedLessons, 0)
}

function getTotalLessonCount(courseId: number) {
  const course = courses.find((item) => item.id === courseId)

  if (!course) {
    return 0
  }

  return course.modules.reduce((total, module) => total + module.lessons, 0)
}
</script>

<template>
  <main class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Kurs Yönetimi</p>
        <h1>Kurslar</h1>
        <p class="description">
          Kurslar, eğitmenler, modül yapıları, öğrenci sayıları ve e-kurs ilerleme durumları bu
          ekrandan takip edilir.
        </p>
      </div>

      <button class="primary-action" type="button">
        <Plus :size="18" />
        Yeni kurs
      </button>
    </header>

    <section class="summary-grid" aria-label="Kurs özetleri">
      <article class="summary-card">
        <span>Toplam kurs</span>
        <strong>{{ courses.length }}</strong>
      </article>

      <article class="summary-card">
        <span>Aktif kurs</span>
        <strong>{{ activeCourseCount }}</strong>
      </article>

      <article class="summary-card">
        <span>Toplam öğrenci</span>
        <strong>{{ totalStudentCount }}</strong>
      </article>

      <article class="summary-card">
        <span>Ortalama ilerleme</span>
        <strong>%{{ averageProgress }}</strong>
      </article>
    </section>

    <section class="toolbar">
      <label class="search-box">
        <Search :size="18" />
        <input v-model="searchQuery" type="search" placeholder="Kurs, kategori veya eğitmen ara" />
      </label>

      <select v-model="selectedStatus" aria-label="Kurs durum filtresi">
        <option v-for="status in statusOptions" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </section>

    <section class="course-grid">
      <article v-for="course in filteredCourses" :key="course.id" class="course-card">
        <div class="card-top">
          <span>{{ course.category }}</span>

          <strong
            class="status"
            :class="{
              planned: course.status === 'Planlandı',
              draft: course.status === 'Taslak',
            }"
          >
            {{ course.status }}
          </strong>
        </div>

        <h2>{{ course.title }}</h2>
        <p class="instructor">Eğitmen: {{ course.instructor }}</p>

        <div class="meta-list">
          <span>
            <Users :size="17" />
            {{ course.students }} öğrenci
          </span>

          <span>
            <Clock :size="17" />
            {{ course.duration }}
          </span>

          <span>
            <BookOpen :size="17" />
            {{ course.level }} seviye
          </span>
        </div>

        <div class="progress-block">
          <div class="progress-label">
            <span>Kurs ilerleme</span>
            <strong>%{{ course.progress }}</strong>
          </div>

          <div class="progress-track">
            <div class="progress-bar" :style="{ width: `${course.progress}%` }" />
          </div>
        </div>

        <div class="module-block">
          <div class="module-head">
            <strong>Modüller</strong>
            <span>
              {{ getCompletedLessonCount(course.id) }} /
              {{ getTotalLessonCount(course.id) }} ders
            </span>
          </div>

          <ul>
            <li v-for="module in course.modules" :key="module.title">
              <span>{{ module.title }}</span>
              <small>{{ module.completedLessons }}/{{ module.lessons }}</small>
            </li>
          </ul>
        </div>

        <footer class="card-footer">
          <span>Sonraki ders</span>
          <strong>{{ course.nextSession }}</strong>
        </footer>
      </article>

      <div v-if="filteredCourses.length === 0" class="empty-state">
        Aramanıza uygun kurs bulunamadı.
      </div>
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

h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(30px, 4vw, 42px);
  letter-spacing: -0.04em;
}

.description {
  max-width: 740px;
  margin: 12px 0 0;
  color: var(--color-muted);
  line-height: 1.7;
}

.primary-action {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  padding: 12px 16px;
  border: 0;
  border-radius: 999px;
  background: var(--color-primary);
  color: white;
  font-weight: 800;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 18px;
}

.summary-card {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.summary-card span {
  display: block;
  color: var(--color-muted);
  font-size: 14px;
}

.summary-card strong {
  display: block;
  margin-top: 10px;
  color: #0f172a;
  font-size: 30px;
  letter-spacing: -0.04em;
}

.toolbar {
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
}

.search-box {
  flex: 1;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
}

.search-box svg {
  color: var(--color-muted);
}

.search-box input,
.toolbar select {
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-text);
}

.search-box input {
  width: 100%;
}

.toolbar select {
  width: 180px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.course-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-top > span {
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 900;
}

.status {
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

.course-card h2 {
  margin: 20px 0 8px;
  color: #0f172a;
  font-size: 22px;
  letter-spacing: -0.03em;
}

.instructor {
  margin: 0;
  color: var(--color-muted);
}

.meta-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.meta-list span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 11px;
  border-radius: 999px;
  background: var(--color-surface-soft);
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 700;
}

.meta-list svg {
  color: var(--color-primary);
}

.progress-block {
  margin-top: 22px;
}

.progress-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 9px;
}

.progress-label span {
  color: var(--color-muted);
}

.progress-label strong {
  color: #0f172a;
}

.progress-track {
  height: 9px;
  overflow: hidden;
  border-radius: 999px;
  background: #dbeafe;
}

.progress-bar {
  height: 100%;
  border-radius: inherit;
  background: var(--color-primary);
}

.module-block {
  margin-top: 22px;
  padding: 16px;
  border-radius: 18px;
  background: var(--color-surface-soft);
}

.module-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.module-head strong {
  color: #0f172a;
}

.module-head span {
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 800;
}

.module-block ul {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.module-block li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: var(--color-muted);
}

.module-block small {
  flex: 0 0 auto;
  color: #0f172a;
  font-weight: 800;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
}

.card-footer span {
  color: var(--color-muted);
}

.card-footer strong {
  color: #0f172a;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-muted);
  text-align: center;
}

@media (max-width: 1100px) {
  .summary-grid,
  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .page {
    padding: 22px;
  }

  .page-header,
  .toolbar {
    flex-direction: column;
  }

  .toolbar select,
  .primary-action {
    width: 100%;
  }

  .summary-grid,
  .course-grid {
    grid-template-columns: 1fr;
  }

  .card-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>