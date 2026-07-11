import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ icon: Icon, title, value, trend, trendUp, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: `0 0 20px ${color}30` }}
      className="relative overflow-hidden rounded-2xl border p-6"
      style={{
        background: 'rgba(44, 24, 16, 0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderColor: 'rgba(230, 209, 123, 0.25)',
      }}
    >
      {/* Subtle gradient glow */}
      <div
        className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-20 blur-3xl"
        style={{ background: color }}
      />

      <div className="relative z-10">
        {/* Top row: Icon */}
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${color}26` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          {/* Trend badge */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
            style={{
              backgroundColor: trendUp ? 'rgba(143, 166, 130, 0.15)' : 'rgba(214, 101, 92, 0.15)',
              color: trendUp ? '#8fa682' : '#d6655c',
            }}
          >
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        </div>

        {/* Value */}
        <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
          {value}
        </div>

        {/* Title */}
        <div className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary, #dcd2b8)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {title}
        </div>
      </div>
    </motion.div>
  );
}
