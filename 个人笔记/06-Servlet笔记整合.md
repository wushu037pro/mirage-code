
#------------------------------------Servlet.day01--------------------------------------
#/PPT也不错

# 1.什么是Servlet?	/我认为这个问答有歧义，看笔记    应该是：什么是Servlet规范？

sun公司制订的一种用来扩展web服务器功能的组件规范。

## (1)用来扩展web服务器功能：
	早期很多web服务器(比如apache,iis等)只能够处理静态资源的请求
	(需要事先将html文档，包括图片声音等准备好)，不能够处理动态资源
	的请求(即需要通过计算，生成html),所以需要扩展。	
		/动态资源比如股票的实时价格，不能够事先写好，要动态生成
	注：
		早期使用CGI(Common Gateway Interface通用网关接口)程序来扩展
		,因为CGI开发繁琐、并且不好移值，所以用得少了。	/因为CGI是用perl，c/c++写的
		可以使用Servlet来扩展web服务器功能。

## (2)组件规范:
    a.什么是组件?
	  符合规范、实现部分功能，并且需要部署到相应的容器当中才能运行的
	软件模块。
	  Servlet就是一个符合Servlet规范的组件，需要部署到Servlet容器
	当中才能运行。
	b.什么是容器?
	  符合规范，提供组件的运行环境的程序。
	 Servlet容器(比如Tomcat雄猫)为Servlet提供运行环境(主要是
	提供网络相关的服务)。

![](servlet.png)

# 2.如何写一个Servlet?  

step1.  写一个java类，实现Servlet接口或者继承HttpServlet类。

	注: 一般继承HttpServlet类更方便。 /原因后面讲

step2.　编译。  .java文件--->.class文件

step3. 打包。	
		/Servlet离不开容器，需要部署到容器中。部署的话就要先变成一个组件，也就是说要按照规范创建一个文件夹
	建立一个具有如下结构的目录结构
		appname (应用名，自定义)	/工程名字，web应用名
			WEB-INF 	/WEB-INF是固定的，只能这样写
				classes (放.class文件)
				lib (放.jar文件,可选)	/没有使用jar包可以不要
				web.xml(部署描述文件,servlet3.0以上的版本可以不要)	/课上讲的是目前最流行的servlet2.5版本

step4.部署。

	将step3创建好的整个文件夹拷贝到容器上。
	注：
		也可以将step3创建好的整个文件夹使用jar命令压缩成".war"为后缀		/war包
		的文件，然后再拷贝。	

step5.启动容器，访问Servlet。

	打开浏览器，在地址栏输入
	http://ip:port/appname/url-pattern
	注:
			url-pattern是一个字符串，在web.xml中设置。


# 3.安装Tomcat并且与Eclipse集成。	/www.apache.org 阿帕奇官网

参考
	http://doc.tedu.cn/tomcat/index.html


# 4.Servlet是如何运行的。

比如，在浏览器地址栏输入http://ip:port/day01/hello?number=1


![](servlet02.png)

step1. 浏览器依据ip和port，建立连接。

step2. 浏览器创建请求数据包并发送。

step3. 服务器解析请求数据包，并且将解析到的数据存放到request
对象里面，同时，创建response对象。

step4. 服务器创建Servlet对象，然后调用该对象的service方法。

	注：
		服务器会将request和response作为参数传递给service方法。

step5.　服务器从response对象中获取处理结果，然后创建响应数据包并
发送。

step6.浏览器解析响应数据包，然后依据解析到的数据生成相应的页面。


# 5.常见的错误
## (1)404

含义:
   404是一个状态码，表示服务器依据请求路径找不到对应的资源。

