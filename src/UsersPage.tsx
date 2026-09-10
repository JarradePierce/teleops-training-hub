import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

type Users = {
    id: number,
    username: string,
    role: string,
    audits: [],
    trainings: [],
}

function UsersPage(){
    const navigate = useNavigate()
    const usersUrl = "http://localhost:3000/api/users"

    const [usersData, setUserData] = useState<Users[]>([])

    useEffect(() => {
        async function loadUsers(){
        const response = await fetch(usersUrl)

        const data = await response.json()

        setUserData(data)
        console.log(usersData)
        }
        loadUsers()
    }, [])

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
        <h1>Fusion Center Training Hub</h1>
        <section>
            {usersData.map((user) => (
                <article class="card" key={user.id}>
                    <h3 class="card-title">Name: {user.username}</h3>
                    <p class="card-text">Role: {user.role} </p>
                    {user.audits.map((audit, index) => (
                        <p class="card-text" key={audit.id}>{audit.title}</p>
                    ))}
                </article>
            ))}
        </section>
    </main>
}

export default UsersPage