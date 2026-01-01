package com.ecommerce.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(auth -> auth
				// 개발 환경: 모든 요청 허용
				.anyRequest().permitAll()
			)
			// 개발 환경: CSRF 비활성화
			.csrf(csrf -> csrf.disable())
			.headers(headers -> headers
				.frameOptions(frameOptions -> frameOptions.disable())
			);

		return http.build();
	}
}