错误原因:

	a.请求路径写错(没有按照http://ip:port/appname/url-pattern)来
	写请求地址。

	b.没有部署该应用或者部署失败。	//部署失败一般不会发生，偶尔发生。解决办法多部署几次。


## (2)500

含义:
	表示服务器处理出错。

错误原因:
	a.没有严格按照规范来写代码。
	比如没有继承HttpServlet,或者web.xml写错。

	b.代码不严谨。
	比如，对请求参数值没有做检查就做类型转换。	
							/或请求参数名和实际发送过来的请求参数名不一致。


# 6. 如何获得请求参数值?
a. String request.getParameter(String paramName);

	注：
		请求参数名得与实际发送过来的请求参数名一致，
		如果不一致，会获得null值。		/不一致也会报500错误
		文本输入框、密码输入框如果不填写任何数据，会获得""。  
							/如果对请求参数值不做检查就类型转换，比如转数字，但是这是空字符串，转不成数字，数字格式异常。报500错误，所以要加判断

b.String[] request.getParameterValues(String paramName);
	
	注：
		当有多个请求参数名相同时，使用该方法。
		对于多选框，如果用户没有选择任何选项，会获得null值。  /数组取值空指针异常，所以要加判断

# 练习 
##写一个Servlet(比如DateServlet),输出当前的系统日期

http://ip:port/day01-lab/date
返回  2018-12-25

## 提示
step1.创建一个maven工程，注意以下三点(分别如下图所示):

![](a1.png)
![](a2.png)
![](a3.png)

step2.在src/main/java下，添加一个java类(DateServlet),参考代码如下:

	public class DateServlet extends HttpServlet{

	@Override
	protected void service(
			HttpServletRequest request, 
			HttpServletResponse response) 
					throws ServletException, 
					IOException {
		//获得系统时间
		Date date = new Date();
		//创建日期格式化对象
		SimpleDateFormat sdf = 
				new SimpleDateFormat(
						"yyyy-MM-dd");
		//将日期格式化
		String dateInfo = 
				sdf.format(date);
		//设置响应头
		response.setContentType("text/html");
		PrintWriter out = 
				response.getWriter();
		//输出日期
		out.println(dateInfo);
		out.close();
		}
	}

step3.在web.xml中，添加servlet的配置信息，参数配置如下:

	<servlet>
  		<servlet-name>dateServlet</servlet-name>
  		<servlet-class>web.DateServlet</servlet-class>
	</servlet>
	<servlet-mapping>
  		<servlet-name>dateServlet</servlet-name>
  		<url-pattern>/date</url-pattern>
	</servlet-mapping>

step4.运行，步骤如下图所示:

![](a4.png)

	注：
		eclipse会将servlet编译成.class文件，然后在servlet
	容器上创建符合servlet规范的文件夹，将.class文件添加到
	WEB-INF下。也就是说eclipse会帮我们部署整个应用。

step5.打开浏览器，在地址栏填写访问地址

![](a5.png)


#------------------------------------Servlet.day02--------------------------------------


# 1. http协议(了解)
## (1)什么是http协议?
是一种网络应用层协议、规定了浏览器与web服务器之间如何通信及相应的数据包的结构。

	注:
	TCP/IP: 传输层与网络层协议，负责将数据包可靠地传递。
	http协议需要依赖TCP/IP来传递数据包。

![](http.png)	/图解浏览器和web服务器之间是怎么通信的
	 
## (2)数据包的结构
### 1)请求数据包
	GET /day01/hello?number=1&city=wh&city=cs HTTP/1.1
	请求行 (请求方式　请求资源路径　　协议/版本)
	若干消息头　
		注:
			消息头是一些键值对(使用": "隔开)，用来传递一些特定的
		　信息。比如，浏览器可以发送"user-agent"消息头，告诉服务器，	/user-agent用户代理
		　浏览器的类型和版本。
	实体内容(消息正文)
		注:
			只有当请求方式为post时，才会有数据。

### 2)响应数据包

	状态行 (协议/版本　状态码　状态描述)
		注:
			状态码是一个三位数字，表示服务器处理请求的一种状态，
			常见的有如下一些:
			200  正常
            500  服务器处理出错
			404  依据请求路径找不到对应的资源
	若干消息头
		服务器也可以发送一些消息头给浏览器，比如，发送"content-type"
		消息头，告诉浏览器，服务器返回的数据类型和编码。	/数据类型和编码是分号;隔开的
	实体内容
		程序处理的结果，浏览器会解析出来，生成对应的页面。

## (3)两种请求方式
### 1)get请求
a.哪一些情况下，浏览器会发送get请求?

	a1.在浏览器地址直接填写某个地址
	a2.点击链接
	a3.表单默认的提交方式

b.特点

	b1.会将请求参数显示在浏览器地址栏，不安全。
	注：
		有一些网络设备，比如路由器，会记录所有的请求地址。	`跟校门口大爷一样

	b2.会将请求参数添加到请求资源路径的后面(即请求行里面),只能
	提交少量数据给服务器。
	注：
		因为请求行大约只能存放2k左右的数据。

### 2)post请求
	a.不会将请求参数显示在浏览器地址栏，相对安全一些。
				/只能说相对安全，因为http协议本身是不对数据加密的，比如我们抓包工具能看见
	注：
		http协议不会对数据包中的数据加密。所以，对于敏感数据
		(比如帐号密码)，需要加密处理(使用https协议)。
	b.会将请求参数放到实体内容里面，可以提交大量的数据给服务器。

# 2.Servlet输出中文，如何处理?	`向网页输出中文
## (1)为什么会有乱码?
因为out.println方法在输出时，默认使用"iso-8859-1"来编码。

## (2)如何解决?

	response.setContentType(
				"text/html;charset=utf-8");

# 3.表单包含有中文参数值，如何处理?	`向服务器传输中文
## (1)为什么会有乱码?
当提交表单时，浏览器会对表单中的中文参数值进行编码，比如
使用"utf-8"来编码，而服务器端默认会使用"iso-8859-1"来解码。
所以会产生乱码。

	注:
		浏览器会按照打开该表单所在的页面时的字符集来进行编码。

## (2)如何处理?
### 1)post请求

	request.setCharacterEncoding(String charset);
	注：
		这行代码要添加到所有的request.getParameter方法的最前面。
		这行代码只针对post请求有效。
			/字符集参数要和客户端的编码字符集一样。即和表单html中<head>_charset规定的一样。
### 2)get请求

	修改server.xml,添加 <Connector URIEncoding="utf-8"/>
	注:
		只针对get请求有效。
		tomcat8.0以上的版本，默认会使用utf-8来解码。

# 4.访问数据库
		/先建个表
	create database jsd1809db default character set utf8;

	use jsd1809db;

	create table t_user(
		id int primary key auto_increment,
		username varchar(50) unique,
		password varchar(30),
		email varchar(50)
	);

step1.导包 (在pom.xml文件添加如下内容)	/jdbc驱动和dbcp连接池jar包	/从jdbc02工程直接复制过来

	<dependencies>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.6</version>
		</dependency>

		<dependency>
			<groupId>commons-dbcp</groupId>
			<artifactId>commons-dbcp</artifactId>
			<version>1.4</version>
		</dependency>
	</dependencies>

step2.添加DBUtils类(可以从jdbc02工程直接拷贝过来)

	public class DBUtils {

	private static BasicDataSource dataSource;
	
	static{
		//读取属性配置文件的对象
		Properties prop = new Properties();
		//得到文件输入流
		InputStream ips = DBUtils.class.getClassLoader()
				.getResourceAsStream("jdbc.properties");
		//把文件流加载到prop对象中
		try {
			prop.load(ips);
			String driver = prop.getProperty("driver");
			String url = prop.getProperty("url");
			String username = prop.getProperty("username");
			String password = prop.getProperty("password");
			String initSize = prop.getProperty("initSize");
			String maxSize = prop.getProperty("maxSize");
			System.out.println(driver+url+username+password+initSize+maxSize);
			//创建连接池数据源对象
			dataSource = new BasicDataSource();
			dataSource.setDriverClassName(driver);
			dataSource.setUrl(url);
			dataSource.setUsername(username);
			dataSource.setPassword(password);
			//设置连接池策略信息
			dataSource.setInitialSize(Integer.parseInt(initSize));
			dataSource.setMaxActive(Integer.parseInt(maxSize));
			
			} catch (IOException e) {
			e.printStackTrace();
			}
		}
		public static Connection getConn() 
					throws SQLException{
			return dataSource.getConnection();
		}
	}

step3.添加jdbc.properties文件			/从jdbc02直接复制过来

		driver=com.mysql.jdbc.Driver
		url=jdbc:mysql://localhost:3306/jsd1809db?useUnicode=true&characterEncoding=UTF-8
		username=root
		password=root
		initSize=3
		maxSize=3

step4.测试DBUtils，看能否获得连接。

		public class Test2 {

			public static void main(String[] args)
					throws SQLException {
				System.out.println(
						DBUtils.getConn());
			}

		}

step5.在Servlet类当中，使用jdbc api访问数据库。

# 练习　
计算一个人的ＢＭＩ指数，并且依据ＢＭＩ指数来判断一个人的
体重状况。

![](lab.png)


#------------------------------------Servlet.day03--------------------------------------


# 1.DAO(扩展)
		扩展：不是这个阶段的核心知识。不属于web开发的知识，是属于jdbc的知识
## (1)什么是DAO (Data Access Object 数据访问对象)?
封装了数据访问逻辑的对象。	/jdbc


## (2)如何写一个DAO?
step1. 写一个java类(实体类)，用于存放从数据库中查询出来的数据。

	注：
		该类的属性与表的字段保存一致，类型要匹配。

	参考代码:
		public class User {
		private int id;
		private String uname;
		private String pwd;
		private String email;
		
		@Override
		public String toString() {
			return "User [id=" + id + ", uname=" + uname + ", pwd=" + pwd + ", email=" + email + "]";
		}
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getUname() {
			return uname;
		}
		public void setUname(String uname) {
			this.uname = uname;
		}
		public String getPwd() {
			return pwd;
		}
		public void setPwd(String pwd) {
			this.pwd = pwd;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
	}

step2. 写DAO类，封装数据访问逻辑。

	注：
		提供一些访问数据库的方法。

	参考代码:
		public class UserDAO {
		/**
		 * 将t_user表中所有用户信息查询出来
		 */
		public List<User> findAll() 
				throws SQLException{
			List<User> users = 
					new ArrayList<User>();
			Connection conn = null;
			PreparedStatement stat = null;
			ResultSet rs = null;
			try {
				conn = DBUtils.getConn();
				stat = conn.prepareStatement(
				"SELECT * FROM t_user");
				rs = stat.executeQuery();
				while(rs.next()){
					int id = rs.getInt("id");
					String uname = 
							rs.getString("username");
					String pwd = 
							rs.getString("password");
					String email = 
							rs.getString("email");
					
					User user = new User();
					user.setId(id);
					user.setUname(uname);
					user.setPwd(pwd);
					user.setEmail(email);
					
					users.add(user);
				}
			} catch (SQLException e) {
				e.printStackTrace();
				throw e;
			} finally{
				DBUtils.close(conn, stat, rs);
			}
			return users;
		}
	}

## (3)DAO的优点
a. DAO封装了数据访问逻辑，调用者不用关注底层数据访问逻辑的实现，
方便代码的维护。
		/一起写可读性不好。且出错后还要找是java代码出的还是jdbc出的。
b. 方便测试

	注：
		比如将jdbc代码写在servlet里面，需要部署整个应用才能测试，
		而将jdbc代码写在DAO类里面，可以直接测试。

c.方便分工协作

	




# 练习
使用DAO重构DelUserServlet
(将jdbc代码使用DAO来替换)

4:50上课


#------------------------------------Servlet.day04--------------------------------------


# 1.重定向
## (1)什么是重定向?
服务器通知浏览器重新向某个地址发送请求。

	注：
		服务器可以通过发送302状态码及Location消息头(该消息头的
	值是一个地址，一般称之为重定向地址)给浏览器，浏览器收到之后
	会立即向重定向地址发送请求。

![](redirect.png)

## (2)如何重定向?
response.sendRedirect(String url);
		/ 我们只需要写这行代码，容器会帮我们添加消息头生成状态码发给浏览器
	注:
		url是重定向地址。
		重定向之前，容器会清空response对象上存放的所有数据。

## (3)重定向的特点?
a.重定向地址是任意的。

b.重定向之后，浏览器地址栏的地址会发生变化。

# 2. jsp
		/看笔记
## (1)什么是jsp? 	Java Server Page   java服务器端页面
sun公司制订的一种服务器端的动态页面技术规范。

	注:
		因为虽然可以使用servlet生成动态页面，但是过于繁琐
	(需要使用out.println输出)，并且不利于页面的维护(比如，
	修改页面就必须修改java代码)，所以，sun才制订了jsp规范。
		jsp是一个以".jsp"为后缀的文件,该文件主要内容是html
	(包括css,js)及少量的java代码，容器会将jsp转换成一个
	对应的servlet然后执行。也就是说,jsp的本质就是一个servlet。


## (2)如何写一个jsp文件?
step1. 添加一个以.jsp为后缀的文件。

step2. 可以在该文件里面，使用如下元素:

### 1)html (css,js)
	直接写即可。

### 2)java代码
a. java代码片断

	<%  java代码  %>

b. jsp表达式
	
	<%= java表达式 %>

## 3)隐含对象
a. 什么是隐含对象?

	在jsp里面，可以直接使用的对象，比如out、request、response。

b.为什么可以直接使用这些隐含对象?

	因为容器会生成获得这些对象的代码。

## 4)指令
a.什么是指令?
	
	可以使用指令来告诉容器，在将jsp转换成servlet时做一
	些额外的处理，比如导包。

b.语法

	<%@ 指令名 属性=值 属性=值%>
	注:
		属性可以有多个，属性之间使用空格隔开。

c.page指令
	
	import属性：导包，比如 <%@ page import="java.util.*"%>
	<%@ page import="java.util.*,java.text.*"%>	/逗号隔开

	contentType属性：设置response.setContentType方法的值。
						/ out.println方法在输出时，默认使用"iso-8859-1"来编码。前面记过
	pageEncoding属性：设置jsp文件的编码。告诉容器，在读取jsp文件
				的内容时，使用指定的字符集来解码。

![](pageEncoding.png)

## (3)jsp是如何执行的?
step1. 容器会将.jsp文件转换成一个.java文件(将jsp转换成servlet)

	html(css,js) ----->  在service方法里面，使用out.write输出。
			注(了解):write方法会将null转换成""输出，而println方法
					会输出null。		/write更好，因为用户看不懂null值
	<%     %>    ------>  照搬到service方法里面。
	<%=    %>    ------>  在service方法里面，使用out.print输出。

step2.容器调用该servlet。

	容器会将servlet编译，然后实例化，并调用service方法。


# 练习1
写一个date.jsp，输出当前系统日期

# 练习2
写一个listUser2.jsp,以表格形式显示所有用户信息(用户列表)
		和listUser.jsp一样，我没写，听录播

# 练习3 /课后练习有时间再做
写一个listEmp.jsp，以表格的形式输出所有员工的信息(员工列表)
	
	create table t_emp(
		id int primary key auto_increment,
		ename varchar(50),
		salary double,
		age int
	);


#------------------------------------Servlet.day05--------------------------------------


# 1.转发
## (1)什么是转发?
一个web组件将未完成的处理交给另外一个web组件继续做。
			`通常是一个Servlet转发给--->Jsp。其他的也都行比如Servlet转发给Servlet。

	注:
		web组件(servlet/jsp)
		最常见的情况：一个Servlet获得数据，然后将这些数据转发给
		一个jsp来展现。

![](forward.png)

## (2)如何转发?	/看笔记
step1. 将数据绑定到request对象上。

	request.setAttribute(String name,Object obj);
	注:
		底层的实现 map.put(name,obj);    /以name为key，以obj作为value,绑定在HashMap中

step2. 获得转发器。

	RequestDispatcher rd = 
		request.getRequestDispatcher(String uri);		/参数是转发的地址
							
	注:
		RequestDispatcher是一个接口。
	转发的本质就是一个web组件通知容器去调用另外一个web组件，
	可以将RequestDispatcher(转发器)当作是一个媒介。
		
step3. 转发

	rd.forward(request,response);	/service方法的两个参数。此时request对象携带了绑定的数据

## (3)特点
a.转发之后，浏览器地址栏的地址不变。
		因为转发是服务器内部的跳转。
b.转发的地址有限制(要求属于同一个应用)。

# 2. include指令		/include包含
## (1)用法

	<%@ include file="header.jsp"%>
	注:
		容器在将jsp转换成servlet时，会将file属性所指定的文件的
	内容插入到该指令所在的位置。
		被包含的文件并没有真正执行，只是负责提供内容。
		被包含的文件类型可以是其它的，比如包含一个html文件。



# 练习          
为用户管理添加登录功能。

要求:

	用户填写用户名和密码，然后提交表单，服务器进行验证，
	如果有符合条件的记录，则登录成功，跳转到用户列表页面，
	否则登录失败，跳转到登录页面，并给用户相应的提示
	("用户名或密码错误")。

step1.添加login.jsp

step2.添加LoginServlet(处理登录请求)

		读取用户名(username)和密码(pwd)
	
		User user = UserDAO.find(username);
		if(user != null && 
               user.getPwd().equals(pwd)){
			response.sendRedirect("list")
		}else{
			request.setAttribute("login_failed",
			"用户名或密码错误");
			request.getRequestDispatcher("login.jsp").for...
		}

step3. 修改login.jsp


#------------------------------------Servlet.day06--------------------------------------


# 1.比较转发与重定向
## (1)浏览器地址栏的地址有无变化?
转发之后，浏览器地址栏的地址不变，重定向会变。

## (2)目的地(地址)有无限制?
转发有限制(要求属于同一个应用)，重定向地址无任何限制。

## (3)能否共享request对象?
转发可以，重定向不行。

	注:
		当容器收到请求之后，会立即创建request对象和response
	对象，当容器发送响应之后，会立即销毁这两个对象。也就是，
	request和response的生存时间是一次请求和响应期间存在。

## (4)一件事是否做完?
转发是一件没有做完，让另外一个web组件继续做；重定向是一件
事已经完成，然后再做另外一件独立的事件。

# 2.状态管理
## (1)什么是状态管理?
将浏览器与web服务器之间多次交互当做一个整体来处理，并且将多次交互
所涉及的数据(即状态)保存下来。
					`一次交互：一次请求+一次响应
## (2)如何进行状态管理?
a.将状态保存在浏览器端(Cookie)。

b.将状态保存在服务器端(Session)。

## (3)Cookie
### 1)什么是Cookie?
服务器临时保存在浏览器端的少量数据，用于保存用户的状态。

	当浏览器第一次访问服务器，服务器会将少量数据以set-cookie
	消息头的形式发送给浏览器，浏览器会将这些数据临时保存下来。
	当浏览器再次访问服务器时，会将这些数据以cookie消息头的形式
	发送给服务器。
							`这都是http协议定义好的。
![](cookie.png)

### 2)如何添加Cookie?
	
	Cookie c = new Cookie(String name,String value);
	注:
		Cookie必须有一个名字，值必须是一个字符串。
	response.addCookie(c);
		`执行完这行代码，服务器会发送set-cookie消息头给浏览器。消息头的值是：cookie的名字和值，以name=value的方式发送给浏览器

### 3)如何读取浏览器发送过来的Cookie?
	
	Cookie[] request.getCookies();
	注:
		该方法的作用是用来获得浏览器发送过来的所有cookie,
		一个Cookie对象封装了cookie的所有信息。
		该方法有可能返回null。
	String cookie.getName();
	String cookie.getValue();

### 4)Cookie的生存时间
默认情况下，浏览器会将cookie保存在内存里面。

	注：浏览器关闭，cookie会被删除。

可以调用setMaxAge方法来设置Cookie的生存时间。

	cookie.setMaxAge(int seconds);
	注:
		单位是秒。比如要保存一个月 
			cookie.setMaxAge(30 *24 * 60 * 60);
		值 >0:
			浏览器会将cookie保存在硬盘上，超过指定时间，cookie
			会被删除。	
		值 <0:
			默认值(浏览器会将cookie保存在内存里面)
		值 =0:
			立即删除cookie。
			比如，要删除一个名称为"username"的cookie:
			Cookie c = new Cookie("username","");		/修改也这么写。
			c.setMaxAge(0);
			response.addCookie(c);		/新的把老的覆盖，并且新的立即被删除
			
### 5)Cookie的编码问题
a.什么是Cookie的编码问题?

	Cookie只能存放合法的ascii字符，如果是非asicc字符(比如中文),	/ascii字符有个别的几个也不能保存。
	需要转换成合法的ascii字符的形式。

b.如何处理?

	String URLEncoder.encode(String str,String charset);
	String URLDecoder.decode(String str,String charset);

c.建议，在添加cookie时，统一使用encode方法来编码。

### 6)Cookie的路径问题
a.什么是Cookie的路径问题?

	浏览器在向服务器发请求时，会比较请求路径是否与cookie的
	路径匹配，只有匹配的cookie才会被发送。
				`如果不这样就会消耗很多流量、没有必要、也不安全。
b.Cookie的默认路径

	默认等于添加该cookie的web组件的路径，比如
	/day06/biz01/addCookie.jsp添加了一个cookie,则该cookie
	的默认路径是"/day06/biz01"。

c.匹配规则

	请求路径要么等于cookie的路径，要么是其子路径，符合这个条件的
	cookie会被发送。
	比如  cookie的路径是"/day06/biz01"
		/day06/findCookie1.jsp   no
		/day06/biz01/findCookie2.jsp   yes
		/day06/biz01/aaa/findCookie3.jsp  yes

![](path.png)

d.修改cookie的路径
	
	cookie.setPath(String path);

# 练习
## 写一个servlet,该servlet先查看有没有一个名称为"cart"的cookie,
如果有，则显示该cookie的值；如果没有，则添加。

## 写一个servlet,统计用户访问该servlet的次数。

![](count.png)


#------------------------------------Servlet.day07--------------------------------------


# 1.Cookie的限制
	a.可以被用户禁止
		`高级设置-->内容设置里可以禁止
	b.不安全
		对于敏感数据，一定要加密。
		`用户在高级设置中都能够看到。对于敏感数据(比如帐号密码)，一定要加密(加密算法-有现成的API)。
	c.只能存放少量数据
		大约4k左右
	d.数量也有限制
		浏览器大约能存放几百个cookie
		`很多浏览器限制一个站点最多存放约20个cookie
	e.只能存放字符串


# 2. Session(会话)
## (1)什么是Session?
服务器端为了保存用户的状态而创建的一个特殊的对象(即session对象)。

		当浏览器第一次访问服务器时，服务器会创建session对象(该
	对象有一个唯一的id,一般称之为sessionId),接下来服务器会将
	sessionId以cookie的方式发送给浏览器。
		当浏览器再次访问服务器时，会将sessionId发送过来，服务器
	就可以依据sessionId找到对应的sessinon对象。

## (2)如何获得session对象?
### 1)HttpSession s = request.getSession(boolean flag);

	HttpSession是一个接口。
	a.当flag为true时，先查看请求当中有没有sessionId,如果没有，就会
	创建一个session对象。如果有sessionId,就会依据sessionId去查找
	对应的session对象，如果找到了就返回该对象，找不到则会创建一个
	新的session对象。	
		`为了节省资源空间，服务器会把空闲时间很长的session删除，这就造成了有sessionId但找不到对应的对象的情况
	b.当flag为false时,先查看请求当中有没有sessionId,如果没有，返回
	null。如果有sessionId,就会依据sessionId去查找对应的session对象，如果找到了就返回该对象，找不到，返回null。
		`即参数为false是获得已有的sessionId对象的方法。
![](session.png)

### 2)HttpSession s = request.getSession();

	等价于 request.getSession(true);
		`因为开发中80%用的都是HttpSession s = request.getSession(true);
		所以sun公司特意做了个不带参数的方法HttpSession s = request.getSession();
		它的源码只有一行，就是HttpSession s = request.getSession(true);不写参数的方法更简单。

## (3)常用方法
	session.setAttribute(String name,Object obj);		//绑定、修改数据
	Object session.getAttribute(String name);		//依据绑定名，获取绑定值
	session.removeAttribute(String name);		//删除、解除绑定	 删除指定名称的绑定对象

![](count.png)	

## (4)session超时
a.什么是session超时?

	服务器会将空闲时间过长的session对象删除掉。
	注：
		为了节省内存空间。
		大部分服务器默认的超时时间长度为30分钟。
		`30分钟就很合适了。
b.如何修改超时时间长度?

	方式一 修改web.xml
		<session-config>
        	<session-timeout>30</session-timeout>
    	</session-config>
		`整个服务器和某个应用的都可以改。看笔记'修改超时时间长度的操作'
	方式二 编程的方式

		session.setMaxInactiveInterval(int seconds);
		设置两次请求之间最大的时间间隔

## (5)删除session
	
	session.invalidate(); 	invalid失效，无效的

   
	
## (6)session验证
step1. 登录成功之后，在session对象上绑定一些数据，比如

	session.setAttribute("user",user);

step2.当用户访问需要保护的资源时，进行session验证,比如

	Object obj = session.getAttribute("user");
	if(obj == null){
		//没有登录
		response.sendRedirect("login.jsp");
	}

![](checklogin.png)


## (7)比较session与cookie
session相对于cookie,优点：安全、可以存放大量的数据、支持更丰富的
数据类型。缺点是session会占用服务器端的内存空间，如果session对象
过多，会占用过多的内存空间。


# 练习
写一个servlet,输出用户上一次访问的时间。如果是第一次访问，输出
“你是第一次访问”。


#------------------------------------Servlet.day08--------------------------------------


# 1.路径问题
## (1)什么是路径问题?
		`即以下四种情况，路径应该怎么填写
	<a href="addUser.jsp"> 
	<form action="add"> 
	response.sendRedirect("login.jsp")
	request.getRequestDispatcher("listUsers.jsp")

## (2)什么是相对路径?
		看笔记'路径问题'
不以"/"开头的路径
`	`**相对于现在这个文件所在的路径** 所有的文件的根目录都是应用名
## (3)什么是绝对路径?
以"/"开头的路径

## (4)如何写绝对路径?
链接、表单提交、重定向从应用名开始写，转发从应用名之后开始写。
	
	注：不要将应用名直接写在路径里面，而应该使用下面的方法
	来获得实际部署时的应用名。     `应用名可能会改，所以用这个方法避免`
``		String request.getContextPath();  `**他的返回值是以斜杠开头**

# 2.容器如何处理请求资源路径?
比如，在浏览器地址栏输入http://ip:port/day08-2/abc.html
``				`**浏览器会把端口后的内容 /day08-2/abc.html 当作请求资源路径发给容器**
step1.容器默认认为访问的是一个servlet。

	容器将请求资源路径("/day08-2/abc.html")中的应用名除掉，
	得到"/abc.html"，然后查找web.xml配置文件，看<url-pattern>
	有没有与之匹配的servlet。

	匹配方式有三种:
		第一种: 精确匹配 	 			 `就是<url-pattern>的值和请求地址(/abc.html)一样。大小写都得一样
		第二种: 通配符匹配,即使用"*"配置任意的零个或者多个字符，比如
			 <url-pattern>/*</url-pattern> `匹配全部请求路径
			 <url-pattern>/demo/*</url-pattern>
		第三种：后缀匹配，使用"*."开头，后接任意的一个后缀，比如
			 <url-pattern>*.do</url-pattern>
			 以上配置，会匹配所有以".do"结尾的请求。
			 <url-pattern>*.action</url-pattern>

step2.如果找不到对应的servlet，容器会查找对应位置的文件。
		
		找到了，就返回该文件的内容，找不到，返回404。


# 3.如何让一个servlet处理多种请求?
step1. 	使用后缀匹配，比如			`通配符也可以`

	<servlet-mapping>
  		<servlet-name>someServlet</servlet-name>
  		<url-pattern>*.do</url-pattern>
  	</servlet-mapping>


step2.  分析请求资源路径，调用对应的分支来处理。
		`获得请求资源路径的方法：
			String uri = request.getRequestURI();

# 4.Servlet上下文
## (1)什么是Servlet上下文?
容器启动之后，会为每一个web应用创建唯一的一个符合ServletContext			`conext 环境;上下文;来龙去脉;语境
接口要求的对象，该对象一般称之为Servlet上下文。

	特点:	常考
		唯一性：一个web应用对应一个Servlet上下文。
		持久性: 只要容器没有关闭，应用没有被卸载，Servlet上下文
			就会一直存在。
											`应用被卸载：Servers-->右击应用-->Remove
![](sc.png)

## (2)如何获得Servlet上下文?
HttpSession,GenericServlet提供了getServletContext方法来获得
上下文。

	注:
		GenericServlet是HttpServlet的父类

## (3)作用1: 绑定数据
request,session,Servlet上下文都提供了绑定数据相关的方法，
		setAttribute,getAttribute,removeAttribute
区别如下:

	a.生存时间不一样，在满足使用条件的情况下，优先使用生命周期
	短的(节省内存)。
	  request < session < servlet上下文
![](sc2.png)

	b.可访问的范围不一样。

![](sc3.png)


#------------------------------------Servlet.day09--------------------------------------


## 1.利用Servlet上下文读取全局的初始化参数
step1.配置全局的初始化参数

	<!--
 	配置全局的初始化参数 
  	-->
 	<context-param>
 		<param-name>company</param-name>
 		<param-value>北京达内科技有限公司</param-value>
 	</context-param> 
			‵若要配置多个，要再写这三个标签。
step2.读取
	
		/*
		 * 通过ServletContext提供的方法来
		 * 读取全局的初始化参数
		 */
		String company = 
				sctx.getInitParameter("company");

# 2.Servlet的生命周期
## (1)什么是Servlet的生命周期?
Servlet容器如何创建Servlet对象、如何对其进行初始化、如何调用其方法
来处理请求，以及如何销毁该对象的整个过程。
也就是说，容器是如何管理Servlet的。

![](life.png)

## (2)分成哪几个阶段？

### 1)实例化
a.什么是实例化?

	容器调用Servlet的构造器，创建Servlet实例(对象)。

b.什么时候实例化?

	情况1: 容器收到请求之后创建。
	情况2: 容器启动之后，立即创建(需要配置)。

		<!-- 
  		配置启动加载。
  		容器启动之后，会立即创建该servlet对象。
  		值是一个大于等于零的整数，值越小，优先
  		级越高(即优先被创建)
  	 	-->
  		<load-on-startup>1</load-on-startup>
	注：
		容器只会创建一个实例！‵构造方法只执行一次

### 2)初始化
a.什么是初始化?

	容器在创建servlet实例之后，会立即调用该实例的init方法。
	注:
		init方法只会执行一次!

b.GenericServlet已经提供了init方法的简单的实现。
			`看下面的笔记(3)'相关的接口与类(了解)'和我的笔记'servlet-init()/初始化方法''以及图'init.png'

	将容器传递过来的ServletConfig对象保存下来了，并且提供了一个
	方法(getServletConfig)来获得该对象。
		`ServletConfig对象的主要作用就是读取初始化参数。
![](init.png)

c.初始化参数

	step1.配置初始化参数
  		<init-param>
  			<param-name>company</param-name>
  			<param-value>IBM</param-value>
  		</init-param>

	step2.读取
		String company = 
				config.getInitParameter(
						"company");
	


### 3)就绪(调用)
a.什么是就绪?

	容器收到请求之后，会调用servlet的service方法来处理。

b.HttpServlet已经提供了service方法的实现。

	该方法依据请求类型调用对应的doXXX方法。
		比如，get请求会调用doGet方法，post请求会调用doPost方法。
		doXXX方法只是抛出了一个异常。
	作为开发人员，只需要override doXXX方法即可。 `<--之所以只是抛异常，目的是`
	注:
		也可以直接override HttpServlet的service方法。

![](service.png)
		

### 4)销毁
a.什么是销毁?

	容器在删除servlet实例之前，会调用该实例的destroy方法。
	注：
		该方法只会执行一次！

b.GenericServlet已经提供了destroy方法的实现。

	可以override GenericServlet的destroy方法，来实现
	自己的销毁处理逻辑。
	注：
		在init方法里如果我们获得了一些资源，比如数据库
		Connection等，就需要在destroy方法当中释放这些
		资源。


## (3)相关的接口与类(了解)
a.Servlet接口

	init(ServletConfig config);
	service(ServletRequest req,ServletResponse res);
	destroy();

b.GenericServlet抽象类

	实现了Servlet接口中的部分方法(init,destroy)

c.HttpServlet抽象类
	
	继承了GenericServlet，实现了service方法。
	
	

#------------------------------------Servlet.day10--------------------------------------


# 1.过滤器
## (1)什么是过滤器?
Servlet规范当中定义的一种特殊的组件，用来拦截Servlet容器调用的过程。、
	
	注：
		容器收到请求之后，会先调用过滤器，再调用后续的组件，比如
	调用servlet。

![](filter.png)

## (2)如何写一个过滤器?
step1. 写一个java类，实现Filter接口。

step2. 在doFilter方法当中，实现拦截处理逻辑。

	public class CommentFilter implements Filter{
	/**
	 * 容器启动之后，会立即创建过滤器实例。
	 * 注：
	 * 	 只会创建一个实例。
	 */
	public CommentFilter(){
		System.out.println(
				"CommentFilter's constructor");
	}
	/**
	 * 容器在删除过滤器实例之前，会调用
	 * destroy方法(只会调用一次)。
	 */
	public void destroy() {
		System.out.println(
				"CommentFilter's destroy");
	}
	/**
	 * 容器收到请求之后，会调用过滤器的doFilter方法
	 * (类似于Servlet的service方法)。
	 * ServletRequest是HttpServletRequest的父接口，
	 * ServletResponse是HttpServletResponse的父接口。
	 * FilterChain(过滤器链)：如果调用了该
	 * 对象的doFilter方法，容器会继续向后调用,
	 * 否则，中断请求，返回处理结果。
	 */
	public void doFilter(
			ServletRequest arg0,
			ServletResponse arg1, 
			FilterChain arg2)
			throws IOException, ServletException {
		
		System.out.println(
				"CommentFilter's doFilter begin...");
		/*
		 * (了解)因为sun的过度设计，这儿需要做强制
		 * 转换(我们经常用的是子接口中的方法)。
		 */
		HttpServletRequest request = 
				(HttpServletRequest)arg0;
		HttpServletResponse response = 
				(HttpServletResponse)arg1;
		
		request.setCharacterEncoding("utf-8");
		response.setContentType(
				"text/html;charset=utf-8");
		
		String content = 
				request.getParameter("content");
		
		if(content.indexOf("狗") != -1){
			//有敏感字，中断请求，返回处理结果
			response.getWriter()
			.println("评论包含了敏感字");
		}else{
			//没有敏感字，则继续向后调用
			arg2.doFilter(request, response);
		}
		System.out.println(
				"CommentFilter's doFilter end.");
	}
	/**
	 * 容器在创建好过滤器实例之后，会调用该实例的
	 * init方法(只会调用一次)，容器会将FilterConfig
	 * 对象作为参数传递过来。
	 * 可以利用FilterConfig来读取初始化参数,
	 * 也可以用来获得ServletContext。
	 * 注:
	 * 	ServletConfig也可以获得ServletContext。
	 */
	public void init(FilterConfig arg0) throws ServletException {
		System.out.println(
				"CommenetFilter's init");
		}
	}

step3. 配置过滤器。(web.xml)
		`主要是告诉容器哪一些请求需要拦截
	<filter>
  		<filter-name>commentFilter</filter-name>
  		<filter-class>web.CommentFilter</filter-class>
  	</filter>
  	<filter-mapping>
  		<filter-name>commentFilter</filter-name>
  		<url-pattern>/comment</url-pattern>
  	</filter-mapping>

## (3)过滤器的优先级
当有多个过滤器都满足拦截要求，则容器依据<filter-mapping>
配置的先后顺序来执行。

## (4)过滤器的初始化参数
step1.配置初始化参数
	
	<init-param>
  		<param-name>illegal</param-name>
  		<param-value>猫</param-value>
  	</init-param>

step2. 读取初始化参数值

		String illegal = 
				config.getInitParameter("illegal");

## (5)过滤器的优点
a.可以在不修改原有代码的基础上，为应用添加新的功能。

b.可以将多个组件相同的功能集中写在一个过滤器里面，方便
代码的维护。

# 练习
写一个过滤器，检查评论的字数，如果超过10个字，则提示
“评论字数过多”。


# 2.监听器
## (1)什么是监听器?
servlet规范当中定义的一种特殊的组件，用于监听servlet容器产生的
事件并进行相应的处理。

	注：容器主要产生两大类事件，分别是:
	1)生命周期相关的事件:
			容器创建了或者销毁了request,session,servlet上下文
			时产生的事件。
	2)绑定数据相关的事件:
			调用了request,session,servlet上下文的setAttribute,
			removeAttribute方法时产生的事件。

## (2)如何写一个监听器?
step1. 写一个java类，实现监听器接口。

	注：依据监听的事件类型来选择实现相应的接口。
	比如，要监听session对象的创建和销毁，实现HttpSessionListener
	接口。

step2. 在监听器接口方法当中，实现监听处理逻辑。

step3. 配置监听器。(web.xml)	
		`监听器的配置很简单，只要告诉容器它的类名是什么即可
		<listener>
			<listener-class>web.CountListener</listener-class>
		</listener>

## (3)统计在线人数
![](listener.png)


## 练习
写一个监听器，容器启动之后，将用户表(t_user)中的所有用户信息
查询出来,然后将用户信息绑定到Servlet上下文。

step1. 将UserDAO相关的代码及配置文件拷贝过来。

step2. 写一个java类:

	public class CacheListener 
		implements ServletContextListener{

		public void contextInitialized(ServletContextEvent sce){
			UserDAO dao = new UserDAO();
			List<User> users = dao.findAll();
			ServletContext sctx = 
					sce.getServletContext();
			sctx.setAttribute("users",users);	
		}
	}
step3.配置监听器。


#------------------------------------Servlet.day11--------------------------------------


# 1.Servlet线程安全问题
## (1)为什么说Servlet会有线程安全问题?

a. 容器对于某个servlet,只会创建一个实例。
		过滤器、监听器也是只创建一个实例(单例)
b.　容器每收到一个请求，就会启动一个线程，由该线程来处理该请求。
这样，就有可能有多个线程同时去调用某个servlet实例，就有可能产生
线程安全问题(比如，这些线程都要修改某个属性值)。

![](thread.png)

## (2)如何解决?
使用synchronized对有可能产生线程安全问题的代码块加锁。

	注：
		加锁会影响性能。
		`一般cpu切换也就十几毫秒,性能影响是有限的
# 2.Servlet小结
		`知识体系
## (1)Servlet基础

	1)什么是servlet?
	2)如何写一个servlet?
	3)servlet是如何运行的?
	4)Http协议(了解)

