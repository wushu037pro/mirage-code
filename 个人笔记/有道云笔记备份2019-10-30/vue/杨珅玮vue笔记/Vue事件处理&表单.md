## Vue样式&条件&列表渲染
操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是属性，所以我们可以用 v-bind 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

<hr>

#### 对象语法

我们可以传给 v-bind:class 一个对象，以动态地切换 class：

```
    <div id="app1">
		<div class="static" v-bind:class="{active: isActive, 'text-danger': danger}">abc</div>
		<div v-bind:class="classObj">def</div>
	</div>
	
	var app1 = new Vue({
		el:'#app1',
		data:{
			isActive:true,
			danger:true,
			classObj:{
				'red-bg':true,
				f24:true
			}
		}
	})
```

上面的例子是说：第一个div表示 active 这个 class 存在与否将取决于数据属性 isActive 的 truthiness。

也可以在对象中传入更多属性来动态切换多个 class。此外，v-bind:class 指令也可以与普通的 class 属性共存。就像第一个div中同时存在active属性和'text-danger'属性和普通的static属性。

结果渲染为：

```
    <div class="static active text-danger">abc</div>
```



当 isActive 或者 danger 变化时，class 列表将相应地更新。例如，如果 danger 的值为 false，class 列表将变为 "static active"。

绑定的数据对象不必内联定义在模板里,就像第二个div一样，在data对象里对classObj进行操作，现在的结果渲染为：

```
    <div class="red-bg f24">def</div>
```

<hr>

也可以在这里绑定一个返回对象的计算属性。这是一个常用且强大的模式：

```
    <div v-bind:class="classObject"></div>
    
    data: {
      isActive: true,
      error: null
    },
    computed: {
      classObject: function () {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal'
        }
      }
    }
```

因为计算属性是一个对象，所以return的值也是一个对象。

<hr>

#### 数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 class 列表：

```
    <div id="app1">
		<div class="static" v-bind:class="{active: isActive, 'text-danger': danger}">abc</div>
		<div v-bind:class="classObj">def</div>
		<div v-bind:class="[myCls1,myCls2]">hij</div>
		<div v-bind:class="[isActive ? myCls1 : myCls2]">klm</div>
	</div>
	
	var app1 = new Vue({
		el:'#app1',
		data:{
			isActive:false,
			danger:true,
			classObj:{
				'red-bg':true,
				f24:true
			},
			myCls1:'cls1',
			myCls2:'cls2'
		}
	})
```

第三个div会被渲染为：

```
    <div class="cls1 cls2">hij</div>
```

第四个div是用三元表达式切换列表的class，当isActive为true的时候，第四个div会被渲染为：

```
    <div class="cls1">klm</div>
```

当isActive为false的时候，第四个div会被渲染为：

```
    <div class="cls2">klm</div>
```

也可以把上面的三元表达式写成计算属性computed

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

```
    <div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

<hr>

#### 用在组件上

当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。

例如，如果你声明了这个组件：

```
    Vue.component('my-component', {
      template: '<p class="foo bar">Hi</p>'
    })
```

然后在使用它的时候添加一些 class：

```
    <my-component class="baz boo"></my-component>
```

HTML 将被渲染为:

```
    <p class="foo bar baz boo">Hi</p>
```

对于带数据绑定 class 也同样适用：

```
    <my-component v-bind:class="{ active: isActive }"></my-component>
```

<hr>

## 绑定内联样式

#### 对象语法

v-bind:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```
    <div id="app2">
		<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">zxc</div>
	</div>
	
	var app2 = new Vue({
		el:'#app2',
		data:{
			activeColor: 'red',
			fontSize: 30
		}
	})
```

上面会把div渲染成：

```
    <div style="color: red; font-size: 30px;">zxc</div>
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```
    <div id="app2">
		<div v-bind:style="styleObject">qbz</div>
	</div>
	
	var app2 = new Vue({
		el:'#app2',
		data:{
			styleObject: {
				color: 'red',
				fontSize: '13px'
			}
		}
	})
```

上面会把div渲染成：

```
    <div style="color: red; font-size: 13px;">qbz</div>
```

同样的，对象语法常常结合返回对象的计算属性使用。

<hr>

#### 数组语法

v-bind:style 的数组语法可以将多个样式对象应用到同一个元素上：

```
    <div v-bind:style="[baseStyles, overridingStyles]"></div>
```

#### 自动添加前缀

当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

#### 多重值

从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

<hr>

## 条件渲染

### v-if

v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

说明：truthy 值不是true，在 JavaScript 中，truthy（真值）指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 false、0、""、null、undefined 和 NaN 以外皆为真值）。

