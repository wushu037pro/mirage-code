
# ==Lesson01.JEECG-BOOT 开发环境准备==


## 开发工具
- **后端开发工具**：Eclipse 或 IDEA；`记得安装lombok插件`
- **前端开发工具**：Webstrom 或 IDEA
    ```
    拓：前端开发工具还有
        - sublime3 需要安装第三方的包，一般。如果做前端html，css用这个即可，小巧轻快
        - atom 继承度非常好
        - vs code 默认的智能提示非常强大
        【三款内核都一样】。最强大的还是WebStorm，大项目用WebStorm
    ```
- **Nodejs**：是JavaScript运行环境。Nodejs类似于后端的Maven工程类库，用来引各种件。Node用新版本，尽量用10以后的版本(cmd: node -v看版本号)，避免不兼容
    ```
    - 安装Nodejs会自带Npm，Npm是包管理器。我们用Node只会用到Npm。
    - npm不如yarn好用：yarn下的全而且快；npm有些包下载的不全，并且效率低。
    - 概念理解：我们就把Node当成maven来用，用来下载工程依赖的组件
    - 拓：其实Node可以做服务器，可以开发东西。
    ```


## npm和yarn
- npm下包经常下的不全。建议用yarn，yarn可以用npm install yarn命令安装
- yarn / yarn install 等同于npm install 批量安装依赖
- yarn add xxx 等同于 npm install xxx —save 安装指定包到指定位置
- **尽量使用yarn命令**


## package.json文件
 - 双击：
	- "script": 脚本中的命令可以自定义。比如`"serve": "vue-cli-ser vice serve --open",`形式为`命令名：执行的命令代码`。即`serve`运行的是`vue-cli-ser vice serve --open`。**`--open`是项目启动后自动打开浏览器**
        ```js
        框架就是用vue-cli运行项目的，也可以用npm，其实vue-cli最终执行的也是npm
            vue-cli：读作vue-command，cli：命令行接口(Command Line Interface)
        ```
	- "dependencies": 依赖
 - 右键show npm script 可查看npm脚本
	- serve: 启动。**运行项目**点这个按钮，也可以命令行中运行package.json文件中serve后对应的命令
	- build: 打包。
	- lint: 检测项目中有哪些不规范的地方，比较严格。比如多空格，没被引用等。(可以百度一下，忽略lint校验)


---

# ==Lesson02.JEECG-BOOT 项目启动==


## 后端
 - jeecg-boot-module-system  **主工程**
 - JeecgApplication **启动类**
    ```
        2.0版本注解：视频2m41s
    	有工作流用@EnableAutoConfiguration(exclude={....})
    	没有工作流用@EnableAutoConfiguration  
    	同样的在pom中也已经加入了工作流相关的joa，jasper依赖
    ```
 - **配置文件**：主文件application.yml `active:选择不同环境的配置 test(测试环境)，dev(开发环境)，prod(生产环境)`
    - server.servlet.context-path:/jeecg-boot   --**工程名**
        - 如果不部署到tomcat上的话，这个工程名是有用的；**工程名要和前端的baseURL相同**
        - `如果部署到tomcat上，这个是在tomcat上配置的，这工程名就是webapp下边的那个目录名`
    - 主**数据源**(master)，多数据源(multi-datasource1)
        - oracle/sqlserver数据库配置时 --参考官方文档 http://jeecg-boot.mydoc.io/?t=345674
		加驱动，改配置等(和不同数据库的sql语句有关)
    - **redis配置**：用于token的生成(用户登录的token的授权)，缓存在redis里面
        - `配置好端口号什么的，端口号默认6379，可以在运行redis的命令行里看`
 - **代码生成器的配置文件**：
    - jeecg_database.properties  数据库连接
    - jeecg_config.properties  生成的路径和根包名
