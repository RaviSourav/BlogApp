package com.springboot.blog_app.service;

import com.springboot.blog_app.payload.CommentDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    CommentDto createComment(CommentDto commentDto, Long postId);

    List<CommentDto> findAll(Long postId);
}
