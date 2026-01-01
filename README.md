# ecommerce-admin

쇼핑몰 관리자 시스템 - 모노레포 구조

## 프로젝트 구조

```
ecommerce-admin/
├── apps/
│   ├── frontend/           # 프론트엔드 (Next.js)
│   └── backend/            # 백엔드 (Java)
├── packages/               # 공유 패키지
│   ├── shared/            # 공유 유틸리티 및 헬퍼
│   └── types/             # 공유 TypeScript 타입 정의
├── package.json            # 루트 package.json (workspaces 설정)
├── pnpm-workspace.yaml     # pnpm workspaces 설정
└── README.md
```

## 기술 스택

### 프론트엔드 (apps/frontend)

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI

### 백엔드 (apps/backend)

- Java
- Spring Boot (또는 다른 프레임워크 - 팀 협의 필요)
- Maven / Gradle (팀 협의 필요)

## 개발 환경 설정

### 필수 요구사항

- **프론트엔드**: Node.js 18+, pnpm 8+
- **백엔드**: Java 17+ (또는 Java 11+), Maven 3.6+ / Gradle 7+

### 설치 및 실행

#### 프론트엔드

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
# 또는
pnpm --filter frontend dev

# 빌드
pnpm build:frontend
```

#### 백엔드

```bash
cd apps/backend

# Maven 사용 시
mvn spring-boot:run
# 또는 빌드 후 실행
mvn clean install
java -jar target/api-*.jar

# Gradle 사용 시
./gradlew bootRun
# 또는 빌드 후 실행
./gradlew build
java -jar build/libs/api-*.jar
```

백엔드 프로젝트 초기화는 `apps/backend/README.md`를 참고하세요.

## 폴더 구조 설명

### apps/frontend

Next.js 기반 관리자 대시보드 프론트엔드 애플리케이션

- pnpm workspaces로 관리
- `packages/types`의 타입 정의를 참조하여 사용

### apps/backend

Java 백엔드 API 서버

- Maven 또는 Gradle로 독립적으로 관리
- Java 프로젝트이므로 pnpm workspaces 범위 외부
- 필요 시 `packages/types`의 타입 정의를 참조 (또는 OpenAPI/Swagger로 타입 생성)

### packages/shared

프론트엔드에서 사용하는 공유 유틸리티 함수 및 헬퍼

### packages/types

프론트엔드와 백엔드 간 공유되는 TypeScript 타입 정의

- API 응답 타입, 엔티티 타입 등을 정의
- 백엔드에서는 OpenAPI/Swagger를 통해 동기화 권장

## 모노레포 관리

이 프로젝트는 하이브리드 모노레포 구조입니다:

- **프론트엔드 및 공유 패키지**: pnpm workspaces로 관리
- **백엔드**: Java 프로젝트로 독립적으로 관리 (Maven/Gradle)

각 패키지는 독립적으로 개발되며, 필요 시 `packages/types` 디렉토리의 타입 정의를 공유하여 사용합니다.
