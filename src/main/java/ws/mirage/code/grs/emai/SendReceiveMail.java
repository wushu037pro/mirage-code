package ws.mirage.code.grs.emai;

import java.util.Scanner;

/**
 * @author Mirage
 * @create 2019-12-04 9:25
 */
public class SendReceiveMail {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Waiting for input......");
        String email = "826187779@qq.com";
        String content = scanner.next();
        try {
            MiMailService.sendMail(email,"hi",content);
            System.err.println("success！");
            main(new String [0]);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("邮件发送失败，邮件发送过程中出现异常！");
        }
    }
}
