import './App.css'
import SearchUserCard from './components/organisms/SearchUserCard'


function App() {

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen p-4">
        <SearchUserCard className="max-h-10/12" />
      </div>
    </>
  )
}

export default App
