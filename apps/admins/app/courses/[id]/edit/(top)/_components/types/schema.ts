export type Lecture = {
  id: string
  title: string
  type: "video" | "test" | "text" | "mixed"
  typeLabel: string
}

export type Section = {
  id: string
  title: string
  lectures: Lecture[]
}
