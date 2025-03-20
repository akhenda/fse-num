import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

import { LoadingButton } from './loading-button';

const formSchema = z.object({
  principal: z.preprocess(
    (a) => Number(z.string().parse(a)),
    z
      .number({
        required_error: 'Principal is required',
        invalid_type_error: 'Principal must be a number',
      })
      .int()
      .positive()
      .min(500, { message: 'Principal should be at least 500' })
      .max(10000000, { message: 'Principal should be at most 10000000' }),
  ),
  rate: z.preprocess(
    (a) => Number(z.string().parse(a)),
    z
      .number({ required_error: 'Rate is required', invalid_type_error: 'Rate must be a number' })
      .int()
      .positive()
      .min(5, { message: 'Rate should be at least 5' })
      .max(50, { message: 'Rate should be at most 50' }),
  ),
  months: z.preprocess(
    (a) => Number(z.string().parse(a)),
    z
      .number({
        required_error: 'Months is required',
        invalid_type_error: 'Months must be a number',
      })
      .int()
      .positive()
      .min(6, { message: 'Months should be at least 6' })
      .max(48, { message: 'Months should be at most 48' }),
  ),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues = { months: '', principal: '', rate: '' } as unknown as FormSchema;

export function LoanCalculatorWidget() {
  const [interest, setInterest] = useState(0);
  const form = useForm<FormSchema>({ resolver: zodResolver(formSchema), defaultValues });

  function onSubmit(values: FormSchema) {
    setInterest((values.principal * values.rate * values.months) / 100);
  }

  return (
    <div className="p-4">
      <h3 className="text-base mb-3 font-bold">Loan Calculator Widget</h3>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-3xl mx-auto py-2"
        >
          <FormField
            control={form.control}
            name="principal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Principal</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1234" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  The amount you want to borrow
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5%" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  The offered rate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="months"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Months</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="12 Months" {...field} />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  How long will you need to repay the loan?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="block">
            <LoadingButton
              type="submit"
              isLoading={
                form.formState.isSubmitting ||
                form.formState.isLoading ||
                form.formState.isValidating
              }
            >
              Calculate
            </LoadingButton>
          </div>
        </form>
      </Form>
      {interest > 0 && (
        <pre className="mt-2 w-full rounded-md bg-slate-200 p-4">
          <code className="text-primary">{interest}</code>
        </pre>
      )}
    </div>
  );
}
