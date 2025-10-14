# 최종 실행 환경만 정의합니다.
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 정적 파일 서버 'serve' 설치
RUN npm install -g serve

# GitHub Actions에서 context를 './build'로 지정할 것이므로,
# build 폴더의 모든 내용이 현재 위치(/app)로 복사됩니다.
COPY . .

# 3000번 포트 노출
EXPOSE 3000

# 서버 실행 (SPA 옵션 포함)
CMD ["serve", "-s", ".", "-l", "3000"]