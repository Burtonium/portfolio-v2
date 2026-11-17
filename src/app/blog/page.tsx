import type { Metadata } from 'next';
import Link from 'next/link';
import BlogHeader from './BlogHeader';
import { formatDate, posts } from './posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes from 10+ years of building web and web3 applications: testing AI-written code, blockchain internals, and lessons from the job.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  return (
    <>
      <BlogHeader />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-24 md:px-8">
        <h1 className="mb-3 text-4xl md:text-5xl">Blog</h1>
        <p className="mb-12 text-gray-300">
          Things I&apos;ve learned building web and web3 apps, mostly the hard way.
        </p>
        <ol className="space-y-6">
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="frosted-glass-dark hover:border-primary-400/60 block rounded-xl border border-white/10 p-6 transition-colors"
              >
                <time dateTime={post.date} className="text-sm text-gray-400">
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1 text-2xl leading-tight text-white">{post.title}</h2>
                <p className="mt-2 text-gray-300">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
