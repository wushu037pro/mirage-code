
#------------------------------------PROJECT.DAY01--------------------------------------
###工程：store

### 1. 项目开发流程

关于项目的开发，首先应该确定需要处理的数据有哪些：商品，用户，收藏，订单，购物车，商品分类，收货地址……

然后，确定这些数据的开发、管理的先后顺序，因为某些数据是必须建立在其它数据基础之上的，例如必须先有用户数据，才可以有订单数据或收货地址数据，另外，不同的数据功能，开发的难度也有差异，应该尽可能的先开发简单的、熟悉的数据功能，然后再开发相对较难的数据功能，所以，以上数据的**开发顺序**大概可以是：用户`(基础)` > 收货地址`(只基于用户数据)` > 商品分类 > 商品`(基于商品分类)` > 收藏 > 购物车 > 订单`(基于全部)`……
		`收藏和购物车差不多，会做购物车肯定会做收藏

每种类型的**数据的处理**，都应该**遵循：增 > 查 > 删 > 改。**
		先有数据才能查删改，先查询出来给用户看才能删和改，删比改更好做，所以这个顺序。

每个**功能的处理**，应该：持久层 > 业务层 > 控制器层 > 界面。
		调用顺序：Controller > Service > Mapper  所以开发顺序倒过来。

**核心原则：一次只解决一个问题！**	
		别一下考虑太多点，一点一点地拆分处理。

### 2. 用户-注册-持久层

**关于持久层，应该先检查有没有对应的数据库/表，及对应的实体类。**

关于数据库：

	CREATE DATABASE tedu_store;

	USE tedu_store;

关于数据表：

	CREATE TABLE t_user (
		uid INT AUTO_INCREMENT COMMENT '用户id',
		username VARCHAR(20) UNIQUE NOT NULL COMMENT '用户名',
		password CHAR(32) NOT NULL COMMENT '密码',				`长度涉及后面学的加密`
		salt CHAR(36) COMMENT '盐',								`涉及加密`
		gender INT COMMENT '性别，0-女，1-男',
		avatar VARCHAR(50) COMMENT '头像',						`头像其实给的是网址，长度50差不多，100也行`
		phone VARCHAR(20) COMMENT '手机号码',
		email VARCHAR(30) COMMENT '电子邮箱',
		is_delete INT COMMENT '是否已删除，0-未删除，1-已删除',

		created_user VARCHAR(20) COMMENT '创建者',				`原原本本地存(名字)，不用关联id的方法，因为这是日志数据(历史数据)`
		created_time DATETIME COMMENT '创建时间',
		modified_user VARCHAR(20) COMMENT '修改者',
		modified_time DATETIME COMMENT '修改时间',
		PRIMARY KEY(uid)
	) DEFAULT CHARSET=UTF8;
		软件系统为了规范地去使用并且分析错误，会有日志，日志把所有的操作都记录下来，便于查看数据是哪一天变化的，从而分析问题。 后四个字段是为了记录日志。

然后，下载本次项目`store.zip`，解压到Workspace中，通过Import > Existing Maven Projects导入项目。

由于以上数据表中**关于日志的4个字段**是后续每张表都应该有的，则后续的每张表对应的实体类中也应该有4个对应的属性，所以，应该创建实体类的基类来封装这4个字段对应的属性，且，当前项目中的所有实体类都应该继承自该基类：
`	`**父类=基类**
	/**
 	* 实体类的基类
 	* 		用来被继承，所以加abstract作为抽象类
 	* 		且直接在这里实现序列化接口，就不用再每创建一个
 	* 		实体类都实现接口(但依然要添加序列化版本ID)。
	 */
	public abstract class BaseEntity implements Serializable {
	
		private static final long serialVersionUID = -6185124879935579311L;
		
		private String createdUser;
		private Date createdTime;
		private String modifiedUser;
		private Date modifiedTime;

		// SET/GET ...

	}

创建与数据表对应的实体类`cn.tedu.store.entity.User`：

	/**
	 * 用户数据的实体类
	 */
	public class User extends BaseEntity {
	
		private static final long serialVersionUID = 8777086855777796877L;
	
		private Integer uid;
		private String username;
		private String password;
		private String salt;
		private Integer gender;
		private String avatar;
		private String phone;
		private String email;
		private Integer isDelete;

		// SET/GET ...
	}

**持久层的开发重点应该分为3个步骤：**

**1. 分析当前功能所需要执行的SQL语句**

当前执行“注册”功能，必然需要执行插入数据操作：

	INSERT INTO t_user (
		username, password ... modified_time
	) VALUES (
		?, ?, ... ?
	)

为了保证“用户名唯一”，还应该有“根据用户名查询数据”的操作：

	SELECT 
		uid 
	FROM 
		t_user 
	WHERE 
		username=?

**2. 创建接口（如果必要的话），并设计抽象方法**

创建`cn.tedu.store.mapper.UserMapper`接口文件，并在其中添加抽象方法：

	/**
	 * 处理用户数据的持久层接口
	 */
	public interface UserMapper {
	
		/**
		 * 插入用户数据
		 * @param user 用户数据
		 * @return 受影响的行数
		 */
		Integer addnew(User user);
	
		/**
		 * 根据用户名查询用户信息
		 * @param username 用户名
		 * @return 匹配的用户数据，如果没有匹配的数据，则返回null
		 */
		User findByUsername(String username);
	}

**3. 在XML中配置抽象方法的映射**

在`src/main/resources`下创建`mappers`文件夹，然后复制此前的项目得到`UserMapper.xml`，配置好该文件中根节点的`namespace`对应的接口，然后，再配置以上2个抽象方法对应的映射：

	<mapper namespace="cn.tedu.store.mapper.UserMapper">
	
		<!-- 插入用户数据 -->
		<!-- Integer addnew(User user) -->
		<insert id="addnew">
		INSERT INTO t_user (
		    username, password,
		    salt, gender,
		    phone, email,
		    avatar, is_delete,
		    created_user, created_time,
		    modified_user, modified_time
		) VALUES (
		    #{username}, #{password},
		    #{salt}, #{gender},
		    #{phone}, #{email},
		    #{avatar}, #{isDelete},
		    #{createdUser}, #{createdTime},
		    #{modifiedUser}, #{modifiedTime}
		)
		</insert>
	
		<!-- 根据用户名查询用户信息 -->
		<!-- User findByUsername(String username) -->
		<select id="findByUsername"
			resultType="cn.tedu.store.entity.User">
			SELECT 
				uid 
			FROM 
				t_user 
			WHERE 
				username=#{username}
		</select>
	
	</mapper>

**注意**：此次并没有在接口文件之前添加`@Mapper`注解，由于这个注解是添加在接口之前的，则项目中可能出现的多个持久层接口都需要添加该注解，管理起来比较麻烦，所以，改为**在执行程序**`StoreApplication`之前添加`@MapperScan("cn.tedu.store.mapper")`**注解**，以指定持久层接口所在的包，则后续每个持久层接口都不必再添加`@Mapper`注解。

最后，在`src/test/java`下，创建`cn.tedu.store.mapper.UserMapperTestCase`测试类：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class UserMapperTestCase {
	
		@Autowired
		private UserMapper mapper;
		
		@Test
		public void addnew() {
			User user = new User();
			user.setUsername("root");
			user.setPassword("1234");
			Integer rows = mapper.addnew(user);
			System.err.println("rows=" + rows);
		}
		
		@Test
		public void findByUsername() {
			String username = "root";
			User user = mapper.findByUsername(username);
			System.err.println(user);
		}
		
	}

### 3. 用户-注册-业务层

**业务层的开发通常也是3个步骤来完成！**

**1. 规划异常**

业务层中的方法的返回值，仅以操作成功为标准，判断是否需要返回某种数据。

由于返回值并不体现操作成功与否，则还需要考虑失败的情况，并抛出对应的异常，通常，**建议自定义异常，针对不同的操作错误（操作失败的原因）抛出不同的异常**，并且，这些异常**都应该继承**自`RuntimeException`（原因后续再讲）。实际做法是自定义`ServiceException`，是继承自`RuntimeException`的，而其它自定义的异常都继承自`ServiceException`：
`		`**原因**：原话：这样的话处理异常就写@ExceptionHandler(ServiceException.class),不然如果写RuntimeException.class会范围太大。范围不应该那么大，因为我们只处理自己抛出的异常，先定义ServiceException的话比如空指针异常就不会被自定义异常处理。

所以，应该先创建`cn.tedu.store.service.ex.ServiceException`
	/**
	 * 业务异常，当前项目中自定义异常类的基类     `生成父类的五个构造方法
	 */
	public class ServiceException extends RuntimeException {
	
		private static final long serialVersionUID = 980104530291206274L;
	
		public ServiceException() {
			super();
		}
	
		public ServiceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
			super(message, cause, enableSuppression, writableStackTrace);
		}
	
		public ServiceException(String message, Throwable cause) {
			super(message, cause);
		}

		//最常用的是这个构造方法：用来在new的时候写错误描述
		public ServiceException(String message) {
			super(message);
		}
	
		public ServiceException(Throwable cause) {
			super(cause);
		}
	
	}

然后，本次的“注册”功能可能抛出“用户名被占用”和“插入数据失败”错误，则需要创建对应的异常`UserConflictException`和`InsertException`以备抛出。
`		`可能存在各种各样的原因导致‘查入数据失败’，因为程序运行Tomcat服务器，mysql运行在另外一台服务器，两个服务器各自或者交互过程中都可能会发生各种各样的原因。

**2. 在业务层接口中声明抽象方法**

在业务层中声明的方法是被控制器层（Controller）调用的，且在实现业务层功能时，需要调用持久层对象中的方法，所以，在参数方面，应该是**承上启下**的，即：能满足调用和被调用的需求。`业务层中的方法的返回值，仅以操作成功为标准，判断是否需要返回某种数据。`

创建业务层接口`cn.tedu.store.service.IUserService`接口，并添加抽象方法：

	void reg(User user) `注册`
		throws UserConflictException, InsertException;

**3. 实现接口中的抽象方法**

创建`cn.tedu.store.service.impl.UserServiceImpl`类，实现`IUserService`接口，在**类中声明持久层对象**`@Autowired private UserMapper userMapper;`，在类之前添加`@Service`注解：
`		`原因：业务层调用持久层，所以声明持久层对象，这样才能调用持久层完成对应的功能；同时保证这个类让Spring管理，创建出对象，所以加@service注解

	@Service
	public class UserServiceImpl
		implements IUserService {
		
		@Autowired
		private UserMapper userMapper;
	
		@Override
		public void reg(User user) throws UserConflictException, InsertException {
			// TODO Auto-generated method stub
			
		}
	
	}

**通常，应该把持久层中声明的抽象方法复制到业务层的实现类中(复制只为保证方法名统一，好识别。)，并且通过持久层对象直接调用来实现方法的功能，这些方法应该是私有的，如果是查询类的方法，应该直接返回调用持久层方法的返回结果，如果是增删改的方法，应该将方法的返回值修改为`void`，并且，在方法体中，判断调用时的返回结果，如果结果不符合预期，则抛出异常。**
`		`私有的原因是这些方法一定要从本类走，被本类的reg方法调用，进行一系列用户名是否重复等判断。避免被别的类调用导致程序崩掉。
基于以上原则，应该在业务层的实现类中添加：

	/**
	 * 插入用户数据
	 * @param user 用户数据
	 * @return 受影响的行数
	 */
	private void addnew(User user) {
		Integer rows = userMapper.addnew(user);
		if (rows != 1) {
			throw new InsertException("增加用户数据时出现未知错误！请联系系统管理员！");
		}
	}

	/**
	 * 根据用户名查询用户信息
	 * @param username 用户名
	 * @return 匹配的用户数据，如果没有匹配的数据，则返回null
	 */
	private User findByUsername(String username) {
		//查询方法，直接返回调用持久层方法的返回结果
		return userMapper.findByUsername(username);
	}

然后，**重写接口中定义的抽象方法**，在编写时，应该**先分析过程**，然后再编写代码：

	@Override
	public void reg(User user) throws UserConflictException, InsertException {
		// 根据user.getUsername()获取用户名匹配的数据
		// 检查数据是否为null
		// 是：为null，用户名未被占用，则应该补全参数中的属性值
		// - 1. 密码加密，并封装
		// - 2. 封装salt
		// - 3. 封装isDelete，固定为0
		// - 4. 封装4项日志数据
		// - 执行注册：addnew(user)
		// 否：非null，用户名被占用，则抛出UserConflictException
	}

分析完成，**编写**可以完成的部分的代码（暂不包括密码加密与salt的处理）：
`		`//TODO ：暂时不写的代码加一个//TODO，右边滚动条方便会出现蓝色小方块，左边有小本本，鼠标悬停有提示，并且点击可以直接跳过去。用来提醒这里的代码还没有写。
	@Override
	public void reg(User user) throws UserConflictException, InsertException {
		// 根据user.getUsername()获取用户名匹配的数据
		String username = user.getUsername();
		User data = findByUsername(username);
		// 检查数据是否为null
		if (data == null) {
			// 是：为null，用户名未被占用，则应该补全参数中的属性值
			// TODO - 1. 密码加密，并封装
			// TODO - 2. 封装salt
			// - 3. 封装isDelete，固定为0
			user.setIsDelete(0);
			// - 4. 封装4项日志数据
			Date now = new Date();
			user.setCreatedTime(now);
			user.setModifiedTime(now);
			user.setCreatedUser(username);
			user.setModifiedUser(username);
			// - 执行注册：addnew(user)
			addnew(user);
		} else {
			// 否：非null，用户名被占用，则抛出UserConflictException
			throw new UserConflictException(
				"注册失败！您尝试注册的用户名(" + username + ")已经被占用！");
		}
	}

完成后，仍编写对应的**单元测试**：
		`package cn.tedu.store.service;
	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class UserServiceTestCase {
		
		@Autowired
		private IUserService service;
		
		@Test
		public void reg() {
			try {
				User user = new User();
				user.setUsername("admin");
				user.setPassword("8888");
				user.setPhone("13800138001");
				user.setEmail("admin@tedu.cn");
				user.setGender(1);
				user.setAvatar("http://www.tedu.cn/logo.png");
				service.reg(user);
				System.err.println("OK.");
			} catch (ServiceException e) {
				System.err.println(e.getMessage());
			}
		}
	
	}




### 4. 用户-注册-控制器层

### 5. 用户-注册-界面


#------------------------------------PROJECT.DAY02--------------------------------------
###工程：store

### 【续】 3. 用户-注册-业务层

在业务层的实现类中添加加密方法，基于密码的原文和盐值，执行加密，得到密文：

	/**
	 * 使用MD5算法执行密码加密
	 * @param password 密码原文
	 * @param salt 盐值
	 * @return 加密后的密文
	 */
	private String getMd5Password(
			String password, String salt) {
		// 加密规则
		// 1. 将盐值添加到原文的左侧
		// 2. 执行加密10次
		String str = salt + password;
		for (int i = 0; i < 10; i++) {
			str = DigestUtils
					.md5DigestAsHex(str.getBytes())
					.toUpperCase();
		}
		return str;
	}

然后，在注册过程中，执行加密，并把加密后的密文和盐值封装到user中，以备增加数据：

	// - 1. 密码加密，并封装
	String salt = UUID.randomUUID().toString().toUpperCase();
	String md5Password
				= getMd5Password(user.getPassword(), salt);
	user.setPassword(md5Password);
	// - 2. 封装salt
	user.setSalt(salt);

至此，业务层完成。

### 4. 用户-注册-控制器层

**1. 统一处理异常**

由于调用的业务层方法可能抛出异常，则控制器层应该进行捕获处理，推荐使用SpringMVC提供的统一处理异常的方法，即：使用`@ExceptionHandler`注解处理异常的方法。

处理异常的方法只作用于当前类，为了统一处理，应该先创建控制器类的基类，并且在基类中处理异常，从而实现所有的其它控制器类都相当于已经处理过异常，而不必关心“操作失败”的情况。所以，先创建响应结果的类型`ResponseResult`类：

	/**
	 * 响应结果类型
	 * @param <T> 服务器向客户端响应的数据的类型
	 */
	public class ResponseResult<T> implements Serializable {
	
		private static final long serialVersionUID = -1626793180717240861L;
	
		private Integer state;
		private String message;
		private T data;

		// SET/GET ...

	}

然后，创建控制器类的基类，统一处理异常：
	此基类不必加@controller注解，因为他将被其他控制器继承，不会被单独使用，不用被spring管理(甚至不放在根包下也可以)。
	/**
	 * 控制器类的基类
	 */
	public class BaseController {
		
		@ExceptionHandler(ServiceException.class)
		public ResponseResult<Void>
			handleException(Exception e) {
			// 声明返回对象
			ResponseResult<Void> rr = new ResponseResult<Void>();
			// 在返回对象封装错误提示的文字
			rr.setMessage(e.getMessage());
			
			// 根据异常的不同，返回的错误代码也不同
			if (e instanceof UserConflictException) {
				// 400-用户名冲突
				rr.setState(400);
			} else if (e instanceof InsertException) {
				// 500-插入数据异常
				rr.setState(500);
			}
			
			// 返回
			return rr;
		}
	
	}

然后，创建处理用户数据请求的控制器类：

	/**
	 * 处理用户数据请求的控制器类
	 */
	@RestController
	@RequestMapping
	public class UserController
		extends BaseController {
		
		@Autowired
		private IUserService userService;
	
	}

**2. 设计请求**

	请求路径：/users/reg
	请求参数：User
	请求类型：POST
	响应数据：ResponseResult<Void>

**3. 处理请求**

由于请求路径设计为`/users/reg`，则应该在类的`@RequestMapping`注解中配置`users`。

由于控制器类中只需要关注“操作正确”，且操作正确时可以不向客户端反馈message，所以，在响应结果的类型中添加新的构造方法用于快速创建“操作正确”时的响应结果：

	public ResponseResult(Integer state) {
		super();
		this.state = state;
	}

同时，为了使得代码的可读性更高，在基类中添加常量表示操作正确时的代码：

	/**
	 * 处理请求时，用于表示操作正确的代码
	 */
	public static final int SUCCESS = 200;

然后，在控制器类中添加处理请求的方法：

	@PostMapping("reg")
	public ResponseResult<Void> handleReg(User user) {
		userService.reg(user);
		return new ResponseResult<Void>(SUCCESS);
	}

关于控制器层的测试，可以与此前相同，编写单元测试，也可以通过浏览器进行测试，如果使用后者，应该先将`@PostMapping`调整为`@GetMapping`或`@RequestMapping`，然后在浏览器的地址栏中输入例如`http://localhost:8080/users/reg?username=rest&password=1234`，如果测试没有问题，再将`@PostMapping`设置回来。

### 5. 用户-注册-界面

（待补）

### 6. 用户-登录-持久层

**关于持久层，应该先检查有没有对应的数据库/表，及对应的实体类。**

已存在，无须再创建。

**1. 分析当前功能所需要执行的SQL语句**

	SELECT 
		uid, username, password, salt, is_delete
	FROM 
		t_user
	WHERE 
		username=?

**2. 创建接口（如果必要的话），并设计抽象方法**

对应的功能已经完成，无须再次开发！

**3. 在XML中配置抽象方法的映射**

将已经存在的查询的SQL语句所查询的字段列表修改为`uid, username, password, salt, is_delete`，且`is_delete`需要自定义别名：

	<!-- 根据用户名查询用户信息 -->
	<!-- User findByUsername(String username) -->
	<select id="findByUsername"
		resultType="cn.tedu.store.entity.User">
		SELECT 
			uid, username, 
			password, salt, 
			is_delete AS isDelete
		FROM 
			t_user 
		WHERE 
			username=#{username}
	</select>

由于对现有的方法和其它代码进行了调整，所以，完成后，还是应该是执行单元测试。

### 7. 用户-登录-业务层

**1. 规划异常**

用户登录时，可能会出现“用户名不存在”、“密码错误”、“用户数据已被删除”这几种错误，则应该创建与之匹配的异常类：`UserNotFoundException`、`PasswordNotMatchException`，这2个异常都应该继承自`ServiceException`。

**2. 在业务层接口中声明抽象方法**

	User login(String username, String password)
		throws UserNotFoundException, PasswordNotMatchException;

**3. 实现接口中的抽象方法**

	public User login(String username, String password)
		throws UserNotFoundException, PasswordNotMatchException {
		// 根据username查询用户数据
		// 判断用户数据是否为null
		// 是：为null，即用户数据不存在，则抛出UserNotFoundException
		// 否：非null，即用户数据存在，判断是否已删除：isDelete.eqauls(1)
		// -- 是：已删除，则抛出UserNotFoundException
		// -- 否：未删除，先取出salt
		// -- 将参数password结合salt执行加密
		// -- 判断密码是否匹配
		// -- -- 是：先将查询到的用户数据中的password和salt属性设置为null再返回
		// -- -- 否：则抛出PasswordNotMatchException
	}

实现以上代码：

	@Override
	public User login(String username, String password) throws UserNotFoundException, PasswordNotMatchException {
		// 根据username查询用户数据
		User data = findByUsername(username);
		// 判断用户数据是否为null
		if (data == null) {
			// 是：为null，即用户数据不存在，则抛出UserNotFoundException
			throw new UserNotFoundException("登录失败！用户名不存在！");
		}
		
		// 否：非null，即用户数据存在，判断是否已删除：isDelete.eqauls(1)
		if (data.getIsDelete().equals(1)) {
			// 是：已删除，则抛出UserNotFoundException
			throw new UserNotFoundException("登录失败！用户名不存在！");
		}
				
		// 否：未删除，先取出salt
		String salt = data.getSalt();
		// 将参数password结合salt执行加密
		String md5Password 
			= getMd5Password(password, salt);
		// 判断密码是否匹配
		if (data.getPassword().equals(md5Password)) {
			// 是：先将查询到的用户数据中的password和salt属性设置为null再返回
			data.setPassword(null);
			data.setSalt(null);
			data.setIsDelete(null);
			return data;
		} else {
			// 否：则抛出PasswordNotMatchException
			throw new PasswordNotMatchException("登录失败！密码错误！");
		}
	}

完成后，在`UserServiceTestCase`中编写测试方法，以执行单元测试：

	@Test
	public void login() {
		try {
			String username = "chengheng";
			String password = "8888";
			User user = service.login(username, password);
			System.err.println(user);
		} catch (ServiceException e) {
			System.err.println(e.getMessage());
		}
	}

### 8. 用户-登录-控制器层

**1. 统一处理异常**

此次业务层开发后，产生了2种新的异常：`UserNotFoundException`和`PasswordNotMatchException`，则应该在`BaseController`中对这2种异常进行处理！由于处理异常的方法已经存在，所以，只需要产生2个新的分支即可：

	// 根据异常的不同，返回的错误代码也不同
	if (e instanceof UserConflictException) {
		// 400-用户名冲突
		rr.setState(400);
	} else if (e instanceof UserNotFoundException) {
		// 401-用户数据不存在的异常
		rr.setState(401);
	} else if (e instanceof PasswordNotMatchException) {
		// 402-验证用户密码失败的异常
		rr.setState(402);
	} else if (e instanceof InsertException) {
		// 500-插入数据异常
		rr.setState(500);
	}

**2. 设计请求**

	请求路径：/users/login
	请求参数：username(*), password(*)
	请求类型：POST
	响应数据：ResponseResult<User>

**3. 处理请求**

	@PostMapping("login")
	public ResponseResult<User> handleLogin(
		@RequestParam("username") String username,
		@RequestParam("password") String password) {
		User user = userService.login(username, password);
		return new ResponseResult<User>(SUCCESS, user);
	}

编写完成后，仍应该执行单元测试。

### 作业

1. 检查代码是否都排版了；
2. 检查是否添加了必要的注释；
3. 下载前端页面的压缩包，解压后，将5个文件夹复制到项目的static中；
4. 尝试完成注册和登录的前端交互，即通过AJAX技术实现注册和登录；
5. 思考如何开发“修改密码”。

### 【附】 密码加密
		`test/DigestTestCase：摘要示例
将密码直接使用原文存储是非常不安全的，应该使用某种算法进行加密后再存储。

普通的加密算法都是可以逆运算的，如果能够得到加密过程中的所有参数，就可以将密码逆运算得到原文，所以，使用普通的加密算法并不能防止内部泄密这样的问题。

在密码的加密处理中，更推荐使用**消息摘要算法**，因为消息摘要算法都是**不可被逆运算**的！
		`就算知道算法，也不可以被逆运算回去。
**消息摘要算法的主要特征**有：
- 原文相同，则摘要相同；
- 原文不同，则摘要几乎不会相同；
- 算法不变，摘要长度不变。
`	`**本质区别：摘要算法不是加密算法**，因为加密算法都是可以被逆运算的。大家只是利用了摘要算法的不可逆运算的特点，应用到加密领域。

消息摘要算法主要有MD(Message Digest)系列和SHA(Secure Hash Algorithm)系列。
		MD系列有MD2，MD4，MD5 (没有3)；SHA系列有SHA-128，SHA-256，SHA-384，SHA-512  (数字表示的是位，除以4就是数据的位数)

关于密码的**破解**，首先，摘要算法的“破解”指的并不是根据密文逆向运算得到原文，而**是指的摘要算法的碰撞**`(不同的原文对应相同的摘要)`，所以，关于MD5等摘要算法的破解其实是存在的，但是，仍没有某个公式可以实现在知晓密文的情况下，直接得到可以产生该密文的原文。

另外，也有许多“在线破解”站点，输入摘要数据，可能会得到原文，这些站点的做法基本上都是记录了许多原文与摘要数据的**对应关系**，当尝试“破解”时，本质上是根据摘要查询原文的做法，所以，并不能保证一定得到原文。
		www.cmd5.com
正因为有被穷举破解的可能，所以，为了提高密码的安全性，使之不容易被破解或被推导出原文，常用的做法：
1. 增加原密码的强度（长度、组成字符的类型）；
2. 多重加密；
		将第一次加密的摘要数据再次加密。
3. **加盐**；
		盐是一个很普通的字符串，盐和原文使用某种方式交叉，比如拼接，使盐在整个加密过程中参与进来。
			1.相同的密码加不同的盐得到的摘要不一样。(比如不同的公司加的盐不一样，加密之后得到的摘要就不一样，会更安全：假如一家公司泄密了，不会被推测出其他的密码)
			2.使原始密码变的更加复杂,增加了密码强度。
		我们以UUID作为盐，看我的笔记'##UUID'-----随机盐
4. 将以上做法综合应用。

### 【附】 RESTful

使用RESTful风格的URL应该是：

	/api/v1/resources/id/command

其中，`/api/v1`并不是必须的，只是用于标记该URL是服务器端提供的接口，且是第1版。

`resources`表示要访问的资源，也可以理解为要访问的数据，每个软件系统中都应该有各种各样的数据，例如用户、订单、积分等等，则此处应该是`users`、`orders`、`score`等等。

`id`并不是必须的，如果没有id，通常表示访问该类型的所有数据，例如`/api/v1/users`默认表示访问所有用户的信息，如果添加了`id`，则表示访问指定`id`的那个用户的信息。

`commond`表示需要执行的任务，例如`delete`可以表示删除数据等。

整个URL中应该使用小写字母、数字、下划线来设计每个部分，并不推荐使用大写字母。
	
使用RESTful风格推荐用于设计api，而不是在浏览器的地址栏中输入的网址。


#------------------------------------PROJECT.DAY03--------------------------------------


### 【补】 5. 用户-注册-界面

下载前端页面的压缩包，解压后，将5个文件夹复制到项目的static中，在`web/register.html`的最后添加：

	<script type="text/javascript">
	$("#btn-reg").click(function() {
		var url = "/users/reg";
		var data = $("#form-reg").serialize();
		$.ajax({
			"url": url,
			"data": data,
			"type": "POST",
			"dataType": "json",
			"success": function(json) {
				if (json.state == 200) {
					alert("注册成功！");
					location.href = "login.html";
				} else {
					alert(json.message);
				}
			}
		});
	});
	</script>

另外，需要检查“注册”按钮的id、整个表单的id是否与以上代码中使用的id保持一致，还需要检查表单控件（例如各输入框）的name属性值是否与服务器端要求的参数名称保持一致。

### 9. 用户-登录-界面

开发过程同上，相关代码为：

	<script type="text/javascript">
	$("#btn-login").click(function() {
		var url = "http://localhost:8080/users/login";
		var data = $("#form-login").serialize();
		$.ajax({
			"url": url,
			"data": data,
			"type": "POST",
			"dataType": "json",
			"success": function(json) {
				if (json.state == 200) {
					alert("登录成功！");
					// location.href = ?;
				} else {
					alert(json.message);
				}
			}
		});
	});
	</script>

### 10. 用户-修改密码-持久层

**1. 分析当前功能所需要执行的SQL语句**

关于更新密码，可以是：

	UPDATE 
		t_user
	SET 
		password=?,
		modified_user=?,
		modified_time=?
	WHERE 
		uid=?

后续，将基于“先验证原密码再更新密码”，所以，还应该执行查询操作：

	SELECT 
		username, salt, password, is_delete AS isDelete
	FROM 
		t_user 
	WHERE 
		uid=?

即：先根据用户id找出TA的盐值，与TA输入的原密码结合起来加密，并将加密结果与查询出来的数据库的密码进行对比，如果一致，则允许修改密码。

**2. 创建接口（如果必要的话），并设计抽象方法**

	User findByUid(Integer uid);

	Integer updatePassword(
		@Param("uid") Integer uid, 
		@Param("password") String password, 
		@Param("modifiedUser") String modifiedUser, 
		@Param("modifiedTime") Date modifiedTime);

**3. 在XML中配置抽象方法的映射**

	<!-- 更新用户的密码 -->
	<!-- Integer updatePassword(
	    @Param("uid") Integer uid, 
	    @Param("password") String password, 
	    @Param("modifiedUser") String modifiedUser, 
	    @Param("modifiedTime") Date modifiedTime) -->
	<update id="updatePassword">
		UPDATE 
		    t_user
		SET 
		    password=#{password},
		    modified_user=#{modifiedUser},
		    modified_time=#{modifiedTime}
		WHERE 
		    uid=#{uid}
	</update>

	<!-- 根据用户id查询用户信息 -->
	<!-- User findByUid(Integer uid) -->
	<select id="findByUid"
		resultType="cn.tedu.store.entity.User">
		SELECT 
			username, 
			password, salt, 
			is_delete AS isDelete
		FROM 
			t_user 
		WHERE 
			uid=#{uid}
	</select>

完成后，在`UserMapperTestCase`中编写单元测试：

	@Test
	public void updatePassword() {
		Integer uid = 3;
		String password = "1234";
		String modifiedUser = "Admin";
		Date modifiedTime = new Date();
		Integer rows 
			= mapper.updatePassword(
				uid, password, modifiedUser, modifiedTime);
		System.err.println("rows=" + rows);
	}

	@Test
	public void findByUid() {
		Integer uid = 3;
		User user = mapper.findByUid(uid);
		System.err.println(user);
	}

### 11. 用户-修改密码-业务层

**1. 规划异常**

在执行修改密码时，应该先查询用户的相关信息（例如盐、原密码等），可能存在`UserNotFoundException`。

需要先验证用户的原密码，可能存在`PasswordNotMatchException`。

最后，在执行过程中，可能存在更新数据异常，则会有`UpdateException`。

所以，需要创建新的异常类：`UpdateException`。

**2. 在业务层接口中声明抽象方法**

	void changePassword(
		Integer uid, String oldPassword, String newPassword) 
			throws UserNotFoundException, 
				PasswordNotMatchException, 
				UpdateException;

**3. 实现接口中的抽象方法**

首先，应该先将持久层的方法在业务层调整为私有方法并实现：

	/**
	 * 更新用户的密码
	 * @param uid 用户的id
	 * @param password 新密码
	 * @param modifiedUser 修改执行人
	 * @param modifiedTime 修改时间
	 */
	private void updatePassword(
		Integer uid, String password, 
		String modifiedUser, Date modifiedTime) {
		Integer rows = userMapper.updatePassword(uid, password, modifiedUser, modifiedTime);
		if (rows != 1) {
			throw new UpdateException("更新密码时出现未知错误！");
		}
	}

	/**
	 * 根据用户id查询用户信息
	 * @param uid 用户id
	 * @return 匹配的用户数据，如果没有匹配的数据，则返回null
	 */
	private User findByUid(Integer uid) {
		return userMapper.findByUid(uid);
	}

然后，规划接口中的抽象方法的实现：

	public void changePassword(
		Integer uid, String oldPassword, String newPassword) 
			throws UserNotFoundException, 
				PasswordNotMatchException, 
				UpdateException {
		// 根据uid查询用户信息
		// 判断查询结果是否为null
		// 是：用户数据不存在，抛出UserNotFoundException
		
		// 判断isDelete是否为1
		// 是：用户已被标记为删除，抛出UserNotFoundException

		// 从查询结果中取出盐值salt
		// 将oldPassword和salt进行加密，得到oldMd5Password
		// 判断oldMd5Password和查询到的密码是否匹配
		// 是：原密码正确，将newPassword和salt进行加密，得到newMd5Password
		// -- 创建Date对象表示modifiedTime
		// -- 执行更新密码
		// 否：原密码错误，抛出PasswordNotMatchException
	}

具体的代码实现：

	@Override
	public void changePassword(Integer uid, String oldPassword, String newPassword)
			throws UserNotFoundException, PasswordNotMatchException, UpdateException {
		// 根据uid查询用户信息
		User data = findByUid(uid);
		// 判断查询结果是否为null
		if (data == null) {
			// 是：用户数据不存在，抛出UserNotFoundException
			throw new UserNotFoundException(
				"修改密码失败！尝试访问的用户数据不存在！");
		}
				
		// 判断isDelete是否为1
		if (data.getIsDelete() == 1) {
			// 是：用户已被标记为删除，抛出UserNotFoundException
			throw new UserNotFoundException(
				"修改密码失败！尝试访问的用户数据不存在！");
		}

		// 从查询结果中取出盐值salt
		String salt = data.getSalt();
		// 将oldPassword和salt进行加密，得到oldMd5Password
		String oldMd5Password = getMd5Password(oldPassword, salt);
		// 判断oldMd5Password和查询到的密码是否匹配
		if (data.getPassword().equals(oldMd5Password)) {
			// 是：原密码正确，将newPassword和salt进行加密，得到newMd5Password
			String newMd5Password = getMd5Password(newPassword, salt);
			// 创建Date对象表示modifiedTime
			Date now = new Date();
			// 执行更新密码
			updatePassword(
				uid, newMd5Password, 
				data.getUsername(), now);
		} else {
			// 否：原密码错误，抛出PasswordNotMatchException
			throw new PasswordNotMatchException(
				"修改密码失败！原密码错误！");
		}
	}

然后，在`UserServiceTestCase`编写单元测试：

	@Test
	public void changePassword() {
		try {
			Integer uid = 6;
			String oldPassword = "8888";
			String newPassword = "1234";
			service.changePassword(uid, oldPassword, newPassword);
			System.err.println("OK.");
		} catch (ServiceException e) {
			System.err.println(e.getMessage());
		}
	}

### 12. 用户-修改密码-控制器层

**1. 统一处理异常**

此次出现了新的异常`UpdateException`，所以，需要在`BaseController`中进行处理。

**2. 设计请求**

	请求路径：/users/change_password
	请求参数：old_password(oldPassword), new_password(newPassword), uid(HttpSession)
	请求类型：POST
	响应数据：ResponseResult<Void>

**3. 处理请求**

先调整已经完成的“登录”功能，在登录成功后，需要将用户的id存入到Session中：

	@PostMapping("login")
	public ResponseResult<User> handleLogin(
		@RequestParam("username") String username,
		@RequestParam("password") String password,
		HttpSession session) {
		User user = userService.login(username, password);
		session.setAttribute("uid", user.getUid());
		session.setAttribute("username", user.getUsername());
		return new ResponseResult<User>(SUCCESS, user);
	}

由于处理请求时，需要从Session中获取用户的id，相关代码比较繁琐，所以，在`BaseController`中声明方法，便于获取用户id：

	/**
	 * 从Session中获取当前登录的用户的id
	 * @param session 
	 * @return 当前登录的用户的id
	 */
	protected Integer getUidFromSession(HttpSession session) {
		return Integer.valueOf(session.getAttribute("uid").toString());
	}

然后，在`UserController`中添加处理请求的方法：

	@RequestMapping("change_password")
	public ResponseResult<Void> changePassword(
		@RequestParam("old_password") String oldPassword,
		@RequestParam("new_password") String newPassword,
		HttpSession session) {
		Integer uid = getUidFromSession(session);
		userService.changePassword(uid, oldPassword, newPassword);
		return new ResponseResult<Void>(SUCCESS);
	}

完成后，应该先通过浏览器访问登录页面，登录后，通过`http://localhost:8080/users/change_password?old_password=8888&new_password=1234`测试，测试完成后，将注解改回`@PostMapping`。

注：如果没有登录，直接访问会出现`NullPointerException`，该问题会随着后续添加登录拦截器而消失，所以，暂时不处理这个问题。

### 13. 用户-修改密码-界面

（同前序页面）

### 14. 用户-修改资料-持久层

**1. 分析当前功能所需要执行的SQL语句**

更新用户数据的SQL语句为：

	UPDATE 
		t_user
	SET 
		phone=?, email=?, 
		gender=?, modified_user=?, 
		modified_time=?
	WHERE 
		uid=?

由于修改之前，需要先显示当前登录的用户的数据，所以，还需要先查出当前用户的相关数据：

	SELECT 
		username, phone, email, gender
	FROM 
		t_user 
	WHERE 
		uid=?

由于此前已经有“根据id查询用户数据”的功能，所以，只需要修改此前完成的功能中的查询字段即可，即修改`UserMapper.xml`中关于`findByUid`的配置：

	<!-- 根据用户id查询用户信息 -->
	<!-- User findByUid(Integer uid) -->
	<select id="findByUid"
		resultType="cn.tedu.store.entity.User">
		SELECT 
			username, phone, 
			email, gender,
			password, salt, 
			is_delete AS isDelete
		FROM 
			t_user 
		WHERE 
			uid=#{uid}
	</select>

**2. 创建接口（如果必要的话），并设计抽象方法**

	Integer updateInfo(User user);

**3. 在XML中配置抽象方法的映射**

	<!-- 修改用户资料 -->
	<!-- Integer updateInfo(User user) -->
	<update id="updateInfo">
		UPDATE 
		    t_user
		SET 
		    phone=#{phone}, email=#{email}, 
		    gender=#{gender}, 
		    modified_user=#{modifiedUser}, 
		    modified_time=#{modifiedTime}
		WHERE 
		    uid=#{uid}
	</update>	

完成后，在`UserMapperTestCase`中编写单元测试：

	@Test
	public void updateInfo() {
		User user = new User();
		user.setUid(5);
		user.setPhone("666666");
		user.setEmail("rest@tedu.cn");
		user.setGender(1);
		Integer rows = mapper.updateInfo(user);
		System.err.println("rows=" + rows);
	}

### 15. 用户-修改资料-业务层

**1. 规划异常**

可能涉及的异常：`UpdateException`、`UserNotFoundException`。

**2. 在业务层接口中声明抽象方法**

	void changeInfo(User user) throws UpdateException, UserNotFoundException;

**3. 实现接口中的抽象方法**

首先，将持久层接口中的`updateInfo()`复制到业务层实现类中，并调整为私有方法，实现该方法，返回值修改为`void`，操作错误时抛出异常。

然后，实现业务层接口的抽象方法：

	public void changeInfo(User user) throws UpdateException, UserNotFoundException {
		// 通过user.getUid()查询用户信息
		// 判断查询结果是否为null
		// 是：抛出UserNotFoundException
		
		// 判断查询结果中的isDelete是否为1
		// 是：抛出UserNotFoundException
		
		// 在user中封装modified_??
		// 调用私有方法更新用户资料：updateInfo(user)
	}

### 16. 用户-修改资料-控制器层

### 17. 用户-修改资料-界面

### 18. 登录拦截器


#------------------------------------PROJECT.DAY04--------------------------------------


### 16. 用户-修改资料-控制器层

**1. 统一处理异常**

由于本次没有产生新的异常，所以无需处理异常。

**2. 设计请求**

	请求路径：/users/change_info
	请求参数：gender,phone,email, uid(HttpSession)
	请求类型：POST
	响应数据：ResponseResult<Void>

**3. 处理请求**

处理请求的方法应该是：

	@RequestMapping("change_info")
	public ResponseResult<Void> changeInfo(User user, HttpSession session) {
		// uid: getUidFromSession()
		// user.setUid(uid)
		// service: changeInfo(user)
		// return
	}

具体实现如下：

	@PostMapping("change_info")
	public ResponseResult<Void> changeInfo(
		User user, HttpSession session) {
		Integer uid = getUidFromSession(session);
		user.setUid(uid);
		userService.changeInfo(user);
		return new ResponseResult<Void>(SUCCESS);
	}

完成后，先通过浏览器登录，然后在地址栏中输入`http://localhost:8080/users/change_info?gender=1&phone=12345678&email=rest@users.com`进行测试（测试前使用`@RequestMapping`注解，测试后改回`@PostMapping`）。

### 17. 用户-修改资料-界面

在修改资料的界面中，应该默认显示当前登录的用户的信息，这些信息应该来自“打开界面时直接发出AJAX请求，由服务器端响应具体的数据，然后前端获取到数据后显示到对应的位置”。

所以，现在还需要“服务器端提供当前登录的用户的信息”功能，即：前端向某个URL发出请求，服务器端响应当前登录的用户的数据。这依然需要一套完整的从持久层 > 业务层 > 控制器层 > 界面的处理流程。

首先，持久层已经具务相应的功能，即在持久层中的`findByUid()`方法。而业务层目前还没有提供数据的方法，所以，应该在业务层接口中添加该方法：

	User getByUid(Integer uid);

然后，在业务层的实现类中实现该方法：

	@Override
	public User getByUid(Integer uid) {
		// 查询数据
		User data = findByUid(uid);
		// 判断用户数据是否存在
		if (data == null) {
			throw new UserNotFoundException(
				"尝试访问的用户数据不存在！");
		}
		// 判断用户数据是否被标记为删除
		if (data.getIsDelete().equals(1)) {
			throw new UserNotFoundException(
				"尝试访问的用户数据不存在！");
		}
		// 清除不希望对外暴露的数据
		data.setPassword(null);
		data.setSalt(null);
		data.setIsDelete(null);
		// 返回
		return data;
	}

可以看到，`findByUid()`和`getByUid()`这两个方法看似区别不大，实际定位的区别很明显，`findByUid()`的职责是查询数据，而并不关心查询结果如何使用，而`getByUid()`由于是公有方法，是会被外部调用的，也就使得它成为了“对外提供数据的方法”，所以，需要检验数据的有效性，及隐藏不希望对外提供的数据。

需要注意的是：这次向外提供数据之前，应该把以上代码中表现的3个属性的值设置为`null`，表示“不对外提供密码、盐值及相关隐藏数据”，如果没有这样做，对外提供的数据可能是：

	User [
		uid=null, 
		username=rest, 
		password=58D1946ADBAA9A81996D7002A107FF79, 
		salt=029D1A46-8D75-4EB3-AFF7-E8C6FD5F2E22, 
		gender=1, 
		avatar=null, 
		phone=12345678, 
		email=rest@users.com, 
		isDelete=0
	]

再接下来，还应该在控制器中提供该访问，使得客户端发出请求就能够获取到相关数据：

	请求路径：/users/get_info
	请求参数：uid(HttpSession)
	请求类型：GET/POST
	响应数据：ResponseResult<User>

实际处理请求的方法是：

	@RequestMapping("get_info")
	public ResponseResult<User> getInfo(HttpSession session) {
		Integer uid = getUidFromSession(session);
		User user = userService.getByUid(uid);
		return new ResponseResult<User>(SUCCESS, user);
	}

完成后，通过浏览器先登录，然后通过`http://localhost:8080/users/get_info`进行测试。

然后，在“修改用户资料”页面（userdata.html）中，可以在页面加载时就直接向以上URL发出请求，获取当前登录的用户的数据：

	<script type="text/javascript">
	$(document).ready(function() {
		var url = "/users/get_info";
		$.ajax({
			"url": url,
			"type": "GET",
			"dataType": "json",
			"success": function(json) {
				if (json.state == 200) {
					var user = json.data;
					$("#username").val(user.username);
					$("#phone").val(user.phone);
					$("#email").val(user.email);
					var radio = user.gender == 1 ? "#gender-male" : "#gender-female";
					$(radio).attr("checked", "checked");
					//if (user.gender == 1) {
					//	$("#gender-male").attr("checked", "checked");
					//} else {
					//	$("#gender-female").attr("checked", "checked");
					//}
				} else {
					alert(json.message);
					location.href = "login.html";
				}
			}
		});
	});
	</script>

以上处理过程中，需要确定各输入框和“性别”的单选按钮的id值。
	
然后，处理按钮的提交：

	<script type="text/javascript">
	$("#btn-change-info").click(function() {
		var url = "/users/change_info";
		var data = $("#form-change-info").serialize();
		$.ajax({
			"url": url,
			"data": data,
			"type": "POST",
			"dataType": "json",
			"success": function(json) {
				if (json.state == 200) {
					alert("修改成功！");
				} else {
					alert(json.message);
				}
			}
		});
	});
	</script>

以上处理过程中，需要设置表单的id、按钮的id、各提交数据的控制的name、2个性别的单选按钮的value值。

### 18. 登录拦截器

关于拦截器类的编写，与普通的SpringMVC项目中完全一样：

	public class LoginInterceptor implements HandlerInterceptor {
	
		@Override
		public boolean preHandle(
				HttpServletRequest request, 
				HttpServletResponse response, 
				Object handler)
				throws Exception {
			HttpSession session
				= request.getSession();
			if (session.getAttribute("uid") == null) {
				response.sendRedirect("/web/login.html");
				return false;
			}
			return true;
		}
		
	}

> 由于SpringBoot使用的环境都是高版本环境，例如JDK的版本是8，spring-webmvc的版本是5.x.x，在高版本的spring-webmvc中，HandlerInterceptor接口中的方法使用了JDK 8新特性的default方法，默认是空实现的，所以，并不强制要求重写接口中声明的方法。

