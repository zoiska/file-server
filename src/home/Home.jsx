import React from "react"
import Header from "../header/Header"
import DropArea from "./DropArea"
import FileTable from "./FileTable"
import { FileProvider } from "../contexts/FileContext"

function Home() {
  return (
    <FileProvider>
      <Header showButton={true}/>
      <DropArea/>
      <FileTable/>
    </FileProvider>
  )
}

export default Home