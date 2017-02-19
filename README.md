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

### 展示视频
<video src='./show.mp4' width=150 controls></video>

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
			 
### 总结

项目基本开发完毕，总结几点：

1. vue组件化开发的思想非常适合现在前端的开发。因为涉及到多人共同开发，还有后期维护，组件化 + es6 + eslint提供了清晰、便利的开发环境。

2. 了解devicepixelratio，了解适用于移动端的flex布局，说实话我原来用float挺多的，现在发现弊端非常多。

3. 还有一个移动端自适应的小技巧：需求是width=height，但width是随着屏幕大小决定。解决方法是`width=100%;height=0;padding-top:0`

4. 小球动画中起着重要作用的`getBoundingClientRect()`，用于获取元素相对于文档视图左上角的距离，返回值是对象，有top，left，right，bottom属性。

5. 	这个项目中起着重要作用的滑动组件[better-scroll](https://github.com/ustbhuangyi/better-scroll)。这个组件是严重依赖于DOM加载，因为他是计算DOM的高度和宽度。所以在vue中调用它的时候，一定要先强制更新DOM(this.$nextTick())。

6. 使用better-scroll这个插件的时候，是屏蔽了click事件的默认行为，所以要设置为true才能派发click事件。
		
		import BScroll from 'better-scroll'
		if(!this._initScroll) {
			this._initScrll = new BScroll(this.$refs[name],{
				click: true
			})
		} else {
			this._initScroll.refresh();
		}

	但如果在桌面端的时候就会触发2次click，解决办法就是点击事件判断event._constructed是否存在
		
		if(!event._constructed) {
			return false;
		}
		...
		
		
7. 父组件传入子组件的数据如果为基本数据类型，则数据修改无法映射到父组件，需要`this.$emit(event,value)`手动派发一个事件，父组件接受并处理。反过来父组件调用子组件的方法`this.$refs[父组件].子组件方法`。

8. created和mounted两个生命周期，created声明周期可以监听data数据，mounted生命周期是所有的DOM都已生成，对DOM的操作还有ajax在此执行

9. 浏览器有一个window.localStorage属性，可以当做前端的数据库使用