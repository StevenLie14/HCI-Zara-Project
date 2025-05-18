package com.zaraclone.backend.services;

import io.minio.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class MinioService {

    @Autowired
    private MinioClient minioClient;
    @Value("${minio.bucket.name}")
    private String bucketName;

    public boolean isBucketExists(String bucketName) throws Exception {
        return minioClient.bucketExists(BucketExistsArgs.
                builder()
                .bucket(bucketName)
                .build());
    }

    public void uploadFile(String fileName, InputStream inputStream, String contentType) throws Exception {
        boolean isExist = isBucketExists(bucketName);
        if (!isExist) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }

        minioClient.putObject(PutObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .stream(inputStream, inputStream.available(), -1)
                .contentType(contentType)
                .build());
    }

    public InputStream downloadFile(String fileName) throws Exception {
        return minioClient.getObject(GetObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .build());
    }

    public void deleteFile(String fileName) throws Exception {
        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .build());
    }

}
