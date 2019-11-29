
#----------------------------------程祖红Spring.day01------------------------------------
###1.16号 除第一节课；  spring-day01工程讲spring；spring-day01-lab做练习

# 1.Spring　   
## (1)Spring是什么?
是一个开源的、用来简化企业级开发的应用开发框架。

	注:
		a.简化开发:
			Spring框架对很多常用的api做了简化，比如，直接使用
		jdbc访问数据库，需要获取连接、关闭连接，处理异常等等，而
		使用Springjdbc访问数据库，就不再需要关注如何获取连接、关
		闭连接。
		b.管理对象:
			Spring框架帮我们创建对象，并且建立对象之间的依赖关系。
		这样一来，对象之间的耦合度会大大降低，提高了整个软件的维护
		性。
		c.对很多常用的框架提供了集成的机制。
			Spring框架对一些常用的框架提供了集成的机制，这样，使用
		这些框架时就更加方便。

## (2)Spring容器
### 1)Spring容器是什么?
Spring容器是Spring框架中的一个核心模块，用于管理对象。

### 2)如何启动Spring容器?
step1.导包。

	<dependency>
  		<groupId>org.springframework</groupId>
  		<artifactId>spring-webmvc</artifactId>
  		<version>3.2.8.RELEASE</version>
	</dependency>

step2.添加spring配置文件。

	<?xml version="1.0" encoding="UTF-8"?>
	beans xmlns="http://www.springframework.org/schema/beans" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context" 
	xmlns:jdbc="http://www.springframework.org/schema/jdbc"
	xmlns:jee="http://www.springframework.org/schema/jee" 
	xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:aop="http://www.springframework.org/schema/aop" 
	xmlns:mvc="http://www.springframework.org/schema/mvc"
	xmlns:util="http://www.springframework.org/schema/util"
	xmlns:jpa="http://www.springframework.org/schema/data/jpa"
	xsi:schemaLocation="
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.2.xsd
		http://www.springframework.org/schema/jdbc http://www.springframework.org/schema/jdbc/spring-jdbc-3.2.xsd
		http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.2.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.2.xsd
		http://www.springframework.org/schema/data/jpa http://www.springframework.org/schema/data/jpa/spring-jpa-1.3.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.2.xsd
		http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd
		http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-3.2.xsd">
	</beans>

step3.启动Spring容器。

		/*
		 * 启动Spring容器:
		 * ApplicationContext是一个接口，定义了Spring
		 * 容器的基本方法。
		 * ClassPathXmlApplicationContext实现了
		 * ApplicationContext接口。
		 * 注：
		 * 　　　依据类路径去查找配置文件。
		 */
		ApplicationContext ac = 
			new ClassPathXmlApplicationContext(
					"applicationContext.xml");

### 3)创建对象
方式一　　使用无参构造器

	step1.为一个类提供无参构造器（缺省构造器）	`或者使用缺省构造器，即不写构造器，这里写是为了让控制台输出。`
		
		public class Apple {
			public Apple() {
				System.out.println(
						"Apple's constructor");
			}
		}

	step2.在配置文件当中进行相应的配置。

		<!--
		使用无参构造器来创建对象。
		id属性：要求唯一 。
		class属性：要写类的完整的名称。
	 	-->
		<bean id="a1" class="first.Apple"/>
 	
	step3.启动Spring容器，调用容器的方法来获得对象。

		/*
		 * 依据id获得对应的对象。
		 * getBean方法的第一个参数是bean的id。
		 */
		Apple a1 = ac.getBean("a1",
				Apple.class);
		
		System.out.println("a1:" + a1);
			

方式二 使用静态工厂方法(了解)

	<!-- 
		使用静态工厂方法来创建对象。
		factory-method属性：用来指定静态方法名。
		注：
			Spring容器会调用该类的静态方法来创建
			一个对象。
	 -->
	<bean id="cal1" 
	class="java.util.Calendar" 
	factory-method="getInstance" />

方式三　使用实例工厂方法(了解)

	<!-- 
		使用实例工厂方法来创建对象：
		factory-bean属性：指定要调用的bean的id,
		factory-method属性：指定要调用的实例方法。
		注：
			Spring容器会调用该bean的实例方法来
			创建对象。
			在Spring框架里面，所谓的bean指的是由
			Spring容器管理的对象。
	 -->
	<bean id="date2" factory-bean="cal1" 
	factory-method="getTime"/>	

### 4)bean的作用域
a.默认情况下，容器对于某个bean,只会创建一个实例。
		`应用中大部分都是缺省值，即单例
b.可以通过scope属性来指定bean的作用域：

	<!-- 
		scope属性：用来指定bean的作用域。
		缺省值是"singleton"(单例),如果值为
		"prototype"(原型),则创建多个实例。
	 -->
	<bean id="sb1" class="basic.ScopeBean" 
	scope="prototype"/>

### 5)bean的生命周期
  
	<!-- 
		init-method属性：用来指定初始化方法。
		destroy-method属性：用来指定销毁方法。
		注:
			Spring容器关闭之前，会删除它所管理的
			bean,在删除bean之前，会调用destroy
			方法。
			销毁方法只针对作用域为singleton的bean。
	 -->
	<bean id="mb1" class="basic.MessageBean"
	init-method="init"
	destroy-method="destroy"
	scope="singleton"/>

### 6)延迟加载(了解)
		`bean的延迟加载
a.默认情况下，Spring容器启动之后，会将所有作用域为"singleton"
的bean实例化。

b.
	
	<!-- 
		lazy-init属性：如果值为true,表示延迟加载。
		即容器启动之后，不会立即创建该实例，只有等
		到调用时(getBean)才创建。
	 -->
	<bean id="lb1" class="basic.LazyBean" 
	lazy-init="true"/>
	


# (3)IOC/DI
## 1)什么IOC(Inversion Of Controll 控制反转)?
对象之间的依赖关系由容器来建立。
		`大型的软件有特别多的对象，如果耦合度高肯定是不好维护。让容器来建立依赖关系来达到低耦合

# 练习1: 
使用Spring容器来获得一个Student对象，要求使用无参构造器。

# 练习2:
使用Spring容器来创建一个Student对象，要求如下:

	a.使用无参构造器。
	b.提供初始化方法和销毁方法。
	c.作用域为singleton。  `缺省就是`
	d.不使用延迟加载。  `缺省就是`


#-------------------------------------SPRING.day01--------------------------------------
###工程名SPRING-02-IOC
### 成恒 / chengheng@tedu.cn

### 1. Spring IoC

**IoC：Inversion of control：控制反转**：在传统开发模式下，对象的创建过程和管理过程都是由开发者通过Java程序(代码)来实现的，操作权在开发者的Java程序中，当使用了Spring框架后，对象的创建与管理都不再由开发者编写的程序来决定！而是交给框架来决定，具体的做法可以是通过配置框架的XML文件来实现，或其它方式。

**DI：Dependency Injection：依赖注入**：为类的属性注入值。

IoC是Spring框架所实现的目标，而DI是实现该目标所使用的手段，即：**Spring通过DI实现了IoC**。

		IoC和DI描述的是同一个事：注入属性的值

### 2. 通过SET方式为属性注入值

可能通过配置Spring的配置文件，使得类中的属性是注入过值的，最终，当从Spring容器中获取对象时，其中的属性就已经有值了！

要为属性注入值，首先，需要为属性添加SET方法：

	public class User {
		Integer age;

		public void setAge(Integer age) {
			this.age = age;
		}
	}

然后，在Spring的配置的XML中：

	<bean id="xx" class="xx.xx.xx">
		<property name="age" value="23" />
	</bean>

以上配置中，`<property>`节点用于配置属性的值，`name`可以理解为属性名称，`value`就是需要注入的值，仅适用于属性的值是基本值（可以直接书写的值，例如数值、布尔值、字符或字符串）的情况，如果属性的值是对象型的，需要在Spring的配置文件中先配置对象所归属的类的`<bean>`，然后，注入值时，使用`ref`属性引用到那个`<bean>`的`id`值：
`		`**引用别的bean用ref，不引用别的bean是value**
	<bean id="now"
		class="java.util.Date" />

	<bean id="user"
		class="cn.tedu.spring.User">
		<property name="regTime" ref="now" />
	</bean>

注意：在`<property>`节点中，`name`属性的值，其实是类中的属性对应的SET方法名称中`set`右侧的名称且首字母小写，例如SET方法名是`setAge`，则此处`<property name="???">`的值应该是`age`，如果SET方法名是`setFrom`，则`<property name="???">`的值应该是`from`！但是，通常可以不必关心这个问题，因为SET方法应该是通过Eclipse这种开发工具自动生成的，SET方法的名称是规范的，与Spring框架使用的规则是相同的，所以，只要能保证SET方法的名称是规范的，不必纠结`<property>`中的`name`属性到底指的是什么。`说是指属性名称也对`
		`Spring框架其实就是根据你配置的name属性的值组装出了set方法的名称并调用，即name="age" value="23"-->setAge(23)`
### 3. 【不常用】 通过构造方法注入属性的值

假设存在：

	public class Person {
		public String from;

		public Person(String from) {
			this.from = from;
		}
	}

即：需要注入值的属性并没有SET方法，而是存在构造方法为该属性赋值，在这种情况下的配置应该是：

	<!-- 通过构造方法注入属性的值 -->
	<!-- constructor-arg节点用于配置构造方法的参数 -->
	<bean id="person"
		class="cn.tedu.spring.Person">
		<constructor-arg 
			index="0" value="Shenzhen" />
	</bean>

在以上配置中，`<constructor-arg>`节点用于配置构造方法的参数，节点中的`index`属性表示参数的序号，是从0开始顺序编号的，即第1个参数的`index`值应该是0，如果有更多的参数，第2个参数的`index`值应该是1，以此类推，**需要注入的值根据类型选取`value`或`ref`即可**。

### 4. 注入集合类型的值
	
常见的集合类型的数据有：List、Set、Map和数组，在注入这些类型的属性值时，还是应该先选取使用SET方式注入，或使用构造方法注入，通常，优先选择通过SET方式注入：

	public class SampleBean {
		
		// 期望值：Tom, Kate, Mary, David
		private List<String> names;
		// 期望值：Beijing, Shanghai, Guangzhou, Shenzhen
		private Set<String> cities;
		// 期望值：uid=9527, username=Jack, password=1234
		private Map<String, String> session;
		// 期望值：3个数字
		private Integer[] numbers;
	
		public List<String> getNames() {
			return names;
		}
	
		public void setNames(List<String> names) {
			this.names = names;
		}
	
		public Set<String> getCities() {
			return cities;
		}
	
		public void setCities(Set<String> cities) {
			this.cities = cities;
		}
	
		public Map<String, String> getSession() {
			return session;
		}
	
		public void setSession(Map<String, String> session) {
			this.session = session;
		}
	
		public Integer[] getNumbers() {
			return numbers;
		}
	
		public void setNumbers(Integer[] numbers) {
			this.numbers = numbers;
		}
	
	}

在编写XML配置时，由于使用的是SET方式注入，所以，还是在`<bean>`节点之下添加`<property>`进行注入，根据属性类型的不同，选择不同的子级节点，例如`<list>`、`<set>`、`<map>`、`<array>`：

	<!-- 注入集合类型的值 -->
	<bean id="sampleBean"
		class="cn.tedu.spring.SampleBean">
		<!-- 注入List类型的值 -->
		<property name="names">
			<list>
				<value>Tom</value>
				<value>Kate</value>
				<value>Mary</value>
				<value>David</value>
			</list>
		</property>
		<!-- 注入Set类型的值 -->
		<property name="cities">
			<set>
				<value>Hangzhou</value>
				<value>Beijing</value>
				<value>Shanghai</value>
				<value>Guangzhou</value>
				<value>Shenzhen</value>
			</set>
		</property>
		<!-- 注入Map类型的值 -->
		<property name="session">
			<map>
				<entry key="uid" value="9527" />
				<entry key="username" value="Jack" />
				<entry key="password" value="1234" />
			</map>
		</property>
		<!-- 注入数组类型的值 -->
		<property name="numbers">
			<list>
				<value>7</value>
				<value>3</value>
				<value>9</value>
			</list>
		</property>
	</bean>
`  `**读取properties配置文件**
在实际应用中，还经常需要使用到`.properties`类型的配置文件，在Spring中，只需要通过`<util:properties>`节点就可以轻松读取这类型的配置文件： 

	<!-- 读取.properties文件 -->
	<!-- classpath表示src/main/resources文件夹 -->
	<util:properties id="dbConfig"
		location="classpath:db.properties" />

需要注意的是`<util:properties>`本质上还是`<bean>`，所以，**可以被其它的注入操作来引用**：`用Spring表达式注入`

	<!-- 注入来自.properties中的配置 -->
	<property name="properties" ref="dbConfig" />

在某些场景中，如果一定需要自行配置`Properties`类型的值，其结构为：

	<property name="xx">
		<props>
			<prop key="username">root</prop>
			<prop key="password">1234</prop>
		</props>
	</property>

以上所有关于集合类型的值的注入操作中，`Properties`类型的相关操作属于略常用操作，其它类型的注入操作相对更少。

### Spring表达式

通过Spring表达式，可以在配置中访问到某个`Bean`的某个属性的值！

Spring表达式的基本格式是`#{表达式}`，假设`ValueBean`中有`username`属性，其值是`User`中的`name`属性值，则配置为：

	<bean id="valueBean"
		class="cn.tedu.spring.ValueBean">
		<property name="username"
			value="#{user.name}" />
	</bean>
	
以上Spring表达式`#{user.name}`中，`user`是bean id，`name`是属性名。

假设`ValueBean`中有`realname`属性，其值是`SampleBean`中的`names`（List类型的集合）中的第2个值，则配置为：

	<property name="realname"
			value="#{sampleBean.names[1]}" />


假设`ValueBean`中有`password`属性，其值是`SampleBean`中的`session`（Map类型的集合）中Key为`password`的值，则配置为：

	<property name="password"
			value="#{sampleBean.session.password}" />

以上访问Map集合中的数据的表达式还可以写为`#{sampleBean.session['password']}`，但是，使用相对比较麻烦，并不推荐这样使用！

总的来说，使用Spring表达式可以访问其它Bean中的属性值：

- 某属性的值：`#{bean-id.属性名称}`
- 访问List集合中的值：`#{bean-id.集合名称[下标或索引]}`
		下标和索引都一样，一定要区分的话：数组叫下标，集合叫索引
- 访问Map集合中的值：`#{bean-id.集合名称.key}`或`#{bean-id.集合名称['key']}`
		Set、Properties...的访问方法自己试
### 【附】 Resource Leak / 内存溢出 / 内存泄露

连接型资源在使用完之后，应该调用类似于`close()`的方法，以释放资源，否则，将可能导致内存溢出。

内存溢出指的是：某个资源已经无法再使用，但是，连接可能依然存在，对于开发者而言，无法再调用其任何属性或方法，所以，是一个垃圾数据，但对于JVM而言，由于连接是存在的，被视为“仍处于使用状态”，不会认为它是一个垃圾数据，则不会回收！这样的数据的表现就是“对于程序员来说无法再使用，对于JVM而言却不会去回收”，所以，这样的数据会长期占用内存，如果这样数据越来越多，将导致可用内存越来越少，达到极限状态时就会出现溢出！
		`溢出就漏出去了，就没了`

