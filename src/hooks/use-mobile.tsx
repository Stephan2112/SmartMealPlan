import { useEffect, useState } from 'react'

export const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= breakpoint)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [breakpoint])

  return isMobile
}