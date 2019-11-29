
# **==简介==**

## MySQL百度百科
- MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，目前属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件。
    - 关于'关系型数据库'看MySQL笔记整合或下面
- MySQL是一种关系数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。
- MySQL所使用的 SQL 语言是用于访问数据库的最常用标准化语言。MySQL 软件采用了双授权政策，**分为社区版和商业版**，由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，一般中小型网站的开发都选择 MySQL 作为网站数据库。
- 由于其社区版的性能卓越，搭配 PHP 和 Apache 可组成良好的开发环境。


## MySQL -- 摘自MySQL笔记
#### 数据库简介
- 之前通过流操作文件的方式存储数据的弊端	(这些代码就相当于是自己写了个数据库)
1. 执行效率低
2. 进行增删改查操作，代码书写比较麻烦
3. 一般只能保存文本数据
#### 什么是DB
- DB：Database 数据库，数据库指一个文件集合
#### 什么是DBMS
- DBMS：Database Management System 数据库管理系统，用于管理数据库文件的软件，常见的DBMS：MySQL Oracle DB2 SQLServer SQLite
#### 数据库分类
1. 关系型数据库： 经过数学理论验证可以保存现实生活中的各种关系 ，以表为单位保存数据
2. 非关系型数据库：用于解决某些特定场景比如：高并发访问时的数据缓存，举例：Redis 以key-value形式保存数据		/Redis是一个非关系型数据库
#### 常见关系型数据库介绍
1. MySQL：  市场占有率第一， Oracle公司产品，08年被Sun收购，09年Sun被Oracle收购，  开源， 由于担心MySQL闭源，MySQL创始人们离开Oracle创建了MariaDB（创始人女儿叫Maria）   /所以MariaDB和MySQL其实是一样的，分支的时候源码都一样，以后更新不一样而已。
2. Oracle： 市场排名第二，Oracle公司产品，闭源产品， 拉里埃里森 32岁
3. SQLServer： 市场排名第三，微软产品，闭源产品
4. DB2：  IBM公司产品，闭源产品
5. Sqlite： 轻量级数据库 安装包几十k 应用在嵌入式设备或移动设备中
#### 开源和闭源
- 开源：开发源代码，盈利方式：靠卖服务， 技术大拿为了刷存在感对开源产品会无偿进行版本维护和升级
- 闭源：不开放源代码，盈利方式：靠卖产品和卖服务，技术大拿会攻击闭源产品刷存在感，但是闭源公司会花钱养一帮大拿维护升级


## SQL -- 摘自MySQL笔记
- Structured Query Language：结构化查询语言，SQL执行在客户端(windows的命令行，linux的终端，或三方的数据库客户端软件)或者通过Java代码使用JDBC执行
- 如何连接MySQL数据库
1. windows系统在开始菜单栏中->所有程序->MySQL或MariaDB->MySQL Client 然后输入密码
2. linux系统  在空白区域右键 终端，然后输入
    - mysql -uroot -p回车
    - exit;     退出
#### SQL语句规范
1. 以;结尾
2. 可以换行，关键字之间用空格分隔(可以有多个空格)
3. 关键字不区分大小写 


# **==下载安装==**
## 下载
- MySQL下载地址：mysql.com-->Downloads
		或oracle.com-->Database-->MySQL

#### 下载方式一：压缩包
- 下载MySQL压缩包，解压后配置端口、字符集、环境变量等等
	- 参考https://jingyan.baidu.com/article/95c9d20d087fe4ec4e756117.html
			https://blog.csdn.net/qq_37350706/article/details/81707862
			https://www.cnblogs.com/wfhking/p/9510059.html
- Downloads页面，Ecterprise(企业)是给企业用的，我们点Community(社区)-->MySQL Community Server
- **MySQL Community Server**是MySQL社区版的数据库服务器，即数据库软件，是我们平时用的那个；下拉选择下载第一个or第二个我也是不很明白。然后的页面是可以让我们登录或注册免费的Oracle Web账户，直接点下面的链接No thanks, just start my download.进入下载

