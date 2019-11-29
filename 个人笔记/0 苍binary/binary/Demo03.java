package binary;

public class Demo03 {

	public static void main(String[] args) {
		/**
		 * ²¹Âë
		 */
		int n = -3;
		System.out.println(
			Integer.toBinaryString(n));
		int max = Integer.MAX_VALUE;
		System.out.println(
			Integer.toBinaryString(max));
		int min = Integer.MIN_VALUE;
		System.out.println(
			Integer.toBinaryString(min));
		n = -1;
		System.out.println(
			Integer.toBinaryString(n));
		
		int max1 = 0x7fffffff;//max
		int k = 0xffffffff;//-1
		int min1 = 0x80000000;//min 
		
		n = -11;
		System.out.println(
			Integer.toBinaryString(n));
		
		for (int i = -50; i <= 0; i++) {
			System.out.println(
				Integer.toBinaryString(i)); 
		}
	}

}





