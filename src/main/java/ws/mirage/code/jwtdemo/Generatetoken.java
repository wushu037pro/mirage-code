package ws.mirage.code.jwtdemo;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import javax.xml.crypto.Data;
import java.util.Date;

/**
 * @author Mirage
 * @create 2019-11-04 11:34
 */
public class Generatetoken {

    public String getToken(User user){
        long EXPIRE_TIME = 10*10*1000;
        Date date = new Date(System.currentTimeMillis()+EXPIRE_TIME);

        String token="";
        /*
         * Algorithm.HMAC256():使用HS256生成token,密钥则是用户的密码，唯一密钥的话可以保存在服务端。
         * withAudience()存入需要保存在token的信息，这里我把用户ID存入token中
         */
        token = JWT.create().withAudience(user.getId())
                .withExpiresAt(date)// 设置过期时间
                .sign(Algorithm.HMAC256(user.getPassword()));

        return token;
    }


}
