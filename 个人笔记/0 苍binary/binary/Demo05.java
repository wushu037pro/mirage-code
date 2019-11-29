package binary;

public class Demo05 {

	public static void main(String[] args) {
		int n = -104;
		int m = n>>1;
		int k = n>>2;
		int h = n>>3;
		int g = n>>4;
		System.out.println(n);
		System.out.println(m);
		System.out.println(k);
		System.out.println(h);
		System.out.println(g);
		
		int a = n>>>1;
		System.out.println(a);
		System.out.println(
				Integer.toBinaryString(a));
		
	}

}