所以，少量的内存溢出并没有明显的危害，但是，每一个开发者都应该尽量的解决所有可能的内存溢出问题！核心宗旨就是“用完了及时关闭，无法随时关闭的，善用try..catch..finally”。
		`即使try里有return，也会走finally`
### 【附】 关于解决XML文件无法自动提示的问题
		`笔记'##xml-xsd/dtd文件 & Alt+/提示 & XML Schema代理服务器的使用'
http://schema.tedu.cn/proxy/

### 【附】 在.properties文件中使用中文
 
![](01.png)

### 【附】 FTP中的文件

- DAY0?.html 网页版的笔记，需下载后查看，否则会有乱码
- DAY0?.md Markdown版的笔记，使用任意文件编辑软件都可以查看
- DAY0?-??-AM/PM 项目代码的压缩包
- DAY0?-ALL-AM/PM 全部内容打包的压缩包


#-------------------------------------SPRING.day02--------------------------------------
###1.18号 下午第一节课讲完；  SPRING-02-IOC工程讲自动装配(上午第一节课)；SPRING-O3-ANNOTATION工程讲注释

### 1. 自动装配：Autowire

自动装配是一种自动为Bean的属性注入值的做法！

假设存在`Student`类：
	
	public class Student {
	
		private City from;
	
		public City getFrom() {
			return from;
		}
	
		public void setFrom(City from) {
			this.from = from;
		}
	
	}

类的属性希望被自动的注入值，则应该配置它的`autowire`属性：

	<bean id="student"
		class="cn.tedu.spring.Student"
		autowire="default">
	</bean>

关于`autowire`属性，取值可以是`byName`，表示**根据名称实现自动装配**，即：要求类中的属性名与被装配进来的Bean的id保持一致（其实本质上还是通过SET方法注入的，要求的是SET方法的名称与Bean的id保持一致），所以：

	<bean id="from"
		class="cn.tedu.spring.City" />
	
	<bean id="student"
		class="cn.tedu.spring.Student"
		autowire="byName">
	</bean>

自动装配其实是**尝试自动装配**，即：能够装配就装配，不能装配也不会报错！

配置时，`autowire`属性的取值还可以是`byType`，即**根据类型实现自动装配**，Spring容器在尝试自动装配时，会在容器中（Spring管理的范围内）查找类型匹配的对象，如果没有，则不装配，如果有1个，则可以成功的自动装配，如果匹配类型的有2个或更多，则抛出异常`UnsatisfiedDependencyException`！
		`byType这种方式不要求当前类中Set方法名要一致，但是需要Set方法。是根据当前类中属性的类型去匹配。
		`并且，byType不是类型直接匹配：如果是写的类的子类，或者写的接口的实现类，都是可以匹配上的

除此以外，该属性(autowire)还可以有其它取值，但是，通常，**并不会在开发中使用该属性**，因为它存在是否装配不明确的问题！而且，在实际开发中，其实自定义的Bean根本就不会在XML文件中配置，所以更加无处使用该属性！
		`装配不明确：说白了，甚至还不如我们写property。写property虽然麻烦，但是谁有值谁没值一目了然。

关于自动装配，重点理解`byName`和`byType`的特点。
		`byName要求名称一致并且要有正确的set方法
		`byType要求匹配的对象有且只有一个

### 2. 注解

#### 2.1. 为什么要使用注解

使用XML应用Spring时，需要使用大量的配置，导致代码的可读性较差（在阅读代码时，经常需要结合多个Java文件和XML配置一起查阅），并且，在XML配置中，如果出现拼写错误也不会实时提示错误信息！

在实际使用时，会大量的使用注解，来取代XML中的配置！

#### 2.2. 基本注解

如果希望某个类被Spring管理，可以在类上添加`@Component`注解，并且，在Spring的配置文件中添加组件扫描的配置：

	<!-- 组件扫描 -->
	<!-- base-package：根包 -->
	<context:component-scan 
		base-package="cn.tedu.spring" />

以上配置中的`base-package`用于指定组件所在的包，当加载该配置文件时，Spring框架会扫描指定的包，如果类之前添加了注解，则会被Spring管理。

扫描的包之所以是`base-package`，表示各个类在其各层级的子包下，都会被扫描到，例如配置为`cn.tedu.spring`时，如果类是`cn.tedu.spring.dao.UserDao`，也是在扫描范围之内的！
``		**极端的：配置为cn也在扫描范围内--因为写的是根包**

默认情况下，会使用类名且首字母改为小写作为Bean的id，所以，如果被Spring管理的是`Student`类，则默认的id就是`student`，当然，如果觉得默认的id命名不满足当前的应用需求，可以配置注解属性：

	@Component("stu")
	public class Student {
	}

与`@Component`相同的注解还有：

- `@Controller`：如果某个类在应用中起到的作用是控制器，则应该使用该注解
- `@Service`：如果某个类在应用中起到的作用是业务逻辑类，则应该使用该注解	
- `@Repository`：如果某个类在应用中起到的作用是持久层处理（增删改查），则应该使用该注解  `DAO`
		`看课堂笔记MVC-Model补充`
其实，以上4个的作用、语法是完全相同的，只是语义不同，建议区分使用。
		`只是给人表达的意思不一样，混用也可以。建议区分使用，如果不归属于后三个的就用Component即可`

#### 2.3. 【不常用】 作用域与生命周期的注解

使用`@Scope`注解可以配置Bean的作用域，例如希望实现非单例效果时：

	@Component("stu")
	@Scope("prototype")
	public class Student extends Object {
	
	}

在单例的情况下，如果需要单例模式是懒汉式的，则可以使用`@Lazy`注解：

	@Component("stu")
	@Lazy
	public class Student extends Object {
	
		public Student() {
			System.out.println("Student()");
		}
		
	}

其实，`@Lazy`注解也可以配置属性值为`true`或`false`，但是，没有添加该注解时就是饿汉式的，添加该注解表示懒汉式且值为`true`，所以，不必配置属性值！

关于生命周期方法：
	
	@PostConstruct
	public void init() {
		System.out.println("Student.init()");
	}
	
	@PreDestroy
	public void destroy() {
		System.out.println("Student.destroy()");
	}

注意：以上2个注解是`javax`包中的注解，应该添加Tomcat或其它服务端环境。

### 2.4. 自动装配的注解

假设存在`Student`类中的`public City from;`属性需要被装配值：

	@Component
	public class Student {
		public City from;
	}

首先，`City`应该在Spring管理范围之内，即：需要在组件扫描范围之内，且添加了注解：

	package cn.tedu.spring;

	@Component
	public class City {
	}

然后，在`Student`类的`from`属性之前，添加`@Autowired`注解即可：

	@Autowired
	public City from;

至此，自动装配已经完成！

与使用XML配置自动装配不同，注解方式的自动装配并不要求属性有SET方法，对属性的访问权限也没有要求，即使属性是私有的，也不影响装配过程！
		`在反射面前所有权限都是浮云，反射都能访问到
`@Autowired`注解是`byType`模式来装配的！所以，要求匹配类型的Bean对象有且仅有1个（0个则无法装配，属性值为null，多个则直接抛出异常）！如果项目中确实有多个匹配类型的类，则只保留1个被Spring管理，其它的不由Spring管理即可，例如去掉类之前的`@Component`或相同作用的注解，或把这些类转移到组件扫描的包以外去。

使用`@Resource`注解也可以实现自动装配，它是优先`byName`，如果失败，则会尝试`byType`。并且，使用`@Resource`时，如果一定要根据名称来装配，却存在名称不匹配的问题，可以在注解中配置名称：

	@Resource(name="city")	 `即名称明明叫from，我却想让它匹配city，可以这么指定
	public City from;

以上`@Autowired`和`@Resource`都可以实现自动装配，在实际应用中，使用任何一个都可以！因为`@Resource`功能更强，所以很多人喜欢使用它，但是，并不是每个Java项目都是服务端项目，某些项目中可能并没有`javax`包中的内容，也就根本没有`@Resource`注解，就只能使用`@Autowired`，当然，这样的项目毕竟是少数，所以，在使用Java开发的Web应用程序中，使用这2种注解中的任何一个都是正确的做法！

### 2.5. 小结

常用注解：

- `@Controller`
- `@Service`
- `@Component`
- `@Autowired` / `@Resource`

非常用注解：

- `@Repository`
- `@Scope`
- `@Lazy`
- `@PostConstruct`
- `@PreDetroy`



### 【附】 关于单例模式
		看我的笔记'Bean的作用域解释'
	public class King {
		private static King king;

		private King() {
		}

		public static King getInstance() {
			synchronized("lock") {
				if (king == null) {
					king = new King();
				}
			}
			return king;
		}

	}


#-----------------------------------SPRINGMVC.DAY01-------------------------------------
###1.18号 下午第二节课开始；  工程SPRINGMVC-01-HELLO


## Spring MVC

### 1. 框架的作用

SpringMVC主要解决了控制器如何接收客户端的请求，并将处理结果响应给客户端的问题。

在传统的Java EE开发中，控制器是`Servlet`，主要存在的问题有：
1. 每个`Servlet`都需要在`web.xml`中配置，一个完整的项目可能需要大量代码完成所有`Servlet`的配置，所以，存在配置过多、管理难度大的问题；
2. 由于一个完整的项目中可能有大量的`Servlet`，则项目启动后，会消耗大量的内存去存储这些`Servlet`的对象；
3. 由于一个完整的项目中可能有大量的`Servlet`，在编码时，管理难度也会增加；
4. 原生的Java EE中的API使用并不便利！`原生API设计的不好。可以用，但是不好用，不简便`

### 2. 框架的核心组件

在SpringMVC中，有以下5大核心组件（还有其它组件）：

- `DispatcherServlet`：接收请求，并分发给各个控制器
- `HandlerMapping`：处理请求路径与控制器的映射关系
- `ModelAndView`：控制器的处理结果
- `ViewResolver`：处理视图名与具体使用的视图组件的映射关系
- `Controller`：具体处理请求并给出响应结果

具体的工作流程图：

![](01.png)

### 3. Spring MVC - Helloworld

**目标**

在浏览器中输出`http://localhost:8080/项目名/hello.do`后，能显示某页面，页面中有`Hello, SpringMVC!`字样。

**创建项目**

创建Maven Project，`Group Id`为`cn.tedu.spring`，`Artifact Id`为`SPRINGMVC-01-HELLO`，`Packaging`为`war`。

然后，生成`web.xml`文件，添加`spring-webmvc`依赖，复制此前项目中的`spring.xml`到当前项目中并清除原有的配置，添加Tomcat运行环境。

**配置DispatcherServlet**

由于希望SpringMVC框架能接收到相关的请求，所以，首先应该对`DispatcherServlet`进行配置：

	<servlet>
		<servlet-name>SpringMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
	</servlet>

	<servlet-mapping>
		<servlet-name>SpringMVC</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>

> 关于DispatcherServlet的包名，可以在任意Java类中声明DispatcherServlet变量，由Eclipse完成导包，则在import语句中就有了该类的包名。

以上配置中，`<url-pattern>`中配置的是`*.do`，表示SpringMVC框架将接收所有以`.do`作为资源名后缀的请求，而并不处理例如`.html`、`.jpg`等请求，如果希望接收并处理所有请求，可以使用`/*`或其它使用了通配符的配置。

为了使得Spring的运行环境是正常的，应该保证在项目部署到Tomcat的第一时间就加载Spring的配置，要实现这样的效果，可以使得：`DispatcherServlet`是默认启动的（配置`<load-on-startup>`节点），并且，它启动时加载Spring的配置文件（`DispatcherServlet`的父类`FrameworkServlet`中有`contextConfigLocation`属性，表示初始化时加载哪个配置文件）！		`可在在web.xml中ctrl点进DispatcherServlet类，然后再进父类查看这个属性`

	<servlet>
		<servlet-name>SpringMVC</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:spring.xml</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>

	<servlet-mapping>
		<servlet-name>SpringMVC</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>

至此，项目的运行效果为：启动时，会直接初始化`DispatcherServlet`，并且在初始化时，还会自动加载`spring.xml`配置文件。

如果需要检查配置是否成功，可以：使得某个类被Spring管理，且在构造方法中添加输出语句！如果启动项目时可以看到输出语句，则成功！

**接收并处理请求**

在实际开发中，并不会使用专门的配置文件去记录请求路径与处理请求的控制器的映射关系，即：不配置`HandlerMapping`（当然，这并不影响SpringMVC的工作流程，只是从代码上不这样体现而已）。
			`上边这句话就有问题了，老师原话：如果使用HandlerMapping，就得配xml文件，请求路径越多，需要配置的就越多。而且路径和代码的对应关系要打开xml和java文件一个个对照，很麻烦。
			但是我们写smartmvc的时候，本来就没写过这种配置，smartmvc在HandlerMapping中没有牵扯到xml文件，也不需要我们对照什么。唯一牵扯xml文件的是DispatcherServlet实例化xml中配置的控制器类名，和成恒说的不是一回事。后来成恒老师回信给我说：可能是我们的案例更新了，在他印象里以前是有写过HandlerMapping的xml文件的。不需要太纠结。

可以直接创建控制器类，例如`cn.tedu.spring.HelloController`，需要该类在组件扫描范围之内，且应该添加`@Controller`注解，然后，在类中自定义处理请求的方法。

关于处理请求的方法，访问权限应该是`public`，返回值类型暂时使用`String`，方法的名称可以自行定义，参数暂时留空，即不添加任何参数，然后，在方法之前添加`@RequestMapping("路径")`配置请求路径：

	@Controller
	public class HelloController {
		
		// 处理请求的方法
		// 权限：public
		// 返回值：String（暂定）
		// 方法名：自定义
		// 参数列表：无（暂定）
		@RequestMapping("hello.do")
		public String showHello() {
			System.out.println("HelloController.showHello()");
			return null;
		}
	
	}

至此，`hello.do`的请求已经可以被以上自定义的`showHello()`方法处理，在浏览器输出`http://localhost:8080/SPRINGMVC-01-HELLO/hello.do`后，虽然在浏览器中无法正确的显示内容，但是，在Eclipse控制台可以观察到`showHello()`方法已经被正确的调用。

**配置视图解析器**

处理完请求后，方法返回的`String`类型数据表示的就是视图名，例如返回`"helloworld"`，接下来，框架会根据视图名找到视图解析器，从而确定最终的视图组件，典型的视图解析器是`InternalResourceViewResolver`：

	<!-- ViewResolver：视图解析器 -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
	</bean>		`包名可以声明个ViewResolver变量，指针放上去看See Also:三个，找到这个类，然后再声明这个类的变量，然后导包，就知道包名了--Test.java`

`InternalResourceViewResolver`的工作模式是：将**前缀 + 控制器方法返回的视图名 + 后缀**拼接起来，以项目的`webapp`为根目标，找到对应的页面文件，例如：

	<!-- ViewResolver：视图解析器 -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<!-- 前缀 -->
		<property name="prefix"
			value="/WEB-INF/" />
		<!-- 后缀 -->
		<property name="suffix"
			value=".jsp" />
	</bean>

