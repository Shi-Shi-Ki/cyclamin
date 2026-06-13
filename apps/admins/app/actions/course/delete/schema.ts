import { z } from "zod"

export const deleteCourseSchema = z.object({
  id: z.string(),
})

export type DeleteCourseRecode = z.infer<typeof deleteCourseSchema>
