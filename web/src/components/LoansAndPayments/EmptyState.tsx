export function EmptyState({ resource }: { resource: 'loans' | 'payments' }) {
  return (
    <div>
      <h1>No {resource} found</h1>
    </div>
  );
}
