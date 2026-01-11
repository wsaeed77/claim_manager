#!/bin/bash
# Script to prepare EC2 instance for Laravel deployment
# Run this script on the EC2 instance: bash prepare-ec2.sh

set -e

echo "🚀 Starting EC2 server preparation for Laravel deployment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install basic dependencies
echo "📦 Installing basic dependencies..."
sudo apt-get install -y software-properties-common curl wget git unzip

# Add PHP repository
echo "📦 Adding PHP repository..."
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update

# Install PHP 8.2 (Laravel 12 requires PHP 8.2+)
echo "📦 Installing PHP 8.2 and extensions..."
sudo apt-get install -y \
    php8.2 \
    php8.2-fpm \
    php8.2-cli \
    php8.2-common \
    php8.2-mysql \
    php8.2-zip \
    php8.2-gd \
    php8.2-mbstring \
    php8.2-curl \
    php8.2-xml \
    php8.2-bcmath \
    php8.2-intl \
    php8.2-bz2 \
    php8.2-readline

# Set PHP 8.2 as default
echo "🔧 Setting PHP 8.2 as default..."
sudo update-alternatives --set php /usr/bin/php8.2

# Install Composer
echo "📦 Installing Composer..."
if ! command -v composer &> /dev/null; then
    curl -sS https://getcomposer.org/installer | php
    sudo mv composer.phar /usr/local/bin/composer
    sudo chmod +x /usr/local/bin/composer
else
    echo "✅ Composer already installed"
fi

# Install Node.js 18.x (for Vite/React build)
echo "📦 Installing Node.js 18.x..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js already installed: $(node -v)"
fi

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt-get install -y nginx

# Create application directory
APP_DIR="/var/www/claim-manager"
echo "📁 Creating application directory: $APP_DIR"
sudo mkdir -p $APP_DIR
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR

# Create storage directories with proper permissions
echo "📁 Setting up storage directories..."
sudo mkdir -p $APP_DIR/storage/app/public
sudo mkdir -p $APP_DIR/storage/framework/cache
sudo mkdir -p $APP_DIR/storage/framework/sessions
sudo mkdir -p $APP_DIR/storage/framework/views
sudo mkdir -p $APP_DIR/storage/logs
sudo mkdir -p $APP_DIR/bootstrap/cache

sudo chown -R www-data:www-data $APP_DIR/storage
sudo chown -R www-data:www-data $APP_DIR/bootstrap/cache
sudo chmod -R 775 $APP_DIR/storage
sudo chmod -R 775 $APP_DIR/bootstrap/cache

# Configure Nginx
echo "📝 Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/claim-manager > /dev/null <<EOF
server {
    listen 80;
    server_name _;
    root $APP_DIR/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/claim-manager /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🔍 Testing Nginx configuration..."
sudo nginx -t

# Start and enable services
echo "🔄 Starting services..."
sudo systemctl enable php8.2-fpm
sudo systemctl enable nginx
sudo systemctl restart php8.2-fpm
sudo systemctl restart nginx

# Display versions
echo ""
echo "✅ EC2 server preparation complete!"
echo ""
echo "📋 Installed versions:"
php -v | head -n 1
composer --version
node -v
npm -v
echo ""
echo "📁 Application directory: $APP_DIR"
echo "🔧 Next steps:"
echo "   1. Fix SSH key permissions (run fix-ssh-permissions.ps1 as Administrator)"
echo "   2. Copy prepare-ec2.sh to EC2 and run it (if not already done)"
echo "   3. Configure GitHub Secrets (SSH_KEY, SSH_HOST, etc.)"
echo "   4. Push code to main/master branch to trigger deployment"
echo ""
