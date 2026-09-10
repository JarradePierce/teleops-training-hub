import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './App.css'
import CreateTrainingPage from './CreateTrainingPage'
import CreateAuditPage from './CreateAuditPage'
import AuditsPage from './AuditsPage'
import UsersPage from './UsersPage'


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
  <nav class="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active">
        <a href="http://localhost:5173/trainings">Trainings</a>
      </li>
      <li class="breadcrumb-item" >
        <a href="http://localhost:5173/audits">Audits</a>
      </li>
      <li class="breadcrumb-item" >
        <a href="http://localhost:5173/users">Users</a>
      </li>
    </ol>
  </nav>
  <button><a href="#">Create Training</a></button>
<h1>Fusion Center Training Hub</h1>
    <section>
      {trainingsData.map((training) => (
        <article class="card">
        <h1 class="card-title">title: {training.title} </h1>
        <p class="card-text">description: {training.description} </p>
        <p class="card-text">feedback: {training.feedback} </p>
          <nav>
            <ol> 
              <a class="card-link" href="">Training</a>
            </ol>
          </nav>
        </article>
      ))}
    </section>
  </main>
}


function App() {
  return(
  <Routes>
    <Route path="/trainings" element={<TrainingsPage />} />
    <Route path="/training/new" element={<CreateTrainingPage />} />
    <Route path="/audits" element={<AuditsPage />} />
    <Route path="/audit/new" element={<CreateAuditPage />} />
    <Route path="/users" element={<UsersPage />} />
  </Routes>
  )
}

export default App
