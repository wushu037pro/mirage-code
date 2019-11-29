
#-------------------------------------MySQL.day01---------------------------------------


#MySQL
###数据库简介
- 之前通过流操作文件的方式存储数据的弊端	/这些代码就相当于是自己写了个数据库
1. 执行效率低
2. 进行增删改查操作，代码书写比较麻烦
3. 一般只能保存文本数据
####什么是DB
- DB：Database 数据库，数据库指一个文件集合
####什么是DBMS
- DBMS：Database Management System 数据库管理系统，用于管理数据库文件的软件，常见的DBMS：MySQL Oracle DB2 SQLServer SQLite
####数据库分类
1. 关系型数据库： 经过数学理论验证可以保存现实生活中的各种关系 ，以表为单位保存数据
2. 非关系型数据库：用于解决某些特定场景比如：高并发访问时的数据缓存，举例：Redis 以key-value形式保存数据		/Redis是一个非关系型数据库
####常见关系型数据库介绍
1. MySQL：  市场占有率第一， Oracle公司产品，08年被Sun收购，09年Sun被Oracle收购，  开源， 由于担心MySQL闭源，MySQL创始人们离开Oracle创建了MariaDB（创始人女儿叫Maria）   /所以MariaDB和MySQL其实是一样的，分支的时候源码都一样，以后更新不一样而已。
2. Oracle： 市场排名第二，Oracle公司产品，闭源产品， 拉里埃里森 32岁
3. SQLServer： 市场排名第三，微软产品，闭源产品
4. DB2：  IBM公司产品，闭源产品
5. Sqlite： 轻量级数据库 安装包几十k 应用在嵌入式设备或移动设备中
####开源和闭源
- 开源：开发源代码，盈利方式：靠卖服务， 技术大拿为了刷存在感对开源产品会无偿进行版本维护和升级
- 闭源：不开放源代码，盈利方式：靠卖产品和卖服务，技术大拿会攻击闭源产品刷存在感，但是闭源公司会花钱养一帮大拿维护升级
###SQL
- Structured Query Language：结构化查询语言，SQL执行在客户端(windows的命令行，linux的终端，或三方的数据库客户端软件)或者通过Java代码使用JDBC执行
- 如何连接MySQL数据库
1. windows系统在开始菜单栏中->所有程序->MySQL或MariaDB->MySQL Client 然后输入密码
		配置环境变量也可以再普通命令行 mysql -uroot -p回车，注意不要加分号
2. linux系统  在空白区域右键 终端，然后输入
mysql -uroot -p回车，注意不要加分号

 exit;     退出
###SQL语句规范
1. 以;结尾
2. 可以换行，关键字之间用空格分隔(可以有多个空格)
3. 关键字不区分大小写 
###数据库相关SQL
1. 查看所有数据库
	show databases;
2. 创建数据库
	-格式：create database 数据库名;
	create database db1;
	-指定字符集格式：create database 数据库名 character set utf8/gbk;
	create database db2 character set gbk;
	create database db3 character set utf8;
3. 查看数据库详情 可以查看数据库的字符集
	-格式：show create database 数据库名;
	show create database db1;
4. 删除数据库
	-格式：drop database 数据库名;
	drop database db2;
5. 使用数据库
	-格式：use 数据库名;
	use db1;
###表相关SQL 
1. 创建表
	-格式： create table 表名(字段1名 字段1类型,字段2名 字段2类型);
	create table person(name varchar(10),age int);
	创建学生表(student) 姓名name 年龄age 语文chinese 数学math 英语english
	create table student(name varchar(10),age int,chinese int,math int,english int);
2. 查看所有表
	-格式： show tables;
3. 查看表详情
	-格式： show create table 表名;
	show create table person;
	-数据库表引擎：
		1. innodb：支持数据库的高级操作，比如：事务、外键等
		2. myisam：不支持数据库高级操作，只支持基础的增删改查操作
4. 创建表指定引擎和字符集
	-格式： create table 表名(字段1名 字段1类型)engine=innodb/myisam ?default charset=utf8/gbk;
															`   ? 表示'default'可写可不写
	create table t1(name varchar(10),age int)engine=myisam charset=gbk;
	show create table t1;
5. 查看表字段
	-格式： desc 表名;   `=describe 表名;  也叫查看表结构，查看表描述。describe描述
	desc student;
6. 删除表
	-格式：drop table 表名;
	drop table person;
	show tables;//测试
####课堂练习：
1. 创建数据库mydb1 并使用
	create database mydb1;
	use mydb1;
2. 在mydb1里面创建表 t1 和 t2  表里面有两个字段分别是name和age，其中t2的引擎为myisam  t1的字符集为gbk; 通过查看详情检测是否创建成功
	create table t1(name varchar(10),age int) charset=gbk;
	create table t2(name varchar(10),age int) engine=myisam;
3. 删除表t1，t2
	drop table t1;
	drop table t2;
4. 删除数据库mydb1
	drop database mydb1;
####对已创建的表进行修改
	create table t1(name varchar(10));
1. 修改表名
	-格式： rename table 原名 to 新名;
	rename table t1 to t2;
2. 修改表引擎和字符集
	-格式: alter table 表名 engine=myisam/innodb charset=utf8/gbk;
	alter table t2 engine=myisam charset=gbk;
	show create table t2;//测试
3. 添加表字段
	-最后面格式： alter table 表名 add 字段名 字段类型;
	alter table t2 add age int;
	desc t2;//测试
	`成恒补充：add后可以加单词 column 是列的意思，添加一列。添加表字段默认就是添加列，所以可以不写。
	-最前面格式： alter table 表名 add 字段名 字段类型 first;
	alter table t2 add id int first;
	-在某个字段后面添加：alter table 表名 add 字段名 类型 after xxx;
	alter table t2 add sal int after name;
4. 删除表字段
	-格式： alter table 表名 drop 字段名;
	alter table t2 drop sal;
	desc t2;//测试
5. 修改表字段名和类型
	-格式： alter table 表名 change 原字段名 新字段名 新类型;
	alter table t2 change name username varchar(5);
6. 修改表字段类型和位置
	-格式: alter table 表名 modify 字段名 新类型 first/ after xxx;
	alter table t2 modify age int after id;

####练习：
1. 创建一个hero表 有 id name type三个字段，引擎为myisam 字符集为gbk
	create table hero(id int,name varchar(10),type varchar(10)) engine=myisam charset=gbk;
2. 修改表名为heros
	rename table hero to heros;
3. 修改表引擎为innodb  修改字符集为utf8
	alter table heros engine=innodb charset=utf8;
4. 修改type字段为 hero_type varchar(30)
	alter table heros change type hero_type varchar(30);
5. 添加money字段在name字段的后面
	alter table heros add money int after name;
6. 修改name字段到最后
	alter table heros modify name varchar(10) after hero_type;
7. 删除hero_type字段
	alter table heros drop hero_type;
8. 删除heros表
	drop table heros;
###数据相关SQL(增删改查)
	create database mydb1 character set utf8;
	use mydb1;
	create table hero(name varchar(10),age int);
1. 插入数据--**增**
	-全表插入格式：insert into 表名 values(值1,值2);
		insert into hero values('Tom',18);
		insert into hero values('刘备',20);//如果代码没问题却执行报错，先执行以下 set names gbk;
	-指定字段插入格式：insert into 表名 (字段1名,字段2名) values (值1,值2);
		insert into hero (name) values('李白');
	-批量插入格式：在以上两种格式后面写多组数据通过逗号分隔
		insert into hero values('关羽',19),('张飞',7);
		insert into hero (name) values('悟空'),('八戒'),('沙僧');
2. 查询数据--**查**
	-格式： select 字段信息 from 表名 where 条件;
	1. 查询所有数据 所有字段信息
	select * from hero;
	2. 查询所有的名字;
	select name from hero;
	3. 查询年龄19岁的所有信息
	select * from hero where age=19;
	4. 查询名字为刘备的年龄是多少
	select age from hero where name='刘备';
3. 修改数据--**改**
	  update hero set age=30 where name='悟空';
	  update hero set age=25, name='悟能' where name='八戒';
- 如果不给条件则修改全表的数据
4. 删除数据--**删**
	  delete from hero where age<20;
	  delete from hero;
- 如果不给条件则删除全表的数据

####课程回顾
1. 数据库相关SQL
- 查询所有 show databases;
- 创建 create database db1 character set utf8/gbk;
- 查看详情 show create database db1;
- 删除 drop database db1;
- 使用  use db1;
2. 表相关SQL
- 创建 create table t1(name varchar(10),age int) engine=myisaml/innodb ？default charset=utf8/gbk;  	/ ? 表示default可写可不写
- 查询所有  show tables;
- 查看详情 show create table t1;
- 查看表字段  desc t1;
- 删除表 drop table t1;
- 修改表名 rename table t1 to t2;
- 修改引擎和字符集  alter table t1 engine=myisaml/innodb charset=utf8/gbk;
- 添加字段  alter table t1 add age int;	/alter table t1 add age int first/after xxx;
- 删除字段  alter table t1 drop age;
- 修改字段名和类型  alter table t1 change 原名 新名 新类型
- 修改类型和位置  alter table t1 modify 字段名 新类型  first/ after xxx;
3. 数据相关SQL
- 插入数据  insert into t1 (字段1,字段2) values(值1,值2),(值1,值2);
- 查询数据 select * from t1 where age>10;
- 修改数据 update t1 set age=20 where name='xxx';
- 删除数据  delete from t1 where age=30;


#-------------------------------------MySQL.day02---------------------------------------

###课程回顾
	......
###练习：
1. 创建mydb2 指定字符集为utf8, 并使用
	create database mydb2 character set utf8;
	use mydb2;
2. 创建员工表emp 字段：编号id,姓名name,工资sal,部门名dept
	create table emp(id int,name varchar(10),sal int,dept varchar(10));
3. 插入奖金字段comm 在部门名的前面
	alter table emp add comm int after sal;
4. 修改工资sal到最后面  5. 删除comm字段
	alter table emp modify sal int after dept;
	alter table emp drop comm;
6. 插入刘关张三个人 工资分别为5000 4000 3000,部门为三国部，编号为123
插入取经师徒四个人工资分别为800 700 600 500，部门为取经部，编号为4567
	insert into emp values(1,'刘备','三国部',5000),(2,'关羽','三国部',4000),(3,'张飞','三国部',3000),(4,'唐僧','取经部',800),(5,'悟空','取经部',700),(6,'八戒','取经部',600),(7,'沙僧','取经部',500);
7. 修改唐僧的名字为玉帝哥哥
	update emp set name='玉帝哥哥' where name='唐僧';
8. 插入工作地点字段在部门名的后面
	alter table emp add loc varchar(10) after dept;
9. 修改三国部的地点在蜀国
	update emp set loc='蜀国' where dept='三国部';
10. 删除刘备
	delete from emp where name='刘备';
11. 修改工资低于700的工资为1000
	update emp set sal=1000 where sal<700;
12. 删除取经部的员工
	delete from emp where dept='取经部';
13. 删除表
	drop table emp;
14. 删除库
	drop database mydb2;

###主键约束
	create database db2 character set utf8;
	use db2;
- 什么是主键： 表示每条数据唯一性的字段为主键
- 什么是约束： 约束是创建表时给字段添加的限制条件
- 什么是主键约束： 主键约束可以保证主键的值唯一且非空
	create table t1(id int primary key,name varchar(10));
	insert into t1 values(1,'Tom'); //成功
	insert into t1 values(1,'Jerry'); //报错 不能重复
	insert into t1 values(null,'Jerry'); //报错 值不能为null
- 主键约束+自增
	create table t2(id int primary key auto_increment,name varchar(10));
	insert into t2 values(1,'Tom'); //成功 自增也可以赋值
	insert into t2 values(null,'Tom');//成功 触发自增
	insert into t2 values(null,'Jerry');//成功 触发自增
	
	insert into t2 values(100,"AAA"); //100
	insert into t2 values(null,'BBB');//101
	delete from t2 where id>=100;
	insert into t2 values(null,'CCC');//102
	insert into t2 values(0,'CCC');//触发自增 0等效null
- 自增数值只增不减 
- 从历史最大值的基础上+1
- 添加了自增之后 主键值不能为0 ，0等效为null触发自增
####注释 comment
- 用于对表的字段进行描述
	create table t3(id int primary key auto_increment comment '这是主键',name varchar(10) comment '这是名字');
	show create table t3; //查看注释
#### ` 和 '
		符号 `   和 符号 '       都可以省略，查询表详情的时候可以看到这两个符号
- `：用于修饰表名和字段名 
	create table `t4`(`name` varchar(10));
