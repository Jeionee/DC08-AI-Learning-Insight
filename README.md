# Struktur Tugas

## 1. Pembuatan Halaman

* **Login Page**
* Ubah menu **Home** di Sidebar menjadi **Dashboard** atau **Beranda**
* Tambahkan halaman:

  * **Progress**
  * **Recommendation**

## 2. Struktur Folder Components

Buat dua folder baru di dalam `src/components`:

### **ui/**

* Berisi komponen kecil (reusable)
* Contoh: Button, Input, Card, Modal

### **common/**

* Berisi komponen besar yang tersusun dari komponen folder `ui`
* Contoh: Navbar, Sidebar, Layout

## 3. Struktur Folder Pages

Simpan seluruh halaman di dalam:

```
src/pages/<nama-page>
```

Contoh:

* `src/pages/Login.jsx`
* `src/pages/Dashboard.jsx`
* `src/pages/Progress.jsx`
* `src/pages/Recommendation.jsx`

## 4. Aturan Komponen

* Pecah komponen besar menjadi komponen kecil agar modular dan mudah di-maintain.

## 5. Tema Web

* Masukan terkait tema akan diberikan nanti.
