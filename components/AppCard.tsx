type Props = {
  title: string
  description: string
  href: string
}

export default function AppCard({ title, description, href }: Props) {
  return (
    <a className="card" href={href} target="_blank" rel="noreferrer">
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  )
}
