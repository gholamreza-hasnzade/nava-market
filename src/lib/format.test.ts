import { describe, expect, it } from 'vitest'
import { toAsciiDigits } from '@/lib/format'

describe('toAsciiDigits', () => {
  it('normalizes Persian and Arabic numerals for input validation', () => {
    expect(toAsciiDigits('۰۹۱۲٣٤٥٦٧٨٩')).toBe('09123456789')
  })
})
