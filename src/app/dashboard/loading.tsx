export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-2xl animate-pulse px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-28 rounded bg-gray-200" />
          <div className="h-4 w-48 rounded bg-gray-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-16 rounded bg-gray-200" />
          <div className="h-9 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* Sections */}
      {[72, 56, 80, 64].map((h, i) => (
        <div
          key={i}
          className="mt-8 space-y-3 rounded border border-gray-200 p-6"
        >
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div style={{ height: h }} className="w-full rounded bg-gray-100" />
        </div>
      ))}
    </main>
  );
}
