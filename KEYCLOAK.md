# Keycloak

Keycloak adalah service yg digunakan untuk melakukan aktifitas credentials user seperti login, logout dan lain-lain. Merupakan service otentifikasi yg berdiri sendiri, sehingga dapat diakses aplikasi external untuk dapat melakukan login secara terintegrasi.

## Control Panel

Anda dapat masuk ke control panel untuk mengatur managemen user dan service keycloak. Keycloak terinstal dan dapat diakses melalui web browser di alamat; 

```
Keycloak terinstal di alamat http://sibaru.perumahan.pu.go.id/auth
```

Untuk membuka halaman control panel Keycloak, Anda dapat membuka halaman tersebut lalu klik link Administration Console. Berikut adalah username dan password yg dapat digunakan untuk login ke control panel Keycloak;

```
Username: admin
Password: ...
```

Jika telah berhasil login ke Control Panel, Anda dapat berpindah ke realms "Master" dengan mengklik di panel kiri atas (dibawah logo Keycloak). Lalu pilihlah realms "Master" dengan mengklik link yang tampil. Realms "Master" adalah yang realms yang digunakan pada aplikasi sibaru.

## Realm Settings

Jika telah aktif di realms "Master", untuk pengaturan credentials realms yg terhubung dengan aplikasi backend. Anda dapat mengaturnya di menu Realm Settings ini. Tidak ada yg perlu diubah lagi disini, karena sudah terkoneksi dengan baik ke backend.

## User Management

Pada menu User Anda dapat melihat user mana saja yang sudah terdaftar di SSO sibaru ini. Sebagai informasi untuk kelengkapan data user tidak terdapat disini, melainkan terdapat di table user pada service backend SSO. User yang terdaftar di Keycloak ini adalah user yang sudah diperbolehkan untuk login. Jadi antara table user yg di service backend SSO dan Keycloak ini terhubung.

Di table user terdapat 2 field yaitu isSSO dan isReset sebagai flaging penanda bahwa user sudah terdaftar di SSO. Untuk mendaftarkan kembali user ke SSO secara teknis, Anda dapat mengembalikan flag isSSO dan isReset menjadi 0. Lalu lakukan login dengan menggunakan password lama dari user, maka akan muncul form untuk reset password di awal.