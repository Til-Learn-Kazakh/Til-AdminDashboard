'use client'

import { formatMessageTime } from '@/core/lib/format-message-time'

export default function MessageTime({ timestamp }: { timestamp: string }) {
  return (
    <time className="text-xs" dateTime={timestamp}>
      {formatMessageTime(timestamp)}
    </time>
  )
}
