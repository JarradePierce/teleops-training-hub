import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

function CreateTrainingPage(){
    const navigate = useNavigate()
    const url = "http://localhost:3000/api/training/new"
    
    const [trainingData, setTrainingData] = useState({
        title: "",
        description: "",
        feedback: "",
        auditIds: [""],
    })
    
    const [auditsData, setAuditsData] = useState<Audit[]>([])

    useEffect(() => {
        async function loadAudits(){
            const auditsUrl = "http://localhost:3000/api/audits"
            const response = await fetch(auditsUrl)

            const auditData = await response.json()

            setAuditsData(auditData)
        }
        loadAudits()
    })


    function addAudit(){
        setTrainingData({
            ...trainingData, 
            auditIds: [...trainingData.auditIds, ""]
        })
    }

    function updateAudit(index: number, auditId: string){
        const auditIds = [...trainingData.auditIds]
        auditIds[index] = auditId

        setTrainingData({
            ...trainingData,
            auditIds,
        })
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        const training = {
            ...trainingData}

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(training)
            })

            if(!response.ok){
                throw new Error("Could not create training")
            } else {
                console.log("new training page created at ", training.title)
            }

            const cratedTraining = await response.json()
            //navigate(`/training/${createdTraining}`)
            navigate(`/trainings`)

        } catch(error){
            console.log(error)
        }  

    }

    return <main>
        <nav>
            <a href="http://localhost:5173"> Fusion Center Training Hub 
            </a>
        </nav>

        <h1>Create Training</h1>

        <form onSubmit={handleSubmit}>
            <h2>Create New Training</h2>

            <label htmlFor="training-title">Title</label>
            <input id="training-title" required value={trainingData.title} onChange={(e) => setTrainingData ({
                ...trainingData, title: e.target.value 
            })} type="text" name="title" />

            <label htmlFor="training-description">Description</label>
            <textarea id="training-description" required value={trainingData.description} onChange={(e) => setTrainingData ({
                ...trainingData, description: e.target.value
            })} type="text" name="description" />

            <label htmlFor="training-feedback">Feedback</label>
            <input id="training-feedback" required value={trainingData.feedback} onChange={(e) => setTrainingData ({
                ...trainingData, feedback: e.target.value
            })} type="text" name="feedback" />

            {trainingData.auditIds.map((auditId, index) => (
                <div key={index}>
                    <select value={auditId} onChange={(e) => updateAudit(index, e.target.value)} name="" id="">
                        <option value="">Select a Audit</option>
                    {auditsData.map((audit) => (
                        <option key={audit.id} value={audit.id}>{audit.event}</option>
                    ))}
                    </select>
                </div>
            ))}

            <button type="button" onClick={addAudit}> Add Audit </button>

            <button type="submit">Create</button>
        </form>


    </main>
}

export default CreateTrainingPage
