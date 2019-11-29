## vue计算属性
模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```
    <div id="example">
      {{ message.split('').reverse().join('') }}
    </div>
```

在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用计算属性。

<hr>

```
    <div id="app1">
		<p>{{msg}}</p>
		<p>{{rMsg}}</p>
	</div>
	
	var app1 = new Vue({
		el:'#app1',
		data:{
			msg:'Hello'
		},
		computed:{
			rMsg:function(){
				return this.msg.split('').reverse().join('') + Date.now();
			}
		}
	})
```

这是一个简单的例子，这里我们声明了一个计算属性 rMsg。我们提供的函数将用作属性 app1.rMsg 的 getter 函数。

也可以在页面中改变msg的值。值得注意的是：app1.rMsg的值始终取于app1.msg。

<hr>

#### 计算属性 vs 侦听属性

```
    <div id="app1">
		<p>{{msg}}</p>
		<p>{{rMsg}}</p>
		<!-- 方法要加括号 -->
		<p>{{getRmsg()}}</p>
		<button v-on:click="onClk">my btn</button>
	</div>
	
	var app1 = new Vue({
    	el:'#app1',
    	data:{
    		msg:'Hello'
    	},
    	computed:{
    		rMsg:function(){
    			return this.msg.split('').reverse().join('') + Date.now();
    		}
    	},
    	methods:{
    		getRmsg:function(){
    			return this.msg.split('').reverse().join('') + Date.now();
    		},
    		onClk:function(){
    			//计算属性是被缓存的,如果没有改变,就一直是之前的值
    			console.log(this.rMsg)
    			console.log(this.getRmsg())
    		}
    	}
    })
```

上面的例子是对计算属性缓存的测试，首先写一个方法，发现两者的效果是一样的。
写一个按钮，令他触发点击事件并打印。其中在每个msg后面加上一个时间戳，也就是Date.now()。

多次点击按钮的时候会发现计算属性的时间戳不会改变，但是方法里的时间戳每次都不一样。说明计算属性是会被缓存的，如果不进行修改，他的结果就不会被改变。

说明：我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。

<hr>

#### 计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。

```
    <div id="demo">{{ fullName }}</div>
    
    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      watch: {
        firstName: function (val) {
          this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
          this.fullName = this.firstName + ' ' + val
        }
      }
    })
```

我们会发现上面的代码是命令式且重复的。将它与计算属性的版本进行比较：

```
    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
      }
    })
```

很明显的可以发现代码简介了很多，并且更加容易去理解。

<hr>

#### 计算属性的 setter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```
    // ...
    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
    // ...
```

现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

<hr>

#### 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

除了 watch 选项之外，还可以使用命令式的 vm.$watch API。

例子和测试可以去vue.js的api上进行调试