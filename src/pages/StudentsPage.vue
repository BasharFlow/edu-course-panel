<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search, UserPlus } from '@lucide/vue'

import { students } from '../data/students'
import type { StudentStatus } from '../types'

const searchQuery = ref('')
const selectedStatus = ref<'Tümü' | StudentStatus>('Tümü')

const statusOptions: Array<'Tümü' | StudentStatus> = ['Tümü', 'Aktif', 'Takipte', 'Pasif']

const filteredStudents = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase('tr-TR')

  return students.filter((student) => {
    const matchesSearch =
      student.name.toLocaleLowerCase('tr-TR').includes(query) ||
      student.email.toLocaleLowerCase('tr-TR').includes(query) ||
      student.course.toLocaleLowerCase('tr-TR').includes(query)

    const matchesStatus =
      selectedStatus.value === 'Tümü' || student.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

const activeCount = computed(() => students.filter((student) => student.status === 'Aktif').length)

const watchCount = computed(() => students.filter((student) => student.status === 'Takipte').length)

const averageProgress = computed(() => {
  const total = students.reduce((sum, student) => sum + student.progress, 0)
  return Math.round(total / students.length)
})
</script>

<template>
  <main class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Öğrenci Yönetimi</p>
        <h1>Öğrenciler</h1>
        <p class="description">
          Kayıtlı öğrenciler, bağlı oldukları kurslar, devam oranları ve ilerleme durumları bu
          ekrandan takip edilir.
        </p>
      </div>

      <button class="primary-action" type="button">
        <UserPlus :size="18" />
        Yeni öğrenci
      </button>
    </header>

    <section class="summary-grid" aria-label="Öğrenci özetleri">
      <article class="summary-card">
        <span>Toplam öğrenci</span>
        <strong>{{ students.length }}</strong>
      </article>

      <article class="summary-card">
        <span>Aktif öğrenci</span>
        <strong>{{ activeCount }}</strong>
      </article>

      <article class="summary-card warning">
        <span>Takip gereken</span>
        <strong>{{ watchCount }}</strong>
      </article>

      <article class="summary-card">
        <span>Ortalama ilerleme</span>
        <strong>%{{ averageProgress }}</strong>
      </article>
    </section>

    <section class="toolbar">
      <label class="search-box">
        <Search :size="18" />
        <input v-model="searchQuery" type="search" placeholder="Öğrenci, e-posta veya kurs ara" />
      </label>

      <select v-model="selectedStatus" aria-label="Öğrenci durum filtresi">
        <option v-for="status in statusOptions" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </section>

    <section class="table-card">
      <div class="table-head">
        <span>Öğrenci</span>
        <span>Kurs</span>
        <span>Durum</span>
        <span>Devam</span>
        <span>İlerleme</span>
        <span>Son aktivite</span>
      </div>

      <article v-for="student in filteredStudents" :key="student.id" class="student-row">
        <div class="student-info">
          <span class="avatar">{{ student.name.charAt(0) }}</span>

          <div>
            <strong>{{ student.name }}</strong>
            <small>{{ student.email }}</small>
          </div>
        </div>

        <span class="course-name">{{ student.course }}</span>

        <span
          class="status"
          :class="{
            warning: student.status === 'Takipte',
            muted: student.status === 'Pasif',
          }"
        >
          {{ student.status }}
        </span>

        <span class="attendance">%{{ student.attendance }}</span>

        <div class="progress">
          <strong>%{{ student.progress }}</strong>
          <div class="progress-track">
            <div class="progress-bar" :style="{ width: `${student.progress}%` }" />
          </div>
        </div>

        <span class="last-activity">{{ student.lastActivity }}</span>
      </article>

      <div v-if="filteredStudents.length === 0" class="empty-state">
        Aramanıza uygun öğrenci bulunamadı.
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
  max-width: 720px;
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

.summary-card.warning strong {
  color: #b45309;
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

.table-card {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.table-head,
.student-row {
  display: grid;
  grid-template-columns: 1.45fr 1.2fr 110px 80px 160px 110px;
  gap: 18px;
  align-items: center;
  padding: 18px 22px;
}

.table-head {
  background: var(--color-surface-soft);
  color: var(--color-muted);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.student-row {
  border-top: 1px solid var(--color-border);
}

.student-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border-radius: 14px;
  background: #eff6ff;
  color: var(--color-primary);
  font-weight: 900;
}

.student-info strong {
  display: block;
  color: #0f172a;
}

.student-info small {
  display: block;
  margin-top: 5px;
  color: var(--color-muted);
}

.course-name,
.last-activity {
  color: var(--color-muted);
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

.status.warning {
  background: #fef3c7;
  color: #92400e;
}

.status.muted {
  background: #f1f5f9;
  color: #475569;
}

.attendance {
  color: #0f172a;
  font-weight: 800;
}

.progress strong {
  display: block;
  margin-bottom: 8px;
  color: #0f172a;
  font-size: 13px;
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

.empty-state {
  padding: 28px;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  text-align: center;
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-card {
    overflow-x: auto;
  }

  .table-head,
  .student-row {
    min-width: 980px;
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

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>