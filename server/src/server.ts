import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string(),
  amount: z.coerce.number().positive(),
});

app.post("/transactions", async (req, res) => {
  try {
    const data = transactionSchema.parse(req.body);
    const transaction = await prisma.transaction.create({ data });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.get("/transactions", async (_req, res) => {
  const transactions = await prisma.transaction.findMany();
  res.json(transactions);
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.transaction.delete({ where: { id } });

    res.status(200).json({ message: "Transaction removed sucessfully!" });
  } catch (error) {
    res.status(400).json({ error: "Transaction not found" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
