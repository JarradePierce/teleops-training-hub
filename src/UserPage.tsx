import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

type User = {
    id: number,
    username: string,
    role: string,
    audits: [],
    trainings: [],
}

function UserPage(){
    const navigate = useNavigate()
    const { id } = useParams()
    const userUrl = `http://localhost:3000/api/users/${id}`

    const [userData, setUserData] = useState<User | null>(null)

    useEffect(() => {
        async function loadUser(){
            const response = await fetch(userUrl)

            const data = (await response.json()) as User

            setUserData(data)
            console.log(userData)
        }
        if(id){
            loadUser()
        }
    }, [id])

    if(!userData){
        return <p>user loading....</p>
    }

    return <main>
        <nav class="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="http://localhost:5173/trainings">Trainings</a>
                </li>
                <li class="breadcrumb-item" >
                    <a href="http://localhost:5173/audits">Audits</a>
                </li>
                <li class="breadcrumb-item active" >
                    <a href="http://localhost:5173/users">Users</a>
                </li>
            </ol>
        </nav>
        <div class="card">
            <h1>{userData.username}</h1>
            <ul>
                    <li class="card-title">Role: {userData.role}</li>
                </ul>
        </div>
            <section>
                <h1>Audits</h1>
                <div>
                    {userData.audits.map((audit) => (
                        <div class="card">
                            <ul>
                                <li>
                                    <h1 class="card-title">Event: {audit.event}</h1>
                                </li>
                                <li>
                                    <h2 class="card-text">Feedback: {audit.feedback}</h2>
                                </li>
                                <li>
                                    <h2 class="card-text">Geofence: {audit.geofence}</h2>
                                </li>
                                <li>
                                    <p class="card-text">Priority Level: {audit.priorityLevel}</p>
                                </li>
                                <li>
                                    <p class="card-text"># Of audits this month placeholder</p>
                                </li>
                                <li>
                                    <p class="card-text"># Of audits past 3 months placeholder</p>
                                </li>
                                <li>
                                    <p class="card-text">Average TER Score all time</p>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
    </main>
}
export default UserPage