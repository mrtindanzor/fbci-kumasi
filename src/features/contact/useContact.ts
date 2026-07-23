import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { type UseFormProps, useForm } from "react-hook-form"
import type { ContactType } from "./contact.contract.types"
import { useContactService } from "./contact.useContactService"
import { contactFormValidator } from "./contact.validators"

export function useContact(props?: UseFormProps<ContactType>) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { register, handleSubmit, formState, setValue, reset, setError } =
    useForm<ContactType>({
      ...props,
      resolver: zodResolver(contactFormValidator),
    })
  const contactService = useContactService()

  const onSubmit = handleSubmit(async (data) => {
    setSuccessMessage(null)

    const { error, message } = await contactService.create(data)
    if (error) return setError("root", { message })

    reset({
      message: "",
      name: "",
      phone: "",
      email: "",
    })
    setSuccessMessage(message)
  })

  return { onSubmit, register, formState, setValue, successMessage }
}
