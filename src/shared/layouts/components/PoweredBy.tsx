import { ArrowUp } from "lucide-react"
import { Link } from "@/shared/ui/primitives/button"

export function PoweredBy() {
  return (
    <section className="font-sans my-4 mx-auto col-span-full w-fit flex gap-y-2 flex-col items-center">
      <h4 className="text-success text-sm">
        Powered By Tindanzor Software Solutions&reg;
      </h4>

      <p className="text-sm flex items-center">
        Reach out
        <br />
        <Link
          target="_blank"
          rel="noopener norefeerer"
          href="https://mrtindanzor.com/contact"
          variant="link"
          size="none"
          className="group ml-2"
        >
          mrtindanzor.com{" "}
          <ArrowUp className="rotate-45 stroke-1 size-5 animate-bounce group-hover:animate-none" />
        </Link>
      </p>
    </section>
  )
}
