# Troubleshooting Guide: Sign Out & Private Repository Issues

## 🚨 **Issues Fixed**

### 1. **Sign Out Not Working**
**Problem**: Sign out button doesn't properly log users out
**Root Cause**: Session invalidation wasn't complete

**Fix Applied**:
- Enhanced logout endpoint to clear Spring Security context
- Added proper session invalidation
- Updated frontend to force page reload after logout

### 2. **Private Repositories Not Showing**
**Problem**: Only public repos visible despite `repo` scope
**Root Cause**: Access token retrieval was incorrect

**Fix Applied**:
- Fixed access token retrieval using `OAuth2AuthorizedClientService`
- Updated GitHub API calls to use proper authentication
- Added debug endpoint to troubleshoot token issues

## 🧪 **Testing Steps**

### **Test Sign Out:**
1. **Sign in** to the application
2. **Click "Sign Out"** button
3. **Check**: Should return to sign-in screen
4. **Verify**: Trying to access `/user` should require re-authentication

### **Test Private Repository Access:**
1. **Clear session** (sign out completely)
2. **Sign in again** (triggers new OAuth with `repo` scope)
3. **Check permission screen**: Should request access to all repositories
4. **Approve** the broader permissions
5. **Check repository list**: Should now show private repositories

### **Debug Token Access:**
Visit: `http://localhost:5174` → Sign in → Check browser console for:
- `✅ API access confirmed` in logs
- Repository count in the UI

Or check debug endpoint directly (when authenticated):
`GET /api/debug/token` - Shows token access status

## 🔍 **Common Issues & Solutions**

### **Sign Out Still Not Working:**
1. **Clear browser cache/cookies**
2. **Check browser console** for errors
3. **Try incognito/private window**
4. **Manually visit**: `http://localhost:8080/logout`

### **Private Repos Still Not Visible:**
1. **Check OAuth scope**: Should be `read:user,user:email,repo`
2. **Revoke app permissions** on GitHub: https://github.com/settings/applications
3. **Re-authenticate** to trigger new permission screen
4. **Check GitHub permissions**: Ensure app has repository access

### **"No repositories found" Message:**
This could mean:
- OAuth scope insufficient (should be `repo`, not `public_repo`)
- User hasn't granted permission to private repos
- Access token not properly retrieved
- User actually has no repositories

## 🔧 **Backend Changes Made**

### **UserController.java:**
```java
// Enhanced logout
@PostMapping("/logout")
public Map<String, Object> logout(HttpServletRequest request, HttpServletResponse response) {
    if (request.getSession(false) != null) {
        request.getSession().invalidate();
    }
    SecurityContextHolder.clearContext();
    return Collections.singletonMap("status", "logged out");
}

// Debug endpoint
@GetMapping("/api/debug/token")
// ... shows token access status
```

### **GitHubRepositoryService.java:**
```java
// Fixed access token retrieval
private String getAccessToken() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication instanceof OAuth2AuthenticationToken) {
        OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) authentication;
        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
            oauth2Token.getAuthorizedClientRegistrationId(),
            oauth2Token.getName()
        );
        return authorizedClient.getAccessToken().getTokenValue();
    }
    throw new RuntimeException("No valid access token found");
}
```

## 🚀 **Current Status**

- ✅ **Backend restarted** with fixes
- ✅ **OAuth scope**: Set to `repo` for full access
- ✅ **Logout mechanism**: Enhanced with proper cleanup
- ✅ **Token retrieval**: Fixed to use OAuth2AuthorizedClientService
- ✅ **Debug endpoint**: Added for troubleshooting

## 📋 **Next Steps**

1. **Test the sign out functionality**
2. **Re-authenticate to trigger new OAuth permissions**
3. **Check if private repositories appear**
4. **Use debug endpoint if issues persist**

Both issues should now be resolved! 🎉
