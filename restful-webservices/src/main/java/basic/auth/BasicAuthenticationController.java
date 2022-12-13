package basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Controller: handles http requests
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {

    /**
     * authenticates the user
     */
    @GetMapping(path = "/basicauth")
    public AuthenticationBean helloWorldBeanName() {
        //throw new RuntimeException("something went wrong");
        return new AuthenticationBean("You are authenticated");
    }


}
