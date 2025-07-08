package com.springboot.blog_app.service;

import com.springboot.blog_app.payload.CommentDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    CommentDto createComment(CommentDto commentDto, Long postId);

    List<CommentDto> findAllComments(Long postId);

    CommentDto getCommentById(Long postId, Long commentId);

    CommentDto updateComment(Long postId, Long commentId, CommentDto commentDto);

    String deleteComment(Long postId, Long commentId);
}
