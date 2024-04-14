FROM node:18

WORKDIR /app

ENV TZ="Asia/Shanghai"

# 安装 git
RUN apt-get update && apt-get install -y git

# 克隆 GitHub 项目
RUN git clone https://github.com/365code365/node-back.git .

# 替换 "username/repository.git" 为实际的 GitHub 仓库地址

# 安装依赖项
RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

EXPOSE 7001

CMD ["npm", "run", "start"]
