# --- Build frontend (Vite) ---
FROM node:18 AS node-build
WORKDIR /app

# Copy package files and install dependencies for asset build
COPY package*.json vite.config.js ./
COPY resources/js ./resources/js
COPY resources/css ./resources/css
RUN npm ci
RUN npm run build

# --- PHP runtime ---
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
	git \
	zip \
	unzip \
	libzip-dev \
	libpng-dev \
	libonig-dev \
	libxml2-dev \
	libicu-dev \
	curl \
	&& docker-php-ext-install pdo pdo_mysql zip exif pcntl bcmath gd intl \
	&& pecl install redis && docker-php-ext-enable redis \
	&& apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer from the official Composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy application source
COPY . .

# Copy built frontend assets from node stage (Vite outputs to public/build by default)
COPY --from=node-build /app/dist /var/www/html/public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist || true

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true

EXPOSE 9000

CMD ["php-fpm"]