## (2)Servlet核心

	1)如何获得请求参数值?
	2)表单包含有中文参数值，如何处理? 
	3)Servlet输出中文，如何处理?
	4)转发与重定向
		a.什么是重定向?
		b.如何重定向?
		c.重定向的特点?
		d.什么是转发?
		e.如何转发? 
		f.转发的特点?
		g.比较转发与重定向?
	5)servlet容器如何处理请求资源路径?
	6)如何让一个servlet处理多种请求?
	7)servlet生命周期
		a.什么是servlet的生命周期?
		b.分成哪几个阶段?
		c.相关的接口与类
	8)路径问题
	9)servlet线程安全问题
	10)servlet上下文
			
## (3)状态管理
	
	1)什么是状态管理?
	2)Cookie
		a.什么是Cookie? 
		b.如何添加Cookie?
		c.添加Cookie时的三个问题(编码问题、生存时间、路径问题)
		d.读取Cookie
		e.Cookie的限制		
	3)Session
		a.什么是Session?
		b.如何获得Session对象?
		c.常用方法
		d.session超时
		e.删除Session对象
		f.比较Session和Cookie

## (4)数据访问

	1)什么是dao? 
	2)如何写一个dao?
		  
## (5)过滤器与监听器

	1)什么是过滤器?
	2)如何写一个过滤器?
	3)过滤器的优先级?
	4)初始化参数?
	5)过滤器的优点?
	6)什么是监听器?
	7)如何写一个监听器?
	8)容器产生的事件主要有哪一些?

