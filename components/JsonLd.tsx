/**
 * Renders a JSON-LD <script> block for structured data.
 * This is a server component — never import from "use client" files.
 * Place it directly in page.tsx or layout.tsx server components.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
