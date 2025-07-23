import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primaryAccent border border-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]',
        destructive:
          'bg-destructive text-primaryAccent border border-destructive hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'border border-accent bg-background text-primary hover:bg-accent hover:border-brand/30 hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-accent text-primary border border-accent hover:bg-accent/80 hover:border-brand/30 hover:scale-[1.02] active:scale-[0.98]',
        ghost:
          'hover:bg-accent hover:text-primary hover:scale-[1.02] active:scale-[0.98]',
        link: 'text-brand underline-offset-4 hover:underline hover:text-brand/80'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded px-3 text-xs',
        lg: 'h-10 rounded px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
