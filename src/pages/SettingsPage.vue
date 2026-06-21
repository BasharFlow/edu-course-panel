<script setup lang="ts">
import { reactive } from 'vue'
import {
  Bell,
  Building2,
  CheckCircle2,
  Database,
  KeyRound,
  Mail,
  Save,
  ShieldCheck,
  UserCog,
} from '@lucide/vue'

const institution = reactive({
  name: 'EduCourse Akademi',
  email: 'iletisim@educourse.demo',
  phone: '+90 232 000 00 00',
  city: 'İzmir',
  timezone: 'Europe/Istanbul',
})

const notifications = reactive([
  {
    title: 'Haftalık öğrenci raporu',
    description: 'Her pazartesi öğrenci ilerleme ve devam özetini gönder.',
    enabled: true,
  },
  {
    title: 'Devamsızlık uyarısı',
    description: 'Devam oranı %60 altına düşen öğrenciler için uyarı oluştur.',
    enabled: true,
  },
  {
    title: 'Kurs tamamlama bildirimi',
    description: 'Öğrenci bir kursu tamamladığında sistem bildirimi oluştur.',
    enabled: true,
  },
  {
    title: 'Yeni kurs önerileri',
    description: 'Kurum yöneticisine yeni kurs açma önerilerini göster.',
    enabled: false,
  },
])

const roles = [
  {
    name: 'Yönetici',
    description: 'Tüm öğrenci, kurs, rapor ve sistem ayarlarını yönetebilir.',
    permissions: ['Tam erişim', 'Kullanıcı yönetimi', 'Rapor görüntüleme'],
  },
  {
    name: 'Eğitmen',
    description: 'Kendi kurslarını, öğrencilerini ve ders içeriklerini takip eder.',
    permissions: ['Kurs yönetimi', 'Yoklama takibi', 'Öğrenci ilerleme izleme'],
  },
  {
    name: 'Öğrenci',
    description: 'Kayıtlı olduğu kursları, dersleri ve kişisel ilerlemesini görüntüler.',
    permissions: ['Kurs görüntüleme', 'Ders içeriği erişimi', 'Kişisel rapor'],
  },
]

const systemChecks = [
  {
    title: 'Veri durumu',
    description: 'Demo veriler tutarlı şekilde yükleniyor.',
    icon: Database,
    status: 'Sağlıklı',
  },
  {
    title: 'Rol kontrolü',
    description: 'Panel yapısı rol bazlı genişlemeye uygun.',
    icon: ShieldCheck,
    status: 'Hazır',
  },
  {
    title: 'Bildirim altyapısı',
    description: 'Bildirim tercihleri arayüz seviyesinde hazır.',
    icon: Bell,
    status: 'Demo',
  },
]
</script>

