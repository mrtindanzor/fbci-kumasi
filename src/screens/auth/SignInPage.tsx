import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useSignin } from "@/features/auth"
import { loginValidator } from "@/features/auth/auth.validators"
import { routes } from "@/shared/routes"
import { Button, Link } from "@/shared/ui/primitives/button"
import { FieldError } from "@/shared/ui/primitives/FieldError"
import { Input } from "@/shared/ui/primitives/Input"
import { Label } from "@/shared/ui/primitives/Label"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { AuthDecorativePanel, AuthFormPanel, AuthLayout } from "./shared"
import { PasswordInput } from "./shared/PasswordInput"

export function SignInPage() {
	const { register, formState, onSubmit } = useSignin({
		resolver: zodResolver(loginValidator),
	})

	return (
		<AuthLayout>
			<AuthFormPanel>
				<div className="space-y-2 text-center">
					<h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg font-bold tracking-tight text-on-surface">
						Sign In
					</h1>
					<p className="text-body-md text-on-surface-variant">
						Enter your credentials to access your account
					</p>
				</div>

				<form onSubmit={onSubmit} className="space-y-4" noValidate>
					{formState.errors.root && (
						<p className="rounded-xl bg-error-container p-3 text-sm text-on-error-container">
							{formState.errors.root.message}
						</p>
					)}

					<div className="space-y-1">
						<Label htmlFor="username">Username</Label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-on-surface-variant" />
							<Input
								id="username"
								placeholder="Enter your username"
								className="pl-10"
								{...register("username")}
							/>
						</div>
						<FieldError message={formState.errors.username?.message} />
					</div>

					<div className="space-y-1">
						<Label htmlFor="password">Password</Label>
						<PasswordInput
							id="password"
							placeholder="Enter your password"
							{...register("password")}
						/>
						<FieldError message={formState.errors.password?.message} />
					</div>

					<Link
						href={routes.auth.forgotPassword}
						variant="ghost"
						size="none"
						className="underline underline-offset-4 text-sm font-medium text-primary hover:underline"
					>
						Forgot Password?
					</Link>

					<Button
						type="submit"
						variant="primary"
						size="lg"
						disabled={formState.isSubmitting}
						className="w-full"
					>
						{formState.isSubmitting && <Spinner className="mr-2" />}
						Sign In
					</Button>
				</form>
			</AuthFormPanel>

			<AuthDecorativePanel imageSrc="/images/church-side-1.avif" />
		</AuthLayout>
	)
}
