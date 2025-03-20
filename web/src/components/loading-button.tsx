import { ComponentProps, PropsWithChildren } from 'react';
import { LoaderCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type LoadingButtonProps = PropsWithChildren<
  ComponentProps<typeof Button> & { isLoading?: boolean }
>;

export function LoadingButton({ children, isLoading, ...rest }: LoadingButtonProps) {
  return (
    <Button {...rest} disabled={isLoading}>
      {isLoading && (
        <LoaderCircleIcon className="-ms-1 animate-spin" size={16} aria-hidden="true" />
      )}
      {children}
    </Button>
  );
}
