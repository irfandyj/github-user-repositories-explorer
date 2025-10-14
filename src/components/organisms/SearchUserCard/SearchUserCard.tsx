import SearchUserForm from "@/components/molecules/SearchUserForm";
import type { searchUserFormSchema } from "@/components/molecules/SearchUserForm/SearchUserForm.schema";
import Apis from "@/api/github";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRequest } from "alova/client";
import * as z from 'zod';
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import useResponsiveParentHeight from "@/hooks/useResponsiveParentHeight";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const displayedUsers = useMemo(() => {
    return data.items.slice(0, 5)
  }, [data.items])

  function onSubmit(data: z.infer<typeof searchUserFormSchema>) {
    send(data.username)
  }

  return (
    <Card className={cn("w-full max-w-md overflow-hidden", className)}>
      <CardContent className="flex flex-col grow gap-4 px-0">
        <FieldSet className="px-6">
          <FieldLegend>GitHub User Repositories Explorer</FieldLegend>
          <SearchUserForm loading={loading} onSubmit={onSubmit} />
        </FieldSet>

        <div className="SearchUserCard__search-result flex-1">
          <ScrollArea
            ref={scrollAreaRef}
            className='px-6'
          >
            <Accordion type="single" collapsible>
              {displayedUsers.map((user) => (
                <AccordionItem key={user.id} value={user.id.toString()}>
                  <AccordionTrigger className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>{user.login.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-muted-foreground"
                    >
                      {user.login}
                    </a>
                  </AccordionTrigger>
                  <AccordionContent>
                    {user.html_url}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>

      </CardContent>
    </Card>
  )
}