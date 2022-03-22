#!/bin/bash

set -e

log="./log"

run() {
    echo -n "INFO: running '${@}'"
    if "${@}" 1>> $log 2>&1 ;  then
        echo " success"
    else
        echo " failed"
        cat $log
        exit 1
    fi
}

ln -fs /usr/share/zoneinfo/America/Toronto /etc/localtime 

run apt-get update 
run apt-get -y install software-properties-common zip openjdk-11-jdk-headless nodejs npm python 
run npm install --global javascript-obfuscator@0.28.0 
run add-apt-repository -y ppa:ondrej/php 
run apt-get update 
run apt-get -y install php7.1 

echo "INFO: container built successfully..."
