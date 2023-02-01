import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const habit = await prisma.habit.create({
    data: {
        title : 'Meditar', 
        created_at: new Date('2023-02-01'), 
    }
  })
 
  console.log({ habit })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })