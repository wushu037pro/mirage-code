
# **==简介说明==**

## 简介
- Maven是一个项目管理工具，用于管理项目的生命周期, 它包含了项目生命周期管理，软件包依赖管理。软件公司项目采用 Maven 的比例在持续增长。
- 看看`达内开发工具文档的maven配置`，有很多有用的东西
**m2是Maven2的意思，是Maven的第二个版本。现在虽然Maven3了，但很多命名还是继承m2的叫法**

## Maven到底是个啥玩意
> https://www.cnblogs.com/whgk/p/7112560.html

- Maven的核心功能就是解决包和包的依赖关系，通俗点讲，就是通过pom.xml文件的配置获取jar包，而不用手动去添加jar包。
- maven项目可以这样去想，就是在java项目和web项目的上面包裹了一层maven，本质上java项目还是java项目，web项目还是web项目，但是包裹了maven之后，就可以使用maven提供的一些功能了(通过pom.xml添加jar包)。

## 说明：
- 最新版的Eclipse已经内嵌了Mevne插件m2e, 不需要安装Maven插件, 如果不做任何配置,会自动连接使用maven中央库自然可以使用,但是中央库在国外, 受到中国防火墙等因素影响其访问速度很慢, 只有连接到国内镜像库才能提高Maven运行速度. 连接到国内镜像库按照如下配置.
#### 需要注意的是:
- '最新版'：只有最新版Eclipse不需要安装插件
- 'm2e插件'：只是内嵌了插件，我们不用再安装插件，但是**m2e是在eclipse中使用maven的插件**，Maven还是得下载的。m2e插件只是起到让Maven工具能用在Eclipse上而已
    - m2e：可能是maven to eclipse的意思，也可能就是maven2 Eclipse的意思，但是现在都Maven3了，我估计是maven to eclipse的意思，但是必应国际版搜索也没有'maven to eclipse'这句话的搜索结果
    - 百度一下'Maven插件安装'，就知道插件是干啥的了，并不是maven，而是maven和eclipse衔接的插件。
        - 比如这个 https://www.cnblogs.com/f-anything/p/5970151.html
    - 但是不安装maven，依然可以正常使用maven项目。。。(估计是使用IDE的默认配置吧)
#### 关于'受到中国防火墙等因素影响其访问速度很慢'
- 疑问：为啥是说慢，有墙不应该直接访问不到吗
- 答：这种网站应该不会被墙的，慢是因为距离远，经过的路由多。也可能墙也会限制它的网速，再加上远当然慢了。
- 网友：eclipse在第一次编译maven项目时，会下载很多maven的插件，如果什么都没做的话，就会从默认的官网仓库地址下载。为了加快访问速度，我们要把官网仓库地址替换为国内访问速度较快的镜像地址。





# **==安装&配置==**

## 下载
- 下载地址：apache.org --> 下方APACHE PROJECT LIST --> Maven --> 左侧Download     (注意事项：Maven 3.3 +需要JDK 1.7或以上才能执行)
	- 或直接进 maven.apache.org --> 左侧Download


## 官网下载四种文件的区别
```
- apache-maven-3.6.0-bin.tar.gz
- apache-maven-3.6.0-bin.zip
- apache-maven-3.6.0-src.tar.gz
- apache-maven-3.6.0-src.zip
```
- bin(binary)和src(source)：
    - binary是编译后的二进制文件，是可以直接使用的。
	- source是maven的源码，maven是开源的。
 - tar.gz和zip：
    - 以tar.gz为后缀的文件是一种压缩文件，在Linux和macOS下常见，Linux和macOS都可以直接解压使用这种压缩文件。
        - Tar（Linux系统命令）：Unix和类Unix系统上的压缩打包工具，可以将多个文件合并为一个文件，打包后的文件名亦为“tar”。tar文件格式已经成为POSIX标准，最初是POSIX.1-1988，当前是POSIX.1-2001。本程序最初的设计目的是将文件备份到磁带上（tape archive），因而得名tar。
        - gzip：gzip是GNUzip的缩写，它是一个GNU自由软件的文件压缩程序。gzip命令之gzip *：把当前目录下的每个文件压缩成 .gz 文件。

    - Zip（压缩文件格式）
        - ZIP，是一个文件的压缩的算法，原名Deflate（真空），发明者为菲利普·卡兹（Phil Katz)），他于1989年1月公布了该格式的资料。ZIP通常使用后缀名“.zip”，它的MIME格式为 application/zip 。目前，ZIP格式属于几种主流的压缩格式之一，其竞争者包括RAR格式以及开放源码的7-Zip格式。从性能上比较，RAR格式较ZIP格式压缩率较高，但是它的压缩时间远远高于Zip。而7-Zip(7z)由于提供了免费的压缩工具而逐渐在更多的领域得到应用。
- 所以windows电脑开发应当下载 apache-maven-3.6.0-bin.zip


## 仓库的概念
> 仓库详解：https://www.cnblogs.com/duanxz/p/5210189.html

- 通过pom.xml中的配置，就能够获取到想要的jar包，这些jar就是从仓库获取的。
- 仓库分为：本地仓库、远程仓库。远程仓库由分为：中央仓库、私服、其他公共库(第三方仓库，比如阿里云)
- 当你向仓库请求插件或依赖的时候，会先检查本地仓库里是否有。如果有则直接返回，否则会向远程仓库请求，并保存。
### maven仓库的配置方式
```
后三个没分清
```
- Maven可以允许在多个地方配置仓库的位置，比如pom文件、Maven配置文件等。当需要加载一个新的Jar包时，Maven会从配置文件中读取仓库位置，并按照优先级逐一从仓库中判断是否有指定的依赖文件，如果有，则加载，如果没有，则继续搜索。
    - 根据搜索和qq群说的，远程仓库一般都在pom.xml中配，我也不知道为什么不在settings.xml里配。
1. **中央仓库**：这是默认的仓库
2. **镜像仓库**：通过 sttings.xml 中的 settings.mirrors.mirror 配置
3. **全局profile仓库**：通过 settings.xml 中的 settings.repositories.repository 配置
4. **项目仓库**：通过 pom.xml 中的 project.repositories.repository 配置
5. **项目profile仓库**：通过 pom.xml 中的 `project.profiles.profile.repositories.repository` 配置
#### maven仓库的优先级/maven搜索jar包的顺序
1. 在本地仓库寻找，没有则进入下一步
2. 在全局应用的远程仓库中寻找，没有则进入下一步
    - maven settings profile中的repository
3. 在项目自身的远程仓库中寻找，没有则进入下一步
4. 在中央仓库中寻找，如果没有则终止寻找
- **如果在找寻的过程中，如果发现该仓库有镜像设置，则用镜像的地址代替，所以镜像的`<mirrorOf>`标签内填写的值必须是配置文件中存在的repository的id，如果乱写，则是没有用的镜像。** 而central是默认的中央仓库，*代表所有仓库，所以写这个两个是一定行的
    - 如果镜像的mirrorOf配置了*，则所有的其他远程仓库配置都会被镜像所拦截。

## 本地仓库Local Repository
- Maven会将工程中依赖的构件(Jar包)从远程下载到本机一个目录下管理。maven本地仓库的默认位置：无论是Windows还是Linux，在用户的目录下都有一个.m2/repository/的仓库目录，这就是Maven仓库的默认位置
- 更改maven默认的本地仓库的位置：配置settings.xml文件中的元素--<localRepository>
    - 一般我们会修改本地仓库位置，自己创建一个文件夹，在从网上下载一个拥有相对完整的所有jar包的结合，都丢到本地仓库中，然后每次写项目，直接从本地仓库里拿就行了。---没必要修改吧，直接把下载的jar包放在默认目录里就行了


## 远程仓库 Remote Repository
- 远程仓库是相对于本地仓库而言的。
- 远程仓库可以在工程的pom.xml文件里指定：在<repositories>元素下，可以使用  <repository>子元素声明一个或者多个远程仓库。
#### 中央仓库 central repository
- 中央仓库是默认的远程仓库。
- 中央仓库包含了绝大多数流行的开源Java构件，以及源码、作者信息、SCM、信息、许可证信息等。一般来说，简单的Java项目依赖的构件都可以在这里下载得到。
- Maven内置了远程公用仓库(maven中央库)：http://repo1.maven.org/maven2  这个公共仓库是由Maven自己维护，里面有大量的常用类库，并包含了世界上大部分流行的开源项目构件。目前是以java为主工程依赖的jar包如果本地仓库没有，默认从中央仓库下载
### 私服Internal Repository(英文可能是这个)
 - 私服是一种特殊的远程仓库，它是架设在局域网内的仓库服务，私服代理广域网上的远程仓库，供局域网内的Maven用户使用。当Maven需要下载构件的时候，它从私服请求，如果私服上不存在该构件，则从外部的远程仓库下载，缓存在私服上之后，再为Maven的下载请求提供服务。我们**还可以把一些无法从外部仓库下载到的构件上传到私服上。比如自己开发的jar包**
- 优点主要有：
	1. 节省外网宽带：减少重复请求造成的外网带宽消耗
	2. 加速Maven构建：如果项目配置了很多外部远程仓库的时候，构建速度就会大大降低
	3. 部署第三方构件：有些构件无法从外部仓库获得的时候，我们可以把这些构件部署到内部仓库(私服)中，供内部maven项目使用
	4. 提高稳定性、增强控制：Internet不稳定的时候，maven构建也会变的不稳定，一些私服软件还提供了其他的功能
	5. 降低中央仓库的负荷：maven中央仓库被请求的数量是巨大的，配置私服也可以大大降低中央仓库的压力
