# Node.js + MongoDB로 제작한 Dashboard

Node.js + MongoDB를 사용한 Express 기반의 서버로 다양한 management가 가능한 관리자 페이지 및 Dashboard입니다.

<br/>

# URL

https://dashboard-dj.vercel.app

<br/>

# Tech Skill Used

|        Category        |                                             Tech                                              |
| :--------------------: | :-------------------------------------------------------------------------------------------: |
| **프레임워크 및 언어** |                                    **Node.js, express**                                       |
|         **DB**         |                                      **MongoDB Atlas**                                        |
|     **코드 관리**      |                                  **ESLint, Husky, Prettier**                                  |
|    **배포 플랫폼**     |                                          **koyeb**                                            |
|  **기타 라이브러리**   |          **bcrypt, dayjs, cookie-parser, cors, mongoose, jsonwebtoken, nodemon**              |

<br/>

# 주요 기능
### 사용자 인증 및 인가 (Authentication & Authorization)
- JWT를 사용하여 AccessToken과 RefreshToken을 발급하고, **localStorage 및 HttpOnly Cookie에 저장하여 사용자 인증(Authentication)을** 처리합니다.
- bcrypt를 이용한 **`비밀번호 해시화 및 비교로 사용자 정보 보호`** 합니다.
- 사용자의 비밀번호는 해시화되어 저장되며, 로그인 시 입력된 비밀번호와 비교하여 인증합니다.

### API 요청 보호 및 보안
- CORS를 설정하여 **클라이언트 도메인에 대한 교차 출처 요청을 허용**했습니다.
- cookie-parser를 사용하여 쿠키를 파싱하고, 쿠키 기반 인증을 지원합니다.
- HttpOnly, Secure 쿠키를 사용하여 XSS 및 CSRF 공격을 방어합니다.

### DB
- MongoDB Atlas를 사용하여 유저 정보 및 기타 데이터를 클라우드 기반으로 저장 및 관리합니다.
- **Mongoose를** 통해 MongoDB와의 연결 및 스키마 정의로 데이터를 처리합니다.

### nodemon을 사용해 서버 자동 재시작
- **`코드 변경 시마다 서버를 자동으로 재시작하여`** 개발 효율성 증가시켰습니다.

### API 응답 처리
- 순차적 처리가 불필요한 비동기 작업은 **Promise.all**을 활용하여 동시에 처리함으로써 **성능과 효율성을** 향상시켰습니다.

### middleware
- accesstoken의 검증을 **`미들웨어를 통해 일괄적으로 처리`** 하여 중앙 집중식으로 관리했습니다.

- ### 코드 관리
- eslint, prettier, husky를 적용해 일관된 코드 스타일을 유지하고 자동화된 코드 관리를 수행했습니다.

<br/>

# 프로젝트 구조
```bash
📦server
 ┣ 📂config
 ┣ 📂controllers
 ┣ 📂middleware
 ┣ 📂models
 ┣ 📂routes
 ┣ 📜index.js
 ┣ 📜app.js
```
