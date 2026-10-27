import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <main className="shell page-space"><div className="empty-results"><span>۴۰۴</span><h1>این صفحه را پیدا نکردیم</h1><p>به صفحهٔ اصلی برگرد تا دوباره بگردیم.</p><Link className="button button-primary" to="/">صفحه اصلی</Link></div></main>
}