<template>
  <main class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Sistem Ayarları</p>
        <h1>Ayarlar</h1>
        <p class="description">
          Kurum bilgileri, bildirim tercihleri, kullanıcı rolleri ve sistem durumu bu ekrandan
          yönetilir.
        </p>
      </div>

      <button class="primary-action" type="button">
        <Save :size="18" />
        Ayarları kaydet
      </button>
    </header>

    <section class="settings-grid">
      <article class="panel-card institution-card">
        <div class="section-header">
          <div>
            <p class="eyebrow">Kurum Profili</p>
            <h2>Kurum bilgileri</h2>
          </div>

          <Building2 :size="24" />
        </div>

        <div class="form-grid">
          <label>
            Kurum adı
            <input v-model="institution.name" type="text" />
          </label>

          <label>
            İletişim e-postası
            <input v-model="institution.email" type="email" />
          </label>

          <label>
            Telefon
            <input v-model="institution.phone" type="text" />
          </label>

          <label>
            Şehir
            <input v-model="institution.city" type="text" />
          </label>

          <label>
            Saat dilimi
            <select v-model="institution.timezone">
              <option>Europe/Istanbul</option>
              <option>Europe/London</option>
              <option>Europe/Berlin</option>
            </select>
          </label>
        </div>
      </article>

      <article class="panel-card">
        <div class="section-header">
          <div>
            <p class="eyebrow">Bildirimler</p>
            <h2>Bildirim tercihleri</h2>
          </div>

          <Bell :size="24" />
        </div>

        <div class="notification-list">
          <label
            v-for="notification in notifications"
            :key="notification.title"
            class="notification-item"
          >
            <div>
              <strong>{{ notification.title }}</strong>
              <span>{{ notification.description }}</span>
            </div>

            <input v-model="notification.enabled" type="checkbox" />
          </label>
        </div>
      </article>
    </section>

    <section class="roles-section">
      <div class="section-title">
        <p class="eyebrow">Yetkilendirme</p>
        <h2>Kullanıcı rolleri</h2>
      </div>

      <div class="role-grid">
        <article v-for="role in roles" :key="role.name" class="role-card">
          <div class="role-icon">
            <UserCog :size="22" />
          </div>

          <h3>{{ role.name }}</h3>
          <p>{{ role.description }}</p>

          <ul>
            <li v-for="permission in role.permissions" :key="permission">
              <CheckCircle2 :size="16" />
              {{ permission }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="system-grid">
      <article v-for="check in systemChecks" :key="check.title" class="system-card">
        <div class="system-icon">
          <component :is="check.icon" :size="22" />
        </div>

        <div>
          <strong>{{ check.title }}</strong>
          <p>{{ check.description }}</p>
        </div>

        <span>{{ check.status }}</span>
      </article>

      <article class="system-card security-card">
        <div class="system-icon">
          <KeyRound :size="22" />
        </div>

        <div>
          <strong>Güvenlik notu</strong>
          <p>
            Bu demo frontend seviyesinde çalışır. Gerçek projede kimlik doğrulama ve rol kontrolleri
            backend tarafında zorunlu olarak uygulanmalıdır.
          </p>
        </div>
      </article>
    </section>

    <section class="info-card">
      <Mail :size="22" />

      <div>
        <strong>Demo ayar ekranı</strong>
        <p>
          Bu sayfa, okul / e-kurs yönetim sistemi için gerekli temel ayar yapısını gösterir. Gerçek
          projede bu alanlar API veya veritabanı bağlantısıyla kalıcı hale getirilebilir.
        </p>
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

h1,
h2,
h3,
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

h3 {
  margin-bottom: 8px;
  color: #0f172a;
  font-size: 19px;
}

.description {
  max-width: 760px;
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

.settings-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 18px;
}

.panel-card,
.role-card,
.system-card,
.info-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.panel-card {
  padding: 24px;
}

.section-header,
.section-title {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.section-header svg {
  color: var(--color-primary);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-grid label {
  display: grid;
  gap: 8px;
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 800;
}

.form-grid label:last-child {
  grid-column: 1 / -1;
}

input,
select {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  outline: 0;
  background: var(--color-surface-soft);
  color: var(--color-text);
}

input:focus,
select:focus {
  border-color: var(--color-primary);
  background: white;
}

.notification-list {
  display: grid;
  gap: 12px;
}

.notification-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 14px;
  border-radius: 16px;
  background: var(--color-surface-soft);
}

.notification-item strong {
  display: block;
  color: #0f172a;
}

.notification-item span {
  display: block;
  margin-top: 5px;
  color: var(--color-muted);
  line-height: 1.5;
}

.notification-item input {
  width: 20px;
  height: 20px;
}

.roles-section {
  margin-top: 18px;
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.role-card {
  padding: 22px;
}

.role-icon,
.system-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 14px;
  background: #eff6ff;
  color: var(--color-primary);
}

.role-card p {
  color: var(--color-muted);
  line-height: 1.6;
}

.role-card ul {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 18px 0 0;
  list-style: none;
}

.role-card li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-muted);
  font-weight: 700;
}

.role-card li svg {
  color: var(--color-success);
}

.system-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-top: 18px;
}

.system-card {
  position: relative;
  padding: 20px;
}

.system-card strong {
  display: block;
  color: #0f172a;
}

.system-card p {
  margin: 8px 0 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.system-card > span {
  display: inline-flex;
  margin-top: 14px;
  padding: 7px 10px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-size: 13px;
  font-weight: 800;
}

.security-card {
  grid-column: span 1;
}

.info-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-top: 18px;
  padding: 22px;
  background: #eff6ff;
}

.info-card svg {
  flex: 0 0 auto;
  color: var(--color-primary);
}

.info-card strong {
  color: #0f172a;
}

.info-card p {
  max-width: 900px;
  margin: 8px 0 0;
  color: var(--color-muted);
  line-height: 1.7;
}

@media (max-width: 1180px) {
  .settings-grid,
  .role-grid,
  .system-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .page {
    padding: 22px;
  }

  .page-header {
    flex-direction: column;
  }

  .primary-action {
    width: 100%;
  }

  .settings-grid,
  .role-grid,
  .system-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .notification-item {
    grid-template-columns: 1fr;
  }

  .form-grid label:last-child {
    grid-column: auto;
  }

  .info-card {
    flex-direction: column;
  }
}
</style>