## (6)典型案例

		用户管理
		登录(session验证)


# 3. jsp基础
## (1)什么是jsp?
sun公司制订的一种服务器端动态页面技术规范。
	
	注:
		jsp是一个以".jsp"为后缀的文件，容器会将这个文件转换成
	一个对应的servlet然后执行。
	
## (2)如何写一个jsp文件?
### 1)html(css,js)

	直接写即可。

### 2)java代码 

	方式一:  <%  java代码   %>
	方式二:  <%=java表达式 %>
	方式三:  <%! 声明变量或方法  %>  (a1.jsp)

### 3)隐含对象

	a.什么是隐含对象?
		直接可以使用的对象。
	b.为什么可以直接使用这些隐含对象?
		因为容器会自动添加获得这些对象的代码。
	c.有哪些隐含对象? 
		out,request,response
		session：　(a2.jsp)`演示只为加深印象，没补充啥
		application,
		pageContext(页面上下文): (a3.jsp,a4.jsp)
					注：
						容器会为每一个jsp实例创建唯一的一个符合
					PageContext接口要求的对象，该对象会一直
					存在，除非jsp实例被删除。
					作用1: 绑定数据，绑定到pageContext上的数据只有
						对应的jsp实例能够访问(类似于钱包,每个人都有，但别人不能拿)。
					作用2: 获得其它所有隐含对象。
![](pageContext.png)

		config: (a5.jsp)   `读取初始化参数
					ServletConfig	
		exception: (a6.jsp,a7.jsp)
					用来获得jsp运行过程当中产生的异常信息。
					注：
						只有当page指令的isErrorPage属性值为
						true时才能使用。

		page (了解)	: jsp实例本身。
					注:  jsp对应的servlet实例，一般称之为jsp实例。

