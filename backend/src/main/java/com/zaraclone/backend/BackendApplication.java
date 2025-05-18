package com.zaraclone.backend;

import com.zaraclone.backend.repositories.CategoryRepository;
import com.zaraclone.backend.repositories.ProductRepository;
import com.zaraclone.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaAuditing
public abstract class BackendApplication{

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }


}