- 一般是由公司自己设立的，只为本公司内部共享使用。它既可以作为公司内部构件协作和存档，也可作为公用类库镜像缓存，减少在外部访问和下载的频率。
- 一般公司都会创建这种第三方仓库，保证项目开发时，项目所需用的jar都从该仓库中拿，每个人的版本就都一样。
- 注意：连接私服，需要单独配置。如果没有配置私服，默认不使用
#### 其他公共库(第三方仓库)
- 其他可以互联网公共访问的maven repository。我认为就是各种镜像吧，比如阿里云、jboss repository等等


## settings.xml 和 pom.xml
- 这两者中，默认存在的标签都很少，比如settings.xml中几乎都是注释，标签目测不到十个。每次建maven项目pom.xml中只有xml声明。
- 全部的标签信息在网上有，用到的时候需要在其中添加需要的标签。
- settings.xml是全局的，用来定义一些相对而言范围宽泛一点的配置信息，比如远程仓库等。
- pom.xm是在项目的，用来定义一些比较细致一点的需要根据项目的不同来定义的配置信息。


## settings.xml配置
- setting.xml配置文件全部标签解释：
    - CSDN 原文：https://blog.csdn.net/u012152619/article/details/51485152
    - 博客园：https://www.cnblogs.com/jingmoxukong/p/6050172.html
    - 实际应用中，经常使用的是<localRepository>、<servers>、<mirrors>、<profiles>有限几个节点，其他节点使用默认值足够应对大部分的应用场景。
- maven的配置文件settings.xml存在于两个地方：
	1. 安装的地方：${M2_HOME}/conf/settings.xml   **全局配置**  整台机器上的所有用户都受该配置的影响。
	2. 用户的目录：${user.home}/.m2/settings.xml     **用户配置**  只有当前用户才受该配置影响。
    - 前者又被叫做全局配置，对操作系统的所有使用者生效；后者被称为用户配置，只对当前操作系统的使用者生效。如果两者都存在，它们的内容将被合并，并且用户范围的settings.xml会覆盖全局的settings.xml。
- Maven安装后，**用户目录下不会自动生成settings.xml**，只有全局配置文件。如果需要创建用户范围的settings.xml，可以将安装路径下的settings复制到目录${user.home}/.m2/。Maven默认的settings.xml是一个包含了注释和例子的模板，可以快速的修改它来达到你的要求。
- 全局配置一旦更改，所有的用户都会受到影响，而且**如果maven进行升级，所有的全局配置都会被清除**，所以要**提前复制和备份**${M2_HOME}/conf/settings.xml文件，一般情况下不推荐配置全局的settings.xml。
- **需要统一系统中所有用户的配置的时候使用全局配置，否则请使用用户配置。推荐使用用户配置的原因是便于Maven升级，不必要每次升级都重新配置settings.xml文件。**
#### `<mirror>`标签镜像配置
```
其实没必要配置镜像，中央库的都有，配镜像也不过是为了快那几秒，但是jar包有可能一辈子也就下一次。
```
- <mirrors>允许配置多个镜像<mirror>。配置mirror的目的一般是出于网速考虑。
- **mirror相当于一个代理**，它会拦截去指定的远程repository下载构件的请求，然后从自己这里找出构件回送给客户端。 即maven在找寻要使用的仓库的过程中，如果发现该仓库有镜像设置，则用镜像的地址代替，**所以镜像的<mirrorOf>标签内填写的值必须是配置文件中存在的repository的id才有意义，否则则是没有用的镜像。**  而central是默认的中央仓库，*代表所有仓库，所以写这个两个是一定行的。
- **mirror标签配置** ：
    ```xml
    <!--使用阿里云-->
    	<mirror>
    		<!-- mirrorId：该镜像的唯一标识符。id用来区分不同的mirror元素。  -->
    		<id>aliyun</id>
    
    		<!-- Human Readable Name for this Mirror.：镜像名称  -->
    		<name>aliyun Maven</name> 
    
    		<!-- http://my.repository.com/repo/path：该镜像的URL。构建系统会优先考虑使用该URL，而非使用默认的服务器URL。  -->
    		<url>http://maven.tedu.cn/nexus/content/groups/public/</url>
    
    		<!-- repositoryId：被镜像的服务器的id(要替换的仓库的id，此镜像指向的服务id)。例如，如果我们要设置了一个Maven中央仓库（http://repo1.maven.org/maven2）的镜像，就需要将该元素设置成central。这必须和中央仓库的id central完全一致。 -->
    		<mirrorOf>central</mirrorOf>  
    	</mirror>
    ```
    - 【附，了解】默认的maven中央库配置：
        ```
        <repositories>        
        	<repository>        
        		<id> central</id>        
        		<name> Maven Repository Switchboard</name>        
        		<layout> default</layout>        
        		<url> http://repo1.maven.org/maven2</url>        
        		<snapshots>        
        			<enabled> false</enabled>        
        		</snapshots>        
        	</repository>        
        </repositories>
        ```
