# Telefon Bozor — Mobil ilova (Expo / React Native)

`client/` (veb) arxitekturasini takrorlagan, `server/` API'ni iste'mol qiluvchi
**foydalanuvchi** ilovasi. Owner admin veb-panelda qoladi.

- **Stack:** Expo SDK 57, React Native 0.86, Expo Router, NativeWind (Tailwind), TanStack Query, Redux Toolkit (faqat modal), axios, expo-secure-store, `@react-native-google-signin/google-signin`, expo-image-picker.
- **Til:** UI matni — o'zbekcha; kod qiymatlari — inglizcha.

## Ishga tushirish

```bash
cd app
cp .env.example .env      # qiymatlarni to'ldiring (pastga qarang)
npm install
npx expo start            # yoki: npm run ios / npm run android
```

Backend alohida ishlashi kerak: `cd server && npm run dev` (PORT=6933).

### `.env`

```
EXPO_PUBLIC_API_URL=http://localhost:6933/api
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=...      # server GOOGLE_CLIENT_ID bilan bir xil (audience)
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME=com.googleusercontent.apps.XXXX
```

**API host har platformada farq qiladi:**

| Platforma | `EXPO_PUBLIC_API_URL` |
|---|---|
| iOS simulator | `http://localhost:6933/api` |
| Android emulator | `http://10.0.2.2:6933/api` |
| Fizik qurilma | `http://<mashina-LAN-IP>:6933/api` (bir Wi-Fi) |

Dev'da HTTPS uchun: `npx expo start --tunnel`.

## Google Sign-In (muhim)

Native Google modul **Expo Go'da ishlamaydi** — **dev build** kerak:

```bash
npx expo run:ios      # yoki run:android
```

Google Cloud Console'da 3 ta OAuth client: **Web** (server `GOOGLE_CLIENT_ID` + app `webClientId`), **iOS** (bundle id `uz.telefonbozor.app`), **Android** (package + dev keystore SHA-1). `EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME` = iOS client ID'ning teskarisi. Env bo'sh bo'lsa plugin yuklanmaydi va katalog Expo Go'da ham ishlayveradi (Google tugmasi "dev build kerak" deydi).

## Struktura (FSD — `client/` ko'zgusi)

```
src/
├─ app/                 # Expo Router route'lar (tabs, phones/[id], listings, login)
├─ shared/              # api(http+endpoints), auth(token-store), components/ui,
│                       #   hooks(useAuth/useModal/useRequireAuth/...), store, data, utils, lib
├─ features/auth/       # Google login, useAuth session, AuthModal, GuestGate
└─ public/features/
   ├─ catalog/          # e'lonlar ro'yxati + detali
   ├─ interactions/     # like / baho / izoh
   └─ account/          # e'lon CRUD + rasm yuklash + profil
```

## Backend (mobil moslama)

Mobil so'rovlar `X-Client: mobile` header yuboradi. Shu bo'lsa `/auth/*` endpointlari
refresh token'ni JSON body'da qaytaradi/qabul qiladi (veb esa avvalgidek httpOnly cookie
ishlatadi). Token'lar qurilmada `expo-secure-store`da saqlanadi.

## Buyruqlar

```bash
npm run ios | android | web
./node_modules/.bin/tsc --noEmit        # type-check
```
# phone-market-app
