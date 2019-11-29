
# **==简介==**
## java/jdk下载地址： 
- oracle.com-->Doenloads-->JavaSE || Java EE &... --安装SE版

## 关于是否安装Java EE：
> https://bbs.csdn.net/topics/390387780

- 以前只有JAVA SE安装包，至于开发EE程序时，如果你用的是eclipse会让你选择tomcat的路径，这个**实际上就是把tomcat所用到和实现的EE的包加到你工程的路径**(并没有对EE全部支持,只支持servlet，jsp等等)。
- 如果你用的是MyEclipse当你新建web工程时,eclipse会把他自己实现的包加到你的工程里,其实这些包也只是在你编译的时候用到,你运行的时候还是要靠web服务器上的那些包
- 而至于现在出现的EE安装包,层主没用过,不过我猜是oracle自己实现了EE的标准,安装后会生成一些包,然后你自己添加到工程路径而已
- **暂且安装SE版的**，因为：
	1. 在我们看源码的时候，他的版本注释都是JDK多少多少，这个是指的SE版本。
	2. 下载Maven的时候，介绍说“Maven 3.3 +需要JDK 1.7或以上才能执行”，这些都是以SE的版本为根据的。
	3. 我们在做Web开发的时候，有Tomcat等Servlet容器提供运行环境，容器有我们需要用到的包类

## Java EE 8 Platform SDK 和 Java EE 8 Web Profile SDK
```
SDK的意思往下看'##SDK'
```
- web profile版本与platform sdk之间的区别在于，**web profile版本仅提供Java EE平台的一个Web子集**。它专为仅应用于大多数Web应用程序所需的技术的Web应用程序开发而设计，并且不包括那些 通常不需要Web应用程序（像JMS等）。而platform sdk则全面一些。

## Java EE&Java SE的版本关系
- JavaSE、JavaEE都是SUN公司自己定义的官方标准，**两者之间的版本没有什么直接关联**。
- JavaEE 7和JavaSE 8（也就是Java 8）是同时发布的。JavaEE 8和JavaSE 9（也就是Java 9）是同时发布的。


## 基本认知：
1. JDK、JRE、javac和JVM的关系 
	- 参考https://www.cnblogs.com/Aha-Sanding/p/5333282.html
2. .class文件与.java文件的区别 
	- 参考：https://zhidao.baidu.com/question/95913795.html
3. JVM(Java Virtual Machine) -Java 虚拟机
	- 参考：https://www.cnblogs.com/Qian123/p/5707562.html (这里有说jvm是看不到的，和普通虚拟机不一样)
    - 虚拟机就是在计算机上再虚拟一个计算机。
    - JVM和我们使用 VMWare不一样，那个虚拟的东西你是可以看到的，这个JVM 你是看不到的，它存在内存中。
		- 即可视化和不可视化
4. JDK1.7和7.0的区别
	- 参考百度百科'jdk'   https://baike.baidu.com/item/jdk/1011?fr=aladdin  里面有各版本的名称，看看就知道了
    - 同为7的版本,一样的。
    - 在 5.0 之前都是 1.x 的叫法。到了1.5的版本，sun公司觉得好几年才1.x不好听，于是改成了5.0的叫法，也叫叫tiger版；后面一样,也就是1.4到5.0的变化最大
5. java&javac文件
    - .javac       编译Java程序     →.class（.Java编译成.class）
    - .java         运行Java程序     →结果（运行结果）
6. 命令行cmd的cd命令的意思是跳转


## SDK
> http://quanweilu.blog.sohu.com/130098317.html

- SDK就是 Software Development Kit 的缩写，中文意思就是“软件开发工具包”。这是一个覆盖面相当广泛的名词，可以这么说：辅助开发某一类软件的相关文档、范例和工具的集合都可以叫做“SDK”。具体到我们这个系列教程，我们后面只讨论广义 SDK 的一个子集——即开发 Windows 平台下的应用程序所使用的 SDK。


## [jSE，jEE，jME，J2SE，J2EE，J2ME的概念](http://quanweilu.blog.sohu.com/130098317.html)
- Java SE（Java Platform，Standard Edition**标准版**）。
    - Java SE 以前称为 J2SE。它允许开发和部署在桌面、服务器、嵌入式环境和实时环境中使用的 Java 应用程序。Java SE 包含了支持 Java Web 服务开发的类，并为 Java Platform，Enterprise Edition（Java EE）提供基础。
- Java EE（Java Platform，Enterprise Edition**企业版**）。
    - 这个版本以前称为 J2EE。企业版本帮助开发和部署可移植、健壮、可伸缩且安全的服务器端 Java 应用程序。Java EE 是在 Java SE 的基础上构建的，它提供 Web 服务、组件模型、管理和通信 API，可以用来实现企业级的面向服务体系结构（service-oriented architecture，SOA）和 Web 2.0 应用程序。
