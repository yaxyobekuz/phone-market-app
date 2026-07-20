export const ENDPOINTS = Object.freeze({
  auth: {
    login: "/auth/login",
    google: "/auth/google",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
    registerUser: "/auth/register-user",
  },
  users: {
    base: "/users",
    byId: (id: string) => `/users/${id}`,
    publicProfile: (id: string) => `/users/${id}/public`,
  },
  brands: {
    base: "/brands",
    byId: (id: string) => `/brands/${id}`,
  },
  phones: {
    base: "/phones",
    byId: (id: string) => `/phones/${id}`,
    mine: "/phones/mine",
    admin: "/phones/admin",
    moderate: (id: string) => `/phones/${id}/moderate`,
  },
  comments: {
    base: "/comments",
    byPhone: (id: string) => `/comments/phone/${id}`,
    byId: (id: string) => `/comments/${id}`,
  },
  ratings: {
    byPhone: (id: string) => `/ratings/phone/${id}`,
    mine: (id: string) => `/ratings/phone/${id}/mine`,
  },
  likes: {
    toggle: (id: string) => `/likes/phone/${id}/toggle`,
    mine: "/likes/mine",
    ids: "/likes/ids",
  },
  uploads: {
    base: "/uploads",
  },
});
