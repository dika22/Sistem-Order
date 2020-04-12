# Sistem-Order
1. Sistem Order tersebut menggunakan JWT (Json Web Token) 
Kenapa JWT karena adalah sebuah token berbentuk string panjang yang sangat random yang gunanya sendiri untuk melakukan sistem Autentikasi dan Pertukaran Informasi.
2. Bagaimana Mendapatkan JWT (JSON WEB TOKEN)?
Token Didapat ketika login, ketika login berhasil respons akan memberikan token, token tersebut string panjang yang sangat random dan terdapat Key, expired token dan level user yang login
3. Penggunaan Token
Token dapat digunakan oleh admin atau users. Di sistem ini saya set token dengan expired 1 jam, atau bisa dirubah sesuai kebutuhan. Setiap Melakakukan transaksi API harus menggunakan Token