#### 下载方式二：MSI
- **MSI**是microsoft installer的简写,是微软格式的安装包。一般**是程序的安装软件**。
	- 安装MSI完我发现，在C:\Program Files (x86)\MySQL和隐藏文件C:\programData\MySQL下有了这个安装程序的文件夹。。。这个安装程序被安装了
- Downloads页面，Ecterprise(企业)是给企业用的，我们点Community(社区)-->Windows on MySQL-->MySQL Installer：这是mysql软件的安装管理器，可以**通过MSI Installer来选择安装mysql数据库和相关辅助软件**。
    - 这个界面下拉下载上边有这么一句话Note: MySQL Installer is 32 bit, but will install both 32 bit and 64 bit binaries    即注意：MySQL Installer是32位，但可以安装32位和64位二进制文​​件。
- 体积小的那个(mysql-installer-web-community-8.0.14.0.msi)是在线安装程序，下载了它之后，它还需要联网下载你要安装的东西；体积大的那个(mysql-installer-community-8.0.14.0.msi)是离线安装程序，下载了它之后，MySQL相关的东西就都下载下来了， 安装的时候就只是安装出来。
	- **选体积大的就行**，因为主要占空间的就是MySQL Server
- 点击下载离线安装工具，然后的页面是可以让我们登录或注册免费的Oracle Web账户，直接点下面的链接 No thanks, just start my download. 进入下载


## MSI安装MySQL8.0/5.8
- **参考**https://blog.csdn.net/qq_42773146/article/details/82414057
- 进入安装界面-->同意协议-->可以选Server only。也可以选Custom自定义安装。选择Custom安装
- **安装路径**：在选择安装内容时，将要安装的模块右移后，有Install Directory安装目录可以选择更改。
	- 我当时不知道，所以没注意默认位置具体在，我的C/Program Fires/MySQL 以及 C/Program Fires(x86)/MySQL 都有MySQL的内容，其中C/Program Fires/MySQL中有Server和Workbench。32位的程序文件夹有Installer。
- 所有的东西：
    - **MySQL Servers**(必装)：MySQL Server服务器  这个必须装
    - **Applications**列表：
        - **MySQL Workbench**(安装)：这是MySQL官方的可视化工具，Workbench工作台。
		- Notifier：通知器。
		- MySQL Notifier（系统托盘）处驻留图标，用于快捷监视、更改服务器实例（服务）的状态。同时，也可以与一些图形化管理工具（如 MySQL Workbench）集成使用。
		- For Excel：用于Excel
		- for Visual Studio：用于VS
		- Utilities：实用程序。
		    - MySQL Utilities 是一组基于python语言编写的python库的命令行实用工具集,依赖于python 2.6。该工具提供了MySQL数据库运维工程中常用的一些工具，诸如克隆、复制、比较、差异、导出、导入、安装、配置、索引、磁盘查看等等。有了这个工具包，就好比那些个神医大夫，不管大病小病，先去搞个化验，搞个CT，你也可以当华佗。MySQL Utilities提供了各种平台的软件包，如果没有找到对应自己平台的包，可以通过源码进行编译安装。本文主要描述MySQL Utilities安装以及各个工作功能初步描述。 -- 原文：https://blog.csdn.net/leshami/article/details/52795777 
		- Shell：Shell。
            - 百度百科：在计算机科学中，Shell俗称壳（用来区别于核），是指“为使用者提供操作界面”的软件（命令解析器）。它类似于DOS下的command.com和后来的cmd.exe。它接收用户命令，然后调用相应的应用程序。
		- Router：路由器。
            - 百度百科：MySQL Router是一个轻量级的中间件，提供了应用程序与后端数据库的透明路由，是mysql用来实现负载均衡和高可用功能。同时router也提供了使用fabric 高可用的方式。
    - **MySQL Connectors(必装connector/J)**：是和其他编程语言连接的连接器（编译驱动器）
