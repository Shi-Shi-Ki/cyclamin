export const ArticleContent = ({ contentUrl }: { contentUrl?: string }) => (
  <div className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center bg-white">
    {contentUrl ? (
      <iframe
        className="w-full h-full absolute inset-0"
        src={contentUrl}
        title="Document Viewer"
      ></iframe>
    ) : (
      <div className="text-base-content/50">ドキュメントURLが設定されていません</div>
    )}
  </div>
)
