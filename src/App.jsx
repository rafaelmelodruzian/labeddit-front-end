import GlobalState from "./global/globalState"
import Router from './routes/router'

function App() {

  return (
    <>
      <GlobalState>
          <Router />
      </GlobalState>
    </>
  )
}

export default App
