# Backend API (Java)

Java 백엔드 API 서버입니다.

## 기술 스택

- Java (버전 협의 필요, 권장: Java 17+)
- Spring Boot (또는 다른 프레임워크 - 팀 협의 필요)
- Maven / Gradle (팀 협의 필요)

## 프로젝트 초기화

Maven 또는 Gradle 프로젝트를 이 폴더에 생성해주세요.

### Spring Boot + Maven 프로젝트 생성

Spring Initializr (https://start.spring.io/)를 사용하여 프로젝트를 생성하고 이 폴더에 압축 해제하거나, 다음과 같이 생성할 수 있습니다:

```bash
cd apps/backend

# Spring Initializr를 통한 다운로드 또는
# 직접 Maven 프로젝트 구조 생성
```

### Spring Boot + Gradle 프로젝트 생성

```bash
cd apps/backend
gradle init --type java-application
```

## 개발

### Maven 사용 시

```bash
# 개발 서버 실행
mvn spring-boot:run

# 빌드
mvn clean install

# 프로덕션 서버 실행
java -jar target/api-*.jar
```

### Gradle 사용 시

```bash
# 개발 서버 실행
./gradlew bootRun

# 빌드
./gradlew build

# 프로덕션 서버 실행
java -jar build/libs/api-*.jar
```

## 프론트엔드와의 연동

### CORS 설정

프론트엔드 개발 서버(일반적으로 `http://localhost:3000`)와의 통신을 위해 CORS 설정이 필요합니다.

Spring Boot 예시:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

### API 타입 동기화

- `packages/types` 디렉토리에 정의된 TypeScript 타입 정의를 참고하여 API 스펙을 일치시키세요
- OpenAPI/Swagger를 사용하여 API 문서화 및 프론트엔드 타입 생성 자동화를 권장합니다

## 프로젝트 구조 권장사항

```
apps/backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/ecommerce/admin/
│   │   │       ├── controller/      # REST 컨트롤러
│   │   │       ├── service/         # 비즈니스 로직
│   │   │       ├── repository/      # 데이터 접근 계층
│   │   │       ├── model/           # 엔티티 모델
│   │   │       ├── dto/             # 데이터 전송 객체
│   │   │       └── config/          # 설정 클래스
│   │   └── resources/
│   │       ├── application.yml      # 설정 파일
│   │       └── application-dev.yml  # 개발 환경 설정
│   └── test/                        # 테스트 코드
├── pom.xml (Maven) 또는 build.gradle (Gradle)
└── README.md
```
