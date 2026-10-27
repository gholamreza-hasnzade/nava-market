import type { Product } from '@/types/domain/product'
import type { ProductReview } from '@/types/domain/review'

export const categories = [
  { id: 'digital', name: 'کالای دیجیتال', icon: '▣', color: 'lilac' },
  { id: 'home', name: 'خانه و آشپزخانه', icon: '⌂', color: 'mint' },
  { id: 'fashion', name: 'مد و پوشاک', icon: '✦', color: 'peach' },
  { id: 'beauty', name: 'زیبایی و سلامت', icon: '◌', color: 'rose' },
  { id: 'sport', name: 'ورزش و سفر', icon: '↗', color: 'blue' },
] as const

const productSeeds: Product[] = [
  { id: 'p-101', slug: 'nava-x-smartphone', title: 'گوشی هوشمند نوا X ظرفیت ۲۵۶ گیگابایت', category: 'digital', categoryLabel: 'کالای دیجیتال', price: 38990000, originalPrice: 42900000, rating: 4.8, reviewCount: 128, seller: { name: 'تک‌استور', rating: 4.9, trusted: true }, image: '/products/phone.png', visual: '▣', visualTone: 'lavender', stock: 12, labels: ['ارسال امروز', 'پرفروش'], description: 'یک تجربه روان و سریع با نمایشگر درخشان، دوربین حرفه‌ای و باتری قابل‌اعتماد؛ مناسب برای کارهای روزمره و تولید محتوا.', features: ['نمایشگر ۶.۷ اینچی AMOLED', 'حافظه داخلی ۲۵۶ گیگابایت', 'باتری ۵۰۰۰ میلی‌آمپرساعت', 'گارانتی ۱۸ ماهه معتبر'], color: 'خاکستری تیتانیومی' },
  { id: 'p-102', slug: 'studio-headphones', title: 'هدفون بی‌سیم استودیو مدل AirTone Pro', category: 'digital', categoryLabel: 'کالای دیجیتال', price: 7490000, originalPrice: 8990000, rating: 4.7, reviewCount: 86, seller: { name: 'صوت‌پلاس', rating: 4.8, trusted: true }, image: '/products/headphones.png', visual: '◖', visualTone: 'mint', stock: 8, labels: ['تخفیف ویژه'], description: 'صدایی شفاف با حذف نویز تطبیقی و گوشی‌های نرم برای استفاده طولانی‌مدت؛ مناسب موسیقی، تماس و تمرکز.', features: ['حذف نویز فعال', 'تا ۳۲ ساعت پخش', 'شارژ سریع USB-C', 'اتصال هم‌زمان به دو دستگاه'], color: 'نقره‌ای' },
  { id: 'p-103', slug: 'smartwatch-sage', title: 'ساعت هوشمند مدل Pulse S بند سیلیکونی', category: 'digital', categoryLabel: 'کالای دیجیتال', price: 5290000, rating: 4.5, reviewCount: 54, seller: { name: 'دیجیتال‌زون', rating: 4.6, trusted: true }, image: '/products/watch.png', visual: '◉', visualTone: 'cream', stock: 19, labels: ['جدید'], description: 'همراه سبک روزهای شلوغ؛ پایش فعالیت روزانه و اعلان‌های مهم در طراحی مینیمال و خوش‌دست.', features: ['نمایشگر AMOLED', 'پایش ضربان قلب و خواب', 'مقاوم در برابر آب روزمره', 'شارژدهی تا ۷ روز'], color: 'سبز مریم‌گلی' },
  { id: 'p-104', slug: 'barista-espresso-maker', title: 'اسپرسوساز خانگی مدل Barista Mini', category: 'home', categoryLabel: 'خانه و آشپزخانه', price: 11690000, originalPrice: 13900000, rating: 4.6, reviewCount: 73, seller: { name: 'خانه‌نو', rating: 4.7, trusted: true }, visual: '☕', visualTone: 'peach', stock: 6, labels: ['ارسال رایگان'], description: 'قهوه‌ای خوش‌عطر در خانه، با دستگاهی جمع‌وجور و ساده برای استفاده روزانه.', features: ['فشار بخار ۲۰ بار', 'نازل بخار قابل تنظیم', 'مخزن آب ۱.۲ لیتری', 'سینی چکه‌گیر جداشونده'] },
  { id: 'p-105', slug: 'everyday-sneakers', title: 'کفش روزمره سبک مدل Move One', category: 'fashion', categoryLabel: 'مد و پوشاک', price: 2890000, originalPrice: 3490000, rating: 4.4, reviewCount: 112, seller: { name: 'قدم‌نو', rating: 4.5, trusted: false }, visual: '👟', visualTone: 'blue', stock: 24, labels: ['تخفیف ویژه'], description: 'کفشی سبک و راحت برای رفت‌وآمد روزانه با کفی نرم و رویه تنفس‌پذیر.', features: ['رویه مش تنفس‌پذیر', 'کفی نرم و منعطف', 'مناسب استفاده روزانه', 'تعویض سایز آسان'], color: 'سفید و طوسی' },
  { id: 'p-106', slug: 'ceramic-table-lamp', title: 'چراغ رومیزی سرامیکی مدل آرام', category: 'home', categoryLabel: 'خانه و آشپزخانه', price: 1790000, rating: 4.8, reviewCount: 39, seller: { name: 'خانه‌نو', rating: 4.7, trusted: true }, visual: '◐', visualTone: 'rose', stock: 11, labels: ['ساخت ایران'], description: 'نوری گرم و آرامش‌بخش برای کنار تخت یا میز کار، با بدنه سرامیکی دست‌ساز.', features: ['بدنه سرامیکی لعاب‌دار', 'نور گرم و ملایم', 'کلید روی سیم', 'سازگار با لامپ E27'], color: 'کرم مات' },
  { id: 'p-107', slug: 'daily-skin-care-set', title: 'ست مراقبت روزانه پوست مدل Hydrate', category: 'beauty', categoryLabel: 'زیبایی و سلامت', price: 1390000, originalPrice: 1650000, rating: 4.3, reviewCount: 41, seller: { name: 'زیبانو', rating: 4.8, trusted: true }, visual: '✿', visualTone: 'peach', stock: 17, labels: ['محبوب'], description: 'روتین ساده و روزانه با ترکیبات آبرسان برای مراقبت از پوست‌های معمولی و خشک.', features: ['پاک‌کننده ملایم', 'سرم آبرسان', 'کرم مرطوب‌کننده', 'مناسب استفاده روزانه'] },
  { id: 'p-108', slug: 'travel-backpack', title: 'کوله‌پشتی شهری مدل Roam ظرفیت ۲۰ لیتر', category: 'sport', categoryLabel: 'ورزش و سفر', price: 2190000, rating: 4.6, reviewCount: 67, seller: { name: 'راه‌سبک', rating: 4.6, trusted: true }, visual: '▱', visualTone: 'mint', stock: 9, labels: ['پرفروش'], description: 'کوله‌ای سبک و کاربردی برای مسیرهای شهری و سفرهای کوتاه با محفظه لپ‌تاپ.', features: ['ظرفیت ۲۰ لیتر', 'محفظه لپ‌تاپ تا ۱۵ اینچ', 'پارچه مقاوم در برابر رطوبت', 'بندهای ارگونومیک'], color: 'ذغالی' },
]

