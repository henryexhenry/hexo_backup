---
title: Flask 架构及请求处理
date: 2020-06-16 23:34:38
tags:
    - Flask
    - Web
categories: note
---
本文主要从架构以及请求处理流程的角度介绍 Python 的主流网页框架 Flask。
<!-- more -->
## Flask 的特点

Flask 依赖于 Werkzeug WSGI 工具包 和 Jinja 引擎。

debug mode 下，Flask 会自动开启 Werkzeug 内置的 调试器 debugger 和 重载器 reloader（检测文件变动）。

URL 规则以装饰器的方式写出。
用 url_for() 函数名 来代替直接指明 URL，这样可以避免一个一个的修改 URL 规则。
URL 中的动态参数也需要从 url_for() 传入。

## Flask 的文件结构

模版存放在根目录的 templates

静态资源存放在根目录的 static

## Flask 的架构模式

Flask 用视图函数来处理请求并生成响应。

Flask 是 MVC（MTV）架构。

Model -> Flask 本身没有内置的数据模型，但可以通过外部库来实现，比如 SQLAlchemy

View -> MVC 中的 View 对应于 Flask 中的 templates

Controller -> MVC 中的 Controller 对应于 Flask 中的 视图函数（View）

## Flask 请求处理流程

1. 程序启动：输入 flask run 命令后，Flask 会调用 flask.cli.run_command() 函数，最后会调用 werkzeug.serving 模块中的 run_simple() 函数。

    ```python
    def run_simple(hostname, port, application, use_reloader=False, use_debugger=False, ...):
        if use_debugger:
            from werkzeug.debug import DebuggedApplication
            application = DebuggedApplication(application, ...)

        if static_files:
            from werkzeug.wsgi import SharedDataMiddleware
            application = SharedDataMiddleware(application, static_files)

        def inner():
            try:
                fd = int(os.environ['WERKZEUG_SERVER_FD'])
            except (LookupError, ValueError):
                fd = None
            srv = make_server(hostname, port, application, ...)
            if fd is None:
                log_startup(srv.socket)
            srv.serve_forever()

        if use_reloader:
            ...
        else:
            inner()
    ```

    DebuggedApplication 和 SharedDataMiddleware 都是 Werkzeug 提供的中间件。函数在调用完中间件之后，会调用 make_server() 方法创建服务器 srv，然后调用 serve_forever() 来运行服务器。

2. 请求处理：Flask 类的 `__call__()` 方法调用了 `wsgi_app()` 方法，这个 `wsgi_app()` 就是 Flask 中的 WSGI 程序。它接收 environ 和 start_response 作为参数。

    ```python
    class Flask(_PackageBoundObject):
        ...
        def wsgi_app(self, environ, start_response):
            ctx = self.request_context(environ) # 根据 environ 生成请求上下文，同时生成 Request 对象，存放到 ctx 的 request 属性
            error = None
            try:
                try:
                    ctx.push() # 将请求上下文入栈（请求上下文栈）
                    response = full_dispatch_request()
                except Exception as e:
                    error = e
                    response = self.handle_exception(e)
                except:
                    error = sys.exc_info()[1]
                    raise
                    return response(environ, start_response)
                finally:
                    ...

        def __call__(self, environ, start_response):
            return self.wsgi_app(environ, start_response)
    ```

    wsgi_app() 根据 environ 生成请求上下文 requestContext 对象，同时生成 Request 对象并存放到 ctx 的 request 属性。随后将请求上下文入栈（请求上下文栈）。
    先尝试从 full_dispatch_request() 方法获得响应，如果出错则根据错误类型获得响应。

    ```python
    class Flask(_PackageBoundObject):
        ...
        def full_dispatch_request(self):
            """分发请求，并对请求进行预处理和后处理。同时捕捉 HTTP 异常"""
            self.try_trigger_before_first_request_functions()
            try:
                request_started.send(self) # 发送请求进入的信号
                rv = self.preprocess_request() # 预处理请求
                if rv is None:
                    rv = self.dispatch_request() # 进一步处理请求，获取返回值
            except Exception as e:
                rv = self.handle_user_exception(e) # 处理异常
            return self.finalize_request(rv) # 最终处理
    ```

    full_dispatch_request() 方法会进行 **request 分发**：preprocess_request() 会调用所有使用 before_request 钩子注册的函数，接下来 dispatch_request() 方法会匹配并调用对应的视图函数，获取返回值，赋值给 rv, 最后 finalized_request() 会先接收 rv 并调用 after_request 钩子函数，然后生成响应对象，回到 wsgi_app()。

3. 路由系统

- 注册路由

    flask 的 route 装饰器内部调用了 add_url_rule() 来添加 URL 规则。

    ```python
    class Flask(_PackageBoundObject):
        ...
        @setupmethod
        def add_url_rule(self, rule, endpoint=None, view_func=None, ...):
            ...
            rule = url_rule_class(rule, methods=methods, **options) # （werkzeug.routing.Rule 实例）
            ...
            self.url_map.add(rule) # （werkzeug.routing.Map 实例）
            if view_func is not None:
                ...
                self.view_functions[endpoint] = view_func
    ```

    此函数主要引入了 url_map  和 view_func 两个对象。

    URL 规则通过 url_rule_class() 方法返回一个 Rule 实例，它保存了 【端点 到 URL 规则】 的映射关系。

    **url_map** 是 Werkzeug 的路由表 Map类 的实例。它保存了所有 Rule 实例。

    **view_func** 是一个字典，存储了 【端点 到 视图函数】 的映射。

- 匹配路由

    full_dispatch_request() 方法中的 dispatch_request() 方法实现了从 请求的 URL 找到端点，再从端点找到对应的视图函数并调用。

    ```python
    class Flask(_PackageBoundObject):
        ...
        def dispatch_request(self):
            req = _request_ctx_stack.top.request
            ...
            rule = req.url_rule
            ...
            return self.view_functions[rule.endpoint](**req.view_args)
    ```

    URL 的匹配工作在 请求上下文对象的构造过程中， 由 match_request() 方法完成，并将匹配出的 URL 赋值到请求上下文的 url_rule 属性当中。
