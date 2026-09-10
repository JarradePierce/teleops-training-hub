import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

function CreateAuditPage(){
    const navigate = useNavigate()
    const auditUrl = "http://localhost:3000/api/audit/new"
    const userUrl = "http://localhost:3000/api/users"

    const [auditData, setAuditData] = useState({
        referenceNumber: "",
        geofence: "",
        riderService: "",
        priorityLevel: "",
        event: "",
        feedback: "",
        engagementType: "",
        userId: "",
    })

    const [userData, setUserData] = useState([])

    useEffect(() => {
        async function loadUsers(){
            const response = await fetch(userUrl)

            const data = await response.json()
            setUserData(data)
            console.log(data)
        }
        loadUsers()
    }, []) 

    const hanleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        const audit = {
            ...auditData
        }

        try{
            const response = await fetch(auditUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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
    <nav class="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">
                <a href="http://localhost:5173/trainings">Trainings</a>
            </li>
            <li class="breadcrumb-item active" >
                <a href="http://localhost:5173/audits">Audits</a>
            </li>
            <li class="breadcrumb-item active" >
                <a href="http://localhost:5173/users">Users</a>
            </li>
        </ol>
    </nav>

        <form onSubmit={hanleSubmit}>
            <h1>Create Audit</h1>

            <label htmlFor="audit-referenceNumber"> Reference Number</label>
            <input id="audit-reference-number" required value={auditData.referenceNumber} onChange={(e) => setAuditData ({
                ...auditData, referenceNumber: e.target.value
            })} type="text" name="referenceNumber" />

            <label htmlFor="audit-event">Event</label>
            <textarea id="audit-event" required value={auditData.event} onChange={(e) => setAuditData ({
                ...auditData, event: e.target.value
            })} type="text" name="audit-event"> </textarea>

            <label htmlFor="audit-feedback"> Feedback </label>
            <textarea id="audit-feedback" required value={auditData.feedback} onChange={(e) => setAuditData ({
                ...auditData, feedback: e.target.value
            })} type="text"></textarea>

            <label htmlFor="audit-geofence">Geofence</label>
            <input id="audit-geofence" required value={auditData.geofence} onChange={(e) => setAuditData({
                ...auditData, geofence: e.target.value
            })} type="text" name="audit-geofence"/>

            <label htmlFor="audit-rider-service">Rider Service</label>
            <input id="audit-rider-service" required value={auditData.riderService} onChange={(e) => setAuditData({
                ...auditData, riderService: e.target.value
            })} type="text" name="audit-rider-service"/>

            <select id="audit-priority-level" required value={auditData.priorityLevel} onChange={(e) => setAuditData ({
                ...auditData, priorityLevel: e.target.value
            })}>
                <option value="">Select a priority level</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
            </select>

            <select value={auditData.userId} onChange={(e) => setAuditData({
                ...auditData, userId: e.target.value
            })}>
                <option value="">Select a user</option>
            {userData.map((user) => (
                <option key={user.id} value={user.id}>{user.username}</option>
            ))}
            </select>

            <button type="submit">Create Audit</button>
        </form>
    </main>
}

export default CreateAuditPage