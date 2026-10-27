import type { Campaign } from '@/types/domain/campaign'

// Demonstration campaigns with explicit start/end stories; item prices remain the source of the individual saving.
export const campaigns: Campaign[] = [
  {
    slug: 'digital-days',
    title: 'روزهای دیجیتال نوا',
    subtitle: 'تکنولوژی خوب، قیمت روشن',
    description: 'چند انتخاب کاربردی برای کار، استراحت و روزهای پرمشغله؛ هر کالا قیمت قبلی و مبلغ صرفه‌جویی خودش را دارد.',
    badge: 'ویژهٔ تکنولوژی',
    theme: 'digital',
    endsAt: '2026-11-03T23:59:59+03:30',
    productIds: ['p-101', 'p-102'],
  },
  {
    slug: 'home-refresh',
    title: 'خانه، حالِ تازه',
    subtitle: 'جزئیات کوچک، حس بهتر',
    description: 'برای گوشه‌های دوست‌داشتنی خانه؛ قیمت تخفیفی و مقدار صرفه‌جویی برای هر محصول جداگانه نمایش داده می‌شود.',
    badge: 'خانه و آشپزخانه',
    theme: 'home',
    endsAt: '2026-11-05T23:59:59+03:30',
    productIds: ['p-104', 'p-106'],
  },
  {
    slug: 'everyday-picks',
    title: 'انتخاب‌های روزمره',
    subtitle: 'همراه سبک زندگی تو',
    description: 'انتخاب‌هایی برای پوشیدنی‌ها و مراقبت روزانه؛ هر تخفیف به همان کالا متصل است و روی قیمت نهایی همان کالا اعمال می‌شود.',
    badge: 'سبک زندگی',
    theme: 'lifestyle',
    endsAt: '2026-11-01T23:59:59+03:30',
    productIds: ['p-105', 'p-107'],
  },
]
