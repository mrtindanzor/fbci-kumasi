export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-error text-sm  px-2 mt-1">{message}</p>
}
