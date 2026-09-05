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
    const usersUrl = "http://localhost:3000//api/users"

    const [usersData, setUserData] = useState<User[]>([])

    useEffect(() => {
        async function loadUsers(){
        const response = await fetch(userUrl)

        const data = await response.json()

        setUserData(data)
        console.log(userData)
        }
        loadUsers()
    })

    return <main>
        <nav>
            <a href="http://localhost:5173/trainings">Trainings</a>
            <a href="http://localhost:5173/audits">Audits</a>
            <a href="http://localhost:5173/users">Users</a>
        </nav>
        <h1>Fusion Center Training Hub</h1>
        <section>
            {usersData.map((user) => (
                <article key={user.id}>
                    <h3>Name: {user.username}</h3>
                    <p>Role: {user.role} </p>
                    {user.audits.map((audit, index) => (
                        <p key={audit.id}>{audit.title}</p>
                    ))}
                </article>
            ))}
        </section>
    </main>
}

export default UsersPage