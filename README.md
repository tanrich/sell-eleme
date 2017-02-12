# 仿eleme项目

> sell-eleme

## Build Setup

``` bash
# 项目根目录安装依赖
npm install

# 浏览器访问localhost:8000
npm run dev

# 打包编译生成静态资源
npm run build

# 打包编译生成静态资源并生成分析报告
npm run build --report
```

利用Vue-cli + Webpack搭建环境， 使用Vue2,Vue-router,Vue-resource编写。本人第一个vue项目，意在练手。

### 已知问题：
- 过渡动画JavaScript钩子函数
   
   + question:
   
   		afterEnter() 函数里面的语句为什么立即执行？不是应该等到enter()中的动画执行结束吗？
      
   + Temporary solution:
   	
  		暂时用setTimeout延迟执行afterEnter()函数里面的语句，延迟时间正好为动画时间
  		
  	+ answer:

  		none	
