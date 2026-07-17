import { zodResolver } from "@hookform/resolvers/zod"
import { type UseFormProps, useForm } from "react-hook-form"
import type { ContactType } from "./contact.contract.types"
import { contactFormValidator } from "./contact.validators"

export function useContact(props?: UseFormProps<ContactType>) {
	const { register, handleSubmit, formState, setValue } = useForm<ContactType>({
		...props,
		resolver: zodResolver(contactFormValidator),
	})

	const onSubmit = handleSubmit((data) => {
		console.log(data)
	})

	return { onSubmit, register, formState, setValue }
}