- Java ME（Java Platform，Micro Edition**移动版**）。
    - 这个版本以前称为 J2ME。Java ME 为在移动设备和嵌入式设备（比如手机、PDA、电视机顶盒和打印机）上运行的应用程序提供一个健壮且灵活的环境。Java ME 包括灵活的用户界面、健壮的安全模型、许多内置的网络协议以及对可以动态下载的连网和离线应用程序的丰富支持。基于 Java ME 规范的应用程序只需编写一次，就可以用于许多设备，而且可以利用每个设备的本机功能。
- **简单说：**
``	Java SE 是做电脑上运行的软件。
``	Java EE 是用来做网站的-（我们常见的JSP技术）
``	Java ME 是做手机软件的。
``	**javaSe看成是java基础，J2EE看成是应用**


## 下载jre的时候两个Windows64位：
- 后缀.exe的是安装包
- 后缀.tar.gz的是压缩包，这个格式常见在Linux和macOS系统


## jdk安装
- 安装界面的三个选项：
	- 开发工具：jdk
	- 源代码：java是一门开源的语言，源代码是方便使用者查看并-了解他的实现机制，进一步的理解java；
	- 公共jre：公用JRE与私有JRE
#### 公共JRE和私有JRE
- 公用JRE：在Java根目录下，主要**为已开发好的JAVA程序提供执行的平台**
- 私有JRE：即JDK本身自带的JRE，在JDK安装目录下的JRE目录下，**供开发Java程序时做测试之用**
- 两者主要差别：私有JRE比公用JRE多了个Sever的VM（虚拟机）执行选项
	- 参考: https://blog.csdn.net/jiutao_tang/article/details/6213115
- 没必要安装公共JRE
	1. 公共JRE是一个独立的JRE系统，会单独安装在系统的其他路径下。公用JRE会向Internet Explorer浏览器和系统中注册java运行环境。通过这种方式，系统任何应用程序都可以使用公用JRE。由于现在在网页上执行APPLET的机会越来越少，而且完全可以选择使用JDK目录下的JRE来运行Java程序，因此没有太大的必要安装公共JRE。
		- 参考: https://blog.csdn.net/javackaifa/article/details/21968551
			- http://www.le.com/ptv/vplay/23650125.html?ch=baidu_s 42分30秒讲了公共jre！
			- https://zhidao.baidu.com/question/534656031.html     ---  applet！
	2. 如果安装了JDK的话，其实是没必要再安装公共jre的，公共jre的作用是向系统和浏览器注册Java运行环境，以及提供了一些Java更新服务，所以没必要再去单独安装这个公共jre，只要正常安装JDK，指定好环境变量后，就OK了。
		- 参考: https://blog.csdn.net/sanjiaozhen/article/details/45157565橙色字
			- https://blog.csdn.net/keqiwww/article/details/77073840


# **==[环境变量的配置](https://jingyan.baidu.com/article/fd8044fa2c22f15031137a2a.html)==**

## 为什么要配置环境变量
- 参考https://blog.csdn.net/u013006675/article/details/72927029
- 百科：当要求系统运行一个程序而没有告诉它程序所在的完整路径时，系统除了在当前目录下面寻找此程序外，还应到path中指定的路径去找。用户通过设置环境变量，来更好的运行进程。
- **配置环境的各种问题：查看浏览器收藏，千锋教育的。**
#### 关于没有配置环境也能在cmd中回应java指令的问题
- 原因：是安装公共jre的时候，公共jre里有几个常用exe会被自动复制到C:\Program Files (x86)\Common Files\Oracle\Java\javapath里并且在path里自动生成这个环境变量，删除公共jre即消失


## 环境变量之 JAVA_HOME
- 便于path和classpath的引用，在path和classpath中显得不杂乱。并且便于修改jdk的位置，jdk的位置一旦改变只需要修改这个变量的路径即可，而不必一个个修改其他引用了这个路径的变量。
- 网上说：JAVA_HOME是一个约定，通常它指的是JDK的目录。如果需要JDK的话，大部分程序会默认去环境变量中取JAVA_HOME这个变量。


## 环境变量之 classpath
- **==JDK1.5以上的版本classpath这个环境变量可不再配置==**。
- 看凯哥视频
- classpath百度百科：https://baike.baidu.com/item/CLASSPATH/5734076?fr=aladdin
- Java环境变量中classpath是必须配置吗：参考https://zhidao.baidu.com/question/1605930365893725827.html
	- 查这个问题是因为我的classpath配的java路径其实是没有最后那个路径文件的，但并没有发现什么影响。
- classpath配置问题:如果使用JDK1.5以上就不需要配置这个环境变量! JRE会自动搜索当前路径下的类文件及相关jar文件,
	- 建议继续设置以保证向下兼用问题
#### classpath的`. ;`
 - 这是个优先级的问题。“."代表的是当前路径，以他开头，是为了程序运行时，让他在当前路径去寻找额外的一些资源。比如说，你自己写的一些类。
 - ";"是起着分割的作用，如果在前面的目中没有找到想要，那么会去很分号后面的目录中查找，就这样一级一级的找下去，直到classpath末尾，如果还没有找到，就报异常！
	https://www.cnblogs.com/dreamworlds/p/5388382.html
 - **重点重点参考**：https://blog.csdn.net/ns_code/article/details/18547959 ！！！！！！（确定了bin可调用类库！！！）


