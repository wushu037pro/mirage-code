package binary;

public class Demo01 {
	public static void main(String[] args) {
		/**
		 * 认识2进制
		 */
		int n = 16; //10000
		//将一个数在内存中的2进制显示出来
		System.out.println(
			Integer.toBinaryString(n));
		//API: 将10000 转换为 “16”显示
		System.out.println(n);//16
		
		for(int i=0; i<100; i++){
			System.out.println(
				Integer.toBinaryString(i));
		}
		
	}
}





