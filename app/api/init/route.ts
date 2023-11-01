import { NextResponse } from "next/server"
import { Cycle, Grading, Language, PrismaClient } from "@prisma/client"
import * as cheerio from "cheerio"

import {
  LTHProgramCode,
  getCourseSyllabus,
  getCourses,
} from "../../../lib/lth-api"

const prisma = new PrismaClient()
export async function POST(request: Request) {
  try {
    await parseForProgram("D")
    return NextResponse.json({ success: true })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: false })
  }
}

async function parseForProgram(code: LTHProgramCode) {
  let courses = await getCourses(code)
  courses.forEach(async (course) => {
    prisma.course.create({
      data: {
        nameSv: course.name_sv,
        nameEn: course.name_en,
        courseCode: course.courseCode,
        credits: Number(course.credits),
        language:
          course.languageCode === "S" ? Language.Swedish : Language.English,
        cycle: parseCycle(course.cycle),
        grading: parseGrading(course.gradingScale),
        descriptionSv: "",
        descriptionEn: "",
        evaluationEn: course.evaluationUrl_en,
        evaluationSv: course.evaluationUrl_sv,
        coursePageSv: course.homePage_sv,
        coursePageEn: course.homePage_en,
        suitableForeignStudents: course.suitableForeignStudents,
        teacherId: (await getTeacherForCourse(course.courseCode)).id,
      },
    })
  })
}

async function getTeacherForCourse(code: string) {
  const syllabus = await getCourseSyllabus(code)
  const $ = cheerio.load(syllabus.sv)
  const text = $("p .bold")
    .filter((i, el) => {
      if ($(el).text().includes("Kursansvarig")) {
        return true
      }
      return false
    })
    .first()
    .parent()
    .text()
  const [name, email] = text.split(":")[1].trim().split(",")
  const teacher = await prisma.teacher.findFirst({
    where: {
      email: email.trim(),
    },
  })
  if (teacher) {
    return teacher
  }
  return await prisma.teacher.create({
    data: {
      name: name.trim(),
      email: email.trim(),
    },
  })
}

function parseCycle(cycle: string): Cycle {
  switch (cycle) {
    case "G1":
      return Cycle.G1
    case "G2":
      return Cycle.G2
    case "A":
      return Cycle.A
  }
  console.error("Could not parse cycle: " + cycle)
  return Cycle.G1
}

function parseGrading(grade: string): Grading {
  switch (grade) {
    case "TH":
      return Grading.TH
  }
  console.error("Could not parse grading: " + grade)
  return Grading.TH
}
