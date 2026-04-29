'use client';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: Props) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h2 className="text-lg font-semibold">Dashboard unavailable</h2>
      <p className="max-w-sm text-sm text-gray-500">
        {error.digest
          ? `Something went wrong (ID: ${error.digest}).`
          : 'An unexpected error occurred loading your dashboard.'}
      </p>
      <button
        onClick={reset}
        className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </main>
  );
}
