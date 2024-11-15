import './SymbolsView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useCallback, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectors } from '@/store/priceHistorySlice';

const SymbolsView = () => {
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);
  const [activeSymbol, setActiveSymbol] = useState<null | string>(symbolInfo);
  const handleSymbolClick = useCallback(
    (symbolId: string) => {
      setActiveSymbol((prevSymbolId) => (prevSymbolId === symbolId ? null : symbolId));
    },
    [setActiveSymbol]
  );

  return (
    <div className="symbolsView">
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__cards">
          <SymbolsGrid activeSymbolId={activeSymbol} onSymbolClick={handleSymbolClick} />
        </div>
        <div className="symbolsView__chart">
          <h3>PRICE HISTORY</h3>
          <PriceChart symbolId={activeSymbol} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
