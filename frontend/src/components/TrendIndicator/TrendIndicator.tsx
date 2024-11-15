import './TrendIndicator.css';
import DownIndicator from '@/assets/down.png';
import UpIndicator from '@/assets/up.png';
import { memo } from 'react';

type TrendIndicatorProps = {
  status: 'UP' | 'DOWN' | null;
};
const TrendIndicator = memo(({ status }: TrendIndicatorProps) => {
  if (status === null) return null;
  return status === 'DOWN' ? (
    <img className="trendIndicator" src={DownIndicator} alt="Down" />
  ) : (
    <img className="trendIndicator" src={UpIndicator} alt="Up" />
  );
});

export default TrendIndicator;