- '：用于修饰字符串
####数据冗余
- 主键：表示数据唯一性的字段。
- 外键：用于建立两张表关系的字段。
- 由于表设计不够合理导致数据量增大时出现大量的重复数据，这种现象称为数据冗余，通过拆分表的形式解决冗余问题。
- 案例：设计表保存以下数据：
	1. 集团总部下教学研发部下Java教学一部的苍老师一枚，工资2000，年龄18，部门地点大钟寺
	2. 市场部下的刘备，工资800，年龄25，部门地点天安门
	3. 人事部下的薪酬部的员工张飞，工资400 年龄18 部门地点八达岭长城
	部门表 员工表
	- 创建员工表  编号 姓名 年龄 工资 部门编号
		create table t_emp(id int primary key auto_increment,name varchar(10),age int,sal int,deptid int);
	- 创建部门表  编号 名字 部门地点 上级部门编号
		create table t_dept(id int primary key auto_increment,name varchar(10),loc varchar(10),parentid int);
	- 插入数据
		insert into t_dept values(null,'集团总部','北京',null),(null,'教研部','北京',1),(null,'Java一部','大钟寺',2),(null,'市场部','天安门',1),(null,'人事部','北京',1),(null,'薪酬部','八达岭长城',5);
		insert into t_emp (name,age,sal,deptid) values('苍老师',18,2000,3),('刘备',25,800,4),('张飞',18,400,6);
- 练习：请设计表保存以下数据
	1. 家电分类下电视机分类下的夏普50寸液晶电视，价格5000，库存25个
	2. 办公耗材分类下的打印机分类下的惠普彩色打印机价格3000，库存10个
		分类表category(id,name,parentid)
		商品表item(id,name,price,num,categoryid)
	- 创建表：
		create table category(id int primary key auto_increment,name varchar(10),parentid int);
		create table item(id int primary key auto_increment,name varchar(10),price int,num int,categoryid int);
	- 插入数据：
		insert into category (name,parentid) values('家电',null),('电视机',1),('办公耗材',null),('打印机',3);
		
		insert into item (name,price,num,categoryid) values ('夏普50寸液晶电视',5000,25,2),('惠普彩色打印机',3000,10,4);
####事务
- 什么是事务：事务是数据库中执行同一业务多条SQL语句的工作单元，可以保证多条SQL全部执行成功或全部执行失败。

	create table user(id int primary key auto_increment,name varchar(10),money int,state varchar(5));
	insert into user values(null,'苍老师A',50,'正常'),
	(null,'苍老师B',0,'冻结'),(null,'刘老师',10000,'正常');
	-转账失败SQL：
	刘老师-2000
	update user set money=money-2000 where id=3 and state='正常';
	苍老师B+2000
	update user set money=money+2000 where id=2 and state='正常';
 	- 以上代码一条成功，一条失败，导致刘老师莫名丢了2000块钱，通过事务解决以上问题
	1. 开启事务
		begin;
	2. 执行转账业务SQL
		update user set money=money-2000 where id=3 and state='正常';
		update user set money=money+2000 where id=1 and state='正常';
	3. 如果全部成功执行提交事务
		commit;
	4. 如果部分成功执行回滚事务
		rollback;
- 保存回滚点 savepoint 
- 格式： savepoint 标识;
	begin;
	sql1
	savepoint s1;
	sql2
	savepoint s2;
	sql3
	rollback to s2;
- 测试回滚点：
	begin;
	update user set money=10 where id=2;
	savepoint s1;
	update user set money=20 where id=2;
	savepoint s2;
	update user set money=30 where id=2;

###SQL分类
1. DDL Data Definition Language 数据定义语言
- 包括：create 、 drop 、alter、truncate
- truncate:删除表并创建新表  和使用delete清空表不同的是，自增数值会清零
- 不支持事务
2. DML Data Manipulation Language 数据操作语言
- 包括：insert update delete select（DQL）       /增删改查
- 支持事务                                       /select既属于DML也属于DQL
3. DQL Data Query Language 数据查询语言
- 只包括select
4. TCL Transaction事务 Control控制 Language ，事务控制语言
- 包括：begin，commit，rollback，savepoint xxx,rollback to xxx;
5. DCL Data Control Language 数据控制语言
- 分配用户权限相关SQL 

###数据类型
1. 整数
- 常用整数有 int(m) 和 bigint(m)  ，m代表**显示长度**， 需要结合zerofill关键字使用 
		create table t_int(id int,age int(10) zerofill);
		insert into t_int values(1,18);   /显示0000000018
		select * from t_int;	 
2. 浮点数
- double(m,d) m代表总长度 d代表小数长度 
	如：76.323      m=5 d=3
- decimal(m,d) m代表总长度 d代表小数长度,超高精度浮点数，需要涉及超高精度运算时使用
3. 字符串
- char(m)：固定长度,m=10,abc 所占长度为10,效率略高  最长255
- varchar(m)：可变长度，m=10,abc 所占长度为3, 节省空间 最长65535,超高255建议使用text
- text：可变长度  最大65535  保存大于255长度的文本 
4. 日期
- date: 只保存年月日
- time: 只保存时分秒
- datetime: 保存年月日时分秒，最大值9999-12-31,默认值为null
- timestamp时间戳:保存年月日时分秒,最大值2038-01-19,默认值为当前系统时间  /不赋值(赋值为null)则显示当前系统时间
- 练习：创建时间的表
	create table t_date(d1 date,d2 time,d3 datetime,d4 timestamp);
	insert into t_date values('2018-12-14',null,null,null);
	insert into t_date values(null,'18:08:38','2018-12-14 18:09:22',null);
` - 日期精度，是微秒位数精度，最大为6

###课程回顾
1. 主键约束  primary key 
- 主键：表示数据唯一性的字段 
- 主键约束：唯一且非空 
2. 主键约束+自增 primary key auto_increment
- 从历史最大值基础上+1
- 只增不减
- 主键值不为0
3. 注释 comment
4. `用于修饰字段名和表名  '修饰字符串
5. 数据冗余：由于表设计不够合理导致的大量重复数据 ，通过合理拆分表的形式解决
6. 数据库事务：数据库中执行同一业务多条SQL语句的工作单元，可以保证全部执行成功或全部执行失败
- 开启事务 begin
- 提交事务 commit
- 回顾事务 rollback
- 保存回滚点 savepoint xxx;
- 回滚到某个回滚点 rollback to  xxx;
7. SQL分类：
- DDL数据定义语言：包括create alter drop truncate  不支持事务
- DML数据操作语言：包括insert update delete select(DQL) 支持事务
- DQL数据查询语言：只包括select 
- TCL事务控制语言：包括事务相关的指令 begin commit rollback 。。。
- DCL数据控制语言：用于分配用户权限相关的SQL
8. 数据类型
- 整数： int(m) bigint(m)  m代表显示长度 需要结合zerofill 补0
- 浮点数： double(m,d) m代表总长度 d代表小数长度 超高精度浮点数decimal(m,d)
- 字符串： char固定长度 最大255 执行效率高  varchar可变长度 最大65535超过255建议使用text 节省空间   text可变长度最大65535
- 日期： date年月日 time时分秒  datetime默认为null，最大9999-12-31  timestamp默认为当前系统时间，最大2038-01-19


#-------------------------------------MySQL.day03---------------------------------------

###课程回顾
	......
###练习：
1. 创建数据库db3字符集为utf8  并使用
2. 创建hero表 有主键id和name，引擎为myisam，指定字符集为gbk
3. 修改表名为t_hero,引擎为innodb，字符集为utf8
4. 添加age字段在最后，添加type(字符串)在name的后面
5. 修改age到type的前面
6. 添加以下数据， type为法师的：诸葛亮30岁、周瑜25岁，type为战士的：张飞30岁、关羽35岁，type为射手的后裔50岁、黄忠60岁
7. 查询所有35岁以下的人物名称和人物类型(type)
8. 修改30岁英雄的年龄为29岁
9. 添加money字段在最后
10. 修改法师的money为18888
11. 修改大于等于50岁的money为6888
12. 删除所有战士

	从ftp上 下载文件  tables.zip 

