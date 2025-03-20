import { useCallback, useState } from 'react';
import { CirclePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCategorizedLoanPayments } from '@/hooks/use-categorized-loan-payments';
import { formatDate } from '@/lib/payments';
import { cn } from '@/lib/utils';

import { AddNewPayment } from '../add-new-payment';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { EmptyState } from './empty-state';
import { ErrorState } from './error-state';
import { TableCellItem as LoansTableCellItem } from './loans';

const columns = [
  { id: 'id', title: 'Loan ID' },
  { id: 'name', title: 'Name' },
  { id: 'principal', title: 'Principal' },
  { id: 'interestRate', title: 'Interest Rate' },
  { id: 'dueDate', title: 'Due Date' },
  { id: 'paymentDate', title: 'Payment Date' },
  { id: 'status', title: 'Status' },
] as const;
const columnIds = columns.map((column) => column.id);

type ColumnId = (typeof columnIds)[number];
type ColumnsData = Record<ColumnId | 'statusColor', string | number | null | undefined>;
type TableCellItemData = Partial<ColumnsData> | null;
type TableCellItemProps = { column: ColumnId; data?: TableCellItemData };

function TableCellItem({ column, data }: TableCellItemProps) {
  if (!data) return null;
  if (column === 'paymentDate') {
    return data.paymentDate ? formatDate(new Date(data.paymentDate)) : null;
  }

  if (column === 'status') {
    return data[column] ? (
      <Badge className={cn(data.statusColor ? data.statusColor : '')}>{data[column]}</Badge>
    ) : null;
  }

  return <LoansTableCellItem column={column} data={data} />;
}

export function Payments() {
  const { data: loanPayments, error } = useCategorizedLoanPayments();
  const [selectedColumns, setSelectedColumns] = useState(columnIds);

  const handleColumnToggle = useCallback((column: ColumnId) => {
    setSelectedColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column],
    );
  }, []);

  if (error) return <ErrorState error={error} />;
  if (!loanPayments) return <EmptyState resource="loans" />;

  return (
    <Card className="mx-auto my-6 w-full max-w-6xl">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <CardTitle>Existing Loan Payments</CardTitle>
          <CardDescription>View and manage user loan payments.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CirclePlus className="size-4 stroke-2 text-muted-foreground" />
                  Add Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Payment</DialogTitle>
                  <DialogDescription>
                    Add a new loan payment. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <AddNewPayment inDialog />
              </DialogContent>
            </Dialog>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {columnIds.map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                checked={selectedColumns.includes(column)}
                onCheckedChange={() => handleColumnToggle(column)}
              >
                {columns.find((col) => col.id === column)?.title}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {selectedColumns.map((column) => (
                <TableHead key={column}>
                  {columns.find((col) => col.id === column)?.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanPayments.map((payment, index) => (
              <TableRow key={index}>
                {selectedColumns.map((column) => (
                  <TableCell key={column}>
                    <TableCellItem column={column} data={payment} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
