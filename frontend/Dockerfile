FROM node:22.11.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV $(cat .env-temp | xargs)
ARG VITE_GENERATE_SOURCEMAP
ENV VITE_GENERATE_SOURCEMAP=${VITE_GENERATE_SOURCEMAP}

RUN npm run build

FROM nginx:alpine

ARG VITE_ENVIRONMENT_NAME
ENV VITE_ENVIRONMENT_NAME=${VITE_ENVIRONMENT_NAME}

ARG VITE_APPLICATION_NAME
ENV VITE_APPLICATION_NAME=${VITE_APPLICATION_NAME}

ARG VITE_APPLICATION_VERSION
ENV VITE_APPLICATION_VERSION=${VITE_APPLICATION_VERSION}

EXPOSE 80

COPY config/app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/app/nginx/conf.d/ /etc/nginx/conf.d
COPY config/app/entrypoint.sh /entrypoint.sh
COPY config/app/nginx/init-scripts/env-variables.sh /docker-entrypoint.d/env-variables.sh

RUN chmod +x /docker-entrypoint.d/*.sh
RUN chmod +x /entrypoint.sh

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./