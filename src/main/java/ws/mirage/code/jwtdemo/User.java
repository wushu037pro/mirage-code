package ws.mirage.code.jwtdemo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Mirage
 * @create 2019-11-04 11:19
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    String Id;
    String username;
    String password;


}