结合此前方法返回的字符串值为`"helloworld"`，则视图解析器会找到`webapp/WEB-INF/helloworld.jsp`文件作为最终显示的视图组件！所以，创建对应的jsp文件，然后重新部署项目运行，即可看到最终运行效果。


#-----------------------------------SPRINGMVC.DAY02-------------------------------------
###工程SPRINGMVC-02-UMS(用户管理系统)

### 1. 接收请求参数

#### 1.1. 【不推荐】 通过HttpServletRequest获取请求参数

假设存在：

	<form action="handle_login.do" method="POST">
		<div>请输入用户名</div>
		<div><input name="username" /></div>
		<div>请输入密码</div>
		<div><input name="password" /></div>
		<div><input type="submit" value="登录" /></div>
	</form>

则在控制器中：

	@RequestMapping("handle_login.do")
	public String handleLogin() {
		
		// 暂不关心后续的页面
		return null;
	}

当需要处理请求时，可以在方法的参数中添加`HttpServletRequest`，然后，在方法体中，通过该参数获取请求参数：

	@RequestMapping("handle_login.do")
	public String handleLogin(
			HttpServletRequest request) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		System.out.println("username=" + username);
		System.out.println("password=" + password);
		
		// 暂不关心后续的页面
		return null;
	}

注意：Spring MVC框架默认使用的编码是ISO-8859-1，是不支持中文的，解决方案再议。`明天讲乱码`

#### 1.2. 【推荐】 直接使用同名参数

在Spring MVC中，也可以直接将请求参数声明为处理请求的方法的参数，例如：

	@RequestMapping("handle_reg.do")
	public String handleReg(
			String username, String password,
			Integer age, String phone,
			String email) {
		System.out.println("username=" + username);
		System.out.println("password=" + password);
		System.out.println("age=" + age);
		System.out.println("phone=" + phone);
		System.out.println("email=" + email);
		
		// 暂不关心后续的页面
		return null;
	}

使用这种做法时，需要**保证请求参数的名称与方法参数名称是一致的**！如果不一致，则无法获取到对应的参数，且服务器端会视为“客户端并没有提交名为xxx的参数，**则值为null**。”

这种做法虽然简便，但是，不适合处理请求参数过多的请求，如果某个请求中有10个或更多参数，则处理请求的方法也需要添加这么多参数，是不合适的！	`只是不合适，太多了影响代码美观吧，所以应该封装起来`

#### 1.3. 【推荐】 通过对象接收请求参数

如果请求参数过多，可以将请求参数封装在某个类型中：

	public class User {
	
		private String username;
		private String password;
		private Integer age;
		private String phone;
		private String email;
		// SET/GET---`添加set/get方法
	}

然后，在处理请求时，将该类型作为方法的参数即可：

	@RequestMapping("handle_reg.do")
	public String handleReg(User user) {
		System.out.println(user);
		
		// 暂不关心后续的页面
		return null;
	}

在使用这种做法时，**也需要保证名称的统一！**

#### 1.4. 小结

以上3种做法，除了第1种比较麻烦以外，另2种做法，请根据具体情况选择性的使用，甚至这2种做法可以**混合使用**，处理请求时，参数不区分先后顺序。  `混用举例：接收用户注册信息和验证码，验证码不适合放在用户信息里，但要求同时接收。可以这么写：public String handleReg(User usre,String code){} 参数可以同时用第二种和第三种做法。‘封装参数’和‘直接使用参数’的混用`

当然，第1种做法也不是完全没有用武之地，在除了控制器以外的组件中依然可能需要使用。
``	**第二种和第三种做法只能应用于控制器**

### 2. 转发数据

#### 2.1. 通过HttpServletRequest对象转发

Spring MVC处理请求时，默认的返回即表示“转发”，所以，返回值应该理解为：处理完请求之后转发到的JSP文件的名称。

