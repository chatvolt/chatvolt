#!/bin/bash
composer install && \
php vendor/bin/autoindex prestashop:add:index && \
php vendor/bin/php-cs-fixer fix && \
# _PS_ROOT_DIR_=. vendor/bin/phpstan analyse --configuration=tests/phpstan/phpstan.neon && \
rm -rf chatvolt chatvolt.zip && \
mkdir -p chatvolt && \
cp -r chatvolt.php controllers docker-compose.yml entrypoint.sh index.php logo.png views chatvolt && \
zip -r chatvolt.zip chatvolt && \
rm -rf chatvolt