####导入*.sql文件到数据库中
1. windows系统                       ` *表示的是任意字符，xxx的意思
	把*.sql文件保存到D盘根目录
	在终端连接数据库后 中执行以下命令
	source d:/tables.sql;
2. linux系统
	把*.sql文件保存到桌面
	在终端连接数据库后 执行以下命令
	source /home/soft01/桌面/tables.sql;
3. 执行 show tables; 测试  查看是否有4张表


### is null 和 is not null
1. 查询奖金为null的所有员工信息
	select * from emp where comm is null;
2. 查询没有上级领导(mgr)的员工信息
	select * from emp where mgr is null;
3. 查询员工表中 有奖金的员工姓名、工资sal、奖金comm
	select ename,sal,comm from emp where comm is not null and comm>0;
###别名
	select ename as '姓名',sal as '工资' from emp;
	select ename '姓名',sal '工资' from emp;
	select ename 姓名,sal 工资 from emp;
	最后一种 如果报错  set names gbk;
###去重 distinct
1. 查询员工表中出现的所有职位 不能重复
	select distinct job from emp;     /distinct写在需要去重的字段的前面
###比较运算符 >,<,>=,<=,=,  !=和<>
1. 查询工资小于等于1600的员工姓名和工资
	select ename,sal from emp where sal<=1600;
2. 查询部门编号是20的所有员工姓名，职位job和工资
	select ename,job,sal from emp where deptno=20;
3. 查询职位是manager的所有员工姓名和职位
	select ename,job from emp where job='manager';
4. 查询部门编号deptno不是10号部门的所有员工姓名和部门编号（两种方式实现） / !=和<>都代表不等
	select ename,deptno from emp where deptno!=10;
	select ename,deptno from emp where deptno<>10;
5. 查询t_item表中单价price等于23的商品标题title
	select title from t_item where price=23;
6. 查询t_item表中单价不等于8443的商品标题和单价
	select title,price from t_item where price!=8443;
### and 和 or
- and 和java 中的&&效果一样
- or  和java 中的||效果一样
1. 查询不是10号部门并且工资低于3000的员工信息
	select * from emp where deptno!=10 and sal<3000;
2. 查询部门编号deptno为30或者上级领导mgr为7698的员工姓名、上级领导和部门编号
	select ename,mgr,deptno from emp where deptno=30 or mgr=7698;
` - and 和 or 连用的时候，Mysql数据库会**优先处理AND操作符**
	在使用AND和OR的时候，尽量用括号使语句的意思表达明白。
###in关键字
- 当查询字段的值为多个的时候使用in
1. 查询员工表中 工资为5000，1500，3000的员工信息
	select * from emp where sal=5000 or sal=1500 or sal=3000;
	select * from emp where sal in(5000,1500,3000);
###between x and y   (x到y之间，包含x和y。between：在...之间)
2. 查询员工工资在2000到4000之间的员工信息
	select * from emp where sal>=2000 and sal<=4000;
	select * from emp where sal between 2000 and 4000;
####练习
1. 查询员工表中奖金不为null的员工姓名和奖金 奖金和姓名使用别名
	select ename 姓名,comm 奖金 from emp where comm is not null;
2. 查询员工表中有哪些员工是领导 查询出编号 不能重复
	select distinct mgr from emp where mgr is not null;
3. 查询工资不等于2000并且不是30号部门的员工信息
	select * from emp where sal!=2000 and deptno!=30;
4. 查询单价为4539，4439，4639，4739的商品标题和单价
	select title,price from t_item where price in(4439,4539,4639,4739);
5. 查询单价在50到100之间的商品标题和单价
	select title,price from t_item where price between 50 and 100;
6. 查询单价不等于4539，4639，4739的商品标题
	select title,price from t_item where price not in(4539,4639,4739);
7. 查询单价在50到100之外的商品标题和单价
	select title,price from t_item where price not between 50 and 100;	
###模糊查询 like  像
- _ ：代表单个未知字符
- % ：代表0或多个未知字符
- 例：  a开头：   a%  b结尾：%b    第二个字母是a： _a%   第二个字母是x倒数第三个字母是y：  _x%y__    包含字母x：%x%
1. 查询名字中包含字母a的员工姓名
	select ename from emp where ename like '%a%';
2. 查询标题中包含记事本的商品标题
	select title from t_item where title like '%记事本%';
3. 查询单价低于100的记事本(titile包含记事本)
	select title from t_item where title like '%记事本%' and price<100;
4. 查询单价50到200之间的得力商品信息(标题中包含得力)
	select * from t_item where price between 50 and 200 and title like '%得力%';
5. 查询有图片的得力商品(有图片意思是image字段不为null)
	select * from t_item where image is not null and title like '%得力%';
6. 查询有赠品的商品信息（卖点字段sell_point包含赠字）
	select * from t_item where sell_point like '%赠%';
7. 名字中不包含a的员工姓名
	select ename from emp where ename not like '%a%';
###排序 order by 
- 默认为升序  可以通过 asc 和desc控制升序和降序
- 如果有where，order by 写在where的后面
1. 查询员工表所有员工的姓名和工资要求按照工资升序asc或降序desc排序
	select ename,sal from emp order by sal desc;
2. 查询员工表中工资低于2000的姓名和工资，按照工资降序排序
	select ename,sal from emp where sal<2000 order by sal desc;
3. 查询所有员工的姓名、工资、部门编号,按照部门编号升序，工资降序排序
	select ename,sal,deptno from emp order by deptno,sal desc;
###分页查询 limit
- limit 跳过的条数,请求查询的条数（每页条数） 
- 举例： 第8页5条(35,5)  第6页的四条((6-1)*4,4)
1. 查询员工表中第一页的5条数据
	select * from emp limit 0,5;
2. 查询二页的4条数据
	select * from emp limit 4,4;
3. 查询第三页的两条数据
	select * from emp limit 4,2;
4. 查询工资最高的三个员工姓名和工资
	select * from emp order by sal desc limit 0,3;
###数值计算  + - * /       7%2  等效  mod(7,2)  /取余的两种写法
1. 查询员工姓名,工资及年终奖(年终奖=工资*5)
	select ename,sal,sal*5 年终奖 from emp;
2. 查询商品表中的商品单价、库存num和总金额(库存*单价) 
	select price,num,price*num 总金额 from t_item;
###和日期相关的函数
- SQL语言的HelloWorld
	select 'helloworld';
- 获取当前日期+时间   now()
	select now();
- 获取当前的日期  current当前
	select curdate();
- 获取当前的时间
	select curtime();
- 从完整的年月日时分秒中获取年月日 和 获取 时分秒
	select date(now()),time(now());
- 从完整的年月日时分秒中提取时间分量   extract /提取
	extract(year/month/day/hour/minute/second from hiredate)
1. 查询每个员工入职的年份
	select ename,extract(year from hiredate) 入职年份 from emp;
- 日期格式化  date_format();
	date_format(时间,格式);
	%Y代表四位年   2018
	%y代表两位年   18
	%m代表两位月  05
	%c代表一位月    5
	%d代表日
	%H代表 24小时
	%h代表 12小时
	%i代表 分
	%s代表 秒
	-把now()得到的时间格式转换成 年月日时分秒格式
	select date_format(now(),'%Y年%m月%d日 %H时%i分%s秒')
- 把非标准时间格式转回标准格式 str_to_date(非标准时间,格式);	
1. 把 14.10.2018 16:28:30 转回标准格式
	select str_to_date('14.10.2018 16:28:30','%d.%m.%Y %H:%i:%s');
### ifnull(x,y)
- age=ifnull(x,y) 翻译：如果x值为null则age=y 否则age=x
1. 修改员工表中如果现有奖金为null则修改为0否则不变 
	update emp set comm=ifnull(comm,0);

###聚合函数
- 用于对多行数据进行统计，平均值、最大值、最小值、求和、统计数量
1. 平均值： avg(字段名)
	举例：查询30号部门的平均工资
	select avg(sal) from emp where deptno=30;
2. 最大值： max(字段名)
	举例：查询20号部门的最高工资
	select max(sal) from emp where deptno=20;
3. 最小值: min(字段名)
	举例：查询10号部门的最底工资
	select min(sal) from emp where deptno=10;
4. 求和：sum(字段名)
	举例： 查询30号部门的奖金总和
	select sum(comm) from emp where deptno=30;
5. 统计数量： count(字段名)
	举例：统计所有员工的数量
	select count(*) from emp;
###字符串相关函数
1. 拼接  concat(s1,s2)  s1s2
	select concat('aa','bb');
- 案例： 查询每个员工的姓名和工资 工资后面有单位元
	select ename,concat(sal,'元') from emp;
2. 获取字符串长度 char_length(str)
- 查询：每个员工的姓名和姓名的长度
	select ename,char_length(ename) from emp;

3. 获取字符串A在字符串B中出现的位置  从1开始
	- instr(str,substr)
	select instr("abcdefg",'c');
4. 插入字符串 
	- insert(str,start,length,newstr)
	select insert('abcdefg',3,2,'m');
5. 转换大小写
	select upper('nba'),lower('NBa');
6. 去两端空白 
	select trim('  a b  ');  a b
7. 截取字符串
	select substring('abcdefg',2); //bcdefg
	select substring('abcdefg',2,3); //bcd     3代表长度
8. 重复
	select repeat('ab',2);   //abab
9. 替换
	select replace('abcdefg','c','mm'); //abmmdefg
10. 反转
	select reverse('abc'); //cba

###课程回顾
1. is null 和 is not null
2. 别名 
3. 去重 distinct
4. 比较运算符 > <  >=  <=  =  !=和<>
5. and和or
6. in 
7. between x and y  包括x和y
8. 模糊查询  like   _单个未知字符  %代表0或多个未知字符
9. 排序 order by 字段1 asc/desc,字段2 asc/desc;
10. 分页  limit 跳过的条数,请求条数
11. 数值计算  + - * / % mod()
12. 日期：  now()    curdate()  curtime()  date(now())  time(now())   extract(year/month/day/hour/minute/second from now()) 
date_format(时间,格式)    %YymcdHhis   str_to_date(非标准时间,格式)
13. ifnull(x,y)
14. 聚合函数： 5个   平均值avg  最大值max 最小值min 求和sum 统计数量count(*)
15. 字符串相关： concat()   char_length()   instr()  insert()  upper() lower()  trim()   substring()   repeat()   replace()  reverse()


### 练习
	见day04

#-------------------------------------MySQL.day04---------------------------------------

###课程回顾
	......
	/昨晚练习答案：
1. 案例：查询没有上级领导的员工的编号，姓名，工资
	select empno,ename,sal from emp where mgr is null;
2. 案例：查询emp表中没有奖金的员工的姓名，职位，工资，以及奖金
	select ename,job,sal,comm from emp where comm=0 or comm is null;
3. 案例：查询emp表中含有奖金的员工的编号，姓名，职位，以及奖金
	select ename,job,sal,comm from emp where comm>0;
4. 案例：查询含有上级领导的员工的姓名，工资以及上级领导的编号
	select empno,ename,sal from emp where mgr is not null;
5. 案例：查询emp表中名字以‘S’开头的所有员工的姓名
	select ename from emp where ename like 's%';
6. 案例：查询emp表中名字的最后一个字符是'S'的员工的姓名
	select ename from emp where ename like '%s';
7. 案例：查询倒数的第2个字符是‘E’的员工的姓名
	select ename from emp where ename like '%e_';
8. 案例：查询emp表中员工的倒数第3个字符是‘N’的员工姓名
	select ename from emp where ename like '%n__';
9. 案例：查询emp表中员工的名字中包含‘A’的员工的姓名	
	select ename from emp where ename like '%a%';
10. 案例：查询emp表中名字不是以'K'开头的员工的所有信息
	select * from emp where ename not like 'k%';
11. 案例：查询emp表中名字中不包含‘A’的所有员工的信息
	select * from emp where ename not like '%a%';
12. 案例：做文员的员工人数（job_id 中 含有 CLERK 的）  /job=CLERK的。括号里写错了。
	select count(*) from emp where job='CLERK';
13. 案例：销售人员 job: SALESMAN 的最高薪水
	select max(sal) from emp where job='SALESMAN';
