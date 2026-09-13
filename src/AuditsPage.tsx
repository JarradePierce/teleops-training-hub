import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

function AuditsPage(){
    const navigate = useNavigate()
    const url = "http://localhost:3000/api/audits"

    const[auditsData, setAuditsData] = useState<Audit[]>([])
    const reverseAudits = [...auditsData].reverse()

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
        <div className="container page-container">
            <div className="container intro-info-container">
                <h1 className="heading-intro-text">TeleOps Audits</h1>
                <p className="intro-text">Audits on this page are for the TeleOps team only</p>
            </div>

                <div className="d-grid d-md-flex justify-content-md-start mt-3 new-audit-button-container">
                <NavLink to="/audits/new" className="btn btn-outline-success create-audit-button">+ Create Audit </NavLink>
            </div>

        <section>
            {reverseAudits.map((audit) => (
                <article class="card index-card">
                    <h3 class="card-title index-card-title">{audit.event}</h3>
                    <div className="d-flex justify-content-between align-items-center gap-3 w-100">
                    <div className="d-flex flex-wrap gap-3 me-auto">
                        <p class="card-text card-meta-data-text">{audit.user.username}</p>
                        <p class="vertical-divider">|</p>
                        <p class="card-text card-meta-data-text">{audit.geofence}</p>
                        <p class="vertical-divider">|</p>
                        <p class="card-text card-meta-data-text">{audit.riderService} </p>
                        <p class="vertical-divider">|</p>
                        <p className="card-text card-meta-data-text">date placeholder</p>
                        <p class="vertical-divider">|</p>
                        <p className="card-text card-meta-data-text">TER Score placeholder</p>
                    </div>

                    <span className="badge rounded-pill audits-priority-level ms-auto">{audit.priorityLevel} </span>
                    </div>
                    <p class="card-text"> {audit.feedback} </p>
                    <p class="card-text"> Engagement Type: {audit.engagementType} </p>
                    <div className="border-top mt-3 pt-3 d-flex justify-content-between">
                    <span className="text-secondary">
                        Attached training placeholder
                    </span>

                    <Link to={`/audits/${audit.id}`} className="index-card-footer-links">
                        View audit →
                    </Link>
                    </div>
                </article>
            ))}
        </section>
        </div>
    </main>
}

export default AuditsPage