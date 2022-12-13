package com.learning.jpa.jpain10steps;

import com.learning.jpa.jpain10steps.entity.User;
import com.learning.jpa.jpain10steps.service.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.List;
import java.util.Optional;

public class UserRepositoryCommandLineRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(UserDaoServiceCommandLineRunner.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User user = new User("Jill", "admin");
        userRepository.save(user);
        log.info("New user is created: " + user);

        Optional<User> userWithID1 = userRepository.findById(1L);
        log.info("User with id 1: " + userWithID1);

        List<User> users = userRepository.findAll();
        log.info("Users: " + users);

    }

}
