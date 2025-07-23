import { type FC } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'

import { type MarkdownRendererProps } from './types'
import { inlineComponents } from './inlineStyles'
import { components } from './styles'

const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  classname,
  inline = false
}) => (
  <ReactMarkdown
    className={cn(
      'prose max-w-none font-inter text-base leading-relaxed',
      'prose-headings:font-inter prose-headings:font-semibold prose-headings:text-primary prose-headings:text-lg',
      'prose-p:font-inter prose-p:text-base prose-p:leading-relaxed prose-p:text-primary',
      'prose-strong:font-inter prose-strong:font-semibold prose-strong:text-primary',
      'prose-em:font-inter prose-em:italic prose-em:text-primary',
      'prose-code:font-inter prose-code:bg-accent/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
      'prose-pre:font-inter prose-pre:bg-accent/20 prose-pre:p-3 prose-pre:rounded-lg prose-pre:overflow-x-auto',
      'prose-blockquote:font-inter prose-blockquote:border-l-2 prose-blockquote:border-brand/20 prose-blockquote:pl-3 prose-blockquote:italic',
      'prose-ul:font-inter prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted',
      'prose-a:font-inter prose-a:text-brand prose-a:underline prose-a:underline-offset-2',
      'prose-table:font-inter prose-table:border-collapse prose-table:w-full',
      'prose-th:font-inter prose-th:border prose-th:border-accent/30 prose-th:p-2 prose-th:text-left prose-th:font-semibold',
      'prose-td:font-inter prose-td:border prose-td:border-accent/30 prose-td:p-2',
      classname
    )}
    components={{ ...(inline ? inlineComponents : components) }}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw, rehypeSanitize]}
  >
    {children}
  </ReactMarkdown>
)

export default MarkdownRenderer
