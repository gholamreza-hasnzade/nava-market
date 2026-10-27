import { useEffect, useState } from 'react'
import { Clock3 } from 'lucide-react'
import type { CampaignCountdownProps } from '@/types/components/atoms/campaign-countdown'

function remainingTime(endsAt: string, now: number) {
  const total = Math.max(0, new Date(endsAt).getTime() - now)
  return { total, days: Math.floor(total / 86_400_000), hours: Math.floor((total / 3_600_000) % 24), minutes: Math.floor((total / 60_000) % 60), seconds: Math.floor((total / 1000) % 60) }
}

export function CampaignCountdown({ endsAt, compact = false }: CampaignCountdownProps) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const time = remainingTime(endsAt, now)
  if (time.total <= 0) return <span className={`campaign-countdown campaign-countdown--ended ${compact ? 'is-compact' : ''}`}>این کمپین تمام شده</span>
  return <span className={`campaign-countdown ${compact ? 'is-compact' : ''}`}><Clock3 size={14}/>{time.days > 0 && <b>{time.days.toLocaleString('fa-IR')} روز</b>}<b>{String(time.hours).padStart(2, '0').replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])}:{String(time.minutes).padStart(2, '0').replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])}:{String(time.seconds).padStart(2, '0').replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])}</b><span>باقی‌مانده</span></span>
}