- Check Requirements检查要求 界面：若出现警告提示One or more product requirements have not been satisified....，代表机器没有VC的环境，使安装无法进行下去。遇到后查查VC和MySQL的联系。
	- 查看https://blog.csdn.net/qq_33144861/article/details/80267462
- Product Configuration 产品配置 页面：现在，我们将浏览以下每个产品的配置向导。如果您希望在不配置所有产品的情况下离开该向导，您可以在任何时候取消。


## 配置MySQL Servlet
- 配置完成后**可重新配置**。开始菜单找MySQL Installer，进入点击MySQL的**Reconfigure**就可以重新配置
- Group Replication页面：选择独立服务器或集群服务器。
- Type and Netwoking页面：
	- Config Type：配置类型：开发者计算机(这台计算机还要安装其他的程序，Mysql将占用很少的内存)、服务器计算机(这台计算机要运行多个Mysql，占用内存中等)、专用电脑(这台计算机只是用来运行Mysql)
	- TCP/IP 勾选。
	- Port：3306。默认端口号3306
	- Open Windows Firewall port for network access 默认勾选 (打开Windows防火墙端口网络访问，一定是选中的)。
- Authentication Method身份验证方式 页面：**不要选择新的验证方式，选Use Legacy Authentication Method...**
	- 看下面的'**## 关于MySQL8.0的新密码认证方式**'
- Axxounts and Roles账号和角色 页面：设置根(root)用户的密码并二次输入(Repeat Password)。会提示密码安全强度，个人用户用着方便就行，不用太复杂。以后工作时用户密码一定要设的很复杂-*(类似于qq密码一样)。
	- MySQL User Name：用户账户，不用设置，用root即可。
- Windows Service(Windows 服务) 页面：全部默认，Windows Service Name：是MySQL在Windows服务中的名字。
- Apply Configuration 页面：将MySQL的配置以及我们设置的配置进行配置。
- **安装配置成功。Windows服务中出现MySQL**
- 记录两个问题：看视频的时候记录的，但是在我安装的时候没注意是在哪个环节中。
	- Include Bin Directory Windows PATH，如果勾选就可以在Dos控制台(命令行)用数据库，不勾选也可以再配置。就是环境
	- 最后Execute检测，在重新安装的情况下，最后一项可能会出问题，是因为有残留文件，删掉重启重新安装。


