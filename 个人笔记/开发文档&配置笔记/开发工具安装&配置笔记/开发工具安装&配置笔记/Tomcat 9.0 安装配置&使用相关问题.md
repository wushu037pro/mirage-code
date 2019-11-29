
# **==安装&配置==**

## 简介
- Tomcat服务器是一个免费的开源的web应用服务器。

## 下载安装Tomcat&源码
- www.apache.org 阿帕奇官网-->下方APACHE PROJECT LIST-->Tomcat	-->Download    **我下的Tomcat9**
    - 或直接进tomcat.apache.org
- Tomcat的版本和jdk版本有关，可以百度Tomcat各版本介绍。
	- 也可以在tomcat.apache.org-->Download-->Which version? 看官方的解释。
- Tomcat是java写的 不用安装，解压即可。因为java的程序只依赖jdk，不依赖OS。配置java变量他运行的时候就能找到java虚拟机。
- 安装后与eclipse集成，可以利用eclipse管理，启动以及关闭Tomcat，向tomcat中拷贝东西。


## 将Tomcat和exlipse集成的操作
- 摘自我的笔记
- Window-->preferences首选项-->Server服务器-->Runtime Environm运行环境-->Add添加一个Server的配置-->Apache：
    - 选哪一个要看安装的Tomcat版本，而可集成的Tomcat版本又和eclipse的版本有关系。老师的eclipse版本有点低，只能支持到8，如果用8以上的会有问题。最后他用了tomcat7，我们用8.5
- -->选中 Create a new local server 创建一个新的本地的server，便于我们用eclipse管理Tomcat
- -->next： Name无所谓，名字而以-->Browse 找到Tomcat安装的目录 
    - JRE:是java的运行环境，因为Tomcat是java写的，离不开java运行环境，JRE可以用他自带的,也可以自己再组建一个。不动也没关系，课上没动，显示的是Workbench default JRE
- -->Finish-->OK 
    - 项目多了一个文件夹-Servers：展开有Tomcat xxx 再展开有一堆配置文件，这是Tomcat运行的一些配置，暂时不管，以后要改。
- Window-->Show View-->Servers: 控制台出现Servers，双击显示的Tomcat xxx-->Overview概述(Tomcat的一些配置)：
    - Server Locations 服务器位置，默认用的Use workspace metadata 改成 Use Tomcat installation
        - Use workspace metadata：用的是系统自带的Tomcat
            - eclipse有自带的tomcat，估计是版本很低的tomcat
		- Use Tomcat installation：用的是我们安装的Tomcat
			- Deploy path：部署文件的位置，不用改，可以改，搜索'Deploy path'看后边提到的。
			- 我试了当生成部署文件后，Server Locations 下的设置就不能改了，老师说需要删了重配(这是eclipse一个不友好的地方，但是这个一般设置好了也不需要改。)。
    - Publishing发布  默认Automatically publish...自动发布 改成Never publish autopmatically
		- 自动发布是当源代码一发生改变自动帮你部署，我们手动部署，因为自动部署一些细节一概而过我们看不到，我们手动部署，便于说明细节
    - 然后保存
- 验证：启动Tomcat。Window-->Show View-->Servers:控制台出现Servers 右击Start：Console终端有输出：红色的是Tomcat启动时的日志，报告启动情况。最下面 Server startup in xxx ms 启动毫秒 基本就没问题了。可看到默认监听的端口号是8080，可以打开浏览器请求 http://localhost:8080   正常情况下看到一只猫。。。


# **==使用==**


## 创建Maven-Web工程的操作
- 建立maven项目，Packaging打包的方式必须为war   Version:SNAPSHOT快照 开发一般用这个
- 建完工程后，工程包报错：因为按照我们的规范，Servlet规范有一个部署描述文件，但是这个没有，展开可以看见src-main-webapp：下面缺web.xml部署描述文件
	- 视图一定要用Project Explorer项目视图 不能用Packages视图。`一直用的就是Project Exporer啊，之前没听说过Pachages视图。改的话是在Window-->Show View-->Project Explorer`
- 右击工程下的Deployment Descriptor 部署描述:xxx -> 瓶子 Generate Deployment Descriptor Stub 生成部署描述文件web.xml 也创建了目录    (默认没有描述文件所以要加进来)
- 右击工程Properties-->Targeted Runtimes 目标运行环境-->选中Tomcat
	- 目的：指定运行环境，开发的时候会用到Tomcat带的Servlet的API
	- 百度：普通的java项目，运行在java runtime(java运行环境)上


## 错误：不存在javax.servlet包
- 直接原因：web工程需要的相关的包不存在。我用的是SE版本的JDK。Servlet和JSP不是java平台j2se（标准版）的一部分，而是j2EE的一部分，因此必须告知编译器Servlet的位置。
- 解决方法一：指定工程运行环境，web工程需要用到的大部分东西(servlet和jsp)都在Tomcat中，
- 解决方法二：项目列表中右键单击项目， 选择 properties , 弹出窗口中 选择 java build path ----->add library----->server runtime--->apache tomcat7.0,这样就能找到jar包了
- 解决方法三：这种方法网上很多都说不行：从tomcat/lib目录下拷贝servlet-api.jar到“JDK\jre\lib\ext”目录下，重新编译就可以了。
	- 我试了也不行，我认为的原因是：eclipse并没有使用我们指定的JDK中的JRE，他使用的是自带的JRE。详情看Java安装配置笔记的最后一条分析'##经过我的观察'
- 解决方法四：我认为下个EE版的jdk应该也可以解决这个问题


## 查看Servlet相关源码
- 源码也是在下载Tomcat的时候那个界面下的，导入到Eclipse即可

- 看到这么一句话，记录下来备用：
> 原文：https://blog.csdn.net/u013823429/article/details/66982245 

- servlet-api 和 javax.servlet-api的区别
	- 在正式查看Servlet源码前，我们首先要分清楚上述两个jar包的区别。这两个构件都是 Servlet-Specificatoin Jar （Servlet 规范包），只不过因为版本升级: 
	    - 3.1之前的 Servlet API 构件叫做 servlet-api-xxx.jar 
	    - 3.1及之后的Servlet API 构件改名为 javax.servlet-api-xxx.jar
	- 也就是说两者的区别其实就是版本上的区别，在下载源码包时注意对应的版本。








