package util;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;

public class DBUtil {
	
	/** 声明连接池(导入commons-dbcp:1.4的jar包) */
	private static BasicDataSource ds;
		
	static{
		//读取连接参数
		Properties p = new Properties();
		try {
			/** 读取参数 */
			p.load(DBUtil.class.getClassLoader().getResourceAsStream("db.properties"));
			/** 数据库连接参数 */
			String driver = p.getProperty("driver");
			String url = p.getProperty("url");
			String user = p.getProperty("user");
			String pwd = p.getProperty("pwd");
			/** 连接池参数 */
			String initSize = p.getProperty("initSize");
			String maxSize = p.getProperty("maxSize");
			/** 创建连接池，并设置参数 */
			ds = new BasicDataSource();
			/* 设置连接数据库 */
			ds.setDriverClassName(driver);
			/* 设置连接地址，端口，sid*/
			ds.setUrl(url);
			/* 设置帐号 */
			ds.setUsername(user);
			/* 设置密码 */
			ds.setPassword(pwd);
			/* 设置初始连接数 */
			ds.setInitialSize(Integer.parseInt(initSize));
			/* 设置最大连接数 */
			ds.setMaxActive(Integer.parseInt(maxSize));
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("找不到文件",e);
		}
	}
	
	public static Connection getConnection() throws SQLException{
		return ds.getConnection();
	}
	/**
	 * 创建一个归还连接的方法
	 * 连接池创建的连接，其close方法不再是关闭连接，而是将连接归还给连接池
	 * 连接池会将此连接数据清空并标识为空闲
	 * @param conn
	 */
	public static void close(Connection conn){
		if(conn != null){
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException("归还连接失败",e);
			}
		}
	}
	
	public static void main(String[] args) throws SQLException {
	Connection conn = 	DBUtil.getConnection();
	System.out.println(conn);
	}
}
