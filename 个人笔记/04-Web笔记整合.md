
#-----------------------------------Web.day01_HTML01------------------------------------

刘国斌  qq：77331283

###课程介绍
####web前端
1. html：搭建页面结构和内容 
2. css：  用于美化页面
3. JavaScript： 用于给页面添加动态效果和动态内容
4. jQuery： JavaScript的框架用于简化JavaScript代码

###HTML
- Hyper Text Mark Language：超文本标记语言，超文本指不仅仅是文本还包括：文本样式和多媒体(图片、音频、视频)相关
- 学习html主要学习的就是有哪些标签，标签有哪些属性，标签和标签间的嵌套关系 

###创建html
- 新建文件->other 搜索 html 

####HTML结构

		<!DOCTYPE html><!-- 文档声明：
		用于告诉浏览器使用html哪个版本的标准解析页面 
		此写法代表使用html5的标准去解析-->
		<html><!-- 根标签，除了文档声明所有内容都在里面 -->
			<head><!-- 头部：里面的内容都是给浏览器看的 -->
				<meta charset="UTF-8"><!-- 页面字符集 -->
				<title>第一个页面</title><!-- 页面标题 -->
			</head>
			<body><!-- 体部：里面的内容是给用户看的 -->
			</body>
		</html>

####body内部的常用标签
1. 内容标题标签  ：  h1-h6   字体大小不同    align：left/center/right ，独占一行
2. 段落标签:  p   ,上下会留有空白  ，独占一行
3. hr:水平分割线
4. br：换行 

###列表标签
1. 无序列表 
	
		<h3>无序列表</h3>
		<!-- type:类型，指图标类型 -->
		<ul type="square"><!-- unordered list 无序 列表 -->
			<li>刘备</li><!-- list item 列表项-->
			<li>孙尚香</li>
			<li>貂蝉</li>
			<li>吕布</li>
			<li>大乔</li>
		</ul>
2. 有序列表

		<h3>有序列表</h3>
		<!-- type序号类型，start起始值 reversed降序 -->
		<ol type="1" start="5" reversed="reversed"><!-- ordered list 有序 列表 -->
			<li>打开冰箱门</li>
			<li>把大象装进去</li>
			<li>关上冰箱门</li>
		</ol>
3. 定义列表：自带层级关系

		<h3>定义列表</h3>
		<dl><!-- definition list 定义列表 -->
			<dt>凉菜</dt><!-- definition term定义术语 -->
			<!-- definition description定义描述 -->
			<dd>拍黄瓜</dd>
			<dd>五彩拉皮</dd>
			<dd>花毛一体</dd>
			<dt>炒菜</dt>
			<dd>锅包肉</dd>
			<dd>宫保鸡丁</dd>
			<dd>小炒肉</dd>
		</dl>
4. 列表嵌套：有序列表和无序列表可以任意嵌套，并且可以嵌套n层

####练习：
1. Java基础
	变量
	数据类型
	运算符
	流程控制
		if
		switch	
		while
		for
2. Java面向对象
3. JavaAPI

###分区元素(标签)
	分区元素可以理解为容器，用于装各种标签，作用是对多个标签进行统一管理和代码的复用
- div： 独占一行
- span： 共占一行
- 一般页面都会分为三个大区：
	<div>头部</div>
	<div>内容</div>
	<div>脚部</div>
- 在html5标准中提供了几个分区元素 作用和div一样
	<header>头部</header>
	<article>内容</article>
	<footer>脚部</footer>
###元素分类
1. 块级元素：独占一行
	div, h1-h6 , p ,hr 
2. 行内元素: 共占一行 
	span ,  <strong>加粗</strong>和<b>加粗</b>, 
	<em>斜体</em>和<i>斜体</i>, <u>下划线</u> ,<del>删除线</del>和<s>删除线</s>

###空格折叠问题
	
	多个空格只能识别出来一个  需要使用 &nbsp;

###常见的特殊字符

	空格：&nbsp;
	换行:<br>
	小于号：&lt;
	大于号：&gt;


###图片标签 img
- 图片标签属于单标签
- 相关属性：
1. alt：当图片不能正常显示时显示此文本
2. src：图片路径：a.同级目录直接写图片名  b.下级目录先写文件夹名称/图片名 c. 上级目录 ../图片名   d.站外资源(盗链) 节省本站资源但是存在找不到图片的风险
3. title:当鼠标在图片上悬停时显示的文本内容
4. width/height: 1.通过像素赋值  2. 通过百分比赋值
###图像地图


- href：值是一个路径，可以指向页面(站内或站外) ，还可以指向文件（如果浏览器支持浏览此文件则直接浏览如果不支持则下载）
####练习：
 				个人简历  h1
基本信息			h3
姓名：xxx			p
年龄：xx				p

个人经历    h3
1. xxxxxx         有序列表
2. xxxxxx

喜欢的明星   h3
歌星				  定义列表
	xxx
	xxx
影星
	xxx
	xxx
女朋友们    h3
一行显示三张图片 点击中间的图片跳转到tmooc页面


###课程回顾：
1. h1-h6  字体由大到小   独占一行
2. p 段落标签  独占一行
3. hr 水平分割线
4. br 换行
5. 列表标签
- 无序列表   ul（type）    li 
- 有序列表  ol（type start reversed）  li 
- 定义列表  dl  dt  dd
- 列表嵌套  有序无序无限嵌套
6. 分区元素   div和span    h5：header article footer   /html5里才有这三个标签
7. 元素分类 
- 块级元素：独占一行  包括：div h1-h6 p  hr
- 行内元素：共占一行  包括：span  strong和b  del和s  em和i u
8. 图片 img   alt：图片不能正常显示时显示的文本  src路径   title鼠标在图片上悬停时显示的内容  width和height 两种赋值方式：1.像素 2.百分比 
9. 图片地图  map name    area（shape形状（circle、rect） coords href路径）


#--------------------------------Web.day02_HTML02&CSS01---------------------------------


###超链接 a
- 可以实现文本超链接和图片超链接
- 如果不加href属性 则就是纯文本
- href：资源路径 可以指向页面 可也以指向资源文件（能浏览则浏览不能浏览则下载）
- target:_blank   在**空白页显示新页面**
- 锚点的使用： 需要先创建一个空白的锚  然后通过另外一个a标签跳转
	
	<a id="top"></a> //锚
	<a href="#top">回到顶部</a>
###表格标签table
- table  tr   td
- table属性： border边框粗细单位是px像素 ， cellspacing:单元格的间距和单元格与边框的间距， cellpadding：单元格与内容的距离 
- td属性： rowspan跨行   colspan跨列 
- caption标签  标题   <th> 表头 内容加粗
- 分组标签：<thead> <tbody> <tfoot> 没有显示效果 作用和div类似
###表单 form
- 用于获取用户的数据，提交到服务器
- 学习form表单主要学习如何使用表单中的各种控件：文本框、密码框、提交按钮、单选、多选、下拉选、日期选择器、文件选择器、文本域等

		<!-- action:提交地址 
		method提交方式：get（默认）将请求参数放在请求地址的后面、
		post是将请求参数放在请求体里面 -->
		<form action="http://www.tmooc.cn" 
			method="get">
			<!-- placeholder：占位文本
			name:作为传递参数的key，
			必须写 不写则不会传递该参数 
			value:设置初始默认值
			maxlength:设置最大长度
			readonly:只读
			-->
			用户名：<input type="text" 
				placeholder="请输入用户名" 
				name="username"
				value="abc"
				maxlength="5"
				readonly="readonly"><br>
			密码：<input type="password" 
					name="password"
					placeholder="请输入密码"><br> 
			性别：<input type="radio" name="gender"
			 value="nan" id="nan"> 
			<label for="nan">男</label>  
			<!-- checked 默认选中 -->
			<input type="radio" name="gender" 
			value="nv" id="nv" checked="checked"><label for="nv">女</label>
			
			<br>兴趣爱好：
			<input type="checkbox" name="hobby" value="lq">打篮球
			<input type="checkbox" name="hobby" value="code" checked="checked">撸代码
			<input type="checkbox" name="hobby" value="wz">王者农药
			<!-- 日期选择器 -->
			<br>生日：<input type="date" name="birthday">
			<!-- 文件选择器 -->
		 	<br>靓照：<input type="file" name="pic">
		 	<!-- 下拉选 -->
		 	<br>所在城市：
		 		<select name="city">
		 			<option>请选择</option>
		 			<option value="bj" 
		 				selected="selected">北京</option>
		 			<option value="sh">上海</option>
		 			<option value="gz">广州</option>
		 		</select>
		 		<!-- 文本域 -->
		 	<br>个人简介：
		 	<textarea rows="3" cols="20" name="intro">这家伙很懒，什么都没留下。。。</textarea>
		 	<!-- 隐藏域 当需要给服务器传递
		 		某些不需要给用户展示的信息时使用 -->
		 	<input type="hidden" name="xxx" value="yyy">
			<br><input type="submit" value="注册">
			<input type="reset" value="重写">  
			<input type="button" value="自定义按钮"> 
		</form>


/// form表单  form:action  method:get/post   文本框 input type:text name placeholder maxlength readonly value,密码框 type:password  ,单选 radio  checked ，多选 checkbox checked ，日期选择器 date ，文件选择器 file，隐藏域 hidden ，提交按钮 submit，重置按钮 reset，自定义按钮 button， 文本域 textarea：cols rows  下拉选 select：name  option：value

