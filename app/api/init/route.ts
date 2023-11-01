import { NextResponse } from "next/server"

import { getCourses } from "./lth-api"

export async function POST(request: Request) {
  let courses = await getCourses("D")

  return NextResponse.json({ success: true })
}
