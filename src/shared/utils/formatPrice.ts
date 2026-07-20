import { formatMoney, groupThousands } from "./formatMoney";

// UZS → "9 500 000 so'm", USD → "$9,500"
export const formatPrice = (price?: number | string | null, currency = "UZS") => {
  if (price == null || price === "") return "-";
  if (currency === "USD") return `$${groupThousands(Number(price), ",")}`;
  return formatMoney(Number(price));
};

export default formatPrice;
