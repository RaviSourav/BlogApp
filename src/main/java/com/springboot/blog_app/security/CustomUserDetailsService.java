package com.springboot.blog_app.security;

import com.springboot.blog_app.entity.User;
import com.springboot.blog_app.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {


    private UserRepository userRepository;

    //dependency injection using constructor based dependency injection
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


//    GrantedAuthority instead of plain Strings Because GrantedAuthority is a Spring Security abstraction. Internally, Spring uses it to:
//  •	Check roles/permissions during authorization (hasRole, hasAuthority)
//	•	Secure controller methods (@PreAuthorize("hasRole('ADMIN')"))
//	•	Manage fine-grained access control
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
          User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                 .orElseThrow(() ->
                         new UsernameNotFoundException("User not found with username or email: "+ usernameOrEmail));

//        You’re getting roles via JPA relationships automatically — as long as the User entity maps to Role with EAGER fetch or appropriate JPQL.
//        Even though you’re only calling userRepository, the roles are still retrieved if you’ve set up a proper JPA relationship
//                (like @OneToMany or @ManyToMany) between User and Role.
        Set<GrantedAuthority> authorities = user
                .getRoles()
                .stream()
                .map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                authorities);
    }
}