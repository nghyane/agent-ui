import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded border border-accent bg-background px-3 py-2 text-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-inter',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = 'TextArea'

export { TextArea }
