# Minio

## Control Panel

Control panel Minio adalah fasilitas untuk mengatur service Minio, dengan fitur utama pengelolaan file-file baik mengupload, download dan pengaturan file lainnya. Anda dapat masuk ke control panel dengan mengakses alamat berikut melalui web browser;

```
http://10.30.120.101:9000
```

Berikut adalah username dan password yg dapat digunakan untuk login ke control panel Minio

```
Username: admin
Password: ...
```

## Pengelolaan bucket, folder dan file

Ketika berhasil login, maka akan tampil halaman Object Browser. Dihalaman tersebut terdapat 2 bucket yang sudah disediakan;

```
sibaruv3-production adalah bucket yg digunakan untuk menyimpan file-file production
sibaruv3-staging adalah bucket yg digunakan untuk menyimpan file-file staging
```

File-file yang diupload ke dalam bucket sibaruv3-production dapat diakses secara publik melalui 
base url http://sibaru.perumahan.pu.go.id/api/file/ ditambahkan dengan alamat path yg sesuai dengan path file di Minio

```
https://sibaru.perumahan.pu.go.id/api/file/alamatfolder/namafile.ekstensi
Ex. https://sibaru.perumahan.pu.go.id/api/file/staging/laporan/pemanfaatan.xlsx
```

File-file yang diupload ke dalam bucket sibaruv3-staging dapat diakses secara publik melalui 
base url http://10.30.120.103:3000/api/file/ ditambahkan dengan alamat path yg sesuai dengan path file di Minio

```
http://10.30.120.103:3000/api/file/alamatfolder/namafile.ekstensi
Ex. http://10.30.120.103:3000/api/file/staging/laporan/pemanfaatan.xlsx
```

## Penyimpanan folder dan file

File-file yang terdapat di minio sebenarnya tersimpan di folder ~/data di server. Sedangkan folder ~/static adalah tempat penyimpanan file-file lama yg masih di pakai di aplikasi dan di serving dengan NGINX.