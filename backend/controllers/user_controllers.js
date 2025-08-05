import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userControllers = {
  getFood: async (req, res) => {
    try {
      const food = await prisma.chapter.findMany({
        include: {
          foods: true,
        },
      });
      res.status(200).json(food);
    } catch (error) {
      res.status(500).json({ error: "Error fetching food items" });
    }
  }, 
  voteFood: async (req, res) => {
    const { chapterId } = req.body;
    try {
      const vote = await prisma.chapter.update({
        where: { id: chapterId },
        data: { votes: { increment: 1 } },
      });
      res.status(201).json(vote);
    } catch (error) {
      res.status(500).json({ error: "Error voting for food" });
    }
  },
getTotalVotes: async (req, res) => {
  try {
    const chapters = await prisma.chapter.findMany({
      include: {
        foods:true,
      },
    });

    

    res.status(200).json(chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching votes by chapter' });
  }
}
};