在传统的SpringMVC中，应该在spring的配置文件中配置拦截器，而在SpringBoot中，并不存在这些配置文件，相关的配置信息应该：自定义类，实现`WebMvcConfigurer`接口，并且在类之前添加`@Configuration`注解，然后重写`addInterceptors()`以注册拦截器：

	@Configuration
	public class InterceptorConfiguration 
		implements WebMvcConfigurer {
	
		@Override
		public void addInterceptors(
				InterceptorRegistry registry) {
			// 创建拦截器对象
			HandlerInterceptor interceptor
				= new LoginInterceptor();
			
			// 白名单
			List<String> list = new ArrayList<>();
			list.add("/bootstrap3/**");
			list.add("/images/**");
			list.add("/css/**");
			list.add("/js/**");
			
			list.add("/users/reg");
			list.add("/users/login");
			list.add("/web/register.html");
			list.add("/web/login.html");
			
			// 添加拦截器
			registry.addInterceptor(interceptor)
				.addPathPatterns("/**")
				.excludePathPatterns(list);
		}
		
	}

在此前学习时，在传统的`SpringMVC`案例中，`DispatcherServlet`映射的路径是`*.do`，也就是说，整个`SpringMVC`框架都不处理`*.css`、`*.js`、`*.jpg`等资源，拦截器是在`SpringMVC`框架之内的组件，也就不会处理这些资源了！目前使用的是`SpringBoot`框架，默认配置了`DispatcherServlet`映射的路径是`/*`，也就表示`*.css`、`*.js`、`*.jpg`等资源也在框架管理范围之内，所以，在拦截器，需要对这些文件所在的文件夹（路径）添加为例外。

使用了拦截器以后，前端的异步请求中还应该添加：

	"error": function() {
		alert("您的登录信息已经过期，请重新登录！");
		location.href = "login.html";
	}

因为没有检测到Session时，服务器端的拦截器会响应302重定向，客户端的`$.ajax()`函数收到`302`后，并不执行`success`的回调函数，而是执行`error`的回调函数！


#------------------------------------PROJECT.DAY05--------------------------------------


### 19. 用户-上传头像-持久层

**1. 分析当前功能所需要执行的SQL语句**

	UPDATE t_user 
	SET avatar=?, modified_user=?, modified_time=? 
	WHERE uid=?

**2. 创建接口（如果必要的话），并设计抽象方法**

	Integer updateAvatar(
		@Param("uid") Integer uid, 
		@Param("avatar") String avatar, 
		@Param("modifiedUser") String modifiedUser, 
		@Param("modifiedTime") Date modifiedTime);

**3. 在XML中配置抽象方法的映射**

	<update id="updateAvatar">
		UPDATE 
			t_user 
		SET 
			avatar=#{avatar}, 
			modified_user=#{modifiedUser}, 
			modified_time=#{modifiedTime} 
		WHERE 
			uid=#{uid}
	</update>

最后，在`UserMapperTestCase`中编写单元测试：

	@Test
	public void updateAvatar() {
		Integer uid = 6;
		String avatar = "1234";
		String modifiedUser = "Admin";
		Date modifiedTime = new Date();
		Integer rows 
			= mapper.updateAvatar(
				uid, avatar, modifiedUser, modifiedTime);
		System.err.println("rows=" + rows);
	}

### 20. 用户-上传头像-业务层

**1. 规划异常**

此次执行的是更新数据操作，就可能出现`UpdateException`；

在执行更新之前，还应该检查用户数据是否存在，及用户数据的is_delete是否标记为正常（未被删除），如果出错，还可能出现`UserNotFoundException`。

**2. 在业务层接口中声明抽象方法**

	void changeAvatar(Integer uid, String avatar) 
		throws UserNotFoundException, UpdateException;

**3. 实现接口中的抽象方法**

首先，应该在业务层实现类中声明与持久层对应的私有方法：

	/**
	 * 更新头像
	 * @param uid 用户id
	 * @param avatar 头像的路径
	 * @param modifiedUser 修改执行人
	 * @param modifiedTime 修改时间
	 */
	private void updateAvatar(
		Integer uid, String avatar, 
		String modifiedUser, Date modifiedTime) {
		Integer rows = userMapper.updateAvatar(
				uid, avatar, modifiedUser, modifiedTime);
		if (rows != 1) {
			throw new UpdateException("xxxx");
		}
	}

然后，实现新添加的抽象方法：

	public void changeAvatar(Integer uid, String avatar) 
		throws UserNotFoundException, UpdateException {
		// 根据uid查询用户信息：User findByUid(Integer uid);
		// 判断查询结果是否为null
		// 是：抛出UserNotFoundException

		// 判断查询结果isDelete是否为1
		// 是：抛出UserNotFoundException

		// 从查询结果中获取用户名
		// 创建当前时间对象
		// 更新头像：updateAvatar(Integer uid, String avatar, String modifiedUser, Date modifiedTime)
	}

完成后，编写并执行单元测试。

### 21. 用户-上传头像-控制器层

**1. 统一处理异常**

**2. 设计请求**

**3. 处理请求**

# ------------------------------------

### SpringMVC上传(上载)文件

#### 1. 创建项目

创建传统的SpringMVC项目，生成web.xml并配置，添加Tomcat运行环境，添加pom.xml中的依赖，复制得到spring的配置文件。

上传文件需要添加新的依赖：

	<!-- 文件上传 -->
	<dependency>
		<groupId>commons-fileupload</groupId>
		<artifactId>commons-fileupload</artifactId>
		<version>1.3.3</version>
	</dependency>

#### 2. 准备前端界面

使用html文件即可完成前端界面的设计，则在`webapp`下创建`index.html`文件。

首先，上传文件是将文件数据提交到服务器端，所以，需要使用表单来提交数据，且表单的提交方式必须是`POST`，并添加属性配置`enctype="multipart/form-data"`。
	`enctype(enc=encrypt),加密模式，不写默认是application/x-www-form-urlencoded。但是文件上传的时候要配置为multipart/form-data

然后，使用的控件是`<input type="file" />`：

	<form action="" method="post" enctype="multipart/form-data">
	请选择您要上传的文件：
	<input type="file" name="file" />
	<input type="submit" value="上传" />
	</form>

如果需要一次性上传多个文件，可以在`<input type="file" />`中添加`multiple="multiple"`属性的配置，则用户在浏览文件时，可以按住Ctrl键一次选择多个文件。

#### 3. 添加控制器处理请求

创建`cn.tedu.spring.FileController`类，添加`@Controller`注解，然后，添加处理请求的方法：

	@Controller
	public class FileController {
		
		@RequestMapping(value="upload.do", 
			method=RequestMethod.POST)
		@ResponseBody
		public String handleUpload() {
			return "OK";
		}
	
	}

以上代码表示：在服务器端对`upload.do`路径进行处理，要求提交的是`POST`类型的请求，且处理完毕后，以响应正文的方式，向客户端响应`"OK"`字符串。

然后，应该在前端界面的表单中，配置`action="upload.do"`。

#### 4. 处理文件上传

首先，需要在Spring的配置文件中添加配置：
	`用来告诉springmvc框架待会会用到的处理文件上传的工具类是谁
	<!-- MultipartResolver -->
	<bean id="multipartResolver"
		class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
	</bean>