- **`<mirrorOf>`的属性值问题**：
    - 填写：被镜像的服务器的id(要替换的仓库的id)
    1. **`<mirrorOf>central</mirrorOf>`**，表示该配置为中央仓库的镜像，任何对于中央仓库的请求都会转至该镜像，用户也可以使用同样的方法配置其他仓库的镜像
        - 其他解释：表示该配置是所有Maven仓库的镜像，任何对于远程仓库的请求都会被转至此处的url。如果该镜像仓库需要认证，则配置一个id为nexus的认证信息即可。   需要注意的是，由于镜像仓库完全屏蔽了被镜像仓库，当镜像仓库不稳定或者停止服务的时候，Maven仍将无法访问被镜像仓库，因而将无法下载构件。
    2. **`<mirrorOf>*</mirrorOf>`**，就会**替代所有仓库(repository)**。所有远程仓库的请求都会被转至此处的url。
    3. **`<mirrorOf>external:*</mirrorOf>`** 匹配所有远程仓库，使用localhost的除外，使用file://协议的除外。也就是说，匹配所有不在本机上的远程仓库。
    4. **`<mirrorOf>repo1,repo2</mirrorOf>`** 匹配仓库repo1和repo2，使用逗号分隔多个远程仓库。
    5. **`<mirrorOf>*,!repo1</miiroOf>`** 匹配所有远程仓库，repo1除外，使用感叹号将仓库从匹配中排除。 
    6. 官网对mirrorOf的配置解释：
        ```
        * = everything
        external:* = everything not on the localhost and not file based.
        repo,repo1 = repo or repo1
        *,!repo1 = everything except repo1
        ```


## pom.xml文件/配置
- 详解&所有标签详解：https://www.cnblogs.com/wkrbky/p/6353285.html
- POM是项目对象模型(Project Object Model)的简称，它是Maven项目中的文件，使用XML表示，名称叫做pom.xml。作用类似ant的build.xml文件，功能更强大。该文件用于管理：源代码、配置文件、开发者的信息和角色、问题追踪系统、组织信息、项目授权、项目的url、项目的依赖关系等等。事实上，在Maven世界中，project可以什么都没有，甚至没有代码，但是必须包含pom.xml文件。


## 其他Maven镜像
- https://blog.csdn.net/lovoo/article/details/77881467
- maven官方运维的2号仓库
    ```xml
    <mirror>
      <id>repo2</id>
      <mirrorOf>central</mirrorOf>
      <name>repo2</name>
      <url>http://repo2.maven.org/maven2/</url>
    </mirror>
    ```
    

## maven的环境变量
- 偶尔在网上能看见说配置maven的环境变量的。但是我们在eclipse等IDE中使用maven不用配置maven的环境变量，在eclipse里配置好maven 即可，用的时候IDE自然能找到他。
- 在命令行运行maven是需要配置环境变量的。


## 小项
1. 下载界面有一个验证签名的功能，verify the signature ，我没大明白是干什么的，也不大好百度，以后再说。

2. Maven也有个环境变量配置，暂时没搞懂，东西太多了，回头可以看看！！！？？？

3. **建war工程包请切换到JavaEE视图！！**
		普通java视图不显示小地球等等


# **==使用==**

## 使用import-->Ecisting Maven Projects的问题
- 不支持同时copy到工作空间。如果需要可以先手动copy到工作空间然后从工作空间导入
- 传奇老师带我们写的WebServer复制了15个版本，但是我只能导入一个，而且不管导入哪个导入后都是叫WebServer_v1
    - 可能是因为Group Id、或者像是web(war包)项目的应用名，都一样的原因。	待解决！！！？？？


## 关于灰色的test--待解决！！！？？？
- 选中src/test/java右键BuildPath=>Configure BuildPath  选择Source   双击Contains test source:yes将其变成Contains test source:no就行了
Contains test source:no为是否包含源码目录。
- 可是我依然改不成yes或者no。。。济南群：按 alt-f5 刷新工程配置就好了，别从这里面改。王哥：yes no是系统自动创建的，改不了



## maven相关注意小项
1. 文档服务中提到：由于版权的问题, 无法在公共Maven服务器上下载Oracle JDBC Driver














