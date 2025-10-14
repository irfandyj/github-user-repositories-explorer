import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Loader2, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton";

type SearchUserAccordionProps = {
  users: {
    id: number
    login: string
    avatar_url: string
    html_url: string
  }[] | undefined,
  usersLoading: boolean,
  dataLoading: boolean,
  data: {
    id: number
    name: string
    html_url: string
    description: string | null
    stargazers_count?: number
  }[],
  send: (username: string) => void,
}

export default function SearchUserAccordion(
  { users, usersLoading, dataLoading, data, send }: SearchUserAccordionProps
) {

  function onAccordionTriggerClick(username: string) {
    send(username)
  }

  if (usersLoading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex gap-2 py-4 px-6 border-t"
            data-testid="search-user-accordion-skeleton"
          >
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="flex-1" />
          </div>
        ))}
      </div>
    )
  }

  switch (typeof users) {
    case 'undefined':
      return <div data-testid="search-user-accordion"></div>
    default:
      if (users!.length === 0) {
        return (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Users />
              </EmptyMedia>
              <EmptyTitle>No data</EmptyTitle>
              <EmptyDescription>No data found</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )
      }
      return (
        <Accordion type="single" collapsible data-testid="search-user-accordion">
          {users!.map((user) => (
            <AccordionItem key={user.id} value={user.id.toString()} data-testid="SearchUserAccordion__accordion-item">
              <AccordionTrigger
                className="flex items-center gap-2 px-6"
                onClick={(e) => {
                  const isOpen = e.currentTarget.getAttribute('data-state') !== 'open'
                  if (isOpen) {
                    onAccordionTriggerClick(user.login)
                  }
                }}
              >
                <Avatar
                  className="SearchUserAccordion__accordion-trigger-avatar"
                  data-testid="user-avatar"
                >
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
                {dataLoading ?
                  <Loader2 className="animate-spin" data-testid="SearchUserAccordion__data-loader" /> : (
                    <div className="flex flex-col gap-2">
                      {data.length > 0 ?
                        data.map((repo) => (
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
      );
  }
}