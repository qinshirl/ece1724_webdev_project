import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
        id: true,
        partnerCode: true,
        partnerId: true,
    },
  })

  return NextResponse.json(user)
}

// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"
// import { prisma } from "@/lib/prisma"
// import { NextResponse } from "next/server"

// export async function GET() {
//   const session = await getServerSession(authOptions)

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     select: {
//       id: true,            
//       partnerId: true,
//     },
//   })

//   return NextResponse.json(user)
// }