import { useForm } from "react-hook-form"
import { searchUserFormSchema } from "./SearchUserForm.schema"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputGroupAddon } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Loader2, Search } from "lucide-react"
import { FieldLabel } from "@/components/ui/field"

type SearchUserFormProps = {
  loading: boolean
  onSubmit: (data: z.infer<typeof searchUserFormSchema>) => void
}

export default function SearchUserForm({ onSubmit, loading }: SearchUserFormProps) {
  const form = useForm<z.infer<typeof searchUserFormSchema>>({
    resolver: zodResolver(searchUserFormSchema),
    defaultValues: {
      username: '',
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.username}>
          <FieldLabel htmlFor="search" className="sr-only">Search</FieldLabel>
          <InputGroup className="border-border bg-background">
            <InputGroupInput
              id="search"
              placeholder="Enter username"
              aria-invalid={!!form.formState.errors.username}
              className={form.formState.errors.username ? 'placeholder:text-destructive' : ''}
              {...form.register('username')}
            />
            <InputGroupAddon className={form.formState.errors.username ? 'text-destructive' : ''}>
              {loading ?
                <Loader2 className="animate-spin" /> :
                <Search />
              }
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[form.formState.errors.username]} />
        </Field>
      </FieldGroup>
      <Button
        type="submit"
        disabled={
          loading ||
          (form.formState.isSubmitted && !form.formState.isValid)
        }
        className="w-full">
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  )
}