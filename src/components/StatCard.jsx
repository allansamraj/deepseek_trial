import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import TiltCard from './TiltCard';

export default function StatCard({ icon: Icon, title, value, trend, trendUp, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <TiltCard
        maxTilt={8}
        glowColor={`${color}20`}
        className="h-full p-6"
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
                backgroundColor: trendUp ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                color: trendUp ? '#10B981' : '#F43F5E',
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
          <div className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary, #A1A1AA)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {title}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