放个例子：

```
    <div id="app1">
		<h1 v-if="ok">abc</h1>
		<h1 v-else>qwe</h1>
	</div>
		
	var app1 = new Vue({
		el:'#app1',
		data:{
			ok:false
		}
	})	
```

上面的例子是说，当ok的值为true时，会显示abc，否则会显示qwe。

<hr>

#### 在 <template> 元素上使用 v-if 条件渲染分组

因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素。

```
    <div id="app1">
		<h1 v-if="ok">abc</h1>
		<h1 v-else>qwe</h1>
		
		<template v-if="ook">
			<h1>test1</h1>
			<h2>test2</h2>
			<h3>test3</h3>
		</template>
	</div>
	
	var app1 = new Vue({
		el:'#app1',
		data:{
			ok:false,
			ook:true
		}
	})
```

如果template没有v-if标签的话是会全部展示的，并且会发现不会显示template标签；当ook为false时，整个template标签内的元素都不会显示。

#### v-else

也可以使用 v-else 指令来表示 v-if 的“else 块”：

```
    <div v-if="Math.random() > 0.5">
		你对象呢？
	</div>
	<div v-else>
		不，你没有
	</div>
```

v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。

#### v-else-if(2.1.0新增)

v-else-if，顾名思义，充当 v-if 的“else-if 块”，可以连续使用：

```
    <div v-if="type === 'A'">
        A
    </div>
    <div v-else-if="type === 'B'">
        B
    </div>
    <div v-else-if="type === 'C'">
        C
    </div>
    <div v-else>
        Not A/B/C
    </div>
```

类似于 v-else，v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后。

#### v-show

另一个用于根据条件展示元素的选项是 v-show 指令。用法大致一样：

```
    <h1 v-show="ok">Hello!</h1>
```

不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。

也就是说在上面的例子中，当ok的值为false时，页面的属性会被渲染为这样子：

```
    <h1 style="display: none;">Hello!</h1>
```

注意，v-show 不支持 <template> 元素，也不支持 v-else。

#### v-if vs v-show

v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

#### v-if 与 v-for 一起使用

不推荐同时使用 v-if 和 v-for(永远不要把 v-if 和 v-for 同时用在同一个元素上)。

当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。

<hr>

## 列表渲染

#### 用 v-for 把一个数组对应为一组元素

说明：v-for的基本用法，在vue实例中使用过，下一条。

在 v-for 块中，我们可以访问所有父作用域的属性。v-for 还支持一个可选的第二个参数，即当前项的索引。

```
    <ul id="example-2">
		<li v-for="(item, index) in items">
			{{ parentMessage }} - {{ index }} - {{ item.message }}
		</li>
	</ul>
	
	var example2 = new Vue({
		el: '#example-2',
		data: {
			parentMessage: 'Parent',
			items: [
				{ message: 'Foo' },
				{ message: 'Bar' }
			]
		}
	})
```

上面例子的运行结果是：

```
    Parent - 0 - Foo
    Parent - 1 - Bar
```

也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

```
    <div v-for="item of items"></div>
```

<hr>

#### 在 v-for 里使用对象

你也可以用 v-for 来遍历一个对象的属性。

```
    <ul id="v-for-object" class="demo">
		<li v-for="(value, name, index) in object">
			{{ index + 1}}. {{ name }}: {{ value }}
		</li>
	</ul>
	
	new Vue({
		el: '#v-for-object',
		data: {
			object: {
			title: 'How to do lists in Vue',
			author: 'Jane Doe',
			publishedAt: '209-08-19 23:52:18'
			}
		}
	})
```

上面的例子的意思是：v-for中可以传三个参数，定义的要和下面对起来，分别是，属性值、键名和索引，会在页面中把data中的数据遍历出来，其中，双大括号内可以进行计算（模板语法中有说过）。

在遍历对象时，会按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。

#### 维护状态

当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个类似 Vue 1.x 的 track-by="$index"。

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性：

```
    <div v-for="item in items" v-bind:key="item.id">
        <!-- 内容 -->
    </div>
```

建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 Vue 识别节点的一个通用机制，key 并不仅与 v-for 特别关联。后面我们将在指南中看到，它还具有其它用途。

###### 不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。

------------------

#### 数组更新检测

##### 变异方法 (mutation method)

Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

push()<br>
pop()<br>
shift()<br>
unshift()<br>
splice()<br>
sort()<br>
reverse()<br>

你可以打开控制台，然后对前面例子的 items 数组尝试调用变异方法。比如 example1.items.push({ message: 'Baz' })。

##### 替换数组

