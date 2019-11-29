package binary;

public class Demo06 {

	public static void main(String[] args) 
		throws Exception {
		/**
		 * UTF-8 案例演示
		 * 
		 * 0~127 1字节编码
		 * 128~2047 2字节编码
		 * 2048~65535 3字节编码
		 * 65536~1000000 4字节编码
		 */
		// 65      编码是1字节
		// 2000 编码是2字节
		// '好' 编码是3字节
		char[] chs = {65, 2000, '好'};
		String str = new String(chs);
		//UTF-8编码
		byte[] bytes=str.getBytes("UTF-8");
		System.out.println(bytes.length); 
		
		//UTF-8解码
		String s = new String(bytes, "UTF-8");
		System.out.println(s);
	}

}
