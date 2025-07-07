package com.springboot.blog_app.controller;

import com.springboot.blog_app.payload.CommentDto;
import com.springboot.blog_app.repository.CommentRepository;
import com.springboot.blog_app.service.CommentService;
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
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto, @PathVariable(name = "id") Long postId) {
        return new ResponseEntity<>(commentService.createComment(commentDto, postId), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/comments")
    public List<CommentDto> getComment(@PathVariable(name = "id") Long postId) {
        return commentService.findAll(postId);
    }
}
