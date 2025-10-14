import SearchUserForm from "@/components/molecules/SearchUserForm";
import type { searchUserFormSchema } from "@/components/molecules/SearchUserForm/SearchUserForm.schema";
import Apis from "@/api/github";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { useRequest } from "alova/client";
import * as z from 'zod';
import { cn } from "@/lib/utils";
import { useScrollAreaHeight } from "@/hooks/useScrollAreaHeight";

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

  } = useRequest(searchGitHubUser, {
    immediate: false,
    initialData: {
      incomplete_results: false,
      total_count: 0,
      items: [],
    },
  })

  const {
    ref: scrollAreaRef,
    height: scrollAreaHeight,
  } = useScrollAreaHeight({ bottomGap: 16 })

  function onSubmit(data: z.infer<typeof searchUserFormSchema>) {
    send(data.username)
  }

  return (
    <Card className={cn("w-full max-w-md overflow-hidden", className)}>
      <CardContent className="flex flex-col gap-4 px-0">
        <FieldSet className="px-6">
          <FieldLegend>GitHub User Repositories Explorer</FieldLegend>
          <SearchUserForm loading={loading} onSubmit={onSubmit} />
        </FieldSet>

        {data.items.length > 0 && (
          <ScrollArea
            ref={scrollAreaRef}
            className='px-6'
            style={{ height: scrollAreaHeight || undefined }}
          >
            <ul className="list-disc list-inside">
              {data.items.map((user) => (
                <li key={user.id}>{user.login}</li>
              ))}
            </ul>
          </ScrollArea>
        )}

      </CardContent>
    </Card>
  )
}