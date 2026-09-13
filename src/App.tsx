import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, NavLink, Link } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './App.css'
import CreateTrainingPage from './CreateTrainingPage'
import CreateAuditPage from './CreateAuditPage'
import AuditsPage from './AuditsPage'
import UsersPage from './UsersPage'
import UserPage from './UserPage'
import Navigation from './Navigation'


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
  const reverseTrainings = [...trainingsData].reverse()

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
  <div className="container page-container">

  <div className="container intro-info-container">
    <h1 className="heading-intro-text">TeleOps Trainings</h1>
    <p className="intro-text">Training on this page is for the TeleOps team only</p>
  </div>

    <div className="d-grid d-md-flex justify-content-md-start mt-3 new-audit-button-container">
      <NavLink to="/trainings/new" className="btn btn-outline-success create-audit-button">+ Create Training </NavLink>
    </div>

    <section>
      {reverseTrainings.map((training) => (
        <article class="card index-card">
          <h1 class="card-title index-card-title">title: {training.title} </h1>
          <p class="card-text">description: {training.description} </p>
        <div className="d-flex flex-wrap gap-3 me-auto">
          <p class="card-text card-meta-data-text">Date placeholder</p>
          <p class="vertical-divider">|</p>
          <p class="card-text card-meta-data-text">ZPT placeholder</p>
          <p class="vertical-divider">|</p>
          <p class="card-text card-meta-data-text">Training doc placeholder</p>
        </div>
        <p class="card-text">feedback: {training.feedback} </p>
          <div className="border-top mt-3 pt-3 d-flex justify-content-between">
            <Link to={`/trainings/${training.id}`} className="index-card-footer-links">
                View training →
            </Link>
          </div>
        </article>
      ))}
    </section>
    </div>
  </main>
}


function App() {
  return(
    <>
  <Navigation />

    <Routes>
      <Route path="/trainings" element={<TrainingsPage />} />
      <Route path="/training/new" element={<CreateTrainingPage />} />
      <Route path="/audits" element={<AuditsPage />} />
      <Route path="/audit/new" element={<CreateAuditPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserPage /> } />
    </Routes>
    </>
  )
}

export default App
