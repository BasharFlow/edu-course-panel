<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {
  BookOpen,
  ChartNoAxesCombined,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from '@lucide/vue'

const navItems = [
  {
    label: 'Panel',
    to: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Öğrenciler',
    to: '/students',
    icon: Users,
  },
  {
    label: 'Kurslar',
    to: '/courses',
    icon: BookOpen,
  },
  {
    label: 'Raporlar',
    to: '/reports',
    icon: ChartNoAxesCombined,
  },
  {
    label: 'Ayarlar',
    to: '/settings',
    icon: Settings,
  },
]
</script>

<template>
  <div class="panel-shell">
    <aside class="sidebar">
      <RouterLink class="sidebar-brand" to="/dashboard" aria-label="EduCourse ana panel">
        <span>EC</span>
        <strong>EduCourse</strong>
      </RouterLink>

      <nav class="nav-list" aria-label="Ana menü">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          active-class="active"
        >
          <component :is="item.icon" :size="18" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <RouterLink class="logout-link" to="/">
        <LogOut :size="18" />
        Çıkış
      </RouterLink>
    </aside>

    <section class="panel-content">
      <RouterView />
    </section>
  </div>
</template>

<style scoped>
.panel-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  background: var(--color-bg);
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  background: #0f172a;
  color: white;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 34px;
}

.sidebar-brand span {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--color-primary);
  color: white;
  font-weight: 800;
}

.sidebar-brand strong {
  font-size: 18px;
}

.nav-list {
  display: grid;
  gap: 8px;
}

.nav-item,
.logout-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  color: #cbd5e1;
  transition:
    background 160ms ease,
    color 160ms ease;
}

.nav-item:hover,
.nav-item.active,
.logout-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.logout-link {
  margin-top: auto;
}

.panel-content {
  min-width: 0;
}

@media (max-width: 980px) {
  .panel-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
  }

  .nav-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .logout-link {
    margin-top: 18px;
  }
}

@media (max-width: 640px) {
  .sidebar {
    padding: 18px;
  }

  .nav-list {
    grid-template-columns: 1fr;
  }
}
</style>