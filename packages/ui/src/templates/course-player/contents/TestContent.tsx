import { Survey } from "survey-react-ui"

export const TestContent = ({ survey, isMounted }: any) => (
  <div className="flex-1 relative w-full h-full overflow-y-auto p-6 md:p-12 bg-base-100">
    <div className="max-w-3xl mx-auto">
      {isMounted ? (
        <Survey model={survey} />
      ) : (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      )}
    </div>
  </div>
)
