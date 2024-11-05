import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCap } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import formatNumber from './src/convertToAbbreviation';
import TrendIndicator from '../TrendIndicator/TrendIndicator';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { memo, useMemo } from 'react';
import { useComparePrevPrice } from './src/useComparePrice';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  selected?: string;
};

const SymbolCard = memo(({ id, onClick, price, selected }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const { priceClass, isNumberChangeHigherThen25 } = useComparePrevPrice(price);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const formattedMarketCap = useMemo(() => `$${formatNumber(marketCap)}`, [marketCap]);
  const priceClassMemo = useMemo(() => {
    return `symbolCard ${priceClass ? `symbolCard__${priceClass}` : ''} ${
      isNumberChangeHigherThen25 ? 'symbolCard__shake' : ''
    }`;
  }, [priceClass, isNumberChangeHigherThen25]);
  return (
    <div
      onClick={() => onClick(id)}
      className={priceClassMemo}
      {...(selected !== undefined ? { 'data-selected': selected === id } : {})}
    >
      <div className="symbolCard__header">
        {id}
        <TrendIndicator status={trend} />
      </div>
      <div className="symbolCard__content">
        <div className="symbolCard__price">
          <div className="symbolCard__price-label">Price:</div>
          <div className="symbolCard__price-value">${price ? Math.floor(price) : '--'} </div>
        </div>
        {showCardInfo ? (
          <>
            <ListItem Icon={<CompanyIcon />} spacing="space-between" label={companyName} />
            <ListItem Icon={<IndustryIcon />} spacing="space-between" label={industry} />
            <ListItem Icon={<MarketCap />} spacing="space-between" label={formattedMarketCap} />
          </>
        ) : null}
      </div>
    </div>
  );
});
export default SymbolCard;