变异方法，顾名思义，会改变调用了这些方法的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如 filter()、concat() 和 slice() 。它们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

```
    example1.items = example1.items.filter(function (item) {
    return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

##### 注意事项

由于 JavaScript 的限制，Vue 不能检测以下数组的变动：

1.当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue <br>
2.当你修改数组的长度时，例如：vm.items.length = newLength <br>
举个例子：

```
    var vm = new Vue({
        data: {
            items: ['a', 'b', 'c']
        }
    })
    vm.items[1] = 'x' // 不是响应性的
    vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将在响应式系统内触发状态更新：

```
    // Vue.set
    Vue.set(vm.items, indexOfItem, newValue)
```

```
    // Array.prototype.splice
    vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名：

```
    vm.$set(vm.items, indexOfItem, newValue)
```

为了解决第二类问题，你可以使用 splice：

```
    vm.items.splice(newLength)
```

<hr>

## 对象变更检测注意事项

由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除:

```
    var vm = new Vue({
        data: {
            a: 1
        }
    })
    // `vm.a` 现在是响应式的
    
    vm.b = 2
    // `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。例如，对于：

```
    var vm = new Vue({
        data: {
            userProfile: {
            name: 'Anika'
            }
        }
    })
```

可以添加一个新的 age 属性到嵌套的 userProfile 对象：

```
    Vue.set(vm.userProfile, 'age', 27)
```

你还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名：

```
    vm.$set(vm.userProfile, 'age', 27)
```

有时你可能需要为已有对象赋值多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：

```
    Object.assign(vm.userProfile, {
        age: 27,
        favoriteColor: 'Vue Green'
    })
```

你应该这样做：

```
    vm.userProfile = Object.assign({}, vm.userProfile, {
        age: 27,
        favoriteColor: 'Vue Green'
    })
```

<hr>

#### 显示过滤/排序后的结果

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际改变或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

例如：

```
    <li v-for="n in evenNumbers">{{ n }}</li>
```

```
    data: {
        numbers: [ 1, 2, 3, 4, 5 ]
    },
    computed: {
        evenNumbers: function () {
            return this.numbers.filter(function (number) {
            return number % 2 === 0
            })
        }
    }
```

在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个方法：

```
    <li v-for="n in even(numbers)">{{ n }}</li>
```

```
    data: {
        numbers: [ 1, 2, 3, 4, 5 ]
    },
    methods: {
        even: function (numbers) {
            return numbers.filter(function (number) {
            return number % 2 === 0
            })
        }
    }
```

<hr>

#### 在 v-for 里使用值范围

v-for 也可以接受整数。在这种情况下，它会把模板重复对应次数。

```
    <div id="app1">
		<span v-for="n in 10">{{ n }} </span>
	</div>
	
	var app1 = new Vue({
		el:'#app1'
	})
```

运行结果是：1 2 3 4 5 6 7 8 9 10

<hr>

#### 在 <template> 上使用 v-for

类似于 v-if，你也可以利用带有 v-for 的 <template> 来循环渲染一段包含多个元素的内容。比如：

```
    <ul id="example-2">
		<template v-for="item in items">
			<li>{{ item.message }}</li>
			<li class="divider" role="presentation"></li>
		</template>
	</ul>
	
	var example2 = new Vue({
		el: '#example-2',
		data: {
			parentMessage: 'Parent',
			items: [
				{ message: 'Foo' },
				{ message: 'Bar' }
			]
		}
	})
```

上面的例子每次会生成两个div，会被渲染成：

```
    <li>Foo</li>
    <li role="presentation" class="divider"></li>
    <li>Bar</li>
    <li role="presentation" class="divider"></li>
```

<hr>

#### v-for 与 v-if 一同使用

注意我们不推荐在同一元素上使用 v-if 和 v-for。

当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用，如下：

```
    <li v-for="todo in todos" v-if="!todo.isComplete">
        {{ todo }}
    </li>
```

上面的代码将只渲染未完成的 todo。

而如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 <template>)上。如：

```
    <ul v-if="todos.length">
        <li v-for="todo in todos">
            {{ todo }}
        </li>
    </ul>
    <p v-else>No todos left!</p>
```

<hr>

#### 在组件上使用 v-for

在自定义组件上，你可以像在任何普通元素上一样使用 v-for 。

```
    <my-component v-for="item in items" :key="item.id"></my-component>
```

###### 2.2.0+ 的版本里，当在组件上使用 v-for 时，key 现在是必须的。

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 prop：

```
    <my-component
        v-for="(item, index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.id"
    ></my-component>
```

不自动将 item 注入到组件里的原因是，这会使得组件与 v-for 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。