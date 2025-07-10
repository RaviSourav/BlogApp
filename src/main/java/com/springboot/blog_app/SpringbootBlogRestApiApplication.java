package com.springboot.blog_app;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringbootBlogRestApiApplication {

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBlogRestApiApplication.class, args);

//		This is to print a custom banner instead of Spring Boot when application starts
//		SpringApplication app = new SpringApplication(SpringbootBlogRestApiApplication.class);
//		app.setBanner((environment, sourceClass, out) -> out.println(":: Ravi Sourav ::"));
//		app.run(args);
	}

}