14. 案例：最早和最晚入职时间
	select min(hiredate),max(hiredate) from emp;
15. 案例：查询类别 163的商品总库存量
	select sum(num) from t_item where category_id=163;
16. 案例：查询 类别 163 的商品
	select * from t_item where category_id=163;
17. 案例：查询商品价格不大于100的商品名称列表
	select title from t_item where price <=100;
18. 案例：查询品牌是联想,且价格在40000以上的商品名称和价格
	select title,price from t_item where price>40000 and title like '%联想%';	
19. 案例：查询品牌是三木,或价格在50以下的商品名称和价格
	select title,price from t_item where price<50 or title like '%三木%';
20. 案例：查询品牌是三木、广博、齐心的商品名称和价格
	select title,price from t_item where title like '%三木%' or title like '%广博%' or title like '%齐心%';
21. 案例：查询品牌不是联想、戴尔的商品名称和价格
	select title,price from t_item where title not like '%联想%' 
	and title not like '%联想%';
27. 案例：查询品牌是末尾字符是'力'的商品的名称和价格
	select title,price from t_item where title like '%_力%';
30. 案例：查询emp表中员工的编号，姓名，职位，工资，并且工资在1000~2000之间。
	select empno,ename,job,sal from emp where sal between 1000 and 2000;


31. 案例：查询emp表中员工在10号部门，并且含有上级领导的员工的姓名，职位，上级领导编号以及所属部门的编号
	select ename,job,mgr,deptno from emp where deptno=10 and mgr is not null;
32. 案例：查询emp表中名字中包含'E'，并且职位不是MANAGER的员工的编号，姓名，职位，以及工资。	
	select empno,ename,job,sal from emp where ename like '%e%' and job!='manager';
33. 案例：查询emp表中10号部门或者20号部门中员工的编号，姓名，所属部门的编号
	select empno,ename,deptno from emp where deptno in(10,20);
34. 案例：查询emp表中没有奖金或者名字的倒数第2个字母不是T的员工的编号，姓名，职位以及奖金
	select empno,ename,job,comm from emp where comm=0 or ename not like '%t_';
35. 案例：查询工资高于3000或者部门编号是30的员工的姓名，职位，工资，入职时间以及所属部门的编号
	select ename,job,sal,hiredate,deptno from emp where sal>3000 or deptno=30;	
36. 案例：查询不是30号部门的员工的所有信息
	select * from emp where deptno!=30;
37. 案例：查询奖金不为空的员工的所有信息
	select * from emp where comm is not null;
38. 案例：查询emp表中所有员工的编号，姓名，职位，根据员工的编号进行降序排列
	select empno,ename,job from emp order by empno desc;
39. 案例：查询emp表中部门编号是10号或者30号中，所有员工姓名，职务，工资，根据工资进行升序排列
	select ename,job,sal from emp where deptno in(10,30) order by sal;
40. 案例：查询emp表中所有的数据，然后根据部门的编号进行升序排列，如果部门编号一致，根据员工的编号进行降序排列
	select * from emp order by deptno,empno desc;
41. 案例：查询emp表中工资高于1000或者没有上级领导的员工的编号，姓名，工资，所属部门的编号，以及上级领导的编号，根据部门编号进行降序排列，如果部门编号一致根据工资进行升序排列。
	select empno,ename,sal,deptno,mgr from emp where sal>1000 or mgr is null order by deptno desc,sal;
42. 案例：查询emp表中名字中不包含S的员工的编号，姓名，工资，奖金，根据工资进行升序排列，如果工资一致，根据编号进行降序排列
	select empno,ename,sal,comm from emp where ename not like '%s%' order by sal,empno desc;
43. 案例：统计emp表中员工的总数量
	select count(*) from emp;
44. 案例：统计emp表中获得奖金的员工的数量
	select count(*) from emp where comm>0;
45. 案例：求出emp表中所有的工资累加之和
	select sum(sal) from emp;
46. 案例：求出emp表中所有的奖金累加之和
	select sum(comm) from emp;
47. 案例：求出emp表中员工的平均工资
	select avg(sal) from emp;
48. 案例：求出emp表中员工的平均奖金
	select avg(comm) from emp;
49. 案例：求出emp表中员工的最高工资
	select max(sal) from emp;
50. 案例：求出emp表中员工编号的最大值
	select max(empno) from emp;
51. 案例：查询emp表中员工的最低工资。
	select min(sal) from emp;
52. 案例：查询emp表中员工的人数，工资的总和，平均工资，奖金的最大值，奖金的最小值,并且对返回的列起别名。
	select count(*) 人数,sum(sal) 工资总和, avg(sal) 平均工资,max(comm) 最高奖金, min(comm) 最底奖金 from emp;
53. 案例：查询emp表中每个部门的编号，人数，工资总和，最后根据人数进行升序排列，如果人数一致，根据工资总和降序排列。
54. 案例：查询工资在1000~3000之间的员工信息，每个部门的编号，平均工资，最低工资，最高工资，根据平均工资进行升序排列。
55. 案例：查询含有上级领导的员工，每个职业的人数，工资的总和，平均工资，最低工资，最后根据人数进行降序排列，如果人数一致，根据平均工资进行升序排列
56. 案例：查询工资在1000~3000之间每一个员工的编号，姓名，职位，工资
	select empno,ename,job,sal from emp 
	where sal between 1000 and 3000;
58. 案例：查询员工的编号是7369，7521
	select * from emp where empno in (7369,7521);
59. 案例：查询emp表中，职位是ANALYST，
	select * from emp where job='analyst';
60. 案例：查询emp表中职位不是ANALYST,
	select * from emp where job!='analyst';

###分组查询
- group by 字段名
- 每个xxx就以xxx进行分组
1. 查询每个部门的平均工资
	select deptno,avg(sal) from emp group by deptno;
2. 查询每种职业的最高工资
	select job,max(sal) from emp group by job;
3. 查询每个部门的人数
	select deptno,count(*) from emp group by deptno;
4. 查询每个分类的商品平均价格
	select category_id,avg(price) from t_item group by category_id;
5. 查询每个主管(mgr)的手下人数
	select mgr,count(*) from emp where mgr is not null
	group by mgr;
53. 案例：查询emp表中每个部门的编号，人数，工资总和，最后根据人数进行升序排列，如果人数一致，根据工资总和降序排列。
	select deptno,count(*),sum(sal) from emp group by deptno order by count(*),sum(sal) desc;
	
	select deptno,count(*) c,sum(sal) s from emp group by deptno order by c,s desc;
	
54. 案例：查询工资在1000~3000之间的员工信息，每个部门的编号，平均工资，最低工资，最高工资，根据平均工资进行升序排列。
	select deptno,avg(sal) a,min(sal),max(sal) from emp where sal between 1000 and 3000 group by deptno order by a;
55. 案例：查询含有上级领导的员工，每个职业的人数，工资的总和，平均工资，最低工资，最后根据人数进行降序排列，如果人数一致，根据平均工资进行升序排列
	select job,count(*) c,sum(sal),avg(sal) a,min(sal) from emp
	where mgr is not null
	group by job order by c desc,a; 

- 通过**多个字段**进行**分组**统计
	1. 统计每个部门下每个主管的手下人数
	select deptno,mgr,count(*) from emp where mgr is not null group by deptno,mgr;
### having
- 聚合函数条件不能写在where后面，where后面只能写普通字段的条件
- having后面写聚合函数的条件，虽然也支持普通字段的条件，但是不推荐使用
- having要和分组查询结合使用
`**常用关键字的顺序**： 
- select ..... from 表名 where .... group by .... having.... order by.... limit... ;
	/对以上四句的疑问可参看笔记详解
1. 查询平均工资大于2000的部门编号和平均工资
	- 错误写法：	
	select deptno,avg(sal) from emp where avg(sal)>2000 group by deptno;
	- 正确写法
	select deptno,avg(sal) a from emp 
	group by deptno having a>2000;
2. 查询每个分类的平均单价 要求平均单价低于100
	select category_id,avg(price) a from t_item
	group by category_id having a<100;
3. 查询238和917两个分类的平均单价
	select category_id c,avg(price) from t_item
	where category_id in(238,917) group by c;
4. 查询emp表中每个部门的平均工资高于2000的部门编号，部门人数，平均工资，最后根据平均工资降序排序
	select deptno,count(*),avg(sal) a from emp group by deptno
	having a>2000 order by a desc;
5. 查询emp表中工资在1000到3000之间的员工，每个部门的编号，工资总和，平均工资，过滤掉平均工资低于2000的部门，按照平均工资升序排序。
	select deptno,sum(sal),avg(sal) a from emp where sal between 1000 and 3000 group by deptno having a>=2000 order by a;
6. 查询emp表中不是以s开头的职位，每个职位的名字，人数，工资总和，最高工资，过滤掉平均工资是3000的职位，根据人数升序排序 如果人数一致则根据工资总和降序排序
	select job,count(*) c,sum(sal) s,max(sal) from emp 
	where job not like 's%' group by job 
	having avg(sal)!=3000 order by c,s desc;
7. 查询每年入职的人数（扩展题）
	select extract(year from hiredate) from emp;
	select extract(year from hiredate) y,count(*) from emp group by y;
8. 查询最高平均工资的部门编号（提高题）
	select deptno from emp 
	group by deptno order by avg(sal) desc limit 0,1;
	
###子查询（嵌套查询）
1. 查询员工表中工资最高的员工信息
	select max(sal) from emp;
	select * from emp where sal=(select max(sal) from emp);
2. 查询emp表中工资大于平均工资的所有员工信息
	select avg(sal) from emp;
	select * from emp where sal>(select avg(sal) from emp);
3. 查询工资高于20号部门最大工资的员工信息
	select max(sal) from emp where deptno=20;
	select * from emp where sal>(select max(sal) from emp where deptno=20);
4. 查询和Jones相同工作的的其他员工信息
	select job from emp where ename='jones';
	select * from emp where job=(select job from emp where ename='jones') and ename!='Jones';
5. 查询最低工资的员工的一个部门其他员工信息
	select min(sal) from emp;
	-查询工资为800的员工的所占部门编号
	select deptno from emp where sal=(select min(sal) from emp);
	-查询20号部门的所有员工信息
	select * from emp where deptno=(select deptno from emp where sal=(select min(sal) from emp));
	-排除掉800的员工
	select * from emp where deptno=(select deptno from emp where sal=(select min(sal) from emp)) and sal!=(select min(sal) from emp);
6. 查询员工king 的部门编号和部门名称(需要用到dept表)
	select deptno from emp where ename='king';
	select deptno,dname from dept where deptno=(select deptno from emp where ename='king');
7. 查询有员工的部门信息（有一个部门没有员工，想办法去掉）
	select distinct deptno from emp;
	select * from dept where deptno in(select distinct deptno from emp);
8. 查询平均工资最高的部门信息（难度最大，需要考虑并列第一） /！重要！
	-得到最高的平均工资
	select avg(sal) a from emp group by deptno order by a desc limit 0,1;
	-通过最高的平均工资查找对应的部门编号
	select deptno from emp group by deptno having avg(sal)=(select avg(sal) a from emp group by deptno order by a desc limit 0,1);
	-通过得到的部门编号查询部门信息
	select * from dept where deptno in(上面一坨);
- 写在SQL语句中的查询语句称为子查询 
- 子查询可以嵌套无数层
- 子查询可以写在哪些位置？
1. 写在where和having的后面当做查询条件的值。
2. 可以写在创建表的时候    /把子查询的数据放到一张新表中，新表是真实存在的表，区分视图

	create table emp_10 as (select * from emp where deptno=10);
3. 写在from的后面当成一张虚拟表   **必须起别名**
	                                   /从结果当中再次查询可以用这种方式。虚拟表(nt)不真正存在，只是一个结果。
	select ename from (select * from emp where deptno=10) nt;
	/我认为虚拟表没用，直接把想插的写在select后边就行。
	/国斌老师说：比如有这样一个场景，我的sqlq语句很长，有二三十条，然后呢过了一段事件之后，你需要在这个基础上再进行一次筛选再进行一次过滤，这样的话你就不用去改那二三十条的sql语句，直接在这个基础上加上一些代码。但是如果你没有用这个方式来做，那你就需要把原来写的那二三十条sql语句进行改动，这样也比较麻烦。
	
###关联查询
`成恒：如果关联查询的多张表有相同的字段名，则要指定表名。比如两张表都有名为id的字段，并且要查询id或者以id作为条件，则要指定表名.id
- 同时查询多张表的查询方式称为关联查询
1. 查询每个员工的姓名和对应的部门名称
	select e.ename,d.dname
	from emp e,dept d
	where e.deptno=d.deptno;
