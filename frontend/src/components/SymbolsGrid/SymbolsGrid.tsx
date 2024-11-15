import './SymbolsGrid.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
  activeSymbolId: string | null;
};

const SymbolsGrid = ({ onSymbolClick, activeSymbolId }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!stockSymbols.length) {
      dispatch(fetchAllStocks());
    }
  }, [dispatch]);
  return (
    <div className="symbolsGrid">
      {stockSymbols.map((id, i) => (
        <SymbolCard
          price={prices[id]}
          onClick={onSymbolClick}
          {...(activeSymbolId ? { selected: activeSymbolId } : {})}
          key={i}
          id={id}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
