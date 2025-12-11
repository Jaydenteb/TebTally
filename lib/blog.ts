import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  publishedAt: string
}

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
  // Return empty array if blog directory doesn't exist yet
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  const posts = files.map(file => {
    const filePath = path.join(BLOG_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug: data.slug || file.replace('.mdx', ''),
      title: data.title || 'Untitled',
      description: data.description || '',
      publishedAt: data.publishedAt || new Date().toISOString(),
    }
  })

  // Sort by date, newest first
  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(BLOG_DIR)) {
    return null
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const postSlug = data.slug || file.replace('.mdx', '')

    if (postSlug === slug) {
      return {
        slug: postSlug,
        title: data.title || 'Untitled',
        description: data.description || '',
        publishedAt: data.publishedAt || new Date().toISOString(),
        content,
      }
    }
  }

  return null
}

export async function getAllSlugs(): Promise<string[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  return files.map(file => {
    const filePath = path.join(BLOG_DIR, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)
    return data.slug || file.replace('.mdx', '')
  })
}