## 环境变量之path
- 把jdk\jre\bin填在path中
- 很明显是想方便调用jre中的程序，很多人都不配置这个是因为用不着。他们就是编译源码（//小零件吧）
- 但是有些需要虚拟机线程的东西或者jdk没有兼容的程序就需要用了。因为java是一个很庞大的体系，很多人只用一方面，但不代表另一些人不需要这些东西，语言设计者需要考虑所有情况。是你看完操作系统和设计模式后懂的东西------刘洋
- 配置是为了个别情况需要用到，不配置也不影响正常使用，jdk\bin下的exe会检索到自己jdk目录下的jre零件
## 关于path路径优先级：
- 环境变量是先检索程序当前目录，再根据path检索。
- 将jdk\jre\bin排在前面是为了避免不同jdk版本因路径的前后顺序不同，优先检索冲突而导致低版本JDK运行了高版本代码出现错误。并不是为了快，因为环境变量撑死几个几十个，而且这个只是调用命令的时间，不是执行时间，执行效率是看你代码优化的。


## path和classpath的区别
- 详解：https://blog.csdn.net/zhaihao1996/article/details/78387676
- classpath**是javac编译器的一个环境变量**，它的作用与import、package关键字有关
    - 百度百科：Classpath设置的目的，在于告诉Java执行环境，在哪些目录下可以找到您所要执行的Java程序所需要的类或者包。
- path是用来搜索所执行的可执行文件路径的，如果执行的可执行文件不在当前目录下，那就会依次搜索path中设置的路径



## 关于cmd里编译.java和运行.class都用的jdk\bin里的java、javac：
- java、javac本来就是用java写的，我暂且认为他可以自己检索到jdk下的jre小零件


## 关于用户使用java写的东西：
- 一般java做网页，jre设在服务器端，所以用户访问网页就可以，后端的jre做相应的工作
- 少数java程序的话，内置jre，可以设置好，也不用用户自己配置（就像安装公共jre他会自己配那几个一样，那几个应该也会关联到jre\bin的吧。关于为啥不自动配到位我也不知道，jdk其实也可以自动配到位，可能是和用户有关吧，jdk一半开发者用，都按照自己需求配，电脑盘或者服务器啥的也不一定和普通用户一样。但是公共jre普通用户用，一般都有c盘。）


## 关于那个java8的警告
- **我百度贴吧发帖了**
- 刘洋：比如一些函数用不到，他不会在本版本删除，本版本一般是优化，会在大版本中删除和添加做大的变动。还因为删除工作量大好像。。。我也不知道能有多大，不过第一个解释不错。


## 关于java11没有jre的问题
- 天将说11的环境完全继承到jdk了，没有单独成在jre文件夹，这也是大版本更新的问题。


## 检验是否安装&配置完成：
- 命令行输入java -version | java | javac命令，正常显示信息则成功


## 在Eclipse中导入JDK类库的源代码
- 打开eclipse->“window”-> “Preferences” -> “Java” -> “Installed JRES”->选择你的JRE->”Edit”->”展开……xx\lib\rt.jar”->双击”Source Attachment:(none)”->”External location”->External File->选择你的JDK安装目录下的src.zip
	- rt.jar包含了jdk的基础类库，也就是你在java doc里面看到的所有的类的class文件
- 或者，直接在相应的类或者方法上按F3，显示点击attach source，这里添加指定的压缩包路径即可
	- 选中字段按F3，或者Ctrl+左键 都行



## 经过我的观察：
- 我认为eclipse并没有使用我们指定的JDK中的JRE，他使用的是自带的JRE。支撑我这个观点的原因如下
	- 一. 我们建立的Maven项目他默认使用的是JRE System Library[J2SE-1.5]，但是我明明安装的是1.8，这就很奇怪了，而且JRE System Library意思是系统库，难不成就是Eclipse自带的库？如果是自带的库那就好说了。
	- 二. 打开Window-->Preferences-->Java-->Build Path-->Classpath Variables可以发现，我们下的jdk被划了斜线，写着(non modifiable,deprecated)弃用，不可修该。点一下下边出现警告：xxx isdeprecated: Use the JRE System Library instead   xxx不推荐使用:使用JRE系统库代替。这更让我觉得我们写的代码是用的他自带的JRE运行的了，况且我们明明没下的JRE版本，Eclipse都有，都可以指定
- **我们下的JDk好像只是用来运行Eclipse，以及提供源代码供我们查看的，Eclipse里写代码用的都是Eclipse自带的JRE。**
	- 而且MyEclipse是不用安装JDK的。
- 我把这句话放在最后，是因为我怕放开头的话，再看下边的絮絮叨叨会很懵，因为我现在也很懵。我没屡明白，难道我们下的JDk就是用来运行Eclipse以及提供查看源代码？没有别的用了哈。应该是的