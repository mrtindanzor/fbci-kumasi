# Zustand Store Snippets

## Simple Store

```tsx
import { create } from "zustand"

type SettingsState = {
  region: string | null
  city: string | null
  setRegion: (region: string) => void
  setCity: (city: string) => void
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  region: null,
  city: null,
  setRegion: (region) => set({ region }),
  setCity: (city) => set({ city }),
}))
```

## Store with Middleware

```tsx
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type AuthState = {
  token: string | null
  user: UserPayload | null
  isAuthenticated: boolean
  setAuth: (token: string, user: UserPayload) => void
  logout: () => void
  getAccessToken: () => string | null
}

type UserPayload = {
  id: string
  email: string
  name: string
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        user: null,
        isAuthenticated: false,
        setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
        logout: () => set({ token: null, user: null, isAuthenticated: false }),
        getAccessToken: () => get().token,
      }),
      { name: "auth-storage" },
    ),
  ),
)
```

## Store with Computed Values

```tsx
import { create } from "zustand"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
          ),
        }
      }
      return { items: [...state.items, item] }
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i,
      ),
    })),
  clearCart: () => set({ items: [] }),
}))

// Selector hooks for derived data
export function useCartTotal() {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  )
}

export function useCartCount() {
  return useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  )
}
```

## Store with Async Actions

```tsx
import { create } from "zustand"

type NotificationState = {
  notifications: Notification[]
  isLoading: boolean
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => void
}

type Notification = {
  id: string
  message: string
  read: boolean
  createdAt: string
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  isLoading: false,
  fetchNotifications: async () => {
    set({ isLoading: true })
    const [data, error] = await tryCatch(notificationService.list())
    if (!error) {
      set({ notifications: data, isLoading: false })
    } else {
      set({ isLoading: false })
    }
  },
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),
}))
```
