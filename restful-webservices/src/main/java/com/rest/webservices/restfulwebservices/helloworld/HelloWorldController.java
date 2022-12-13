package com.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// Controller: handles http requests
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {

    /**
     * returns "Hello World" after receiving a /hello-world URI
     */
    @GetMapping(path = "/hello-world")
    public String helloWorld() {
        return "Hello World!";
    }

    /**
     * returns "Hello World Bean" after receiving a /hello-world-bean URI
     */
    @GetMapping(path = "/hello-world-bean")
    public HelloWorldBean helloWorldBean() {
        return new HelloWorldBean("Hello World Bean!");
    }

    /**
     * returns "Hello World {name}" after receiving a /hello-world-bean/{name} URI w/ path variable
     */
    @GetMapping(path = "/hello-world-path-variable/{name}")
    public HelloWorldBean helloWorldBeanName(@PathVariable String name) {
        //throw new RuntimeException("something went wrong");
        return new HelloWorldBean(String.format("Hello World %s",name));
    }





}
