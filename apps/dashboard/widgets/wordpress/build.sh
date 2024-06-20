#!/bin/bash
rm -rf chatvolt chatvolt.zip && \
mkdir -p chatvolt && \
cp -r assets chatvolt.php LICENSE readme.txt uploads.ini chatvolt && \
zip -r chatvolt.zip chatvolt && \
rm -rf chatvolt