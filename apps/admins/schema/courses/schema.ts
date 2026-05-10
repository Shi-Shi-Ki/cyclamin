import { z } from "zod"

export const courseSchema = z.object({
  courseName: z.string().min(1, "必須入力の項目です").min(10, "最低10文字以上入力してください"),
})

export type CourseFormInputs = z.infer<typeof courseSchema>