###### 拓：关于server.servlet.context-path
- 参考 https://blog.csdn.net/onedaycbfly/article/details/80108129
    - springboot2.x以上的版本，在.properties里面配置访问路径server.context-path=/X不起作用，需改为server.servlet.context-path=/*


## 前端
 - 前端打开转圈的时候是在加载(组件等)，加载完进入程序后速度还是很快的
 - package-lock.json  关于这个文件 参考 https://segmentfault.com/a/1190000017239545?utm_source=tag-newest
    - 如果网上下载的项目，有这个文件，==直接删掉即可。如果运行过程中老卡或者报错，也把这个文件删掉==
    - `参考网址的简介：如果你已经将节点包管理(npm)更新到版本5.x.x，看起来一切似乎都很顺利。等等，这是什么?用 npm 初始化项目的会自动创建了一个新文件 package-lock.json。如果打开它，它看起来有点像 package.json 的依赖项，但更冗长。我们决定忽略它，继续开发项目。最终，我们有时会遇到依赖项的问题，找不到，或者安装了错误的版本。大多数人最终都会删package-lock.json和运行“npm install”。那么，为什么要有它呢? 它应该做什么? 它实际上是做什么的? `
- **node_modules**文件夹
    - ==运行过程中老卡或者报错，就把这个文件删掉==(如果有package-lock.json也删掉)，==然后命令运行 yarn install== `yarn install安装的比较全，npm install容易缺东西`
- 前端运行后，后端可能会报一些工作流的jar找不到,比如xmlunit1，不用管，是工作流的一些maven依赖找不到(加载tomcat的时候一些件找不到，不影响使用，不用理会)


## 端口号
- 后端：application-dev.yml
- 前端：vue.config.js，请求的**代理**(转发后台)
    - devServer，前端端口号和请求的后端端口号都在这里设置
    - 注意：代理只是在开发环境用，正式部署的时候是不一样的
#### 和请求有关的文件
- src/utils/axios.js:
- **src/utils/request.js** 这个文件跟一个通用拦截器一样，针对所有的请求也加了个token，还有异常处理等
    - baseURL:  '/jeecg-boot' 这是每次请求端口号后跟着的基础URL
    - timeout:  6000 // 请求超时时间
- src/api/manage.js:可以看到所有的请求，post,get,delete,add等等请求，调用的都是axios，里边的url都会加一个baseURL
#### 前端f12看到的请求路径和后台的路径
```
例如前端f12看到的是Request URL: http://localhost:3000/jeecg-boot/sys.....
    其中3000是前端端口，jeecg-boot是baseURL
```
 - 使用了代理，在vue.config.js中
    ```js
    '/jeecg-boot': {
    		target: 'http://localhost:8080', //请求本地 需要jeecg-boot后台项目
    		ws: false,
    		changeOrigin: true
    	},
    ```
    - **意思就是包含/jeecg-boot的请求全部转成http://localhost:8080开头的**
 - **所以==vue.config.js中的/jeecg-boot要和request.js的baseURL保持一致，也要和后端的工程名server.servlet.context-path保持一致==**


---

# ==Lesson03.JEECG-BOOT 前后端框架详解==


## 后端(的配置)
 - application-xxx.yml的配置和xxxConfig.java类
#### 读取配置文件application-xxx.yml
 - @Value注解读取配置文件里的信息
    ```java
    例: jeecg-boot-base-common\src\main\java\org\jeecg\common\system\controller\CommonController
    		@Value(value = "${jeecg.path.upload}") 读到的就是application-xxx.yml中对应的值
    ```
#### 各个config.java配置文件
	mybatis、redis、shiro等等的Config.java。拓展东西的时候能用到
 - **文件路径**：jeecg-boot-module-system\src\main\java\org\jeecg\config\
 - **ShiroConfig**：==如果有些权限不需要shiro的权限控制的话，需要在这个文件里改，把权限放过去。==
 - **MybatisPlusConfig**：其中==打印sql的执行效率==默认注掉的，用的话可以打开，能打印出来sql的执行效率，看哪些效率低
    - application-xxx.yml中的sql**打印日志**默认是注掉的，开发的时候打开，可以打印sql
        ```java
        configuration: log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
        ```
    - **所有的代码写在modules下**，因为MybatisPlusConfig配置的扫描mapper的路径是@MapperScan(value={"org.jeecg.modules.**.mapper*"})
		`（可以改）`


## 查询器QueryWrapper&LambdaQueryWrapper
- QueryWrapper用的是数据库字段名
- LambdaQueryWrapper用的是实体类的get方法：考虑数据库的兼容性，建议用这个
    ```java
    .eq(类名::getxxx,...)
    ```


## 前端
- **入口**：
    ```js
    - 界面：public/index.html    <div id="app">是根节点。
    - ？？调用的控件：src/App.vue
    - js：src/main.js    可以在这里加组件
    - 登录进去后**默认主题**设置等：src/defaultSettings.js
    ```
- src/api/：**所有的接口，通用的方法**
    - manage.js：请求方法
    - api.js：用户管理权限管理等相关的方法
- src/assets：**放静态文件**(图片等)
- src/components：**通用组件**
    - layouts/   布局的组件。TsbLayout.vue多tab风格；BasicLayout.vue单页面风格
        - ==单页面和多tab== -- 在页面主题设置(勾选最下边的'多页签模式')
    - chart/   chart组件
    - dict/   字典标签组件
- src/config：==路由设置==
    - router.config.js：切风格的话把`component:TalLayout`组件名换一下即可
- src/mixins：==**代码的混入**==
    - JeecgListMixin.js：定义了列表的**增删改查等**，基础的通用的功能。每个页面引这个就有这些功能了
        - `引入的规则，data(){..}方法中的代码，如果页面也有就是合并。其余的方法如果页面上起相同名字的就是重写`
- src/router：==路由的配置==
- src/store：==vuex==的东西，==(状态管理)数据存储==。==用的时候可以再听一下'38min:00s'==
    - 数据存储，参考 https://www.cnblogs.com/jsanntq/p/9288144.html
    - 一共有**三种存储**：
        - sessionStorage：基于会话的，刷新页面有数据，关了浏览器就没数据了，只能存储字符串
        - localStorage：针对cookie级别的，浏览器关了再打开还是有这个数据的，除非清了cookie或cookie过期了
        - vuex：数据的暂存，只要整个应用不刷新数据就在，里边的iframe框架刷新没有事
- src/utis：**通用的js**
- **src/views：页面**，**页面要写在这个目录下** `(可以再建个包写自己的页面)`
    - 所有的路由的配置走的都是基于src/views目录来走的 (打开前端的菜单编辑，前端组件后边的内容，写的路径就是src/views/后的路径)
    - system：system下面的
    - jeecg：是demo和常用案例的页面
- package.json中的==dependencies==(依赖)：形式为`{"组件名":"版本号","....",...}`
	- 添加组件的时候可以在这里边写上添加的组件+版本号，然后执行yarn insta
	- 更新的时候执行==update命令==，就可以把版本号更新到最新


---

# ==Lesson04.JEECG-BOOT Hello World==


## 关闭shrio
- 测试的时候直接在地址栏输入请求会报token为空
    - 方法一：把config/ShiroConfig.java的`@Configuration`注释掉，就不会走这个配置了
        - 不可行，启动不起来，(讲师说)应该是其他地方对这个类拐点使用了
    - 方法二：在ShiroConfig.java中把相关请求绕过shiro
    ```java
    添加代码：filterChainDefinitionMap.put("test/**", "anon");
    ```
###### 拓：postman
- **postman 请求模拟工具，接口测试工具**
- 地址栏只能模拟get请求，如果要模拟post请求：
	- 通过第三方工具 postman
	- swagger注解界面 `http://localhost:8210/mi-jeecg-boot_v2.1.0/swagger-ui.html`-->单表Demo-->post 可以看相关代码。(没有postman方便)


## vue页面的组成
- 代码：dev/test/HelloWorld.vue
    ```
    <!--template，相当于一个组件-->
    <template>
      <!--代码片段，要有唯一的一个根元素，比如一个<div>等-->
      <div>
        <!--对象名 前后要有空格，不然会编译报错(貌似不会啊)-->
        {{ message }} kkkkkk
        <p v-if="seen">现在你看到我了</p>
        <!--Ant Design 组件演示-->
        <a-button type="primary">Primary</a-button>
      </div>
    </template>
    
    <script>
      //`@/`指的是根目录`src/`  引入get方法调用数据
      import { getAction } from '@/api/manage'
    
      export default {
        //data里是数据
        data() {
          return {
            //定义一个对象
            message: '',
            seen: true
          }
        },
        //methods 页面里的调用方法
        methods: {
    
        },
        //created 生命周期的方法，create初始化时，类似于html中的window.onload。
        //create() 是DOM结构还没有创建的时候就执行
        created() {
          //调用接口得到数据
          getAction('/test/jeecgTest/hello').then((res) => {
            console.log('------------')
            console.log(res)
            this.message = res.result
          })
        }
      }
    </script>
    ```


## 菜单的配置
- **子菜单**
    - **前端组件**：是vue文件的相对路径，例如 `src/views/dev/test/HelloWorld.vue` 把`src/views/`和`.vue`去掉 只留`dev/test/HelloWorld`
    - **菜单路径**：可以和前端组件的内容一样，也可以不一样，比如可以写`dev/test/HelloWorld`||`dev/test/HelloWorld123`等
    - **是否是路由菜单**：是


# ==Lesson05.代码生成器生成代码案例讲解(增删改查)==


## vue.js文档
- vue.js文档和jeecg-boot里的不大一样，因为jeecg-boot里用的是vue的框架语言。但是大同小异
- ==指令演示==: `v-if`   ` 代码: dev/test/HelloWorld.vue`


## Ant Design Vue文档
- 基于 Ant Design 和 Vue 的企业级 UI 组件。
- Ant Design 已经全面覆盖了 React、Angular、Vue 三大前端框架，向着世界第一好用的 UI 设计语言迈进。
- ==组件演示== `<a-button>`  `代码: dev/test/HelloWorld.vue`


## Less语言
- Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。
- Less 可以运行在 Node 或浏览器端。


## JeecgOneGUI.java生成代码
- 包名，实体类名，表名，功能描述，弹窗风格表单
    - vue代码的modules里，会有弹窗风格和抽屉风格两个文件。抽屉的删掉即可。
		抽屉风格是从侧边滑出来，跟主题设置那个效果一样
- 后端代码都加了swagger的注解`@ApiOperation`，可以直接通过swagger注解测试。不测试的话也可以不要


## xxxList.vue
- 32m:00s 左右
- table表格用的是ant design 的table，配置都去ant design文档看
    - 表格里有插槽。 -- 插槽是vue的概念
#### JeecgListMixin混入：
- 前端的list页面，可以看到methods里没代码，其实代码在混入文件`JeecgListMixin`中。
- queryParam:{}  获取查询条件的代码：
    ```js
    var param = Object.assign(sqp, this.queryParam, this.isorter ,this.filters); 
    Object.assign语法的作用是(循环)拷贝，把queryParam对象里的数据拷贝到param对象中
    ```
 - dataSource:[] 数据源
    ```js
    getAction(this.url.list, params).then((res) => {
      if (res.success) {
        this.dataSource = res.result.records;
    	...........
    ```
 - 如果不用混入，可以把混入的代码拷贝到list.vue文件中，==要注意data里的东西是合并的，同名的方法是重写的==
    ```
    (40m:15s，视频中演示去掉混入)：
	1. 去掉混入的import和`mixins:[JeecgListMixin],`
	2. 增加混入代码里的import
	3. 合并混入代码里的data
	4. 增加混入代码里的crate()及覆盖methods()方法。(原list.vue中的methods为空，所以直接覆盖)
    ```
#### 引入组件
 - 一个页面就是一个组件，组件名就是下边的name(所以这个**name是不能重复的**):
    ```js
    export default {
      name: "MiDemoModal",
      ......
    ```
 - 引用的时候，三种写法：
	1. 可以直接用大写引用 
        - `<MiDemoModal> </MiDemoModal>`
	2. **推荐 `-`分隔**
	    - `<Mi-demo-modal> </Mi-demo-modal>`
	3. 大写和`-`混用
	    - `<MiDemo-modal> </MiDemo-modal>`
	    - `<Mi-demoModal> </Mi-demoModal>`
#### modal打开(弹窗)讲解
    `add`为例。相关文件有xxxModal.vue和xxxList.vue
- 弹窗由visible属性控制
    ```js
    <a-modal :visible="visible" ....
    ```
- 混入代码中的
    ```js
    handleAdd: function () {
		this.$refs.modalForm.add(); //-- 调用了modal的add方法
		this.$refs.modalForm.title = "新增";
		...
	},
    ```
    就是xxxModal.vue中的
    ```js
    add () {
    		this.edit({}); //-- 又调用了edit方法，并且传入的是空对象
    },
    edit (record) { //**
		....
		this.visible = true; //-- 这里控制了visible=true，即弹窗打开
		....
	},
    ```
 - 额外方法一：在add()里直接这么写也可以打开新建
    ```js
    add () {
		this.visible = true;
	},
    ```
 - 额外方法二：
    ```js
    handleAdd: function () {
		this.$refs.modalForm.visible = true; //**
		this.$refs.modalForm.title = "新增";
		...
	},
    ```
#### 父子组件数据交互(传值)
##### **方法一**：通过方法参数传值(以'列表'为例)
- code:
    ```js
    <a @click="handleEdit(record)">编辑</a>		//-- `xxxList.vue`
    handleEdit: function (record) {				//-- `混入xxxMixin.js`
    	this.$refs.modalForm.edit(record); //**
    	this.$refs.modalForm.title = "编辑";
    	...
    },
    ```
    - **record参数**，就是table的row对象
- code:
    ```js
    edit (record) {								//-- `xxxModal.vue`
		this.form.resetFields();
		this.model = Object.assign({}, record);//-- 把recore对象拷贝到model对象。
		this.visible = true;
		this.$nextTick(() => {
			this.form.setFieldsValue(pick(this.model,'name','days','reason','bpmStatus')) //-- 把model的值set到input等元素中
			//时间格式化
			this.form.setFieldsValue({beginDate:this.model.beginDate?moment(this.model.beginDate):null})
			this.form.setFieldsValue({endDate:this.model.endDate?moment(this.model.endDate):null})
		});
	},
    ```
    - **model对象**，和表单里的input等进行绑定。使用**v-decorator指令**
        - v-decorator指令是单向绑定，input等的值改变model值跟着变。
            要让input的值随着model变，通过`setFieldsValue`把model的值set到input等元素中
        - v-model指令是双向绑定。输入框和model的任一方的值改变对方都会跟着变
##### **方法二**：通过props属性
- 声明：props:['formData']
    - `xxxModal.vue`--> `export default:{`中加上这个属性
    ```js
    export default {
        name: "MiDemoModal",
        props:['formData'],    // ['xxx']类似于泛型，传什么值都能接收
        data () {
    ```
- 赋值(数据绑定)：
    - 用`冒号+参数名` --> `:formData`
    ```js
    <MiDemo-modal ref="modalForm" @ok="modalFormOk" :formData="description"></MiDemo-modal>
    ```
    - **加`:`和不加`:`的区别**:
		1. 加:是数据的绑定，双引号里边的是(数据)对象。
		2. 不加:双引号里是字符串
		3. 特别的：如果加:，双引号里又有单引号''，则也是字符串
- 调用：
    ```js
    methods: {
    	add () {
    		console.log("-----formData----",this.formData) //**
    		...
    ```
##### 方法三：直接通过属性获得值
- `<a ref="xxxx">` 即不加冒号的方式
#### 传值后的回调
- 72m:38s
- 通过emit调用事件。
    ```js
    <MiDemo-modal ref="modalForm" @ok="modalFormOk" ...   //-- xxxList.vue  
	that.$emit('ok')   ...		//-- xxxModal.vue  
	//-- 不一定是ok，自定义
    ```


---

# ==Lesson06.菜单配置及页面权限讲解==


## 路由
- 1m:00s
- jeecg-boot的路由做的是动态的(读取数据库)、懒加载的路由。
- 获取后台数据，封装成路由。 (代码看视频 1m-5m)
    1. src\permission.js 获取到后台数据，转成标准的路由对象。
        ```js
        store.dispatch('GetPermissionList').then(res => { 
        /**-- GetPermissionList 调用的是src/store/modules/user.js里的GetPermissionList
            user.js中的GetPermissionList({ commit }) {...queryPermissionsByUser(params)... 又调用的api-- 
                可以从import看出来: import { queryPermissionsByUser } from '@/api/api'
         */
              ......
              /**-- 封装成路由，从import处可以看出方法所在的文件
                    -->import { generateIndexRouter } from "@/utils/util"
              */
              constRoutes = generateIndexRouter(menuData);
        ```
    2. utils\util.js 生成首页路由，通过懒加载方式，生成子菜单
    3. src\permission.js 继续向下执行，加载生成路由，以及控制跳转


## 菜单创建
- **父菜单**
    - **前端组件**：都是layouts/RouteView，调用的是通用的layouts/RouteView.vue，不用管
    - **菜单路径**：业务包名就行(其实啥都行吧，因为是父菜单，还需要路径么)
    - **默认跳转地址**：若想展开这个菜单的时候默认打开一个子菜单，则配这个子菜单的路径。(不好使)
- **子菜单**
    - **前端组件**：是vue文件的相对路径，例如 `src/views/dev/test/HelloWorld.vue` 把`src/views/`和`.vue`去掉 只留`dev/test/HelloWorld`
    - **菜单路径**：可以和前端组件的内容一样，也可以不一样，比如可以写`dev/test/HelloWorld`||`dev/test/HelloWorld123`等。(应该就是给父菜单的默认跳转路径用的吧)
    - **是否是路由菜单**：是
    - **==隐藏路由==**：不想作为菜单展示，在菜单之外的按钮`(比如个人页打开的页面中的按钮，点击按钮跳到新的页面)`跳转页面。因为没有路由配置(就没有了页面请求)跳不到页面，所以需要有这么一个隐藏路由
		

## 权限控制
#### v-has 显示/隐藏 控制
- **自定义的指令 v-has**：util/hasPermission.js  指令 `v-has` 控制按钮的显示和不显示
    ```js
    const hasPermission = {
        install (Vue, options) {
            console.log(options);
              Vue.directive('has', {  //-- 指令名-`v-has` 控制按钮的显示和不显示。名字可以改
              });
        }
    };
    ```
- **加载**：在views/main.js里加载
    ```js
    1. import hasPermission from '@/utils/hasPermission'
    2. Vue.use(hasPermission)
    ```
- **使用示例**：控制demo`MIDemoList.vue`的`新增`按钮
    - **第一步：标识** - 如下配置，此时按钮不显示。==注意'test-htllo'不能重复==
    ```
    <!-- v-has="'test-hello'" 单引号表示字符串 -->
    <a-button @click="handleAdd" type="primary" v-has="'test-hello'" icon="plus">新增</a-button>
    ```
    - **第二步：配置** - 菜单管理-->新增-->按钮/权限
        - *按钮/权限: 新增按钮
        - 上级菜单：==Demo-CRUD==(按钮所在页面)
        - 菜单路径：不用写
        - 授权标识：test:hello
        - 授权策略：显示/访问(授权后显示/可访问)
            - 显示/访问(授权后显示/可访问)
            - 可编辑(未授权时禁用)
        - 状态：有效
            - 无效(就是这个配置无效，授权了也无效。即这个`按钮/权限`放在这而已，并没有启用)
            - 有效 (授权后此配置有效) 
    - **第三步：授权** - 角色管理-->授权`新增按钮`，即可显示

#### :disable 可编辑/禁用 控制
- 官方文档-->系统权限用法-->页面表单权限-->禁用控制用法二
- 只要有disable属性的元素，就可以进行控制。角色授权之后可编辑，未授权时禁用

#### JAVA 访问权限 控制
> 没找到文档第二步说的那个页面。可能是结合`v-has`使用的

- 官方文档-->系统权限用法-->JAVA访问权限控制
- 和v-has隐藏/显示一样，但是不止是控制前端按钮的显示和隐藏，还控制后台的请求。避免通过请求访问按钮，更安全

#### 数据权限
- 官方文档-->系统权限用法-->数据权限
- 用得少，看文档，用法和老jeecg差不多


---

# ==Lesson07.菜单管理-聚合路由的使用==
> 参看文档-->聚合路由的使用

### 示例：个人页-个人设置
- 父菜单勾选了`聚合路由`，子菜单不会显示在左侧菜单中。并且配置菜单路径，点击后默认跳转到对应的子菜单中。如下：点击左侧`个人设置`，会跳转到`基本设置`
![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/jeecg-boot-聚合路由配置.png)


---

# ==Lesson08.前端自定义组件用法讲解==
> 组件演示：dev/test/ModuleDemo.vue

- @/xxx/xxx/xxx.vue  **=='@' 符号表示的是src根目录==**
- 常见案例-->常用选择组件 对应的文件是`SelectDemo.vue`
- 自定义组件都封装在`components/jeecg/`下。文档对应的是 '自定义组件' 中的内容。
    - ==如果文档中没有都可以在这个文件夹里看。同样地，**每个组件的可控的属性等也都在对应的文件里可以看到**== 比如：
        ```js
          export default {
            name: 'JGraphicCode',
            props: { //-- 这里边的都是可控制(可添加)的属性
              length:{
                type: Number,
                default: 4
              },
              fontSizeMin: {
                type: Number,
                default: 20
              },
              fontSizeMax: {
                type: Number,
                default: 45
              },
        ```

---

# ==Lesson09.JEditableTable行编辑表格用法讲解==
> JeecgBoot开发文档-->JEditableTable帮助文档
> dev/test/JEditableTableDemo.vue

---

# ==Lesson10.如何新建一个maven模块子项目==
> 本课内容 开源中国-->那个男人A -- https://my.oschina.net/u/3903209/blog/3083399

- 右击项目New Module，左侧选择Maven==一定要选择jdk1.8==，**不勾选**Create form archetype-->Next-->ArtifactId `jeecg-boot-module-jm`-->Finish
- 右下角 Import Changes 就是总pom.xml中加了一行`<module>jeecg-boot-module-jm</module>`
    ```xml
    <modules>
    	<module>jeecg-boot-base-common</module>
    	<module>jeecg-boot-module-system</module>
        <module>jeecg-boot-module-jm</module>
    </modules>
    ```
- 在module-jm的pom.xml里引入
    ```xml
    <!--引入common-->
    <dependencies>
        <dependency>
            <groupId>org.jeecgframework.boot</groupId>
            <artifactId>jeecg-boot-base-common</artifactId>
        </dependency>
    </dependencies>
    
    <!--阿里云仓库-->
    <repositories>
        <repository>
            <id>aliyun</id>
            <name>aliyun Repository</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
        <repository>
            <id>jeecg</id>
            <name>jeecg Repository</name>
            <url>http://maven.jeecg.org/nexus/content/repositories/jeecg</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
    ```
    - 这个不用引，因为maven建的是一个springboot项目
        ```
        <build>
        	<plugins>
        		<plugin>
        			<groupId>org.springframework.boot</groupId>
        			<artifactId>spring-boot-maven-plugin</artifactId>
        		</plugin>
        	</plugins>
        </build>
        ```
- 新建package org.jeecg.modules.hello;
- 新建
    ```
    package org.jeecg.modules.hello;
    
    import ...
    
    /**
     * @author Mirage
     * @create 2019-10-29 23:28
     */
    @Slf4j
    @Api(tags="新建module--jm")
    @RestController
    @RequestMapping("/hello")
    public class HelloController {
        @GetMapping(value="/")
        public Result<String> hello(){
            Result<String> result = new Result<>();
            result.setResult("hello word!");
            result.setSuccess(true);
            return result;
        }
    ```
- 右击module-jm-->open in Terminal 执行mvn install 编译。看是否成功。(**在当前工程执行install会将项目打包到本地仓库**，父工程install也会将子工程打包到本地仓库)
    - 应该配maven环境变量才能执行maven命令。
    - **直接在右边插件点 maven install即可**
- 在system模块的pom.xml引入
    ```xml
    <dependency>
    	<groupId>org.jeecgframework.boot</groupId>
    	<artifactId>jeecg-boot-module-jm</artifactId>
    	<!-- 这个一定要加！原因看''-->
    	<version>2.1.0</version> 
    </dependency>
    ```
- 重启。发现没有生成HelloController的swagger接口文档
- 打开`Swagger2Config.java`。注意下面两句
    ```java
    //此包路径下的类，才生成接口文档。-- 明显HelloController可以被扫描到
    .apis(RequestHandlerSelectors.basePackage("org.jeecg.modules"))
    //加了ApiOperation注解的类，才生成接口文档。-- 这个注解在HelloController中没加，去加上
    .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
    ```
- 在HelloController加上`@ApiOperation("jm模块-hello操作")` 此时**Doc接口文档**(不用swagger-ui)-->调试：响应内容，可以看到Token失效的信息
    ```
    {
      "timestamp": "2019-10-30 02:21:55",
      "status": 500,
      "error": "Internal Server Error",
      "message": "Token失效，请重新登录",
      "path": "/jeecg-boot/hello/"
    }
    ```
- HelloController请求被shiro拦截，进`ShiroConfig.java`，去掉token拦截限制
    ```java
    //新建module 不进行权限拦截
	filterChainDefinitionMap.put("/hello/**", "anon");
    ```
- 重新接口调试，响应内容成功

#### maven(jeecg-boot-module-system)不指定version无法引本地依赖的问题
- 形成原因：system模块导入jm模块依赖的时候没指定版本号
    ```
    <dependency>
    	<groupId>org.jeecgframework.boot</groupId>
    	<artifactId>jeecg-boot-module-jm</artifactId>
    </dependency>
    ```
- 解决方法一：Project Settings--> Modules-->jeecg-boot-module-system-->Dependencies-->添加 + Module Dependencies
    - 方法一和二其实一样，加入版本号之后自动添加的就是jm模块的Module Dependencies。不加版本号Dependencies里是错误(红下划线)的jm模块的libraries
- 解决方法二：system模块引入依赖时写上版本号(这样去本地仓库直接定位到版本号就确定是哪个依赖了。)
    ```xml
    <dependency>
        <groupId>org.jeecgframework.boot</groupId>
        <artifactId>jeecg-boot-module-jm</artifactId>
        <version>2.1.0</version>
    </dependency>
    ```
    - 其实不应该这样，子工程的groupId和version可以从父工程继承，父工程里配置了jm这个子工程，按理说就不需要指定版本号了呀。
    - **百度**：跟maven的版本有关，maven2如果在pom.xml的继承体系里有，则用最新的。maven3好像是又要求显示声明Version了。--可能是因为这个，必须指定版本号。==但是system引的common也没指定呀==。。
#### ==**2019/10/31 - maven依赖版本号问题解决**==
- 如上面百度所说，maven3要求必须声明Version
- **maven有个`<dependencyManagement>`，用来统一管理项目的版本号**，确保应用的各个项目的依赖和版本一致，不用每个模块项目都弄一个版本号，不利于管理，当需要变更版本号的时候只需要在父类容器里更新，不需要任何一个子项目的修改；如果某个子项目需要另外一个特殊的版本号时，只需要在自己的模块dependencies中声明一个版本号即可。子类就会使用子类声明的版本号，不继承于父类版本号。
- 分析patent->pom.xml，存在如下代码
    ```xml
    <properties>
        <jeecgboot.common.version>2.1.0</jeecgboot.common.version>
        ......
    </properties>
    
    <!--在<dependencyManagement>中，制定了common模块的版本号-->
    <dependencyManagement>
		<dependencies>
			<!-- jeecg-boot-base-common -->
			<dependency>
	    		<groupId>org.jeecgframework.boot</groupId>
	    		<artifactId>jeecg-boot-base-common</artifactId>
	    		<version>${jeecgboot.common.version}</version>
	    	</dependency>
	    	......
	</dependencyManagement>
    ```
- **注意：`<dependencyManagement>`与`<dependencies>`区别：**
    1. Dependencies相对于dependencyManagement，所有生命在dependencies里的依赖都会自动引入，并默认被所有的子项目继承。
    2. dependencyManagement里**只是声明依赖，并不自动实现引入**，因此子项目需要显示的声明需要用的依赖。如果不在子项目中声明依赖，是不会从父项目中继承下来的；**只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项**，并且version和scope都读取自父pom；另外如果子项目中指定了版本号，那么会使用子项目中指定的jar版本。

- 只需要在`<dependencyManagement>`标签中，声明jm模块的依赖，那么在system模块中引入就不需要再指定版本号了


## swagger-ui分组设置
- 按照模块分组，在Swagger2Config.java中使用groupName()方法
- 分组前：
    ```java
    /**
     * swagger2的配置文件，这里可以配置swagger2的一些基本的内容，比如扫描的包等等
     *
     * @return Docket
     */
    @Bean
    public Docket createRestApi() {
    	return new Docket(DocumentationType.SWAGGER_2)
    			.apiInfo(apiInfo())
    			.select()
    			//此包路径下的类，才生成接口文档
    			.apis(RequestHandlerSelectors.basePackage("org.jeecg.modules"))
    			......
    }
    ```
- 分组后：
    ```java
    /**
     * swagger2的配置文件，这里可以配置swagger2的一些基本的内容，比如扫描的包等等
     *
     * @return Docket
     */
    @Bean
    public Docket createRestApi() {
    	return new Docket(DocumentationType.SWAGGER_2)
    			.apiInfo(apiInfo()).groupName("system模块")
    			.select()
    			//此包路径下的类，才生成接口文档
    			.apis(RequestHandlerSelectors.basePackage("org.jeecg.modules.system"))
    			......
    }
    
    /**
     * jm模块分组
     *
     * @return Docket
     */
    @Bean
    public Docket jmApi() {
    	return new Docket(DocumentationType.SWAGGER_2)
    			.apiInfo(apiInfo()).groupName("jm模块")
    			.select()
    			//此包路径下的类，才生成接口文档
    			.apis(RequestHandlerSelectors.basePackage("org.jeecg.modules.hello"))
                ......
    }
    ```


---

# ==Lesson11.数据权限上篇-编码方式==
> 开发文档-->系统权限用法-->数据权限

## 数据权限规则篇(文档)
- **功能说明**：列表数据权限，主要通过数据权限控制行数据，让不同的人有不同的查看数据规则；
    - 比如： 销售人员只能看自己的数据；销售经理可以看所有下级销售人员的数据；财务只看金额大于5000的数据等等；
- **数据权限分两大类型**
    序号 | 类型 | 规则字段区别 | 说明
    ---|---|---|---|
    1 | 编码方式 | 规则字段是驼峰写法，对应mybatis实体的字段 | 编码模式（通过代码生成器生成代码）
    2 | Online方式 | 规则字段是下划线写法，对应表的字段 | Online模式（在线表单模式，无代码）

> 规则字段配置说明（非常重要）： <br>
> ①条件规则：大于/大于等于/小于/小于等于/等于/包含/模糊/不等于<br>
> ②规则值：指定值 ( 固定值/系统上下文变量 )

- **数据权限规则篇**
    - 当前用户上下文变量，**配置写法为：#{sys_user_code}**
    - **建表规范**(系统标准字段)
- **. . . . . .**

## 系统数据权限用法(文档)
- A-1：新增权限菜单。(注意，每一个请求都对应一个数据权限菜单。所以**用B方法好一些**)
- A-2：配置数据权限规则，**规则字段对应的是实体类字段**
    - 比如授权查看(实体类字段为)`idcard`包含1的数据。则规则字段写`idcard`，条件规则写模糊，规则值写1
- A-3：角色授权
- A-4：后台请求加注解`@PermissionData`
- B-1-1：找到需要配置权限的页面菜单，复制前端组件的值
- B-1-2：直接在该菜单上配置数据规则。**规则字段对应的是表字段**
    - 比如授权查看(数据库字段为)`create_by`为当前登录人的数据。则规则字段写`create_by`，条件规则写等于，规则值写 **`#{sys_user_code}`**(当前登录人)
- B-2：角色授权
- B-3：添加注解，`@PermissionData(pageComponent="B-1复制的前端组件的值")`
- 如果A方法和B方法都配置，只会生效一个(如果选了B，A就无效)。


---

# ==Lesson12.数据权限下篇-Online表单==
> Online开发-->Online权限配置-->Online表单数据权限

## Online表单数据权限(文档)
- 进入online的demo表的信息维护界面,拿到url的ID：4028f6816a4f0a52016a4f0a52cc0000 配置权限菜单：
    - 菜单类型选择：按钮/权限 类型
    - 菜单路径配置为： `/online/cgform/api/getData/ + ID字符串`
- 配置数据规则。这里也可以使用上下文变量
- 授权


---

# ==Lesson13.CAS单点登录对接讲解==
> 开发文档-->CAS单点登录对接

## 1. CAS单点登录服务端准备(文档)
- 本页文档讲搭建CAS服务端，视频里没讲。自己看着文档搭。不搭的话不要写下面对接的代码，要不然登录时访问不到用户中心(空白页面)


## 2. JeecgBoot后端 对接CAS步骤(文档)
- 此页文档的步骤在v2.1.0全部都做好了。
    - 网盘代码在`system模块\...\modules\cas`中
- 第3步：yml的配置在dev|prod|test.yml都有，其实可以直接放在application.yml里面

## 3. JeecgBoot前端项目 对接CAS步骤(文档)
- 此页文档第5步(改造src/main.js代码)之前的步骤在v2.1.0全部都做好了。
    - 网盘代码在`src/cas`中
    - 登入登出的修改是为了使登入登出操作在'用户中心'进行
- 部分代码解读
    - sso.js是一个拦截，对登入进行预处理。改造main.js，使登录前先调用sso.js方法。
        ```js
        //src/main.js改造前：
        new Vue({
            router,
            store,
            mounted () {
              store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
              ......
            },
            render: h => h(App)
          }).$mount('#app')
        
        
        //src/main.js改造后：
        /**
         * 调用main之前先调用sso.init方法
         */
        // SSO.init(() => {
        //   main();
        // });
        // function main() {
          new Vue({
            router,
            store,
            mounted () {
              store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
              ......
            },
            render: h => h(App)
          }).$mount('#app')
        // }
        ```
    - sso.js代码
        ```js
        /**
         * 单点登录。
         * callback是main.js的main方法，验证成功时调callback走main方法
         */
        const init = (callback) => {
          console.log("-------单点登录开始-------");
          let token = Vue.ls.get(ACCESS_TOKEN);
          // st 百度'单点登录票据st'。
          let st = getUrlParam("ticket");
          var sevice = "http://"+window.location.host+"/";
          //首先判断有没有token。
          if(token){
            //有token说明登陆过，直接登录，根据token获取用户的信息。
            // 如果token是有效的则登录成功
            // 如果token是失效的则清除token，重新进入登录页面
            loginSuccess(callback);
          }else{
            //如果没有token，没有st，则先跳到服务中心。如果有st则说明是从服务中心跳过来的，开始验证。
            if(st){
              validateSt(st,sevice,callback);
            }else{
              var serviceUrl = encodeURIComponent(sevice);
              window.location.href = window._CONFIG['casPrefixUrl']+"/login?service="+serviceUrl;
            }
          }
          console.log("-------单点登录结束-------");
        };
        ```
- 24:00 视频里用户中心返回的用户id(username),返回这个就够了，知道是谁登录的就行了


---

# ==Lesson14.Online图表配置==

- 不是开源版的功能，看一遍视频行了
- 就是用json或sql(连接数据库查询)，生成报表或列表，用来看、打印、导出
    - 这种json和sql不能同时显示在一个页面  
- Online图标模板配置(官网叫 Online组合报表)，可以在一个页面显示json和sql配置的图表
    - 组合编码一样的话组合描述就会自动一样


### End
---







