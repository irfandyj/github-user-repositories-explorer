import './App.css'
import { Card, CardContent } from './components/ui/card'
import { FieldSet, FieldLegend } from './components/ui/field'
import { useRequest } from 'alova/client';
import Apis from './api/github'
import SearchUserForm from './components/molecules/SearchUserForm'
import { searchUserFormSchema } from './components/molecules/SearchUserForm/SearchUserForm.schema'
import * as z from 'zod'

function searchGitHubUser(username: string) {
  return Apis.search.searchUsers({
    params: {
      q: username,
    }
  })
}

function App() {
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
    <>
      <div className="flex justify-center items-center h-screen w-screen p-4">
        <Card className="w-full max-h-10/12 max-w-md overflow-hidden">
          <CardContent>
            <FieldSet>
              <FieldLegend>GitHub User Repositories Explorer</FieldLegend>
              <SearchUserForm loading={loading} onSubmit={onSubmit} />
            </FieldSet>

            <div className='mt-4 size-full'>
              {data.items.length > 0 && (
                <ul className="list-disc list-inside">
                  {data.items.map((user) => (
                    <li key={user.id}>{user.login}</li>
                  ))}
                </ul>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default App