###CSS
- Casecading Style Sheet： 层叠样式表 用于美化页面。
####如何在html页面中引入css
1. 内联样式：在标签内部的style属性中写样式代码，弊端：不能多标签复用
2. 内部样式：在head标签内部添加 style标签 在标签体内写样式代码， 好处可以当前页面多个元素复用样式，弊端：不能多页面复用
3. 外部样式：写在单独的css文件中

###课程回顾
1. 超链接 a：href   target="_blank"     锚点
2. 表格标签 table:border cellspacing cellpadding  tr td:rowspan colspan  th  caption  thead  tbody tfoot
3. form表单  form:action  method:get/post   文本框 input type:text name placeholder maxlength readonly value,密码框 type:password  ,单选 radio  checked ，多选 checkbox checked ，日期选择器 date ，文件选择器 file，隐藏域 hidden ，提交按钮 submit，重置按钮 reset，自定义按钮 button， 文本域 textarea：cols rows  下拉选 select：name  option：value
4. css：层叠样式表 ，美化页面 


#-----------------------------------Web.day03_CSS02-------------------------------------


###CSS引入方式

- 内联样式：在标签内部的style属性里面写样式代码，弊端：不能复用
- 内部样式：在head标签里面添加style标签在标签体内写样式代码，好处是能在当前页面内复用样式，弊端：不能多页面复用
- 外部样式：在单独的css文件中写样式代码，在页面的head标签里面通过link标签引入css文件，好处：可以多页面复用

###CSS引入方式的优先级
- 内联优先级最高
- 内部和外部优先级相同，后执行的会覆盖前面执行的。

###CSS的选择器
1. 标签名选择器    标签名{}  需要选择页面中所有某种标签时使用
2. id选择器      #id{}   需要选择页面中某一个元素时使用
3. 类选择器      .class{}  需要选择页面中某一类元素时使用
4. 分组选择器    #abc,.xyz,h1{}  页面中多个选择器对应的元素需要统一设置样式时
5. 属性选择器   标签名[属性名='属性值']{}
6. 子孙后代选择器    举例： div p{} 获取div里面出现的所有的p标签
7. 子元素选择器   举例:div>p{}  获取div里面的下一级(子元素)p标签

###选择器（续）/下午
8. 伪类选择器
	用于选择元素的状态
- 未访问状态： a:link
- 访问过状态:  a:visited
- 鼠标悬停状态: a:hover
- 点击状态:  a:active
9. 任意元素选择器  *{}

###颜色赋值方式
	三原色rgb（红 绿 蓝）  每个颜色取值范围0-255   
1. 通过颜色单词的方式赋值
2. 通过6位16进制方式赋值   #ff0000红 #00ff00绿 #0000ff蓝 #000000黑 #ffffff白   #ffff00黄  #ff00ff紫
3. 通过3位16进制赋值  #f00红   #0f0绿   
4. 通过3位10进制赋值  rgb(255,0,0)红
5. 通过4位10进制赋值  rgba(255,0,0,0-1)    a=alpha(透明度)  / 值越小越透明

###背景图片
1. background-image：url(路径) 设置背景图片
2. background-size: 100px 200px 设置背景图片的尺寸	/ 100px 200px 设置宽100px 高200px
3. background-repeat: no-repeat  禁止重复
4. background-position: 控制位置 1.通过单词 top、bottom、left、right、center控制位置  2. 通过百分比控制

###布局相关样式（盒子模型）
- 控制元素在页面显示的位置和大小
- 盒子模型包括： 外边距、边框、内边距、宽高
/ - 计算元素所占宽度公式：左外边距+左边框+左内边距+宽度+右内边距+右边框+右外边距
1. 宽高： width、height
- 块级元素可以修改宽高、行内元素不可以直接修改宽高只能由内容决定宽高
2. 外边距：指元素距上级元素边框的距离或相邻兄弟元素边框的距离    / margin-left/right/bottom/top
- 块级元素外边距全部生效，行内元素上下不生效
	margin-left/right/top/bottom: 10px; 一个方向
	margin: 10px; 四个方向全部10px
	margin: 10px 20px; 上下10 左右20px
	margin: 0 auto; 上下0 左右居中		/auto 自动
	margin: 10px 20px 30px 40px;上右下左 顺时针
- 粘连问题: 当元素的上边缘和上级元素的上边缘重叠时，给元素添加上外边距会出现粘连问题，通过在上级元素中添加 overflow:hidden解决

- 块级元素上下相邻，同时添加上外边距和下外边距，取最大值	/块级元素外边距全部生效,上下相邻取最大值
- 行内元素左右相邻，同时添加左外边距和右外边距，两者相加	/行内元素上下外边距没有效果,左右相邻两值相加
3. 边框： border，可以给元素的任意方向添加边框
	border-left/right/top/bottom：  一个方向赋值
	border: 10px solid red; 四个方向赋值		/ border:粗细 样式 颜色;
- 块级元素边框全部生效，会影响元素所占宽高
- 行内元素边框全部生效，会影响元素的宽但不影响元素的高


###代码介绍：
demo01: css的三种引入方式, 标签名选择器、id选择器
demo02: 类选择器、分组选择器、属性选择器
demo03: 上面内容的练习
demo04: 子孙后代选择器和子元素选择器
demo05： 子孙后代选择器和子元素选择器 练习
demo06: 伪类选择器 任意元素选择器
demo07: 颜色的赋值方式
demo08: 设置背景图片相关
demo09: 盒子模型之宽高+外边距
demo10: 外边距粘连问题，和相邻元素外边距相加还是取最大值的问题
demo11: 盒子模型之边框

###内容回顾：
	......因为案例代码都在eclipse里，回顾基本和上边的笔记写的一样，已合并到上边


#-----------------------------------Web.day04_CSS03-------------------------------------

###课程回顾：
	......

####内边距
- 元素边框距内容的距离 padding    赋值方式和margin一样
- 如果移动元素的文本内容，只能通过修改内边距的方式，记住修改内边距会影响元素的宽高
- 如果移动元素的子元素，可以有两种方式：1. 给大的添加内边距（会影响元素的宽高） 2.给小的添加外边距（推荐）
- 块级元素内边距全部生效，会影响元素的宽高
- 行内元素内边距全部生效，会影响元素所占宽度但不影响高度

###文本相关样式
- 设置对齐方式  text-align:left/right/center
- 文本修饰 text-decoration:overline/underline/line-through/none
- 文本颜色 color:red
- 文本阴影 text-shadow:颜色 x偏移值 y偏移值 模糊度值越小越清晰

- 行高： line-height:20px  用于垂直居中	/demo02 每行所占的高度。
	/文本默认就是上下居中的，在demo02中去掉行高设置后上下不居中，是因为文本有自己的高度，占的并不是上级元素的高度，文本在自己的高度里已经上下居中了。要想让他在div中居中，需要将行高改成div的高度，这样他会在新的行高进行居中
- 设置圆角 border-radius: 10px  值越大越圆

###字体相关样式
- 字体大小 font-size:10px;
- 字体加粗 font-weight:bold/normal;	/normal正常的  取消加粗
- 斜体  font-style:italic 
- 字体名称 font-family: xxx,xxx,xxx; 字体名 可以写多个，能用哪个用哪个

###溢出设置 overflow
- visible 显示(默认)
- hidden 隐藏  可以解决粘连问题
- scroll 滚动显示 

###元素的显示方式 display
- 块级元素默认值为 block, 独占一行 可以修改宽高
- 行内元素默认值为 inline, 共占一行 不能修改宽高
- 行内块  inline-block, 共占一行 可以修改宽高

###课程回顾：
	......因为案例代码都在eclipse里，回顾基本和上边的笔记写的一样，已合并到上边


#-----------------------------------Web.day05_CSS04-------------------------------------

###课程回顾
	......

###定位方式 position
####文档流定位(静态定位) static
- 默认的定位方式，块级元素从上到下，行内元素从左向右 ，通过外边距移动元素
####相对定位 relative
- 元素不会脱离文档流，元素通过left/right/top/bottom让元素从原来位置进行位置偏移 
- 应用场景：当元素需要从初始位置进行位置偏移时，使用相对定位
####绝对定位 absolute
- 元素会脱离文档流，元素通过left/right/top/bottom让元素相对于窗口(html)进行位置偏移或相对于某一个做了非static定位（建议使用relative相对定位）的祖先元素，如果多个祖先元素做了相对定位则就近原则 
- 应用场景，当元素需要脱离文档流，并且在某一个元素范围内做位置偏移时使用绝对定位
####固定定位 fixed
- 脱离文档流，元素通过left/right/top/bottom让元素相对于窗口(html)进行位置偏移
- 应用场景：当元素需要固定在窗口的某个位置，并且不会随着内容滚动而改变位置时使用固定定位


##课程回顾：
1. 静态定位（文档流定位） position:static, 块级元素从上到下，行内从左到右
2. 相对定位：不脱离文档流，坐标相对于初始位置 
3. 绝对定位：脱离文档流，坐标相对于窗口或某个祖先元素（做了非static定位）
4. 固定定位： 脱离文档流，坐标相对于窗口


####浮动定位 float
- 脱离文档流， 元素可以从当前所在行向左或向右浮动，到上级元素边缘或其它浮动元素边缘时停止
- 一行浮动元素装不下的话会自动转到下一行，有被卡住的可能性
- 如果元素浮动了，后面的元素会顶上来，如果不希望顶上来，在后面的元素上添加clear属性，值为left/right/both
- 应用场景：当多个纵向排列的元素需要改成横向排列时使用浮动定位
- 当元素的所有子元素全部浮动，则自动识别的高度为0，通过给元素添加overflow：hidden解决

