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
        <h1>TeleOps Audits</h1>

        <section>
            {auditsData.map((audit) => (
                <article>
                    <h3>Event: {audit.event}</h3>
                    <p> Feedback: {audit.feedback} </p>
                    <p> Engagement Type: {audit.engagementType} </p>
                    <p>Priority Level: {audit.priorityLevel} </p>
                    <p>Rider Service: {audit.riderService} </p>
                    <p>Geofence: {audit.geofence} </p>
                   <p>User: {audit.user.username} </p>
                </article>
            ))}
        </section>

    </main>
}

export default AuditsPage