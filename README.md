# react-markdown
使用create-react-app创建

基于react，highlight.js，pubsub-js，markdown-it和antd的markdown文件在线编辑器

### 如何启动
进入根目录下，执行如下命令
>yarn install

>yarn start

### 打包
>yarn build

## 运行在你的服务器上
>npm install -g serve

>serve -s build

### 支持的功能
- 拖拽文件到编辑区域来打开
- 工具栏
  - 下载你编辑的md文档（手机端浏览器不支持）
  - 一键清空所有内容
  - 加粗、斜体、下划线、代码块、注释、插入图片、插入超链接
- 快捷键
  - ctrl+b 加粗
  - ctrl+i 斜体
  - ctrl+shift+k 代码块
  - ctrl+shift+i插入图片
  - ctrl+z 撤回以变成2s之前的文本
 - 其他语法：使用的是markdown-it这个js库解析，目前只支持它支持的语法🤣

## 一些效果
### 刚进入时，空白输入
![image](https://user-images.githubusercontent.com/49555245/120988847-85088900-c7b1-11eb-8422-373f901747ac.png)
### 输入一些示例
![image](https://user-images.githubusercontent.com/49555245/120989289-e78c6580-c76e-11eb-8285-a21cf9ea8404.png)
![image](https://user-images.githubusercontent.com/49555245/120989634-4651df00-c76f-11eb-9f03-502f78c1ddc0.png)
![image](https://user-images.githubusercontent.com/49555245/120990055-b52f3800-c76f-11eb-97e2-d43a60910162.png)