2. 查询king的姓名、工资、部门名称、工作地点
	select e.ename,e.sal,d.dname,d.loc
	from emp e,dept d
	where e.deptno=d.deptno	
	and ename='king';
###笛卡尔积
- 如果关联查询不写关联关系会得到两张表数据的乘积，这个乘积称为笛卡尔积   /第一张表的每条数据都和第二张表的每条数据关联起来
- 工作中切记不要出现，如果数据量大，会占用大量内存，甚至系统崩溃
###等值连接和内连接
		课堂笔记'等值连接和内连接查询结果一样'
		图解内连接https://blog.csdn.net/plg17/article/details/78758593
- 这两种都是关联查询的查询方式
- 得到的数据是两张表的**交集**数据
- **等值连接**： select * from A,B where A.x=B.x and A.age=18;
- **内连接**： select * from A ?inner join B on A.x=B.x where A.age=18;		`因为有省略掉的inner所以叫内连接
		关键字：inner join on
1. 查询每个员工的姓名和对应的部门名称
	select e.ename,d.dname
	from emp e join dept d
	on e.deptno=d.deptno;
2. 查询工资大于2000的员工姓名和工作地点
	select e.ename,d.loc
	from emp e join dept d
	on e.deptno=d.deptno
	where sal>2000;
###外连接
		图解外连接https://blog.csdn.net/plg17/article/details/78758593
		关键字：left/right join on             left：左连接(左外连接)   right：右连接(右外连接)
- 查询一张表的全部数据和另外一张表的交集数据
- 格式：  select * from A left/right join B on A.x=B.x where A.age=18;
1. 查询所有部门的编号、名称和对应的员工名称
	select  d.deptno,d.dname,e.ename
	from emp e right join dept d
	on e.deptno=d.deptno;

####关联查询总结 
- 三种查询方式：
- 等值连接和内连接查询结果一样，得到交集数据，推荐使用内连接
- 外连接分为左外和右外得到的是一张表的全部数据和另外一张表的交集数据



###课程回顾
1. 分组查询 group by
- 每个部门的平均工资
	select deptno,avg(sal) from emp group by deptno;
2. having 用于和group by结合使用 后面写聚合函数的条件
- 查询平均工资在2000以上的部门编号和平均工资
	select deptno,avg(sal) a from emp group by deptno having a>2000;
3. 子查询，把多条SQL查询语句合并成一条嵌套查询
- 查询拿最高工资的员工信息
	select * from emp where sal=(select max(sal) from emp);
- 可写在三种地方
	1. 写在where和having后面当做查询条件的值
	2. 写在创建表的时候 
		create table 表名 as (子查询);
	3. 写在from后面当成一个虚拟表 必须起别名 
4. 关联查询
- 同时查询多张表的数据
- 三种查询方式：
	1. 等值连接： 查询两张表的交集数据， select * from A,B where A.x=B.x and A.age=18;
	2. 内连接： 查询两张表的交集数据, select * from A join B on A.x=B.x where A.age=18;
	3. 外连接:查询一张表的全部数据和另外一张表的交集数据
	select * from A left/right join B on A.x=B.x where A.age=18;
- 笛卡尔积：关联查询不写关联关系则会出现两张表数据的乘积，这种乘积称为笛卡尔积

###作业
	见day04


#-------------------------------------MySQL.day05---------------------------------------

###课程回顾
	......

###作业
  1. 每个部门的人数,根据人数排序
	select deptno,count(*) c from emp group by deptno
	order by c;
  2. 每个部门中，每个主管的手下人数
	select deptno,mgr,count(*) from emp 
	where mgr is not null group by deptno,mgr;
  3. 每种工作的平均工资
	select job,avg(sal) from emp group by job;
  4. 每年的入职人数 
	select extract(year from hiredate) y,count(*) from emp 
	group by y;
  5. 少于等于3个人的部门信息
	select deptno from emp group by deptno having count(*)<=3;
	select * from dept where deptno in(select deptno from emp group by deptno having count(*)<=3);
	-考虑40号部门
	select d.deptno
	from emp e right join dept d
	on e.deptno=d.deptno 
	group by d.deptno
	having count(e.ename)<=3;  / count() 括号里不能写*，因为40号部门没有员工，但是有40号部门，写*的话count(*)=1，可以写e.任何字段，比如e.ename  因为员工表里按部门分组查询任何40部门的字段都是null，这时候(e.xxx)=0，这样才对
	
	select * from dept where deptno in (上面一坨);
  6. 拿最低工资的员工信息
	select * from emp where sal=(select min(sal) from emp);
  7. 只有一个下属的主管信息
	select mgr from emp 
	where mgr is not null group by mgr having count(*)=1;
	
	select * from emp where empno in (select mgr from emp 
	where mgr is not null group by mgr having count(*)=1);
  8. 平均工资最高的部门编号
	select avg(sal) a from emp group by deptno order by a desc limit 0,1;
	
	select deptno from emp group by deptno having avg(sal)=(select avg(sal) a from emp group by deptno order by a desc limit 0,1);
  9. 下属人数最多的人，查询其个人信息
	- 得到最多的下属人数	
	select count(*) from emp group by mgr order by count(*) desc limit 0,1;
	- 通过人数找对应的mgr值
	select mgr from emp group by mgr having count(*)=(select count(*) from emp group by mgr order by count(*) desc limit 0,1);
	- 通过主管编号得到主管信息
	select * from emp where empno in (上面一坨);

  11. 最后入职的员工信息
	select * from emp where hiredate=(select max(hiredate) from emp); 
  12. 工资多于平均工资的员工信息
	select * from emp where sal>(select avg(sal) from emp);
  13. 查询员工信息，部门名称
	select e.*,d.dname
	from emp e join dept d
	on e.deptno=d.deptno;
  14. 员工信息，部门名称，所在城市
      select e.*,d.dname,d.loc
	from emp e join dept d
	on e.deptno=d.deptno; 
  15. DALLAS 市所有的员工信息
	select e.*
	from emp e join dept d
	on e.deptno = d.deptno
	where d.loc='dallas';
  16. 按城市分组，计算每个城市的员工数量
	select d.loc,count(e.ename)   /不能用count(*)，原因可以看day05笔记第1条
	from emp e right join dept d
	on e.deptno=d.deptno
	group by d.loc;
  17. 查询员工信息和他的主管姓名
- 自关联的查询方式： 把一张表当成两张表 通过内连接把两个表连接起来查询
	select e.ename,m.ename
	from emp e left join emp m
	on e.mgr=m.empno;

  18. 员工信息，员工主管名字，部门名
	 select e.ename,m.ename,d.dname
	from emp e left join emp m
	on e.mgr=m.empno
	join dept d
	on e.deptno=d.deptno;

  20. 员工和他所在部门名
	select e.ename,d.dname
	from emp e join dept d
	on e.deptno=d.deptno;	
  22. 案例：查询emp表中所有员工的姓名以及该员工上级领导的编号，姓名，职位，工资
	select e.ename,m.empno,m.ename,m.job,m.sal
	from emp e left join emp m
	on e.mgr=m.empno;
  23. 案例：查询emp表中名字中没有字母'K'的所有员工的编号，姓名，职位以及所在部门的编号，名称，地址
	select e.empno,e.ename,e.job,d.*
	from emp e join dept d
	on e.deptno=d.deptno
	where e.ename not like '%k%';	

  24. 案例：查询dept表中所有的部门的所有的信息，以及与之关联的emp表中员工的编号，姓名，职位，工资
	select d.*,e.empno,e.ename,e.job,e.sal
	from emp e right join dept d
	on e.deptno=d.deptno;

###表设计之关联关系
###一对一
- 什么是一对一：有AB两张表，A表中的一条数据保存B表中的一条数据，同时B表一条数据也对应A表的一条数据，这两张表的关系称为一对一。
- 应用场景：  用户表和用户信息扩展表， 商品表和商品信息扩展表
- 如何建立关系：在主表中添加主键，从表中添加外键指向主表的主键

- 练习： 创建用户表user(id,username,password) 和 用户信息扩展表userinfo(userid,nick,qq)保存以下数据
- 创建表：
	create table user(id int primary key auto_increment,username varchar(10),password varchar(10));
	create table userinfo(userid int,nick varchar(10),qq varchar(15));
	用户名 密码       昵称      qq
	libai admin      诗仙     112233
	liubei admin      刘皇叔  558866
	diaochan 123456   貂蝉    554433
- 插入数据
	insert into user (username,password) values ('libai','admin'),('liubei','admin'),('diaochan','123456');
	insert into userinfo values(1,'诗仙','112233'),(2,'刘皇叔',558866),(3,'貂蝉',554433);
1. 查询每个用户的用户名、昵称、qq
	select u.username,ui.nick,ui.qq
	from user u join userinfo ui
	on u.id=ui.userid;
2. 查询诗仙的用户名和密码
	select u.username,u.password
	from user u join userinfo ui
	on u.id=ui.userid where ui.nick='诗仙';
3. 查询diaochan的所有信息
	select *		/表关联查询所有信息select一个*即可
	from user u join userinfo ui
	on u.id=ui.userid where u.username='diaochan';
###一对多
- 什么是一对多：有AB两张表：A表中的一条数据对应B表中的多条数据，同时B表中的一条数据对应A表中的一条。
- 应用场景： 员工表和部门表  商品表和商品分类表
- 如何建立关系：  在多的表中添加外键指向另外一张表的主键
- 练习： 创建员工表t_emp(id,name,deptid)和部门表t_dept(id,name)
	create table t_emp(id int primary key auto_increment,name varchar(10),deptid int);
	create table t_dept(id int primary key auto_increment,name varchar(10));
保存以下数据：
	神仙部的猪八戒和孙悟空
	妖怪部的蜘蛛精和白骨精
	insert into t_dept values(null,'神仙部'),(null,'妖怪部');
	insert into t_emp (name,deptid) values('悟空',1),('八戒',1),('蜘蛛精',2),('白骨精',2);
1. 查询每个部门对应的员工姓名
	select d.name,e.name
	from t_emp e join t_dept d
	on e.deptid=d.id;
2. 查询八戒的部门名称
	select d.name
	from t_emp e join t_dept d
	on e.deptid=d.id where e.name='八戒';
3. 查询妖怪部的员工姓名
	select e.name
	from t_emp e join t_dept d
	on e.deptid=d.id where d.name='妖怪部';
###多对多
- 什么是多对多：有AB两张表，A表中一条数据对应B表的多条数据，同时B 表的一条数据对应A表的多条数据，称为多对多。
- 应用场景:  学生表和老师表     用户和角色表
- 如何建立关系：创建一个关系表在关系表中有两个外键分别指向两个表的主键
- 练习：创建学生表student(id,name)和老师表teacher(id,name) 和学生老师关系表s_t(sid,tid)
	create table student(id int primary key auto_increment,name varchar(10));
	create table teacher(id int primary key auto_increment,name varchar(10));
	create table s_t(sid int,tid int);
- 添加以下数据：
	苍老师：小明，小红，小黄	
	传奇老师：小绿，小明	
	insert into student values(null,'小明'),(null,'小红'),(null,'小黄'),(null,'小绿');
	insert into teacher values(null,'苍老师'),(null,'传奇老师');
	insert into s_t values(1,1),(1,2),(2,1),(3,1),(4,2);
1. 查询每个老师姓名和对应的学生姓名
	select t.name,s.name
	from student s join s_t st
	on s.id=st.sid
	join teacher t
	on t.id=st.tid;
2. 查询苍老师的学生都有谁
	select s.name
	from student s join s_t st
	on s.id=st.sid
	join teacher t
	on t.id=st.tid where t.name='苍老师';
3. 查询小明的老师都有谁 
	select t.name
	from student s join s_t st
	on s.id=st.sid
	join teacher t
	on t.id=st.tid where s.name='小明';
###表设计案例： 权限管理
- 三张主表： 用户表 角色表 权限表    两张关系表：用户角色关系表，角色权限关系表
	create database db5 character set utf8;
1. 创建表： user(id,name)    role(id,name)  module(id,name)
	u_r(uid,rid)    r_m(rid,mid)

	create table user(id int primary key auto_increment,name varchar(10));
	create table role(id int primary key auto_increment,name varchar(10));
	create table module(id int primary key auto_increment,name varchar(10));
	create table u_r(uid int,rid int);
	create table r_m(rid int,mid int);

2. 保存以下数据： 用户（苍老师，小明，克晶老师） 角色（男游客，男管理员，女会员，女管理员） 权限（男浏览，男发帖，男删帖，女浏览，女发帖，女删帖）
	insert into user values(null,'苍老师'),(null,'小明'),(null,'克晶老师');
	insert into role values(null,'男游客'),(null,'男管理员'),(null,'女会员'),(null,'女管理员');
	insert into module values(null,'男浏览'),(null,'男发帖'),(null,'男删帖'),(null,'女浏览'),(null,'女发帖'),(null,'女删帖');
关系：苍老师(男管理员，女管理员) 小明（女会员）克晶老师（女管理员，男游客） 男游客（男浏览）， 男管理员（男浏览，男发帖，男删帖），女会员（女浏览，女发帖），女管理员（女浏览，女发帖，女删帖）
	insert into u_r values(1,2),(1,4),(2,3),(3,4),(3,1);
	insert into r_m values(1,1),(2,1),(2,2),(2,3),(3,4),(3,5),(4,4),(4,5),(4,6);
- 查询每个用户对应的所有权限
	select u.name,m.name
	from user u join u_r ur
	on u.id=ur.uid
	join r_m rm
	on ur.rid=rm.rid		/ ur.rid=rm.rid 不需要用到角色表，就不用关联角色表
	join module m		/ 直接让两张关系表建立关联，跳过角色表。灵活运用
	on m.id=rm.mid  order by u.name;
- 查询苍老师的权限都有什么
	select m.name
	from user u join u_r ur
	on u.id=ur.uid
	join r_m rm
	on ur.rid=rm.rid
	join module m
	on m.id=rm.mid  where u.name='苍老师';
- 有男浏览权限的用户都有谁
	select u.name
	from user u join u_r ur
	on u.id=ur.uid
	join r_m rm
	on ur.rid=rm.rid
	join module m
	on m.id=rm.mid  where m.name='男浏览';

###课程回顾
1. 关联关系
- 一对一： AB两张表 A表中的一条对应B表中的一条，同时B表中的一条对应A表中的一条， 在从表中添加外键指向主表的主键
- 一对多： AB两张表 A表中的一条数据对应B表中的多条，同时B表中的一条对应A表中的一条，在多的表中添加外键指向另外一张表的主键
- 多对多： AB两张表 A表中的一条对应B表中的多条，同时B表中的一条对应A表中的多条数据，通过新建一张关系表建立关系
2. 权限管理案例： 3张主表：用户表 角色表 权限表   2张关系表：用户角色关系表，角色权限关系表


#-------------------------------------MySQL.day06---------------------------------------

###课程回顾
	......
###面试题	/题目在day05笔记下载中
1. 创建表 
	交易流水表： 交易号   交易时间  交易金额  交易类型  person_id 
	人物表： id 姓名 性别 关系 
	create table trade(id int primary key auto_increment,time datetime,money int,type varchar(10),person_id int);
	create table person(id int primary key auto_increment,name varchar(10),gender varchar(5), rel varchar(5));
2. 插入以下数据
	刘德华 男 亲戚 微信 发-20   2018-04-20
	杨幂 女 亲戚  现金  收500  发-50  2018-05-15
	马云 男 同事  支付宝 收20000 发-20  2018-05-20
	特朗普 男 朋友 微信 收2000  2018-04-22
	貂蝉 女 朋友 微信  发-20000  2018-03-14
	
	insert into person values(null,'刘德华','男','亲戚'),(null,'杨幂','女','亲戚'),(null,'马云','男','同事'),(null,'特朗普','男','朋友'),(null,'貂蝉','女','朋友');
	
	insert into trade values(null,'2018-4-20',-20,'微信',1),(null,'2018-5-15',500,'现金',2),(null,'2018-5-15',-50,'现金',2),(null,'2018-05-20',20000,'支付宝',3),(null,'2018-5-20',-20,'支付宝',3),(null,'2018-04-22',2000,'微信',4),(null,'2018-03-14',-20000,'微信',5);
3. 统计2018年2月15号到现在的所有红包收益
	select sum(money) from trade where time>str_to_date('2018年2月15号','%Y年%c月%d号');
4. 统计2018年2月15号到现在 金额大于100 所有女性亲戚的名字和红包金额
	select p.name,t.money
	from trade t join person p
	on t.person_id=p.id
	where t.money not between -100 and 100 and p.gender='女'
	and p.rel='亲戚' and time>str_to_date('2018年2月15号','%Y年%c月%d号');
5. 查询三个平台分别收入的红包金额
	select type,sum(money) from trade 
	where money>0 group by type;
###视图
- 什么是视图：视图和表都是数据库中的对象，视图可以理解成一张虚拟的表，视图本质就是取代了一段SQL查询语句
- 为什么使用视图：可以起到SQL语句重用的作用，隐藏敏感信息		/重用sql语句可以提高开发效率
- 创建视图的格式：
	create view 视图名 as (子查询);//创建了一个虚拟的表
	create table 表名 as (子查询);  //创建了一张真实存在的表
1. 创建一个10号部门员工的视图
	create view v_emp_10 as (select * from emp where deptno=10);
	select * from v_emp_10; 
2. 创建一个20号部门并且工资小于2000的视图
	create view v_emp_20 as (select * from emp where deptno=20 and sal<2000);
3. 创建一个没有工资的员工表的视图
	create view v_emp_nosal as (select empno,ename,job,mgr,hiredate,comm,deptno from emp);
	select * from v_emp_nosal;
4. 创建每个部门平均工资，最高工资，最底工资，工资总和，部门人数的视图
	create view v_emp_info as (select deptno,avg(sal),max(sal),min(sal),sum(sal),count(*) from emp group by deptno);
####视图的分类
1. 简单视图：创建视图的子查询中不包含：去重、函数、分组、关联查询的视图称为简单视图，可以对视图中的数据进行增删改查操作
2. 复杂视图：和简单视图相反，只能查询	/因为修改没意义，显示的数据都是原表统计数据出来的数据
####对简单视图进行增删改操作
1. 插入数据
	insert into v_emp_10 (empno,ename,sal,deptno) values(10010,'张三',888,10);
	select * from v_emp_10; //视图和原表中都存在
	- 测试往v_emp_10中插入一条部门编号为20号的数据
	insert into v_emp_10 (empno,ename,sal,deptno) values(10011,'李四',666,20);
	select * from v_emp_10; //视图中没有，原表中存在
- 往视图中插入一条视图中不可见但是原表中可见的数据 称为数据污染，可以通过 with check option 关键字解决数据污染的问题					/check检查 option选项
	create view v_emp_30 as (select * from emp where deptno=30) with check option;
	insert into v_emp_30 (empno,ename,sal,deptno) values(10012,'王五',555,30);//成功！
	insert into v_emp_30 (empno,ename,sal,deptno) values(10013,'赵六',666,20);//失败！
2. 修改数据  只能修改视图中存在的数据
	update v_emp_10 set comm=comm+1;  //修改成功
	update v_emp_10 set sal=1000 where deptno=20; //修改失败
3. 删除数据 只能删除视图中存在的数据
	delete from v_emp_10 where ename='张三';//成功
	delete from v_emp_10 where ename='James';//失败 视图中不存在
####视图别名
- 如果创建视图的时候子查询使用了别名，则后期对视图进行操作时只能使用别名
	create view v_emp_name as (select ename name,sal from emp);
	select * from v_emp_name where name='王五';//成功
	select * from v_emp_name where ename='王五';//失败
####视图总结
1. 视图是数据库中的对象，代表一段SQL语句，可以理解成一张虚拟表
2. 作用： 重用SQL、 隐藏敏感信息
3. 分类： 简单视图（不包含去重、函数、分组、关联查询，可以进行增删改查）和复杂视图（和简单视图相反，只能查询）
4. 插入数据的数据污染问题 通过with check option解决
5. 修改和删除数据只能操作视图中存在的数据
6. 创建视图起别名的话 后期操作只能使用别名
####约束
- 什么是约束： 约束是给表字段添加的限制条件
####非空约束 not null
- 字段值不能为null 
	create table t1(id int, age int not null);
	-测试：
	insert into t1 values(1,20);//成功
	insert into t1 values(2,null);//失败
####唯一约束 unique
- 字段值不能重复
	create table t2(id int,age int unique);
	-测试：
	insert into t2 values(1,20);//成功
	insert into t2 values(2,20);//失败 数据重复
####默认约束 default
- 给字段设置默认值
	create table t3(id int,age int default 20);
	-测试：
	insert into t3 (id) values (1);  //默认值生效
	insert into t3 values(2,18); 	//默认值不生效
	insert into t3 values(3,null); //默认值不生效	
					/默认约束的字段赋值写null就是null；只有不赋值才是默认值
####主键约束
- 唯一且非空
####外键约束	/看笔记补充，了解即可
- 外键约束：添加外键约束的字段，值可以为null，可以重复，但是不能是关联表中不存在的数据，被关联的数据不能被先删除，被关联的表不能先删除
- 如何使用外键约束
	create database db6 character set utf8;
	1. 创建部门表
		create table dept(id int primary key auto_increment,name varchar(10));
	2. 创建员工表
		create table emp(id int primary key auto_increment,name varchar(10),dept_id int,constraint fk_dept foreign key(dept_id) references dept(id));
	-格式介绍： constraint 约束名 foreign key(外键字段名) references 关联的表名(关联的字段名)
	insert into dept values(null,'神仙'),(null,'妖怪');
		/constraint 约束 foreign 外来的 (foreign country 外国) reference 参考，参照
	-测试：
	insert into emp values(null,'悟空',1);//成功
	insert into emp values(null,'赛亚人',3);//失败
	insert into emp values(null,'赛亚人',null);//成功	/可以给null 给null即这条数据没有外键
	delete from dept where id=1;//失败 因为悟空依赖神仙
	delete from emp where id=1;//成功 删除悟空
	delete from dept where id=1;//成功 因为没有数据依赖神仙
	
- 删除外键约束方式 
	alter table emp drop foreign key fk_dept; 
- 删除主键约束
	
	create table t1(id int primary key);
	alter table t1 drop primary key; //可以删除
	
	create table t2(id int primary key auto_increment);
	alter table t2 drop primary key;//由于主键带自增 不能删除主键 

###索引
- 什么是索引： 索引是数据库中用于提高查询效率的技术，类似于目录
- 为什么使用索引：如果不使用索引，数据会零散的保存在磁盘块中，查询数据需要挨个遍历每一个磁盘块，直到找到数据为止，使用索引后会将磁盘块以树桩结构进行保存，查询数据时会大大降低磁盘块的访问数量，从而提高查询效率。
#####索引是越多越好吗？
- 不是，因为索引会占用存储空间，只针对常用的查询字段创建索引。
#####有索引就一定好吗？
- 如果数据量小，添加索引反而会降低查询效率。	/比如饭店就三个菜，还弄三个菜单。字典就两个字，还弄两条目录
		/什么情况加索引：数据量大的时候加，但是由于每个电脑的执行效率不一样，所以这个量要通过加索引查询和不加索引查询比较时间试出来。
#####导入数据	
1. window系统：		`笔记下载中有数据，通过遍历生成的大量的数据，只为了模拟大量查询，没有其他意义
		source d:/item_backup.sql;