然后，在处理请求的方法中添加参数`@RequestParam("file") MultipartFile file`，并在处理过程中，调用参数对象的`transferTo(File dest)`执行保存即可：

	@RequestMapping(value="upload.do", 
		method=RequestMethod.POST)		`和PostMapping一样，有的同学springmvc的版本太低没有PostMapping所以这么写，向下兼容
	@ResponseBody
	public String handleUpload(
		@RequestParam("file") MultipartFile file) 		`老师说：MultipartFile上传就应该写这个@RequestParam。具体原因不明。
			throws IllegalStateException, IOException {
		
		// 保存用户上传的文件
		File dest = new File("d:/1.md");
		file.transferTo(dest);		`MultipartFile保存文件的方法，参数是File类型的
		
		return "OK";
	}
		`百度：Spring上传文件时MultipartFile 类型的参数上边一定要写@RequestParam(“xxx”) ，不然编译部署到服务器上之后，会报错误。
至此，上传的基本功能已经完成，可以结合前端界面进行测试。

#### 5. 关于上传的文件夹与文件名

关于文件夹：上传的文件夹应该是可以通过http协议访问得到的，否则，用户上传了文件后，将无法访问到该文件！在处理请求时，添加`HttpServletRequest`参数，调用`request.getServletContext().getRealPath("文件夹名称")`即可获取到等同于`webapp`文件夹下的某子级文件夹的路径！使用这种方式时，还应该创建出该文件夹对应的`File`对象，结合`exists()`和`mkdir() / mkdirs()`访问检查文件夹是否存在或创建文件夹。当然，也可以事先在项目中就在`webapp`下创建文件夹，后续在程序运行过程中就无需通过代码来创建文件夹。

关于文件名：文件的名称应该具备一定的“唯一”特性，以避免用户上传的多个文件可能覆盖前序上传的文件的问题！至于文件名怎么保证唯一，可以使用时间、用户的唯一标识等作为文件名的某个部分，至于扩展名，可以通过上传的文件对象`MultipartFile`的`getOriginalFilename()`方法获取原始文件名，然后处理原始文件名的字符串，从而得到原始文件的扩展名。

	// 上传文件夹
	String path = request.getServletContext().getRealPath("upload");
	File parent = new File(path);
	if (!parent.exists()) {
		parent.mkdirs();
	}

	// 获取原文件名，例如：DAY.04.md
	String originalFilename = file.getOriginalFilename();
	// 获取原扩展名
	String suffix = "";
	int index = originalFilename.lastIndexOf(".");
	if (index != -1) {
		suffix = originalFilename.substring(index);
	}
	// 上传的文件名
	String child = UUID.randomUUID() + suffix;
		
#### 6. 关于MultipartFile

**boolean isEmpty()**

用于判断用户上传的文件是否为空，当用户没有选择文件就提交请求，或选择的文件是0字节的空文件时，该方法返回`true`，否则返回`false`。

**String getOriginalFilename()**

获取原始文件名，即文件在客户端时的全名，例如`DAY04.md`。

**String getContentType()**

获取文件的MIME类型，主要用于限制用户上传的文件类型，关于各种扩展名对应的MIME类型，可以上网查阅，或在Tomcat的`conf/web.xml`中查找。

**long getSize()**

获取用户上传的文件的大小，使用字节为单位。可以用于判断并限制上传的文件大小，也可以用于自行处理流时的缓冲区大小的设定。

**InputStream getInputStream()**

获取用户上传的文件的输入流，结合自行创建输出流，即可实现一边读一边将数据写入到硬盘的某个文件中，或写入到其它位置。

**void transferTo(File dest)**

将文件保存到`dest`中。

#### 7. 关于CommonsMultipartResolver

在Spring的配置文件中，需要添加对该Bean的配置，但不一定需要为其属性注入值，可选的注入属性有：

**maxUploadSize**

上传的文件的最大大小，例如当值设置为1024时，无论一次性上传多少个文件，所有文件的大小的总和绝不可以超过1024。

**maxUploadSizePerFile**

上传的单个文件的最大大小，例如当值设置为1024时，如果一次性上传多个文件，则每个文件的大小都不可以超过1024，但是所有文件的大小的总和可以超过1024。

**maxInMemorySize**

最大占用内存空间的大小。

**defaultEncoding**

默认字符编码。

#### 8. 使用AJAX上传

使用AJAX上传时，应该使用`new FormData()`创建需要提交的数据，并且，在`$.ajax()`函数的参数中，需要配置`"contentType": false`和`"processData": false`，且保证服务器端响应的数据是`json`：

	<script type="text/javascript">
	$("#btn-upload").click(function() {
		var url = "upload.do";
		var data 
			= new FormData($("#form-upload")[0]);
		$.ajax({
			"url": url,
			"data": data,
			"contentType": false,		内容类型，false表示我们不关心他的类型
			"processData": false,		处理数据，false表示我们不需要通过ajax对数据进行处理
			"type": "POST",
			"dataType": "json",
			"success": function() {
				alert("OK");
			}
		});
	});
	</script>


#------------------------------------PROJECT.DAY06--------------------------------------


### 21. 用户-上传头像-控制器层

**1. 统一处理异常**

业务并没有抛出新的异常，所以，暂时在`BaseController`中无需补充对异常的处理！

**2. 设计请求**

	请求路径：/users/change_avatar
	请求类型：POST
	请求参数：HttpServletRequest request, MultipartFile file
	响应数据：头像路径：ResponseResult<String>
	是否拦截：是，登录拦截

**3. 处理请求**

应该创建异常类：

	cn.tedu.store.controller.ex.FileUploadException extends RuntimeException

	cn.tedu.store.controller.ex.FileEmptyException extends FileUploadException

	cn.tedu.store.controller.ex.FileContentTypeException extends FileUploadException

	cn.tedu.store.controller.ex.FileSizeException extends FileUploadException

由于创建了新的异常类，则应该在`BaseController`中对这些异常进行处理，原有的处理异常的方法使用的注解是`@ExceptionHandler(ServiceException.class)`，并不会对以上这4种新的异常进行处理，可选的解决方案有：

1. 新添加处理异常的方法，并添加`@ExceptionHandler(FileUploadException.class)`注解；
2. 调整现有的处理异常的方法，将注解改为`@ExceptionHandler({ServiceException.class, FileUploadException.class})`

由于无论哪种异常，处理方式都是向客户端响应JSON数据，所以，没有必要将这部分代码重新编写一次，则采取第2种解决方案！

然后，在`UserController`中处理请求：

	// static：创建List集合
	// static：向List集合中添加允许上传的文件类型

	@PostMapping("change_avatar")
	public ResponseResult<String> changeAvatar(
		HttpServletRequest request, 
		@RequestParam("avatar") MultipartFile avatar) {
		// 判断上传的文件是否为空：avatar.isEmpty()
		// 是：抛出异常：FileEmptyException
		
		// 判断文件类型是否不在允许的范围内：avatar.getContentType() / list.contains(contentType)
		// 是：抛出异常：FileContentTypeException

		// 判断文件大小是否超出了限制：avatar.getSize()
		// 是：抛出异常：FileSizeException

		// 标准上传流程

		// 从request中获取session再获取uid
		// 将上传的文件路径存储到数据库：service.changeAvatar(uid, avatar)
	}

### 【附】基于jQuery的cookie操作

在jQuery中有cookie()函数，用于操作cookie数据。

使用`$.cookie("password", vpassword, {expires: 7 })`语法可以向cookie中存入数据，使用`$.cookie("password")`语法可以读取cookie中的数据。

### 22. 收货地址-增加-持久层

关于收货地址数据，涉及的操作及开发顺序：
1. 增加新的收货地址；
2. 显示收货地址列表；
3. 将指定的收货地址设置为默认收货地址；
4. 删除指定的收货地址数据；
5. 修改指定的收货地址数据。

**关于持久层，应该先检查有没有对应的数据库/表，及对应的实体类。**

	CREATE TABLE t_address (
		aid INT AUTO_INCREMENT COMMENT 'id',
		uid INT NOT NULL COMMENT '数据所归属的用户的id',
		receiver VARCHAR(20) COMMENT '收货人',
		province CHAR(6) COMMENT '省的代号',
		city CHAR(6) COMMENT '市的代号',
		area CHAR(6) COMMENT '区的代号',
		district VARCHAR(50) COMMENT '省市区的名称',
		zip CHAR(6) COMMENT '邮政编码',
		address VARCHAR(50) COMMENT '详细地址',
		phone VARCHAR(20) COMMENT '手机',
		tel VARCHAR(20) COMMENT '固话',
		tag VARCHAR(10) COMMENT '地址类型',
		is_default INT COMMENT '是否为默认收货地址：0-否，1-是',
		created_user VARCHAR(20) COMMENT '创建者',
		created_time DATETIME COMMENT '创建时间',
		modified_user VARCHAR(20) COMMENT '修改者',
		modified_time DATETIME COMMENT '修改时间',
		PRIMARY KEY(aid)
	) DEFAULT CHARSET=UTF8;

**1. 分析当前功能所需要执行的SQL语句**

**2. 创建接口（如果必要的话），并设计抽象方法**

**3. 在XML中配置抽象方法的映射**

### 23. 收货地址-增加-业务层

### 24. 收货地址-增加-控制器层

### 25. 收货地址-增加-界面


#------------------------------------PROJECT.DAY07--------------------------------------


### 22. 收货地址-增加-持久层

关于收货地址数据，涉及的操作及开发顺序：
1. 增加新的收货地址；
2. 显示收货地址列表；
3. 将指定的收货地址设置为默认收货地址；
4. 删除指定的收货地址数据；
5. 修改指定的收货地址数据。

**关于持久层，应该先检查有没有对应的数据库/表，及对应的实体类。**

	CREATE TABLE t_address (
		aid INT AUTO_INCREMENT COMMENT 'id',
		uid INT NOT NULL COMMENT '数据所归属的用户的id',
		receiver VARCHAR(20) COMMENT '收货人',
		province CHAR(6) COMMENT '省的代号',
		city CHAR(6) COMMENT '市的代号',
		area CHAR(6) COMMENT '区的代号',
		district VARCHAR(50) COMMENT '省市区的名称',
		zip CHAR(6) COMMENT '邮政编码',
		address VARCHAR(50) COMMENT '详细地址',
		phone VARCHAR(20) COMMENT '手机',
		tel VARCHAR(20) COMMENT '固话',
		tag VARCHAR(10) COMMENT '地址类型',
		is_default INT COMMENT '是否为默认收货地址：0-否，1-是',
		created_user VARCHAR(20) COMMENT '创建者',
		created_time DATETIME COMMENT '创建时间',
		modified_user VARCHAR(20) COMMENT '修改者',
		modified_time DATETIME COMMENT '修改时间',
		PRIMARY KEY(aid)
	) DEFAULT CHARSET=UTF8;

**1. 分析当前功能所需要执行的SQL语句**

	INSERT INTO t_address (
		除了aid以外的所有字段
	) VALUES (
		除了aid以外的所有属性
	)

关于收货地址数据，还有“是否为默认收货地址”的字段，该字段值的逻辑规则可以是：如果当前是用户添加的第1条地址，则是默认的，否则，不是默认的。

后续，为了保证该功能的判断，则在持久层还需要实现“判断当前即将插入的是否是该用户的第1条地址”，即“查询当前用户的地址的数量”：

	SELECT COUNT(aid) FROM t_address WHERE uid=?

**2. 创建接口（如果必要的话），并设计抽象方法**

创建`cn.tedu.store.mapper.AddressMapper`接口，并添加抽象方法：

	Integer insert(Address address);

	Integer getCountByUid(Integer uid);

**3. 在XML中配置抽象方法的映射**

在`resources`下复制得到`AddressMapper.xml`文件，首先确定根节点的`namespace`属性，对应以上接口，然后，再配置以上2个抽象方法对应的映射。

	<mapper namespace="cn.tedu.store.mapper.AddressMapper">
	
		<!-- 插入收货地址数据 -->
		<!-- Integer insert(Address address) -->
		<insert id="insert">
			INSERT INTO t_address (
				uid, receiver,
				province, city,
				area, district,
				zip, address,
				phone, tel,
				tag, is_default,
				created_user, created_time,
				modified_user, modified_time
			) VALUES (
				#{uid}, #{receiver},
				#{province}, #{city},
				#{area}, #{district},
				#{zip}, #{address},
				#{phone}, #{tel},
				#{tag}, #{isDefault},
				#{createdUser}, #{createdTime},
				#{modifiedUser}, #{modifiedTime}
			)
		</insert>
		
		<!-- 根据用户id查询该用户的收货地址的数量 -->
		<!-- Integer getCountByUid(Integer uid) -->
		<select id="getCountByUid"
			resultType="java.lang.Integer">
			SELECT 
				COUNT(aid) 
			FROM 
				t_address 
			WHERE 
				uid=#{uid}
		</select>
	
	</mapper>

在测试下创建`AddressMapperTestCase`测试类，对以上2个方法进行单元测试：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class AddressMapperTestCase {
	
		@Autowired
		private AddressMapper mapper;
		
		@Test
		public void insert() {
			Address address = new Address();
			address.setUid(3);
			address.setReceiver("小张同学");
			Integer rows = mapper.insert(address);
			System.err.println("rows=" + rows);
		}
		
		@Test
		public void getCountByUid() {
			Integer uid = 3;
			Integer count = mapper.getCountByUid(uid);
			System.err.println("count=" + count);
		}
		
	}

### 23. 收货地址-增加-业务层

**1. 规划异常**

由于将执行`INSERT`操作，所以，可能抛出`InsertException`。

由于没有设置其它的业务规则，所以，暂无其它异常。

**2. 在业务层接口中声明抽象方法**

创建`cn.tedu.store.service.IAddressService`接口，并添加抽象方法：

	void addnew(Address address, String username) throws InsertException;

- 通常，绝大部分的增删改操作的返回值都可以是`void`，因为用户尝试执行增删改操作时，可能希望得到的都是成功与否的答案，而业务方法失败时都会抛出异常，如果方法能够顺利执行结束，就已经是成功的，所以，并不需要通过返回值来表示成功与否。
- 业务层接口中定义的方法的名称应该与持久层使用的名称不相同，因为最终在实现类中，需要添加与持久层同名的方法，也需要重写业务层接口中的抽象方法，在某些功能中，这些方法的参数都是相同的，如果方法名相同，就会出现冲突。

**3. 实现接口中的抽象方法**

创建`cn.tedu.store.service.impl.AddressServiceImpl`类，实现以上`IAddressService`接口，在类之前添加`@Service`注解，并声明`@Autowired private AddressMapper addressMapper;`持久层对象：

	@Service
	public class AddressServiceImpl implements IAddressService {

		@Autowired 
		private AddressMapper addressMapper;

	}

然后，将持久层中的2个抽象方法复制到实现类，使用`private`权限，其中，插入数据的方法的返回值改为`void`，实现过程中判断受影响的行数，如果不是1，则抛出`InsertException`，另外，查询方法直接调用持久层对象实现即可。

接下来，实现在`IAddressService`中定义的抽象方法：

	@Override
	public void addnew(Address address, String username) 
			throws InsertException {
		// TODO 确定district的值

	    // 获取当前用户的收货地址数量：getCountByUid(address.getUid());
		Integer count = getCountByUid(address.getUid());
	    // 如果数量为0，则isDefault为1，否则，isDefault为0
		address.setIsDefault(count == 0 ? 1 : 0);

	    // 4项日志
		Date now = new Date();
		address.setCreatedUser(username);
		address.setCreatedTime(now);
		address.setModifiedUser(username);
		address.setModifiedTime(now);

	    // 执行插入数据：insert(address)
		insert(address);
	}

完成后，创建`AddressServiceTestCase`编写并执行单元测试：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class AddressServiceTestCase {
		
		@Autowired
		private IAddressService service;
		
		@Test
		public void addnew() {
			try {
				String username = "超级管理员";
				Address address = new Address();
				address.setUid(3);
				address.setReceiver("小王同学");
				service.addnew(address, username);
				System.err.println("OK.");
			} catch (ServiceException e) {
				System.err.println(e.getMessage());
			}
		}
		
	}

### 24. 收货地址-增加-控制器层

**1. 统一处理异常**

此次并没有抛出新的异常，则无需处理。

**2. 设计请求**

	请求路径：/addresses/addnew
	请求类型：POST
	请求参数：Address address, HttpSession session
	响应数据：ResponseResult<Void>
	是否拦截：是，登录拦截，无需修改配置

**3. 处理请求**

创建`cn.tedu.store.controller.AddressController`，继承自`BaseController`，添加`@RestController`注解，添加`@RequestMapping("addresses")`注解，在类中，添加业务层对象`@Autowired private IAddressService addressService;`。

然后，添加处理请求的方法：

	@PostMapping("addnew")
	public ResponseResult<Void> addnew(
		Address address, HttpSession session) {
		// 从session中获取username
		String username = session.getAttribute("username").toString();
		// 从session中获取uid
		Integer uid = getUidFromSession(session);
		// 将uid封装到address中
		address.setUid(uid);
		// 直接调用业务层对象的addnew(address, username);
		addressService.addnew(address, username);
		// 返回
		return new ResponseResult<Void>(SUCCESS);
	}

测试时，使用`@GetMapping`或`@RequestMapping`注解，在浏览器中，先登录，然后输入`http://localhost:8080/addresses/addnew?receiver=Jack`执行单元测试。

### 25. 收货地址-增加-界面

### 26. 读取省市区的数据

从FTP服务器下载数据库脚本文件，通过`source`命令导入。

在本项目中，关于省市区的数据，只执行“读取”操作，可能涉及的操作有“获取省/市/区的列表”和“获取指定的省/市/区的详细信息”。

所以，接下来需要完成这2个功能对应的持久层、业务层、控制器层。

**0. 创建实体类**

创建`cn.tedu.store.entity.District`类，实现`Serializable`接口，添加与数据表对应的属性：

	/**
	 * 省市区数据的实体类
	 */
	public class District implements Serializable {
	
		private static final long serialVersionUID = -2777570570541589252L;
	
		private Integer id;
		private String parent;
		private String code;
		private String name;
		
		// SET/GET
	}

**1.1. 持久层-分析SQL语句**

	SELECT * FROM t_dict_district WHERE parent=?

	SELECT * FROM t_dict_district WHERE code=?

**1.2. 持久层-接口与抽象方法**

创建`cn.tedu.store.mapper.DistrictMapper`接口，并添加2个抽象方法：

	List<District> findListByParent(String parent);

	District findByCode(String code);

**1.3. 持久层-映射文件**

复制并得到`DistrictMapper.xml`文件，将根节点的`namespace`对应到以上创建的接口，并添加2个`<select>`节点映射以上2个抽象方法：

	<mapper namespace="cn.tedu.store.mapper.DistrictMapper">
	
		<!-- 根据父级代号获取所有省/某省的所有市/某市的所有区的列表 -->
		<!-- List<District> findListByParent(String parent) -->
		<select id="findListByParent"
			resultType="cn.tedu.store.entity.District">
			SELECT 
				id, parent, code, name
			FROM 
				t_dict_district
			WHERE 
				parent=#{parent}
		</select>
	
		<!-- 根据省/市/区的代号获取详情 -->
		<!-- District findByCode(String code) -->
		<select id="findByCode"
			resultType="cn.tedu.store.entity.District">
			SELECT 
				id, parent, code, name
			FROM 
				t_dict_district
			WHERE 
				code=#{code}
		</select>
	
	</mapper>

完成后，在测试中创建`DistrictMapperTestCase`测试以上2个方法是否可以正常运行：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class DistrictMapperTestCase {
	
		@Autowired
		private DistrictMapper mapper;
		
		@Test
		public void findListByParent() {
			String parent = "860";
			List<District> data = mapper.findListByParent(parent);
			System.err.println("BEGIN:");
			for (District district : data) {
				System.err.println(district);
			}
			System.err.println("END.");
		}
		
		@Test
		public void findByCode() {
			String code = "330000";
			District data = mapper.findByCode(code);
			System.err.println(data);
		}
		
	}

**2.1. 业务层-分析异常**

（无）

**2.2. 业务层-接口与抽象方法**

创建`cn.tedu.store.service.IDistrictService`接口，添加2个抽象方法：

	List<District> getListByParent(String parent);

	District getByCode(String code);

**2.3. 业务层-实现类与重写抽象方法**

创建`cn.tedu.store.service.impl.DistrictServiceImpl`类，实现以上接口，添加`@Service`注解，在类中声明持久层对象`@Autowired private DistrictMapper districtMapper;`。

使用2个私有方法调整持久层对象的2个方法。

在重写的接口定义方法时，调用私有方法直接实现。

**3.1. 控制器层-处理异常**

（无）

**3.2. 控制器层-设计处理请求**

关于获取列表：

	请求路径：/districts
	请求类型：GET
	请求参数：String parent
	响应数据：ResponseResult<List<District>>
	是否拦截：否，需要在配置文件中添加白名单

关于获取指定数据：

	请求路径：/districts/{code}
	请求类型：GET
	请求参数：String code
	响应数据：ResponseResult<District>
	是否拦截：否，需要在配置文件中添加白名单

**3.3. 控制器层-编写代码处理请求**

	@RestController
	@RequestMapping("districts")
	public class DistrictController 
		extends BaseController {
		
		@Autowired
		private IDistrictService districtService;
	
		@GetMapping("/")
		public ResponseResult<List<District>> 
			getListByParent(
				@RequestParam("parent") String parent) {
			List<District> data 
				= districtService
					.getListByParent(parent);
			return new ResponseResult<List<District>>(
					SUCCESS, data);
		}
		
		@GetMapping("{code}")
		public ResponseResult<District> getByCode(
			@PathVariable("code") String code) {
			District data
				= districtService.getByCode(code);
			return new ResponseResult<District>(SUCCESS, data);
		}
		
	}



#------------------------------------PROJECT.DAY08--------------------------------------


### 27. 收货地址-显示列表-持久层

**1. 分析当前功能所需要执行的SQL语句**

	SELECT 
		aid, tag, 
		receiver, district, 
		address, phone, 
		is_default AS isDefault
	FROM 
		t_address 
	WHERE 
		uid=?
	ORDER BY 
		is_default DESC, modified_time DESC

**2. 接口与抽象方法**

	List<Address> findListByUid(Integer uid);

**3. 在XML中配置抽象方法的映射**

	<!-- 获取指定用户的收货地址列表 -->
	<!-- List<Address> findListByUid(Integer uid) -->
	<select id="findListByUid"
		resultType="cn.tedu.store.entity.Address">
		SELECT 
			aid, tag, 
			receiver, district, 
			address, phone, 
			is_default AS isDefault
		FROM 
			t_address 
		WHERE 
			uid=#{uid}
		ORDER BY 
			is_default DESC, modified_time DESC
	</select>

完成后，编写单元测试：

	@Test
	public void findListByUid() {
		Integer uid = 6;
		List<Address> list = mapper.findListByUid(uid);
		System.err.println("BEGIN:");
		for (Address address : list) {
			System.err.println(address);
		}
		System.err.println("END.");
	}

### 28. 收货地址-显示列表-业务层

**1. 分析异常**

（无）

**2. 接口与抽象方法**

因为是获取数据的功能，所以直接从持久层接口中复制，并修改方法名称即可：

	/**
	 * 获取指定用户的收货地址列表
	 * @param uid 用户的id
	 * @return 该用户的收货地址列表
	 */
	List<Address> getListByUid(Integer uid);

**3. 实现类**

先使用私有方法调用持久层的同名方法，并在公有方法中调整自身的私有方法：

	/**
	 * 获取指定用户的收货地址列表
	 * @param uid 用户的id
	 * @return 该用户的收货地址列表
	 */
	private List<Address> findListByUid(Integer uid) {
		return addressMapper.findListByUid(uid);
	}

	@Override
	public List<Address> getListByUid(Integer uid) {
		return findListByUid(uid);
	}

完成后，测试：

	@Test
	public void getListByUid() {
		Integer uid = 6;
		List<Address> list = service.getListByUid(uid);
		System.err.println("BEGIN:");
		for (Address address : list) {
			System.err.println(address);
		}
		System.err.println("END.");
	}

### 29. 收货地址-显示列表-控制器层

**1. 处理异常**

（无）

**2. 分析请求**

	请求路径：/addresses/
	请求类型：GET
	请求参数：HttpSession session
	响应数据：ResponseResult<List<Address>>
	是否拦截：是，无需修改配置

**3. 处理请求**

	@GetMapping("/")
	public ResponseResult<List<Address>> 
		getListByUid(HttpSession session) {
		// 从session中获取uid
		Integer uid = getUidFromSession(session);
		// 通过业务层对象查询数据
		List<Address> data
			= addressService.getListByUid(uid);
		// 返回：成功+数据
		return new ResponseResult<List<Address>>(
				SUCCESS, data);
	}

### 30. 收货地址-显示列表-前端界面

	<script type="text/javascript">
	$(document).ready(function() {
		showAddressList();
	});
	
	function showAddressList() {
		var url = "/addresses/";
		$.ajax({
			"url": url,
			"type": "GET",
			"dataType": "json",
			"success": function(json) {
				$("#list").empty();
				
				var list = json.data;
				console.log("list.length=" + list.length);
				for (var i = 0; i < list.length; i++) {
					console.log(list[i].receiver);
					
					var html = '<tr>'
						+ '<td>#{tag}</td>'
						+ '<td>#{receiver}</td>'
						+ '<td>#{address}</td>'
						+ '<td>#{phone}</td>'
						+ '<td><a class="btn btn-xs btn-info" ><span class="fa fa-edit"></span> 修改</a></td>'
						+ '<td><a class="btn btn-xs add-del btn-info" ><span class="fa fa-trash-o"></span> 删除</a></td>'
						+ '<td><a class="btn btn-xs add-def btn-default" >设为默认</a></td>'
						+ '</tr>';
					
					html = html.replace("#{tag}", list[i].tag);
					html = html.replace("#{receiver}", list[i].receiver);
					html = html.replace("#{address}", list[i].district + list[i].address);
					html = html.replace("#{phone}", list[i].phone);
					
					$("#list").append(html);
				}
			}
		});
	}
	</script>

### 31. 收货地址-设为默认-持久层

**1. 分析SQL**

准备一条语句，用于将该用户的所有收货地址均设置为“非默认”：

	UPDATE t_address SET is_default=0, modified_user=?, modified_time=? WHERE uid=?

然后，再将指定的收货地址设置为“默认”：

	UPDATE t_address SET is_default=1, modified_user=?, modified_time=? WHERE aid=?

除此以外，后续，在业务层还需要保证“只允许修改自己的收货地址数据”，则可以“根据aid查询收货地址数据，查出该数据中的uid，并进行对比”，所以，还需要：

	SELECT uid FROM t_address WHERE aid=?

所以，后续在业务层中完整的流程应该是：
1. 根据aid查询出需要设置为默认的数据的uid
2. 判断uid和当前登录的用户的uid是否一致，如果不一致，不允许执行后续操作
3. 将当前登录的用户的所有收货地址全部设置为“非默认”
4. 将指定aid的收货地址设置为“默认”

**2. 接口与抽象方法**

以上3个数据操作对应的抽象方法可以是：

	Address findByAid(Integer aid);

	Integer updateNonDefault(
		@Param("uid") Integer uid, 
		@Param("modifiedUser") String modifiedUser, 
		@Param("modifiedTime") Date modifiedTime);

	Integer updateDefault(
		@Param("aid") Integer aid,
		@Param("modifiedUser") String modifiedUser, 
		@Param("modifiedTime") Date modifiedTime);

**3. 配置XML映射**

	<!-- 将指定用户的所有收货地址数据全部设置为“非默认” -->
	<!-- Integer updateNonDefault(
	    @Param("uid") Integer uid, 
	    @Param("modifiedUser") String modifiedUser, 
	    @Param("modifiedTime") Date modifiedTime) -->
	<update id="updateNonDefault">
		UPDATE 
			t_address 
		SET 
			is_default=0, 
			modified_user=#{modifiedUser}, 
			modified_time=#{modifiedTime} 
		WHERE 
			uid=#{uid}
	</update>
	
	<!-- 将指定的收货地址数据设置为“默认” -->
	<!-- Integer updateDefault(
	    @Param("aid") Integer aid,
	    @Param("modifiedUser") String modifiedUser, 
	    @Param("modifiedTime") Date modifiedTime) -->
	<update id="updateDefault">
		UPDATE 
			t_address 
		SET 
			is_default=1, 
			modified_user=#{modifiedUser}, 
			modified_time=#{modifiedTime} 
		WHERE 
			aid=#{aid}
	</update>

	<!-- 根据收货地址数据的id查询收货地址详情 -->
	<!-- Address findByAid(Integer aid) -->
	<select id="findByAid"
		resultType="cn.tedu.store.entity.Address">
		SELECT 
			uid 
		FROM 
			t_address 
		WHERE 
			aid=#{aid}
	</select>

单元测试：

	@Test
	public void updateNonDefault() {
		Integer uid = 6;
		String modifiedUser = "管理员";
		Date modifiedTime = new Date();
		Integer rows 
			= mapper.updateNonDefault(
				uid, modifiedUser, modifiedTime);
		System.err.println("rows=" + rows);
	}
	
	@Test
	public void updateDefault() {
		Integer aid = 8;
		String modifiedUser = "管理员";
		Date modifiedTime = new Date();
		Integer rows 
			= mapper.updateDefault(
				aid, modifiedUser, modifiedTime);
		System.err.println("rows=" + rows);
	}

	@Test
	public void findByAid() {
		Integer aid = 80;
		Address address = mapper.findByAid(aid);
		System.err.println(address);
	}

### 32. 收货地址-设为默认-业务层

业务层中完整的流程应该是：
1. 根据aid查询出需要设置为默认的数据的uid
2. 判断uid和当前登录的用户的uid是否一致，如果不一致，不允许执行后续操作
3. 将当前登录的用户的所有收货地址全部设置为“非默认”
4. 将指定aid的收货地址设置为“默认”

**1. 分析异常**

本次操作涉及`Update`，则可能抛出`UpdateException`；

由于需要`aid`查询收货地址数据，可能没有匹配的数据，则可能抛出`AddressNotFoundException`，该异常尚未创建，则需要创建，且该异常应该继承自`ServiceException`；

在验证用户身份时，还可能出现“用户尝试修改他人的收货地址数据”的问题，出现该问题时应该抛出`AccessDeniedException`，同上，创建该异常类。

**2. 接口与抽象方法**

	void setDefault(Integer uid, Integer aid, String username) 
		throws UpdateException, AddressNotFoundException, AccessDeniedException;

**3. 实现抽象方法**

	public void setDefault(Integer uid, Integer aid, String username) throws UpdateException, AddressNotFoundException, AccessDeniedException {
		// 根据aid查询数据：findByAid(aid)
		// 判断查询结果是否为null
		// 是：抛出异常：AddressNotFoundException

		// 判断查询结果中的uid与当前方法参数中的uid是否不同
		// 是：抛出异常：AccessDeniedException

		// 创建当前时间对象
		// 将所有地址设置为非默认：updateNonDefault(uid, modifiedUser, modifiedTime)

		// 将指定地址设置为默认：updateDefault(aid, modifiedUser, modifiedTime)
	}


#------------------------------------PROJECT.DAY09--------------------------------------


### 33. 收货地址-设为默认-控制器层

**1. 处理异常**

本功能抛出了2种新的异常，则需要在`BaseController`中进行处理。

**2. 设计请求**

	请求路径：/addresses/{aid}/set_default
	请求参数：Integer aid, HttpSession session
	请求类型：GET / POST
	响应数据：ResponseResult<Void>
	是否拦截：是，无需修改配置

**3. 处理请求**

处理请求的方法：

	@GetMapping("{aid}/set_default")
	public ResponseResult<Void> setDefault(
		@PathVariable("aid") Integer aid,
		HttpSession session) {
		// 从session中获取uid
		Integer uid = getUidFromSession(session);
		// 从session中获取用户名
		String username = session.getAttribute("username").toString();
		// 执行
		addressService.setDefault(uid, aid, username);
		// 返回
		return new ResponseResult<Void>(SUCCESS);
	}

打开浏览器，先登录，然后通过例如`http://localhost:8080/addresses/8/set_default`进行测试。

测试完成后，应该将注解替换为`@PostMapping`。

### 34. 收货地址-删除-持久层

**1. 设计SQL语句**

删除收货地址的SQL语句应该是：

	【新增】 DELETE FROM t_address WHERE aid=?

为了确保正确的删除，还应该先查询数据是否存在，及数据归属是否正确（只能删自己的数据），此部分的功能已经完成。

还需要考虑特殊情况，例如“当删除的是默认的收货地址时”，还需要“将最后一次修改的收货地址设置为默认”，则对应的SQL语句应该是：

	【调整】 SELECT uid, is_default FROM t_address WHERE aid=?

	【不变】 UPDATE t_address SET is_default=1 WHERE aid=?

	【新增】 SELECT aid FROM t_address WHERE uid=? ORDER BY modified_time DESC, aid DESC LIMIT 0,1
	
后续，可能还需要考虑的问题有“如果删除的收货地址是当前用户的最后一条收货地址”，则不需要考虑以上问题，需要执行的SQL语句应该是：

	【不变】 SELECT COUNT(aid) FROM t_address WHERE uid=?

**2. 接口与抽象方法**

应该在持久层接口中添加抽象方法：

	Integer deleteByAid(Integer aid);

	Address findLastModifiedByUid(Integer uid);

**3. 配置映射**

映射的配置：

	<!-- 根据收货地址数据的id删除数据 -->
	<!-- Integer deleteByAid(Integer aid) -->
	<delete id="deleteByAid">
		DELETE FROM t_address WHERE aid=#{aid}
	</delete>

	<!-- 查询指定用户的最后修改的收货地址数据 -->
	<!-- Address findLastModifiedByUid(Integer uid) -->
	<select id="findLastModifiedByUid"
		resultType="cn.tedu.store.entity.Address">
		SELECT 
			aid 
		FROM 
			t_address 
		WHERE 
			uid=#{uid} 
		ORDER BY 
			modified_time DESC, aid DESC
		LIMIT 
			0,1
	</select>

然后，编写并执行单元测试：

	@Test
	public void deleteByAid() {
		Integer aid = 8;
		Integer rows 
			= mapper.deleteByAid(aid);
		System.err.println("rows=" + rows);
	}

	@Test
	public void findLastModifiedByUid() {
		Integer uid = 6;
		Address address = mapper.findLastModifiedByUid(uid);
		System.err.println(address);
	}

### 35. 收货地址-删除-业务层

**1. 分析异常**

由于是执行`DELETE`操作，则可能抛出`DeleteException`，则需要创建这个异常类，继承自`ServiceException`。

另外，还涉及相关的数据检查，则可能抛出`AddressNotFoundException`、`AccessDeniedException`，这2个异常已经存在，无需再次创建。

**2. 接口与抽象方法**

	void deleteByAid(Integer uid, Integer aid, String username)
		throws DeleteException, AddressNotFoundException, AccessDeniedException;

**3. 实现**

	@Transactional
	public void deleteByAid(Integer uid, Integer aid)
		throws DeleteException, AddressNotFoundException, AccessDeniedException {
		// 根据aid查询即将删除的数据
		// 判断查询结果是否为null
		// 是：抛出异常：AddressNotFoundException

		// 判断查询结果的uid是否与参数uid不相同
		// 是：抛出异常：AccessDeniedException

		// 执行删除

		// 判断刚刚删除的数据（最开始找出来的数据）的isDefault是否为1
		// -- 查询当前用户还有多少条收货地址
		// -- 判断数量是否 > 0
		// -- 是：找出最后一条收货地址的aid
		// -- -- 把找出来的数据设置为默认
	}

### 36. 收货地址-删除-控制器层

与“设置默认”的处理基本一致，仅需修改URL、处理请求的方法名、调用业务对象的方法名即可：

	@PostMapping("{aid}/delete")
	public ResponseResult<Void> deleteByAid(
			@PathVariable("aid") Integer aid,
			HttpSession session) {
		// 从session中获取uid
		Integer uid = getUidFromSession(session);
		// 从session中获取用户名
		String username = session
				.getAttribute("username").toString();
		// 执行
		addressService.deleteByAid(uid, aid, username);
		// 返回
		return new ResponseResult<Void>(SUCCESS);
	}

### 37. 主页-热销排行-持久层

**0. 实体类**

创建`cn.tedu.store.entity.Goods`，继承自`BaseEntity`。

**1. SQL**

	SELECT 
		id, title, price, image
	FROM 
		t_goods 
	WHERE 
		status=1
	ORDER BY 
		priority DESC
	LIMIT	
		0, ?

**2. 接口与抽象方法**

创建`cn.tedu.store.mapper.GoodsMapper`，并添加抽象方法：

	List<Goods> findHotGoods(Integer count);

**3. 配置映射**

复制得到`GoodsMapper.xml`文件，修改根节点的`namespace`对应以上接口，然后配置SQL语句。












### 【附】 使用事务

在数据库领域中，“事务”是用于保障数据安全的，它可以使得多条SQL语句全部执行成功或失败！

仅当某项操作涉及2条或更多增、删、改时需要使用事务（例如2次Update，或1次Update和1次Delete等）！

在使用SSM框架时，当需要通过事务保障数据安全时，在业务方法之前添加`@Transactional`注解即可（使用之前需要保证当前项目中使用了spring-jdbc依赖）。该注解也可以添加在业务类之前，但是通常并不推荐这样使用。

Spring-JDBC在处理事务时，大致是：

	try {
		开启事务：begin
		执行多条SQL
		提交事务：commit
	} catch (RuntimeException) {
		回滚事务：rollback
	}

所以，这就要求**项目中所有的增、删、改操作都必须判断操作是否成功，且失败时必须抛出RuntimeException或其子孙类异常**。


#------------------------------------PROJECT.DAY10--------------------------------------


### 38. 主页-热销排行-业务层

**1. 分析异常**

（无）

**2. 接口与抽象方法**

创建`cn.tedu.store.service.IGoodsService`接口，并添加抽象方法：

	List<Goods> getHotGoods(Integer count);

**3. 实现类**

创建`cn.tedu.store.service.impl.GoodsServiceImpl`，实现以上接口，在类之前添加`@Service`注解，在类中，添加`@Autowired private GoodsMapper goodsMapper;`。

在实现类中，先添加与持久层对应的抽象方法，然后实现接口中的方法：

	/**
	 * 处理商品数据的业务层实现类
	 */
	@Service
	public class GoodsServiceImpl implements IGoodsService {
		
		@Autowired
		private GoodsMapper goodsMapper;
	
		@Override
		public List<Goods> getHotGoods(Integer count) {
			return findHotGoods(count);
		}
		
		/**
		 * 获取热销商品的列表
		 * @param count 需要获取的商品的数量
		 * @return 热销商品的列表
		 */
		private List<Goods> findHotGoods(Integer count) {
			return goodsMapper.findHotGoods(count);
		}
	
	}

完成后，创建并完成单元测试：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class GoodsServiceTestCase {
	
		@Autowired
		private IGoodsService service;
		
		@Test
		public void getListByParent() {
			Integer count = 4;
			List<Goods> data = service.getHotGoods(count);
			System.err.println("BEGIN:");
			for (Goods goods : data) {
				System.err.println(goods);
			}
			System.err.println("END.");
		}
		
	}

### 39. 主页-热销排行-控制器层

**1. 处理异常**

（无）

**2. 设计请求**

	请求路径：/goods/hot
	请求参数：无
	请求类型：GET
	响应数据：ResponseResult<List<Goods>>
	是否拦截：否，需要在白名单中添加路径

**3. 处理请求**

创建`cn.tedu.store.controller.GoodsController`，继承自`BaseController`，在类之前添加`@RestController`和`@RequestMapping("goods")`注解，在类中添加业务层对象`@Autowired private IGoodsServicde goodsService`。

添加处理请求的方法：

	@RestController
	@RequestMapping("goods")
	public class GoodsController extends BaseController {
	
		@Autowired
		private IGoodsService goodsService;
		
		@GetMapping("hot")
		private ResponseResult<List<Goods>> getHotGoods() {
			Integer count = 4;
			List<Goods> data
				= goodsService.getHotGoods(count);
			return new ResponseResult<List<Goods>>(SUCCESS, data);
		}
		
	}

完成后，打开浏览器，无需事先登录，直接通过`http://localhost:8080/goods/hot`进行测试。

### 40. 商品-详情-持久层

**1. 设计SQL**

	SELECT 
		id,
		item_type AS itemType,
		title,
		sell_point AS sellPoint,
		price,
		num,
		image,
		status
	FROM 
		t_goods 
	WHERE 
		id=?

**2. 接口与抽象方法**

	Goods findById(Long id);

**3. 配置映射**

映射：

	<!-- 根据商品id查询商品详情 -->
	<!-- Goods findById(Long id) -->
	<select id="findById"
		resultType="cn.tedu.store.entity.Goods">
		SELECT 
			id, title,
			item_type AS itemType,
			sell_point AS sellPoint,
			price, num,
			image, status
		FROM 
			t_goods 
		WHERE 
			id=#{id}
	</select>

单元测试：

	@Test
	public void findById() {
		Long id = 10000017L;
		Goods data = mapper.findById(id);
		System.err.println(data);
	}

### 41. 商品-详情-业务层

**抽象方法**

	Goods getById(Long id);

**实现**

	@Override
	public Goods getById(Long id) {
		return findById(id);
	}

	/**
	 * 根据商品id查询商品详情
	 * @param id 商品id
	 * @return 匹配的商品详情，如果没有匹配的数据，则返回null
	 */
	private Goods findById(Long id) {
		return goodsMapper.findById(id);
	}

单元测试：

	@Test
	public void getById() {
		Long id = 10000017L;
		Goods data = service.getById(id);
		System.err.println(data);
	}

### 42. 商品-详情-控制器层

**1. 处理异常**

（无）

**2. 设计请求**

	请求路径：/goods/{id}/details
	请求参数：Long id
	请求类型：GET
	响应数据：ResponseResult<Goods>
	是否拦截：否，白名单中已经配置

**3. 处理请求**

	@GetMapping("{id}/details")
	public ResponseResult<Goods> getById(
		@PathVariable("id") Long id) {
		Goods data = goodsService.getById(id);
		return new ResponseResult<Goods>(SUCCESS, data);
	}

完成后，打开浏览器，无需登录，通过`http://localhost:8080/goods/10000017/details`进行测试。

### 43. 购物车-加入购物车-持久层

**创建数据表**

	CREATE TABLE t_cart(
		cid INT AUTO_INCREMENT,
		uid INT NOT NULL COMMENT '用户id',
		gid BIGINT NOT NULL COMMENT '商品id',
		num INT NOT NULL COMMENT '商品数量',
		created_user VARCHAR(20) COMMENT '创建者',
		created_time DATETIME COMMENT '创建时间',
		modified_user VARCHAR(20) COMMENT '修改者',
		modified_time DATETIME COMMENT '修改时间',
		PRIMARY KEY (cid)
	) DEFAULT CHARSET=UTF8;

**实体类**

创建`cn.tedu.store.entity.Cart`继承自`BaseEntity`：

	public class Cart extends BaseEntity {

		private static final long serialVersionUID = -8514927731659247219L;
	
		private Integer cid;
		private Integer uid;
		private Long gid;
		private Integer num;
	
		public Integer getCid() {
			return cid;
		}
	
		public void setCid(Integer cid) {
			this.cid = cid;
		}
	
		public Integer getUid() {
			return uid;
		}
	
		public void setUid(Integer uid) {
			this.uid = uid;
		}
	
		public Long getGid() {
			return gid;
		}
	
		public void setGid(Long gid) {
			this.gid = gid;
		}
	
		public Integer getNum() {
			return num;
		}
	
		public void setNum(Integer num) {
			this.num = num;
		}
	
		@Override
		public String toString() {
			return "Cart [cid=" + cid + ", uid=" + uid + ", gid=" + gid + ", num=" + num + "]";
		}
	
	}

**1. SQL语句**

如果某用户是第1次添加某商品到购物车：

	INSERT INTO t_cart (xxx...) VALUES (xxx...)

如果某用户添加到购物车中的商品是该用户在购物车中已经存在商品：

	UPDATE t_cart SET num=? WHERE cid=?

保证以上判断的应该是：

	SELECT cid, num FROM t_cart WHERE uid=? AND gid=?

**2. 接口与抽象方法**

创建`cn.tedu.store.mapper.CartMapper`，添加抽象方法：

	Integer insert(Cart cart);

	Integer updateNum(Integer cid, Integer num, String modifiedUser, Date modifiedTime);

	Cart findByUidAndGid(Integer uid, Long gid);

**3. 配置映射**

	<mapper namespace="cn.tedu.store.mapper.CartMapper">
	
		<!-- 新增购物车数据 -->
		<!-- Integer insert(Cart cart) -->
		<insert id="insert">
			INSERT INTO t_cart (
				uid, gid, num,
				created_user, created_time,
		    	modified_user, modified_time
			) VALUES (
				#{uid}, #{gid}, #{num},
				#{createdUser}, #{createdTime},
		    	#{modifiedUser}, #{modifiedTime}
			)
		</insert>
		
		<!-- 修改购物车中的商品的数量 -->
		<!-- Integer updateNum(
			@Param("cid") Integer cid, 
			@Param("num") Integer num, 
			@Param("modifiedUser") String modifiedUser, 
			@Param("modifiedTime") Date modifiedTime) -->
		<update id="updateNum">
			UPDATE 
				t_cart 
			SET 
				num=#{num},
				modified_user=#{modifiedUser},
				modified_time=#{modifiedTime}
			WHERE 
				cid=#{cid}
		</update>
		
		<!-- 根据用户id和商品id查询购物车数据 -->
		<!-- Cart findByUidAndGid(
			@Param("uid") Integer uid, 
			@Param("gid") Long gid) -->
		<select id="findByUidAndGid"
			resultType="cn.tedu.store.entity.Cart">
			SELECT 
				cid, num 
			FROM 
				t_cart 
			WHERE 
				uid=#{uid} AND gid=#{gid}
		</select>
	
	</mapper>

单元测试：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class CartMapperTestCase {
	
		@Autowired
		private CartMapper mapper;
		
		@Test
		public void insert() {
			Cart cart = new Cart();
			cart.setUid(6);
			cart.setGid(10000017L);
			cart.setNum(2);
			Integer rows = mapper.insert(cart);
			System.err.println("rows=" + rows);
		}
		
		@Test
		public void updateNum() {
			Integer cid = 1;
			Integer num = 5;
			String modifiedUser = "Admin";
			Date modifiedTime = new Date();
			Integer rows = mapper.updateNum(cid, num, modifiedUser, modifiedTime);
			System.err.println("rows=" + rows);
		}
		
		@Test
		public void findByUidAndGid() {
			Integer uid = 6;		
			Long gid = 10000017L;
			Cart data = mapper.findByUidAndGid(uid, gid);
			System.err.println(data);
		}
		
	}

### 44. 购物车-加入购物车-业务层

**1. 规划异常**

本次操作可能涉及`INSERT`、`UPDATE`，则可能抛出`InsertException`、`UpdateException`。

而执行查询方法时，无论是否查询到数据，都是正确的，所以不涉及异常。

**2. 接口与抽象方法**

创建`cn.tedu.store.service.ICartService`接口，并添加抽象方法：

	void addToCart(Cart cart, String username) throws InsertException, UpdateException;


**3. 实现**

创建`cn.tedu.store.service.impl.CartServiceImpl`类，实现`ICartService`接口，在类之前添加`@Service`注解，在类中添加持久层对象`@Autowired private CartMapper cartMapper;`。

添加持久层中的3个方法，在业务层中体现为对应的3个私有方法。

然后，实现接口中的抽象方法：

	public void addToCart(Cart cart, String username) throws InsertException, UpdateException {
		// 创建Date对象
		// 从参数cart中获取uid和gid
		// 执行查询：Cart findByUidAndGid(Integer uid, Long gid)
		// 判断查询结果是否为null
		// 是：表示该用户尚未添加该商品到购物车，则向参数对象cart中封装4个日志属性
		// -- 执行插入数据：void insert(Cart cart)
		// 否：表示该用户已经添加该商品到购物车，则从查询结果中取出cid
		// -- num值为参数cart中的num加上前序查询结果中的num
		// -- 执行修改数量：void updateNum(Integer cid, Integer num, String modifiedUser, Date modifiedTime)
	}

### 45. 购物车-加入购物车-控制器层

**1. 处理异常**

（无）

**2. 设计请求**

	请求路径：/carts/add
	请求类型：POST
	请求参数：Long gid, Integer num, HttpSession session > uid/username
	响应方式：ResponseResult<Void>
	是否拦截：是，无需修改配置

**3. 处理请求**

创建`cn.tedu.store.controller.CartController`类，继承自`BaseController`，在类之前添加`@RestController`和`@RequestMapping("carts")`注解，在类中声明业务层对象`@Autowired private ICartService cartService;`。

添加处理请求的方法：

	@RequestMapping("add")
	public ResponseResult<Void> addToCart(
		@RequestParam("gid") Long gid,
		@RequestParam("num") Integer num,
		HttpSession session) {
		// 从Session中获取uid, username
		// 创建新的Cart对象
		// 向Cart对象中封装gid, num, uid
		// 调用业务层对象的addToCart(Cart cart, String username)方法
		// 返回成功
	}

完成后，先登录，然后通过`http://localhost:8080/carts/add?gid=10000017&num=3`进行测试，测试完成后，方法之前的注解改为`@PostMapping`。


#------------------------------------PROJECT.DAY11--------------------------------------


### 46. 购物车-列表-持久层

**1. SQL**

	SELECT 
		cid, gid, 
		t_cart.num,
		title,
		image,
		price 
	FROM 
		t_cart 
	LEFT JOIN 
		t_goods
	ON 
		t_cart.gid=t_goods.id
	WHERE 
		uid=?

**2. 接口与抽象方法**

由于此次的查询涉及多张表，所以，没有匹配的实体类，则应该创建`cn.tedu.store.vo.CartVO`：

	public class CartVO implements Serializable {
		private Integer cid;
		private Integer uid;
		private Long gid;
		private Integer num;
		private String title;
		private String image;
		private Long price;
		// SET/GET
	}

在持久层接口中添加抽象方法：

	List<CartVO> findListByUid(Integer uid);

**3. 配置映射**

	<!-- 查询指定用户的购物车数据 -->
	<!-- List<CartVO> findListByUid(Integer uid) -->
	<select id="findListByUid"
		resultType="cn.tedu.store.vo.CartVO">
		SELECT 
			cid, gid, 
			t_cart.num,
			title,
			image,
			price 
		FROM 
			t_cart 
		LEFT JOIN 
			t_goods
		ON 
			t_cart.gid=t_goods.id
		WHERE 
			uid=#{uid}
		ORDER BY 
			t_cart.modified_time DESC
	</select>

单元测试：

	@Test
	public void findListByUid() {
		Integer uid = 6;
		List<CartVO> list = mapper.findListByUid(uid);
		System.err.println("BEGIN:");
		for (CartVO cartVO : list) {
			System.err.println(cartVO);
		}
		System.err.println("END.");
	}

### 47. 购物车-列表-业务层

（获取数据的查询功能通常没有复杂的业务）

### 48. 购物车-列表-控制器层

	@GetMapping("/")
	public ResponseResult<List<CartVO>> 
		getListByUid(HttpSession session) {
		Integer uid = getUidFromSession(session);
		List<CartVO> data = cartService.getListByUid(uid);
		return new ResponseResult<List<CartVO>>(SUCCESS, data);
	}

### 49. 购物车-增加商品数量-持久层

**1. SQL**

关于增加数量，本质上还是修改数量，对应的SQL应该是：

	【已有】 UPDATE t_cart SET num=?, modified_user=?, modified_time=? WHERE cid=? 

并且，在操作时，还应该确保用户操作的是自己的、已经存在的数据：

	【需新增】 SELECT uid, num FROM t_cart WHERE cid=?

**2. 抽象方法**

	Cart findByCid(Integer cid);

**3. 配置映射**

	<!-- 根据购物车数据id查询购物车数据 -->
	<!-- Cart findByCid(Integer cid) -->
	<select id="findByCid"
		resultType="cn.tedu.store.entity.Cart">
		SELECT 
			uid, num 
		FROM 
			t_cart 
		WHERE 
			cid=#{cid}
	</select>

单元测试：

	@Test
	public void findByCid() {
		Integer cid = 40;		
		Cart data = mapper.findByCid(cid);
		System.err.println(data);
	}
	
### 50. 购物车-增加商品数量-业务层

**1. 规划异常**

此次业务操作应该先查询需要操作的数据，判断是否存在，及数据归属是否正常（操作的是否是自己的数据），然后再执行`UPDATE`操作，则可能涉及的异常有：`UpdateException`、`AccessDeniedException`、`CartNotFoundException`，其中，`CartNotFoundException`尚不存在，需要创建。

**2. 抽象方法**

	Integer addNum(Integer cid, Integer uid, String username) throws CartNotFoundException, AccessDeniedException, UpdateException;

**3. 实现**

	@Override
	public Integer addNum(Integer cid, Integer uid, String username)
			throws CartNotFoundException, AccessDeniedException, UpdateException {
		// 根据参数cid查询数据
		Cart data = findByCid(cid);
		// 判断查询结果是否为null
		if (data == null) {
			// 是：抛出异常：CartNotFoundException
			throw new CartNotFoundException(
				"增加数量失败！尝试访问的数据不存在，可能已经被删除！");
		}

		// 判断查询结果中的uid与参数uid是否不同
		if (!data.getUid().equals(uid)) {
			// 是：抛出异常：AccessDeniedException
			throw new AccessDeniedException(
				"增加数量失败！非法访问！");
		}

		// 从查询结果中取出当前的num
		Integer num = data.getNum();
		// 将num自增
		num++;
		// 创建当前时间对象
		Date now = new Date();
		// 更新：updateNum(cid, num, modifiedUser, modifiedTime)
		updateNum(cid, num, username, now);
		// 返回
		return num;
	}

单元测试：

	@Test
	public void addNum() {
		try {
			Integer cid = 60;
			Integer uid = 6;
			String username = "超级管理员";
			Integer num = service.addNum(cid, uid, username);
			System.err.println("num=" + num);
		} catch (ServiceException e) {
			System.err.println(e.getMessage());
		}
	}

### 51. 购物车-增加商品数量-控制器

**1. 处理异常**

`CartNotFoundException`

**2. 设计请求**

	请求路径：/carts/{cid}/add_num
	请求参数：Integer cid, HttpSession session:uid/username
	请求类型：POST
	响应数据：ResponseResult<Integer>
	是否拦截：是，无需修改配置

**3. 处理请求**

	@RequestMapping("{cid}/add_num")
	public ResponseResult<Integer> addNum(
		@PathVariable("cid") Integer cid,
		HttpSession session){
		// 从Session中获取当前登录的用户的信息
		Integer uid = getUidFromSession(session);
		String username = session.getAttribute("username").toString();
		// 执行
		Integer num = cartService.addNum(cid, uid, username);
		// 返回
		return new ResponseResult<Integer>(SUCCESS, num);
	}

完成后，打开浏览器，先登录，通过`http://localhost:8080/carts/5/add_num`进行测试，完成后，将注解修改为`@PostMapping`。

### 52. 显示确认订单页-持久层

**1. SQL**

在确认订单页面需要显示当前用户的所有收货地址，显示到下拉列表中，该功能的持久层、业务层、控制器层都已经完成，通过`http://localhost:8080/addresses/`路径即可访问，无需再次开发。

除此以外，在确认订单页面，还需要显示用户勾选的购物车数据，则需要：

	SELECT 
		cid, gid, 
		t_cart.num,
		title,
		image,
		price 
	FROM 
		t_cart 
	LEFT JOIN 
		t_goods
	ON 
		t_cart.gid=t_goods.id
	WHERE 
		cid IN (?,?,?)
	ORDER BY 
		t_cart.modified_time DESC

**2. 抽象方法**

	List<CartVO> findListByCids(Integer[] cids);

**3. 配置映射**

	<!-- 查询指定的某些id的购物车数据 -->
	<!-- List<CartVO> findListByCids(Integer[] cids) -->
	<select id="findListByCids"
		resultType="cn.tedu.store.vo.CartVO">
		SELECT 
			cid, gid, 
			t_cart.num,
			title,
			image,
			price 
		FROM 
			t_cart 
		LEFT JOIN 
			t_goods
		ON 
			t_cart.gid=t_goods.id
		WHERE 
			cid IN 
			<foreach collection="array"
				item="cid" separator=","
				open="(" close=")">
				#{cid}
			</foreach>
		ORDER BY 
			t_cart.modified_time DESC
	</select>

单元测试：

	@Test
	public void findListByCids() {
		Integer[] cids = {6,3,5};
		List<CartVO> list = mapper.findListByCids(cids);
		System.err.println("BEGIN:");
		for (CartVO cartVO : list) {
			System.err.println(cartVO);
		}
		System.err.println("END.");
	}

### 53. 显示确认订单页-业务层

**1. 异常**

（无）

**2. 抽象方法**

	List<CartVO> getListByCids(Integer[] cids);

**3. 实现**

	@Override
	public List<CartVO> getListByCids(Integer[] cids) {
		return findListByCids(cids);
	}

	/**
	 * 查询指定的某些id的购物车数据
	 * @param cids 多个购物车数据的id的数组
	 * @return 指定的某些id的购物车数据
	 */
	private List<CartVO> findListByCids(Integer[] cids) {
		return cartMapper.findListByCids(cids);
	}

单元测试：

	@Test
	public void getListByCids() {
		Integer[] cids = { 5,3,6 };
		List<CartVO> list = service.getListByCids(cids);
		System.err.println("BEGIN:");
		for (CartVO cartVO : list) {
			System.err.println(cartVO);
		}
		System.err.println("END.");
	}


#------------------------------------PROJECT.DAY12--------------------------------------


### ??. 创建订单-持久层

**创建数据表**

订单表：

	CREATE TABLE t_order (
		oid INT AUTO_INCREMENT COMMENT '订单id',
		uid INT NOT NULL COMMENT '归属用户',
		receiver VARCHAR(20) COMMENT '收货人',
		phone VARCHAR(20) COMMENT '收货电话',
		address VARCHAR(100) COMMENT '收货地址',
		total_price BIGINT COMMENT '总价',
		state INT COMMENT '状态：0-未支付，1-已支付，2-取消',
		order_time DATETIME COMMENT '下单时间',
		pay_time DATETIME COMMENT '支付时间',
		created_user VARCHAR(20) COMMENT '创建者',
		created_time DATETIME COMMENT '创建时间',
		modified_user VARCHAR(20) COMMENT '修改者',
		modified_time DATETIME COMMENT '修改时间',
		PRIMARY KEY (oid)
	) DEFAULT CHARSET UTF8;

订单商品表：

	CREATE TABLE t_order_item (
		id INT AUTO_INCREMENT,
		oid INT NOT NULL COMMENT '订单id',
		goods_id BIGINT COMMENT '商品id',
		goods_title VARCHAR(100) COMMENT '商品标题',
		goods_image VARCHAR(500) COMMENT '商品图片',
		goods_price BIGINT COMMENT '商品单价',
		goods_num INT COMMENT '商品数量',
		created_user VARCHAR(20) COMMENT '创建者',
		created_time DATETIME COMMENT '创建时间',
		modified_user VARCHAR(20) COMMENT '修改者',
		modified_time DATETIME COMMENT '修改时间',
		PRIMARY KEY (id)
	) DEFAULT CHARSET UTF8;

**创建实体类**

创建`cn.tedu.store.entity.Order`，继承自`BaseEntity`；

创建`cn.tedu.store.entity.OrderItem`，继承自`BaseEntity`。

**1. SQL**

	INSERT INTO t_order (xxx) VALUES (xxx);

	INSERT INTO t_order_item (xxx) VALUES (xxx);

**2. 接口与抽象方法**

创建`cn.tedu.store.mapper.OrderMapper`接口，并添加抽象方法：

	Integer insertOrder(Order order);

	Integer insertOrderItem(OrderItem orderItem);

**3. 配置映射**

复制并得到`OrderMapper.xml`文件，根节点的`namespace`对应以上接口，然后配置以上2个抽象方法的映射：

	<mapper namespace="cn.tedu.store.mapper.OrderMapper">
	
		<!-- 插入订单数据 -->
		<!-- Integer insertOrder(Order order) -->
		<insert id="insertOrder">
			INSERT INTO t_order (
				uid, receiver, 
				phone, address, 
				total_price, state, 
				order_time, pay_time,
				created_user, created_time,
		    	modified_user, modified_time
			) VALUES (
				#{uid}, #{receiver},
				#{phone}, #{address},
				#{totalPrice}, #{state},
				#{orderTime}, #{payTime},
				#{createdUser}, #{createdTime},
		    	#{modifiedUser}, #{modifiedTime}
			)
		</insert>
		
		<!-- 插入订单商品数据 -->
		<!-- Integer insertOrderItem(OrderItem orderItem) -->
		<insert id="insertOrderItem">
			INSERT INTO t_order_item (
				oid, goods_id,
				goods_title, goods_image,
				goods_price, goods_num,
				created_user, created_time,
		    	modified_user, modified_time
			) VALUES (
				#{oid}, #{goodsId},
				#{goodsTitle}, #{goodsImage},
				#{goodsPrice}, #{goodsNum},
				#{createdUser}, #{createdTime},
		    	#{modifiedUser}, #{modifiedTime}
			)
		</insert>
	
	</mapper>

单元测试：

	@RunWith(SpringRunner.class)
	@SpringBootTest
	public class OrderMapperTestCase {
	
		@Autowired
		private OrderMapper mapper;
		
		@Test
		public void insertOrder() {
			Order order = new Order();
			order.setUid(6);
			order.setReceiver("小李同学");
			order.setTotalPrice(998L);
			Integer rows = mapper.insertOrder(order);
			System.err.println("rows=" + rows);
		}
		
		@Test
		public void insertOrderItem() {
			OrderItem orderItem = new OrderItem();
			orderItem.setOid(1);
			orderItem.setGoodsTitle("饮料");
			orderItem.setGoodsPrice(3L);
			orderItem.setGoodsNum(6);
			Integer rows = mapper.insertOrderItem(orderItem);
			System.err.println("rows=" + rows);
		}
		
		
	}

### ??. 创建订单-业务层

**1. 异常**

`InsertException`, `UserNotFoundException`, `AddressNotFoundException`, `CartNotFoundException`

**2. 接口与抽象方法**

创建`cn.tedu.store.service.IOrderService`接口，添加抽象方法：

	Order createOrder(Integer uid, Integer aid, Integer[] cids, String username);

**3. 实现**

首先，在`IAddressService`中添加`Address getByAid(Integer aid)`方法，通过`AddressMapper`中的`findByAid(Integer aid)`来实现。

创建`cn.tedu.store.service.impl.OrderServiceImpl`类，实现以上接口，添加`@Service`注解，并添加持久层对象`@Autowired private OrderMapper orderMapper;`，添加收货地址的业务层对象`@Autowired private IAddressService addressService;`，添加购物车数据的业务层对象`@Autowired private ICartService cartService;`

通过私有方法实现持久层的功能。

重写抽象方法：

	public Order createOrder(Integer uid, Integer aid, Integer[] cids, String username) {
		// 根据cids查询对应的购物车数据：List<CartVO> getListByCids(Integer[] cids)
		// 遍历并计算总价：total_price

		// 创建当前时间对象
		// 创建订单Order对象
		// 向Order对象封装uid
		// 根据aid查询地址数据：addressService.getByAid(aid)
		// 判断查询结果，如果为null，抛出异常
		// 向Order对象封装receiver,phone,address
		// 向Order对象封装state值为0
		// 向Order对象封装orderTime为now
		// 向Order对象封装total_price
		// 向Order对象封装4项日志
		// 执行插入订单数据：insertOrder(order);
		
		// 遍历查询结果
		// -- 创建OrderItem对象
		// -- 向OrderItem对象中封装商品相关的5个数据
		// -- 向OrderItem对象中封装oid：order.getOid()
		// -- 执行插入订单商品数据：insertOrderItem(orderItem);
	}

### ??. 创建订单-控制器层

	@PostMapping("create")
	public ResponseResult<Order> create(
		Integer aid, Integer[] cids,
		HttpSession session) {
		// 从Session中获取用户数据
		Integer uid = getUidFromSession(session);
		String username = session.getAttribute("username").toString();
		// 执行
		Order order
			= orderService.createOrder(
				uid, aid, cids, username);
		// 返回
		return new ResponseResult<Order>(
				SUCCESS, order);
	}

在使用`@RequestMapping`注解的情况下，通过`http://localhost:8080/orders/create?aid=11&cids=3&cids=5`进行单元测试。

### 查询指定的订单数据

**1. SQL**

	SELECT
		t_order.oid,
		uid,
		receiver, phone, address,
		total_price,
		state,
		order_time,
		pay_time,
		goods_id,
		goods_title,
		goods_image,
		goods_price,
		goods_num
	FROM t_order
	LEFT JOIN t_order_item
	ON t_order.oid=t_order_item.oid
	WHERE t_order.oid=8

**2. 抽象方法**

创建VO类`cn.tedu.store.vo.OrderVO`：

	public class OrderVO implements Serializable {
	
		private static final long serialVersionUID = -7502488199732110916L;
	
		private Integer oid;
		private Integer uid;
		private String receiver;
		private String phone;
		private String address;
		private Long totalPrice;
		private Integer state;
		private Date orderTime;
		private Date payTime;
		private List<OrderItem> orderItems;

		// SET/GET

	}

在接口中添加抽象方法：

	OrderVO findByOid(Integer oid);

**3. 配置映射**

	<!-- 根据订单id查询订单详情 -->
	<!-- OrderVO findByOid(Integer oid) -->
	<select id="findByOid"
		resultMap="OrderVOMap">
		SELECT
			t_order.oid,
			uid,
			receiver, phone, address,
			total_price,
			state,
			order_time,
			pay_time,
			goods_id,
			goods_title,
			goods_image,
			goods_price,
			goods_num
		FROM 
			t_order
		LEFT JOIN 
			t_order_item
		ON 
			t_order.oid=t_order_item.oid
		WHERE 
			t_order.oid=#{oid}
	</select>
	
	<resultMap id="OrderVOMap" 
		type="cn.tedu.store.vo.OrderVO">
		<id column="oid" property="oid"/>
		<result column="uid" property="uid"/>
		<result column="receiver" property="receiver"/>
		<result column="phone" property="phone"/>
		<result column="address" property="address"/>
		<result column="total_price" property="totalPrice"/>
		<result column="state" property="state"/>
		<result column="order_time" property="orderTime"/>
		<result column="pay_time" property="payTime"/>
		<collection property="orderItems"
			ofType="cn.tedu.store.entity.OrderItem">
			<result column="goods_id" property="goodsId"/>
			<result column="goods_title" property="goodsTitle"/>
			<result column="goods_image" property="goodsImage"/>
			<result column="goods_price" property="goodsPrice"/>
			<result column="goods_num" property="goodsNum"/>
		</collection>
	</resultMap>

单元测试：

	@Test
	public void findByOid() {
		Integer oid = 8;
		OrderVO data = mapper.findByOid(oid);
		System.err.println(data);
	}

当找到数据时，输出结果如下：

	OrderVO [
		oid=8, 
		uid=6, 
		receiver=小李, 
		phone=13800138777, 
		address=江西省新余市市辖区, 
		totalPrice=93940, 
		state=0, 
		orderTime=Wed Feb 20 15:58:36 CST 2019, 
		payTime=null, 
	
		orderItems=[
			OrderItem [id=null, oid=null, goodsId=100000424, goodsTitle=联想ThinkPad New S1（01CD） i5 6代 蓝色, goodsImage=/images/portal/21ThinkPad_New_S1/, goodsPrice=4399, goodsNum=6], 
			OrderItem [id=null, oid=null, goodsId=10000022, goodsTitle=联想（Lenovo）IdeaPad310经典版黑色, goodsImage=/images/portal/13LenovoIdeaPad310_black/, goodsPrice=5119, goodsNum=6], 
			OrderItem [id=null, oid=null, goodsId=10000017, goodsTitle=戴尔(DELL)XPS13-9360-R1609 13.3高配版银色, goodsImage=/images/portal/12DELLXPS13-silvery/, goodsPrice=4604, goodsNum=8]
		]
	]

### Spring AOP

面向切面的编程主要应用于：在某种执行流程中产生切面，当程序的执行流程执行到切面时，就会执行切面中指定的代码。开发者可以自由的指定切面的切入点、切面的应用范围、切面中需要执行的任务。切面应用到某种执行流程中时，并不需要修改原流程中涉及的任何代码。

面向切面的编程并不是Spring所独有的，只是Spring提供了一种更加快捷的创建、管理切面的做法。

使用时添加新的依赖：

	<dependency>
		<groupId>aspectj</groupId>
		<artifactId>aspectj-tools</artifactId>
		<version>1.0.6</version>
	</dependency>

	<dependency>
		<groupId>org.aspectj</groupId>
		<artifactId>aspectjweaver</artifactId>
		<version>1.9.2</version>
	</dependency>

然后，创建切面类并编写切面中的方法：

	@Aspect
	@Component
	public class ServiceRuntimeAspect {
	
		@Around("execution(* cn.tedu.store.service.impl.*.*(..))")
		public Object a(ProceedingJoinPoint pjp) throws Throwable {
			// 记录开始时间
			long start = System.currentTimeMillis();
			
			// 执行切面应用到的方法
			Object result = pjp.proceed();
			
			// 记录结束时间并统计耗时
			long end = System.currentTimeMillis();
			System.err.println("耗时：" + (end - start) + "ms");
			
			// 返回
			return result;
		}
		
	}

切面类应该添加`@Aspect`注解表示这是一个切面类，添加`@Component`注解，使得它被Spring管理。

如果切面是在某方法之前和之后都需要执行的，则使用`@Around`注解，如果只在某方法之前执行，则使用`@Before`，如果只在某方法之后执行，则使用`@After`，一般，推荐使用`@Around`。

在注解中的`"execution(* cn.tedu.store.service.impl.*.*(..))"`表达式表示该切面应用到`cn.tedu.store.service.impl`包中的所有类（第1个星号）的所有方法（第2个星号），且方法的参数是任意的（后续的括号和2个小数点）。

切面方法应该添加`ProceedingJoinPoint pjp`参数，用于执行切面所应用到的方法，当需要执行所应用到的方法时，调用该参数对象的`proceed()`方法即可，需要注意的是：必须获取此次调用的返回值，并作为当前切面方法的返回值，否则，切面应用到的方法将不会返回值。











