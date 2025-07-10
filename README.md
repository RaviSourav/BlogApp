Spring Boot Auto Configuration for Spring Security
Spring Boot automatically configures the following features for Spring Security:

spring-boot-starter-security starter that aggregates Spring Security-related dependencies together.
Enables Spring Security’s default configuration, which:
Creates a servlet Filter as a bean named springSecurityFilterChain.
Provides a default login form.
Creates a default user with:
Username: user
A randomly generated password that is logged to the console (e.g., 8e557245-73e2-4286-969a-ff57fe326336).
Provides properties to customize the default user’s username and password.
Protects password storage with the BCrypt algorithm.
Includes a default logout feature.
Enables CSRF attack prevention by default.
If Spring Security is on the classpath, Spring Boot automatically secures all HTTP endpoints with basic authentication.

1. Spring Security Working Mechanism:

<img width="1638" height="829" alt="image" src="https://github.com/user-attachments/assets/583ca82c-a790-4395-a795-744b3fad5974" />




<br/><br/><br/><br/><br/>



2. How Database Authentication Works:
   
<img width="1208" height="632" alt="image" src="https://github.com/user-attachments/assets/3c3d8dc8-7bf8-4180-8e0c-a0c504469959" />

<br/><br/><br/><br/><br/>

Questions:
1. Lazy and Eager?
2. Different Authentication Method given in above screenshot as we implemented only DAO Authentication method?
3. Learn the Debug and especially with Security?
4. 2025-07-11T00:08:31.951+05:30  WARN 87749 --- [springboot-blog-rest-api] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning?
5. 
