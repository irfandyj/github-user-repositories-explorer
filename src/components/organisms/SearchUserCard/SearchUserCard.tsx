import SearchUserForm from "@/components/molecules/SearchUserForm";
import type { searchUserFormSchema } from "@/components/molecules/SearchUserForm/SearchUserForm.schema";
import Apis from "@/api/github";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { useRequest } from "alova/client";
import * as z from 'zod';
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import useResponsiveParentHeight from "@/hooks/useResponsiveParentHeight";
import SearchUserAccordion from "@/components/molecules/SearchUserAccordion";

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
  const { ref: scrollAreaRef } = useResponsiveParentHeight()
  const {
    // submit status
    loading: searchUserLoading,

    // Responsive form data, the content is determined by initialForm
    data: searchUserResponse,

    // submit data function
    send: searchUserSend,

  } = useRequest(searchGitHubUser, {
    immediate: false,
    initialData: {
      incomplete_results: false,
      total_count: 0,
      items: [],
    },
  })

  const displayedUsers = useMemo(() => {
    return searchUserResponse.items.slice(0, 5)
  }, [searchUserResponse.items])

  function onSubmit(data: z.infer<typeof searchUserFormSchema>) {
    searchUserSend(data.username)
  }

  return (
    <Card className={cn("w-full max-w-md overflow-hidden", className)} data-testid="search-user-card">
      <CardContent className="flex flex-col grow gap-4 px-0 min-h-0">
        <FieldSet className="px-6">
          <FieldLegend>GitHub User Repositories Explorer</FieldLegend>
          <SearchUserForm loading={searchUserLoading} onSubmit={onSubmit} />
        </FieldSet>

        <div className="SearchUserCard__search-result flex-1 border-t border-b min-h-0">
          <ScrollArea
            ref={scrollAreaRef}
            className="bg-background h-full"
          >
            <SearchUserAccordion users={displayedUsers} />
          </ScrollArea>
        </div>

      </CardContent>
    </Card>
  )
}