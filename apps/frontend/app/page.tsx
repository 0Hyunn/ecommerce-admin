type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: "active" | "soldout" | "hidden";
};

// 간단한 더미 상품 데이터
// 실제 환경에서는 서버 컴포넌트에서 DB/백엔드 API 호출로 대체
const MOCK_PRODUCTS: Product[] = [
  {
    id: "P-20260001",
    name: "미니멀 베이직 티셔츠",
    description: "데일리로 입기 좋은 코튼 100% 베이직 티셔츠",
    price: 19000,
    category: "상의",
    stock: 127,
    status: "active",
  },
  {
    id: "P-20260002",
    name: "스트레이트 데님 팬츠",
    description: "슬림 스트레이트 핏의 데일리 데님 팬츠",
    price: 39000,
    category: "하의",
    stock: 42,
    status: "active",
  },
  {
    id: "P-20260003",
    name: "라이트 패딩 점퍼",
    description: "가볍고 따뜻한 경량 패딩 점퍼",
    price: 69000,
    category: "아우터",
    stock: 0,
    status: "soldout",
  },
  {
    id: "P-20260004",
    name: "러닝 스니커즈",
    description: "데일리/런닝 모두 가능한 쿠셔닝 스니커즈",
    price: 59000,
    category: "신발",
    stock: 15,
    status: "active",
  },
];

function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR") + "원";
}

export default function Home() {
  // ✅ 메인 대시보드에서 상품 카드 리스트를 보여주는 서버 컴포넌트
  //   - 추후 이 부분만 백엔드 연동 로직으로 교체하면 됨

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* 상단 헤더 영역 */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              상품 관리
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              등록된 상품의 판매 상태와 재고를 한눈에 확인하세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900">
              총 상품{" "}
              <span className="font-semibold">
                {MOCK_PRODUCTS.length.toLocaleString("ko-KR")}
              </span>
            </div>
            <div className="rounded-full bg-slate-50 px-3 py-1 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
              판매 중{" "}
              <span className="font-semibold">
                {MOCK_PRODUCTS.filter((product) => product.status === "active").length.toLocaleString("ko-KR")}
              </span>
            </div>
          </div>
        </section>

        {/* 상품 카드 그리드 */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_PRODUCTS.map((product) => {
            const isSoldOut = product.stock === 0 || product.status === "soldout";

            return (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
              >
                {/* 상단 상태 배지 영역 */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      {product.id}
                    </p>
                    <h2 className="line-clamp-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {product.name}
                    </h2>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                      {product.category}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isSoldOut
                          ? "bg-rose-50 text-rose-700 ring-1 ring-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-900"
                          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900"
                      }`}
                    >
                      {isSoldOut ? "품절" : "판매 중"}
                    </span>
                  </div>
                </div>

                {/* 본문 정보 영역 */}
                <div className="flex flex-1 flex-col gap-3 px-4 py-3">
                  <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                    {product.description}
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 dark:text-slate-500">판매가</p>
                      <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="space-y-1 text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-500">재고</p>
                      <p
                        className={`text-sm font-semibold ${
                          isSoldOut
                            ? "text-rose-600 dark:text-rose-400"
                            : product.stock < 20
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {isSoldOut ? "0 (품절)" : `${product.stock.toLocaleString("ko-KR")}개`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 카드 하단 액션 영역 - 향후 버튼/드롭다운 추가용 자리 */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
                  <span className="truncate">
                    {/* 복잡한 로직은 아니지만, 향후 수정 이력을 표시하거나 AB 테스트용 태그를 붙일 수 있는 영역 */}
                    최근 업데이트: 실시간 동기화 준비됨
                  </span>
                  <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    상세 관리 &gt;
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
