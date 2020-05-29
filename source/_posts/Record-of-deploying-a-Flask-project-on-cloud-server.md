---
title: Record of deploying a Flask project on cloud server
date: 2020-05-29 23:37:42
tags:
---

This is a record of deploying a Flask application on a CentOS7 CVM server. This article includes basic environment setting, tools installation and some tutorial links. Python3.6, Flask, Gunicorn, Supervisor will be used here.
<!-- more -->

## Environment setting

Aliyun cloud virtual machine (CVM)

Server os: CentOS 7.3

## Install Python3.6

The packages management tool `Yum` is based on Python2, we need to install Python3 without influencing Python2

- Install dependencies
  > `yum install openssl-devel bzip2-devel expat-devel gdbm-devel readline-devel sqlite-devel`
- Download python3.6
  > `wget https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tgz`
  
  Unzip `Python-3.6.0.tg` by `tar` command

  > `tar -xzvf Python-3.6.0.tgz -C  /tmp`
  
  Install Python

  ```bash
  cd  /tmp/Python-3.6.0/\
  ./configure --prefix=/usr/local\
  make\
  make altinstall
  ```

- Configuration
  - add soft link (添加软连接)

    ```bash
    cd/usr/bin\
    mv  python python.backup\
    ln -s /usr/local/bin/python3.6 /usr/bin/python\
    ln -s /usr/local/bin/python3.6 /usr/bin/python3
    ```

  - modify python dependencies in yum from python2 to python3.6

    ```bash
    cd /usr/bin\
    ls yum*
    ```

  - change the headers from `!/usr/bin/python` to `!/usr/bin/python2` inside each yum* files
  - also do the same modifications to `/usr/bin/gnome-tweak-tool` and `/usr/libexec/urlgrabber-ext-down`
- Bugs may encounter
  - `zipimport.ZipImportError: can't decompress data; zlib not available`
  - `./Modules/zlibmodule.c:10:10: fatal error: zlib.h: No such file or directory`

- references
  - [CentOS 7 下 安装 Python3.7](https://segmentfault.com/a/1190000015628625)
  - [CentOS7安装Python3.6](https://blog.csdn.net/hobohero/article/details/54381475)
  - [linux 一行命令安装python3.7](https://blog.csdn.net/jaket5219999/article/details/80894517)

## WSGI container -- **Gunicorn**

WSGI is an interface between python web framework and HTTP server.
WSGI helps Python to regconise HTTP requests.
Gunicorn is a WSGI container, it helps create a Python web server.
*simple conf, high performance, multi-thread, open-source*

- Copy local project to cloud server
  - connect cloud server by `ssh`
    > `ssh <username>@<host-num>`
  - create folder
    > `mkdir <project name>`
    > `cd <project name>`
  - create venv
    > `python3 -m venv env`
  - transfer project folder recursively
    > `scp -r <path of project> root@<host>:/<dir>`

- Set up Gunicorn
  - get into virtual env
      > source venv/bin/activate
  - install Gunicorn
      > pip3 install gunicorn
  - setting
      > vim gunicorn.conf

      ```conf
      # gunicorn.conf
      worker = 3
      bind = '0.0.0.0:8000'
      ```

      > pip3.6 install -r requirements.txt

- References
  - [第二期 · 阿里云Python+Flask环境搭建](https://zhuanlan.zhihu.com/p/22126999)
  - [gunicorn学习介绍](https://www.jianshu.com/p/52d8e3deaa16)

## **Supervisor**

Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems. Supervisor has advantages of auto-recovery and auto-restart.

- Set up Supervisor
  - install Supervisor
    > yum install supervisor
  - setting
    - go to supervisor conf path
      > cd /etc/supervisord.d
    - create `<project-name>.ini`

    ```ini
    [program:<project name>]
    command=<path of gunicorn> run:app -c <path of gunicorn>/gunicorn.conf
    directory=<path of project>
    user=<username>
    autostart=true
    autorestart=true
    stdout_logfile=<path of project>/logs/gunicorn_supervisor.log
    ```

    - load supervisor setting

      ```bash
      supervisorctl reread\
      supervisorctl update\
      supervisorctl start <project>
      ```

- References
  - [Centos7.3配置Supervisor遇到的一些小问题](https://www.centos.bz/2018/06/centos7-3%E9%85%8D%E7%BD%AEsupervisor%E9%81%87%E5%88%B0%E7%9A%84%E4%B8%80%E4%BA%9B%E5%B0%8F%E9%97%AE%E9%A2%98/)
  - [supervisor在deepin安装、使用与卸载](https://hooklife.me/linux/Supervisor%E5%9C%A8deepin%E5%AE%89%E8%A3%85%E3%80%81%E5%8D%B8%E8%BD%BD%E4%B8%8E%E4%BD%BF%E7%94%A8/)
  - [CentOS 7 配置 Supervisor](https://www.chengxulvtu.com/supervisor-on-centos-7/)
  - [Python 进程管理工具 Supervisor 使用教程](https://www.restran.net/2015/10/04/supervisord-tutorial/)
  - [使用 Supervisor 來管理程式](https://philipzheng.gitbooks.io/docker_practice/content/cases/supervisor.html)

## Nginx

- references
  - [Nginx、Gunicorn在服务器中分别起什么作用？](https://www.zhihu.com/question/38528616)
  - [nginx能否不借助wsgi直接部署Python应用？](https://www.zhihu.com/question/20709415)
