export interface CourseForProgram {
  courseId: number
  courseCode: string
  academicYearId: string
  academicYear: string
  academicYearShort: string
  name_sv: string
  name_en: string
  gradingScale: string
  credits: string
  cycle: string
  type: string
  status: string
  oldCourseCode: string
  newCourseCode: null
  homePage_sv: string
  homePage_en: string
  languageCode: string
  language_sv: string
  language_en: string
  departmentCode: string
  department_sv: string
  department_en: string
  motherDepartmentCode: string
  motherDepartment_sv: string
  motherDepartment_en: string
  maxParticipants: null
  entryRequirements: number
  assumedPriorKnowledge: number
  timeeditUrl_sv: string
  timeeditUrl_en: string
  evaluationUrl_sv: string
  evaluationUrl_en: string
  courseSyllabusPath_sv: string
  courseSyllabusPath_en: string
  suitableForeignStudents: boolean
  hasChanges: number
  preliminary: boolean
  id: number
  courseProgrammeId: number
  groupId: string
  sortOrder: string
  programmeStatus: string
  year: number
  fromYear: number
  choice: string
  choiceShort: string
  programmeCode: string
  programme_sv: string
  programme_en: string
  specialisationCode: string
  specialisation_sv: string
  specialisation_en: string
  specialisationGeneral: number
  footnote_sv: string
  footnote_en: string
  timePlans: TimePlan[]
}

export interface TimePlan {
  startSpNr: number
  endSpNr: number
  studyPeriods: Array<StudyPeriod | null>
}

export interface StudyPeriod {
  lecture: number
  exercise: number
  laborations: number
  project: number
  selfStudies: number
}

export type LTHProgramCode = "D"
export async function getCourses(
  program: LTHProgramCode
): Promise<CourseForProgram[]> {
  let url = `https://api.lth.lu.se/lot/courses?programmeCode=${program}&academicYearId=23_24`
  let res = await fetch(url)
  let json = await res.json()

  return json
}

export interface CourseSearch {
  courses: CourseSearchResult[]
  totalCount: number
}

export interface CourseSearchResult {
  courseCode: string
  name_sv: string
  name_en: string
  credits: string
  programmes: Programme[]
}

export interface Programme {
  programmeCode: string
  academicYearIds: string[]
}

export async function searchCourse(courseCode: string): Promise<CourseSearch> {
  let url = `https://api.lth.lu.se/lot/courses/search?courseCode=${courseCode}`
  let res = await fetch(url)
  let json = await res.json()

  return json
}

export interface CourseSyllabus {
  sv: string
  en: string
  originalUrl_sv: string
  originalUrl_en: string
  originalUrlPdf_sv: string
  originalUrlPdf_en: string
}
export async function getCourseSyllabus(
  courseCode: string
): Promise<CourseSyllabus> {
  let url = `https://api.lth.lu.se/lot/courses/${courseCode}/syllabus/23_24`
  let res = await fetch(url)
  let json = await res.json()

  return json
}
