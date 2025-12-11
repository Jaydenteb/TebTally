import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, guides, and insights for Australian primary teachers using classroom technology.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <section className="blog-page">
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Tips, guides, and insights for Australian primary teachers</p>
      </div>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-card">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className="blog-card-meta">
                <Calendar size={14} />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
