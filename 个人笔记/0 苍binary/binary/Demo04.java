package binary;

import java.io.RandomAccessFile;

public class Demo04 {
	public static void main(String[] args) {
		/**
		 * 补码的互补对称性
		 * 
		 * ~ 计算是将数据的2进制值取反 1变0 0变1
		 */
		int n = 100;
		int m = ~n+1;
		System.out.println(m);//-100
		//展示：取反加一的工作原理
		n = 8;
		System.out.println(
				Integer.toBinaryString(n));
		System.out.println(
				Integer.toBinaryString(~n));
		System.out.println(
				Integer.toBinaryString(~n+1));
		
		//经典面试题目：
		System.out.println(~-5);
		//如上代码的结果是（  ） 答案：B
		//A.-5  B.4  C.5  D.6
		
		//RandomAccessFile raf;
		//raf.writeInt(v);
		
	}
}



