import Image from 'next/image'
import Link from 'next/link'

export default function BrandLogo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-inherit" style={{ textDecoration: 'none' }}>
      <Image src="/brand/mark.svg" alt="TebTally™ logo" width={28} height={28} priority />
      <span style={{ fontWeight: 700, letterSpacing: '.2px' }}>TebTally™</span>
    </Link>
  )
}