const sampleReviews: Record<Product['category'], ProductReview[]> = {
  digital: [
    { id: 'r-1', author: 'مریم ک.', rating: 5, date: '۱۴۰۵/۰۷/۲۲', title: 'کیفیت ساخت فراتر از انتظار', body: 'بسته‌بندی مرتب بود و محصول دقیقاً مطابق توضیحات رسید. تجربهٔ خرید از فروشنده هم خیلی خوب بود.', verifiedPurchase: true, helpfulCount: 18 },
    { id: 'r-2', author: 'امیرحسین ر.', rating: 4, date: '۱۴۰۵/۰۷/۱۸', title: 'انتخاب خوب برای استفاده روزمره', body: 'از عملکرد دستگاه راضی‌ام. ارسال به‌موقع انجام شد؛ فقط دوست داشتم رنگ‌های بیشتری موجود بود.', verifiedPurchase: true, helpfulCount: 9 },
    { id: 'r-3', author: 'نگار م.', rating: 5, date: '۱۴۰۵/۰۷/۱۲', title: 'ارزش خرید بالا', body: 'جزئیات محصول و ضمانت برایم مهم بود و هر دو مورد شفاف بودند. دوباره از این فروشنده خرید می‌کنم.', verifiedPurchase: true, helpfulCount: 6 },
  ],
  home: [
    { id: 'r-4', author: 'الهام س.', rating: 5, date: '۱۴۰۵/۰۷/۲۱', title: 'قشنگ و کاربردی', body: 'کیفیت محصول خوب است و با توضیحات صفحه مطابقت دارد. برای خانه انتخاب دلنشینی بود.', verifiedPurchase: true, helpfulCount: 12 },
    { id: 'r-5', author: 'بهاره ن.', rating: 4, date: '۱۴۰۵/۰۷/۱۷', title: 'بسته‌بندی مطمئن', body: 'محصول سالم به دستم رسید و از پاسخ‌گویی فروشنده راضی بودم.', verifiedPurchase: true, helpfulCount: 4 },
  ],
  fashion: [
    { id: 'r-6', author: 'سحر د.', rating: 5, date: '۱۴۰۵/۰۷/۲۳', title: 'برای پیاده‌روی عالیه', body: 'سبک و راحت است. اندازه طبق راهنمای سایز بود و تعویض هم ساده انجام شد.', verifiedPurchase: true, helpfulCount: 15 },
    { id: 'r-7', author: 'آرزو پ.', rating: 4, date: '۱۴۰۵/۰۷/۱۵', title: 'راحت‌تر از عکسش', body: 'رنگ واقعی نزدیک به عکس است؛ بعد از چند روز استفاده هم راحت مانده.', verifiedPurchase: true, helpfulCount: 7 },
  ],
  beauty: [
    { id: 'r-8', author: 'هستی م.', rating: 4, date: '۱۴۰۵/۰۷/۱۹', title: 'روتین ساده و خوش‌قیمت', body: 'برای شروع روتین روزانه مناسب است. بسته‌بندی تمیز و تاریخ‌ها واضح بودند.', verifiedPurchase: true, helpfulCount: 8 },
    { id: 'r-9', author: 'نیلوفر الف.', rating: 5, date: '۱۴۰۵/۰۷/۱۰', title: 'خرید مطمئن', body: 'محصول پلمب بود و فروشنده به پرسشم سریع جواب داد.', verifiedPurchase: true, helpfulCount: 3 },
  ],
  sport: [
    { id: 'r-10', author: 'پارسا م.', rating: 5, date: '۱۴۰۵/۰۷/۲۰', title: 'سبک و جادار', body: 'برای رفت‌وآمد روزانه مناسب است و جیب لپ‌تاپ واقعاً کاربردی است.', verifiedPurchase: true, helpfulCount: 11 },
    { id: 'r-11', author: 'محمد س.', rating: 4, date: '۱۴۰۵/۰۷/۱۴', title: 'کیفیت قابل قبول', body: 'دوخت تمیز و وزن مناسبی دارد. خرید خوبی نسبت به قیمت بود.', verifiedPurchase: true, helpfulCount: 5 },
  ],
}

const specLabels: Record<Product['category'], string[]> = {
  digital: ['نمایشگر', 'حافظه و عملکرد', 'اتصال و باتری', 'گارانتی'],
  home: ['ساختار', 'عملکرد', 'ظرفیت', 'نگهداری'],
  fashion: ['جنس و ساخت', 'راحتی', 'کاربری', 'خدمات'],
  beauty: ['محتویات', 'ترکیبات', 'روش استفاده', 'مناسب برای'],
  sport: ['ظرفیت', 'محفظه‌ها', 'جنس', 'طراحی'],
}

export const products: Product[] = productSeeds.map((product) => ({
  ...product,
  specifications: product.features.map((value, index) => ({ label: specLabels[product.category][index] ?? `مشخصه ${index + 1}`, value })),
  reviews: sampleReviews[product.category],
}))
