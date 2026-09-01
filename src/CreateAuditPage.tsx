import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

function CreateAuditPage(){
    const navigate = useNavigate()
    const url = "http://localhost:3000/api/audit/new"

    const [auditData, setAuditData] = useState({
        referenceNumber: "",
        geofence: "",
        riderService: "",
        priorityLevel: "",
        event: "",
        feedback: "",
        engagementType: "",
        user: "",
    })

    const hanleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        const audit = {
            ...auditData
        }
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'applicatoin/json'},
                body: JSON.stringify(audit)
            })

            if(!response.ok){
                console.log("new audit could not be created")
            }else{
                console.log("new audit created at ", audit.event)
            }

            const createdAudit = await response.json()
            navigate('/audits')
        } catch(error){
            console.log(error)
        }
    }

    return <main>
        <nav>
            <a href="http://localhost:5173"> Fusion Center Training Hub 
            </a>
        </nav>

        <form onSubmit={hanleSubmit}>
            <h1>Create Audit</h1>

            <label htmlFor="audit-referenceNumber"> Reference Number</label>
            <input id="audit-reference-number" required value={audit.referenceNumber} onChange={(e) => setAuditData ({
                ...auditData, referenceNumber: e.target.value
            })} type="text" name="referenceNumber" />

            <label htmlFor="audit-geofence">Geofence</label>
            <input id="audit-geofence" required value={audit.geofence} onChange={(e) => setAuditData({
                ...auditData, geofence: e.target.value
            })} type="text" name="audit-geofence"/>

            <label htmlFor="audit-rider-service">Rider Service</label>
            <input id="audit-rider-service" required value={audit.riderService} onChange={(e) => setAuditData({
                ...auditData, riderService: e.target.value
            })} type="text" name="audit-rider-service"/>

            <select id="audit-priority-level" required value={audit.priorityLevel} onChange={(e) => setAuditData ({
                ...auditData, priorityLevel: e.target.value
            })}>
                <option value="">Select a priority level</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>

            <label htmlFor=""></label>
            <input type="text" />

            <label htmlFor=""></label>
            <input type="text" />

            <label htmlFor=""></label>
            <input type="text" />

            <label htmlFor=""></label>
            <input type="text" />

            <label htmlFor=""></label>
            <input type="text" />
        </form>
    </main>
}