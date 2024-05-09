FROM node:18

RUN yarn global add pnpm

WORKDIR /app

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends ca-certificates\
                              fonts-liberation\
                              libappindicator3-1\
                              libasound2\
                              libatk-bridge2.0-0\
                              libatk1.0-0\
                              libc6\
                              libcairo2\
                              libcups2\
                              libdbus-1-3\
                              libexpat1\
                              libfontconfig1\
                              libgbm1\
                              libgcc1\
                              libglib2.0-0\
                              libgtk-3-0\
                              libnspr4\
                              libnss3\
                              libpango-1.0-0\
                              libpangocairo-1.0-0\
                              libstdc++6\
                              libx11-6\
                              libx11-xcb1\
                              libxcb1\
                              libxcomposite1\
                              libxcursor1\
                              libxdamage1\
                              libxext6\
                              libxfixes3\
                              libxi6\
                              libxrandr2\
                              libxrender1\
                              libxss1\
                              libxtst6\
                              lsb-release\
                              wget\
                              xdg-utils\
    && rm -rf /var/lib/apt/lists/*

RUN yarn global add @nestjs/cli

RUN groupmod -g 1000 node
RUN usermod -u 1000 -g node node

RUN chown node:node -R /app

USER node