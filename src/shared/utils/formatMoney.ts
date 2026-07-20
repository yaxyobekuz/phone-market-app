// Manual thousands grouping — Hermes lacks reliable Intl/toLocaleString.
const groupThousands = (n: number, sep: string) => {
  const num = Math.round(Number(n) || 0);
  const s = Math.abs(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return `${num < 0 ? "-" : ""}${s}`;
};

// 9500000 → "9 500 000 so'm"
export const formatMoney = (n: number) => `${groupThousands(n, " ")} so'm`;

export { groupThousands };
