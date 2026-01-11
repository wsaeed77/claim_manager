# Deployment Guide for Claim Manager

This guide will help you prepare the EC2 instance and deploy the Claim Manager application.

## Prerequisites

- EC2 instance with Ubuntu
- SSH access to the EC2 instance
- GitHub repository with the application code

## Step 1: Fix SSH Key Permissions (Windows)

Before connecting to EC2, fix the SSH key permissions:

```powershell
# Remove inheritance and grant access only to your user
icacls "E:\Keys\Teamdoctor2023 (1).pem" /inheritance:r
icacls "E:\Keys\Teamdoctor2023 (1).pem" /grant:r "$env:USERNAME:(R)"
```

Alternatively, in PowerShell (as Administrator):
```powershell
$acl = Get-Acl "E:\Keys\Teamdoctor2023 (1).pem"
$acl.SetAccessRuleProtection($true, $false)
$permission = $env:USERNAME,'Read','Allow'
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
$acl | Set-Acl "E:\Keys\Teamdoctor2023 (1).pem"
```

## Step 2: Prepare EC2 Instance

### Option A: Using the Preparation Script

1. Copy the preparation script to EC2:
   ```bash
   scp -i "E:\Keys\Teamdoctor2023 (1).pem" prepare-ec2.sh ubuntu@54.163.213.74:~/prepare-ec2.sh
   ```

2. SSH into the EC2 instance:
   ```bash
   ssh -i "E:\Keys\Teamdoctor2023 (1).pem" ubuntu@54.163.213.74
   ```

3. Run the preparation script:
   ```bash
   chmod +x ~/prepare-ec2.sh
   bash ~/prepare-ec2.sh
   ```

### Option B: Manual Setup

1. SSH into EC2:
   ```bash
   ssh -i "E:\Keys\Teamdoctor2023 (1).pem" ubuntu@54.163.213.74
   ```

2. Update system packages:
   ```bash
   sudo apt-get update
   sudo apt-get upgrade -y
   ```

3. Install basic dependencies:
   ```bash
   sudo apt-get install -y software-properties-common curl wget git unzip
   ```

4. Add PHP repository and install PHP 8.2:
   ```bash
   sudo add-apt-repository -y ppa:ondrej/php
   sudo apt-get update
   sudo apt-get install -y \
       php8.2 php8.2-fpm php8.2-cli php8.2-common \
       php8.2-mysql php8.2-zip php8.2-gd php8.2-mbstring \
       php8.2-curl php8.2-xml php8.2-bcmath php8.2-intl
   sudo update-alternatives --set php /usr/bin/php8.2
   ```

5. Install Composer:
   ```bash
   curl -sS https://getcomposer.org/installer | php
   sudo mv composer.phar /usr/local/bin/composer
   sudo chmod +x /usr/local/bin/composer
   ```

6. Install Node.js 18.x:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

7. Install Nginx:
   ```bash
   sudo apt-get install -y nginx
   ```

8. Create application directory:
   ```bash
   sudo mkdir -p /var/www/claim-manager
   sudo chown -R www-data:www-data /var/www/claim-manager
   sudo chmod -R 755 /var/www/claim-manager
   ```

9. Create storage directories:
   ```bash
   cd /var/www/claim-manager
   sudo mkdir -p storage/app/public
   sudo mkdir -p storage/framework/{cache,sessions,views}
   sudo mkdir -p storage/logs
   sudo mkdir -p bootstrap/cache
   sudo chown -R www-data:www-data storage bootstrap/cache
   sudo chmod -R 775 storage bootstrap/cache
   ```

10. Configure Nginx:
    ```bash
    sudo nano /etc/nginx/sites-available/claim-manager
    ```
    
    Add the following configuration:
    ```nginx
    server {
        listen 80;
        server_name _;
        root /var/www/claim-manager/public;

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";

        index index.php;

        charset utf-8;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        error_page 404 /index.php;

        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include fastcgi_params;
        }

        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
    ```

