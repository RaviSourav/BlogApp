package com.springboot.blog_app.service.impl;

import com.springboot.blog_app.entity.Comment;
import com.springboot.blog_app.entity.Post;
import com.springboot.blog_app.exception.ResourceNotFoundException;
import com.springboot.blog_app.payload.CommentDto;
import com.springboot.blog_app.repository.CommentRepository;
import com.springboot.blog_app.repository.PostRepository;
import com.springboot.blog_app.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public CommentDto createComment(CommentDto commentDto, Long postId) {
        Comment comment = mapToComment(commentDto);
        Post post = postRepository.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));
        comment.setPost(post);
        return mapToCommentDto(commentRepository.save(comment));
    }

    @Override
    public List<CommentDto> findAll(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream().map(comment -> mapToCommentDto(comment)).collect(Collectors.toList());
//        comments.stream().map(this::mapToCommentDto).collect(Collectors.toList());
    }

    private CommentDto mapToCommentDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setName(comment.getName());
        commentDto.setEmail(comment.getEmail());
        commentDto.setBody(comment.getBody());
        return commentDto;
    }

    private Comment mapToComment(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setName(commentDto.getName());
        comment.setEmail(commentDto.getEmail());
        comment.setBody(commentDto.getBody());
        return comment;
    }
}
