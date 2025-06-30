package com.vpec.controller;

import com.vpec.service.GitHubIntegrationService;
import com.vpec.service.GitHubRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private GitHubIntegrationService gitHubIntegrationService;

    @Autowired
    private GitHubRepositoryService gitHubRepositoryService;

    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Collections.singletonMap("error", "Not authenticated");
        }
        
        Map<String, Object> userInfo = new HashMap<>();
        String name = principal.getAttribute("name");
        String login = principal.getAttribute("login");
        
        // Use login as fallback if name is null
        userInfo.put("name", name != null ? name : login);
        userInfo.put("login", login);
        userInfo.put("avatar_url", principal.getAttribute("avatar_url"));
        
        return userInfo;
    }

    @PostMapping("/api/create-repository")
    public Map<String, Object> createRepository(@AuthenticationPrincipal OAuth2User principal, 
                                               @RequestBody Map<String, String> request) {
        if (principal == null) {
            return Collections.singletonMap("error", "Not authenticated");
        }
        
        String repositoryName = request.get("repositoryName");
        gitHubIntegrationService.createRepository(principal, repositoryName);
        
        return Collections.singletonMap("status", "Repository creation initiated");
    }

    @GetMapping("/api/debug/token")
    public Map<String, Object> debugToken(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Collections.singletonMap("error", "Not authenticated");
        }
        
        Map<String, Object> debug = new HashMap<>();
        debug.put("principal_type", principal.getClass().getSimpleName());
        debug.put("attributes_count", principal.getAttributes().size());
        debug.put("attribute_keys", principal.getAttributes().keySet());
        
        // Check if we can get the access token
        try {
            List<Map<String, Object>> repos = gitHubRepositoryService.getUserRepositories(principal);
            debug.put("repo_access", "SUCCESS");
            debug.put("repo_count", repos.size());
        } catch (Exception e) {
            debug.put("repo_access", "FAILED");
            debug.put("repo_error", e.getMessage());
        }
        
        return debug;
    }

    @GetMapping("/api/repositories")
    public Map<String, Object> getUserRepositories(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Collections.singletonMap("error", "Not authenticated");
        }

        try {
            List<Map<String, Object>> repositories = gitHubRepositoryService.getUserRepositories(principal);
            return Map.of("repositories", repositories);
        } catch (Exception e) {
            return Collections.singletonMap("error", "Failed to fetch repositories: " + e.getMessage());
        }
    }

    @PostMapping("/api/repositories/create")
    public Map<String, Object> createNewRepository(@AuthenticationPrincipal OAuth2User principal,
                                                   @RequestBody Map<String, Object> request) {
        if (principal == null) {
            return Collections.singletonMap("error", "Not authenticated");
        }

        try {
            String name = (String) request.get("name");
            String description = (String) request.get("description");
            Boolean isPrivate = (Boolean) request.getOrDefault("private", false);

            Map<String, Object> repository = gitHubRepositoryService.createRepository(principal, name, description, isPrivate);
            return Map.of("status", "success", "repository", repository);
        } catch (Exception e) {
            return Collections.singletonMap("error", "Failed to create repository: " + e.getMessage());
        }
    }
}
