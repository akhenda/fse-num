import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import * as z from 'zod';

import { useAddLoanPayment } from '@/api';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { LoadingButton } from './loading-button';

const formSchema = z.object({
  date: z.coerce.date(),
  loanId: z.preprocess(
    (a) => Number(z.string().parse(a)),
    z
      .number({
        required_error: 'Loan ID is required',
        invalid_type_error: 'Loan ID must be a number',
        message: 'Loan ID must be a number',
      })
      .int()
      .positive({ message: 'Loan ID should be a positive integer' })
      .min(1, { message: 'Loan ID should be at least 1' }),
  ),
});

type FormSchema = z.infer<typeof formSchema>;
type AddNewPaymentProps = { inDialog?: boolean; date?: Date; loanId?: number | string };

export function AddNewPayment({ inDialog, date = new Date(), loanId = '' }: AddNewPaymentProps) {
  const { mutate: addPayment, isPending } = useAddLoanPayment();
  const form = useForm<FormSchema>({
    defaultValues: { date, loanId } as unknown as FormSchema,
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormSchema) {
    addPayment({ loanId: values.loanId, paymentDate: values.date });
  }

  useEffect(() => {
    if (loanId) {
      form.reset({ loanId: Number(loanId) });
    }
  }, [form, loanId]);

  return (
    <div className={cn('p-4', { 'p-0': inDialog })}>
      {!inDialog && <h3 className="text-base font-bold mb-3">Add New Payment</h3>}
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-3xl mx-auto py-2"
        >
          <FormField
            control={form.control}
            name="loanId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan ID</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1234" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  The loan ID
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        aria-label="date-button"
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? field.value.toDateString() : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={(date) =>
                      //   date > new Date() || date < new Date("1900-01-01")
                      // }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs text-muted-foreground">
                  When did you make the payment
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={cn('block', { 'flex w-full justify-end': inDialog })}>
            <LoadingButton
              type="submit"
              isLoading={
                form.formState.isSubmitting ||
                form.formState.isLoading ||
                form.formState.isValidating ||
                isPending
              }
            >
              Add Payment
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
