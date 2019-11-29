</p><style>span {background-image: -webkit-gradient}</style><p>
#SSR(ShdowSocketR)使用教程

----------

##一、解压安装
 - 解压`ShadowsocksR-win-4.9.2.zip`
![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/ssr-解压后.jpg)
 - 启动ssr4.0.exe  <font color="green">（xp系统启动ssr2.0.exe）</font>
 - **如果电脑不能运行ssr，按照提示安装.net framework 因为这是c++/c#开发的**
	<font color="green">.net framework 微软安装地址：</font>[https://www.microsoft.com/zh-cn/download/details.aspx?id=17718](https://www.microsoft.com/zh-cn/download/details.aspx?id=17718)

##二、基本设置
###第一步：编辑服务器
- 双击右下角'小飞机'图标，进入编辑服务器页面。*标记的为必填，其他的不用管。<font color="green">配置内容另发，这里只介绍配置步骤</font>
	![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/ssr-编辑服务器界面.jpg)
- 填写好之后确定即可
###第二步：上网模式选择
- 右击右下角'小飞机'图标![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/ssr-配置1.jpg)
- 直连模式：所有网站请求都不走代理，即不开启翻墙功能
- <font color="red">**PAC模式：**</font>在PAC模式是只有被墙了的网站才会走代理（连接网站的时候读取PAC文件里的规则，来确定你访问的网站有没有被墙，如果符合，那就会使用代理服务器连接网站）。
- 全局模式：在全局模式下，所有的网站都默认走代理
- **建议翻墙上网时选择PAC模式，不翻墙时不启动软件或选择直连模式，可大大减少服务器被封的概率**
###第三步：PAC文件下载
- 打开ssr解压目录，pac.txt文件默认是不存在的
	![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/ssr-PAC文件.jpg)
- 如图点击：**更改PAC为绕过局域网IP** & **更改PAC为绕过大陆常见域名列表**，pac.txt文件出现（如果pac.txt没有更新出来，则'系统代理模式'先选择为PAC模式或全局模式）
	![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/ssr-PAC配置1.jpg)
###第四步：代理规则设置
- 如图点击：**绕过局域网和大陆**
	![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/ssr-PAC配置2.jpg)
###第五步：下载谷歌浏览器或者火狐浏览器
- **因为国内对翻墙管控越来越严格，为了提高代理服务器的稳定性，避免被封，请务必不要使用国内浏览器翻墙！！！谢谢配合！**
- 谷歌浏览器官方下载地址：[https://www.google.cn/intl/zh-CN/chrome/](https://www.google.cn/intl/zh-CN/chrome/)
- 火狐浏览器官方下载地址：[http://www.firefox.com.cn](http://www.firefox.com.cn)
- 访问你想访问的网站，比如google、youtube，可以看到已经能够正常访问
	![](https://wushu037pro.oss-cn-beijing.aliyuncs.com/markdown图床/ssr-成功翻墙-google-youtube.png)


##三、解释：
- **pac：**只有**系统代理模式选择PAC模式**，ssr才会根据**代理规则(绕过局域网和大陆)** 读取 **pac.txt文件**进行上网，**三者缺一不可**。
	- 代理规则和pac的更新内容（pac.txt内容）是对应的。
		- 如果代理规则选择了绕过局域网和大陆，而pac只更新了局域网ip，没有更新大陆常见域名，则访问大陆网站时依然会通过代理访问。
		- 如果代理规则选择了绕过局域网和大陆，而pac更新了全部内容，则访问时局域网和大陆的常见网站不会走代理
	- 使用pac的目的：
		- 为代理服务器节流。如果国内的网站都走代理服务器，服务器压力大。
		- 保证你的上网速度。如果国内网站也走代理，会降低你的访问速度。
- **不用国内浏览器翻墙：**翻墙并不违法，但是是受管控的。国内厂商会将收集到的可疑信息泄露给相关部门，造成服务器被封。
- **类似'谷歌浏览器和360浏览器可以同时开吗？'的问题**：pac模式或直连模式下可以：
	- pac模式下：pac设置好之后，国外网站走代理，国内网站不走代理。只要保证不用360等国产浏览器打开国外网站，代理服务器就不会被检测到，也就没有被封的风险。
	- 直连模式：直连模式，所有网站都不走代理，代理服务器不会被检测到。
- **服务器被封了对'我'有影响吗？**：如果是你们使用不当，导致代理服务器被检测到是翻墙用的，从而被封。对你没影响，我顶多也是花几分钟重新搭个服务器，但是如果老这样好烦啊。你只要不做违法的事就不用担心翻墙会怎么样怎么样。我这么说只是为了让你放心翻墙，并不是让你不注意翻墙的'姿势'。
- 使用全局模式、使用国内浏览器，一样可以翻墙，但是对服务器会造成压力和被封的风险。
##四、必读忠告
- **科学上网（翻墙）的四种类型**
	- 只进行浏览文章视频，很少观看政治内容；&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;--- <font color="green">无威胁</font>
	- 浏览墙外内容，关心政治新闻，但不发表评论；
	- 浏览墙外内容，在政治内容下偶尔发表评论，但不会传播到墙内；
	- 浏览墙外内容，在政治内容下经常发表言论，并向墙内传递。&emsp;<font color="red">--- 存在被叫去喝茶的风险。</font>
- **避免被喝茶和服务器被封的一些建议：**
	- **不涉及和政治、违法相关的事件。**
	- **使用国外浏览器翻墙，如谷歌浏览器(Chrome)、火狐浏览器(Firefox)**
	- 使用国外输入法，如win10默认的输入法。避免国内输入法泄露输入隐私。（如果感觉很麻烦，这条可以当做没看到，心里有这个概念即可）
- **为了营造科学开放的网络环境，希望同学们严格遵守社会主义职业道德规范。在上网过程中时刻保持复杂信息的判断能力，严格履行中国公民应尽义务，<font color="red">积极传播富强，民主，文明，和谐，自由，平等，公正，法治，爱国，敬业，诚信，友善的社会主义核心价值观 。</font>**




