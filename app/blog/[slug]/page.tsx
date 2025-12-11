import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getAllSlugs } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft, Calendar } from 'lucide-react'
import { mdxComponents } from '@/components/MDXComponents'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="blog-post">
      <Link href="/blog" className="back-link-blog">
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <Calendar size={14} />
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      <div className="post-content">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  )
}
