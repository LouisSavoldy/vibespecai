# Manual Repository URL Input - Test Cases

Here are some test cases to verify the URL parsing functionality works correctly:

## Test URLs

### HTTPS URLs
- `https://github.com/microsoft/vscode` → `microsoft/vscode`
- `https://github.com/facebook/react.git` → `facebook/react`
- `https://github.com/LouisSavoldy/vibespecai` → `LouisSavoldy/vibespecai`
- `https://github.com/LouisSavoldy/vibespecai.git` → `LouisSavoldy/vibespecai`

### SSH URLs
- `git@github.com:microsoft/vscode.git` → `microsoft/vscode`
- `git@github.com:facebook/react.git` → `facebook/react`
- `git@github.com:LouisSavoldy/vibespecai.git` → `LouisSavoldy/vibespecai`

### Simple Format
- `microsoft/vscode` → `microsoft/vscode`
- `facebook/react` → `facebook/react`
- `LouisSavoldy/vibespecai` → `LouisSavoldy/vibespecai`

### Edge Cases
- `https://github.com/user/repo/` → `user/repo`
- `https://github.com/user/repo/tree/main` → `user/repo`
- `git@github.com:user/repo` → `user/repo`

## Expected Behavior

1. **Default Mode**: URL input field is shown first (most user-friendly)
2. **URL Parsing**: Real-time parsing shows detected owner/repo
3. **Validation**: Repository existence is verified before selection
4. **Fallback**: Users can switch to manual input if needed
5. **Examples**: Clear examples show supported formats

## User Experience Improvements

- **URL First**: Most users prefer pasting URLs over typing separate fields
- **Real-time Feedback**: Shows parsed owner/repo immediately
- **Multiple Formats**: Supports all common GitHub URL formats
- **Toggle Option**: Easy switch between URL and manual input
- **Clear Examples**: Helps users understand what formats work
