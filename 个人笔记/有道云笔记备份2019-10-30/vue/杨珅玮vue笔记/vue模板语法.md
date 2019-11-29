## vue模板语法
Vue.js使用了基于HTML的模板语法，允许开发者声明式地将DOM绑定至底层Vue实例的数据。所有Vue.js的模板都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析。
所以在不写vue实例的时候，页面不会报错。
<hr>
使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但是这会影响到该节点上的其它数据绑定：

```
    <span v-once>这个将不会改变: {{ msg }}</span>
```

<hr>

#### 原始HTML

双大括号会将数据解释为普通文本，而非HTML代码。为了输出真正的HTML，就需要使用v-html指令：

```
    <div id="app1">
		<div v-html="rawHtml"></div>
		<div>{{rawHtml}}</div>
	</div>
	
	var app1 = new Vue({
    	el:'#app1',
    	data:{
    		rawHtml:'<h1>abc</h1>',
    	}
    })
```

如果不使用v-html指令的话，会在页面中原样输出，不会转成HTML语言。

<hr>

Mustache 语法不能作用在HTML特性上，遇到这种情况应该使用v-bind指令:

```
    <div id="app2">
		<input type="checkbox" v-on:click="isChecked" />
		<button type="button" v-bind:disabled="isDisabled">my btn</button>
	</div>
	
	var app2 = new Vue({
		el:'#app2',
		data:{
			isDisabled:true
		},
		methods:{
			isChecked:function(evt){
				var chk = evt.target;
				if(chk.checked){
					this.isDisabled = false;
				}else {
					this.isDisabled = true;
				}
				console.log(evt.target)
			}
		}
	})
```

上面的例子的意思是，刷新页面完成时按钮不可点，当复选框被选中时，按钮生效。
关键点：isDisabled的属性，方法中传的参，指向鼠标事件

<hr>

实际上，对于所有的数据绑定，Vue.js都提供了完全的JavaScript表达式支持。


```
    <div id="app1">
		<div v-html="rawHtml"></div>
		<div>{{rawHtml}}</div>
		<div>{{num + 2}}</div>
		<div>{{arr.join('|')}}</div>
		<div v-bind:id="'list-' + num"></div>
		<div>文件拓展名是：{{fileName | getExt}}</div>
	</div>
	
	var app1 = new Vue({
		el:'#app1',
		data:{
			rawHtml:'<h1>abc</h1>',
			num:8,
			arr:[1,2,3,4,5],
			fileName:'abc.png'
		},
		filters:{
			getExt:function(val){
				console.log(val)
				return val.substr(val.indexOf('.'));
			}
		}
	})
```

上面的例子：<br>
{{num + 2}}说明可以在这里进行运算；<br>
对数组的方法{{arr.join('|')}}是把数组用管道符隔开（js也有类似的方法）；<br>
v-bind:id="'list-' + num"在页面中使用开发者工具，可以看到div显示的效果是id="list-8"<br> <br>

filters过滤器：vue允许自己定义过滤器，被用作一些常用的文本格式化。过滤器应该被添加在Mustache插值的尾部，由“管道符”指示。过滤器可以串联也可以接收参数<br>
Mustache是双括号的意思<br>

过滤器的基本语法和小例子如上

<hr>

#### 指令
指令 (Directives) 是带有 v- 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况)。<br>
指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

<hr>

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 特性：

```
    <a v-bind:href="url">...</a>
```

比如这句代码，如果后台传过来的url改变了的话，它相应的会改变为

```
    <a href="www.xxxx.com">...</a>
```

在这里 href 是参数，告知 v-bind 指令将该元素的 href 特性与表达式 url 的值绑定。<br>
再比如v-on 指令，用于监听 DOM 事件<br><br>

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```
    <a v-bind:[attributeName]="url"> ... </a>
```

表达式中不能出现引号和空格，并且要避免大写，因为浏览器会将它全部转换成小写

<hr>

#### 缩写
Vue 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：

v-bind缩写：
```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

v-on缩写：
```
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```