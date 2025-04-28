import React from "react"
import Header from "./Header"
import DropArea from "./DropArea"
import FileTable from "./FileTable"
import { FileProvider } from "./contexts/FileContext"

function App() {
  return (
    <FileProvider>
      <Header/>
      <DropArea/>
      <FileTable/>
    </FileProvider>
  )
}

export default App

// T1 npm run dev (npm run dev -- --host)
// T2 node server.js