#
# Expects the source Git repo to be the 'docker build' context
#
FROM node:15-buster as builder
ARG DEBIAN_FRONTEND=non-interactive
WORKDIR /src
COPY . .
RUN rm -rf node_modules \
 && yarnpkg install --frozen-lockfile \
 && yarnpkg install --modules-folder /app

FROM node:15-buster
ARG TINI_VERSION=v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
COPY --from=builder /src /src
COPY --from=builder /app /app
WORKDIR /src
ENV NODE_ENV=production
USER node
ARG PORT=5000
ARG API_URL=

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
ENTRYPOINT ["/tini", "--"]
CMD ["yarn", "node", "scripts", "serve", "--modules-folder", "/app"]
