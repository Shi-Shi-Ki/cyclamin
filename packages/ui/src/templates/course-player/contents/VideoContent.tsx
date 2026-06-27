import { PlayCircle } from "lucide-react"
import { Badge } from "../../../atoms/Badge"
import { useEffect, useRef, useState } from "react"

export const VideoContent = ({ contentUrl, courseTitle, isPreview, onVideoEnd }: any) => {
  // ★ 動画の長さを秒数で保存するState
  const [durationSeconds, setDurationSeconds] = useState<number | null>(null)
  // ★ iframeを操作するためのRefを作成
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return "--:--"
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  // ==========================================
  // ★ YouTubeの再生終了イベントを監視する
  // ==========================================
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") {
        return
      }

      try {
        const data = JSON.parse(event.data)
        // ★ initialDelivery (初期ロード時) と infoDelivery (再生中・状態変化時) の両方を許可
        if (data.event === "initialDelivery" || data.event === "infoDelivery") {
          if (data.info) {
            // 1. 再生終了 (playerState === 0) の検知
            if (data.info.playerState === 0) {
              if (onVideoEnd) {
                onVideoEnd()
              }
            }

            // 2. 動画の長さ (duration) の取得（まだ取得していなければセット）
            if (data.info.duration && durationSeconds === null) {
              setDurationSeconds(data.info.duration)
            }
          }
        }
      } catch (e) {
        // パースエラーなどは無視
        console.error(e)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [onVideoEnd, durationSeconds])

  // ==========================================
  // * iframeが読み込まれた直後に、YouTubeへ合図を送る
  // ==========================================
  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "listening", id: 1 }),
        "https://www.youtube.com"
      )
    }
  }

  return (
    <>
      <div className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center">
        {contentUrl ? (
          <iframe
            ref={iframeRef}
            onLoad={handleIframeLoad} // ★ 読み込み完了時に合図を送る
            className="w-full h-full absolute inset-0"
            src={`https://www.youtube.com/embed/${contentUrl}?rel=0&enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="text-center text-white/80">
            <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-80" />
            <span className="font-medium text-lg">動画プレイヤー</span>
          </div>
        )}
      </div>
      <div className="bg-base-300/10 text-white p-4 border-t border-white/10 flex justify-between items-center hidden md:flex shrink-0">
        <div>
          {isPreview && (
            <Badge className="bg-warning text-warning-content border-none mb-1 mr-2">
              プレビュー
            </Badge>
          )}
          <Badge className="bg-primary/20 text-primary border-none mb-1">STEP0</Badge>
          <h2 className="font-bold">{courseTitle}</h2>
        </div>
        <div className="text-sm opacity-60">再生時間: {formatDuration(durationSeconds)}</div>
      </div>
    </>
  )
}
