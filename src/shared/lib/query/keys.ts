// Central registry of TanStack Query keys - extend here when adding a feature
export const qk = Object.freeze({
  auth: {
    me: () => ["auth", "me"],
  },
  users: {
    publicProfile: (id: string) => ["users", "public", id],
  },
  brands: {
    all: () => ["brands"],
    list: (params?: unknown) => ["brands", "list", params],
  },
  phones: {
    all: () => ["phones"],
    list: (params?: unknown) => ["phones", "list", params],
    infinite: (params?: unknown) => ["phones", "infinite", params],
    one: (id: string) => ["phones", "detail", id],
    mine: (params?: unknown) => ["phones", "mine", params],
  },
  comments: {
    all: () => ["comments"],
    byPhone: (id: string, params?: unknown) => ["comments", "phone", id, params],
  },
  ratings: {
    mine: (phoneId: string) => ["ratings", "mine", phoneId],
  },
  likes: {
    mineInfinite: (params?: unknown) => ["likes", "mine", "infinite", params],
    ids: () => ["likes", "ids"],
  },
});
