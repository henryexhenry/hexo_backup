---
title: Get to know Container
date: 2020-06-06 20:05:58
tags:
---

## What is container

Container isolate application from its environment and ensure that it works on different environments.
<!-- more -->

## When do we use container

1. Distributing application architectures to accelerate software delivery

2. Moving apps beyond test into staging and production environments

3. securing and managing the app and the underlying infrastructure

## What problem did it solve

Container technology like Docker aims to solve following problems

1. system error may arise when moving application across different operation system
2. dependency conflict may arise when using different application technologies on a single machine

## How do containers solve this problem

A container contains the entire runtime environment of the application including the application itself, the dependencies, libraries and other config files. All these things will be encapsulated into a single package.

By containerizing the application platform and its dependencies, differences in OS distributions and underlying infrastructure are abstracted away.

## What other benefits do containers offer

1. accelarates integration and deployment process
2. allows developers to use suitable tools for each service, because container can isolate each service
3. helps optimising the infrastructure usage, because containers allow running serveral different applications on a single machine without any conflict

## Container vs Virtual Machine

![](https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1104696765,4217423537&fm=11&gp=0.jpg)

Containers share OS kernel and work independently; VM contains an entire OS system for each app

## Docker easy setup

```bash
# install depenencies
sudo yum install -y yum-utils device-mapper-persistent-data lvm2 

# setting yum source
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo 

# install docker-ce (community edition)
sudo yum install docker-ce

# setting auto start
sudo systemctl enable docker

# starting docker service
sudo systemctl start docker

# set user groups
# create user group
sudo groupadd docker
# add current user into docker group
sudo usermod -aG docker $USER
```

## Docker management tools

1. [Kubernetes](https://kubernetes.io)
2. [shipyard](https://shipyard-project.com)
3. portainer
4. dockerUI
