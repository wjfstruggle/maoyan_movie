# 飞猪电影
Vue-cli3.0飞猪电影项目

[项目预览](http://struggle-wjf.gitee.io/feizhumovie/dist/index.html#/)

### 图片预览
![1.png](http://edu.bluej.cn/public/uploads/1.png)

![3.png](http://edu.bluej.cn/public/uploads/20181229/201812291315013.png)

![4.png](http://edu.bluej.cn/public/uploads/20181229/201812291315014.png)

![5.png](http://edu.bluej.cn/public/uploads/20181229/201812291315015.png)

![6.png](http://edu.bluej.cn/public/uploads/20181229/201812291315016.png)

![2.png](http://edu.bluej.cn/public/uploads/20181229/201812291315012.png)
#### 使用方式

使用了 vue-cli 3.x 构建的开发环境， cli3 是18年开始开发的，就结合了 webpack 4.x

使用方式：

1. 安装 cli  npm i @vue/cli  -g

2. 初始化项目 vue create xxxx  ||  vue ui

3. 选择配置

    babel   ->  js 的编译
    linter  ->  代码的规范
    Router  ->  vuer-router 实现 spa
    vuex    ->  状态管理工具

#### 项目结构配置

package.json 中 script 中利用 vue-cli-service 工具配置了开发模式

postcss.config.js  postcss 的配置文件

babel.config.js  babel的配置文件

public 公共静态目录，可以直接使用 "/" 访问，绝对路径

src 开发目录

#### vue.config.js

cli 3.x 将自己配置文件隐藏起来了，全部封装在 @vue/cli-service 工具中

如果想要自定义配置，就可以在根目录下创建 vue.config.js，将需要的配置写进去，就能覆盖默认的配置(https://cli.vuejs.org/zh/config/#css-loaderoptions)

我们可以利用 chainwebpack 进行 webpack 中的多项的配置，例如：resolve.alias(控制模块引入别名  https://www.jianshu.com/p/e4716e5bc8bb)

#### src 配置指南

默认情况下：

assets: 这里的资源可以使用相对路径去引入

components: 存放组件的目录

views: 存放路由组件

router.js: vue-router的配置

store.js: vuex配置

main.js: 项目入口文件，使用 render 函数去渲染根组件

App.vue: 根组件  任何一个项目，都需要一个根实例，根实例需要一个根组件


##### 单文件组件

用一个文件来代表一个组件，后缀名为 .vue，文件中

* template  

* script 中暴露出组件的位置

* style 编写 css 样式，lang 制定预处理语言，scoped 局部生效 做法：为当前模板添加独一无二的 data 属性


#### 项目具体实现

1. 使用 vue-awesome-swiper 来完成轮播图开发

2. 在 vue.config.js 中进行 proxy 代理

3. 使用 Fetch 进行数据交互

> fetch 是 ES6 原生 API 提供的数据交互，兼容性差

4. 使用 babel-polyfill 垫片实现语法兼容

5. 使用 axios 进行数据交互 将其挂在 Vue.prototype 上


#### vue-router 使用

原理：监听地址栏变化后进行对于的路由组件的卸载和安装

路由的配置需要实例化路由工具 router 并将其注入根实例

需要配置路由表 routers  重定向：redirect   别名：alias

配置 mode 选项来控制路由模式：hash/history (采用 H5 的 history API，需要后端配置（忽略前端路由中的路径）)

配置路由出入口 router-view 利用 router-link 生成 dom 调整路由 to/tag

路由钩子还有 this.$route 和 this.$router

路由传参

#### keep-alive

可以利用内置的 keep-alive 组件去保存切换后的状态，当组件切换回来的时候，会直接使用到缓存的这些数据，不会再次经历初始化阶段，当切换出去的时候也不会经历销毁阶段，在切换回来就没有 mounted 和 destroyed 两个钩子函数

应用场景：

    路由切换后，组件需要重新获取数据，用户体验差，所以可以使用 keep——alive 处理，数据频繁变动时，不能使用。

问题：如果没有了 mounted 和 destroyed 钩子函数，需要的时候怎么办

如果是路由组件可以使用 beforeRouteEnter 和 deforeRouteLeave 两个路由钩子函数来代替

如果不是路由组件，当使用了 keep-alive 后，生命钩子函数会多出两个：activated(重新进入), deactivated(离开)


#### 组件库

移动端： mint-ui, vux

组件库一般都有两种引入方式：全局引入（把组件库内的所有组件全部注册），按需引入（需要哪个引哪个，[组件.name]:组件）

实现了城市的页面逻辑后，有一个小小的问题：城市这个数据需要在很多组件中共用，用普通的组件通信方式不好解决

#### 插件 / 自定义指令

准备开发一套自定义的 组件库/插件（GP8-ui）

任何的组件似乎都需要 vue.use 来处理一下，实质是在执行这个模块对象中的 install 方法， install 方法就能够接受到 vue 和配置参数，就可以在 install 方法中写入组件的注册等待事情

提供组件

提供方法（在原型中添加属性）

提供指令(自定义指令，指令是用来操作 dom 不能修改数据，使用钩子的第三个参数 Vnode 中的 context 修改数据)

    实现了 v-gp8-lazy 指令，模拟 v-lazy 能力，出现问题：bind 中给 window 绑定事件的时候使用 addEventListner，准备在销毁的时候 unbind 的时候去给 window 解绑，要求必须传入一样的函数。

    解决方案：因为每一个钩子函数都能接受 el 属性，而且是同一个 el，就可以挂载在 el 身上

#### vuex

目前，多组件问题数据通信有很大的困难，因为组件的数据通信时单向数据流，多针对非父子通信提供 evevnt bus 的解决方案

但是这种方案第一针对多组件的共享很难处理，导致数据流向变乱，逻辑不清晰，无法解决两个不能同时存在的组件的通信

我们研究后发现可以整一个中间层做介质，目前选择 localStorage，更改数据后存入到 localStorage，使用数据的时候再取出来

但是 localStorage 不能做到主动通信

这对这种情况我们使用vuex

使用方法：

1. 创建 store

2. 创建 state 并且注入到 store 中，此时 store 中已经有了 state（响应式）

3. 将 store 注入到根实例中，组件就可以利用 this.$store.state 来获取使用数据 ( mapState )

    如果组件需要响应式的使用数据需要利用 computed 来接受数据

4. 更改数据的时候需要借助 mutations，创建 mutations，它的作用就是用来更改 state

5. 组件中通过提交 mutations 的方法来更改状态，调用方法为 store.commit({ type：'name' , [option]}) ( mapMutations )

> Mutations 不能异步操作

6. 异步动作放到 action 中，接受到 context（跟 store 差不多）异步动作后进行 context.commit 提交 mutation

7. getters 是可以从 state 中派生的新状态，state 与 getters 的关系，类似于组件中的 data 与 computed 的关系

8. module 划分模块，为了多人协作开发，结构分离，可以将 store 拆分为各个模块

## it资源
https://www.yuque.com/itjiaochengxuexi/mxcpla/eoilbc

如有任何疑问，请添加qq 2399012862
