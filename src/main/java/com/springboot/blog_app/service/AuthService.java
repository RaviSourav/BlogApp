package com.springboot.blog_app.service;

import com.springboot.blog_app.payload.LoginDto;
import com.springboot.blog_app.payload.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);

    String register(RegisterDto registerDto);
}