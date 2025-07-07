package com.springboot.blog_app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private String resourcenName;
    private String fieldName;
    private Long fieldValue;

    public ResourceNotFoundException(String resourcenName, String fieldName, Long fieldValue) {
        super(String.format("Resource %s not found with %s : %s", resourcenName, fieldName, fieldValue));
        this.resourcenName = resourcenName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourcenName() {
        return resourcenName;
    }
    public String getFieldName() {
        return fieldName;
    }
    public Long getFieldValue() {
        return fieldValue;
    }
}