2. linux系统：
		source /home/soft01/桌面/item_backup.sql;
 - 测试 查询title='100'的数据看耗时 1.09
	select * from item2 where title='100';

####如何创建索引
- 格式：create index 索引名 on 表名(字段名(字段长度));
		create index i_item_title on item2(title);

	-再次测试：select * from item2 where title='100'; 耗时0.04

####索引分类(了解)
1. 聚集索引：给表添加主键约束的时候数据库会自动通过主键创建索引，这个索引称为聚集索引。聚集索引的磁盘块中保存数据。
		`这种一般在建表的时候都会给id用主键，查询的时候...where id...这样就是最快的了。
2. 非聚集索引：通过其它字段创建的索引称为非聚集索引。非聚集索引的磁盘块中只保存磁盘块的地址而没有数据（因为数据只需要有一份）
		`数据只在主键那里有一份就可以了。所有的非聚集索引最终都指向聚集索引的数据当中
#####如何查看索引
- show index from item2;
#####如何删除索引
- 格式： drop index 索引名 on 表名;
	drop index i_item_title on item2;
####复合索引
- 通过多个字段创建的索引
- 格式： create index 索引名 on 表名(字段1,字段2);
	create index i_item_title_price on item2(title,price);
####索引总结
1. 索引是用来提高查询效率的技术，类似目录
2. 因为索引会占用存储空间，并非越多越好
3. 因为数据量小时添加索引会降低查询效率，所以不是有索引就一定好
4. 索引分类：聚集索引（添加主键约束会自动创建，磁盘块中保存数据）和非聚集索引（通过其它字段创建的索引，保存地址没有数据）
5. 复合索引，通过多个字段创建的索引称为复合索引
####事务
- 数据库中执行同一业务多条SQL语句的工作单元，可以保证全部执行成功，或全部执行失败
#####事务的ACID特性 是保证事务正确执行的四大基本要素	/解释参看笔记
- Atomicity：原子性，最小不可拆分，保证全部成功全部失败 
- Consistency：一致性，从一个一致状态到另一个一致状态 
- Isolation：隔离性，多个事务之间互不影响 
- Durability：持久性，事务完成后数据提交到数据库中持久生效
####事务相关指令 
- begin：开启事务
- commit：提交事务
- rollback：回滚事务
- savepoint xxx：保存回滚点
- rollback to xxx：回滚到指定的回滚点 
- 查看数据库自动提交状态 	/参看笔记解释		这种方式了解即可，还是begin方便
	show variables like '%autocommit%';