### 4)指令

	a.什么是指令?
		通知容器在将jsp转换成一个servlet时，做一些额外的处理，
		比如导包。
	b.语法
		<%@ 指令名　属性＝值 %>		`多个属性空格隔开
	c.page指令
		 pageEncoding属性：指定jsp文件的编码。
		 contentType属性: setContentType。
		 import属性：导包。
		 errorPage属性：指定一个异常处理页面。
		　isErrorPage属性：缺省值是false,如果值为true,就可以使用
						exception隐含对象了。
		 session属性:(a2.jsp)
					 缺省值是true,如果值为false,就不能使用session
					隐含对象了。

	d.include指令
		<%@ include file=""%>
		注：
			通知容器，将file属性指定的文件的内容插入到该指令
			所在的位置。

	e.taglib指令		`明天讲，还没学jsp标签`
		用来导入jsp标签。

###　５)注释  (a8.jsp)
	方式一　　 <!-- 注释内容　-->	
		注：　如果被注释的内容是java代码，java代码会执行。	
				`浏览器认识html注释，java代码会执行，但是不会显示，查看网页源代码可以看到java代码被执行
	方式二　　<%-- 注释内容 --%>	
		注：　如果被注释的内容是java代码,java代码不会执行。

## (3)jsp是如何执行的?
### 阶段一　容器要将jsp转换成一个对应的servlet。

	html(css,js) --------->service方法里，使用out.write输出。
	<%  java代码   %> ----> 照搬到service方法里。
	<%=java表达式 %>  -----> service方法里，使用out.print输出。
	<%! 声明变量或方法  %>　---> 为servlet添加新的属性或者方法。