####行内元素的垂直对齐方式
- vertical-align：top/middle/bottom/baseline(默认)

###CSS的三大特性
1. 继承性：子元素可以继承祖先元素的部分属性，只能继承color/font-开头/text-开头/line-开头，不仅子元素可以继承，所有后代元素都可以继承
- 个别元素自带效果不受继承的影响， 比如超链接的字体颜色，和h1-h6的字体大小
2. 层叠性：不同的选择器指向同一个元素并且设置不同的样式时，样式全部层叠到一起全部生效，如果是相同的样式时由优先级决定
3. 优先级： 作用范围越小优先级越高  id选择器>类选择器>标签名
- 直接选中优先级大于间接选中（继承）  


#------------------------------Web.day06_HTML&CSS课程总结--------------------------------


###HTML&CSS课程总结
####day01
1. html 超文本标记语言， 搭建页面结构和内容
2. 内容标题：h1-h6 
3. 段落标签 p
4. 水平分割线hr  换行br
5. 列表：  
- 无序列表   ul li   
- 有序列表   ol li
- 定义列表   dl  dt  dd
- 列表嵌套 可以有序无序无限嵌套
6. 分区元素  div 独占一行  span    h5： header article footer
7. 元素分类： 块级元素：div h1-h6 p hr  和行内元素 span  strong和b em和i  u   del和s  
8. 图片 img：  alt（图片不能正常显示的时候显示此文本） src（图片的路径，相对路径 同级直接写名字 上级../图片名 下级文件夹名/图片名  绝对路径：指向站外资源（盗链） ） title（当鼠标悬停时显示的文本） width、height 
9. 图像地图：map   name（唯一标识）  area：shape（circle和rect） coords（圆形三个值圆心坐标和半径，rect四个值 对角线两个点的坐标）  href（路径 指向页面或文件（能浏览则浏览不能浏览则下载））   <img usemap="");
####day02
1. 超链接 a   <a href  target="_blank">xxx</a>   锚点使用  
2. 表格 table：border cellspacing   cellpadding    tr  td：rowspan colspan  th   caption   thead  tbody  tfoot 
3. 表单 form： action 提交地址  method：get/post  
- input type="text/password/radio/checkbox/date/file/hidden/submit/button/reset" placeholder readonly name value checked
- select: name    <option value="a">aaaa</option>
- textarea: cols rows  name 
####day03
1. css 层叠样式表  ，用于美化html搭建的页面
2. 三种引入方式：
- 内联：在标签的style属性里面写样式代码，不能复用 
- 内部样式： 在head标签里面添加style标签，可以页面内复用，不能多页面复用
- 外部样式： 在单独的css文件中写样式代码，通过link标签引入 ，可以多页面复用
3. 内联优先级最高，内部外部一样，后执行的覆盖先执行的
4. 选择器：
- 标签名选择器：   div{}
- id选择器：    #id{}
- 类选择器：    .class{}
- 分组选择器：   div,#id,.class{}
- 属性选择器 ：   div[属性名='属性值']{}
- 子孙后代选择器：  div span{}
- 子元素选择器：   div>span{}
- 伪类选择器：   未访问link  访问过visited  悬停hover  点击时 active
- 任意选择器：  *{}
5. 颜色赋值：
- 颜色单词 red
- 6位16进制 #ff0000
- 3位16进制 #f00
- 3位10进制 rgb(255,0,0)
- 4位10进制 rgba(255,0,0,0-1) 值越小越透明
6. 背景图片
- background-image:url(图片路径)  设置背景图片
- background-size:100px 200px; 设置背景图片大小
- background-repeat:no-repeat; 禁止重复
- background-position:left top; 0% 0%;
7. 盒子模型
- 外边距,边框，内边距，宽高 
- 外边距：元素与上级元素边框或相邻兄弟元素边框的距离
margin:10px; 上下左右全部是10px
margin:10px 20px  上下10  左右20
margin:0 auto  居中
margin:10px 20px 30px 40px  上右下左 顺时针
粘连问题：元素的上边缘和上级元素的上边缘重叠，给元素添加上外边距时出现粘连，通过给上级元素overflow:hidden解决
左右相邻求和
上下相邻取最大值
块级元素全部生效 行内元素左右生效上下不生效
- 边框： 
border-left/right/top/bottom:
border: 粗细 样式 颜色
块级元素全部生效，影响元素的宽高 
行内元素全部生效， 影响宽度不影响高度
- 内边距：元素边框距内容的距离
padding:10px;
padding:10px 20px;
padding:10px 20px 30px 40px;
块级元素全部生效，影响所占宽高
行内元素全部生效，影响宽度不影响高度
- 宽高： width height
块级元素可以修改
行内元素不可以修改 ，由内容决定
####day04
1. 文本相关
- text-align: 水平对齐方式 left/right/center
- text-decoration: overline/underline/line-through/none 
- color:red;
- text-shadow:颜色 x偏移值 y偏移值 模糊度 值越小越清晰
- line-height:10px  一般用于控制文本垂直居中 
2. 字体相关
- font-size: 控制字体大小
- font-weight:bold 加粗  normal去掉加粗效果
- font-style:italic  斜体
- font-family: xxxx,xxx,xxx

3. 圆角  border-radius: 值越大越圆
4. 溢出设置 overflow
- hidden 超出隐藏
- visible 超出显示（默认）
- scroll 超出滚动显示
5. 显示方式 display
- 块级元素  block    可以修改宽高 不能显示到一行
- 行内元素  inline   可以显示到一行 不能修改宽高
- 行内块   inline-block  可以修改宽高 也可以显示到一行  

####day05
1. 定位方式 
- 文档流定位（静态定位） position：static  ，块级从上到下，行内从左向右
- 相对定位position:relative, 不脱离文档流，元素从当前位置通过left、right、top、bottom进行偏移 
- 绝对定位position：absolute， 脱离文档流，元素位置相对于窗口或做了非static定位的祖先元素，如果多个祖先元素都做非static定位则就近原则
- 固定定位position:fixed,脱离文档流，元素位置相对于窗口 
- 浮动定位float:left、right, 脱离文档流，元素从当前所在行向左或向右浮动，当撞到上级元素边框 或其它浮动元素时停止，一行显示不下会自动折行，折行时有可能被卡住， 如果元素前有浮动元素不想顶上去的话需要添加clear属性值为left/right/both, 当元素所有的子元素全部浮动的话，则元素自动识别的高度为0， 通过给元素添加overflow：hidden解决 
2. 行内元素的垂直对齐方式vertical-align
- top 上对齐 
- bottom 下对齐
- middle 中间对齐
- baseline(默认) 基线对齐
3. CSS的三大特性
- 继承性：元素可以继承祖先元素的部分样式属性，只能继承文本和字体相关的样式    a  h1-h6
- 层叠性: 多个选择器指向同一个元素时 添加不同的样式会层叠到一起显示，如果相同的样式只响应一个响应谁由优先级决定 
- 优先级： 作用范围越小优先级越高  id>class>标签名>继承  


#----------------------------Web.day07_JS苍01，斌在08基本重述-----------------------------
	笔记下载中有图

# JavaScript（JS）

- HTML： 组织内容
- CSS： 显示效果
- JavaScript: 页面中的动作效果	/动作：任何的跟用户交互的动作，和动画

## Java 和 JavaScript

Java和JavaScript只有4个字母一样！没有任何关系的两个语言！

历史上 网景 公司推出脚本语言时候，为了蹭当时Java语言的热度，故意起名为JavaScript。

JavaScript的API方法仿照了部分Java API设计。

目前JavaScript是俗称，其官方标准名称 ES Script。

## 什么是Java Script

JavaScript是运行在浏览器中的脚本语言。 被浏览器事件驱动，可以访问浏览器提供的对象，在浏览器中编程控制浏览器中显示的页面效果。

> JS 可以在Node.js 环境中执行， 是服务端的JS

> 脚本语言: 没有编译器，直接解释执行的语言称为脚本语言。

## JavaScript Hello World！

1. HTML
2. 在网页中添加JS代码，处理事件
3. 在浏览器中显示HTML
4. 利用事件触发执行JS

案例：

	<html>
		<head>
		</head>
		<body>
			<div onclick="console.log('Hello World!')">测试信息</div>
		</body>
	</html>

## JS 有3种嵌入方式

1. 内联式： 直接写到HTML标签事件中，不推荐使用。 JS脚本和HTML混合，不利于软件的开发和维护。
2. 内部式： 使用 Script 标签声明，JS脚本在当前HTML有效。
3. 外部式： 使用 Script 标签引入js文件，用于多个HTML文件共享一个JS脚本文件。

内部式JS 案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	//网页加载期间执行的 JS 脚本 
	console.log("Hello World");
	//声明一个JS函数（方法）
	function hello(){
		console.log("Hello!"); 
	}
	</script>
	</head>
	<body>
		<h1>内部式JS</h1>
		<div onclick="hello()">演示</div> 
	</body>
	</html>	

外部式：

![](1.png)

案例：
	
1. 编写JS文件 js/hello.js：
 
		function demo(){
			console.log("demo");
		}

2. 编写测试页面 jsdemo02.html

		<!DOCTYPE html>
		<html>
		<head>
		<meta charset="UTF-8">
		<title>Insert title here</title>
		<!-- script 只能单独加载外部JS脚本，
		不能在加载JS脚本的同时在内部声明JS脚本 -->
		<script type="text/javascript" 
			src="js/hello.js"></script>
			
		<script type="text/javascript">
		//网页加载期间执行的 JS 脚本 
		console.log("Hello World");
		//声明一个JS函数（方法）
		function hello(){
			console.log("Hello!"); 
		}
		</script>
		</head>
		<body>
			<h1>内部式JS</h1>
			<div onclick="hello()">演示</div> 
			<h1>外部式JS</h1>
			<div onclick="demo()">演示外部式JS</div>
		</body>
		</html>

