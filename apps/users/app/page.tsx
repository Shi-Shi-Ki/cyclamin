import Image from "next/image"
import {
  Accordion,
  Container,
  Section,
  Card,
  CardFigure,
  CardBody,
  CardTitle,
  CardActions,
  Badge,
  Button,
} from "@repo/ui"
import { PlayCircle, AlertCircle, Clock, BookOpen, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-base-200/30 pb-12">
      {/* ページヘッダー */}
      <div className="bg-base-100 border-b pb-6 pt-8">
        <Container>
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <p className="text-base-content/70 mt-2">
            お疲れ様です。現在の学習タスクと進捗を確認しましょう。
          </p>
        </Container>
      </div>

      <Container>
        {/* ==========================================
            セクション1: ヒーローエリア（続きから再開）
            一番目立つ場所に、現在進行中のタスクを配置します
        ========================================== */}
        <Section className="pt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PlayCircle className="text-primary w-6 h-6" />
            学習を再開する
          </h2>

          {/* Cardの layout="side" を使って横長のレイアウトを実現 */}
          <Card layout="side" className="w-full bg-base-100 shadow-sm border border-base-200">
            <CardFigure className="w-1/3 min-w-60 hidden sm:block relative">
              <Image
                src="https://picsum.photos/seed/security/600/400"
                alt="情報セキュリティ基礎講座"
                className="absolute inset-0 w-full h-full object-cover"
                height={600}
                width={400}
              />
            </CardFigure>
            <CardBody>
              <div className="flex justify-between items-start">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">進行中</Badge>
                <span className="text-sm text-base-content/60 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 残り約15分
                </span>
              </div>

              <CardTitle className="text-2xl mt-2">情報セキュリティ基礎講座 2026</CardTitle>
              <p className="text-base-content/70 mt-1">第3章：標的型攻撃メールの手口と対策</p>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">全体の進捗</span>
                  <span className="font-bold text-primary">75%</span>
                </div>
                {/* 以前に型定義した progress 要素 */}
                <progress className="progress progress-primary w-full" value={75} max={100} />
              </div>

              <CardActions className="mt-6">
                <Button color="primary" className="w-full sm:w-auto">
                  <PlayCircle className="w-5 h-5 mr-1" /> 動画を再生
                </Button>
              </CardActions>
            </CardBody>
          </Card>
        </Section>

        {/* ==========================================
            セクション2: アラートエリア（期限間近の必須研修）
            赤色を基調にして、受講漏れを防ぎます
        ========================================== */}
        <Section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-error">
            <AlertCircle className="w-6 h-6" />
            期限間近の必須タスク
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-error/5 shadow-sm border border-error/30 relative overflow-hidden">
              {/* カード上部の赤い装飾ライン */}
              <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
              <CardBody>
                <div className="flex gap-2 mb-2">
                  <Badge color="error">必須</Badge>
                  <Badge className="bg-error/20 text-error border-none">期限: 明日</Badge>
                </div>
                <CardTitle className="text-lg">【年次】コンプライアンス研修</CardTitle>
                <p className="text-sm text-base-content/70 mt-2">
                  全社員対象の年次テストです。期限内に必ず完了してください。
                </p>
                <CardActions className="mt-4">
                  <Button color="error" size="sm" className="w-full">
                    いますぐ受講する
                  </Button>
                </CardActions>
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* ==========================================
            セクション3: 割り当てられた研修（To Do）
            グリッド形式で未着手のものを並べます
        ========================================== */}
        <Section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="text-base-content/70 w-6 h-6" />
            未着手のコース
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* サンプルカード 1 */}
            <Card className="bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200">
              <CardFigure className="relative w-full aspect-video">
                <Image
                  src="https://picsum.photos/seed/management/400/225"
                  alt="マネジメント研修"
                  className="absolute inset-0 w-full h-full object-cover"
                  height={255}
                  width={400}
                />
              </CardFigure>
              <CardBody className="p-5">
                <Badge color="ghost" className="bg-base-200 w-fit mb-2">
                  マネジメント
                </Badge>
                <CardTitle className="text-lg">新任マネージャー向け 基礎講座</CardTitle>
                <div className="mt-auto pt-4 text-sm text-base-content/60 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 2時間30分
                  </span>
                  <span>全12レクチャー</span>
                </div>
              </CardBody>
            </Card>

            {/* サンプルカード 2 */}
            <Card className="bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200">
              <CardFigure>
                <Image
                  src="https://picsum.photos/seed/excel/400/225"
                  alt="Excel研修"
                  height={255}
                  width={400}
                />
              </CardFigure>
              <CardBody className="p-5">
                <Badge color="ghost" className="bg-base-200 w-fit mb-2">
                  実務スキル
                </Badge>
                <CardTitle className="text-lg">業務効率化のためのExcelマクロ入門</CardTitle>
                <div className="mt-auto pt-4 text-sm text-base-content/60 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 1時間15分
                  </span>
                  <span>全5レクチャー</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </Section>

        <Section>
          <Accordion
            summary={
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-base-content/60" />
                終了したコース
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              <Card className="bg-base-100 shadow-sm hover:shadow-md transition-shadow border border-base-200">
                <CardFigure>
                  <Image
                    src="https://picsum.photos/seed/picsum/400/225"
                    alt="ロジカルシンキング"
                    height={255}
                    width={400}
                  />
                </CardFigure>
                <CardBody className="p-5">
                  <Badge color="ghost" className="bg-base-200 w-fit mb-2">
                    実務スキル
                  </Badge>
                  <CardTitle className="text-lg">初学者向け ロジカルシンキング思考</CardTitle>
                  <div className="mt-auto pt-4 text-sm text-base-content/60 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> 2時間30分
                    </span>
                    <span>全8レクチャー</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Accordion>
        </Section>
      </Container>
    </main>
  )
}
