#!/usr/bin/env bash

apt-get -y update
apt-get install -y nginx

export PGH=dev
echo "-------------------------------------"
echo $PGH
echo "-------------------------------------"
