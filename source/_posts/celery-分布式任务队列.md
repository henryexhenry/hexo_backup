---
title: celery 分布式任务队列
date: 2020-06-03 23:42:58
tags:
---

celery 是基于 分布式信息传递 的 异步任务队列。他主要应用于 实时任务，但也支持 定时任务 (使用 celery beat 作为 scheduler)。celery 简单，高效，可扩展 的优点使它成为最主流的 Python 分布式框架。

![Celery](https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2435759940,1913677322&fm=26&gp=0.jpg)

<!-- more -->

## celery 的结构

celery 主要由前三个部分组成：

1. celery client (连接 web app 和 celery task)
2. celery worker (运行 task 的进程，可以存在多个)
3. celery broker (经纪人) (client 和 worker 之间的消息管道，需要选用第三方工具 Redis / RabbitMQ / MongoDB)
4. Beat (定时任务调度器) [optional]
5. Result Backend (保存任务的执行结果) [optional]

## celery 原理

celery 将 tasks 移出 WSGI 的 HTTP req-res 进程，tasks 会被发送到 broker，然后 celery 的子进程 workers 会从 broker 获得 task 并进行处理，处理结果会被放到 result backend。另外计时任务会在 celery beat 中被执行。

## celery 使用场景

1. 可用于账号注册过程中的激活邮件发送的步骤

    将邮件发送的步骤外包到 celery 异步进行。

2. 设定后台定时任务
3. 高并发的场景，如电商平台

## celery quick start

1. 创建 Celery 实例

    ```py
    from celery import Celery

    app = Celery('task_name', broker='ip_addr_of_broker')
    ```

2. 创建 task 函数

    ```py
    @app.task
    def task_function(arg):
        print(arg)
    ```

3. 启动 worker

    ```bash
    celery -A tasks worker --loglevel=info
    ```

4. 调用 task 函数

    ```py
    task_function.delay('arg')
    ```

## 中间件

Celery 需要第三方中间件为其提供消息管道，开发者可以选择 Redis / RabbitMQ / MongoDB 等。

## refs

- [Celery Flower - Monitoring and Management Guide](https://docs.celeryproject.org/en/latest/userguide/monitoring.html#flower-real-time-celery-web-monitor)
- [Celery Best practice](https://denibertovic.com/posts/celery-best-practices/)
- [Flask, celery, Redis](http://allynh.com/blog/flask-asynchronous-background-tasks-with-celery-and-redis/)
- [Celery research](https://www.fullstackpython.com/celery.html)
- [中间件---分布式任务调度---Celery](https://blog.csdn.net/FENGQIYUNRAN/article/details/87547699)
