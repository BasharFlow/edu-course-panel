# EduCourse Panel

Vue.js ile geliştirilmiş, okul ve e-kurs süreçlerini yönetmek için hazırlanmış modern bir öğrenci / kurs yönetim paneli demosudur.

Bu proje; öğrenci takibi, kurs yönetimi, eğitim raporları ve temel sistem ayarları gibi modülleri tek panel altında sunar. Amaç, sade ve hızlı çalışan bir Vue altyapısı üzerinde gerçek bir eğitim yönetim sistemi arayüzü ortaya koymaktır.

## Özellikler

* Modern Vue 3 + TypeScript altyapısı
* Vue Router ile sayfa yönetimi
* Ortak panel layout yapısı
* Dashboard özet ekranı
* Öğrenci listeleme, arama ve durum filtreleme
* Kurs listeleme, modül takibi ve kurs ilerleme kartları
* Mevcut veri üzerinden hesaplanan raporlama ekranı
* Kurum bilgileri ve bildirim tercihleri için ayarlar ekranı
* Responsive arayüz
* Hafif ve özel CSS mimarisi
* Gereksiz UI framework kullanılmadan tasarlanmış temiz arayüz

## Kullanılan Teknolojiler

* Vue 3
* TypeScript
* Vite
* Vue Router
* Pinia
* Lucide Vue
* CSS

## Sayfalar

### Giriş Ekranı

Demo panele geçiş için sade bir karşılama ekranı içerir. Yönetici, eğitmen ve öğrenci rollerinin sistemdeki yerini özetler.

### Dashboard

Genel sistem durumunu gösterir:

* Aktif öğrenci sayısı
* Aktif kurs sayısı
* Ortalama devam oranı
* Tamamlanan ders sayısı
* Aktif kurs ilerlemeleri
* Son aktiviteler

### Öğrenciler

Öğrenci yönetimi için hazırlanmıştır:

* Öğrenci listesi
* Arama
* Durum filtreleme
* Devam oranı
* İlerleme yüzdesi
* Son aktivite bilgisi

### Kurslar

E-kurs ve okul kurslarını yönetmek için tasarlanmıştır:

* Kurs kartları
* Eğitmen bilgisi
* Öğrenci sayısı
* Kurs süresi
* Seviye bilgisi
* Modül listesi
* Ders tamamlama durumu
* Sonraki ders bilgisi

### Raporlar

Öğrenci ve kurs verileri üzerinden hesaplanan raporları içerir:

* Toplam öğrenci
* Ortalama devam
* Ortalama ilerleme
* Riskli öğrenci sayısı
* Kurs bazlı ilerleme
* Riskli öğrenci takip listesi
* Haftalık eğitim özeti

### Ayarlar

Sistem yönetimi için örnek ayar ekranıdır:

* Kurum bilgileri
* Bildirim tercihleri
* Kullanıcı rolleri
* Sistem durum kartları
* Güvenlik notu

## Kurulum

Projeyi yerel ortamda çalıştırmak için:

```bash
npm install
npm run dev
```

Geliştirme sunucusu açıldıktan sonra tarayıcıda verilen localhost adresi ziyaret edilebilir.

## Production Build

Projeyi production için derlemek:

```bash
npm run build
```

Build sonucunu yerelde önizlemek:

```bash
npm run preview
```

## Proje Yapısı

```text
src/
├─ app/
│  └─ router.ts
├─ data/
│  ├─ courses.ts
│  └─ students.ts
├─ layouts/
│  └─ PanelLayout.vue
├─ pages/
│  ├─ LoginPage.vue
│  ├─ DashboardPage.vue
│  ├─ StudentsPage.vue
│  ├─ CoursesPage.vue
│  ├─ ReportsPage.vue
│  └─ SettingsPage.vue
├─ styles/
│  ├─ base.css
│  └─ variables.css
├─ types/
│  └─ index.ts
├─ App.vue
└─ main.ts
```

## Teknik Notlar

Bu proje demo amaçlıdır ve veriler frontend tarafında mock data olarak tutulmaktadır. Gerçek bir üretim sisteminde aşağıdaki yapılar backend tarafında uygulanmalıdır:

* Kimlik doğrulama
* Rol bazlı yetkilendirme
* Veritabanı bağlantısı
* API katmanı
* Kalıcı ayar yönetimi
* Güvenli oturum kontrolü

## Hedef

Bu proje, Vue.js kullanılarak okul / e-kurs yönetim sistemi için sade, hızlı, okunabilir ve genişletilebilir bir frontend altyapısı oluşturmayı hedefler.
