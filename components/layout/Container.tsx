import { cn } from "@/lib/utils"

export function Container({ className, children, as: Component = 'div' }: { className?: string; children: React.ReactNode; as?: React.ElementType }) {
  return (
    <Component className={cn("max-w-[1280px] mx-auto px-6 md:px-12 w-full", className)}>
      {children}
    </Component>
  )
}
