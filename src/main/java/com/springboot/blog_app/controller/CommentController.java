package com.springboot.blog_app.controller;

import com.springboot.blog_app.payload.CommentDto;
import com.springboot.blog_app.repository.CommentRepository;
import com.springboot.blog_app.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/{id}/comments")
    public ResponseEntity<CommentDto> createComment(@Valid @RequestBody CommentDto commentDto, @PathVariable(name = "id") Long postId) {
        return new ResponseEntity<>(commentService.createComment(commentDto, postId), HttpStatus.CREATED);
    }

    @GetMapping("/{postId}/comments")
    public List<CommentDto> getComment(@PathVariable Long postId) {
        return commentService.findAllComments(postId);
    }

    @GetMapping("{postId}/comments/{commentId}")
    public CommentDto findComment(@PathVariable Long postId, @PathVariable Long commentId) {
        return commentService.getCommentById(postId, commentId);
    }

    @PutMapping("{postId}/comments/{commentId}")
    public CommentDto updateComment(@PathVariable Long postId, @PathVariable Long commentId, @Valid @RequestBody CommentDto commentDto) {
        return commentService.updateComment(postId, commentId, commentDto);
    }

    @DeleteMapping("{postId}/comments/{commentId}")
    public String deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
        return commentService.deleteComment(postId, commentId);
    }
}
