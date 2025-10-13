
import './App.css'
import { Card, CardContent } from './components/ui/card'
import { Field, FieldLabel, FieldError, FieldGroup, FieldSet, FieldLegend } from './components/ui/field'
import { InputGroup, InputGroupInput, InputGroupAddon } from './components/ui/input-group'
import { Search } from 'lucide-react'

function App() {

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent>

            <FieldSet>
              <FieldLegend>GitHub User Repositories Explorer</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="search" className="sr-only">Search</FieldLabel>
                  <InputGroup className="border-border bg-background">
                    <InputGroupInput id="search" placeholder="Search..." />
                    <InputGroupAddon>
                      <Search />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </FieldSet>

          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default App