当需要转发数据时，直接将数据封闭在`HttpServletRequest`对象中即可：

	request.setAttribute("msg", message);
		`需要在方法参数列表加上HttpServletRequest request获得request对象

后续，并不需要获取转发器执行转发！**在SpringMVC中返回时，就会将数据进行转发的操作**！

#### 2.2. 【不推荐】 使用ModelAndView转发
		`没人用,这种最麻烦，它的API不好用。但是框架的核心在用它`
在ModelAndView中，model表示的就是转发的数据，而view表示的就是转发的目标JSP页面，在使用时：

	@RequestMapping("handle_login.do")
	public ModelAndView handleLogin(
			String username, String password) {
		String viewName = null;
		String message = null;
		Map<String, Object> model
			= new HashMap<String, Object>();	`4 声明Map，数据通过Map来存储
		if ("root".equals(username)) {
			if ("1234".equals(password)) {
				// ...
			} else {
				viewName = "error";
				message = "[2] 密码错误！";		`1 添加数据。加2是为了区分第一种转发方式
				model.put("msg", message);	`2 把数据put到Map里
			}
		} else {
			viewName = "error";
			message = "[2] 用户名不存在！";
			model.put("msg", message);		`把数据put到Map里
		}
		
		ModelAndView mav 
			= new ModelAndView(viewName, model);	`3 一般一个不认识的数据类型我们在用的时候还是尝试看看它有没有构造方法。挑简单并且能发挥作用的。 且发现model是Map类型的。
		
		return mav; `5 返回mav
	}

	``杨珅玮代码：
			//根据id查询
		@RequestMapping("findById")
		public ModelAndView findById(Integer pid) {
			YswCallerInfo call=is.doFindById(pid);
			ModelAndView mv=new ModelAndView();
			System.err.println(call);
			mv.addObject("call", call);
			if(call.getForm().getCircuit()!=null) {
			mv.addObject("line", Arrays.asList(call.getForm().getCircuit().split(",")));
			}
			mv.setViewName("yswhtml/find");
			return mv;
		}
#### 2.3. 使用ModelMap

`ModelMap`的使用方式与`HttpServletRequest`几乎相同：
		推荐用这个：1、更轻量。2、用ModelMap方便我们进行单元测试，测试的时候随便给这个参数一个Map即可，但如果是HttpServletRequest，这个对象很复杂，不方便我们来做测试。

	@RequestMapping("handle_login.do")
	public String handleLogin(
			String username, String password,
			ModelMap modelMap) {
		String message = null;
		if ("root".equals(username)) {
			if ("1234".equals(password)) {
				// ...
			} else {
				message = "[3] 密码错误！";
				modelMap.addAttribute("msg", message); //添加要转发的数据
				return "error";		//转发
			}
		} else {
			message = "[3] 用户名不存在！";
			modelMap.addAttribute("msg", message);
			return "error";
		}
		return null;
	}

### 3. 重定向

在控制器中处理请求时，如果需要重定向，方法的返回值应该是`String`，则值应该是`redirect:目标资源`，关于**目标资源**的表示，可以使用相对路径，也可以使用绝对路径，例如使用相对路径时可以返回`"redirect:index.do"`。
		转发也可以加forward:  不过spring默认的行为就是转发--return "forward:login" = return "login"
``	关于相对路径和绝对路径问题，请看笔记

### 4. 关于@RequestMapping

`@RequestMapping`注解的作用主要是配置映射的路径。

该注解既可以添加在类之前，也可以添加在方法之前！例如：

	@Controller
	@RequestMapping("user")
	public class UserController {
		
		@RequestMapping("reg.do")
		public String showReg() {
			return "reg";
		}

	}

以上配置后，访问时，所使用的URL应该是`http://localhost:8080/PROJECT/user/reg.do`。

在类之前使用该注解，可以简化每个方法之前的注解，例如，在类之前没有注解时，可能配置为：

	@RequestMapping("user_list.do")
	@RequestMapping("user_info.do")
	@RequestMapping("news_list.do")
	@RequestMapping("news_info.do")

如果在类和方法之前都加注解，就可以：
``	**解决大量名称共性问题**
	@RequestMapping("user")    用户控制器
		@RequestMapping("list.do")
		@RequestMapping("info.do")

	@RequestMapping("news")    新闻控制器
		@RequestMapping("list.do")
		@RequestMapping("info.do")

所以，一般，推荐每个控制器只处理相关数据，例如`UserController`控制器只处理与`User`相关的请求，而`NewsController`控制器只处理与`News`相关的请求，并且，每个类之前都添加`@RequestMapping`注解。

在**配置路径时，并没有明确要求类的注解和方法的注解中是否使用`/`路径分隔符**，例如以下4种配置是完全等效的：
		类					方法
	@RequestMapping("user")		@RequestMapping("list.do")
	@RequestMapping("/user")		@RequestMapping("/list.do") 推荐
	@RequestMapping("/user")		@RequestMapping("list.do")
	@RequestMapping("user")		@RequestMapping("/list.do")
``	`不要一会用一会不用，给人感觉不好。`老师**建议都加/**`，因为类似于springmvc的框架有很多，而其他的框架可能要求会必须加/`

使用`@RequestMapping`注解还可以限制请求方式，例如：

	@RequestMapping(value="路径", method=RequestMethod.POST)
	`使用POST请求，就不会将请求参数暴露在浏览器请求路径中，尽量安全`
	`点RequestMethod.POST的源码发现是枚举类型，所以可以这么写.笔记'枚举类型的由来'`

对于以上映射路径，如果尝试进行GET请求，则会出现405错误：`405表示请求方式不支持`

	HTTP Status 405 - Request method 'GET' not supported

**小结**
`@RequestMapping`主要用于配置请求路径，在实际应用时，首先，每个控制器类之前都应该添加该注解，用于配置路径中间层，然后，每个控制器类只处理1种数据相关的请求，每个处理请求的方法之前必须再使用该注解配置具体路径，可根据实际情况选择配置该注解的`method`属性，以限定请求方式。

关于`@RequestMapping`的`value`属性和`method`属性的值，都可以是数组。

从**Spring 4.3起**，另有`@GetMapping`和`@PostMapping`，等效于限制了请求方式的`@RequestMapping`，即`@GetMapping("路径") = @RequestMapping(value="路径", method=RequestMethod.GET)`。使用这些注解时，**需要在Spring的配置文件中添加注解驱动`<mvc:annotation-driven />`。**

### 5. 关于@RequestParam注解

`@RequestParam`注解是添加在处理请求的方法的参数之前的注解！

使用`@RequestParam`可以解决客户端提交的参数名与服务器端处理请求时方法的参数名不一致的问题：

	@PostMapping("handle_login.do")
	public String handleLogin(
			String username,
			@RequestParam("pwd") String password) {
		System.out.println("username=" + username);
		System.out.println("password=" + password);
		return null;
	}
	`@RequestParam("pwd") String password 表示别人将交出一个pwd，而我编程的时候用password。这样不影响前后端的命名风格

当使用了`@RequestParam`注解后，默认情况下，参数是必须提交的，如果客户端提交的请求中并不包含该名称的参数，则会报告400错误：`请求参数不对`

	HTTP Status 400 - Required String parameter 'pwd' is not present

如果并不强制要求客户端提交某参数，可以：

	@RequestParam(value="pwd", required=false)

通过该注解，还可以通过`defaultValue`属性来配置**默认值**，即客户端没有提交参数值时，服务器端视为提交了默认的某个值：

	@RequestParam(value="pwd", required=false, defaultValue="111111")

注意：当使用`defaultValue`时，必须显式的将`required`属性设置为`false`，否则，如果没有设置，默认是必须提交参数值的，那么，默认值就没有意义了！

**小结**
关于`@RequestParam`注解的应用场景，可以是：

- 客户端提交的参数名与服务器端使用的方法的参数名不一致时；
- 要求客户端必须提交某些参数时；
		看给成恒的邮件，未解决。很矛盾
- 为某些参数设置默认值时。
		看给成恒的邮件，未解决。很矛盾
		比如要看用户列表，/user/list.do，但是我用户比较多，一页显示不下，那就分页。每页显示20条，用户可以选择第几页，即/user/list.do?page=2; 但当用户没写page这个参数的时候，可以默认给用户看第一页
#####-暂时解决：
		例：页面某个链接，点击后跳转url，url里拼接了某个参数，如果用户自己截取这个url去访问，就可以不提交某个参数。
			这种情况下，如果用户不提交某个参数依然可以查看页面，但是后台获取不到，如果这个参数很重要，那就不安全了。所以就要用到这个注解了。


### 练习
		UserController_lab，成恒第二天带着做的。
1. 删除`UserController`中所有已经完成的代码；
2. 根据`/user/reg.do`、`/user/login.do`、`/user/index.do`分别显示注册页、登录页、主页；
3. 注册将提交到`/user/handle_reg.do`，如果注册时填写的用户名是`admin`，视为“用户名已经被占用”，将通过`error.jsp`提示错误信息，否则，视为注册成功，成功时将跳转到登录页；
4. 登录将提交到`/user/handle_login.do`，如果登录时填写的用户名是`root`且密码是`1234`，视为成功登录，成功时将跳转到主页，否则，通过`error.jsp`提示用户名不存在或密码错误这类错误信息；
5. 请根据具体功能合理的使用相关注解及注解中的参数配置。

### 【附】 转发与重定向

转发与重定向的**核心区别在于客户端请求了几次**！在转发的处理过程中，客户端其实只发出了1次请求，而在重定向中，客户端发出了2次请求！

转发是发生在服务器内部的！所以，转发时的URL并不会发生变化！并且，**JSP文件可以存放在WEB-INF目录下（该目录是不允许通过http协议访问的）。由于转发是在服务器内部完成的，所以，组件之间（控制器与JSP）可以直接传递数据**`因为他们都是java类`。
		`只能把jsp文件放在WEB-INF下。素材图片,css,js文件等不能放在这里，因为这些文件都是必须要通过HTTP协议访问的`
重定向的本质是第1次请求时，服务器端可能无法完全全部的处理，所以，服务器向客户端响应了重定向（通常响应码是302），客户端得到这第1次的响应结果时，由于响应码表示的是重定向，所以，会再次发生第2次请求，以尝试得到最终的响应结果。由于客户端发出了第2次请求，所以，在重定向时，URL是会发生变化的！并且，两次请求之间的数据**默认**是无法共享或传递的！
		`默认不能共享/传递。但是可以强制使用session/cookie技术来共享/传递数据数据，不过明显这样做不便利，还会占用服务器内存`
		`对响应码有兴趣的话看笔记'转发与重定向'`
如果希望URL发生变化，必须使用重定向！
		`举例：用户在登录页面输入用户名密码登录之后，下一步应当进入主页。如果此时是转发会出现问题/错误：
			1 网址还是登录页面的网址，不符合人的思维
			2 当用户点刷新时，浏览器会询问是否要重新提交表单，因为刷新其实就是把用户上一次的请求再提交一次`
			也可能会出错：当是注册页面时，如果注册完后用户点刷新，则会重新再提交表单，那么会返回注册失败，因为已经有此用户了。这样体验感就很差。
如果有大量的数据需要传递，可以考虑使用转发！
		`不用转发就得把数据全放到session中去，session会占用服务器内存。
控制器处理好的数据，不便于在JAVA中编写如何显示，则应该转发给JSP页面！
		`这种情况百分百用转发，java代码可以处理数据但不便于显示，jsp方便显示却不适合处理代码。协同合作。


	枚举`笔记'枚举类型的由来'`

	gender; // 性别
	String gender = "男"; // "女"，"帅哥"/"美女"，"先生"/"女士"

	int gender = 1;

	public enum Gender {
		MALE, FEMALE
	}

	if (gender == Gender.MALE) {
		System.out.println("先生，您好！");
	} else {
		System.out.println("女士，您好！");
	}


#-----------------------------------SPRINGMVC.DAY03-------------------------------------
###SPRINGMVC-02-UMS工程：昨天的作业以及今天一直到乱码问题之前的内容
###SPRINGMVC-03-EXCEPTION：SpringMVC处理异常


### 1. 使用Session
	`SPRINGMVC-02-UMS工程UserController_lab.java&index.jsp中演示`
通常，会在Session中存放：

1. 客户端（用户）的身份标识，通常是用户的id；
		有id就能够随时得到所有数据：...where id=?;
2. 使用频率非常高的数据，例如显示在页面中的用户名、头像等；
		用户名和头像通常在每页都会显示，如果不放在session中，那就得用id获取，每次都通过id获取必然麻烦。
``		**牺牲空间，换取时间**。牺牲了空间节省下来的0.01秒服务器就可以去做其他的事情。
3. 其它的不便于使用其它存储方案来存取或传递的数据。
		比如在逛淘宝，在商品页面登录或在主页登录后，跳转的页面应当是在登录时的那个页面(商品页/主页)。但是登录页和商品页or主页一定不是同一个网址，并且登录后一定是重定向到的这个页面，对于http这种无状态的协议来说，服务器已经不知道你刚才来自哪里了。那么当来到login.do登录页之前就应该记录下当前的页面是哪一个。而这个数据就应当记录在session中。或者还可以使用其他的技术：比如通过文本文件存在服务器端，或者数据库搭建一个临时数据表等，但也都得通过sessionId。且都不如访问session来的快和便捷。
		跨页面只有session才能把数据记下来

关于Session的使用，和`ModelMap`几乎一样，即在处理请求的方法中添加`HttpSession`参数，并在方法体中操作该参数对象即可。

### 2. 拦截器：Interceptor

Spring MVC中的拦截器(Interceptor)与Java EE中的过滤器(Filter)比较相似，可以对某些请求尝试拦截，由开发者自行编写拦截的逻辑，使得某些请求可以执行，而某些请求将不允许执行，实现统一管理的效果。
`	`**附**：Java EE过滤器的结构，看笔记 'Java EE过滤器的缺点'

在使用时，必须先自定义拦截器类，实现`HandlerInterceptor`接口，然后在Spring的配置文件中进行配置。

当实现`HandlerInterceptor`接口后，需要重写3个未实现的方法，其中，`public boolean preHandle()`方法是起到拦截作用的，是运行在控制器之前的，该方法的返回值是boolean类型的，表示是否放行，即返回true则放行，返回false则拦截！一旦拦截，控制器方法将不会被执行，并且拦截器中剩下的2个方法也不会被执行，如果通过浏览器进行访问，界面将**显示一片空白**！

注意：即使执行重定向语法，如果拦截器`return true;`，依然会执行控制器中的方法和拦截器中另2个方法，则没有拦截效果，所以，当符合拦截条件时，应该`return false;`。

关于拦截器的配置大致如下：

	<!-- 拦截器链 -->
	<mvc:interceptors>
		<!-- 第1个拦截器 -->
		<mvc:interceptor>
			<!-- 拦截路径 -->
			<mvc:mapping path="/user/index.do"/>
			<!-- 拦截器类 -->
			<bean class="cn.tedu.spring.interceptor.LoginInterceptor"></bean>
		</mvc:interceptor>
		<!-- 第2个拦截器 -->
		<!-- 第3个拦截器 -->
		<!-- 第N个拦截器 -->
	</mvc:interceptors>

即：SpringMVC是支持**拦截器链**的，在同一个项目中，允许存在多个拦截器，形成拦截器链，多个拦截器的执行先后顺序取决于配置的先后顺序。`学过滤器的时候也有过滤器链`

在配置每一个拦截器的`<mvc:interceptor>`节点中，`<mvc:mapping>`节点用于配置需要拦截的路径，该节点可以存在若干个，例如：

	<mvc:interceptor>
		<!-- 拦截路径 -->
		<mvc:mapping path="/user/index.do"/>
		<mvc:mapping path="/user/logout.do"/>
		<!-- 拦截器类 -->
		<bean class="cn.tedu.spring.interceptor.LoginInterceptor"></bean>
	</mvc:interceptor>

并且，在配置路径时，是支持通配符的，例如：

	<mvc:mapping path="/user/*"/>

即：例如`/user/reg.do`、`/user/login.do`、`/user/handle_reg.do`等这些路径都在拦截范围之内！

但是，需要注意的是：1个星号表示的通配符只能匹配1层路径，例如`/user/*`不可以匹配到`/user/news/list.do`这样的路径！**如果要匹配若干层路径，可以使用2个星号**，例如配置为`/user/**`。

除此以外，在配置时，还可以添加`<mvc:exclude-mapping>`节点，以配置例外，例如：

	<!-- 拦截路径 -->
	<mvc:mapping path="/user/*"/>
	<!-- 添加例外 -->
	<mvc:exclude-mapping path="/user/reg.do"/>
	<mvc:exclude-mapping path="/user/login.do"/>
	<mvc:exclude-mapping path="/user/handle_reg.do"/>
	<mvc:exclude-mapping path="/user/handle_login.do"/>

关于`<mvc:exclude-mapping>`的配置方式，与`<mvc:mapping>`相同，也可以使用通配符。

以上`<mvc:mapping>`也可以理解为**拦截名单**，而`<mvc:exclude-mapping>`就是**白名单**。

以上配置是必须**有先后顺序**的，`<mvc:mapping>`必须在最前，其次是`<mvc:exclude-mapping>`，最后是拦截器`<bean>`。

仅在拦截范围之内的，才会触发拦截器执行（无论最终是拦截还是放行），如果某路径不在拦截范围之内（包含被添加到例外的），将根本就不触发拦截器的执行。

### 3. SpringMVC项目的乱码解决方案

整个SpringMVC框架默认使用的编码都是ISO-8859-1，是不支持中文的，所以，**在`DispatcherServlet`接收到请求的那一刻起**，数据的编码就已经是ISO-8859-1，为了**修改编码，只能通过过滤器(Filter)来设置**，在SpringMVC中也定义好了`CharacterEncodingFilter`，用于设置字符编码，所以，当使用SpringMVC时，应该在`web.xml`中配置该过滤器，并为这个过滤器类的`encoding`属性设置编码值：
						`包名不知道的话也可以敲'CharacterEncodingFilter'导出来
	<filter>
		<filter-name>CharacterEncodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>	`encoding是这个类中的参数，需要我们设置它的初始化值`
			<param-value>utf-8</param-value>
		</init-param>
	</filter>

	<filter-mapping>
		<filter-name>CharacterEncodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
	`附：Filter是servlet学的过滤器接口。在02-UMS工程CharacterEncodingFilter类可以看到是怎么实现的

### 4. SpringMVC处理异常

控制器是向客户端进行响应的组件，如果在控制器中的代码运行时出现异常，应该进行处理，如果不处理异常，则会按照默认的方式处理，有几处问题：
	`理解 按照默认方式处理：所有的异常都会经过处理。即使是throws也会最终抛给虚拟机，虚拟机来try-catch`
1. 对于没有计算机开发相关基础的用户而言，体验很差（界面上显示的错误完全看不懂）；
2. 对于掌握了计算机开发相关技术的用户而言，可能从中获取当前项目的某些实现细节（异常的跟踪信息中会显示某些类、方法的名称等），导致项目的部分内容外泄；
3. 其它问题。`可能还有其他问题，暂时没想到，想到再说`

所以，在控制器中，应该对可能存在的异常进行处理！注意：此处的“处理”不包括使用`throw`抛出，而是通过`try...catch`类似的方式捕获并在`catch`代码块中进行处理，例如：

	@RequestMapping("null.do")
	public String showNull(
			String username, ModelMap modelMap) {
		try {
			username.length();
		} catch (NullPointerException e) {
			String message = "您的操作有误，未提交必要的参数，请<a href=input.do>重新提交</a>！";
			modelMap.addAttribute("msg", message);
			return "error";
		}
		
		return null;
	}

由于异常出现的频率可能较高，或者，在多个不同的请求中都可能出现，那么，在每个方法中都进行处理，是不现实的，也不便于代码的管理！
		`我们主要进行处理非检测异常，因为检测异常会强制我们try-catch。而非检测异常频率可能是很高，所以要统一处理
在SpringMVC中，提供了2种统一处理异常的做法：

**1. 通过SimpleMappingExceptionResolver**
`		`这是用于记录异常和处理界面的映射关系的
在Spring的配置文件中，对`SimpleMappingExceptionResolver`进行配置，确定异常与转发的页面的映射即可：

	<!-- 处理异常 -->
	<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
		<property name="exceptionMappings">
			<props>  --这个子节点前面学过'props'
				<prop key="java.lang.NullPointerException">error</prop>
						key和value分别是要处理的异常以及对应的页面。(页面的写法 例：此处的error,会结合Spring配置文件的视图解析器加上前缀后缀去获得页面)
				<prop key="java.lang.StringIndexOutOfBoundsException">oob</prop>
``				<prop key="java.lang.RuntimeException">runtime</prop>  --统一处理
			</props>
		</property>
	</bean>

`		`我们可以只处理RuntimeException，但是不推荐这样做。`因为只处理RuntimeException就不好对错误进行描述，我们更希望告诉用户他错在了哪里，下次不要这么去做了。所以我们不应当直接处理父类的异常，应当由子类异常一步步去处理，最后搭配父类异常使用。写RuntimeException的目的应该再于避免遗漏。`

使用这种做法时，如果出现异常，框架将自动转发到对应的页面，开发者难以对异常出现的原因作出针对性的处理！所以，这种做法只适合比较粗糙的、大概的处理异常！

同时，这种做法**固定使用转发**来显示错误提示页面，**无法更改**为其它方式的响应！

**2. 使用@ExceptionHandler**

 在控制器类中，可以自定义处理异常的方法，并在方法之前添加`@ExceptionHandler`注解，该方法的设计规则与处理请求的方法大致相同，区别在于参数不可以随便写，必须包含1个异常类型的参数，`若不写参数，会500错误--非法的参数异常`
	@ExceptionHandler
	public String handleException(Exception e) {
		if (e instanceof NullPointerException) {
			return "error";
		} else if (e instanceof StringIndexOutOfBoundsException) {
			return "oob";
		}
		return "exception";
	}

> 使用`@ExceptionHandler`之前，必须保证在Spring配置文件中已经配置了注解驱动，即`<mvc:annotation-driven />`。

`		`通过这种注解，使用java代码编写同样可以实现第一种方式的配置效果。区别是这种方法可以通过java代码写更多的东西，比如封装转发的数据，然后通过在jsp中写el表达式显示在页面。需要注意的是，转发数据这里不能写ModelMap，**必须通过HttpServletRequest对象来转发**

在使用`@ExceptionHandler`注解时，可以在注解中添加属性的配置，以确定所处理的异常的范围，例如：

	@ExceptionHandler(IndexOutOfBoundsException.class)
	经过以上配置，仅`IndexOutOfBoundsException`及其子孙类异常会被接下来的方法进行处理，而其它异常的出现，并不会导致对应的方法被执行！ `看我的笔记'@ExceptionHandler的参数问题/源码'，**此参数可以写多个，也可以写父类**

在控制器中，允许同时存在多个处理异常的方法！
`		`但要保证不能冲突,即一个异常不要同时满足可以走两个方法

处理异常的方法仅能作用于当前控制器类中的请求！如果某个处理异常的方法的代码希望被通用，可以将这个处理异常的方法写在控制器类的基类中。`基类：所有控制器都应该从这个控制器中继承下去，这就是基类。就是写个父类让所有控制器去继承 - -汗`

**``如何选择使用以上两种异常处理方式**
`	`如果只需要给个页面马马虎虎看一下，可以用第一种，尽管处理的很粗糙，但是配置很简单。并且配置出来整个项目都通用，而第二种只当前控制器类可以用。
`	`如果不希望第一种作用域那么广，希望更加自由更加细致，那就用第二种

以上两种统一处理异常的方式是可以同时存在的！且**第2种方式的优先级高于第1种方式**。
		`不成文的规定：范围越小越优先。这句话在整个开发领域中，从来没有哪本书明确地写过，但是无处不在。

**附：常见异常**

	Throwable --这是异常最顶端的类，包括了Error和Exception
``		Error  --错误，一般是比较严重的问题，可能和我们的硬件或虚拟机直接相关
			OutOfMemoryError  --(比如)'内存溢出'，使用的内存超过了限制
``		Exception  --异常，常见的。可检测异常，不是100%可以杜绝的，比如拔U盘，拔网线。
			SqlException
			IOException
				FileNotFoundException
``			RuntimeException  --非检测异常。出现频率可能非常高，如果要求必须try-catch那就麻烦了。可以100%杜绝不出现(比如先进行判断，只能在数组长度内操作)
				NullPointException
				ClassCastException  --向下转型(我认为说强转比较好)可能出现
				ArithmeticException  --算术运算异常(随便一个数除以0)
				IndexOutOfBoundsException  --索引越界异常
					ArrayIndexOutOfBoundsException  --数组索引越界异常

### 【附】 拦截器和过滤器的区别

过滤器(Filter)是Java EE体系中的，而拦截器(Interceptor)是SpringMVC中的；

过滤器是在所有的Servlet之前执行的，而拦截器的初次执行是在DispatcherServlet之后、在Controller之前执行的；
		例如字符编码问题只能通过过滤器来解决，而不可以通过拦截器来解决。
过滤器的过滤范围只能在web.xml中通过<url-pattern>这1个节点来配置，而拦截器可以配置多个拦截路径，且可以添加例外，配置更加灵活；

所有的请求都可以被过滤器进行处理，却只有交由DispatcherServlet分发的请求才可能被拦截器处理！
		`多回顾SpringMVC流程图
### 【附】 字符编码问题 / 出错时的乱码问题
在不考虑某些编码不支持中文的情况下，使用了支持中文的编码，仍会出现乱码的原因只有1个：**存和取的时候使用了不同的编码。**

所以，解决方案就是：整个项目涉及的所有位置全部使用相同的编码！

通常，需要指定编码的位置有：
1. 项目的源代码，例如某个String类型数据的值；
		可在window下统一设置
2. 显示界面的组件所使用的编码，例如HTML/JSP使用的编码；
		HTML/JSP在最上边指定编码
3. 数据存储位置使用的编码，例如数据库中的编码；
		创建数据表的时候指定这张表使用的编码：create table user () DEFAULT CHARSET=UTF8
4. 数据传输过程中使用的编码，例如请求、响应，或数据库连接的URL。
		数据传输：request.setCharacterEncoding("utf-8");
		数据库连接：url=jdbc:mysql://localhost:3306/newdb3?useUnicode=true&characterEncoding=UTF-8		Tomcat和mysql的连接传输

  `故事：
		0, 1
		位：bit，二进制位，任何1个0或1所占用的空间就是1个二进制位，是计算机中最小的存储单位
			位太小，无法表示太多的意义。所以有了字节
		字节：byte，1个字节为8个二进制位，例如 0000 1100，字节是计算机存储数据的基本单位
		0000 0000
		0000 0001
		1111 1111
		想表达更多的意思，于是有了编码
		最早的编码：ASCII编码    (美国标准信息交换码)  规定了人类熟知的符号和二进制数的关系
		a		0110 0001

		中文编码：GBK, GB2312, UTF-8	中文编码至少两个字节(GBK/GB2312的一个中文字符占两个字节)
			不同编码格式对同一个字符的二进制不同 
		中	0000 0000 0000 0000
		中	0000 0100 0000 0000
		
		注：英文部分在所有的编码中都是相同的，对应关系直接使用的ASCII编码表，所以英文不会出现乱码

### 【作业】

1. 创建新的数据库`tedu_ums`；
2. 在新数据库中创建数据表`t_user`，表中至少包含id, username, password, age, phone, email这6个属性； 
3. 添加不少于10条数据；
4. 查询所有数据；
5. 根据id查询某用户的详细信息；
6. 根据username查询某用户的详细信息；
7. 查询当前表中数据的数量；
8. 查询年龄大于20的前3条数据；
9. 删除id=3的数据；
10. 删除id=6、id=8、id=9的数据；
11. 将id<7的所有数据的password设置为1234。


#------------------------------------MYBATIS.DAY01--------------------------------------
###工程：MYBATIS

### 【前序作业】

1. 创建新的数据库`tedu_ums`；

	CREATE DATABASE tedu_ums;

2. 在新数据库中创建数据表`t_user`，表中至少包含id, username, password, age, phone, email这6个属性； 

	USE tedu_ums;

	CREATE TABLE t_user (
		id INT AUTO_INCREMENT,
		username VARCHAR(20) UNIQUE NOT NULL,
		password VARCHAR(20) NOT NULL,
		age INT,
		phone VARCHAR(20), `手机号用字符串。不用int：int类型的数应当本身具有数值的含义。并且会有这样的手机号：+86 138-0013-8001
		email VARCHAR(50),
		PRIMARY KEY(id)  `主键约束也可以这么写
	) DEFAULT CHARSET=utf8;

3. 添加不少于10条数据；

	INSERT INTO t_user 
		(username, password, age, phone, email) 
	VALUES 
		('root', '1234', 18, '13800138001', 'root@tedu.cn'),
		('admin', '4567', 19, '13800138002', 'admin@tedu.cn'),
		('jack', '1234', 20, '13800138003', 'jack@tedu.cn'),
		('tom', '1234', 22, '13800138010', 'tom@tedu.cn'),
		('jerry', '1234', 25, '13800138011', 'jerry@tedu.cn'),
		('rose', '1234', 21, '13800138004', 'rose@tedu.cn'),
		('mike', '1234', 22, '13800138005', 'mike@tedu.cn'),
		('lily', '1234', 23, '13800138006', 'lily@tedu.cn'),
		('lucy', '1234', 24, '13800138007', 'lucy@tedu.cn'),
		('mary', '1234', 25, '13800138008', 'mary@tedu.cn'),
		('alex', '1234', 26, '13800138009', 'alex@tedu.cn');

4. 查询所有数据；

	SELECT id,username,password,age,phone,email FROM t_user;  `select * from t_user;以后写代码时禁止使用*，除非测试

5. 根据id查询某用户的详细信息；

	SELECT id,username,password,age,phone,email FROM t_user WHERE id=8;

6. 根据username查询某用户的详细信息；

	SELECT id,username,password,age,phone,email FROM t_user WHERE username='jack';

7. 查询当前表中数据的数量；

	SELECT COUNT(id) FROM t_user;

8. 查询年龄大于20的前3条数据；

	SELECT id,username,password,age,phone,email FROM t_user WHERE age>20 LIMIT 0,3;

9. 删除id=3的数据；

	DELETE FROM t_user WHERE id=3;

10. 删除id=6、id=8、id=9的数据；

	DELETE FROM t_user WHERE id IN (6,8,9);

	DELETE FROM t_user WHERE id=6 OR id=8 OR id=9;

11. 将id<7的所有数据的password设置为1234。

	UPDATE t_user SET password='1234' WHERE id<7;

`---**接下来要学习用MyBatis搞定上边的操作**

### 1. MYBATIS简介
MYBATIS是持久层框架，大大的简化了持久层开发。
		`持久层是相对于内存而言的，保存到硬盘的存储方案叫作持久化存储。我们用的最多的是用数据库来存储数据，而由于有MVC这种思想，所以专门去处理数据的增删改查，操作数据库的层我们称之为持久层，具体的体现就是xxxDao，这就是持久层组件。

当使用MYBATIS框架时，开发人员不必再编写繁琐的JDBC代码，只需要定义好每个功能对应的抽象方法与需要执行的SQL语句即可！
	`**我们不需要写JDBC相关代码，比如：获取连接、Statment、释放资源..  我们只写一个接口，实现类也不用写。全部由框架去做。那么框架必须要把数据源用上，还要知道xml文件在哪里，从而执行文件里写的SQL语句。**
	`**所以我们要把这些准备好,就是下面的-'2.基本使用'2.1--2.7的内容**
### 2. 基本使用

#### 2.1. 添加依赖

需要在`pom.xml`中添加MyBatis的依赖：

	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis</artifactId>
		<version>3.4.6</version>
	</dependency>
	`只要是正经版本号就行，看笔记'版本号编写原则'。`
然后添加MyBatis整合Spring的依赖：
		`MyBatis和Spring并没有直接关系，但是我们一般会整合在一起使用。则要使用这个包。
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis-spring</artifactId>
		<version>1.3.2</version>
	</dependency>

其**底层实现是基于JDBC的**，所以，还需要添加`spring-jdbc`的依赖，需要注意的是：此次使用的版本必须与`spring-webmvc`的**保持一致**：

	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-jdbc</artifactId>
		<version>4.3.9.RELEASE</version>
	</dependency>

根据使用的数据库，添加数据库连接驱动的依赖：

	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>8.0.13</version>
	</dependency>

并且用数据库连接池，还要添加数据源的依赖：`国斌时候讲的数据库连接池，可以回顾MySQL笔记整合`

	<dependency>
		<groupId>commons-dbcp</groupId>
		<artifactId>commons-dbcp</artifactId>
		<version>1.4</version>
	</dependency>

#### 2.2. 数据库连接

在`src/main/resources`下创建`db.properties`文件，用于配置数据库连接的相关信息：

	url=jdbc:mysql://localhost:3306/tedu_ums?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
	driver=com.mysql.cj.jdbc.Driver   `'Driver的写法'看笔记`
	username=root
	password=root
	initialSize=2
	maxActive=50

在项目中准备名为`spring-dao.xml`的Spring配置文件，并加载以上数据库的配置文件：
		`以后在spring-dao.xml中配置数据库相关；在spring-mvc.xml中配置控制器mvc相关。只是为了分开管理，方便以后去修改。放在一起完全没问题
	<!-- 加载数据库的配置文件 -->
	<util:properties
		location="classpath:db.properties" />

然后，将以上读取到的配置值应用于数据源`BasicDataSource`中：

	<!-- 配置数据源 -->	`给加载数据库配置文件的<util:properties>添加id="dbConfig"
	<bean class="org.apache.commons.dbcp.BasicDataSource">
		<property name="url" 
			value="#{dbConfig.url}" />
		<property name="driverClassName"
			value="#{dbConfig.driver}" />
		<property name="username"
			value="#{dbConfig.username}" />
		<property name="password"
			value="#{dbConfig.password}" />
		<property name="initialSize"
			value="#{dbConfig.initialSize}" />
		<property name="maxActive"
			value="#{dbConfig.maxActive}" />
	</bean>

**以上配置时，各文件之间的关系如下图**所示：

![](01.png)

完成后，可以通过单元测试，以测试是否可以正确的获取到数据库的连接：

	public class ConnectionTestCase {
	
		@Test
		public void getConnection() throws SQLException {
			AbstractApplicationContext ac
				= new ClassPathXmlApplicationContext(
						"spring-dao.xml");
			DataSource dataSource =
					ac.getBean("dataSource", DataSource.class);
			//`DataSource导哪个包可以看源码它或它父类是javax.sql包里的。DataSource是BasicDataSource实现的接口，成恒直接用的这个接口来测试。国斌教的'BasicDataSource'
			System.out.println(dataSource.getConnection());
			
			ac.close();
		}
		
	}

#### 2.3. 创建实体类

每张数据表都应该有1个对应的实体类，所以，创建`cn.tedu.mybatis.entity.User`类，属性的数量与类型请参考数据表的设计：	
		`关于属性名(变量名)：参看'#### 3.1. 使用别名'：查询时，MyBatis会将查询结果封装到对象中，其要求是**查询结果中的列名(字段名)与实体类的属性名必须完全一致**，
		`属性名要和查询的数据表中的字段名保持一致(之所以说查询的数据表是因为可以在sql语句中起'别名'，mybatis是根据查询结果的表的字段名对应实体类的属性将数据保存为实体类类型展现出来)。
	public class User implements Serializable {		`实现序列话接口并添加UID。笔记''

		private static final long serialVersionUID = 7323921614984096421L;
	
		private Integer id;
		private String username;
		private String password;
		private Integer age;
		private String phone;
		private String email;
		// SET/GET，toString()
	}

#### 2.4. 创建接口，声明抽象方法

创建`cn.tedu.mybatis.mapper.UserMapper`接口，并在接口中声明“插入用户数据”的抽象方法：
		`xxxMapper是我们用MyBatis需要写的一个接口
	public interface UserMapper {
	
		Integer addnew(User user);
		
	}


关于抽象方法，在MyBatis中，执行的操作如果是**增、删、改，返回值均使用`Integer`**，表示受影响的行数；方法的名称可以自定义，只要不违反Java的命名规则即可，另外，不允许在接口中使用重载机制；参数也可以自定义，如果执行的是增加操作，参数应该是与数据表对应的实体类的类型(比如User)。		`**不允许使用重载**的原因是在稍后的xxxMapper.xml配置文件中，id是对应的抽象方法名，如果重载，它就不知道是哪个抽象方法了，就会出错。

#### 2.5. 配置接口所在的包
		`要让整个框架知道这个接口的存在,并不是像是SpringMVC里一样通过注解的形式解决，而是在配置文件中配置
在MyBatis中，通过`MapperScannerConfigurer`类扫描持久层接口的，所以，应该在`spring-dao.xml`文件中进行配置：

	<!-- MapperScannerConfigurer -->
	<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
		<!-- 配置接口文件所在的包，name表示的依然是属性/set方法名，在源码中可以看到 -->
		<property name="basePackage"
			value="cn.tedu.mybatis.mapper" />
	</bean>

#### 2.6. 在XML中配置接口方法对应的SQL语句

从FTP下载`somemapper.zip`压缩包，得到`SomeMapper.xml`文件。---xxxMapper.xml配置文件需要的声明

在`src/main/resources`下创建名为`mappers`文件夹，然后将`SomeMapper.xml`重命名为`UserMapper.xml`，并粘贴到`mappers`文件夹下：		`放在文件夹下的原因是方便管理，因为以后项目比较多，每数据表都需要一个这个配置文件`

![](02.png)

> 其实，这些XML文件的名称并不重要，可以自由命名，通常，推荐使用与接口文件相同的名称，便于管理。

然后，编写`UserMapper.xml`文件中的内容，首先，根节点必须是`<mapper>`，且根节点的`namespace`表示对应的接口文件，然后，添加子节点，以对应接口中的抽象方法：

![](03.png) `**图中/配置内容**：
		<!-- 根结点必须是mapper -->
		<!-- namespace: 对应的接口文件 -->
``		<mapper namespace="cn.tedu.mybatis.mapper.UserMapper">
			<!-- 根据执行的操作类型选取节点 -->
			<!-- id：对应的抽象方法的方法名 -->
``			<insert id="addnew">
				<!-- 在这里写sql语句可以随意换行，并且和原先用jdbc一样sql语句最后不用写;分号 -->
``				INSERT INTO t_user (
``					username,password,    `数据表中的字段名
``					age,phone,
``					email
``				) VALUES (
				<!-- 以前写?的地方全部换成#{} -->
``					#{username},#{password},   `抽象方法的 参数User类型中 的属性名
``					#{age},#{phone},
``					#{email}
``				) 
``			</insert>
``		</mapper>


#### 2.7. 配置XML文件的位置与数据源
MyBatis通过`SqlSessionFactoryBean`获取数据源，并且扫描配置了SQL语句的XML文件，最终由MyBatis框架来执行SQL语句，所以，需要在`spring-dao.xml`中配置`SqlSessionFactoryBean`：
	`用SqlSessionFactoryBean解决两个问题：
				1.告诉它数据源是谁。因为只有它获取到数据源才能够连接数据库去执行Sql语句做增删改查
				2.告诉它xml文件在哪里。从而执行sql语句
	<!-- SqlSessionFactoryBean -->
	<bean class="org.mybatis.spring.SqlSessionFactoryBean">
		<!-- 数据源。name表示的依然是属性/set方法名，在源码中。值为以上配置BasicDataSource节点的bean-id -->
		<property name="dataSource" 
``			ref="dataSource" />		`上边配置的数据源的id
		<!-- XML文件在哪里 -->
		<property name="mapperLocations" 
``			value="classpath:mappers/*.xml" />    `mappers文件夹下会有多个xml文件，写 *  表示mappers文件下的所有xml文件都是mybatis用来配置sql语句的，同时要**保证在mappers文件夹中只放这些文件**，其他的不要放，以免报错。
	</bean>
			`dataSource&mapperLocations是SqlSessionFactoryBean里的两个属性。

#### 2.8. 单元测试

	public class UserMapperTestCase {
	
		AbstractApplicationContext ac;
		UserMapper mapper;
		
		@Before
		public void doBefore() {
			ac = new ClassPathXmlApplicationContext("spring-dao.xml");
``			mapper = ac.getBean("userMapper", UserMapper.class);
`	`UserMapper是一个接口，没有实现类。但是ac.getBean得到的应该是一个具体的对象，一个已经new出来的对象。而接口是不能new对象的。这是怎么回事呢：其实这是MyBatis通过代理模式 实现的，不严格地说是代理模式给的一个‘实现类’。
	`输出mapper可以看到它的句柄，句柄中的MapperProxy表示的是Mapper的代理。规则是使用MyBatis的时候，会自动生成这个代理对象来完成接口里的方法。需要这个对象的时候getBean即可，Bean的id就是接口名称首字母改小写。
	`如果想理解代理需要学习‘代理模式’。
		}
		
		@After
		public void doAfter() {
			ac.close();
		}
		
		@Test
		public void addnew() {	//这个方法名可以自定义，但是一般和抽象方法的方法名一致，容易看懂。
			User user = new User();
			user.setUsername("刘GB");
			user.setPassword("666");
			Integer rows = mapper.addnew(user);	//这个方法才是接口里的抽象方法。
			System.out.println("rows=" + rows);
		}
		
	}

### 3. 查询数据

#### 3.1. 根据id查询某个用户的信息

首先，在`UserMapper.java`接口中添加该功能对应的抽象方法：

	User findById(Integer id);

> 查询方法的返回可以根据所需要的类型来决定。

然后，在`UserMapper.xml`映射文件中添加新的节点配置抽象方法对应的SQL语句：

	<select id="findById"
		resultType="cn.tedu.mybatis.entity.User">
		SELECT 
			id, username, 
			password, age, 
			phone, email
		FROM 
			t_user
		WHERE 
``			id=#{id}  `这个表示的是抽象方法的参数，写什么都行。但一般写和名字保持一致的
	<select>

> 执行查询时，`<select>`节点中必须配置`resultType`属性（或者是`resultMap`属性）。
`		`resultType是结果的类型==即这个查询返回的结果是什么类型的==方法返回值的类型，要指定出来。resultMap还没讲。

以上方法执行时，如果查询到匹配的数据，则返回有效的User对象，如果没有匹配的数据，则返回null。


#------------------------------------MYBATIS.DAY02--------------------------------------
###工程：MYBATIS

### 1. 抽象方法中多个参数的问题
		`不理解的话看课堂笔记详解'MyBatis抽象方法参数问题'
在使用MyBatis时，接口中的抽象方法**只允许有1个参数**，如果有多个参数，例如：

	Integer updatePassword(
			Integer id, String password);

在最终运行时，Java源代码会被编译成.class文件，就会丢失参数名称，所以，运行时会提示“找不到某参数”的错误：

	Caused by: org.apache.ibatis.binding.BindingException: Parameter 'password' not found. Available parameters are [arg1, arg0, param1, param2]

解决方案就是**“封装”**，例如将以上2个参数id、password封装到1个User对象中(就像昨天的插入一样，但是会浪费用不到的参数，也繁琐)，或将这2个参数封装到1个Map对象中(繁琐)……但是，无论哪种做法，都存在调用方法不便利的问题，MyBatis提供的解决方案就是添加注解：

	Integer updatePassword(
		@Param("id") Integer id, 
		@Param("password") String password);

通过`@Param`注解，当执行时，MyBatis会将多个参数**封装为1个Map对象来执行**，就不需要开发人员自行封装！`并且**注解当中的属性值就是key**

也可以**小结**为：**当抽象方法的参数超过1个时，必须添加`@Param`注解**，并且，在XML配置中，使用**`#{}`表示的变量的名称其实是`@Param`注解中的值**！

**如图**：![](01.png)

### 2. 动态SQL

#### 2.1. 基本概念

在MyBatis中，在配置XML映射时，可以使用某些逻辑节点，实现逻辑判断或者循环等等，使得每次执行的SQL语句是可能随着参数发生变化的，即：参数不同，最终执行的SQL语句可能不同，所以，称之为“动态SQL”。

#### 2.2. <foreach>标签

例如存在以下需求：根据多个id同时删除多条数据。则抽象方法可以设计为：
	Integer deleteByIds(Integer[] ids);
			`参数用数组、集合都可以。这里用数组示范。
				可变参数...也可以，可变参数是作为数组处理的，所以不用考虑
需要执行的SQL语句例如：

	DELETE FROM t_user WHERE id IN (?,?,?);

但是，以上SQL语句中的问号所表示的值的数量是不确定的，将根据调用方法时的参数`Integer ids`来决定，所以，可以使用`<foreach>`来实现：

	<delete id="deleteByIds">
		DELETE FROM 
			t_user 
		WHERE id IN (
			<foreach collection="array"
``				item="id" separator=",">       item="id"属性值应用于节点的内部#{id}
``				#{id}
			</foreach>
		)
	</delete>

在`<foreach>`的配置中，**常用属性**有：
- `collection`：如果映射的抽象方法只有1个参数时，表示遍历的参数的类型是什么，如果遍历的数据类型是数组，则取值为`array`，如果遍历的数据类型是List集合，则取值为`list`；如果映射的抽象方法有多个参数，则取值为注解中的名称(`需要遍历的参数的注解的名称)；
- `item`：遍历过程中元素的名称，相当于Java代码中`for (Integer id : ids)`中的`id`，在动态SQL中，也是`<foreach>`节点的子级中通过`#{}`表示的变量名 ---= `item属性值应用于节点的内部，例如item="id"--->内部 #{id}
- `separator`：分隔符，例如在`IN`语句中应该是`id IN (6,8,9)`，各个值之间需要使用逗号进行分隔，所以，以上代码中取值为`,`
- `open`：整个遍历得到的SQL语句的部分的最左侧的字符，例如在SQL语句中不写括号时，该属性的值可以是`(`
- `close`：与`open`对应，是SQL语句的部分的最右侧的字符，例如`)`
		例如： ...WHERE id IN(<foreach collection="array"item="id" separator=",">#{id}</foreach>)
		可以是： ...WHERE id IN<foreach collection="array"item="id" separator="," open="(" close=")">#{id}</foreach>
		open和close意义不大
`- index`:在list和数组中，index是元素的序号。指定一个名字，用于表示在迭代过程中，每次迭代到的位置。在map中，index是元素的key。！！！？？？不大懂，他只提了一下，解释是我百度的。 老师原话: index表示索引，用于在有序的循环中，做遍历用不到，就相当于i=1，i=2那样的。
`	网上的foreach标签实例解释：https://www.liangzl.com/get-article-detail-6219.html
 
#### 2.3. <if>标签

假设希望提供某个查询功能，尽量满足所有的查询需求，即：可以通过参数决定WHERE子句，决定ORDER BY子句，甚至决定LIMIT子句，则抽象方法可以设计为：

	List<User> find(	`变量名都是随便写，xml中的是注解名(map中的key)。建议变量名和注解值一样
		@Param("where") String where, 
		@Param("orderBy") String orderBy, 
		@Param("offset") Integer offset, `offset表示偏移量，表示limit的第一个数
		@Param("count") Integer count);  `limit的后一个数

匹配的映射为：

	<select id="find"
		resultType="cn.tedu.mybatis.entity.User">
		SELECT 
			id, age,
			password, username,
			phone, email
		FROM 
			t_user 
		<if test="where != null">  `test内填写的是注解的名字
		WHERE 
			${where}
		</if>
		<if test="orderBy != null">
		ORDER BY 
			${orderBy}
		</if>
		<!-- `这里的test写offset/count均可，因为这两个值
``				是一起使用的，只要一个为null，limit就不执行 -->
``		<if test="offset != null">
		LIMIT 
			#{offset},#{count}
		</if>
	</select>

可以看到，`<if>`用于进行逻辑判断，在标签内的`test`中，如果需要表示参数，是不需要添加`#{}`格式的，直接写参数名称即可（即使只有1个参数，也应该正确的填写参数名称）。`test内填写的是注解的名字
		`不需要添加`#{}`格式的的意思是，我们这几天学的，在xxmapper.xml中sql语句内写参数都得在#{}里写，而在if里是不用写#{}的。
		`参数名称只有一个的话无所谓，课堂笔记：'固定的取class文件中的那唯一一个参数'。多个参数的话就必须对上号了。
在以上映射的SQL中，有2种占位符，分别使用`#{}`和`${}`，前者，用于对值进行占位，可以替换在预编译的SQL语句中的`?`，在实际执行时，也是预编译的，所以，在使用`#{}`格式时，无须考虑参数的类型，后者，用于对非值的语句部分进行占位，在实际执行时，是**直接拼接到SQL语句中的，并不具备预编译的效果**。例如以上`String where`参数表示的是SQL语句中的WHERE子句，如果根据id查询数据，其值可以是`String where ="id=1";`，如果根据用户名查询数据，则值应该是`String where = "username='Jack'";`。  `可看课堂笔记'占位符#{}与${}'
`	`使用${}理论上存在sql注入风险，但只是理论上，首先我们不会允许用户输入引号'，比如只能输入数字字母下划线，不输入引号就不会出现注入问题。且用户输入用户名和密码，但我们只会查用户名，并不会查密码。

> 通常，并**不建议使用某1个方法及其对应的映射来完成许多不同的操作**，例如以上功能几乎可以完成所有的单表简单查询，但是，不应该这样使用，因为，为了实现更加通用的效果，可能需要很多`<if>`进行判断，**执行时效率偏低**，并且，不同的功能，对于查询的字段要求是不一样的，也许某个功能只需要查询20个字段中的2个而已(比如验证用户名&密码)，而通用的查询如果把20个字段全部查出来，**内存开销也会有浪费**！

### 3. 查询结果与类的对应

#### 3.1. 使用别名

在某些字段的设计中，可能名称包含多个单词，**数据库语句是不区分大小写的，所以**，应该将字段名所有字母小写，**各单词之间使用下划线(`_`)分隔**。
例如：
	is_delete	是否已删除：0-未删除，1-已删除
		`其实在应用中，我们并不会真正得执行delete语法删除数据，因为所有的数据都有可能产生隐藏的价值。尤其是大平台。而是执行update去修改is_delete
	ALTER TABLE t_user ADD COLUMN is_delete INT DEFAULT 0;
		`添加is_delete字段。column是列的意思，添加一列，添加表字段默认就是添加列，所以可以不写。

如果数据表发生变化，则实体类也应该跟随调整，在实体类添加的属性就应该是`Integer isDelete;`。
		`之所以定义为isDelete，而不用下划线，是遵从java变量的命名规范而已。
查询时，MyBatis会将查询结果封装到对象中，其要求是**查询结果中的列名(字段名)与实体类的属性名必须完全一致**，而以上关于“是否已删除”的字段名是`is_delete`，而`User`类中对应的属性是`isDelete`，则查询时需要通过`AS`定义别名：	

	<select id="findAll"
		resultType="cn.tedu.mybatis.entity.User">
		SELECT
			id, age,
			password, username,
			phone, email,
			is_delete AS isDelete
		FROM 
			t_user 
	</select>

> 在定义别名时，AS关键字并不是必须的，直接通过空格分隔原名和别名即可。`国斌笔记有`

#### 3.2. 使用VO类

创建部门信息表`t_department`，其中包括`id`, `name`

	CREATE TABLE t_department (
		id INT AUTO_INCREMENT,
		name VARCHAR(20) UNIQUE NOT NULL,
		PRIMARY KEY(id)
	) DEFAULT CHARSET=UTF8;

	INSERT INTO t_department (name) VALUES 
		('UI'), ('RD'), ('TEST');	`UI/开发部Research Development/测试部

在用户信息表中添加`did`表示用户所属的部门的id

	ALTER TABLE t_user ADD COLUMN did INT;

如果尝试执行多表关联查询，必然没有匹配的实体类可以封装查询结果，则需要创建**VO（Value Object）**类，它不同于实体类，**实体类是与某1张数据表完全对应的**，而**VO类是与实际应用需求相对应的**！
		`之所以说'必然没有匹配的实体类'是因为'实体类是与某1张数据表完全对应的'
假设要查询用户数据，且部门应该是显示部门的名称，则VO类应该是：

	package cn.tedu.mybatis.vo;

	public class UserVO {   `以VO为后缀，以User为主所以叫UserVO
		private Integer uid;
		private String username;
		private String password;
		private Integer age;
		private String phone;
		private String email;
		private Integer isDelete;
		private Integer did;	`User的外键和部门表的主键查一个就够了，值和意义完全相同。都叫did即可
		private String name;
		// SET/GET，toString()，Serializable
	}

则设计的抽象方法的返回值就应该是List集合中存放VO类型的数据：

	List<UserVO> findAll2();

需要注意的是，在查询的SQL语句中，**需要自定义别名**：`因为有两个字段都叫id

	SELECT 
		t_user.id AS uid,  因为两张表都有id字段名，所以要指定表名。遵从变量命名规范不使用下划线，所以用别名。
		username,
		password,
		age,
		phone,
		email,
		is_delete AS isDelete,
		did,
		name
	FROM 
		t_user 
	INNER JOIN 
		t_department 
	ON 
		t_user.did=t_department.id;

#### 3.3. resultMap
		`整个MyBatis里最绕最麻烦的一个东西
在查询时，`<select>`节点必须指定结果的类型，可以通过`resultType`属性来指定，也可以通过`resultMap`属性来指定。

当有直接对应的查询结果时，可以使用`resultType`，取值一般是实体类的类型，或VO类的类型。
	`任何时候都可以使用resultMap，但是需要另外配置

某些查询可能需要将查询结果进行特殊的封装，例如查询时存在1对多、多对多、多对1等关系，则需要使用`resultMap`来配置封装的方式。

例如：根据id查询部门信息，且要求查询结果中包含该部门中所有用户。	`也类似于qq分组，点一下分组就展开所有好友`即一个部门多个员工，而不是一个部门对应一个员工。部门信息不要重复。

设计的(需要的)VO类应该是：

	public class DepartmentVO {
		private Integer did;		`部门id
		private String name;		`部门名称
		private List<User> users; `所有的员工
	}

设计的接口和抽象方法应该是：

	public interface DepartmentMapper {

		DepartmentVO findById(Integer id);

	}

复制得到`DepartmentMapper.xml`，然后，需要执行的SQL语句应该是：

	SELECT 
		t_department.id AS did,
		name,
		t_user.id AS uid,
		username,
		password,
		age,
		phone,
		email,
		is_delete
	FROM 
		t_department 
	INNER JOIN
		t_user 
	ON
		t_user.did=t_department.id 
	WHERE 
		t_department.id=2;

> 以上代码中，自定义别名是因为需要区分查询结果中的列的名称，并不是因为需要与数据类型中的属性对应。
		`上边两个字段名都叫id，冲突，所以起别名
> 而查询结果的列名与数据类型的属性名的对应，是通过`<resultMap>`中的配置来完成的！
		`所以is_delete不用起别名，配置好对应的属性即可`

所需要配置的`<resultMap>`为：

	<resultMap id="Department_VO_Map" 		`id随便写，用在<select>的resultMap属性中
		type="cn.tedu.mybatis.vo.DepartmentVO">
		<!-- id节点：配置主键 -->
		<!-- column：查询结果中的列名 -->
		<!-- property：以上type属性对应的数据类型中的属性名 -->
		<!-- 这两个属性的意思是，把哪个字段封装到哪个属性中 -->
``		<id column="did" property="did"/>
		<!-- result节点：配置普通字段/一般字段 -->
``		<result column="name" property="name"/>
		<!-- collection节点：配置List集合类型的属性 -->
		<!-- ofType：在List里放的是什么类型。因为List集合是泛型，放
				什么都行，所以要明确告诉框架List集合里是什么类型 -->
``		<collection property="users"
``			ofType="cn.tedu.mybatis.entity.User">
			<!-- id/result同上。配置查询字段和ofType中属性的对应关系 -->
			<id column="uid" property="id"/>
			<result column="username" property="username"/>
			<result column="password" property="password"/>
			<result column="age" property="age"/>
			<result column="phone" property="phone"/>
			<result column="email" property="email"/>
			<!-- 既然设置字段和属性的对应关系,所以is_delete不用取别名了 -->
			<result column="is_delete" property="isDelete"/>
		</collection>
	</resultMap>

`	`'MyBatis复习'时补充：id节点和result节点可以混用，id/result节点不必须是配置主键/普通字段，但是按标准使用有利于使用缓存(MyBatis框架自己处理使用缓存)

配置时，与其它文件的**关系如图所示**： ![](02.png)


#--------------------------------------AJAX.DAY01---------------------------------------
###工程：AJAX

### 1. 响应正文

传统的处理请求时，响应的方式有转发或重定向，无论是哪种，最终都会直接呈现某个页面给客户端，这样做的缺点在于：

1. 用户体验可能不好，例如：用户注册时，提交的用户名被占用，出现错误，转发到错误页面，而用户操作时就必须从错误页面返回注册页，可能丢失原输入的内容，需要重新输入；
2. 流量消耗可能较大，例如：用户注册时，客户端所需的只是“1-成功；2-失败”等类似的结果即可，并不一定需要整个页面，同时，流量消耗较大也会对用户体验有不好的影响；
3. 可能不太适合多种不同的客户端，例如网页端、Android手机端、Android平板电脑端、iOS手机端、iOS平板电脑端。

所以，**解决以上问题的方案**就是：服务器端只提供服务，不处理界面，当客户端提交某种请求后，**服务器端只响应相关数据，而不再响应页面**，至于页面的处理，就交给各个客户端去处理。

假设：某用户提交了登录请求到`http://localhost:8080/项目/user/handle_login.do`，同时，还提交了参数`username`和`password`表示用户名和密码，服务器端对用户名和密码进行了判断，需要给出直接的响应结果，而不再转发或重定向：

	@RequestMapping("/handle_login.do")
	@ResponseBody
	public String handleLogin(
			String username, String password) {
		return "OK";
	}

当添加了`@ResponseBody`后，处理请求的方法的返回值就是**响应正文**，而不再表示转发或重定向。
		`浏览器接收到的就是一个OK，网页源码只有一个OK，并不是页面
		`老师说某些版本中使用这个注解需要注解驱动。(不过我们的配置中一直添加了注解驱动)
假设：验证登录的规则是：仅`root/1234`这组用户名和密码可以登录，登录成功时提示信息，登录失败时也提示出错的原因。



### 2. JSON数据格式

为了更好的实现“服务器端向客户端响应数据”，能够满足各种不同的数据格式要求，应该**将服务器端响应的内容有规则的组织起来**，例如，可以使用XML语法来组织数据：

	<result>
		<state>1</state>
		<message>登录成功</message>
	</result>

或：

	<result>
		<state>2</state>
		<message>您输入的用户名XXX不存在！</message>
	</result>

或：

	<result>
		<state>1</state>
		<data>
			<user>
				<id>1</id>
				<username>Mike</username>
				<password>1234</password>
			</user>
			<user>
				<id>2</id>
				<username>Jack</username>
				<password>1234</password>
			</user>
			<user>
				<id>3</id>
				<username>Lucy</username>
				<password>1234</password>
			</user>
		</data>
	</result>

		也可以这么表示：<user id="1",username="Mike",password="1234"/>......
		一开始就是这么表示的，所以后边说的是`属性`而不是说`节点`
但是，使用XML来组织数据也存在一定的问题：
1. 解析难度略大；
2. 节点产生的不必要数据太多。

当前，主流的解决方案是使用JSON格式来组织数据：

	{
		"state":1,
		"message":"登录成功"
	}

或：

	{
		"state":2,
		"message":"您输入的用户名XXX不存在！"
	}

或：

	{
		"state":1,
		"data":[
			{
				"id":1,
				"username":"Mike",
				"password":"1234"
			},
			{
				"id":2,
				"username":"Jack",
				"password":"1234"
			},
			{
				"id":3,
				"username":"Lucy",
				"password":"1234"
			}
		]
	}

可以看到，JSON的基本语法格式是：
1. 整个JSON数据使用一对大括号框住；
2. 可以有若干个属性与值的配置，属性与值之间使用冒号分隔，多个属性的配置之间使用逗号分隔，属性名应该使用双引号框住，属性的值如果是数值或布尔值可以直接写，如果是字符串则需要使用双引号框住。
3. JSON中也可以有**数组**，使用`[]`框住数组数据，数组中的各元素之间使用逗号进行分隔；
4. JSON中也可以有**对象**，甚至整个JSON数据就是一个对象，所有对象都应该使用`{}`框住，各属性的配置之间使用逗号分隔；
5. 以上**各种不同的配置之间可以组合**，例如数组的元素可以是对象，而对象中某属性的值也可以是数组。

**早期传数据都是传XML，现在都是使用JSON传输数据**

### 3. 服务器响应JSON数据

通常，服务器向客户端响应的数据都会包括几项内容：
1. 状态码：服务器与客户端约定某个数值表示某种意义，例如约定1表示操作成功，0表示操作失败，或其它数字表示某种意义；
2. 消息：通常是对操作失败时的错误的描述，可以被客户端用于提示用户；
3. 数据：某些请求的目标只是希望得到操作成功与否的结果，例如登录、注册等。而某些请求的目标是希望获取数据的，例如显示用户列表等，对于获取数据的请求，则应该专门给予数据；`所以数据不是必要的`

为了设计一个通用的响应的类型，可以：
第一步，准备出数据类型
	public class ResponseResult<E> {
		private Integer state;
		private String message;
		private E data;	`不同的请求希望获取的数据是不一样的，所以data是泛型。关于泛型看笔记'##泛型''
		// SET/GET，Serialiazable
	}

然后，添加Jackson依赖：
		`可以直接把类变成JSON格式
	<!-- Jackson -->
	<dependency>
		<groupId>com.fasterxml.jackson.core</groupId>
		<artifactId>jackson-databind</artifactId>
		<version>2.9.8</version>
	</dependency>

最后，将处理请求的方法的返回值类型修改为`ResponseResult`类型，并且，在方法体中，根据不同的登录结果，为`ResponseResult`中的属性赋予不同的值即可：

	@RequestMapping("/handle_login.do")
	@ResponseBody
	public ResponseResult<Void> handleLogin(   `用不到data，只需要state和message，而data是泛型，所以要写为Void。
			String username, String password) {
		ResponseResult<Void> rr
			= new ResponseResult<Void>();
		if ("root".equals(username)) {
			if ("1234".equals(password)) {
				// 登录成功
				rr.setState(1);
				rr.setMessage("登录成功");
			} else {
				// 密码错
				rr.setState(2);
				rr.setMessage("密码错");
			}
		} else {
			// 用户名错
			rr.setState(3);
			rr.setMessage("用户名错");
		}
		return rr;
	}

在SpringMVC框架中，当响应正文时(即方法添加了`@ResponseBody`时)，框架会根据方法的返回值类型寻找匹配的转换器。框架本身支持多款转换器，会一一进行尝试，直到找到匹配的，例如返回String类型，就会使用内置的字符串的转换器:(`StringHttpMessageConverter`)。
而当我们把返回值声明为自定义的`ResponseResult`时，SpringMVC框架默认并没有内置相关的转换器，就会自动使用Jackson(因为Jackson中包括支持任何类型的转换器)，而**Jackson中的转换器的工作模式**就是将响应的对象转换为JSON格式的字符串，并且会在响应头(Response Headers)中设置响应内容为`application/json,charset=utf8`。

`**原话补充**：
``	我们只需要添加jackson依赖即可，不用写其他代码。因为每一次响应的时候SpringMVC框架都会去寻找转换器，来帮我们把响应的返回值返回给客户端，比如返回值写String，则SpringMVC就会去找String的转换器
		使用SpringMVC内置的String的转换器，浏览器收到后F12可以发现响应头中Content-Type:text/html;charset=ISO-8859-1 这是String的转换器类型默认的，默认是不支持中文的。    可以通过调用String转换器类是StringHttpMessageConverter的超类AbstractHttpMessageConverter的setDefaultCharset(Charset defaultCharset)来设置为UTF-8支持中文。但是我们一般不会去做，因为我们不用内置的转换器。
``	**我们自己写ResponseResult类型的目的是**：
``		1.让SpringMVC默认识别不了这个类型，从而让Jackson框架去进行处理
``		2.约定Json数据的格式。比如我们写的ResponseResult，每一次响应的json里面都包含单个数据，而且名字都是state、message和data
``	使用jackson，要保证返回值是SpringMVC天生识别不了的(自己写一个类)，这样SpringMVC在内置转换器中找不到才会去用Jackson里的转换器。
		Jackson框架给浏览器的响应头中Content-Type:application/json;charset=UTF-8   不仅字符编码是UTF-8，而且告诉浏览器响应的内容是json
``	另外：如果浏览器显示出的JSON有效果，比如颜色分支模型等，是因为浏览器有相关的效果插件


### 4. 在Javascript中访问JSON数据

Javascript是默认直接识别JSON数据的，不需要编写特殊的解析程序。

假设存在：

	var json = { 
		"state":1, 
		"message":"登录成功！", 
		"data": [
			{
				"id":31,
				"username":"Jack",
				"password":"123456"
			}, 
			{
				"id":35,
				"username":"Lucy",
				"password":"888888"
			}, 
			{
				"id":36,
				"username":"Mike",
				"password":"654321"
			}
		]
	};

通过`json.state`即可以访问到`"state"`属性的值，同理，通过`json.message`就可以访问到`"message"`属性的值，由于`"data"`属性的值的类型是数组，直接访问时，会显示为数组元素的输出，应该通过例如`json.data[1]`访问其中的某个元素，当然，该数组中的元素都是JSON对象，可以继续向下访问其中的某个属性，例如`json.data[1].username`即可获取到`"Lucy"`值。

在JSON中的数组也是可以循环或遍历的：

	for (var i = 0; i < json.data.length; i++) {
		console.log(json.data[i].id);
		console.log(json.data[i].username);
		console.log(json.data[i].password);
		console.log("");
	}

但是，在绝大部分情况下，获取到的JSON数据可能并不是一个JSON对象，而只是符合JSON语法的字符串而已，所以，还需要通过`JSON.parse()`函数将字符串转换为JSON对象：

	var json = JSON.parse(str);
		`‘数据类型’这个概念只存在于运行程序的计算机里面，是程序运行过程中我们创造出来的数据类型概念。而数据被存储、传输，则根本没有数据类型的概念。

### 5. AJAX (Asynchronous Javascript And XML   --> 异步Javascript和XML)
		`X表示XML，最早没有json时是通过XML传输的，现在都用json，但是还是叫AJAX
		`我的笔记有AJAX补充

AJAX用于提交异步请求。
		`异步：各走各的，线程之间不影响。把整个浏览器理解为一个主线程，当提交请求，主线程把请求发出，并把返回的结果显示在页面上，导致页面发生变化。这样设计的程序缺点就是：一、页面变了，客户体验不好；二、请求发出没有及时得到响应，这期间页面无法操作(不能滚动，或者点击等等)，造成卡顿(原因是只有一个线程，并且线程在忙着发请求和拿回响应)。
		`上述问题的解决方法是开一个子线程，让主线程负责页面显示，子线程提交请求抓回结果。两个线程没有关系。即异步提交请求。
		`异步提交请求有两种实现方式：传统的Js方式&JQuery框架。推荐用Jq，Jq有封装好的方法。原生的js比较繁琐，并且JQuery解决了浏览器兼容问题。
		`异步请求的对象是XMLHttpRequest，他封装在JQuery中，不用我们创建

	// 为按钮绑定单击事件		`把JQ/js代码写在下面，就不用指定页面加载完成事件，因为上边的已经加载完了。
	$("#btn-login").click(function() {
		$("#username-hint").empty();
		$("#password-hint").empty();
		// 发出异步请求，获取响应
		// 调用$.ajax()函数即可发出请求并处理响应结果
		// $.ajax()函数的参数是JSON对象
		// url：把请求提交到哪里，相当于<form>中的action
		// data：提交到服务器端的数据，格式：param1=value1&param2=value2
		// type：提交方式，取值为POST或GET。
`			`在数据量不大的情况下，AJAX请求提交方式是POST和GET都不重要，因为异步提交在网址上不会体现。如果数据量多还是用Post。
		// dataType：服务器端响应的数据的类型，可以是text、json、xml，取决于服务器响应时的响应头中例如"application/json"
		// success：服务器端成功响应时的回调函数，函数的参数就是服务器端响应的数据，并且已经转换为指定的格式
		var u = $("#username").val(); //val=value
		var p = $("#password").val();
		$.ajax({
			"url":"user/handle_login.do",
			"data":"username=" + u + "&password=" + p,
			"type":"POST",
			"dataType":"json",
			"success":function(json) {
				if (json.state == 1) {
					alert("登录成功！");
				} else if (json.state == 2) {
					$("#password-hint").html(json.message);
				} else if (json.state == 3) {
					$("#username-hint").html(json.message);
				} else {
					alert("发生未知错误！");
				}
			}
		});
	});
	</script>
####`AJAX-data提交的写法二
		SpringBoot.DAY01补充，src/main/resources/static/reg.html
 - 高科技：将需要传的数据用form表单框住，form标签只需要写一个id属性即可。
 - "data":$("#reg-from").serialize(), 根据id选择表单，调用serialize方法，此**方法会根据name=值的方式发出请求参数**。而不需要向老方法一样再给每个参数写id。所以要保证name的值要和服务器的属性保持一致。


####`AJAX的优缺点
		https://www.cnblogs.com/yanze/p/6359036.html
 - 优点：
		1. AJAX最大的优点就是异步与服务器通信，不刷新整个页面、不打断用户的操作。
 		2. 降低了流量的消耗，只传输必须的数据。
 - 缺点：
		看网址


#-----------------------------------SpringBoot.DAY01------------------------------------
###工程：sample

### 1. SpringBoot
		`理解SpringBoot：是帮助我们添加依赖，帮助我们完成(简单的必不可少的)配置的框架，使我们的配置更加地简单。
			对我们传统编码方式没有任何改动，只是相关的配置方面不一样
#### 1.1. 概要

在传统的SSM框架应用过程中，存在大量的配置文件，及相关的配置项，例如：
		`SSM(Spring+SpringMVC+MyBatis)框架集
	1. DispatcherServlet
	2. CharacterEncodingFilter
	3. <mvc:component-scan />
	4. <mvc:annotation-driven />
	5. <bean class="...InternalResourceViewResolver" />
	6. <util:properties />
	7. <bean class="...BasicDataSource" /> 
	8. <bean class="...MapperScannerConfigurer" />
	9. <bean class="...SqlSessionFactoryBean" />

这些配置在每个基于SSM框架的应用中都是需要的，每次开发时却改动很小，甚至某些配置是不需要改动的，所以，出现了SpringBoot框架！

可以把**SpringBoot理解为框架的集合体**，默认就添加了大量的常用依赖，并且完成了绝大部分通用的配置，从而简化了项目的创建过程。

在其它方面，SpringBoot也有很多的简化，在学习中再慢慢体会。

#### 1.2. 使用SpringBoot

访问`https://start.spring.io/`，通过该页面创建项目，主要填写必要的参数，点击**Switch to the full version**展开详细配置，在下方勾选所需要的jar包，然后生成项目。

下载生成的项目的压缩包，解压缩后，将项目文件夹复制或剪切到Workspace中，在Eclipse中，通过Import > Existing Maven Projects功能导入，然后等待项目更新完成（务必保证此过程中电脑是可以正常连接到Maven服务器的）。　

#### 1.3. HelloWorld

首先，SpringBoot默认并不推荐服务器端的开发任务中包含页面的开发，即服务器端依然只提供JSON数据即可，而不应该通过转发或重定向等方式处理页面（当然，功能方面还是支持的）。

由于创建项目时，`Group`值为`cn.tedu.boot`，`Artifact`值为`sample`，所以，在项目中默认存在`cn.tedu.boot.sample`包，**这个包也是组件扫描的包，则本项目中，所有需要被Spring管理的组件都必须在这个包或它的子孙包中**！

在`cn.tedu.boot.sample.controller`中创建`HelloController`：

	@RestController
	@RequestMapping("/hello")
	public class HelloController {
	
		// 请求路径：/hello/index
		@GetMapping("/index")
		public String showIndex() {
			return "hello, spring boot.";
		}
	
	}

> 以上`@RestController`是`@Controller`与`@ResponseBody`的组合应用方式，当使用这个**注解**时，当前类中所有处理请求的方法相当于都添加了`@ResponseBody`，同时，也意味着当前控制器中处理请求时不支持转发或重定向，而全部是响应正文，如果一定需要转发或重定向，只能使用`@Controller`注解。
`		`@RestController注解在传统的SSM框架中就有，当时没有学json，所以当时没介绍。

> SpringBoot默认添加了许多常用的**依赖**，且相关的jar包都是较高的稳定版本，所以，简单的项目中可以不必自行添加依赖，如果需要添加依赖，大多数依赖是不推荐自定义版本号的。
		`MySQL，MyBatis，要自己勾选，是因为数据库和持久层框架都有很多种，Springboot也不知道你要用哪个。
		如果用了数据库，则要在.properties配置数据库信息，和以前一样配置
> 在SpringBoot中，配置(修改)了`StringHttpMessageConverter`的配置，使得响应头的`ContentType`使用的字符**编码**是utf-8，所以，即使使用`String`类型的返回值响应正文，也是支持中文的！（默认是使用的ISO-8859-1）

> 并且，SpringBoot默认完成了关于`DispatcherServlet`的配置（事实上在SpringBoot项目中根本就不存在web.xml文件），并且映射的**路径**是`/*`，所以，在配置映射路径时，并不要求资源名以`.do`作为后缀。

> 在执行时，直接**运行**根包下的`XXXApplication.java`文件中的`main()`方法即可，**SpringBoot中内置Tomcat**，所以，在启动之前，务必保证默认端口`8080`没有被占用，并且，成功启动后，在没有停止之前，不可以启动第２次，否则将导致端口冲突，第２次启动会失败！
		`所以以后如果用SpringBoot开发，是不需要自己再配置任何Tomcat

> 由SpringBoot部署的项目，在URL中没有项目名称，所以，以上配置的请求，可以通过`http://localhost:8080/hello/index`直接**访问**。

#### 1.4. 设计注册页面

基于**前后端分离的思想**，页面并不需要是JSP页面，只需要是HTML页面即可。

在SpringBoot中，**推荐**将静态资源（HTML页面、CSS、JS、图片等）放在`src/main/resources/static`目录下。

所以，**在`static`下创建**`reg.html`页，完成后，通过`http://localhost:8080/reg.html`即可**直接访问**。
	`把static理解为根目录

#### 1.5. 创建实体类

	package cn.tedu.boot.sample.entity;
	
	import java.io.Serializable;
	
	public class User implements Serializable {
	
		private static final long serialVersionUID = 1414039275087351434L;
	
		private Integer id;
		private String username;
		private String password;
		private Integer age;
		private String phone;
		private String email;

		// ...
	}

#### 1.6. 持久层

在SpringBoot项目中，使用MyBatis时，无须配置`MapperScannerConfigurer`和`SqlSessionFactoryBean`，可以直接开始编写代码，例如先创建`cn.tedu.boot.sample.mapper.UserMapper`接口：

	public interface UserMapper {
	
		Integer addnew(User user);
	
	}

然后，在`resources`下创建`mappers`文件夹，并在该文件夹下添加`UserMapper.xml`文件（从其它项目中复制粘贴过来）：

	<mapper namespace="cn.tedu.boot.sample.mapper.UserMapper">
	
		<insert id="addnew">
		INSERT INTO t_user (
			username, password,
			age, phone,
			email
		) VALUES (
			#{username}, #{password},
			#{age}, #{phone},
			#{email}
		)
		</insert>
	
	</mapper>

即使不用再配置比较繁琐的内容，也不代表完全没有配置，为了保证项目能扫描得到**持久层接口**，需要在接口之前添加**`@Mapper`注解(表示该类是接口文件**`UserMapper.java`)，同时，还需要指定持久层映射的XML文件的位置，在`application.properties`文件中：

	mybatis.mapper-locations=classpath:mappers/*.xml

编码完成后，应该及时执行单元测试，以检查功能是否正常，应该在`src/test/java`中的根包下创建测试类，
		`SpringBoot本身也有了一个测试类，但是我们还是习惯自己建类，原先的留在那里即可。
所有**测试类**都应该添加`@RunWith(SpringRunner.class)`和`@SpringBootTest`**注解，相当于加载Spring配置文件以获取Spring容器，甚至完成其它的初始化配置**，然后，所需要的Bean可以**直接声明**并添加`@Autowired`通过自动装配来得到值，接下来，编写测试方法即可：	`@Autowired自动装配，**相当于getBean**

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class UserMapperTestCase {
		
		@Autowired
		UserMapper userMapper;
		
		@Test
		public void addnew() {
			User user = new User();
			user.setUsername("boot");
			user.setPassword("8888");
			Integer rows = userMapper.addnew(user);
			System.err.println("rows=" + rows);	`用err输出，是为了更加醒目，因为SpringBoot框架的输出都是黑色的。
		}
	
	}

通常，注册功能中，要求“用户名必须是唯一的”，所以，为了保证注册功能的完整性，还应该提供“根据用户名查询用户数据是否存在”的查询功能！对应的抽象方法可以是：

	User findByUsername(String username);

匹配的映射是：

	<select id="findByUsername"
		resultType="cn.tedu.boot.sample.entity.User">
		SELECT 
			id
		FROM 
			t_user 
		WHERE 
			username=#{username}
	</select>

注意：由于这个查询功能应用于“注册时检查用户名是否被占用”，所以，并不关心查询到的数据的各属性值是多少，那么，在查询时，应该只查询必要的字段，如果所有字段都不关心，则只选取其中任一字段即可。

功能完成后，还是应该及时的编写测试：

	@Test
	public void findByUsername() {
		String username = "boot";
		User user
			= userMapper.findByUsername(username);
		System.err.println(user);
	}


`	原始的servlet处理方式：
	public void doGet() {
		// 接收用户提交的用户名等参数
		// Dao > 检查用户名是否被占用
		// 是：被占用 > 提示错误
		// 否：没有被占用 > Dao > 插入数据 > 提示成功
	}`引出下面业务层

#### 1.7. 业务层(业务=>功能)
		`业务：把多件事组成一件事(功能)，先检查用户名是否存在再确定是否执行插入，类似于数据库的事务。
通常，业务层应该由业务接口和业务实现类来共同组成，例如创建`cn.tedu.boot.sample.service.IUserService`：

	package cn.tedu.boot.sample.service;

	public interface IUserService {`加I表示是个接口，个人习惯`
	
	}


然后，创建`cn.tedu.boot.sample.service.impl.UserServiceImpl`类实现该接口：

	package cn.tedu.boot.sample.service.impl;
	
	import cn.tedu.boot.sample.service.IUserService;
	
	public class UserServiceImpl
		implements IUserService {
	
	}

接下来，应该在接口中声明抽象方法，该方法表示向外提供的功能，例如注册、登录、修改密码等，此次需要完成的是**注册**，则：

	void reg(User user); // throws 用户名被占用异常, XX异常;

注意：**设计抽象方法时，仅以“成功”为前提来考虑方法的返回值类型**！如果失败，使用抛出异常的方式来表现。

	try {

	} catch (用户名被占用异常 e) {

	} catch (XXX异常 e) {

	}

然后，在实现类中，**声明持久层对象**`private UserMapper userMapper;`并添加`@Autowired`**注解**，当前类也应该添加`@Service`注解，然后，实现以上方法：

	@Service
	public class UserServiceImpl
		implements IUserService {
		
		@Autowired
		private UserMapper userMapper;
	
		@Override
		public void reg(User user) {
			// 根据user.getUsername()查询数据
			String username = user.getUsername();
			User data = userMapper.findByUsername(username);
			// 判断数据是否为null
			if (data == null) {
				// 是：为null，即：用户名未被使用，则插入数据
				userMapper.addnew(user);
			} else {
				// 否：非null，即：用户名被占用，则抛出异常
				throw new RuntimeException(
					"注册失败！您尝试注册的用户名(" + username + ")已经被占用！");
			}
		}
	
	}
	
最后，执行单元测试：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class UserServiceTestCase {
	
		@Autowired
		IUserService userService;
		
		@Test
		public void reg() {
			try {
				User user = new User();
				user.setUsername("service");
				user.setPassword("8866");
				userService.reg(user);
				System.err.println("注册成功！");
			} catch (RuntimeException e) {
				System.err.println(e.getMessage());
			}
		}
		
	}

#### 1.8. 控制器层

先创建控制器类`cn.tedu.boot.sample.controller.UserController`，添加`@RestController`和`@RequestMapping("/user")`：

	@RestController
	@RequestMapping("/user")
	public class UserController {
	
	}

控制器类本身并不完成实际功能的处理，主要作用是接收请求、给予响应结果，所以，在功能的处理方面，它会依赖于业务层`private IUserService userService;`并通过`@Autowired`注入值：

	@Autowired
	private IUserService userService;

接下来，应该设计所需要处理的请求，此次的请求是用户将提交注册相关数据，尝试执行注册，所以，请求的类型应该是`POST`，请求的参数应该是包括注册的所有数据，例如用户名、密码、年龄等，在SpringMVC中，可以使用`User`对象接收这些参数，在响应时，仍推荐使用JSON数据进行响应，所以，应该提前创建好`ResponseResult`类，作为处理请求的方法的返回值：

	package cn.tedu.boot.sample.util;

	import java.io.Serializable;
	
	public class ResponseResult<T> implements Serializable {
	
		private static final long serialVersionUID = -5015220243507112803L;
	
		private Integer state;
		private String message;
		private T data;

		// SET/GET

	}

然后，在控制器类中添加处理请求的方法：

	@RequestMapping("/reg")
	public ResponseResult<Void> handleReg(User user) {

	}

最**原始的**处理方式为：

	@RequestMapping("/reg")
	public ResponseResult<Void> handleReg(User user) {
		ResponseResult<Void> rr = new ResponseResult<Void>();

		try {
			userService.reg(user);
			rr.setState(1);
			rr.setMessage("注册成功");
			return rr;
		} catch (RuntimeException e) {
			rr.setState(2);
			rr.setMessage(e.getMessage());
			return rr;
		}
	}

**为了快速的创建**`ResponseResult`并确定`state`和`message`属性的值，**简化以上代码**
所以，可以在`ResponseResult`类中**添加新的构造方法**：

	public ResponseResult(Integer state, String message) {
		super();
		this.state = state;
		this.message = message;
	}
	
	public ResponseResult(Integer state, Exception e) {
		super();
		this.state = state;
		this.message = e.getMessage();
	}

所以，原有的控制器中的**代码可以调整**为：

	@RequestMapping("/reg")
	public ResponseResult<Void> handleReg(User user) {
		try {
			userService.reg(user);
			return new ResponseResult<Void>(1, "注册成功");
		} catch (RuntimeException e) {
			return new ResponseResult<Void>(2, e);
		}
	}

为了便于**统一处理异常**，应该添加专门的方法进行处理：

	@ExceptionHandler(RuntimeException.class)
	public ResponseResult<Void> 
		handleException(Exception e) {
		return new ResponseResult<>(2, e);
	}

则控制器中不必再处理异常：

	@RequestMapping("/reg")
	public ResponseResult<Void> handleReg(User user) {
		// 执行注册
		userService.reg(user);
		// 注册成功，确定返回值
		return new ResponseResult<>(1, "注册成功！");
	}

全部完成后，可以在浏览器的地址栏中输入`http://localhost:8080/user/reg?username=exception&password=666`进行测试（如果有更多非空字段的设计，请添加更多参数），**测试完成后，将以上处理请求的方法的注解修改为`@PostMapping`。**`注册应当是post请求，但是我们在做测试时，为了方便直接测试在地址栏输入，所以用RequestMapping/GetMapping`

		`还要用AJAX写完reg.html页面，用到了'####`AJAX-data提交的写法二'


#------------------------------------PROJECT.DAY01--------------------------------------


### 1. Spring复习

Spring主要是创建对象和管理对象的框架。

Spring通过DI实现了IoC。

Spring能很大程度的实现**解耦**。
		Controller > Service > Mapper
		解耦真正的意义是：任何一个角色应该是可以被替换的，我们依赖的应该是符合某个标准&规范的角色，而不是某个具体的角色
		比如事实上UserController自动装配的userService的值就是UserServiceImpl，但是没有把这个类写出来，这就是解耦的具体表现。看不见名字就是解耦

需要掌握SET方式注入属性的值。

需要理解自动装配。

需要掌握Spring表达式。

需要掌握AOP（暂时没学）。

### 2. Spring MVC复习

Spring MVC框架是解决了V-C交互的问题，即：服务器端如何接收客户端的请求，并如何给予响应。

需要掌握如何接收请求参数。
		‘封装参数’和‘直接使用参数’的混用是很好的，必须验证码的例子'混用举例'

需要掌握如何转发数据。
		request(麻烦)、ModelAndView(更麻烦)、ModelMap(推荐：1、更轻量。2、用ModelMap方便我们进行单元测试，测试的时候随便给这个参数一个Map即可，但如果是HttpServletRequest，这个对象很复杂，不方便我们来做测试。)

需要掌握转发与重定向。

需要掌握响应JSON数据。
		1、保证返回值是SpringMVC看不懂的  2、Jackson框架  3、处理请求的方法加@ResponseBody注解或@RestController注解。

需要掌握统一处理异常的做法。

需要掌握拦截器的使用。
		有多个请求都需要执行相同或高度相似的代码时用拦截器。

### 3. MyBatis复习

执行增删改的操作的方法应该返回Integer，表示受影响的行数；

执行查询方法的`<select>`节点必须配置`resultType`或`resultMap`；

执行查询时如果列名与字段名不一致，在查询时需要自定义别名，以保证名称统一；

掌握`<resultMap>`的配置。
		id节点和result节点可以混用，id/result节点不必须是配置主键/普通字段，但是这么用有利于使用缓存(MyBatis自己处理使用缓存)

MyBatis有2级缓存，只有1、2级缓存都没有需要的数据才去查询数据库。1级缓存是基于SqlSession(数据库会话)的，我们全程无法干预。2级缓存可以通过xxMapper.xml文件干预，写缓存节点<cache></cache>,是namespace层级的缓存(namespace是mapper节点的属性)。
		缓存是有争议的，缓存的数据是不可靠的，当有任何的增删改操作的时候，缓存的数据还是修改之前的。当数据频繁修改时，缓存的可靠性就很低了，尤其现在发展的越来越快。mysql以前自带缓存，现在高版本都不带缓存功能，因为数据整天改来改去，缓存没啥用了。