### 阶段二　容器调用该servlet。
	


#------------------------------------Servlet.day12--------------------------------------


# 1.jsp标签和el表达式
## (1)jsp标签是什么?
jsp标签语法类似于html标签，用于替换jsp中的java代码。

	注:
		因为带有java代码的jsp不利于页面的维护(美工去修改带有
	java代码的jsp很不方便),所以sun推出了jsp标签技术规范。
		使用jsp标签，方便页面的维护，另外，方便代码的复用。

## (2)el表达式是什么?
是一套简单的运算规则，用于给jsp标签的属性赋值。也可以脱离jsp标签，
单独使用。`以前不能单独使用，技术越来越强大了`

## (3)el表达式的使用

### 1)读取bean的属性 (e1.jsp)

	javabean(了解):  `其实就是一个普通的java类而已`
		一个类如果满足如下几个简单的条件，就可以称之为一个javabean。
		public class 
		public 构造器
		最好实现Serializable接口
		有一些属性
		有对应的get/set方法

#### 方式一  ${user.username}
``	**看笔记'el读取bean属性的方法一'**
		a.执行过程:
				依次从pageContext-->request-->session-->
				application查找绑订名为"user"的对象,找到该
				对象之后，会调用该对象的"getUsername"方法，
				然后输出。	`输出方法的返回值
		b.优点
				会将null转换成""输出。
				如果找不到对应的对象，不会报空指针异常,会输出""。
							
		c.指定查找范围
				可以使用pageScope,requestScope,sessionScope,
				applicationScope来指定查找范围。
				比如 ${sessionScope.user.username}

#### 方式二　${user['username']}
``	**看笔记'el读取bean属性的方法二'**
		a. []里面可以出现绑订名。
				`${user[s1] } 首先找四个范围中的user，然后从四个范围找s1，然后找s1的对应的绑定值，调其 首字母大写加get 的方法
		b. []里面可以出现从０开始的下标，用于读取数组中指定
		下标的元素的值。

