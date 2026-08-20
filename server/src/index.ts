import "dotenv/config";
import { prisma } from "./db.js"
import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  const healthData = {
  status: "Healthy",
  uptime: process.uptime(),
  timestamp: new Date().toISOString()
  }
  response.json(healthData)
});

// all users
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      audits: true,
      trainings: true,
    },
  })
  res.json(users)
})

// user show endpoint 
app.get("/api/users/:id", async (req, res) => {
  const userId = Number(req.params.id)
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      username: true,
      role: true,
      audits: true,
      trainings: true,
    },
  })
  if(!user){
    return res.status(404).json({error: "user not found"})
  }
  res.json(user)
})

// All trainings endpoint
app.get("/api/trainings", async (req, res) => {
  const trainings = await prisma.training.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      feedback: true,
      audits: true,
      links: true,
      videoLinks: true,
      users: true,
    },
  })
  res.json(trainings)
})

// training show endpoint
app.get("/api/trainings/:id", async (req, res) => {
  const trainingId = Number(req.params.id)
  const training = await prisma.training.findUnique({
    where: {
      id: trainingId,
    },

    select: {
      id: true,
      title: true,
      description: true,
      feedback: true,
      audits: true,
      links: true,
      videoLinks: true,
      users: true,
    },
  })
  if(!training){
    return res.status(404).json("error: No training found")
  }
  res.json(training)
})

// all audits
app.get("/api/audits", async (req, res) => {
  const audits = await prisma.audit.findMany({
    select: {
      id: true,
      referenceNumber: true,
      geofence: true,
      riderService: true,
      priorityLevel: true,
      event: true,
      feedback: true,
      engagementType: true,
      trainings: true,
      userId: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        },
    },
  })
  res.json(audits)
})

// audit show
app.get("/api/audits/:id", async (req, res) => {
  const auditId = Number(req.params.id)
  const audit = await prisma.audit.findUnique({
    where: {
      id: auditId,
    },

    select: {
      id: true,
      referenceNumber: true,
      geofence: true,
      riderService: true,
      priorityLevel: true,
      event: true,
      feedback: true,
      engagementType: true,
      trainings: true,
      userId: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
    },
  })
  if(!audit){
    return res.status(404).json("No audit found")
  }
  res.json(audit)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

