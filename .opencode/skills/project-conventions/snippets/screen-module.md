# Screen Module Snippet

## Directory Structure

```
screens/<name>/
  index.ts
  <Name>Page.tsx
  sections/
    <SectionName>.tsx
```

## Files

### `index.ts`

```tsx
export { PageName } from "./<Name>Page"
```

### `<Name>Page.tsx`

```tsx
import { SectionOne } from "./sections/SectionOne"
import { SectionTwo } from "./sections/SectionTwo"

export function PageName() {
  return (
    <main>
      <SectionOne />
      <SectionTwo />
    </main>
  )
}
```

### `sections/SectionName.tsx`

```tsx
import { AccentText } from "@/shared/ui/primitives/AccentText"
import { useFeature } from "@/features/<name>/<name>.use<Name>"

export function SectionName() {
  const { data, isLoading } = useFeature()

  return (
    <section className="section">
      <h2 className="section-title">
        Title <AccentText as="span">Highlight</AccentText>
      </h2>
      <div>
        {/* render data */}
      </div>
    </section>
  )
}
```
