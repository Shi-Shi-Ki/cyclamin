import { z } from "zod"

export const createCourseSchema = z.object({
  courseName: z.string().min(1, "必須入力の項目です").min(5, "最低5文字以上入力してください"),
  sourceCourseName: z.string().optional(),
  sourceCourseId: z.string(),
})

export type CreateCourseRecode = z.infer<typeof createCourseSchema>