- 修改自动提交的状态  0关闭  1开启
	set autocommit=0/1;

	/以下内容不在课程安排之内，数据库相关的都已经讲完。国斌老师说之前学生面试经常遇到的没学的指令：
###group_concat()		/组连接 concat：连接/合并多个字符串/数组
- 查询员工表每个部门的员工姓名 ，每个部门的名字显示到一行
	select deptno,group_concat(ename) from emp group by deptno;
- 查询员工表每个部门中每个员工的姓名和工资，要求每个部门的信息显示到一行
	select deptno,group_concat(ename,'-',sal) from emp group by deptno;
###面试题
有个学生成绩表student, 字段有 id 主键、name、subject学科、score成绩
	create table student(id int primary key auto_increment,name varchar(10),subject varchar(10),score int);
保存以下数据：
	insert into student (name,subject,score) values ('张三', '语文', 66),('张三', '数学', 77),('张三', '英语', 55),('张三', '体育', 77)('李四','语文',59),('李四','数学',88),('李四','英语' ,78), ('李四', '体育',95),('王五','语文',75),('王五','数学',54),('王五','英语',98), ('王五', '体育',88);
1. 查询每个人的平均分 降序排序
	select name,avg(score) a from student group by name order by a desc;
2. 查询每个人的名字，以及这个人的科目和成绩 要求一行显示
	select name,group_concat(subject,'-',score) from student group by name;
3. 查询每个人的最高分和最低分
	select name,max(score),min(score) from student group by name;
4. 查询每个人不及格的科目及分数 不及格的科目数量
	select name,group_concat(subject,'-',score),count(*) from student where score<60 group by name;


#----------------------------------MySQL.day07_JDBC01-----------------------------------


###JDBC
- 什么是JDBC：Java DataBase Connectivity，Java数据库连接，是一套Sun公司提出的关于数据库连接的接口，里面是一堆和数据库操作相关的方法声明。
- 为什么使用JDBC：如果没有JDBC，Java程序员连接每种数据库都需要学习一套新的api，为了降低Java程序员的学习成本和提供开发效率，Sun公司提出了一套JDBC的接口，各个数据库厂商根据此接口写实现类(驱动),这样Java程序员写一套方法就可以连接各种数据库。
#### 如何使用JDBC 
1. 创建一个Maven工程 
2. 从私服中找到mysql，jar包的坐标 maven.tedu.cn     阿里私服：maven.aliyun.com 
3. 创建类 并写如下代码：

	//1. 注册驱动
		Class.forName("com.mysql.jdbc.Driver");
		//2. 获取连接对象
		Connection conn = 
				DriverManager.getConnection
				("jdbc:mysql://localhost:3306/newdb3", 
						"root", "root");
		System.out.println(conn);
		//3. 创建SQL执行对象
		Statement stat = conn.createStatement();
		//4. 执行SQL语句
		String sql = 
``				"create table if not exists jdbct1"
				+ "(id int primary key auto_increment,"
				+ "name varchar(10))";
		stat.execute(sql);//执行
		System.out.println("执行完成！");
		//5. 关闭资源
		conn.close(); 
####Statment对象
1. execute() 此方法可以执行任意SQL语句，但是推荐执行DDL（数据定义语言）包括：create drop alter truncate, 方法的返回值为布尔值,返回值表示是否有结果集 
2. executeUpdate() 此方法执行增删改的SQL，此方法返回值为整数，表示生效的行数。
3. executeQuery() 此方法执行查询的SQL语句，返回值为结果集ResultSet对象	/ResultSet：结果集
		ResultSet rs = stat.executeQuery(sql);
		//遍历结果集中的数据
		while(rs.next()){
			String name = rs.getString("ename");
			double sal = rs.getDouble("sal");
			System.out.println(name+":"+sal);
		}
		conn.close();

		/ 如果只有一个数据可以这么写：
		rs.next();
			String name = rs.getString("ename");
			double sal = rs.getDouble("sal");
			System.out.println(name+":"+sal);
		两个数据就再写一遍一样的。
		其实都是一回事，所以老师说：记住只要见到ResultSet，就是while循环遍历。固定的这种写法，没有别的写法。只是加个while就不用每次都写xx.next()控制游标了。文档说：最初，光标被置于第一行之前

####数据库类型和Java类型对比
	MySQL         Java
	int           getInt()
	varchar       getString()
	float/double  getFloat()/getDouble()
	datetime/timestamp  getDate()
####ResultSet获取数据的方式
1. 通过查询结果中的字段名获取 rs.getString("ename");
2. 通过查询结果中的字段的位置获取 rg.getString(2);

###读取配置文件
		Properties prop = new Properties();
		//获取文件输入流
		InputStream ips = 
			DBUtils.class.getClassLoader()
				.getResourceAsStream("jdbc.properties");
		//把文件加载到prop对象中
		prop.load(ips); 
		//获取配置文件中的数据 只能得到字符串类型数据
		String name = prop.getProperty("name");
		String age = prop.getProperty("age");
		System.out.println(name+":"+age);

