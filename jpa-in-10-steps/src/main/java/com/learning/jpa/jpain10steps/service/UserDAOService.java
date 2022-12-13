package com.learning.jpa.jpain10steps.service;

import com.learning.jpa.jpain10steps.entity.User;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;


@Repository
@Transactional
public class UserDAOService {

    @PersistenceContext
    private EntityManager entityManager;

    public long insert(User user) {
        // open transaction
        entityManager.persist(user);
        return user.getId();
    }
}

/*
public class SomeEntityDAOService {
    @PersistenceContext
    private EntityManager entityManager;


}
*/


