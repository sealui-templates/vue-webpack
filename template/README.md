# {{ name }}

> {{ description }}

## Build Setup

``` bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建线上环境
npm run build

# 构建测试环境
npm run ceshi

# 构建演示环境
npm run demo

{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```
