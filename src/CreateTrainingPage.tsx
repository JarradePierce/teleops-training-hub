import { useState } from 'react'
import { userNavigation } from 'react-router'

function CreateTrainingPage(){
    const navigation = userNavigation()
    const url = "http://localhost:3000/api/training/new"
    
    const [trainingData, setTrainingData] = useState({
        title: "",
        description: "",
        feedback: "",
    })

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        try{
            const response = await fetch(url, {
                method: POST,
                headers: { 'Content-Type', 'application/json'},
                body: JSON.stringify(training)
            })

            if(!response.ok){
                throw new Error("Could not create training")
            } else {
                console.log("new training page created at ", training.title)
            }

            const cratedTraining = await response.json()
            navigate(`/training/${createdTraining}`)

        } catch(error){
            console.log(error)
        }  

    }

    return <main>
        <nav>
            <a href="http://localhost:5173"> Fusion Center Training Hub 
            </a>
        </nav>

        <form onSubmit={handleSubmit}>
            <h2>Create New Training</h2>

            <label htmlFor="">Title</label>
            <input type="text" />

            <label htmlFor="">Description</label>
            <textarea type="text" />

            <label htmlFor="">Feedback</label>
            <input type="text" />

            <label htmlFor="">Links</label>
            <input type="text" />

            <label htmlFor="">Video Links</label>
            <input type="text" />

            <label htmlFor="">Audits</label>
            <select name="" id="">
                
            </select>
        </form>


    </main>
}