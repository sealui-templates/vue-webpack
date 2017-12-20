.PHONY: prod ceshi demo clean
default: help

# build all style
style:
	npm run build:style
# 安装项目开发依赖
install:
	npm install

install-cn:
	npm install --registry=http://registry.npm.taobao.org
# 开发模式
dev:
	@npm run dev
# 编译生产环境
prod:
	@npm run prod
# 编译测试环境
ceshi:
	@npm run ceshi
# 编译演示环境
demo:
	@npm run demo
# 清除以前的编译文件
clean:
	@npm run clean
# 帮助信息
help:
	@echo " "
	@echo "   \033[35mmake\033[0m \033[1m命令符\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  使用说明"
	@echo "   \033[35mmake install\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  安装依赖"
	@echo "   \033[35mmake dev\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  开发模式"
	@echo "   \033[35mmake prod\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译 生产 环境"
	@echo "   \033[35mmake ceshi\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译 测试 环境"
	@echo "   \033[35mmake demo\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  编译 演示 环境"
	@echo "   \033[35mmake clean\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  清除以前的编译"
	@echo " "
