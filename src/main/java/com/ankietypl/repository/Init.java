package com.ankietypl.repository;

/**
 * Created by DiiES on 2017-06-15.
 */


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;


/**
 * Created by DiiES on 2017-06-05.
 */

import com.ankietypl.model.Role;
import com.ankietypl.model.User;


/**
 * Created by kosa1010 on 04.01.17.
 */
@Component
public class Init {

    @Autowired
    UserRepository userRepository;



    @PostConstruct
    public void init() {
        User user1 = userRepository.findOneByEmail("user@o2.pl");
        User admin = userRepository.findOneByEmail("admin@o2.pl");
        if (user1 == null) {
            User user = new User();
            user.setEmail("user@o2.pl");
            user.setFirstName("User");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("admin"));
            user.setRole(Role.ROLE_USER);
            userRepository.save(user);
        }
        if (admin == null) {
            User user = new User();
            user.setEmail("admin@o2.pl");
            user.setFirstName("Dominika");
            user.setLastName("Sporzyńska");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("admin"));
            user.setRole(Role.ROLE_ADMIN);
            userRepository.save(user);
        }


    }
}