### 2)做一些简单的运算 (e2.jsp)
	a.算术运算:
			 +,-,*,/,%
			注：　+　只能求和！
		
	b.关系运算:
			 >,<,>=,<=,==,!=

	c.逻辑运算:
			&&,||,!

	d.empty运算:
			用来判断集合是否为空，或者是不是一个空字符串。
	
### 3)读取请求参数值 (e3.jsp)
	${param.name}
		等价于　request.getParameter("name");

	${paramValues.city}
		等价于 request.getParameterValues("city");

## (4)jstl (jsp standard tag lib)
### 1)jstl是什么?
apache开发的一套jsp标签，后来捐献给了sun,sun将其命名为jstl。
		
### 2)如何使用jstl?
step1.导入jstl相关的jar文件。

	<dependency>
  		<groupId>jstl</groupId>
  		<artifactId>jstl</artifactId>
  		<version>1.2</version>
	</dependency>

step2.使用taglib指令引入要使用的jsp标签。
		看课堂笔记
	<%@ taglib uri="" prefix=""%>
	uri属性：指定要引入的jsp标签的命名空间。 
		注:
			为了区分同名的元素在元素前添加的一个限定，通常是一个
		域名(为了避免命名空间也冲突)。
	prefix属性：命名空间的别名。`命名空间通常是域名，很长，取别名简洁`

###　3)if标签
a.语法:
	
	<c:if test="">
		标签体
	</c:if>

b.用法:
	
	如果test属性值为true,容器会执行标签体。
	test属性值可以使用el表达式来赋值。

![](if.png)

### 4)choose标签　(choose.jsp)
a.语法:

	<c:choose>
		<c:when test="">		`when:当什么时候。此标签至少出现一次
		</c:when>
		...
		<c:otherwise>			`相当于最后一个else
		</c:otherwise>
	</c:choose>
	
b.用法:
	
	when可以出现一次或者多次(相当于一个if语句),otherwise
	可以出现０次或者１次(相当于最后那个else,表示例外)。
	当test属性值为true时，执行标签体的内容。
		
### 5)forEach标签 (forEach.jsp)
a.语法:

	<c:forEach items="" var="" varStatus="">
	</c:forEach>

b.用法:
	
	items属性用来指定要遍历的集合或者数组，该属性可以使用
	el表达式来计算。
	var属性用来指定绑订名。
		注：
			绑订范围固定是pageContext,该标签每次从集合或者数组中
		取一个元素，然后将其绑订到pageContext上。
	varStatus属性用来指定绑订名。
		注：
			绑订值是一个对象，由该标签内部创建，用来获得当前遍历的状态，
		getIndex():用来获得当前正在被遍历的元素的下标(从０开始)
		getCount():用来获得当前遍历的次数(从1开始)。
			


#　练习 使用el表达式输出员工对象的各个属性值
	Employee类(ename,salary,age)


				

#------------------------------------Servlet.day13--------------------------------------


# 1.自定义标签
step1. 写一个java类，继承SimpleTagSupport类。

	注：
		继承SimpleTagSupport类开发的标签属于简单标签技术。

