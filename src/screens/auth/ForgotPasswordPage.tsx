import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CheckCircle, Mail } from "lucide-react"
import {
  forgotPasswordValidator,
  useRequestPasswordReset,
} from "@/features/auth"
import { routes } from "@/shared/routes"
import { Button, Link } from "@/shared/ui/primitives/button"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Input } from "@/shared/ui/primitives/Input"
import { Label } from "@/shared/ui/primitives/Label"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { AuthDecorativePanel, AuthFormPanel, AuthLayout } from "./shared"

export function ForgotPasswordPage() {
  const { register, formState, onSubmit } = useRequestPasswordReset({
    resolver: zodResolver(forgotPasswordValidator),
  })

  return (
    <AuthLayout>
      <AuthFormPanel>
        <div className="space-y-2 text-center">
          <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg font-bold tracking-tight text-on-surface">
            Forgot Password?
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Enter your email and we'll send you a reset link
          </p>
        </div>
        {formState.isSubmitSuccessful && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-title-lg font-medium text-on-surface">
                Email Sent!
              </h2>
              <p className="text-body-md text-on-surface-variant">
                We've sent a password reset link to your email address.
              </p>
            </div>
          </div>
        )}

        {!formState.isSubmitSuccessful && (
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {formState.errors.root && (
              <div className="rounded-xl bg-error-container p-3 text-sm text-on-error-container">
                {formState.errors.root.message}
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-on-surface-variant" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  {...register("email")}
                />
              </div>
              <FieldError message={formState.errors.email?.message} />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={formState.isSubmitting}
              className="w-full"
            >
              {formState.isSubmitting && <Spinner className="mr-2" />}
              Send Reset Link
            </Button>
          </form>
        )}
        <div className="text-center">
          <Link
            href={routes.auth.login}
            variant="ghost"
            size="none"
            className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-on-surface"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </div>
      </AuthFormPanel>

      <AuthDecorativePanel imageSrc="/images/church-side-3.avif" />
    </AuthLayout>
  )
}
