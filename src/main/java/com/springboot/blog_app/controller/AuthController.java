package com.springboot.blog_app.controller;

//import com.springboot.blog_app.payload.JWTAuthResponse;
import com.springboot.blog_app.payload.LoginDto;
import com.springboot.blog_app.payload.RegisterDto;
import com.springboot.blog_app.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Build Login REST API
    @PostMapping(value = {"/login", "/signin"})
        public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
//        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        String token = authService.login(loginDto);
//        jwtAuthResponse.setAccessToken(token);
//        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

//     Build Register REST API
    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}