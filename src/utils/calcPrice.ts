export const calculatePriceWithIncrease = (
  price: number,
  pricePercent: number
) => {
  return price + price * (pricePercent / 100);
};
