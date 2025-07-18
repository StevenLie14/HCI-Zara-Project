package com.zaraclone.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EntityListeners(AuditingEntityListener.class)
@Table(name = "shipping_addresses")
public class ShippingAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String address;
    private String name;
    private String city;
    private String province;
    private String country;
    private String postalCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> shippingAddresses;

    @CreatedDate
    private Timestamp createdAt;

    @LastModifiedDate
    private Timestamp updatedAt;
}
