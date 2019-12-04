package ws.mirage.code.grs.emai;

import javax.mail.*;
import javax.mail.search.FlagTerm;
import java.util.Properties;

/**
 * @author Mirage
 * @create 2019-12-04 9:34
 */
public class ReceiveMail {
//    public void getMessageQQ() {
//
//        try {
//
//            //创建一个有具体连接信息的Properties对象
//            Properties props = new Properties();
//            props.setProperty("mail.imap.socketFactory.class", "javax.net.ssl.SSLSocketFactory");//ssl加密,jdk1.8无法使用
//            props.setProperty("mail.imap.socketFactory.fallback", "false");
//            props.setProperty("mail.transport.protocol", "imap"); // 使用的协议
//            props.setProperty("mail.imap.port", "993");
//            props.setProperty("mail.imap.socketFactory.port", "993");
//
//            Session session = Session.getDefaultInstance(props);
////  session.setDebug(true);
//            Store store = session.getStore("imap");
//            store.connect("imap.qq.com", "xxxx@qq.com", "xxxx");//登录认证
//
//            Folder folder = store.getFolder("inbox");//获取用户的邮件账户
//            folder.open(Folder.READ_WRITE);//设置对邮件账户的访问权限
//
//            FlagTerm ft = new FlagTerm(new Flags(Flags.Flag.SEEN), false);//false代表未读，true代表已读
//
////  Message[] messages = folder.getMessages();
//            Message[] messages = folder.search(ft);
//
//            for (int i = 0; i < messages.length; i++) {
//
//                String subject = messages[i].getSubject();
//                String from = (messages[i].getFrom()[0]).toString();
//                String content = messages[i].getContent().toString();
//
//                System.out.println("第 " + (i + 1) + " 封邮件的发件人地址---->>>" + from);
//                System.out.println("第 " + (i + 1) + " 封邮件的主题--->>>" + subject);
//                System.out.println("第 " + (i + 1) + " 封邮件的内容---->>>" + content);
//                System.out.println("-----------------------------------------");
//
//                messages[i].setFlag(Flags.Flag.SEEN, false);//imap读取后邮件状态变为已读
//            }
//
//            folder.close(false);
//            store.close();
//        } catch (Exception e) {
//
//            e.printStackTrace();
//        }
//    }


}
