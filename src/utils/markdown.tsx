import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-legal-text">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-bold mb-2 text-legal-text">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-bold mb-2 text-legal-text">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="mb-1">{children}</li>,
        code: ({ children }) => (
          <code className="bg-legal-surface px-2 py-1 rounded text-legal-text">{children}</code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}