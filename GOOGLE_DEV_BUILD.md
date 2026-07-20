# Google login — EAS iOS dev build (runbook)

Expo Go Google OAuth'ni qo'llab-quvvatlamaydi (auth-proxy olib tashlangan). Native Google
login uchun **dev build** kerak. Lokal Xcode yo'q, shuning uchun **EAS bulut build**.

Bundle id: `uz.telefonbozor.app` · Web client ID allaqachon sozlangan.

---

## 1. Google Cloud Console — iOS OAuth client yaratish

1. https://console.cloud.google.com → Web client turgan **o'sha loyihani** tanlang
   (`910579068380-...`).
2. **APIs & Services → Credentials → + Create credentials → OAuth client ID**.
3. Application type: **iOS**.
4. Bundle ID: `uz.telefonbozor.app` → **Create**.
5. Ikki qiymatni oling:
   - **iOS client ID**: `910579068380-XXXX.apps.googleusercontent.com`
   - **iOS URL scheme** (teskarisi): `com.googleusercontent.apps.910579068380-XXXX`
6. OAuth consent screen "Testing" bo'lsa → **Audience/Test users**ga o'z Google
   emailingizni qo'shing (aks holda kirish rad etiladi).

> Owner bo'lish uchun `pubgn9642@gmail.com` bilan kiring; boshqa email → oddiy user.

---

## 2. Kalitlarni qo'yish (2 joyga — build va runtime)

**`app/.env`** (Metro/runtime uchun):
```
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=910579068380-XXXX.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME=com.googleusercontent.apps.910579068380-XXXX
```

**`app/eas.json`** → `build.development.env` (bulut build uchun — bu shart, aks holda
native modul build'ga kirmaydi):
```
"EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID": "910579068380-XXXX.apps.googleusercontent.com",
"EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME": "com.googleusercontent.apps.910579068380-XXXX"
```

---

## 3. EAS loyiha

```bash
cd app
npm i -g eas-cli          # yoki har buyruqda `npx eas`
eas login                 # bepul Expo akkaunt (expo.dev)
eas init                  # loyiha yaratadi
```
`eas init` bergan **project ID**'ni `app/app.config.js` → `extra.eas.projectId` ga qo'ying.

---

## 4. iPhone'ni ro'yxatdan o'tkazish

```bash
eas device:create
```
Chiqqan havolani **iPhone'da** oching → provisioning profilni o'rnating
(Settings → Profile Downloaded → Install).

---

## 5. Dev build (bulutda)

```bash
eas build --profile development --platform ios
```
- Apple ID so'raydi → kiriting. **Bepul** Apple ID ham bo'ladi (EAS sertifikat +
  provisioning profilni o'zi yasaydi).
- ~15–20 daqiqa. Tugagach QR / havola beradi.

---

## 6. O'rnatish + ishga tushirish

```bash
# iPhone'da build havolasini ochib dev-client ilovasini o'rnating, so'ng:
npx expo start --dev-client
```
iPhone'dagi **Telefon Bozor** ilovasini oching → Metro'ga ulanadi →
**Profil → "Google orqali davom etish"** → native Google oynasi ochiladi → kirasiz.

---

## Muhim eslatmalar

- **iOS URL scheme'ni 2-qadamda albatta to'ldiring** — bo'sh bo'lsa `app.config.js`
  Google plagini'ni build'ga qo'shmaydi va tugma "dev build kerak" deydi.
- Bepul Apple ID sertifikati **7 kunda** tugaydi → keyin qayta `eas build`.
- Server (`npm run dev`, port 6933) va iPhone **bir Wi-Fi**da bo'lsin. `http.ts`
  Metro host IP'sini avtomatik topadi, `.env`dagi `localhost`ni almashtiradi.
- Web client ID (`910579068380-...l7`) = server `GOOGLE_CLIENT_ID` = app `webClientId`
  (audience mos kelishi shart — allaqachon shunday).
