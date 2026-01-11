# Fix SSH Key Permissions for Windows
# Run this script as Administrator in PowerShell

$keyPath = "E:\Keys\Teamdoctor2023 (1).pem"

if (-not (Test-Path $keyPath)) {
    Write-Host "Error: SSH key file not found at $keyPath" -ForegroundColor Red
    exit 1
}

Write-Host "Fixing permissions for SSH key..." -ForegroundColor Yellow

try {
    # Remove inheritance
    icacls $keyPath /inheritance:r
    
    # Grant full control to current user only
    $currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
    icacls $keyPath /grant:r "${currentUser}:(R)"
    
    # Remove all other users
    icacls $keyPath /remove "Users" 2>$null
    icacls $keyPath /remove "Authenticated Users" 2>$null
    icacls $keyPath /remove "Everyone" 2>$null
    
    Write-Host "✅ SSH key permissions fixed successfully!" -ForegroundColor Green
    Write-Host "You can now connect using: ssh -i `"$keyPath`" ubuntu@54.163.213.74" -ForegroundColor Cyan
} catch {
    Write-Host "Error fixing permissions: $_" -ForegroundColor Red
    Write-Host "`nPlease run PowerShell as Administrator and try again." -ForegroundColor Yellow
}
