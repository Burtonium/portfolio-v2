import Link from 'next/link';

export default function BlogHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="hover:text-primary-400 text-lg font-medium text-white transition-colors duration-200"
        >
          Mathieu Bertin&apos;s Portfolio
        </Link>
        <Link
          href="/blog"
          className="hover:text-primary-400 px-3 py-2 text-sm font-medium text-white transition-colors duration-200"
        >
          Blog
        </Link>
      </div>
    </header>
  );
}
