import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from '@/components/organisms/site-header'
import { CompareTray } from '@/components/organisms/compare-tray'

export function StoreLayout() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])
  return <><SiteHeader/><Outlet/><CompareTray/><div className="mobile-safe-space"/></>
}
