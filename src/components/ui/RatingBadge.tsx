import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  rating: number;
  size?: 'sm' | 'md';
}

export default function RatingBadge({ rating, size = 'md' }: RatingBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium text-amber-500',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm'
      )}
    >
      <Star
        className={cn(
          'fill-amber-400 text-amber-400',
          size === 'sm' && 'h-3 w-3',
          size === 'md' && 'h-4 w-4'
        )}
      />
      {rating.toFixed(1)}
    </span>
  );
}
