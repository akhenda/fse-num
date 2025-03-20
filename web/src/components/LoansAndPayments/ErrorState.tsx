export function ErrorState({ error }: { error: Error }) {
  if (!error) return null;

  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}
