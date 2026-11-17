import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogHeader from '../BlogHeader';
import PostBody from '../PostBody';
import { formatDate, getPost, posts } from '../posts';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      images: post.images?.map(image => ({ url: image.src, alt: image.alt })),
    },
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-24 md:px-8">
        <Link href="/blog" className="hover:text-primary-400 text-sm text-gray-400">
          ← All posts
        </Link>
        <article className="mt-6">
          <time dateTime={post.date} className="text-sm text-gray-400">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-2 mb-10 text-3xl leading-tight md:text-5xl">{post.title}</h1>
          <PostBody body={post.body} />
          {post.images && (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {post.images.map(image => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1200}
                  className="w-full rounded-xl border border-white/10"
                />
              ))}
            </div>
          )}
          {post.links && (
            <ul className="mt-10 space-y-2 border-t border-white/10 pt-6 text-gray-300">
              {post.links.map(link => (
                <li key={link.href}>
                  {link.label}:{' '}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 underline underline-offset-2"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-400">
            Originally posted on{' '}
            <a
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 underline underline-offset-2"
            >
              LinkedIn
            </a>
            .
          </p>
        </article>
      </main>
    </>
  );
}
