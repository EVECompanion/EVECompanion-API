ARG NODE_IMAGE=node:21.7.1-alpine

FROM ${NODE_IMAGE} AS BUILDER

WORKDIR /usr/src/app

COPY . .

# Install all Dependencies, including DEV-Dependencies.
RUN npm install

# Compile TS to JS.
RUN npm run build

# Copy the compiled JS files into a dedicated container
FROM ${NODE_IMAGE}

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/dist .
COPY package* ./

# Only install dependencies needed for production use.
RUN npm install --production

# Set Node.js into Production Mode.
ENV NODE_ENV=production

CMD ["node", "index.js"]