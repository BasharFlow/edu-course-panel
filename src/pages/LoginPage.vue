<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BookOpen, GraduationCap, ShieldCheck } from '@lucide/vue'

const router = useRouter()

const roles = [
  {
    title: 'Yönetici',
    description: 'Öğrenci, kurs, rapor ve sistem ayarlarını yönetir.',
    icon: ShieldCheck,
  },
  {
    title: 'Eğitmen',
    description: 'Ders içeriklerini, yoklamaları ve öğrenci ilerlemesini takip eder.',
    icon: BookOpen,
  },
  {
    title: 'Öğrenci',
    description: 'Kurslarını, ders içeriklerini ve kişisel ilerlemesini görüntüler.',
    icon: GraduationCap,
  },
]

function enterDemo() {
  router.push('/dashboard')
}
</script>

<template>
  <main class="login-page">
    <section class="login-panel">
      <div class="brand">
        <span class="brand-mark">EC</span>

        <div>
          <p class="eyebrow">EduCourse Yönetim Sistemi</p>
          <h1>Okul ve e-kurs süreçleri için sade yönetim paneli</h1>
        </div>
      </div>

      <p class="lead">
        Öğrenciler, kurslar, devam durumu ve eğitim raporları tek bir panelden takip edilir.
        Bu demo; hızlı, temiz ve gerçek ürün hissi veren bir Vue altyapısı olarak tasarlanmıştır.
      </p>

      <div class="role-grid">
        <article v-for="role in roles" :key="role.title" class="role-card">
          <component :is="role.icon" :size="22" stroke-width="2" />
          <h2>{{ role.title }}</h2>
          <p>{{ role.description }}</p>
        </article>
      </div>

      <button class="primary-button" type="button" @click="enterDemo">
        Demo panele giriş yap
      </button>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.14), transparent 32%),
    linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
}

.login-panel {
  width: min(100%, 980px);
  padding: 40px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(14px);
}

.brand {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.brand-mark {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border-radius: 18px;
  background: var(--color-primary);
  color: white;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 700;
}

h1 {
  max-width: 720px;
  margin: 0;
  color: #0f172a;
  font-size: clamp(32px, 5vw, 54px);
  line-height: 1.05;
  letter-spacing: -0.05em;
}

.lead {
  max-width: 740px;
  margin: 24px 0 0;
  color: var(--color-muted);
  font-size: 17px;
  line-height: 1.7;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 34px;
}

.role-card {
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.role-card svg {
  color: var(--color-primary);
}

.role-card h2 {
  margin: 16px 0 8px;
  font-size: 18px;
}

.role-card p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.primary-button {
  margin-top: 32px;
  padding: 14px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.primary-button:hover {
  background: var(--color-primary-dark);
}

@media (max-width: 760px) {
  .login-page {
    padding: 20px;
  }

  .login-panel {
    padding: 26px;
  }

  .brand {
    flex-direction: column;
  }

  .role-grid {
    grid-template-columns: 1fr;
  }
}
</style>