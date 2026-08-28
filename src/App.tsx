import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './App.css'


type Training = {
  id: number,
  title: string,
  description: string,
  feedback: string,
  audits: TrainingAudit[],
  links: TrainingLink[],
  videoLinks: TrainingVideoLink[]
  users: UserTraining[]
}

function TrainingsPage(){
  const [trainingsData, setTrainingsData] = useState<Training[]>([])

  useEffect(() => {
    async function loadTrainings(){
      const response = await fetch("http://localhost:3000/api/trainings")

      const data = (await response.json()) as Training[]
      setTrainingsData(data)
      console.log(data)
    }
    loadTrainings()
  })

return <main>
<h1>TeleOps Training Hub</h1>

    <section>
      {trainingsData.map((training) => (
        <article>
        <h1>title: {training.title} </h1>
        <h2>description: {training.description} </h2>
        <p>feedback: {training.feedback} </p>
        </article>
      ))}
    </section>
  </main>
}


function App() {
  return(
  <Routes>
    <Route path="/" element={<TrainingsPage />} />
  </Routes>
  )
}

export default App
