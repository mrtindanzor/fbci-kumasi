import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, User } from "lucide-react"
import { useState } from "react"
import { useSignup } from "@/features/auth"
import { signupValidator } from "@/features/auth/auth.validators"
import { routes } from "@/shared/routes"
import { Button, Link } from "@/shared/ui/primitives/button"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Input } from "@/shared/ui/primitives/Input"
import { Label } from "@/shared/ui/primitives/Label"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { AuthDecorativePanel, AuthFormPanel, AuthLayout } from "./shared"
import { PasswordInput } from "./shared/PasswordInput"

const strengthColors = [
  "bg-error",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-primary",
  "bg-green-600",
]
const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"]

function getPasswordStrength(password: string): number {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

export function SignUpPage() {
  const { register, formState, onSubmit } = useSignup({
    resolver: zodResolver(signupValidator),
  })
  const [passwordValue, setPasswordValue] = useState("")
  const strength = getPasswordStrength(passwordValue)

  return (
    <AuthLayout>
      <AuthFormPanel>
        <div className="space-y-2 text-center">
          <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg font-bold tracking-tight text-on-surface">
            Create Account
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Join our community of faith
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {formState.errors.root && (
            <div className="rounded-xl bg-error-container p-3 text-sm text-on-error-container">
              {formState.errors.root.message}
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-on-surface-variant" />
              <Input
                id="name"
                placeholder="Enter your full name"
                className="pl-10"
                {...register("name")}
              />
            </div>
            <FieldError message={formState.errors.name?.message} />
          </div>

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

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Create a password"
              {...register("password", {
                onChange: (e) => setPasswordValue(e.target.value),
              })}
            />
            {passwordValue && <PasswordStrength strength={strength} />}
            <FieldError message={formState.errors.password?.message} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your password"
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
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link
            href={routes.auth.login}
            variant="ghost"
            size="none"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </AuthFormPanel>

      <AuthDecorativePanel imageSrc="/images/church-side-2.avif" />
    </AuthLayout>
  )
}

type PasswordStrengthProps = {
  strength: number
}
function PasswordStrength({ strength }: PasswordStrengthProps) {
  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {["very-weak", "weak", "fair", "strong"].map((level, i) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              i < strength ? strengthColors[strength] : "bg-outline-variant"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-on-surface-variant">
        Password strength:{" "}
        <span className="font-medium">{strengthLabels[strength]}</span>
      </p>
    </div>
  )
}
