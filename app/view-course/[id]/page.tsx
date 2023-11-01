import Link from "next/link"

import { siteConfig } from "@/config/site"
import { parseHTML } from "@/lib/html"
import { getCourseSyllabus } from "@/lib/lth-api"
import { buttonVariants } from "@/components/ui/button"

export default async function Page({ params }: { params: { id: string } }) {
  let syllabus = await getCourseSyllabus(params.id)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>
        <h1>Info</h1>
        <h4>{params.id}</h4>
        {parseHTML(syllabus.sv)}
      </div>
    </section>
  )
}
