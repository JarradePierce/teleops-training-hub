import { useEffect, useState } from 'react'
import { browserRouter, route, routes } from "react-router-dom"
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

function App() {
  const [trainings, setTrainings] = useState<Training[]>([])

  useEffect(() => {
    async function loadTrainings(){
      const response = await fetch("http://localhost:3000/api/trainings")

      const data = (await response.json()) as Training[]
      setTraining(data)
      console.log(data)
    }
    loadTrainings()
  })

  return (
    <h1>TeleOps Training Hub</h1>

    <section>
      {trainings.map((training) => (
        <h1>title: {training.title} </h1>
        <h2>description: {training.description} </h2>
        <p>feedback: {training.feedback} </p>
      ))}
    </section>
  )
}

export default App