## 关于MySQL8.0的新密码认证方式
- 开始菜单找MySQL Installer，进入点击MySQL的Reconfigure**可以重新配置**
- 查阅：**[针对MySQL8.0的新密码认证方式的解决办法](https://blog.csdn.net/qq_26819733/article/details/80794047)**，回改or全部跟进：
    - 即配置时的：Authentication Method身份验证方式 页面。Use Strong Password...(RECOMMECDED)
        - 这是新的密码加密方式的选择项，解释里的(chching_sha_password authentication)是新的加密方式，是sha256的一种改进。
    - 链接文章原话：没什么必要还是选择以前的加密方式把，8.0**刚出来，第三方客户端基本都不支持这种加密方式**，但自带的命令行支持，当然我推荐的是开发环境这样子，服务器端你自己考虑吧，开发环境老的加密方式不会有坑，选择Use Legacy Authentication Method，然后next，下一步 


## Mysql8.0/5.8的坑
- Java连接Mysql应该是很简单的事情，但是随着Mysql的不断升级，有些配置一定要注意，这里记录坑
#### data文件和my.ini
- https://blog.csdn.net/fanxiangru999/article/details/80736426
- Mysql的安装，使用msi安装包进行安装，安装完会发现，data文件夹以及my.ini文件均找不到了。。。
- 实际上，mysql升级后（不清楚从哪个版本开始的），data文件以及my.ini默认生成在c盘的programData文件夹下
- 即使已经指定安装路径在别的盘，但是这些文件仍然生成到了C:\programData文件夹下，如果你的C盘没有programData，说明它被隐藏了，调整设置显隐藏文件夹就好。


## 启动关闭服务&卸载
#### 关闭&启动数据库的操作
- 可以模拟数据库关闭，测试 异常的转发 error.jsp 我们没试，老师试的
- 右击计算机-->管理-->服务和应用程序-->服务：MySQL右击停止
- 同样的，右击启动。启动后要重启tomcat(容器)。
	- 这和我们DBUtils的实现有关系，连接数据库是在静态块里中完成的，只执行一次，要重启重新获取连接。


## 卸载MySQL
- **重新安装MySQL必须要先卸载干净**
- 右击计算机-->管理-->服务和应用程序-->服务：MySQL右击停止
- 卸载MySQL程序。**并且删除残留文件**。并最好360删除注册表。重启(有些数据会在重启后才删除)
		如果不删除残留文件，则会安装不成功。残留文件好像就在安装目录下。


# **==使用==**


## 在命令行运行MySQL
- 要配置环境变量，可以先配置个MYSQL_HOME，`C:\Program Files\MySQL\MySQL Server 8.0\bin 。然后放到path中，%MYSQL_HOME%`


## 命令行工具：`mysql command line client unicode`和`mysql command line client`的区别
- Unicode万国码
- 百度原文回答：Unicode是统一的字符编码标准，MySQL的Windows客户端自从5.6.2版本后提供了Unicode界面支持。而原来的MySQL Client是默认在dos下运行的，不够满足Windows下标准编码的需求。用起来也有感觉，在Unicode下运行速度比原来的在dos环境下运行要快得多，字体等也更符合编程要求（Unicode是用的16位储存和表示每个字符的，并能够表示大多数字符，具体的专业知识请直接在知乎搜索Unicode），所以我更喜欢用Unicode.
    - 所以我认为unicode结尾的那个就是此命令窗口的编码方式是万国码吧。


## 连接的注意事项：
- 命令行的：mysql在5.6.5上开始在命令行中直接填入用户密码会提示错误，如下：
	- `[Warning] Using a password on the command line interface can be insecure.ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)`
    - 解决：命令行写 mysql -u root -p  **不加分号**  回车后输入密码
		- 我真是智障了，笔记里就没加分号，怎么给忘了

## eclipse连接mysql报错：
#### 编码报错
 - 报错：`Exception in thread "main" java.sql.SQLException: Unknown initial character set index '255' received from server. Initial client character set can be forced via the 'characterEncoding' property.`
	- 从服务器接收的未知初始字符集索引“255”。可以通过“字符编码”属性强制初始客户端字符集
- 解决：在连接的url后加 ?useUnicode=true&characterEncoding=UTF-8  设置连接编码为UTF-8
#### 连接报错：
- 报错：`Exception in thread "main" com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException: Client does not support authentication protocol requested by server; consider upgrading MySQL client`
	- 客户端不支持服务器请求的认证协议;考虑升级MySQL客户端
- 解决：查看'**##关于MySQL8.0的新密码认证方式**'，8.0刚出来，第三方客户端基本都不支持这种加密方式，重新设置成老的用户验证方式
	- 开始菜单找MySQL Installer，进入点击MySQL的Reconfigure可以**重新配置**



## 自带/默认的四个数据库
- https://cloud.tencent.com/info/f801a9a1a4af7b6976c75630ec6cc719.html
- **information_schema**：NFORMATION_SCHEMA提供对数据库元数据的访问 ，有关MySQL服务器的信息，例如数据库或表的名称，列的数据类型或访问权限。
	- 关于里面各表的作用参考官方链接   https://dev.mysql.com/doc/refman/8.0/en/information-schema.html
- **mysql**：mysql的核心数据库，主要负责存储数据库的用户、权限设置、关键字等mysql自己需要使用的控制和管理信息.
- **performance_schema**：performance_schema 主要用于收集存放数据库的性能参数，它是使用 PERFORMANCE_SCHEMA存储引擎和performance_schema数据库实现的。性能模式主要关注性能数据。这与INFORMATION_SCHEMA用于检查元数据的不同。
	- 官方链接：https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html
- **sys**：MySQL 8.0包含 sys模式，这是一组帮助DBA和开发人员解释性能模式收集的数据的对象。sys模式对象可用于典型的调优和诊断用例。此架构中的对象包括：
	- 将Performance Schema数据汇总为更易于理解的形式的视图。
	- 执行诸如性能架构配置和生成诊断报告等操作的存储过程。
	- 存储函数，用于查询性能架构配置并提供格式化服务。
	- https://dev.mysql.com/doc/refman/8.0/en/sys-schema.html


## 使用图形化界面 MySQL Workbench
- Welcome to MySQL Wordbench：MySQL Workbench是MySQL的官方图形用户界面(GUI)工具。它允许您设计、创建和浏览数据库模式、处理数据库对象和插入数据，以及设计和运行SQL查询来处理存储的数据。您还可以将模式和数据从其他数据库供应商迁移到MySQL数据库。
- 进入界面MySQL Connections连接-->选择Local instance MySQL80 本地MySQL即可
	- MySQL80是安装配置的时候的WIndows服务中MySQL的名字，当然也代表了8.0版本


## MySQL Server x.x目录
> [MySQL目录结构以及配置文件详解](https://blog.csdn.net/yiguang_820/article/details/82146902) (有的找不到去C/programData找，看'## Mysql8.0/5.8的坑')

- 目录详解
	- bin目录：用于放置一些MySQL常用的命令工具以及管理工具：可执行文件，比如mysql.exe、mysqld.exe、mysqlshow.exe等。 
	- docs目录：MySQL的帮助文档
	data目录：用于放置数据库以及日志文件（刚安装没有data文件夹）。 
	- include目录：用于放置一些头文件，比如mysql.h、mysqld_ername.h等。 
	- lib目录：用于放置一系列的库文件。 
	- share目录：保存目录文件以及日志文件。用于存放字符集、语言等信息。 
	- my.ini目录：是MySQL数据库中使用的配置文件。 
	- my-huge.ini文件：适合超大型数据库的配置文件。 
	- my-largte.ini文件：适合大型数据库的配置文件。 
	- my-medium.ini文件：适合中型数据库的配置文件。 
	- my-small.ini文件：适合小型数据库的配置文件。 
	- my-template.ini文件：是配置文件的模板，MySQL配置向导将该配置文件中选择项写入到my.ini文件。 
	- my-innodb-heavy-4G.ini文件：表示该配置文件只对于InnoDB存储引擎有效，而且服务器的内存不能小于4GB。
- 注意：上述的7个配置文件，其中my.ini是MySQL正在使用的配置文件，该文件是一定会被读取的，其他的配置文件都是适合不同数据库的配置文件的模板，会在某些特殊情况下被读取，如果没有特殊需求，只需要配置my.ini文件即可。



## Windows服务
- 百度百科：Microsoft Windows 服务（即，以前的 NT 服务）使您能够创建在它们自己的 Windows 会话中可长时间运行的可执行应用程序。这些服务可以在计算机启动时自动启动，可以暂停和重新启动而且不显示任何用户界面。这种服务非常适合在服务器上使用，或任何时候，为了不影响在同一台计算机上工作的其他用户，需要长时间运行功能时使用。还可以在不同于登录用户的特定用户帐户或默认计算机帐户的安全上下文中运行服务。
#### 卸载Windows服务
- 命令行：sc delete 服务名
- 如果失败，应该是权限的问题，右击命令行，以管理员身份运行。然后执行相同命令。



















