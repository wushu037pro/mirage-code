## vue实例
#### 每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的
```
    var vm = new Vue({
      // 选项
    })
```
###### 虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

###### 在实例化Vue时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项，全部的选项可以在api中查看
------------------------------------
###### 每个Vue实例都会代理其data对象里所有的属性
```
    <div id="app1">
		{{a}}
	</div>
	
	var data = {a:1}
    	var app1 = new Vue({
    		el:'#app1',
    		data:data
    	});
    	
    	//app1.$data  获取到data的值
    	//app1.$el  获得整个div的DOM
    	
    	app1.$watch('a',function(newValue, oldValue){
    		console.log(newValue + ":" + oldValue)
    	});
```
###### app1.data === app1.$data => true
###### $watch 是一个实例方法，用于监视；Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问。
###### 用法：比如说商场的某个商品需要改变售价。

```
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```
###### 也有一些其它的钩子，在实例生命周期的不同阶段被调用，如 mounted、updated和destroyed。生命周期钩子的this上下文指向调用它的Vue实例。
###### 我们的逻辑都会写在生命周期的钩子里，在生命周期不同阶段做不同的事。