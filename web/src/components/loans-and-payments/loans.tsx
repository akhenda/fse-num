'use client';

import { useCallback, useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';

import { useGetLoans } from '@/api/graphql/resources';
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

import { EmptyState } from './empty-state';
import { ErrorState } from './error-state';

const columns = [
  { id: 'id', title: 'ID' },
  { id: 'name', title: 'Name' },
  { id: 'principal', title: 'Principal' },
  { id: 'interestRate', title: 'Interest Rate' },
  { id: 'dueDate', title: 'Due Date' },
  { id: 'actions', title: 'Actions' },
] as const;
const columnIds = columns.map((col) => col.id);

type ColumnId = (typeof columnIds)[number];
type ColumnsData = Record<Exclude<ColumnId, 'actions'>, string | number | null | undefined>;
type TableCellItemData = Partial<ColumnsData> | null;
type TableCellItemProps = { column: ColumnId; data: TableCellItemData };

function TableCellItem({ column, data }: TableCellItemProps) {
  if (!data) return null;
  if (column === 'id') {
    return (
      <a href="#" className="font-medium">
        {data.id}
      </a>
    );
  }

  if (column === 'actions') {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Pencil className="size-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash className="size-4" />
        </Button>
      </div>
    );
  }

  if (column === 'dueDate') return data.dueDate ? new Date(data.dueDate).toDateString() : null;
  if (column === 'interestRate') return data.interestRate ? `${data.interestRate}%` : null;
  if (column === 'principal') {
    return data.principal ? new Date(data.principal).toDateString() : null;
  }

  return data[column];
}

export function Loans() {
  const [selectedColumns, setSelectedColumns] = useState(columnIds);
  const { data, error } = useGetLoans();

  const handleColumnToggle = useCallback((column: ColumnId) => {
    setSelectedColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column],
    );
  }, []);

  if (error) return <ErrorState error={error} />;
  if (!data || !data.loans) return <EmptyState resource="loans" />;

  return (
    <Card className="mx-auto my-6 w-full max-w-6xl">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <CardTitle>Existing Loans</CardTitle>
          <CardDescription>View and manage user loans, including adding payments.</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Eye className="size-4 stroke-2 text-muted-foreground" />
              Show/Hide
            </Button>
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
            {data.loans.map((loan, index) => (
              <TableRow key={index}>
                {selectedColumns.map((column) => (
                  <TableCell key={column}>
                    <TableCellItem column={column} data={loan} />
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
