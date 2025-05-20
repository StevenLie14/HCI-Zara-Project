package com.zaraclone.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String productImage;
    private Timestamp createdAt;
    private Timestamp updatedAt;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "product_id")
//    private Product product;
}
