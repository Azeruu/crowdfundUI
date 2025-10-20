# Crowdfund Stellar UI

Dokumentasi lengkap untuk Crowdfund Stellar UI - aplikasi crowdfunding modern berbasis React dengan UI yang responsif dan performa tinggi.

## Daftar Isi

1. [Pengenalan](#pengenalan)
2. [Prasyarat](#prasyarat)
3. [Instalasi](#instalasi)
4. [Menjalankan Aplikasi](#menjalankan-aplikasi)
5. [Struktur Proyek](#struktur-proyek)
6. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
7. [Fitur Utama](#fitur-utama)
8. [Konfigurasi](#konfigurasi)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## Pengenalan

Crowdfund Stellar UI adalah template aplikasi full-stack modern yang dibangun dengan React Router dan TailwindCSS. Aplikasi ini dirancang untuk menyediakan pengalaman pengguna yang sempurna dengan performa tinggi, responsif di semua perangkat, dan siap untuk production.

Proyek ini menggabungkan best practices modern dalam pengembangan web, termasuk server-side rendering, hot module replacement, dan asset optimization.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (versi 16 atau lebih tinggi)
- **npm** (biasanya disertakan dengan Node.js) atau alternatif seperti **pnpm** atau **bun**
- **Git** (untuk clone repository)
- **Docker** (opsional, hanya jika ingin menggunakan containerization)

Periksa versi Node.js Anda:
```bash
node --version
npm --version
```

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/Azeruu/crowdfund_stellar_ui.git
cd crowdfund_stellar_ui
```

### 2. Install Dependencies

Menggunakan npm:
```bash
npm install
```

Atau menggunakan pnpm:
```bash
pnpm install
```

Atau menggunakan bun:
```bash
bun install
```

### 3. Konfigurasi Environment

Jika diperlukan, buat file `.env.local` di root direktori proyek untuk konfigurasi environment variables:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Crowdfund Stellar
```

## Menjalankan Aplikasi

### Development Server

Jalankan aplikasi dalam mode development dengan Hot Module Replacement (HMR):

```bash
npm run dev
```

Aplikasi akan tersedia di `https://crowdfund-ui-one.vercel.app`

### Production Build

Buat build production yang dioptimalkan:

```bash
npm run build
```

Output akan disimpan di folder `build/`:
- `build/client/` - Static assets untuk browser
- `build/server/` - Server-side code

### Menjalankan Production Build Secara Lokal

Setelah build, Anda dapat menjalankan aplikasi secara lokal:

```bash
npm run build
npm start
```

## Struktur Proyek

```
crowdfund_stellar_ui/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components untuk routing
│   ├── layouts/             # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── styles/              # CSS dan Tailwind configurations
│   ├── App.tsx              # Root component
│   ├── entry.client.tsx     # Client entry point
│   └── entry.server.tsx     # Server entry point
├── public/                  # Static assets
├── build/                   # Production build output
│   ├── client/              # Client-side assets
│   └── server/              # Server-side bundle
├── package.json             # Project dependencies dan scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite bundler configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── Dockerfile               # Docker configuration
└── README.md                # Project documentation
```

## Teknologi yang Digunakan

Proyek ini dibangun dengan stack teknologi modern:

**Frontend Framework & Routing:**
- React - Library UI JavaScript yang powerful
- React Router - Client-side routing dan data loading
- TypeScript - Type safety untuk JavaScript

**Styling:**
- TailwindCSS - Utility-first CSS framework
- CSS Modules - Scoped styling (jika diperlukan)

**Build Tool:**
- Vite - Next-generation frontend build tool dengan HMR cepat
- esbuild - Ultra-fast JavaScript bundler

**Development:**
- Node.js - JavaScript runtime
- npm - Package manager

**Deployment:**
- Docker - Containerization
- Node.js server - Production-ready built-in server

## Fitur Utama

### 1. Server-Side Rendering (SSR)

Aplikasi mendukung server-side rendering untuk performa dan SEO yang lebih baik. Halaman dapat di-render di server sebelum dikirim ke client.

### 2. Hot Module Replacement (HMR)

Perubahan kode secara otomatis di-reflect di browser tanpa perlu refresh manual, mempercepat development workflow.

### 3. Asset Bundling & Optimization

Semua assets (JavaScript, CSS, images) dioptimalkan dan di-bundle untuk ukuran file yang minimal dan loading time cepat.

### 4. Data Loading & Mutations

React Router menyediakan built-in data loading dan form mutations untuk handling data secara efisien.

### 5. TypeScript by Default

Seluruh codebase menggunakan TypeScript untuk type safety dan developer experience yang lebih baik.

### 6. TailwindCSS Integration

Styling yang cepat dan efisien dengan utility classes dari Tailwind CSS, sudah pre-configured dan siap digunakan.

## Konfigurasi

### Vite Configuration

File `vite.config.ts` mengatur build process. Anda dapat memodifikasi:

- Port development server
- Output directory
- Environment variables
- Proxy untuk API calls

### Tailwind CSS Configuration

File `tailwind.config.js` mengatur tema dan customization Tailwind. Anda dapat:

- Customize warna, spacing, dan typography
- Menambah custom utilities
- Mengatur dark mode

### TypeScript Configuration

File `tsconfig.json` mengatur strict type checking dan module resolution untuk TypeScript.

### Environment Variables

Buat file `.env.local` untuk environment variables lokal:

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=App Name
```

Environment variables dengan prefix `VITE_` akan ter-expose ke client.

## Deployment

### Menggunakan Docker

#### 1. Build Docker Image

```bash
docker build -t crowdfund-stellar-ui .
```

#### 2. Run Container

```bash
docker run -p 3000:3000 crowdfund-stellar-ui
```

Aplikasi akan tersedia di `http://localhost:3000`

### Platform Deployment yang Didukung

Aplikasi Docker dapat di-deploy ke berbagai platform:

**AWS:**
- AWS ECS (Elastic Container Service)
- AWS App Runner

**Google Cloud:**
- Google Cloud Run - Containerized app serverless
- Google App Engine - Standard environment

**Azure:**
- Azure Container Apps
- Azure App Service

**Digital Ocean:**
- Digital Ocean App Platform

**Lainnya:**
- Fly.io - Modern app platform
- Railway - Infrastructure platform
- Heroku
- Vercel (dengan konfigurasi khusus)
- Netlify

### Manual Deployment ke Server

Jika menggunakan VPS/dedicated server:

```bash
# 1. Build aplikasi
npm run build

# 2. Copy ke server
scp -r build/ user@your-server:/app/

# 3. Install dependencies di server
npm install --production

# 4. Start aplikasi
npm start
```

Gunakan process manager seperti PM2 untuk manage aplikasi:

```bash
pm2 start npm --name "crowdfund-stellar" -- start
pm2 save
pm2 startup
```

## Scripts NPM

Perintah yang tersedia di project:

```bash
# Development
npm run dev                  # Start development server dengan HMR

# Production
npm run build               # Build untuk production
npm start                   # Run production build

# Linting & Formatting (jika dikonfigurasi)
npm run lint               # Run linter
npm run format             # Format code

# Testing (jika dikonfigurasi)
npm test                   # Run tests
npm run test:coverage      # Generate coverage report
```

## Troubleshooting

### Port 5173 Sudah Digunakan

Jika port 5173 sudah digunakan, ubah di `vite.config.ts`:

```typescript
export default {
  server: {
    port: 3000 // Ganti dengan port yang tersedia
  }
}
```

### Module Not Found Error

Pastikan semua dependencies sudah terinstall:

```bash
rm -rf node_modules
npm install
```

### Build Error dengan TailwindCSS

Clear Tailwind cache:

```bash
rm -rf .tailwind-cache
npm run build
```

### Hot Module Replacement Tidak Bekerja

Refresh browser secara manual atau restart development server:

```bash
npm run dev
```

### Docker Build Gagal

Pastikan Docker daemon sedang berjalan dan rebuild dengan verbose output:

```bash
docker build -t crowdfund-stellar-ui . --progress=plain
```

### Performance Issues

1. Analisis bundle size:
   ```bash
   npm run build -- --analyze
   ```

2. Cek Network tab di DevTools untuk slow requests
3. Gunakan React DevTools Profiler untuk mengidentifikasi component yang re-render

## Best Practices

1. **Gunakan TypeScript** - Leverage type safety untuk menghindari bugs
2. **Optimize Images** - Compress dan serve dalam format optimal
3. **Code Splitting** - Split route-based untuk lazy loading
4. **Environment Variables** - Jangan commit secrets ke repository
5. **Error Handling** - Implementasikan proper error boundaries dan handling
6. **Performance Monitoring** - Monitor performa di production
7. **SEO** - Optimalkan meta tags dan structured data

## Contributing

Untuk berkontribusi ke project ini:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

Project ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detail.

## Support & Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## FAQ

**Q: Apa bedanya dev server dengan production build?**
A: Dev server menggunakan HMR untuk development experience yang lebih baik. Production build mengoptimalkan dan meminimalkan code untuk performance terbaik.

**Q: Bisakah saya menggunakan CSS framework lain?**
A: Ya, Anda dapat mengganti TailwindCSS dengan framework CSS lain. Remove Tailwind configuration dan install framework pilihan Anda.

**Q: Apakah SSR wajib?**
A: Tidak, Anda dapat menggunakan mode SPA (Single Page Application) standar tanpa SSR.

**Q: Bagaimana cara connect ke backend API?**
A: Gunakan `fetch` API atau library seperti Axios di dalam React components atau data loaders.

---

**Dibuat dengan ❤️ menggunakan React Router**
