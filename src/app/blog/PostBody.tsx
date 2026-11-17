import { Fragment, type ReactNode } from 'react';

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

function linkify(text: string): ReactNode[] {
  return text.split(URL_PATTERN).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-400 break-all underline underline-offset-2"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export default function PostBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-5 text-base leading-relaxed text-gray-200 md:text-lg">
      {blocks.map((block, i) => {
        const lines = block.split('\n');

        if (lines.every(line => /^- /.test(line))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6">
              {lines.map((line, j) => (
                <li key={j}>{linkify(line.replace(/^- /, ''))}</li>
              ))}
            </ul>
          );
        }

        if (lines.every(line => /^\d+\. /.test(line))) {
          return (
            <ol key={i} className="list-decimal space-y-2 pl-6">
              {lines.map((line, j) => (
                <li key={j}>{linkify(line.replace(/^\d+\. /, ''))}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={i}>
            {lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {linkify(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
