<script setup lang="ts">
import { CalendarDays, GraduationCap } from '@lucide/vue'

const stats = [
  {
    label: 'Aktif Öğrenci',
    value: '248',
    change: '+18 bu ay',
  },
  {
    label: 'Aktif Kurs',
    value: '16',
    change: '4 yeni modül',
  },
  {
    label: 'Ortalama Devam',
    value: '%86',
    change: '+6 puan',
  },
  {
    label: 'Tamamlanan Ders',
    value: '1.284',
    change: 'son 30 gün',
  },
]

const courses = [
  {
    title: 'Frontend Temelleri',
    level: 'Başlangıç',
    students: 42,
    progress: 74,
  },
  {
    title: 'Vue ile Uygulama Geliştirme',
    level: 'Orta',
    students: 31,
    progress: 62,
  },
  {
    title: 'Veritabanı ve API Mantığı',
    level: 'Orta',
    students: 26,
    progress: 48,
  },
]

const activities = [
  '12 öğrenci Vue modülünü tamamladı.',
  'Yeni yoklama raporu oluşturuldu.',
  'Frontend Temelleri kursuna 5 öğrenci eklendi.',
  'Haftalık performans özeti güncellendi.',
]
</script>

<template>
  <main class="dashboard">
    <header class="topbar">
      <div>
        <p class="eyebrow">Okul / E-kurs Yönetimi</p>
        <h1>Genel durum paneli</h1>
      </div>

      <button class="date-button" type="button">
        <CalendarDays :size="18" />
        Haziran 2026
      </button>
    </header>

    <section class="stats-grid" aria-label="Özet istatistikler">
      <article v-for="stat in stats" :key="stat.label" class="stat-card">
        <span>{{ stat.label }}</span>
        <strong>{{ stat.value }}</strong>
        <small>{{ stat.change }}</small>
      </article>
    </section>

    <section class="content-grid">
      <article class="card wide">
        <div class="card-header">
          <div>
            <p class="eyebrow">Kurs ilerleme</p>
            <h2>Aktif kurslar</h2>
          </div>

          <GraduationCap :size="24" />
        </div>

        <div class="course-list">
          <div v-for="course in courses" :key="course.title" class="course-row">
            <div>
              <h3>{{ course.title }}</h3>
              <p>{{ course.level }} seviye · {{ course.students }} öğrenci</p>
            </div>

            <div class="progress-wrap">
              <span>{{ course.progress }}%</span>
              <div class="progress-track">
                <div class="progress-bar" :style="{ width: `${course.progress}%` }" />
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <div class="card-header">
          <div>
            <p class="eyebrow">Son aktiviteler</p>
            <h2>Bugün</h2>
          </div>
        </div>

        <ul class="activity-list">
          <li v-for="activity in activities" :key="activity">
            {{ activity }}
          </li>
        </ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  padding: 32px;
}

.topbar {
  display: flex;
  align-items: center;
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
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(30px, 4vw, 42px);
  letter-spacing: -0.04em;
}

.date-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text);
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.stat-card,
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.stat-card {
  padding: 22px;
}

.stat-card span {
  display: block;
  color: var(--color-muted);
  font-size: 14px;
}

.stat-card strong {
  display: block;
  margin-top: 12px;
  color: #0f172a;
  font-size: 34px;
  letter-spacing: -0.04em;
}

.stat-card small {
  display: block;
  margin-top: 8px;
  color: var(--color-success);
  font-weight: 700;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 18px;
  margin-top: 18px;
}

.card {
  padding: 24px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.card-header h2 {
  margin-bottom: 0;
  font-size: 22px;
}

.card-header svg {
  color: var(--color-primary);
}

.course-list {
  display: grid;
  gap: 16px;
}

.course-row {
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 20px;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface-soft);
}

.course-row h3 {
  margin-bottom: 6px;
  font-size: 17px;
}

.course-row p {
  margin-bottom: 0;
  color: var(--color-muted);
}

.progress-wrap span {
  display: block;
  margin-bottom: 8px;
  text-align: right;
  font-weight: 800;
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

.activity-list {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.activity-list li {
  padding: 14px;
  border-radius: 14px;
  background: var(--color-surface-soft);
  color: var(--color-muted);
  line-height: 1.5;
}

@media (max-width: 980px) {
  .stats-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }

  .course-row {
    grid-template-columns: 1fr;
  }

  .progress-wrap span {
    text-align: left;
  }
}

@media (max-width: 640px) {
  .dashboard {
    padding: 20px;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>