step2. override doTag方法，编写处理逻辑。

	/**
	 * 标签类:
	 *    1.继承SimpleTagSupport类。
	 *    2.override doTag方法。
	 *	  3.标签有哪些属性，标签类也得有对应的
	 *	属性，属性名要一样，类型要匹配，并且有对应的
	 *	set方法。
	 */
	public class HelloTag extends SimpleTagSupport{
	
	private String info;
	private int qty;
	
	public HelloTag(){
		System.out.println(
				"HelloTag's constructor");
	}
	
	
	public void setInfo(String info) {
		System.out.println("HelloTag's setInfo");
		this.info = info;
	}

	public void setQty(int qty) {
		System.out.println("HelloTag's setQty");
		this.qty = qty;
	}

	@Override
	public void doTag() throws JspException, IOException {
		
		System.out.println("HelloTag's doTag");
		
		/*
		 * 通过继承自SimpleTagSupport提供的
		 * 方法来获得PageContext，PageContext
		 * 提供了获得其它所有隐含对象的方法。
		 */
		PageContext pctx = 
				(PageContext)getJspContext();
		JspWriter out = pctx.getOut();
		
		for(int i = 0; i < qty; i ++){
			out.println(info+"<br/>");
			}
		}
	}

step3. 在.tld文件当中描述标签(.tld文件要放到WEB-INF下)。
	

	<?xml version="1.0" encoding="UTF-8" ?>
	<taglib xmlns="http://java.sun.com/xml/ns/javaee"
	    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-jsptaglibrary_2_1.xsd"
	    version="2.1">
	  <tlib-version>1.1</tlib-version>
	  <short-name>t</short-name>
	  <uri>http://tedu.cn/mytag</uri>
	  <tag>
	    <name>hello</name>
	    <tag-class>tag.HelloTag</tag-class>
	    <!-- 
	    	body-content是用来告诉容器，标签
	    	有没有标签体，如果有，可以出现哪些内容。
	    	empty: 没有标签体。
	    	scriptless:有标签体，但是，标签体里面不能
	    		够出现java代码(<%  %><%= %><%! %>)。
	    	JSP:有标签体，并且标签体里面允许出现java代码。
	    	但是，只有复杂标签技术才支持这个值。
	     -->
	    <body-content>empty</body-content>
	    <attribute>
	        <name>info</name>
	        <!-- 
	        	required值为true,表示该属性必选。
	         -->
	        <required>true</required>
	        <!-- 
	        	rtexprvalue值为true,表示该属性可以
	        	动态赋值(比如可以使用el表达式来赋值)
	         -->
	        <rtexprvalue>false</rtexprvalue>
	    </attribute>
	    <attribute>
	    	<name>qty</name>
	    	<required>true</required>
	    	<rtexprvalue>true</rtexprvalue>
	    </attribute>
	  </tag>
	</taglib>

# 练习
写一个jsp标签，可以按照指定的日期格式输出当前的系统日期，比如
	
	<t:date pattern="yyyy-MM-dd"/>



# 2.MVC(Model View Controller)
## (1)什么是MVC?
 是一种软件架构思想、其核心思想是，在设计一个软件的时候，应该将数据处理
与数据展现分开，按照这种思想，我们可以将软件划分成三种不同类型的模块，
分别是模型、视图和控制器。
 其中，模型负责数据处理(业务逻辑)，视图负责数据展现(表示逻辑)，控制器
负责协调模型和视图(请求先发送给控制器，由控制器选择调用对应的模型来
处理；模型返回处理结果给控制器，由控制器选择调用对应的视图来展现)。

## (2)如何使用MVC来开发一个web应用?
![](mvc.png)


## (3)优缺点
a.方便代码的维护。

	模型返回的处理结果，可以使用不同的视图来展现。
		`视图变化，对model没有影响；model变化，对视图也没影响
b.方便测试。

	比如，在业务逻辑写在java类里面，可以立即测试，如果将
	业务逻辑写在servlet里面，需要部署整个应用才能测试。

c.方便分工协作。

d.但是，使用MVC，会增加代码量，增加设计的难度、相应增加软件开发的
成本。所以，只有具有一定规模、并且要求软件具有良好的扩展性、维护性
才需要使用MVC。

	

# 练习
将用户管理模块中的所有jsp移到"/WEB-INF/"下


#------------------------------------Servlet.day14--------------------------------------

# java反射和java注解

# 1.实现一个简单的MVC框架(smartmvc)
## (1)目标
实现一个简单的web mvc框架，其核心是一个可以重用/通用的控制器。
基于该框架开发一个web应用，只需要写模型和视图。

## (2)架构
![](smartmvc.png)

	注：
		DispatcherServlet(控制器)负责接收请求，然后依据HandlerMapping(映射处理器)提供的信息调用对应的
		Controller(处理器)来处理。
		处理器返回视图名(一个字符串，比如"hello")给控制器，
		后者将视图名转换成对应的jsp(按照"/WEB-INF/" + 视图名 + ".jsp")地址然后转发。

## 练习(参考步骤)
		`改进：配置文件不写死，允许使用框架的开发人员起什么名都可以。
					把文件名配置成初始化参数，在web.xml中加<init-param...标签，以后开发人员在这里把文件名改一下即可。
	step1. 新建一个maven工程
	step2. 导包(dom4j)
	step3. 添加一个hello.jsp (放到/WEB-INF/下)
	step4. 添加HelloController (放到demo包下)
			方法前要添加@RequestMapping,方法的返回值是视图名。
	step5. 添加@RequestMapping (放到base.annotation包下)
	step6. 添加smartmvc.xml(放到resources下),配置HelloController
	step7. 添加DispatcherServlet(放到base.web包下)


#------------------------------------Servlet.day15--------------------------------------
###(1)(2)都复制自day14

## (1)目标
实现一个简单的web mvc框架，其核心是一个可以重用的控制器。
基于该框架开发一个web应用，只需要写模型和视图。

## (2)架构
![](smartmvc.png)

	注：
		DispatcherServlet(控制器)负责接收请求，然后依据HandlerMapping(映射处理器)提供的信息调用对应的
		Controller(处理器)来处理。
		处理器返回视图名(一个字符串，比如"hello")给控制器，
		后者将视图名转换成对应的jsp(按照"/WEB-INF/" + 视图名 + ".jsp")地址然后转发。

## (3)各个组件的关系
![](mvc.png)


#------------------------------------Servlet.day16--------------------------------------
###1.16号 第一节课；  smartmvc-demo用来演示别人如何使用我们写的smartmvc框架(步骤见课堂笔记)。

# 如何使用smartmvc?
step1.导包。

	<dependencies>
		<dependency>
			<groupId>dom4j</groupId>
			<artifactId>dom4j</artifactId>
			<version>1.6.1</version>
		</dependency>
	</dependencies>

step2.将smartmvc核心的类拷贝过来(base包)

step3.添加smartmvc的配置文件。

step4.配置DispatcherServlet(web.xml)。

	<servlet>
    	<servlet-name>DispatcherServlet</servlet-name>
   	 	<servlet-class>base.web.DispatcherServlet</servlet-class>
    	<!--
    		指定配置文件的名称 
     	-->
    	<init-param>
    		<param-name>configLocation</param-name>
    		<param-value>config.xml</param-value>
    	</init-param>
    	<load-on-startup>1</load-on-startup>
  	</servlet>
  	<servlet-mapping>
    	<servlet-name>DispatcherServlet</servlet-name>
    	<url-pattern>*.do</url-pattern>
  	</servlet-mapping>

step5. 添加bmi.jsp和view.jsp

step6.　添加BmiController

step7. 在配置文件当中配置处理器。

	<?xml version="1.0" encoding="UTF-8"?>
	<beans>
		<!-- 
			配置处理器：
			class属性用于指定处理器类名。
	 	-->
		<bean class="controller.BmiController"/>
	</beans>













