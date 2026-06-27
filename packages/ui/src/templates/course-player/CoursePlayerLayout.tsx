"use client"

interface CoursePlayerLayoutProps {
  mainContent: React.ReactNode
  sidebar: React.ReactNode
  isDarkBg?: boolean
}

export const CoursePlayerLayout = ({ mainContent, sidebar, isDarkBg }: CoursePlayerLayoutProps) => {
  return (
    <main className="flex flex-col lg:flex-row h-full w-full bg-base-200">
      {/* 左カラム：メインコンテンツエリア */}
      <div
        className={`flex-1 flex flex-col relative overflow-hidden ${isDarkBg ? "bg-black" : "bg-base-200"}`}
      >
        {mainContent}
      </div>

      {/* 右カラム：サイドバー */}
      <div className="w-full lg:w-[450px] xl:w-[500px] bg-base-100 flex-shrink-0 flex flex-col border-l border-base-200 h-full relative">
        {sidebar}
      </div>
    </main>
  )
}
