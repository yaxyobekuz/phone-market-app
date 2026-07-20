// O'zbekiston viloyatlari va ularning shahar/tumanlari (profil uchun).
export const REGION_CITIES: Record<string, string[]> = {
  "Toshkent shahri": [
    "Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulug'bek", "Olmazor", "Sergeli",
    "Shayxontohur", "Uchtepa", "Yakkasaroy", "Yashnobod", "Yangihayot", "Yunusobod",
  ],
  "Toshkent viloyati": [
    "Angren", "Bekobod", "Chirchiq", "Nurafshon", "Ohangaron", "Olmaliq", "Yangiyo'l",
    "Bo'ka", "Bo'stonliq", "Chinoz", "Oqqo'rg'on", "Parkent", "Piskent", "Qibray",
    "Quyichirchiq", "O'rtachirchiq", "Yuqorichirchiq", "Zangiota",
  ],
  Andijon: [
    "Andijon shahri", "Asaka", "Xonobod", "Shahrixon", "Baliqchi", "Bo'ston",
    "Buloqboshi", "Izboskan", "Jalaquduq", "Qo'rg'ontepa", "Marhamat", "Oltinko'l",
    "Paxtaobod", "Ulug'nor", "Xo'jaobod",
  ],
  "Farg'ona": [
    "Farg'ona shahri", "Marg'ilon", "Qo'qon", "Quvasoy", "Beshariq", "Bog'dod",
    "Buvayda", "Dang'ara", "Furqat", "Qo'shtepa", "Oltiariq", "Quva", "Rishton",
    "So'x", "Toshloq", "Uchko'prik", "O'zbekiston", "Yozyovon",
  ],
  Namangan: [
    "Namangan shahri", "Chust", "Kosonsoy", "Pop", "Chortoq", "Mingbuloq", "Norin",
    "To'raqo'rg'on", "Uchqo'rg'on", "Uychi", "Yangiqo'rg'on", "Davlatobod",
  ],
  Samarqand: [
    "Samarqand shahri", "Kattaqo'rg'on", "Bulung'ur", "Ishtixon", "Jomboy",
    "Qo'shrabot", "Narpay", "Nurobod", "Oqdaryo", "Pastdarg'om", "Paxtachi",
    "Payariq", "Toyloq", "Urgut",
  ],
  Buxoro: [
    "Buxoro shahri", "Kogon", "G'ijduvon", "Vobkent", "Jondor", "Olot", "Peshku",
    "Qorako'l", "Qorovulbozor", "Romitan", "Shofirkon",
  ],
  Navoiy: [
    "Navoiy shahri", "Zarafshon", "Karmana", "Konimex", "Navbahor", "Nurota",
    "Qiziltepa", "Tomdi", "Uchquduq", "Xatirchi",
  ],
  Qashqadaryo: [
    "Qarshi", "Shahrisabz", "Kitob", "G'uzor", "Koson", "Chiroqchi", "Dehqonobod",
    "Qamashi", "Kasbi", "Mirishkor", "Muborak", "Nishon", "Yakkabog'",
  ],
  Surxondaryo: [
    "Termiz", "Denov", "Boysun", "Sho'rchi", "Angor", "Bandixon", "Jarqo'rg'on",
    "Qiziriq", "Qumqo'rg'on", "Muzrabot", "Oltinsoy", "Sariosiyo", "Uzun", "Sherobod",
  ],
  Jizzax: [
    "Jizzax shahri", "G'allaorol", "Do'stlik", "Sharof Rashidov", "Arnasoy",
    "Baxmal", "Forish", "Mirzacho'l", "Paxtakor", "Yangiobod", "Zafarobod",
    "Zarbdor", "Zomin",
  ],
  Sirdaryo: [
    "Guliston", "Yangiyer", "Shirin", "Sirdaryo", "Boyovut", "Sayxunobod",
    "Mirzaobod", "Oqoltin", "Sardoba", "Xovos",
  ],
  Xorazm: [
    "Urganch", "Xiva", "Bog'ot", "Gurlan", "Hazorasp", "Xonqa", "Qo'shko'pir",
    "Shovot", "Yangiariq", "Yangibozor", "Tuproqqal'a",
  ],
  "Qoraqalpog'iston": [
    "Nukus", "Beruniy", "Chimboy", "Xo'jayli", "Taxiatosh", "Qo'ng'irot", "Kegeyli",
    "Mo'ynoq", "Qonliko'l", "Qorao'zak", "Shumanay", "Taxtako'pir", "To'rtko'l",
    "Amudaryo", "Ellikqal'a", "Bo'zatov",
  ],
};

export const PROFILE_REGIONS = Object.keys(REGION_CITIES);

export const REGION_OPTIONS = PROFILE_REGIONS.map((r) => ({ value: r, label: r }));

export const getCityOptions = (region: string) =>
  (REGION_CITIES[region] || []).map((c) => ({ value: c, label: c }));
