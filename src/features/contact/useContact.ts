import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { ContactType } from "./contact.contract.types"
import { contactFormValidator } from "./contact.validators"

export function useContact() {
	const { register, handleSubmit, formState } = useForm<ContactType>({
		resolver: zodResolver(contactFormValidator),
	})

	const onSubmit = handleSubmit((data) => {
		console.log(data)
	})

	return { onSubmit, register, formState }
}
