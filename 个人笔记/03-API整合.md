day01-02
#String类：
.charAt()-----------返回当前字符串中给定位置对应的字符
.indexOf()----------返回给定字符串在当前字符串中的位置
.length()-----------返回当前字符串的长度
.matches()----------使用给定的正则表达式验证当前字符串内容是否符合格式要求--------string支持正则表达式方法1
.replaceAll()-------将当前字符串满足正则表达式的部分替换为给定内容，如和谐用语--字符串支持正则表达式方法3
.split()------------将当前字符串按照满足正则表达式要求的部分进行拆分-----------------java支持正则表达式方法2
.startsWith()-------判断当前的字符串是否是以给定字符串开始的
.endsWith()---------判断当前的字符串是否是以给定字符串结尾的
.stringBuilder()----修改字符串---常用方法：增，删，改，插
.stringBuffer()-----stringBuilder的元老级，线程安全，同上
.substring()--------截取当前字符串中指定范围内的字符串
.toUpperCase()------将当前字符串中的英文部分转化成为全大写
.toLowerCase()------将当前字符串中的英文部分转化成为全小写
.tirm()-------------去除当前字符串两边的空白字符
.valueOf()----------将给定内容转换为字符串
补充：toCharArray()--将此字符串转换为一个新的char数组。
		猜字符游戏用到
补充：getBytes()-----使用平台的默认字符集将此 String 编码为 byte 序列，并将结果存储到一个新的 byte 数组中
		成恒示例摘要算法：store工程test/DigestTestCase
补充：format()---左侧补0用，或者其他用法待研究
		金黄河开发练习，查询：https://blog.csdn.net/qq_37552993/article/details/76461664
补充：
public int indexof（String str）返回字符串中出现str的第一个位置

public int indexof(String str,int fromIndex)返回字符串中从fromIndex开始出现str的第一个位置

public String substring(int beginIndex)返回从beginIndex开始的字符串

public Integer lastIndexOf(String str)返回从str最后一次出现的位置

#Object类：
.toString()---------返回字符串，可以通过这个字符串直观反映当前对象内容。
.equals()-----------用来定义当前类实例内容的比较规则

？？？？？？？？？？？？？？？？？？没整理好
#Integer类：
Integer.parseInt----|
Integer.parseDouble-——将字符串解析为对应的基本类型数据（前提是该字符串正确描述了对应基本类型所能保存的值）
Integer.parseXXX----|

day03-
File类:
.length()----------获取该文件长度
.getName()---------获取该文件名字
.canRead()---------判断该文件是否可读
.canWrite()--------判断该文件是否可写
.createNewFile()----使用File创建一个新文件,exists()----------??????
.delete()-----------删除一个文件或目录，分别有Demo
.listFiles()--------



RAF：RandomAccessFile类



TestCase.java：Arrays.toString(Object[] a)返回指定数组内容的字符串形式


socket也有close方法














##异常
 - 成恒：SpringBoot：sample工程：
	UserServiceImpl：
		throw new  RuntimeException("xxx")
			文档：RuntimeException(String message)：用指定的详细消息构造一个新的运行时异常
	UserServiceTestCase: 
		getMessage()
			文档：返回此 throwable 的详细消息字符串。




