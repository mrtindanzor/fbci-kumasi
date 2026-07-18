import { ArrowLeft, CheckCircle } from "lucide-react"
import { useResetPassword } from "@/features/auth/hooks/useResetPassword"
import { routes } from "@/shared/routes"
import { Button, Link } from "@/shared/ui/primitives/button"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Label } from "@/shared/ui/primitives/Label"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { AuthDecorativePanel, AuthFormPanel, AuthLayout } from "./shared"
import { PasswordInput } from "./shared/PasswordInput"

export function ResetPasswordPage() {
  const { register, formState, onSubmit } = useResetPassword()

  return (
    <AuthLayout>
      <AuthFormPanel>
        <div className="space-y-2 text-center">
          <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg font-bold tracking-tight text-on-surface">
            Reset Password
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Create a new password for your account
          </p>
        </div>

        {formState.isSubmitSuccessful && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-title-lg font-medium text-on-surface">
                Password Reset!
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Your password has been successfully reset.
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
              <Label htmlFor="password">New Password</Label>
              <PasswordInput
                id="password"
                placeholder="Enter new password"
                {...register("password")}
              />
              <FieldError message={formState.errors.password?.message} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              <FieldError message={formState.errors.confirmPassword?.message} />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={formState.isSubmitting}
              className="w-full"
            >
              {formState.isSubmitting && <Spinner className="mr-2" />}
              Reset Password
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

      <AuthDecorativePanel imageSrc="/images/church-side-1.avif" />
    </AuthLayout>
  )
}
