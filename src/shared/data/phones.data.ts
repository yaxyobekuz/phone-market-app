// Static option maps for the marketplace UI (labels in Uzbek, values in English).

export const CONDITIONS = [
  { value: "new", label: "Yangi" },
  { value: "like_new", label: "Yangidek" },
  { value: "used", label: "Ishlatilgan" },
];

export const CONDITION_LABEL: Record<string, string> = {
  new: "Yangi",
  like_new: "Yangidek",
  used: "Ishlatilgan",
};

// Badge colour per condition (used on the catalogue cards, over a photo).
export const CONDITION_BADGE_CLASS: Record<string, string> = {
  new: "bg-emerald-500 text-white",
  like_new: "bg-sky-500 text-white",
  used: "bg-white/90 text-gray-700",
};

export const STATUSES = [
  { value: "active", label: "Faol" },
  { value: "sold", label: "Sotilgan" },
  { value: "archived", label: "Arxivlangan" },
  { value: "blocked", label: "Bloklangan" },
];

export const STATUS_LABEL: Record<string, string> = {
  active: "Faol",
  sold: "Sotilgan",
  archived: "Arxivlangan",
  blocked: "Bloklangan",
};

export const SORTS = [
  { value: "newest", label: "Eng yangi" },
  { value: "price_asc", label: "Arzon avval" },
  { value: "price_desc", label: "Qimmat avval" },
  { value: "popular", label: "Ommabop" },
];

export const CURRENCIES = [
  { value: "UZS", label: "so'm" },
  { value: "USD", label: "$ (dollar)" },
];

export const REGIONS = [
  "Toshkent",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Xorazm",
  "Navoiy",
  "Jizzax",
  "Sirdaryo",
  "Qoraqalpog'iston",
];