## JS 中声明变量

语法：

	var 变量名; 

JS 的变量的语法很“自由”

1. 可以不声明使用！
2. 建议声明变量再使用，声明时候使用var。
3. JS变量没有明确类型，赋值啥类型就是啥类型。
	- 甚至可以改变类型赋值。
4. 如果不初始化直接使用，其值是“未定义”。

> JS 有两种实验方式： Console实验，JS脚本实验

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	function test(){
		var a = 5;
		console.log(a);
		b = 6; //JS可以不声明直接赋值使用！自动声明
		console.log(b);
		var c;
		console.log(c);//未定义
		c = 7;
		console.log(c);
		c = "test"; //变量可以更改类型赋值
		console.log(c);
		
		//?c存储的数据类型？
	}
	</script>
	</head>
	<body>
		<h1>测试变量的声明</h1>
		<p onclick="test()">测试</p> 
	</body>
	</html>

## 检查变量中数据的类型

JS 中使用typeof()函数检查变量引用的数据的类型

案例:

	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	function test(){
		var s = "abc";
		var c = 8;
		var n = 3.14;
		console.log(typeof(s));
		console.log(typeof(c));
		console.log(typeof(n));
	}
	</script>
	</head>
	<body>
		<h1>测试变量引用数据的类型</h1>
		<div onclick="test()">测试</div>
	</body>
	</html>

## JS 中的数据类型

![](2.png)

1. JS 中数据都是对象，对象分为几种
	- JS内嵌对象，也称为JS的内置对象， 或者JS的基本类型
		- number  string
	- 由“宿主”环境提供的对象
		- window document
	- 自定义对象
		- 使用JS语法创建的对象
2. 特殊值，特殊值用于表示变量没有引用对象的情况
	- null
	- 未定义

## JS 内置对象

JS 内置对象，是JS本身内置的对象。 也称为JS的基本数据类型，与Java不同这些类型是对象！

### number 

JS中是对象，是浮点数，计算结果是浮点结果。 没有整数！！

直接赋值为数的，都是number类型。 包含number类型方法。

number类型包含方法：

- num.toFixed(2) 将num转换为字符串，保留两位小数。

