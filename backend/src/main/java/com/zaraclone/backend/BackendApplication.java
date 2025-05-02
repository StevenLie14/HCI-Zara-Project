package com.zaraclone.backend;

import com.zaraclone.backend.repositories.CategoryRepository;
import com.zaraclone.backend.repositories.ProductRepository;
import com.zaraclone.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public abstract class BackendApplication implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public BackendApplication(UserRepository userRepository,
                              ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.findAll().forEach(System.out::println);
        categoryRepository.findAll().forEach(System.out::println);
    }

}
