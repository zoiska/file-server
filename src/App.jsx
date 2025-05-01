import React from "react"
import Header from "./mainPage/Header"
import DropArea from "./mainPage/DropArea"
import FileTable from "./mainPage/FileTable"
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