其它方法请参考对应的手册： [http://doc.tedu.cn/w3/jsref/jsref_obj_number.html](http://doc.tedu.cn/w3/jsref/jsref_obj_number.html)

### string

任何JS字符串都是string类型。 JS string类型包含的API方法与Java String的方法类似。

具体请参考： [http://doc.tedu.cn/w3/jsref/jsref_obj_string.html](http://doc.tedu.cn/w3/jsref/jsref_obj_string.html)

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	function test(){
		var num = 3.1415926;
		//Fixed 固定的，返回固定小数点位数
		//输出价格等情况
		console.log(num.toFixed(2));
		console.log(num.toFixed(4));
		var str = "tedu.cn";
		var n = str.indexOf("cn");
		console.log(n);//5
		var c = str.charAt(5);
		console.log(c);//c
		var b = str.blod();
		console.log(b);
	} 
	//显示加粗的 文字
	function demo01(){
		var str = "测试";
		var msg = str.bold();
		//用id在document对象中找到 div元素 
		var div=document.getElementById("msg");
		//innerHTML 读写 div元素内部的内容
		div.innerHTML=msg;
	}
	//显示红色的文字
	function demo02(){
		var str = "测试";
		var msg = str.fontcolor("red");
		//用id在document对象中找到 div元素 
		var div=document.getElementById("msg");
		//innerHTML 读写 div元素内部的内容
		div.innerHTML=msg;	
	}
	</script>
	</head>
	<body>
		<h1>Number 和 String</h1>
		<p onclick="test()">测试</p>
		<h1>页面局部刷新</h1>
		<div onclick="demo02()" >red</div>
		<div id="msg" onclick="demo01()">Test</div>
	</body>
	</html>

### boolean

Boolean 只有两个值 true, false

### Date 

Date 类型用于表示时间，其中封装了时间毫秒数。

最重要方法： 

- toLocaleString() 返回当前系统的时间字符串。
- getTime() 返回时间毫秒数

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	function test(){
		//创建Date类型时候内部包含当前时间毫秒数
		var d = new Date();
		//获取时间毫秒数
		var time = d.getTime();
		//转换为本地时间字符串
		var str = d.toLocaleString();
		console.log(d);
		console.log(time);
		console.log(str);
		
		var s = document.getElementById("msg");
		s.innerHTML=str;
	}
	</script>
	</head>
	<body>
		<h1>Date类型</h1>
		<div onclick="test()">测试</div>	
		<span id="msg"></span>
	</body>
	</html>
	
### Array 

数组，JS中的数组与Java中的ArrayList基本一样，是长度可变的数据结构。 一个数组中可以存储多种数据类型的元素。

1. 声明数组：

		var arr = [];
		var ary = [1,2,3,4];

2. 向数组追加元素：

		arr.push(2,5);
		arr[arr.length] = 8;	//length：在末尾一位添加

3. 向数组前面插入元素：

		arr.unshift(8);

4. 删除元素

		arr.splice(2,2);//从位置2开始连续删除两个元素。

测试案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	function test(){
		var arr = []; //new Array()
		arr.push(8,9); //在数组末尾追加元素
		arr[arr.length]=10; //在数组末尾追加元素
		arr[arr.length]="Hello";//在数组末尾追加元素
		//在数组中删除元素，第一个参数是起始位置，
		//第二个参数是位置
		arr.splice(2,1); 
		console.log(arr);
	}
	</script>
	</head>
	<body>
		<h1>Array测试</h1>
		<div onclick="test()">test</div> 
	</body>
	</html>

### 特殊值

null： 表示变量没有引用任何对象。 

undefined：变量声明以后，还没有初始化之前的不确定情况！

无论是 null 还是 undefined 都表示有变量，无对象，此时调用属性或者方法将出现"错误"

> 编程时候，表示“没有” 一般使用 null。


## 自动类型转换（隐式类型转换）

JS 发明之初是为了美工使用，就是为了方便使用。

1. 数字自动转换为字符串；

		var a1 = 56;
		var a2 = "66";
		console.log(a1+a2); //"5666"

2. boolean 类型自动转换为数字，true 为 1， false 为 0
	
		var a1 = 56;
		var b1 = true;
		var b2 = false;
		console.log(a1+b1);//57
		console.log(a1*b2);//0

3. 0, ""， null，undefined，NaN 自动作为 false，反之为true

		var n;
		if(n){
			console.log("true");
		}else{
			console.log("false");
		}

4. 数字与 undefined 运算时候结果是 NaN
	- NaN: Not a Number, 不是一个数！

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	function test(){
		var n; 
		if(n){
			console.log("true");
		}else{
			console.log("false");
		}
		n = 0;
		if(n){
			console.log("true");
		}else{
			console.log("false");
		}
		n = null;
		if(n){
			console.log("true");
		}else{
			console.log("false");
		}
		n = "";
		if(n){
			console.log("true");
		}else{
			console.log("false");
		}
	}
	
	function print(n){
		if(n){
			console.log("true");
		}else{
			console.log("false");
		}
	}
	function test2(){
		print(5);
		print("abc");
		print([1,2,3]);
	}
	</script>
	</head>
	<body>
		<h1>特殊值作为false使用</h1>
		<div onclick="test()">测试</div>
		<h1>非"空"作为 true 使用</h1>
		<div onclick="test2()">测试</div>
	</body>
	</html>

NaN案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	
	function test(){
		var total;
		// undefined 参与计算，结果为 NaN
		// 如果计算结果为 NaN 则参数计算的数据有 undefined
		var sum = total * 0.8;
		console.log(sum);
		//NaN 可以作为false
		if(sum){
			console.log("true");
		}else{
			console.log("false");
		}
	}
	
	</script>
	</head>
	<body>
		<h1>NaN现象</h1>
		<p onclick="test()">Test</p>
	</body>
	</html>

### 运算符

运算符与 Java 基本相同。

1. JS中没有整数，除法是浮点除法，不整除。 利用parseInt函数实现取整数
	
		7/2 得 3.5
		parseInt(7/2) 得到 3

2. == 不区别数据类型判断相等， === 称为“全等” 数据类型一样，数值一样

		var a = 55;
		var b = 55;
		var c = '55';
		console.log(a==b); //true
		console.log(a==c); //true
		console.log(a===b);//true
		console.log(a===c);//false

3. != 和 !== 自行实验

练习：

1. 利用Math.random() 生成一个1~100之间的随机数。作为半径计算圆面积。在页面的 span 元素中显示出来。 
	- 要求： 在控制台和HTML文件两种方式实现。
2. 编写案例，实验全部的知识点。
3. 创建一个数组，添加一组数据，找出其中最大的数据。
	- 提示：JS 的for循环与Java一样
4. 创建一个数组对数组元素进行冒泡排序。



#----------------------------Web.day08_JS02重述07苍内容&...------------------------------


###JavaScript
- 给页面添加动态效果或动态内容

- 引入方式：三种
	1. 内联： 在标签的事件中添加js代码
	2. 内部： 在head标签里面添加script标签 
	3. 外部： 在单独的js文件中写js代码 通过script标签的src属性引入

####变量 声明和赋值
- js属于弱类型的语言 ，声明变量时不需要指定类型都使用var
	/java中
int x = 10;
String s = "abc";
	/js中
var x = 10;
var s = "abc";
x="mm";

####数据类型
1. 数值类型 number
var x =10;   typeof x;
2. 字符串类型 string
var s = "abc";
3. 布尔值类型 boolean
var b = true/false;   typeof b;
4. 对象类型 object     特殊值null
Person p = new Person();
var p = new Person();
5. 未定义类型 undefined
var a;

#####数据类型的隐式转换
1. String类型的隐式转换
- String转布尔值：  空字符串"" 转成false 其它全部true 
- String转数值：   能转直接转，不能转转成NaN(Not a Number)   任何数和NaN进行任何运算结果都是NaN       var  x = "abc"-18;
2. 数值类型的隐式转换
- 数值转字符串： 直接转 18->  "18"     var  x = "abc"+18;
- 数值转布尔值： 0和NaN转成false 其它是true  
3. 布尔值类型的隐式转换
- 转字符串： 直接转 true-> "true"  
- 转数值:  true->1     false->0
4. undefined的隐式转换
- 转字符串： 直接转
- 转数值：  NaN       20+undefined=NaN
- 转布尔值: false
5. null的隐式转换
- 转字符串： 直接转
- 转数值： 0        20+null  
- 转布尔值： false  

####运算符  + - * / %  ==  ===
- 大体和Java相同 
1. ==和===，==会先统一类型，然后再比较值是否相等， ===先比较类型是否相等如果相等再比较值是否相等      "18"===18
2. java: 3/2=1     js:3/2=1.5   4/2=2;  js中除法运算会自动转换整数和小数
3. typeof      typeof 66 + 6 = "number6"

####语句：if  else if  while  do while  for  switch case
- 和java基本相同
1. if和while括号里面的内容 如果不是布尔值会自动隐式转换成布尔值
2. for里面int i 改成 var i   不支持增强for循环(foreach)

####方法声明
- java中声明有返回值有参数（字符串和整数） 
	public String run(String name,int age){
		return name+age;
	}
- JavaScript方法声明的格式:
- 第一种：
function 方法名(参数列表){ 方法体 }
- 第二种：
var 方法名 = function（参数列表）{方法体}
- 第三种：
var 方法名 = new Function("参数1","参数2","方法体");

###字符串相关
1. 把字符串转成数值	parseInt   parseFloat   Number
	parseInt("3.1")   3     parseInt(3.1)  3 /向下取整,笔记搜:Math.floor()和parseInt()的区别
	parseFloat("3.12") 3.12
	Number("3") 3
2. 字符串创建方式
	var str = "abc";
	var str = new String("abc");
3. 转大小写
	str.toUpperCase();
	str.toLowerCase();
4. 获取字符串中某个字符串出现的位置
	- str.indexOf("a");  第一个出现的位置
	- str.lastIndexOf("a");  最后一个出现的位置
5. 替换字符串
	str.replace(old,new);   //只能替换第一个
6. 拆分字符串    a,b,c    a   b   c
	var arr = str.split(",");
###数值相关
1. 四舍五入  toFixed(num)
	3.1415926.toFixed(2);	/ 3.14
###数组相关
1. 创建数组  数组内什么类型都可以保存
	var arr = ["张飞",18,false];
	var arr = new Array();
2. 往数组中添加内容
	arr.push("aaa");
3. 获取和修改长度  js数组长度可以修改
	var arr = ["张飞",18,false];
	arr.length=1;
4. 数组取值 和Java一样
5. 数组反转  a  b  c   
	arr.reverse();
6. 数组排序  默认排序规则是通过Unicode编码挨个字符进行排序
	arr.sort();
- 自定义排序

	var arr = [3,2,33,31,18,22];
	/*自定义排序方法 */
	function mysort(a,b){
		//return a-b;//升序
		return b-a;//降序
	}
	var mysort = new Function("a","b","return a-b");
	//排序 
	arr.sort(mysort);
	alert(arr);
###日期相关
- 服务器时间和客户端时间

1. 获取客户端当前时间
	var d1 = new Date();
2. 把字符串时间转成日期对象
	var d2 = new Date("2018/9/30 15:48:50");
3. 从日期对象中获取时间戳 (时间戳：距1970年1月1日 08：00：00到现在的毫秒数)   
	d2.getTime();//获取
	d2.setTime(1000); //修改
4. 获取时间分量 （年，月，日，时，分，秒，星期几）
	d1.getFullYear();
	d1.getMonth(); //从0开始
	d1.getDate();
	d1.getHours();
	d1.getMinutes();
	d1.getSeconds();
	d1.getDay();
5. 获取年月日  和 获取 时分秒
	d.toLocaleDateString();
	d.toLocaleTimeString();
	
###页面相关
1. 通过id查找元素对象
 var div = document.getElementById("d1");
 var ipt = document.getElementById("i1");
2. 修改或添加元素的html内容
 div.innerHTML="xxx";
3. 修改元素的class值
 div.className="abc";
4. 获取和设置文本框的文本内容
 ipt.value  //获取
 ipt.value="xxx";  //修改

###正则表达式
- . :匹配任意字符 除了换行
- \w : 匹配任意数字 字母 下划线
- \d : 匹配任意数字 
- \s : 匹配任意空白
- ^ :开头。`**在方括号表达式中使用时**，表示不接受该字符集合。要匹配^字符本身，请使用\^
- $ ：结尾
- 应用场景： 1. 查找内容  2. 校验文本 
1. 创建正则表达式的两种方式：
- var reg = /规则/模式;    （模式：i忽略大小写  g：全局查找）
 举例： 以m开头    
	var reg = /^m/;  
	以x结尾
	reg = /x$/;
	包含两位数字   34
	reg = /\d{2}/;   
	以三位数字开头
	reg = /^\d{3}/;
	以y开头z结尾中间包含5位数字
	reg = /^y\d{5}z$/;
	6-10位数字字母下划线   230948234897238947238947
	reg = /^\w{6,10}$/;
- var reg = new RegExp(规则,？模式);   如果规则中出现\ 需要转义\\      // / ？模式表示模式可不写
	reg = new RegExp("^\\w{6,10}$");
####和正则相关的方法
1. 查找内容 exec()
	var str = "you can you up no can no b b";
	var reg = /no/g;
	alert(reg.exec(str));//no
	alert(reg.exec(str));//no
	alert(reg.exec(str));//null
2. 校验 test()
	var str = "you can you up no can no b b";
	var reg = /^you/;
	alert(reg.test(str));
3. 字符串和正则相关的方法
- 查找内容 match()
	var str = "you can you up no can no b b";
	var reg = /no/g;
	var arr = str.match(reg);//得到查找的所有内容
- 查找替换 replace
	var str = "you can you up no can no b b";
	var reg = /no/g;
	str.replace(reg,"不");


#------------------------------------Web.day09_JS03-------------------------------------

####课程回顾
	......

####事件取消
- 在事件中执行return false; 则可以把当前事件取消掉

- 表单提交事件： onsubmit

- 元素隐藏显示
	visibility=hidden/visible

###JavaScript中的自定义对象

- 自定义对象两种方式：
1. 通过声明方法的方式创建对象
	function Person(name,age){
		//声明属性并赋值
		this.name=name;
		this.age=age;
		//声明方法
		this.run=function(){
			alert("name:"+name+"age:"+age);
		}
	}
	//创建person对象
	var p = new Person("关羽",20);
	p.run();
2. 通过声明变量的形式创建对象

	/* 第二种创建对象的方式 */
	var p2 = {
			"name":"曹操",
			"age":18,
			"run":function(){
				alert("name"+this.name
						+" age:"+this.age);
			}
	}
	//调用方法
	p2.run();


###DHTML
- Dynamic（动态）HTML， 并不是新的技术，是把html+css+JavaScript 一起实现出来的页面称为DHTML页面 
- DHTML内容包括 BOM和DOM 
- BOM Browser（浏览器）Object（对象）Model（模型） 浏览器对象模型，包括和浏览器相关的内容
- DOM Document（文档）Object（对象） Model（模型）文档对象模型，包括和页面相关的内容
####BOM相关
- window对象是内置对象，window对象内部的属性和方法称为全局属性和全局方法，调用时可以省略window.
	举例：     window.alert("xxx");
			isNaN()    parseInt  parseFloat   Number()
- window里面常用的属性：
1. history（历史）    
	history.length  历史页面数量
	history.back()  返回上一页面
	history.forward() 前往下一页面
	history.go(num) 1前往下一页面 0代表刷新 -1返回上一页面 -2返回上两个页面
2. location（位置）
	location.href   获取和修改浏览器访问的地址
	location.reload()  重新加载
3. screen （屏幕）
	screen.width/height 获得屏幕的分辨率
	screen.availWidth/availHeight 获得屏幕可用宽高
4. navigator （导航、帮助）
	navigator.userAgent(得到浏览器的版本信息)
- window中的一些常用方法
1. isNaN() 判断变量是否是NaN
2. parseInt() parseFloat() 把字符串转成数值
3. 弹出框： alert();
4. 确认框： confirm();
5. 弹出文本框： prompt();
- window相关的事件
1. 点击事件  onclick
2. 页面加载完成事件 onload
3. 获取焦点事件 onfocus
4. 失去焦点事件 onblur

####eval()
- **可以将字符串以js代码的形式执行**
eval("alert('xxx')");
alert("xxx");

####代码介绍
demo01 9宫格作业
demo02 登录校验 高级版
demo03 自定义对象 第一种方式
demo04 自定对象 第二种方式
demo05 通过location.href 实现页面跳转练习
demo06 window的四个事件
demo07 相对高级版计算器


#------------------------------------Web.day10_JS04-------------------------------------


###给元素对象添加样式
	div.style.样式名称="样式的值";

###元素隐藏的两种方式
1. visibility="hidden" //不脱离文档流 元素隐藏后仍然占位置	/前几天学的
2. display="none"   //脱离文档流 不占位置	/今天的新知识



###Low轮播图实现步骤：
1. 在页面中添加一个div 在div里面添加三个img
2. 通过内部样式让img和div设置相同宽200高150
3. 在script标签中添加定时器 每隔1秒执行代码
4. 声明一个全局的count，在定时器中自增并且对3取余数 
5. 在定时器中获取所有图片并且遍历
6. 遍历时判断i的值是否等于第4步得到的余数，如果相等让当前遍历的图片元素显示，如果不等则让图片隐藏

####定时器
1. var timer = setInterval(方法,时间间隔)  每隔一段时间调用一次方法
	停止：clearInterval(timer)
2. setTimeout(方法,时间间隔)  隔一段时间调用一次方法（只执行一次）

###DOM 文档对象模型(包含和页面相关的内容)
- 学习DOM主要学习的就是如何对页面中的元素进行增删改查操作
####查找页面中的元素
1. 通过id查找元素
	var div = document.getElementById("id");
2. 通过标签名查找元素
	var arr = document.getElementsByTagName("标签名");
3. 通过class查找元素
	var arr = document.getElementsByClassName("class");
4. 通过name属性值查找元素
	var arr = document.getElementsByName("name");
5. 获取页面中body元素
	document.body
6. 获取元素的上级元素
	div.parentElement
###创建元素对象
	var h3 = document.createElement("h3");	/创建图片：document.createElement("img")
	h3.innerHTML="我是h3";
###添加元素
	document.body.appendChild(h3);		/document.body 是 父元素
###插入元素
	父元素.insertBefore(新元素,弟弟元素);
###删除元素
	父元素.removeChild(删除的元素); 
	删除的元素.parentElement.removeChild(删除的元素);

###事件的动态绑定
- 通过js代码给元素添加事件称为 事件的动态绑定，动态绑定的事件方法中的this代表事件源（添加事件的标签）
	/苍：this代表响应"当前"事件的dom元素


#-------------------------------Web.day11_JS课程总结&...---------------------------------


###JavaScript课程总结
###课程回顾
1. 数据类型
- 字符串 string
- 数值 number
- 布尔值 boolean
- 对象类型 object     typeof null  object
- 未定义 undefined 
2. 变量声明和赋值
- js属于弱类型语言
- var x = 10;  x=true;
3. 数据类型间的隐式转换
- 字符串： 转数值（能转直接转，不能转 NaN） "18a"  转布尔值(""转false其它true)   if("abc")
- 数值：转字符串直接转  转布尔值（0和NaN是false 其它是true）
- 布尔值：转字符串直接转  转数值（true是1  false是0）
- undefined： 转字符串直接转， 转布尔值false ，转数值NaN
- null：转字符串直接转，转布尔值false，转数值0
4. 运算符
- ==和===  ==先统一类型再比较值   ===先比较类型 如果类型统一再比较值
- teypeof 66 + 6 = "number6";
- 除法 会根据结果自动转整数和小数
6. 语句 
- for循环把 int i 改成 var i  不支持foreach
- if和while括号里面的内容如果不是布尔值会自动隐式转换成布尔值
7. 方法声明
- 第一种： function 方法名(参数列表){方法体}
- 第二种：var 方法名 = function(参数列表){方法体}
- 第三种： var 方法名 = new Function("参数1","参数2","方法体");
8. 字符串相关：
- 创建字符串  var s = "";   var s = new String();
- 字符串转数值  parseInt() parseFloat() Number()
- 获取字符串出现的位置  str.indexOf("a")  str.lastIndexOf("a");\
- 转大小写   str.toUpperCase()  str.toLowerCase();
- 拆分字符串  var arr = str.split(",");
- 替换字符串  str.replace("old","new");
9. 数组相关
- 创建数组 var arr = ["abc",true,18];  var arr = new Array();
- 添加内容   arr.push(20);
- 获取数据和Java一样
- 数组反转 arr.reverse();
- 数组排序 arr.sort(); 通过Unicode编码进行排序  
	自定义排序： 
	function 方法名(a,b){return a-b升序/b-a降序;}
10. 四舍五入  3.1415926.toFixed(3);
11. 正则表达式：
- 两种创建方式：
	1. var reg = /规则/模式;   模式：i忽略大小写  g全局查找
	2. var reg = new RegExp("规则",?"模式");
- 查找： reg.exec(str); //每次执行只查找到一个 找不到后会返回null
- 校验： reg.test(str); 
- 查找： str.match(reg); //查找到所有符合规则的内容 返回值为数组
- 查找替换： str.replace(reg,"new");
12. 页面相关
- 通过id获取元素对象  var d = document.getElementById("id");
- 获取和设置文本框的内容  input.value="abc";
- 给元素添加文本内容  d.innerText = "<h1>abc</h1>";
- 给元素添加文本或html内容 d.innerHTML="<h1>abc</h1>";
13. 日期相关、
- 创建日期对象  var d = new Date();//得到客户端当前时间
- 把字符串时间转成时间对象 var d = new Date("2018/10/20 23:18:33");
- 获取和设置时间戳  d.getTime();  d.setTime(1000);
- 获取时间分量： getFullYear/Month/Date/Hours/Minutes/Seconds/Day()
- 获取年月日  和  获取时分秒   d.toLocaleDateString()  d.toLocalTimeString();
// /  +day09+day10  /这两天的没重新写，直接回顾的笔记


###鼠标大战僵尸步骤：
1. 开启定时器每隔1秒执行一次，在定时器里面创建img图片 设置图片为zomb0.png,然后把图片添加到body里面
2. 通过css让img标签的定位方式为绝对定位，设置图片的宽80 高90
3. 在创建完img标签的位置设置img图片的位置left为屏幕的宽度，top为屏幕高的随机值
4. 开启另外一个定时器，每秒执行100次，在定时器里面获取所有img，然后遍历，获取每一个img标签 修改其left值 让left值-2 再赋值回去，则可以实现僵尸移动的功能

###js中的事件
- 什么是事件： 指一些特定的时间点，事件包括：鼠标事件、键盘事件、状态改变事件。
- 鼠标事件： onclick(点击事件)  onmouseover(鼠标移入事件) onmouseout(鼠标移出事件),  onmousedown(鼠标按下) onmouseup(鼠标松开) onmousemove(鼠标移动)
- 状态改变事件： onload(页面加载完成事件) onfocus(获取焦点事件) onblur(失去焦点事件) onsubmit(提交事件) onchange(value值改变事件) onresize(窗口尺寸改变事件)
- 键盘事件： onkeydown(键盘按下事件)  onkeyup(键盘抬起事件)
###事件绑定
1. 标签内部通过事件属性添加事件 ， 事件方法中的this代表Window对象    /这个this没什么用，就是省略掉的window
2. 动态绑定事件，好处：可以让js代码和html代码分离 ，动态绑定事件的方法中的this代表事件源    /上班后这个用的多
###事件取消
- 在事件中执行return false； 则可以取消当前事件
###事件对象event    /demo05 /文档解释：Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。事件通常与函数结合使用，函数不会在事件发生前被执行！
1. 在鼠标事件中可得到鼠标的坐标  event.clientX/Y()
2. 在键盘事件中可以得到键盘按键的编码 event.keyCode();
3. 在任何事件中可以得到事件源  event.target  event.srcElement /获取事件源存在兼容性问题 chrome两种都支持
	var obj = event.target||event.srcElement;    /<-解决兼容性的写法。  target：目标
###事件传递(事件冒泡)  /demo06
- 如果一个范围有多个事件需要响应，则响应顺序为从底层往上层传递，这个过程类似于冒泡效果，所以又称为事件冒泡 


#----------------------------Web.day12_JQ01苍，斌在13基本重述-----------------------------
	笔记下载中有图

# JQuery

## 什么是JQuery
	2019/10/31 JQuery=JavaScript Query(查询)=操作(查询)DOM
1. 封装了 Dom和CSS,JS等, 提供了更加简便的操作API	  `为啥不把Dom说是HTML，因为HTML加载到浏览器之后才叫Dom(Dom是文档对象模型)	JQuery官网说的是：JQuery是一个快速的，小的，以及功能丰富的JS库
2. 是函数式编程。
3. 核心API体积小，加载速度快。
4. 跨浏览器使用，解决了浏览器的兼容问题。（IE8 以前的除外）/应该包括IE8，业界规则：现在我们在编程的时候已经不用再考虑IE8以前旧的浏览器了，因为我们写的网页在这些浏览器上都变形了，这些浏览器特别差。

> 其口号：写的少做的多

## 使用JQuery

1. 导入JQuery API
	
		<script src="jquery.js">

2. 编辑HTML, 在HTML中添加需要操作的 HTML标签。

		<div id="msg"></div>

3. 使用JQuery操作 div

		<script>
			$('#msg').html('Hello World!');
		</script> 

案例：
	
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>JQuery Hello World!</h1> 
		<div id="msg"></div>
		
	<script type="text/javascript" 
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$('#msg').html('Hello World!');
	</script>
	</body>
	</html>

## 认识Dom

HTML部署在服务器端，当HTML被下载到浏览器中后被解析为DOM对象，显示在窗口中。 引用DOM对象的变量是document。

![](dom.png)

## JQuery 对象

1. 由 $() 返回的对象称为JQuery对象。
	
		var obj = $('#msg'); 

2. JQuery 对象，扩展于 JS Array 对象。		/JQuery对象是DOM**数组对象**
3. JQuery 对象，在Array基础之上扩展了非常的多的方法！！！
4. JQuery API 方法**可以操作数组中每个对象**。

推广：如何将JQuery和Dom对象相互转换

1. JQuery对象转换为DOM，利用下标取JQuery对象的元素，就得到DOM对象	/ 加个下标就可以 [n]
2. DOM对象转换为JQuery，$(dom对象)得到JQuery对象

为何需要转换：

- 如果需要操作Dom对象API，则需要将JQuery对象转换DOM对象。 
- 如果得到DOM需要利用JQueryAPI时候，则需要将DOM转换为JQuery对象。

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>JQuery Demo</title>
	</head>
	<body>
		<h1>认识JQuery对象</h1>
		<p>JQuery 对象，扩展于 JS Array 对象</p>
		<div class="demo">A</div>
		<div class="demo">B</div>
		<div class="demo">C</div>
		<div class="demo">D</div>
	
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	//使用JQuery选择一组对象，$()返回值是一个数组
	var obj = $('.demo');
	console.log(obj);//每个数组元素是一个dom<div>对象
	console.log(obj[0]);
	console.log(obj[1]);
	console.log(obj[2]);
	console.log(obj[3]);
	
	//操作JQuery中每个对象，将每个对象html中的文本都改了
	obj.html("demo");
	
	//为数组扩展方法
	var arr = ["Tom", "Jerry", "熊大"];
	arr.test = function(){
		console.log("Hello World!");
	};
	arr.test();
	
	</script>
	</body>
	</html>


## 为数组扩展方法

	var arr = ["Tom","Jerry","熊大"];
	arr.test=function(){
		console.log("Hello World!");
	};
	arr.test();

## $() 函数用途：

1. $(选择器) 选择一组dom对象作为JQuery对象的元素.
2. $(DOM对象) 将对象作为JQuery中的元素，返回JQuery对象  / $($('选择器')[下标]). 把JQuery对象转成DOM对象再转回去
3. $("HTML元素字符串") 将HTML解析为DOM对象作为JQuery的元素，返回JQuery对象。 目的是将字符解析为Dom对象，然后添加到页面中。

		$('<span>abc</span>') 

4. $(function(){}) 在页面加载以后执行的方法。/ 相当于window的onload事件。看笔记记录

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>$()函数的使用</h1>
		<div id="msg"></div>
	
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	//页面加载以后执行的函数
	$(function(){
		console.log("Hello World");
	});
	//可以多次注册$(function(){})函数，启动时候都会被执行。
	$(function(){
		//利用$()函数将字符串转换为JQuery对象
		var span=$("<span>test</span>");
		//append()将span追加到 div 元素中
		$("#msg").append(span);
	});
	
	</script>
	</body>
	</html>

## 选择器

### JQuery 基本选择器

1. ID选择器
		
		$("#id") 选择指定的id元素

2. 类选择器
		
		$(".class") 选择一组 class 一致的元素

3. 元素选择器

		$('div') 选择全部div元素
		
4. 组选择器

		$("div, p, span")

组选择器案例:

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>组选择器</h1>
		<input type="button" id="test" value="测试">  
		<div></div>
		<p></p>
		<span></span>
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$(function(){
		//click()事件绑定方法，可以在对象被点击
		//时候执行事件方法
		$("#test").click(function(){
			//组选择器，选择了 div p 和span元素 
			$("div,p,span").html("test");
		});
	});
	</script>
	</body>
	</html>

### 事件绑定（简介）

选择需要绑定事件的元素，然后使用 click() 方法绑定事件

	$("#test").click(function(){
		console.log("test");
	});

失去焦点事件, 经常用于处理表单项目验证

	$("#username").blur(function(){
		console.log("blur");		
	});

### 层级关系选择器

1. 派生，子孙后代
				
		$(".menu .item")	选择子孙	
		$("ul > li")        子选择器

2. 后一个选择器

		$('#username + span')  选择 #username 的后一个 span兄弟

3. 选择后续全部的兄弟元素

		$('h2 ~ p') 选择h2元素同级别的全部后续兄弟p元素

案例0：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>JQuery 选择器</h1> 
		<ul class="demo">
			<li>Java</li>
			<li>PHP</li>
			<li>C++</li>
		</ul>
	<script type="text/javascript" 
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$(function(){
		$(".demo>li").append("好");
	});
	</script>
	</body>
	</html>


案例1：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<style type="text/css">
	.error{
		color: red;
	}
	</style>
	</head>
	<body>
		<h1>兄弟选择器</h1>
		<h2>注册</h2>
		<form action="">
			<div>
				<label>用户名</label>
				<input id="username" name="username">
				<span></span>
			</div>
		</form>
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$(function(){
		//blur() 用于绑定失去焦点事件，当输入控件
		//失去焦点时候，会执行事件方法
		$('#username').blur(function(){
			console.log("blur");
			//1. 获取输入框数据
			//val() 必须在表单项上调用，获取标签中的值
			var val = $('#username').val();
			//2. 检查数据格式
			if(! val){ //如果没有值就显示错误消息
				//3. 如果检查失败 就 在span中显示失败消息
				$('#username + span').addClass('error')
			                     .html('错了！');
				//next() 获取当前元素的后一个节点
				//$('#username').next() 
				//prev() 获取当前元素的前一个兄弟节点
				$('#username').prev().addClass('error');
				//几乎所有的JQueryAPI方法返回的都是JQuery
				//对象，这时可以连续调用JQuery对象提供的
				//API方法。
			}else{
				//empty()清空span元素的内容
				$('#username').next().empty();
				//清除 label 上的error红色
				$('#username').prev()
					.removeClass('error');
			}
		});
	});
	</script>
	</body>
	</html>

案例2：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>选择器</h1>
		<p>选择当前元素开始，后续全部的兄弟元素</p>
		
		<h2>JQuery API</h2>
		<p>选择器</p>
		<p>dom操作</p>
		<p>事件绑定</p>
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	//选择 h2 开始后续的 p 元素  'h2 ~ p'
	$(function(){
		$('h2 ~ p').append("OK");	
	});
	
	</script>	
	</body>
	</html>

### 过滤选择器

在选择器中过滤保留满足条件的元素：

1. 选择全部 tr 中的偶数行: 0 2 4 6 8
	
		$('tr:even').css('background-color','#eee');	

2. 选择全部 tr 中的奇数行: 1 3 5 7 ...

		$('tr:odd').css('background-color','#ddd');

3. 选择全部 tr 中的第一行:

		$('tr:first').css('background-color','#000').css('color', '#fff');

4. 选择全部 tr 中的最后行: 

		$('tr:last').css('background-color','#0f0').css('color', '#f00');

5. 选择tr的2行：index： 0 1 2 3 4

		$('tr:eq(2)').css('color','#f00');

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>过滤器</h1>
		<table id="tbl">
			<tr>
				<td>编号</td><td>名称</td>
			</tr>
			<tr>
				<td>1</td><td>熊大</td>
			</tr>
			<tr>
				<td>2</td><td>熊二</td>
			</tr>
			<tr>
				<td>3</td><td>光头强</td>
			</tr>
			<tr>
				<td>合计</td><td>3</td>
			</tr>
		</table>
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$(function(){
		//偶数行浅灰色
		//选择全部 tr 中的偶数行: 0 2 4 6 8
		//JQuery API css()方法，作用是为每个被选中
		//的元素添加“内联样式” 
		$('tr:even').css('background-color','#eee');	
		//奇数行深灰色
		$('tr:odd').css('background-color','#ddd');
		//首行 反白 
		$('tr:first').css('background-color','#000')
			.css('color', '#fff');
		$('tr:last').css('background-color','#0f0')
			.css('color', '#f00');
		//选中指定序号的行 
		$('tr:eq(2)').css('color','#f00');
	});
	</script>
	</body>
	</html>

### 内容选择

1. 选择包含特定文本的元素：

		$('li:contains("Java")').append("OK");

2. 选择空元素

		$('li:empty').html("Web前端");

3. 选择包含指定元素的元素： 

		$('li:has(a)').append('a');

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>JQuery 内容选择</h1>
		<div>
			<h2>Java课程内容</h2>
			<ul>
				<li>Java基础</li>
				<li>Java核心API</li>
				<li></li>
				<li>MySQL<a href="#">数据库</a></li>
				<li><a href="#">JDBC</a></li>
			</ul>
		</div>
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$(function(){
		//根据内容选择
		$('li:contains("Java")').append("OK");
		//找到空的li 在里面写上"web前端"
		$('li:empty').html("Web前端");
		//找到包含a元素的li，在尾部追加 “a”
		$('li:has(a)').append('a');
	});
	</script>
	</body>
	</html>

### 选择显示、隐藏的元素

选择隐藏的元素：

	$('#menu > .sub:visible').hide(500);

案例：

	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<style type="text/css">
	#menu{
		width: 100px;
	}
	.sub{
		background-color: #eee;
	}
	.item{
		background-color: #ddd;
	}
	</style>
	</head>
	<body>
		<h1>选择显示、隐藏的元素</h1>
		<div id="menu">
			<div class="item">Java基础</div>
			<div class="sub">
				变量，数据类型
				流程控制，面向对象
			</div>
			<div class="item">Java 核心API</div>
			<div class="sub">
				String, Object, 集合, Thread, IO, 
				Stream, Network
			</div>
		</div>
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$(function(){
		//监听鼠标悬停事件
		$('#menu > .item').mouseover(function(){
			//console.log('Over');
			//.hide() 通过设置内联样式，隐藏元素
			$('#menu > .sub:visible').hide(500);
			//this 代表响应“当前”事件的dom元素 
			$(this).next().show(500);
		});
	});
	</script>
	</body>
	</html>

### 属性选择器

使用属性选择器选择 属性type是submit的元素 
	
	$("input[type='submit']").val("开始注册");

案例：
	
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	</head>
	<body>
		<h1>属性选择器</h1>
		<h2>注册</h2>
		<form action="">
			<div>
				<label>姓名：</label>
				<input id="name" type="text" >
				<span></span>
			</div>
			<div>
				<label>电话：</label>
				<input id="mobile" type="text">
				<span></span>
			</div>
			<div>
				<label>密码：</label>
				<input id="password" 
					type="password">
				<span></span>
			</div>
			<div>
				<label>确认密码：</label>
				<input id="confirm"
					type="password">
				<span></span>
			</div>
			<div>
				<label>角色：</label>
				<input id="admin" type="checkbox" 
					value="100" name="role">
				<label for="admin">管理员</label>
				<input id="admin01" type="checkbox" 
					value="200" name="role">
				<label for="admin01">男宿舍管理员</label>
				<input id="user" type="checkbox" 
					value="300" name="role">
				<label for="user">群众</label>
				<span></span>
			</div>
			<div>
				<input type="submit" value="注册">
			</div>
		</form>
	<script type="text/javascript"
		src="../js/jquery-3.1.1.min.js"></script>
	<script type="text/javascript">
	$(function(){
		//使用属性选择器选择 属性type是submit的元素 
		$("input[type='submit']").val("开始注册");
		
		//获取form的第一个div子元素
		$('form div:first-child').css(
				'background-color','#eee');
		//获取form的最后一个div子元素 
		$('form div:last-child').css(
				'background-color','#000');
		
		
	});
	</script>
	</body>
	</html>
	
### 子选择器

选择form的第一个div子元素

	$('form div:first-child').css('background-color','#eee');

选择form的最后一个div子元素
 
	$('form div:last-child').css('background-color','#000');

### 表单选择器

选择全部的checkbox：

	$("input:checkbox") 

选择name是role，的全部checkbox

	$("input[name='role']:checkbox")

选择 name是role 中被选中的 checkbox
	
	$("input[name='role']:checked") 

## 作业

1. 重复完成课堂案例
2. 编写一个表单包含文本输入框，密码框，下拉选择框，单选框，复选框。 然后添加一个按钮在点击按钮事件中 使用表单选择器选择元素并且输出：
	1. 全部文本框中的值
	2. 全部密码框中的值
	3. 获取单选框中的选中值
	4. 复选框的中的选中值


#----------------------------Web.day13_JQ02重述12苍内容&...------------------------------


###课程回顾：	/以下选择器回顾，用笔记下载中的题目回顾。
####选择器
1. 基础选择器
- 标签名选择器  $("div")
- id选择器     $("#id")
- class选择器	$(".class")
- 分组选择器		$("div,span")
- 任意元素选择器  $("*")
2. 层级选择器
- 子孙后代选择器  div span
- 子元素选择器  div>span
- 弟弟元素选择器  #id+span
- 弟弟们元素选择器 #id~span
- 层级方法：
	1. 兄弟元素    $("#id").siblings("div");	/不加div表示所有的兄弟，加了表示所有的div兄弟；都不包括自己
	2. 哥哥元素    $("#id").prev();
	3. 哥哥们元素  $("#id").prevAll();
	4. 弟弟元素    $("#id").next();
	5. 弟弟们元素  $("#id").nextAll();
3. 过滤选择器	/从0开始的
- 第一个div   $("div:first") /下边略$("")
- 最后一个div div:last
- 奇数   div:odd
- 偶数   div:even		/0是偶数
- 等于   div:eq(n)
- 小于   div:lt(n)
- 大于   div:gt(n)
- class不为one	 div:not(.one)
4. 内容选择器	/略$("")
- 空元素的div    div:empty
- 非空元素的div   div:parent	/要求div是parent(父母)，即它里面要有东西，即非空
- 包含p的div    div:has(p)	/括号内是元素
- 包含abc文本的div   div:contains('id')/括号内是文本
5. 可见选择器	/略$("")
- 可见div元素     div:visible
- 不可见div元素   div:hidden
- 元素隐藏显示的方法
	1. show(); 显示
	2. hide(); 隐藏
	3. toggle(); 隐藏显示切换	/牛b
6. 属性选择器
- 匹配包含id属性的div    $("div[id]")
- 匹配id属性值为abc的div $("div[id='abc']")
- 匹配id属性值不为abc的div $("div[id!='abc']")
7. 子元素选择器	/练习5&5_Childtest
- 匹配是div并且是子元素并且是第一个     $("div:first-child")	 / child：孩子
- 匹配是div并且是子元素并且是最后一个	$("div:last-child")
- 匹配是div并且是子元素并且是第n个		$("div:nth-child(n)")
- 
	/ 这个选择器就是从css来的，css中的文档解释:选择属于其父元素的某个子元素的每个<xx>元素
		比如：div:first-child  选择符合： 是div的父元素的第一个子元素的每个div元素
		按照老师的解释：这个比较好理解
		div:first-child  选择符合： 是div 是子元素 且是所在层的第一个
		form div:nth-child(n) 选择符合： 是form的子孙元素 是div 且是所在层的第n个元素
		from>div:first-child  选择符合： 是div 是from的子元素 且是本层第一个
	/ 总结一下：
		这个子元素选择器其实应该是和我们原先所学的选择器都一样。
		只是在把 : 前面的选择器选择到的元素 用 : 后的要求再选择一次

8. 表单选择器
- 匹配所有表单中的控件  :input	
- 匹配所有密码框    :password
- 匹配所有单选     :radio	
- 匹配所有多选     :checkbox
- 匹配所有选中的单选、多选、下拉选  :checked
- 匹配所有的选中的单选和多选          input:checked    / 单选多选在input里面，下拉选不在
- 匹配所有选中的下拉选  :selected

###DOM操作
1. 创建元素  
	var d = $("<div>abc</div>");
2. 添加元素
	$("#big").append(d); //最后面
	$("#big").prepend(d);//最前面
3. 插入元素
	兄弟元素.after(d);//插入到兄弟元素的后面
	兄弟元素.before(d);//插入到兄弟元素的前面
4. 删除元素
	$("#abc").remove();
5. 修改和获取元素的样式
	$("#abc").css("样式名称","样式的值"); 
	$("#abc").css("样式名称"); //获取样式的值
6. 修改和获取元素的文本内容
	$("#abc").text();
	$("#abc").text("xxx");
7. 修改和获取元素的html内容
	$("#abc").html();
	$("#abc").html("<h1>xxx</h1>");
8. 修改和获取元素的属性
	$("#abc").attr("class","mm");  /attr->attribute 属性
	$("#abc").attr("class");

###事件模拟  /通过Jquery的代码让元素自己触发事件 demo06
	//触发元素的点击事件
		$("input").trigger("click");

###动画相关
	/看demo07


#-----------------------------------------补充-------------------------------------------

1. Servlet.day02接触的表单样式：边框
	<fieldset></fieldset>标签是html5中新出的，可以将表单内的相关元素分组，会在相关表单元素周围绘制边框。美观
	<legend></legend>标签为<fieldset>元素定义标题。
2. Servlet.day05接触的特殊字符：双箭头
	html符号：双箭头：&raquo    登录页面的确定按钮里的

3. 成恒AJAX01：Html中不区分大小写，所以在html中不使用驼峰命名法。

4. 整理：获取当前对象的标签名：
	.nodeName和.tagName
	区别可百度，好像建议总是用nodeName，因为他的范围比tagName广

5. 渐变：
	background-image: linear-gradient(160deg, rgba(22, 24, 36, 0.8) 20%,rgba(41, 31, 31, 0.3) 80%) !important


#2019-06-15
 - 1. 内容在中间的设置： style="line-height:100px; text-align:center"
	<div style="line-height:100px; text-align:center">
		点击按钮上传附件：<button id="upload-atta" type="button" class="layui-btn layui-btn-primary layui-btn-sm">上传附件</button>
	</div>

#2019-06-24高级选择器
 - 从第二个开始的input，并且不包括id为hexIfdate的，赋值为""
		find("input:gt(0):not('#hexIfdate')").val("");
 - jquery选择器AND OR操作
		https://www.jianshu.com/p/be1840fbc4c6

#2019-06-25JQuery的属性选择器
	<div class="layui-tab-item layui-show">xxx</div>
 - $("div[class='layui-tab-item]") ||$("div[class='layui-show]") 匹配不到div
 - $("div[class='layui-tab-item layui-show]")  能匹配到div
 - $(".layui-tab-item") || $(".layui-show") 能匹配到div能匹配到div


#2019-07-29jQuery遍历给<!DOCTYPE html>赋值高度
 - 代码：元素的data-h="xx%"
	    $(function(){
	        //初始化高度赋值
	        $("[data-h]").each(function(){
	            $(this).css("height",
	                $(window).height()*$(this).attr("data-h").replace("%","")/100);
	        })
	        //不断监听改变位置，给高度赋值
	        window.onresize = function(){
	            $("[data-h]").each(function(){
	                $(this).css("height",
	                    $(window).height()*$(this).attr("data-h").replace("%","")/100);
	            })
	        }
	    })