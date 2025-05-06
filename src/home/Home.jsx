import React from "react"
import Header from "./Header"
import DropArea from "./DropArea"
import FileTable from "./FileTable"
import { FileProvider } from "../contexts/FileContext"

function Home() {
  return (
    <FileProvider>
      <Header/>
      <DropArea/>
      <FileTable/>
    </FileProvider>
  )
}

export default Home