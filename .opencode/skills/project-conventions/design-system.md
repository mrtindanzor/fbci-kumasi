# Design System

> See snippets/component.md for component templates.

## Styling Approach

Tailwind CSS v4 with utility-first styling. No CSS modules or CSS-in-JS.

### Global CSS Structure

```css
/* routes/globals.css */
@import "tailwindcss"
@import "tw-animate-css"

@custom-variant dark (&:is(.dark *))

:root {
  --color-muted: oklch(...);
  --color-accent: oklch(...);
}

@theme inline {
  --color-muted: var(--color-muted);
}

@layer base { /* Element defaults */ }
@layer utilities { /* Custom utility classes */ }
@layer components { /* Reusable component classes */ }
```

## cn() Utility

All components use `cn()` for className merging:

```tsx
import { cn } from "@/shared/utils/cn"

function Component({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("base-classes", className)} {...props} />
}
```

## CVA (Class Variance Authority)

Components with multiple visual variants use CVA:

```tsx
import { cva } from "class-variance-authority"

const componentVariants = cva("base-styles", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      outline: "bg-transparent border",
    },
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
})
```

### ExtractVariantsTypes Utility

```tsx
import type { ExtractVariantsTypes } from "@/shared/types/utils/ExtractVariants"

type ComponentVariants = ExtractVariantsTypes<typeof componentVariants>
```

Always use `ExtractVariantsTypes` instead of manually duplicating variant types.

## Component Types

### Simple Component

```tsx
function SimpleComponent({ label, className, children, ...props }: SimpleComponentProps) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      <span>{label}</span>
      {children}
    </div>
  )
}
```

### Compound Component Pattern

```tsx
export const Label = { Wrapper, ButtonWrapper, Title }
```

### Polymorphic Component

```tsx
export function AccentText<T extends React.ElementType = "i">({
  as: Tag = "i",
  children,
  className,
  ...props
}: TextProps<T>) {
  return <Tag className={cn("text-accent", className)} {...props}>{children}</Tag>
}
```

## Button System

Buttons are mandatory reusable primitives. The application must never create page-specific or feature-specific button components.

```
src/shared/ui/primitives/button/
├── Button.tsx
├── ButtonLink.tsx
├── ButtonPO.tsx
├── constants.ts     -- Shared variants (variant, hover, rad, pad, x, y, w)
├── types.ts
└── index.ts
```

## Modal System

### Architecture

```
ModalProvider → ModalTarget → ModalCore → Modal.Root
  → Modal.Header / Modal.HeaderWithCloseButton
  → Modal.Body
  → Modal.Footer
```

### Hook-Controlled

```tsx
function useModalControls(props: {
  variant?: "thumb" | "button" | "dynamic"
  defaultOpen?: boolean
}): { open, close, toggle, isOpen }
```

## Dropdown System

Compound component with click-away detection:

```tsx
const Dropdown = {
  Wrapper,            // Context + autoHide ref tracking
  WrapperButton,      // Open/close toggle
  ListWrapper,        // Animated panel (FramerAnimatePosition)
  DropdownButton,     // List item button
  DropdownButtonLink, // List item link
}
```

## Carousel System

### Engine Hook

```tsx
function useScrollElement<T>({
  items, rightLoop, leftLoop, autoScroll,
}): { updatedItems, currentIndex, scrollLeft, scrollRight, ref }
```

## Reusable Components Are Workflow-Unaware

UI components never know which workflow they participate in. They receive data and callbacks via props. They do not import services, validators, or workflow hooks.

**Why:** This keeps components testable and reusable. A `Button` should not care whether it submits a create form or an edit form — it receives `onClick` and renders. An `Input` does not know what field it represents — it receives `value` and `onChange`.

## Component Library Inventory

### Primitives

| Component | Description |
|---|---|
| `Button` | CVA-styled button |
| `Input` | Text input with base styling |
| `Textarea` | Textarea with base styling |
| `Label` | Compound component |
| `Spinner` | Loading spinner |
| `LoadingSwap` | Toggles between content and spinner |
| `WithSkeleton` | Placeholder loading state |
| `Visibility` | Conditional renderer |
| `ErrorCard` | Error/success messages |
| `MImage` | Lazy-loaded image |
| `Backdrop` | Fullscreen overlay |

### Composite Systems

| System | Description |
|---|---|
| `Modal` | Provider → Portal → Core → Root/Body/Header/Footer |
| `Dropdown` | Compound with auto-hide, animated panel |
| `Carousel` | Scroll engine + BannerSlider/ImagesSlider |
| `Prompt` | Confirmation dialogs with ModalCore |
| `Framer` | Animation abstraction |

## Animation

### Framer Motion Abstraction

Never use Framer Motion's `motion` primitives directly in feature/screen code. Use the abstraction:

```tsx
import { FramerAnimatePosition, motionVariants } from "@/shared/ui/Framer"

const variants = motionVariants({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
})

<FramerAnimatePosition variants={variants} viewport={{ once: true }}>
  <Content />
</FramerAnimatePosition>
```

## Design Token Naming

Color tokens use semantic names, not literal color names:

```css
--color-muted              /* Background surface */
--color-neutral            /* Primary text */
--color-accent             /* Primary accent/action color */
--color-danger             /* Error/destructive */
--color-success            /* Success/confirmation */
```
