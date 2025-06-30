package com.vpec.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GitHubRepositoryService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    private String getAccessToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) authentication;
            OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                oauth2Token.getAuthorizedClientRegistrationId(),
                oauth2Token.getName()
            );
            if (authorizedClient != null && authorizedClient.getAccessToken() != null) {
                return authorizedClient.getAccessToken().getTokenValue();
            }
        }
        throw new RuntimeException("No valid access token found");
    }

    public List<Map<String, Object>> getUserRepositories(OAuth2User user) {
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch repositories: " + e.getMessage());
        }
    }

    public Map<String, Object> createRepository(OAuth2User user, String repositoryName, String description, boolean isPrivate) {
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.set("Content-Type", "application/json");

        Map<String, Object> requestBody = Map.of(
            "name", repositoryName,
            "description", description != null ? description : "Created by VibeSpec AI",
            "private", isPrivate,
            "auto_init", true
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                "https://api.github.com/user/repos",
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create repository: " + e.getMessage());
        }
    }
}
