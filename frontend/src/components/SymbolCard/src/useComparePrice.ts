import { useEffect, useRef, useState } from 'react';

const getPercentage = (final: number, initial: number) => {
  if (initial === 0) return false;
  const value = ((final - initial) / initial) * 100;
  return Math.abs(value) > 25;
};
export const useComparePrevPrice = (price: number) => {
  const prevPrice = useRef(price);
  const [priceClass, setPriceClass] = useState('');
  const [isNumberChangeHigherThen25, setIsNumberChangeHigherThen25] = useState(false);

  useEffect(() => {
    const wasPriceGreater = price > prevPrice.current;
    const changeHigherThan25 = getPercentage(price, prevPrice.current);
    setIsNumberChangeHigherThen25(changeHigherThan25);

    if (wasPriceGreater) {
      setPriceClass('up');
    } else if (price < prevPrice.current) {
      setPriceClass('down');
    } else {
      setPriceClass('');
    }

    prevPrice.current = price;
    const timer = setTimeout(() => {
      setPriceClass('');
      setIsNumberChangeHigherThen25(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [price]);

  return { priceClass, isNumberChangeHigherThen25 };
};
