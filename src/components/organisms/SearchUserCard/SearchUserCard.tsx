import SearchUserForm from "@/components/molecules/SearchUserForm";
import type { searchUserFormSchema } from "@/components/molecules/SearchUserForm/SearchUserForm.schema";
import Apis from "@/api/github";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRequest } from "alova/client";
import * as z from 'zod';
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import useResponsiveParentHeight from "@/hooks/useResponsiveParentHeight";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Loader2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function searchGitHubUser(username: string) {
  return Apis.search.searchUsers({
    params: {
      q: username,
    }
  })
}

function getReposByUser(username: string) {
  return Apis.repos.reposListForUser({
    pathParams: {
      username,
    },
    params: {
      per_page: 100,
      page: 1
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

  const {
    loading: getReposByUserLoading,
    data: getReposByUserResponse,
    send: getReposByUserSend,
  } = useRequest(getReposByUser, {
    immediate: false,
    initialData: [],
  })

  const displayedUsers = useMemo(() => {
    return searchUserResponse.items.slice(0, 5)
  }, [searchUserResponse.items])

  function onSubmit(data: z.infer<typeof searchUserFormSchema>) {
    searchUserSend(data.username)
  }

  function onAccordionTriggerClick(username: string) {
    getReposByUserSend(username)
  }

  return (
    <Card className={cn("w-full max-w-md overflow-hidden", className)}>
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
            <Accordion type="single" collapsible>
              {displayedUsers.map((user) => (
                <AccordionItem key={user.id} value={user.id.toString()}>
                  <AccordionTrigger
                    className="flex items-center gap-2 px-6"
                    onClick={(e) => {
                      const isOpen = e.currentTarget.getAttribute('data-state') !== 'open'
                      if (isOpen) {
                        onAccordionTriggerClick(user.login)
                      }
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>{user.login.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        text-muted-foreground
                        hover:underline
                        hover:text-primary
                        flex items-center gap-1
                        group
                      "
                    >
                      {user.login}
                      <ExternalLink
                        size={16}
                        className="hidden
                          group-hover:block group-hover:text-primary
                        "
                      />
                    </a>
                  </AccordionTrigger>
                  <AccordionContent className="px-6">
                    {getReposByUserLoading ?
                      <Loader2 className="animate-spin" /> : (
                        <div className="flex flex-col gap-2">
                          {getReposByUserResponse.length > 0 ?
                            getReposByUserResponse.map((repo) => (
                              <Card key={repo.id} className="flex flex-col gap-2">
                                <CardHeader className="flex justify-between items-center">
                                  <CardTitle>
                                    <a
                                      href={repo.html_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="
                                        text-muted-foreground
                                        hover:underline
                                        hover:text-primary
                                        flex items-center gap-1
                                        group
                                      "
                                    >
                                      {repo.name}

                                      <ExternalLink
                                        size={16}
                                        className="hidden
                                          group-hover:block group-hover:text-primary
                                        "
                                      />
                                    </a>
                                  </CardTitle>
                                  <Badge variant="secondary">
                                    {repo.stargazers_count}
                                    <Star size={16} />
                                  </Badge>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-muted-foreground">
                                    {repo.description}
                                  </p>
                                </CardContent>
                              </Card>
                            )) :
                            <div className="text-sm text-muted-foreground">No repositories found</div>}
                        </div>
                      )}
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