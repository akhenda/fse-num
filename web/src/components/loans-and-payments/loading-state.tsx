import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { Skeleton } from '../ui/skeleton';

const columnIds = [1, 2, 3, 4, 5, 6, 7];

export function LoadingState({ isCompact }: { isCompact?: boolean }) {
  return (
    <Card className={cn('mx-auto my-6 w-full max-w-6xl h-[370px]', { 'h-[314px]': isCompact })}>
      <CardHeader className="flex flex-row justify-between">
        <div className="w-full not-last:space-y-2">
          <Skeleton className="w-[15%] h-6" />
          <Skeleton className="w-[40%] h-4" />
        </div>
        <Skeleton className="w-[12%] h-9" />
      </CardHeader>
      <CardContent>
        <div>
          <div className="w-full">
            <div className={cn('w-full h-10 flex flex-row justify-between', { 'h-8': isCompact })}>
              {columnIds.map((column) => (
                <Skeleton key={column} className="w-[13%] h-full" />
              ))}
            </div>
          </div>
          <div className="w-full">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index}>
                <Skeleton className={cn('w-full h-10 my-3', { 'h-7': isCompact })} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
