# **==安装&配置==**
## 下载
- 下载地址：eclipse.org
- 关于a比b快的原因
    - 看`计算机知识.md`：'##CDN&镜像站点'
	- a. eclipse网站下载“在线安装工具”后在工具里安装自己需要的eclipse
	- b. 在网站里直接下载自己需要的eclipse
    - a比b快的原因是，网站里的链接只能链接一个（当然是主站服务器），而在线安装工具是一个程序可以检索最快CDN或者镜像服务器来下载


## 安装
- 安装适用于javaEE开发者的Eclipse：Eclipse IDE for Enterprise Java Developers
- 安装完成后，在安装目录里创建快捷方式并拖到桌面


## 完全删除Eclipse
- 除了删除安装目录以及工作空间，还要删除 C盘 用户目录 下的   `.eclipse   .p2   .tooling   .m2`
    - `.eclipse  .p2`是eclipse安装时自动生成的，`.tooling  .m2`是使用时生成的


## Eclipse工作空间目录
    - 参考http://www.mamicode.com/info-detail-1825500.html
- **.metadata**文件夹：中主要保存保存了eclipse的所有状态,包括常用设置,字体大小,颜色,界面布局等等，如果删除了，那么这些设置也就没有了，下次启动eclipse时会重新初始化
- **.recommenders**文件夹：通过查询，网上并没有相关的资料，个人见解：应该与Eclipse Code Recommenders 正式发布 - 智能代码建议工具有关，就是与eclipse编写代码时触发代码提示相关。
- **RemoteSystemsTempFiles**文件夹：这个东西是用来做远程文件本地缓存使用的，建议不要删除。
    - eclipse有一个“Remote System ExExplorer”的Perspective，里边有FTP、ssh、Linux、Unix、Windows、Telnet等各种远程终端功能，这些功能依赖于“RemoteSystemsTempFiles”。


# **==使用==**
## create project...
- .m2文件还没有的时候，建立maven的jar/war项目，会分别右下角显示create project...此时他在访问外网创建maven项目的目录结构
    - 第一次建项目会在本地仓库下一些文件




