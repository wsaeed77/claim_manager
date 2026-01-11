# Quick Fix: SSH Authentication Error in GitHub Actions

## Problem
The workflow is failing with: `ssh: unable to authenticate, attempted methods [none publickey]`

This means the SSH key is not properly configured in GitHub Secrets.

## Quick Fix Steps

### 1. Copy Your SSH Key Content

Run this PowerShell command to get the key content:

```powershell
Get-Content "E:\Keys\Teamdoctor2023 (1).pem" | Set-Content "ssh-key-for-github.txt"
```

Then open `ssh-key-for-github.txt` and copy ALL content (including the BEGIN and END lines).

### 2. Add GitHub Secrets

Go to: **Your Repository → Settings → Secrets and variables → Actions → New repository secret**

Add these 3 secrets (one at a time):

#### Secret 1: SSH_KEY
- **Name**: `SSH_KEY`
- **Value**: Paste the ENTIRE content from `ssh-key-for-github.txt`
  - Must include `-----BEGIN RSA PRIVATE KEY-----` at the start
  - Must include `-----END RSA PRIVATE KEY-----` at the end
  - Include ALL lines in between
  - NO extra spaces before/after

#### Secret 2: SSH_HOST  
- **Name**: `SSH_HOST`
- **Value**: `54.163.213.74`

#### Secret 3: SSH_USERNAME
- **Name**: `SSH_USERNAME`  
- **Value**: `ubuntu`

### 3. Important Notes

✅ **DO**: 
- Copy the entire key including BEGIN/END lines
- Use VS Code or GitHub's web editor to preserve formatting
- Make sure the key starts with `-----BEGIN` and ends with `-----END`

❌ **DON'T**:
- Don't add quotes around the key
- Don't add extra whitespace
- Don't remove the BEGIN/END lines
- Don't use Notepad (it messes up line endings)

### 4. Verify

After adding secrets, re-run the workflow:
- Go to **Actions** tab
- Click on the failed workflow
- Click **Re-run all jobs**

The SSH authentication should now work!
