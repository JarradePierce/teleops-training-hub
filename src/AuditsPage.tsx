import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

function AuditsPage(){
    const navigate = useNavigate()
    const url = "http://localhost:3000/api/audits"

    const[auditsData, setAuditsData] = useState<Audit[]>([])

    useEffect(() => {
        async function loadAudits(){
            const response = await fetch(url)

            const auditsData = (await response.json()) as Audit[]
            setAuditsData(auditsData)
            console.log(auditsData)
        }
        loadAudits()
    })

    return <main>
        <nav class="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="http://localhost:5173/trainings">Trainings</a>
                </li>
                <li class="breadcrumb-item active" >
                    <a href="http://localhost:5173/audits">Audits</a>
                </li>
                <li class="breadcrumb-item" >
                    <a href="http://localhost:5173/users">Users</a>
                </li>
            </ol>
        </nav>
        <h1>TeleOps Audits</h1>

        <div>
            <button><a href="http://localhost:5173/audit/new">Create Audit </a></button>
        </div>

        <section>
            {auditsData.map((audit) => (
                <article class="card">
                    <h3 class="card-title">Event: {audit.event}</h3>
                    <p class="card-text"> Feedback: {audit.feedback} </p>
                    <p class="card-text"> Engagement Type: {audit.engagementType} </p>
                    <p class="card-text">Priority Level: {audit.priorityLevel} </p>
                    <p class="card-text">Rider Service: {audit.riderService} </p>
                    <p class="card-text">Geofence: {audit.geofence} </p>
                   <p class="card-text">User: {audit.user.username} </p>
                </article>
            ))}
        </section>

    </main>
}

export default AuditsPage