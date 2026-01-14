# Penjelasan: Cookie vs Redux untuk Authentication

## 1. Apa yang Terjadi Sebelumnya (Sebelum Perbaikan)

```
Login Form → Save to Cookie Only → Middleware Cek Cookie → Redirect to Dashboard
         ↓
      Redux Idle (tidak digunakan)
```

**Masalah:**
- ❌ Redux tidak tersinkronisasi dengan cookie
- ❌ Redux state hilang saat refresh page
- ❌ authSlice defined tapi tidak digunakan
- ❌ Data auth terpecah (ada di cookie, tidak ada di Redux)

---

## 2. Cara Kerja Setelah Perbaikan

```
┌─────────────────────────────────────────────────────────────┐
│         Admin Login Form                                     │
│  Username: xxx, Password: xxx                               │
└────────────────────┬────────────────────────────────────────┘
                     │ handleLogin(e)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Redux Dispatch: loginAdmin({ username, password })         │
│  - State: loading = true                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │  API Call to Backend   │
        │  POST /login-admin     │
        │  Response: {           │
        │    token: "jwt...",    │
        │    user: {...}         │
        │  }                     │
        └────────────┬───────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Redux Action: loginAdmin.fulfilled                         │
│  ✅ state.user = response.user                              │
│  ✅ state.token = response.token                            │
│  ✅ state.loading = false                                   │
│  ✅ state.error = null                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Save to Cookie (di Thunk)                                  │
│  ✅ Cookies.set("token", response.token, { expires: 1 })   │
│  (Untuk persistent auth & middleware validation)           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Show Toast Success                                         │
│  toast.success("Login admin berhasil!")                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Redirect to Dashboard                                      │
│  router.push("/dasbor")                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Middleware Check (src/middleware.ts)                       │
│  ✅ Token ada di cookie → Allow access                      │
│  ✅ Token valid → user tipe "admin" → Allow to /dasbor      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
              Dashboard Page
```

---

## 3. Perbedaan: Cookie vs Redux

| Aspek | Cookie | Redux |
|-------|--------|-------|
| **Tujuan** | Persistent data (survive refresh) | App state management |
| **Storage** | Browser memory + disk | Browser memory only |
| **Persist** | Ya (default) | Tidak (hilang saat refresh) |
| **Aman** | Bisa httpOnly (tidak accessible by JS) | Accessible oleh JS |
| **Middleware** | Bisa diakses (NextAuth pattern) | Tidak bisa diakses middleware |
| **Best for** | Token, session ID | UI state, user data, notifications |

---

## 4. Strategi Kami: Cookie + Redux

**Token:**
```
Simpan di Cookie → Middleware validasi → Aman & persistent
```

**User Data:**
```
Simpan di Redux → App bisa akses kapan saja → Real-time sync
```

**Alur:**
1. Login → API call (via Redux thunk)
2. Response dapat token + user data
3. Redux simpan user + token
4. Cookie simpan token saja
5. Middleware cek cookie token
6. App components bisa akses user via Redux

---

## 5. Keuntungan Perbaikan Ini

✅ **Separation of Concerns**
- Redux untuk app state
- Cookie untuk persistent auth

✅ **Best Practices**
- Token di cookie (middleware validate)
- User di Redux (app components access)

✅ **Better UX**
- Loading state selama login
- Toast notifications (better than alert)
- Disabled input saat loading

✅ **Type Safe**
- AppDispatch & RootState typed
- Async thunk dengan error handling

✅ **Persistence**
- Token tidak hilang saat refresh
- Redux state loaded dari Providers

---

## 6. Bagian Code yang Berubah

### authSlice.ts
```typescript
// SEBELUM: Hanya handle user
state.user = action.payload.user;

// SESUDAH: Handle user + token
state.user = action.payload.user;
state.token = action.payload.token;
Cookies.set("token", data.token, { expires: 1 });
```

### login-admin/page.tsx
```typescript
// SEBELUM: Manual fetch + cookie
const res = await fetch(`${baseUrl}/login-admin`, ...);
Cookies.set("token", result.token, { expires: 1 });
alert("Login berhasil!");
window.location.href = "/dasbor";

// SESUDAH: Redux dispatch + toast
const result = await dispatch(loginAdmin({ username, password })).unwrap();
toast.success("Login admin berhasil!");
router.push("/dasbor");
```

---

## 7. Flow Login yang Sudah Diperbaiki

1. ✅ User enter username & password
2. ✅ Redux dispatch loginAdmin thunk
3. ✅ API call ke backend dengan credentials
4. ✅ Backend response token + user
5. ✅ Redux state update (user + token)
6. ✅ Token saved to cookie (persistent)
7. ✅ Toast success notification
8. ✅ Programmatic redirect to /dasbor
9. ✅ Middleware cek token di cookie
10. ✅ Allow access ke protected route
11. ✅ Components bisa akses user dari Redux

---

## 8. Cara Akses Auth Data di Components

```typescript
// Di component manapun:
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function MyComponent() {
  const { user, token, loading } = useSelector((state: RootState) => state.auth);
  
  return <div>{user?.name}</div>;
}
```

---

## 9. Logout Implementation

```typescript
import { logout } from "@/store/slices/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout()); // Remove user & token from Redux + Cookie
    router.push("/login-admin");
  };
}
```

---

## Kesimpulan

**Cookie & Redux bukan competitor, tapi partner:**
- **Cookie** = Persistent & Secure (untuk token)
- **Redux** = Reactive & Real-time (untuk UI state)

Dengan kombinasi ini, Anda mendapat yang terbaik dari kedua dunia! 🎉