###数据库连接池dbcp
- DBCP： DataBase Connection Pool    /Connection 连接  Pool 池
- 为什么使用数据库连接池：如果不使用连接池，客户端每次请求web服务器都需要和数据库服务器建立连接用完则断开，如果有1万次请求则有一万次连接和断开，频繁开关连接浪费资源，使用数据库连接池，可以将连接重用避免资源的浪费，从而提高效率。
- 如何使用数据库连接池 
1. 从maven私服中搜索 dbcp 的jar包

Demo01:JDBC的基本使用方式
Demo02： 单元测试
Demo03: 增删改查
Demo04: 测试DBUtils类
Demo05: 读取配置文件数据
Demo06： 数据库连接池的使用方式
Demo07: 测试连接池的等待问题


#----------------------------------MySQL.day08_JDBC02-----------------------------------


	草稿：
create table jdbcperson(id int primary key auto_increment,name varchar(10),age int);

	create table jdbcuser(id int primary key 
	auto_increment,username varchar(10),password varchar(10));

	insert into jdbcuser values(null,'libai','admin'),
							   (null,'liubei','123456');

	libai    123
###SQL注入风险的原理
 - 例如：select count(*) from jdbcuser where username='libai' and password='123';
	username和password应当是用户输入的变量
			(sql注入风险：本来变量这里是让写一个值，但是你写进去的是一段sql语句。影响了sql语句原有的逻辑)
	若密码中输入 ' or '1'='1 则sql语句变成了:
	select count(*) from jdbcuser  where username='sdfsdf' and password='' or '1'='1'
	影响了语句的逻辑。而 '1'='1' 是衡等的
		(在命令行的话任何衡等都行,不必须是字符串衡等, 1=1、2=2、or true 也行 但这里代码已经是password='' 在 ' ' 中间插密码，密码就已经规定了是字符串。所以是用两个字符串衡等，而'a'='a'也可以)
	衡等的话where后边的条件就和没加一样 相当于 select count(*) from jdbcuser;而Demo中判断条件是利用查询的count(*)>0,这时如果表中有用户，那count(*)>0 成立，从而绕过认证登录成功。
 - 老师说sql注入风险很容易解决，十年前还可以钻这个漏洞，现在基本不存在。
####我认为：
 - 单在登录的时候，可以让判断条件为count(*)==1,表在创建的时候随便插入两条数据。这样后边再用sql注入的话，count(*)就是>1的，一定不会等于1。之所以插入两条是因为如果初始只插入一条，那也可以注入成功。
 - 而除了登录业务还有很多业务。比如说就是查询信息，返回的count(*)是用来显示符合where条件的个数的；或者要查询的是符合条件的信息，直接select * from xxx... 这时如果绕过了认证，那么所有的*就输出去了。
 - 除此之外还有很多，可以百度 sql注入案例 sql注入原理等深究。

###PreparedStatement解决sql注入风险的原理：
 - 内部代码通过for循环，将字符串参数通过提取每一位上的char字符进行遍历，并通过switch()...case条件语句进行判断，当出现换行符、引号、斜杠等特殊字符时，对这些特殊字符进行转义。此时再插入 ' or '1'='1 经过程序后台进行转义后，真正的sql其实变成了：...password='' or '1'='1' ,显然这样查询出的结果一定为空。

		#####`预编译其实就是在那个位置默认了 '' 一对单引号

####PreparedStatement
- 如果sql语句中需要添加变量时使用PreparedStatment，如果没有变量则可以使用Statement
- 可以避免出现SQL注入风险，因为在预编译的时候已经把SQL语句的逻辑固定。
**原理**，学完成恒讲的#{}/${}知道了，语句的逻辑固定就是说问号的地方只能写值。而不能写语句。

		String sql = "insert into jdbcperson "
					+ "values(null,?,?)";
			PreparedStatement stat = 
					conn.prepareStatement(sql);
			stat.setString(1, name);
			stat.setInt(2, age);
			stat.executeUpdate();
####批量操作
- 为什么使用批量操作：如果不使用批量操作，每次execute方法都需要web服务器和数据库服务进行数据交互，使用批量操作可以把多次交互合并成一次交互，从而提高执行效率

####JDBC中的事务
- 相关方法：		/已经封装好了方法，不用单独地去执行sql语句
conn.setAutoCommit(true/false);
conn.commit();
conn.rollback();
/ 通过这三个执行练习：
程序执行：蝙蝠侠给超人转2000块钱  	/Demo07

create table jdbchero(id int,name varchar(10),money int);
insert into jdbchero values(1,'蝙蝠侠',5000),(2,'超人',10);

####获取自增主键的值
	create table team(id int primary key auto_increment,name varchar(10));
	create table player(id int primary key auto_increment,name varchar(10),team_id int);

步骤：
1. 通过得到的球队名称查询球队表是否有这个名字的球队，如果没有则添加该球队并且得到球队的id ，如果有则直接得到球队的id 不需要再添加球队
2. 往球员表中添加球员，用到上面得到的球队id


###元数据
- 数据库元数据：和数据库相关的信息    / 数据库的驱动版本，数据库连接地址，数据库用户名密码，数据库厂商名称等
- 表的元数据：和表相关的信息    /表中有多少字段，字段名称，字段类型等

	//获取数据库元数据			/元数据还有很多,可以通过get.看到
			DatabaseMetaData dbmd = conn.getMetaData();
			System.out.println("驱动版本"
						+dbmd.getDriverVersion());
			System.out.println("用户名"
					+dbmd.getUserName());
			System.out.println("数据库厂商名称"
					+dbmd.getDatabaseProductName());
			
			Statement stat = conn.createStatement();
			ResultSet rs = 
					stat.executeQuery("select * from emp");
			//得到表相关的元数据
			ResultSetMetaData rsmd = rs.getMetaData();
			//得到表的字段数量
			int count = rsmd.getColumnCount();
			for(int i=0;i<count;i++){
				//得到字段名称和字段类型
				String name = rsmd.getColumnName(i+1);
				String type = rsmd.getColumnTypeName(i+1);
				System.out.println(name+":"+type);
			}

Demo01:复习 DBUtils和增删改查
Demo02和Demo03:  PreparedStatement
Demo04: Statement的批量插入
Demo05：PreparedStatement的批量插入
Demo06: 分页查询
Demo07: 事务转账练习
Demo08: 获取自增主键值
Demo09: 球队球员练习
Demo10: 元数据 


#-------------------------------------------补充----------------------------------------------
##主要补充在成恒老师的MyBatis


###not exists  不存在   &&   if not exists  如果不存在
		day08_JDBC02：Demo01
 - if not exists：如果不存在
		例：create table if not exists jdbct1(id int primary key auto_increment,name varchar(10)  ---如果不存在则建表
 - 可以加子查询，看'###多表查询面试题'-第一题


###primary key()  主键约束的另一种写法
		MYBATIS.DAY01
 - 主键约束也可以在建表的时候这么写：PRIMARY KEY(id)
		例：CREATE TABLE t_user (id INT AUTO_INCREMENT,PRIMARY KEY(id)) DEFAULT CHARSET=utf8;


###多表查询面试题
		青岛某公司招数据库岗位的试题
 - 题目和解题：https://www.cnblogs.com/chendongchun/p/3794631.html
 - 第一题：找出没有选修过“李明”老师讲授课程的所有学生姓名
		- 他用的是等值连接，我们几乎没用过。作用和内连接一样
		- 子查询可以这么写：SELECT sname 学生姓名 FROM S Where Not Exists (select * from S JOIN SC ON s.sno=sc.sno JOIN C ON c.cno=sc.cno WHERE cteacher='李明');
		 	或：SELECT sname 学生姓名 from s where sno not in (select sno from c join sc on c.cno=sc.cno where cteacher='李明');
 - 第二题：列出有二门以上(含两门)不及格课程的学生姓名及其平均成绩
		- 网上写的不好。
		- 内连接写法：
		select 
			s.sname 学生姓名,avg(sc.scgrade) 平均成绩 
		from 
			s join sc on s.sno=sc.sno 
		where 
			s.sno in (select sc.sno from sc where sc.scgrade<60 group by sc.sno having count(*)>=2)
			子查询的意思是：根据学号查询sc表中有两条以上 成绩低于60 的数据的学号
		group by s.sname;
		因为主查询用了聚合函数(平均成绩)，所以这里还要根据学生分组


#----------------------------------------------------工作---------------------------------------------------------


##2019-08-12MySQL存储过程
 - 过程有自己的类型限定：三种类型
	1. in:数据只是从外部传入内部使用（值传递）；**可以是数值，也可以是变量**
	2. out:只允许过程内部使用（不用外部数据），给外部使用的（引用传递，外部的数据会被先清空才会进入到内部），**只能是变量**
	3. inout:外部可以在内部使用，内部修改也可以给外部使用；典型的引用传递，**只能是变量**
###MySQL建立存储过程要用DELIMITER
 - mysql建立存储过程要用DELIMITER
	但是只有在用语句写存储过程的时候才需要用，目的是避免存储过程语句提前结束(存储过程里分号;太多，sql遇到分号;就会开始执行语句)。如果是在Navicat里右击创建过程，就不用写了。
 - 网上解释
	1-delimiter就是告诉mysql解释器，该段命令是否已经结束了，是否可以执行了。
	2-delimiter是mysql定义结束标记的，在mysql客户端中结束标记默认是分号（；）。
		如果一次输入的语句较多，并且语句中间有分号，这时需要新指定一个特殊的结束符。
		delimiter // 表示mysql用//表示mysql语句结束，过程结束后肯定会有一句：
		delimiter ；
		恢复成默认的。

##2019-08-12MySQL将查询字段值赋值给变量
	已发布到CSDN
 - 写法为(必须@开头，不必须提前使用set声明)
	参考: https://www.cnblogs.com/EasonJim/p/7966918.html
	select @xxx:=username from t1;
	select @xxx;
###:=和=的区别
	https://www.cnblogs.com/jpfss/p/9140622.html
 - = 
	只有在set和update时才是和:=一样，赋值的作用，其它都是等于的作用。鉴于此，用变量实现行号时，必须用:=
 - := 
	不只在set和update时时赋值的作用，在select也是赋值的作用。
 - 如果明白了=和:=的区别，那么也就理解了下边的现象。 
	- @num:=@num+1,:=是赋值的作用
		所以，先执行@num+1,然后再赋值给@num，所以能正确实现行号的作用。 
	- @num=@num+1,此时=是等于的作用，
		@num不等于@num+1，所以始终返回0，如果改为@num=@num,始终返回1了。(mysql数据库中，用1表示真，0表示假。) 

##2019-08-12MySQL动态sql的批处理
 - 已发布到CSDN，需要注意的是：动态Sql不能进行批处理。一次动态sql只能执行一条语句


##存储过程实例
 - SQLServer 海克斯康 [hexagon_callcenter] ：getLargeScreenOne
	多个子查询封装成临时表
 - SQLServer 青啤 [Grs_qingpiTest2018] ：Mi_RepeatedReminder
	游标遍历
 - MySQL 城阳民政 [lenos] ：global_info
	动态sql