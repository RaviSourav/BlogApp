package com.springboot.blog_app.controller;

import com.springboot.blog_app.entity.Post;
import com.springboot.blog_app.payload.PostDto;
import com.springboot.blog_app.payload.PostResponse;
import com.springboot.blog_app.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping()
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto){
        return new ResponseEntity<>(postService.createPost(postDto), HttpStatus.CREATED);
    }

    @GetMapping()
    public PostResponse getAllPosts(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
                                    @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
                                    @RequestParam (value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                    @RequestParam (value = "sortDir", defaultValue = "id", required = false) String sortDir){
        return postService.getAllPosts(pageNo, pageSize, sortBy, sortDir);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long id){
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public PostDto updatePost(@PathVariable Long id, @RequestBody PostDto postDto){
        return postService.updatePost(postDto, id);
    }

    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Long id){
        postService.deletePostById(id);
        return "Post deleted SuccessFully";
    }
}