11. Enable the site:
    ```bash
    sudo ln -sf /etc/nginx/sites-available/claim-manager /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t
    sudo systemctl enable php8.2-fpm nginx
    sudo systemctl restart php8.2-fpm nginx
    ```

## Step 3: Configure GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `SSH_HOST` or `EC2_HOST`: `54.163.213.74`
- `SSH_USERNAME` or `EC2_USER`: `ubuntu`
- `SSH_KEY` or `EC2_SSH_KEY`: Copy the contents of `E:\Keys\Teamdoctor2023 (1).pem`
- `DEPLOY_PATH` or `EC2_APP_DIR`: `/var/www/claim-manager` (optional, defaults to this value)
- `SSH_PORT` or `EC2_PORT`: `22` (optional, defaults to 22)

## Step 4: Initial Deployment

### First Time Setup

1. SSH into EC2 and create the `.env` file:
   ```bash
   ssh -i "E:\Keys\Teamdoctor2023 (1).pem" ubuntu@54.163.213.74
   cd /var/www/claim-manager
   sudo cp .env.example .env
   sudo nano .env
   ```

2. Configure the `.env` file with your database credentials:
   ```env
   APP_NAME="Claim Manager"
   APP_ENV=production
   APP_KEY=
   APP_DEBUG=false
   APP_URL=http://54.163.213.74

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=claim_manager_v2
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

3. Generate application key:
   ```bash
   sudo php artisan key:generate
   ```

4. Run migrations:
   ```bash
   sudo php artisan migrate --force
   ```

5. Create storage link:
   ```bash
   sudo php artisan storage:link
   ```

6. Set permissions:
   ```bash
   sudo chown -R www-data:www-data /var/www/claim-manager
   sudo chmod -R 755 /var/www/claim-manager
   sudo chmod -R 775 storage bootstrap/cache
   ```

### Automatic Deployment

After the initial setup, the GitHub Actions workflow will automatically deploy on every push to `main` or `master` branch.

You can also trigger manual deployment:
1. Go to GitHub Actions tab
2. Select "Deploy to EC2" workflow
3. Click "Run workflow"

## Step 5: Verify Deployment

1. Check if the site is accessible:
   ```bash
   curl http://54.163.213.74
   ```

2. Check Nginx status:
   ```bash
   sudo systemctl status nginx
   ```

3. Check PHP-FPM status:
   ```bash
   sudo systemctl status php8.2-fpm
   ```

4. Check application logs:
   ```bash
   tail -f /var/www/claim-manager/storage/logs/laravel.log
   ```

## Troubleshooting

### Permission Issues
```bash
sudo chown -R www-data:www-data /var/www/claim-manager
sudo chmod -R 755 /var/www/claim-manager
sudo chmod -R 775 storage bootstrap/cache
```

### Database Connection Issues
- Verify database credentials in `.env`
- Check if MySQL is running: `sudo systemctl status mysql`
- Test connection: `php artisan db:show`

### Nginx Configuration Issues
- Test configuration: `sudo nginx -t`
- Check error logs: `sudo tail -f /var/log/nginx/error.log`

### PHP-FPM Issues
- Check status: `sudo systemctl status php8.2-fpm`
- Check error logs: `sudo tail -f /var/log/php8.2-fpm.log`

## Security Considerations

1. **Firewall**: Configure AWS Security Groups to allow only necessary ports (80, 443, 22)
2. **SSL/HTTPS**: Set up SSL certificate (Let's Encrypt) for HTTPS
3. **Environment Variables**: Never commit `.env` file to git
4. **Database**: Use strong passwords and limit database user permissions
5. **Regular Updates**: Keep system packages and dependencies updated

## Next Steps

- Set up SSL certificate with Let's Encrypt
- Configure domain name (if applicable)
- Set up automated backups
- Configure monitoring and logging
- Set up CI/CD pipeline improvements
