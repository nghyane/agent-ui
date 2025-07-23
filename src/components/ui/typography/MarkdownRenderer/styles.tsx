'use client'

import { FC, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import type {
  UnorderedListProps,
  OrderedListProps,
  EmphasizedTextProps,
  ItalicTextProps,
  StrongTextProps,
  BoldTextProps,
  DeletedTextProps,
  UnderlinedTextProps,
  HorizontalRuleProps,
  BlockquoteProps,
  AnchorLinkProps,
  HeadingProps,
  ImgProps,
  ParagraphProps,
  TableHeaderCellProps,
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  PreparedTextProps
} from './types'

const filterProps = (props: object) => {
  const newProps = { ...props }

  if ('node' in newProps) {
    delete newProps.node
  }

  return newProps
}

const UnorderedList = ({ className, ...props }: UnorderedListProps) => (
  <ul
    className={cn(
      className,
      'flex list-disc flex-col gap-2 pl-6 font-inter text-base leading-relaxed'
    )}
    {...filterProps(props)}
  />
)

const OrderedList = ({ className, ...props }: OrderedListProps) => (
  <ol
    className={cn(
      className,
      'flex list-decimal flex-col gap-2 pl-6 font-inter text-base leading-relaxed'
    )}
    {...filterProps(props)}
  />
)

const Paragraph = ({ className, ...props }: ParagraphProps) => (
  <div
    className={cn(
      className,
      'font-inter text-base leading-relaxed text-primary'
    )}
    {...filterProps(props)}
  />
)

const EmphasizedText = ({ className, ...props }: EmphasizedTextProps) => (
  <em
    className={cn(className, 'font-inter text-base font-semibold italic')}
    {...filterProps(props)}
  />
)

const ItalicText = ({ className, ...props }: ItalicTextProps) => (
  <i
    className={cn(className, 'font-inter text-base italic leading-relaxed')}
    {...filterProps(props)}
  />
)

const StrongText = ({ className, ...props }: StrongTextProps) => (
  <strong
    className={cn(className, 'font-inter text-base font-semibold')}
    {...filterProps(props)}
  />
)

const BoldText = ({ className, ...props }: BoldTextProps) => (
  <b
    className={cn(className, 'font-inter text-base font-semibold')}
    {...filterProps(props)}
  />
)

const UnderlinedText = ({ className, ...props }: UnderlinedTextProps) => (
  <u
    className={cn(className, 'font-inter text-base leading-relaxed underline')}
    {...filterProps(props)}
  />
)

const DeletedText = ({ className, ...props }: DeletedTextProps) => (
  <del
    className={cn(
      className,
      'font-inter text-base leading-relaxed text-muted line-through'
    )}
    {...filterProps(props)}
  />
)

const HorizontalRule = ({ className, ...props }: HorizontalRuleProps) => (
  <hr
    className={cn(className, 'mx-auto my-6 w-48 border-b border-accent')}
    {...filterProps(props)}
  />
)

const InlineCode: FC<PreparedTextProps> = ({ children }) => {
  return (
    <code className="relative whitespace-pre-wrap rounded bg-accent px-1.5 py-0.5 font-inter font-mono text-sm">
      {children}
    </code>
  )
}

const Blockquote = ({ className, ...props }: BlockquoteProps) => (
  <blockquote
    className={cn(
      className,
      'my-4 border-l-4 border-brand/30 pl-4 font-inter text-base italic leading-relaxed'
    )}
    {...filterProps(props)}
  />
)

const AnchorLink = ({ className, ...props }: AnchorLinkProps) => (
  <a
    className={cn(
      className,
      'cursor-pointer font-inter text-brand underline underline-offset-2'
    )}
    target="_blank"
    rel="noopener noreferrer"
    {...filterProps(props)}
  />
)

const Heading1 = ({ className, ...props }: HeadingProps) => (
  <h1
    className={cn(className, 'mb-4 font-inter text-2xl font-bold text-primary')}
    {...filterProps(props)}
  />
)

const Heading2 = ({ className, ...props }: HeadingProps) => (
  <h2
    className={cn(className, 'mb-3 font-inter text-xl font-bold text-primary')}
    {...filterProps(props)}
  />
)

const Heading3 = ({ className, ...props }: HeadingProps) => (
  <h3
    className={cn(
      className,
      'mb-3 font-inter text-lg font-semibold text-primary'
    )}
    {...filterProps(props)}
  />
)

const Heading4 = ({ className, ...props }: HeadingProps) => (
  <h4
    className={cn(
      className,
      'mb-2 font-inter text-base font-semibold text-primary'
    )}
    {...filterProps(props)}
  />
)

const Heading5 = ({ className, ...props }: HeadingProps) => (
  <h5
    className={cn(
      className,
      'mb-2 font-inter text-sm font-semibold text-primary'
    )}
    {...filterProps(props)}
  />
)

const Heading6 = ({ className, ...props }: HeadingProps) => (
  <h6
    className={cn(
      className,
      'mb-2 font-inter text-xs font-semibold text-primary'
    )}
    {...filterProps(props)}
  />
)

const Img = ({ src, alt }: ImgProps) => {
  const [error, setError] = useState(false)

  if (!src || typeof src !== 'string') return null

  return (
    <div className="my-4 w-full max-w-xl">
      {error ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg bg-accent text-muted">
          <Paragraph className="text-primary">Image unavailable</Paragraph>
          <Link
            href={src}
            target="_blank"
            className="max-w-md truncate text-brand underline"
          >
            {src}
          </Link>
        </div>
      ) : (
        <Image
          src={src}
          width={1280}
          height={720}
          alt={alt ?? 'Rendered image'}
          className="size-full rounded-lg object-cover"
          onError={() => setError(true)}
          unoptimized
        />
      )}
    </div>
  )
}

const Table = ({ className, ...props }: TableProps) => (
  <div className="my-4 w-full max-w-[560px] overflow-hidden rounded-lg border border-accent">
    <div className="w-full overflow-x-auto">
      <table className={cn(className, 'w-full')} {...filterProps(props)} />
    </div>
  </div>
)

const TableHead = ({ className, ...props }: TableHeaderProps) => (
  <thead
    className={cn(
      className,
      'rounded-lg border-b border-accent bg-accent/50 p-2 text-left font-inter text-sm font-semibold'
    )}
    {...filterProps(props)}
  />
)

const TableHeadCell = ({ className, ...props }: TableHeaderCellProps) => (
  <th
    className={cn(className, 'p-2 font-inter text-sm font-semibold')}
    {...filterProps(props)}
  />
)

const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody
    className={cn(className, 'font-inter text-sm')}
    {...filterProps(props)}
  />
)

const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    className={cn(className, 'border-b border-accent last:border-b-0')}
    {...filterProps(props)}
  />
)

const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    className={cn(className, 'whitespace-nowrap p-2 font-inter')}
    {...filterProps(props)}
  />
)

export const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  ul: UnorderedList,
  ol: OrderedList,
  em: EmphasizedText,
  i: ItalicText,
  strong: StrongText,
  b: BoldText,
  u: UnderlinedText,
  del: DeletedText,
  hr: HorizontalRule,
  blockquote: Blockquote,
  code: InlineCode,
  a: AnchorLink,
  img: Img,
  p: Paragraph,
  table: Table,
  thead: TableHead,
  th: TableHeadCell,
  tbody: TableBody,
  tr: TableRow,
  td: TableCell
}
