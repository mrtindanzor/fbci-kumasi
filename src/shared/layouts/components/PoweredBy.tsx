import { Link } from "@/shared/ui/primitives/button"

export function PoweredBy() {
  return (
    <div className="mt-6 pt-4 border-t border-white/10 text-center">
      <p className="text-xs text-white/40">
        Powered by{" "}
        <Link
          variant="link"
          size="none"
          href="https://mrtindanzor.com/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
        >
          Tindanzor Software Solutions&reg;
        </Link>
      </p>
    </div>
  )
}
