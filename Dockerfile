FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev libonig-dev libxml2-dev \
    libpq-dev nginx \
    && docker-php-ext-install pdo pdo_pgsql pdo_mysql mbstring zip bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY backend/ .

RUN chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data /app

COPY backend/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE ${PORT:-80}

CMD ["/start.sh"]
