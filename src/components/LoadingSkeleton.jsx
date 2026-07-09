export default function LoadingSkeleton({ variant = 'text', count = 1, className = '' }) {
  const skeletons = {
    text: (i) => (
      <div key={i} className={`skeleton h-4 rounded ${className}`} style={{ width: `${70 + Math.random() * 30}%` }} />
    ),
    card: (i) => (
      <div key={i} className={`rounded-2xl p-6 ${className}`} style={{ background: 'rgba(24, 24, 27, 0.6)', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
        <div className="skeleton h-4 w-1/3 rounded mb-4" />
        <div className="skeleton h-8 w-2/3 rounded mb-3" />
        <div className="skeleton h-3 w-full rounded mb-2" />
        <div className="skeleton h-3 w-4/5 rounded" />
      </div>
    ),
    avatar: (i) => (
      <div key={i} className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-full shrink-0" />
        <div className="flex-1">
          <div className="skeleton h-4 w-1/2 rounded mb-2" />
          <div className="skeleton h-3 w-3/4 rounded" />
        </div>
      </div>
    ),
    chart: (i) => (
      <div key={i} className={`rounded-2xl p-6 ${className}`} style={{ background: 'rgba(24, 24, 27, 0.6)', border: '1px solid rgba(63, 63, 70, 0.3)' }}>
        <div className="skeleton h-4 w-1/4 rounded mb-6" />
        <div className="flex items-end gap-2 h-40">
          {Array.from({ length: 7 }).map((_, j) => (
            <div
              key={j}
              className="skeleton flex-1 rounded-t"
              style={{ height: `${30 + Math.random() * 70}%` }}
            />
          ))}
        </div>
      </div>
    ),
  }

  const renderSkeleton = skeletons[variant] || skeletons.text

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </div>
  )
}
