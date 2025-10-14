import SearchUserForm from "@/components/molecules/SearchUserForm";
import type { searchUserFormSchema } from "@/components/molecules/SearchUserForm/SearchUserForm.schema";
import Apis from "@/api/github";
import { Card, CardContent } from "@/components/ui/card";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { useRequest } from "alova/client";
import * as z from 'zod';
import { cn } from "@/lib/utils";

function searchGitHubUser(username: string) {
  return Apis.search.searchUsers({
    params: {
      q: username,
    }
  })
}

type SearchUserCardProps = {
  className?: string
}

export default function SearchUserCard({ className }: SearchUserCardProps) {
  const {
    // submit status
    loading,

    // Responsive form data, the content is determined by initialForm
    data,

    // submit data function
    send,

    // update form item
    update,

    // Submit successful callback binding
    onSuccess,

    // Submit failure callback binding
    onError,

    // Submit completed callback binding
    onComplete
  } = useRequest(searchGitHubUser, {
    immediate: false,
    initialData: {
      incomplete_results: false,
      total_count: 0,
      items: [],
    },
  })

  function onSubmit(data: z.infer<typeof searchUserFormSchema>) {
    send(data.username)
  }

  return (
    <Card className={cn("w-full max-w-md overflow-hidden", className)}>
      <CardContent>
        <FieldSet>
          <FieldLegend>GitHub User Repositories Explorer</FieldLegend>
          <SearchUserForm loading={loading} onSubmit={onSubmit} />
        </FieldSet>

        {data.items.length > 0 && (
          <div className='mt-4 size-full'>
            <ul className="list-disc list-inside">
              {data.items.map((user) => (
                <li key={user.id}>{user.login}</li>
              ))}
            </ul>
          </div>
        )}

      </CardContent>
    </Card>
  )
}