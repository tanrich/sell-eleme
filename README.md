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

- <span style="text-decoration:line-through">css过渡动画(已解决)

	+ question:

		为什么css动画enter,enter-active,leave,leave-acitve不生效？
		
	+ answer
		
		1. 需要将css类名写在v-show相对应元素下
		2. enter只加载一瞬间，enter-active属性就会覆盖，所以不能像vue1.0一样写出动画结束样式。只能在默认属性中直接定义。enter-active作用相当于定义transition
			 