---
title: Record of building HexoBlog on Github page
date: 2020-05-25 18:32:59
tags:
    - Hexo
    - Node.js
    - Github Page
categories: record
---

This article contains step by step tutorial to set up a tech blog on Github server, basic operations of Hexo blog, and some useful plugins.

<!-- more -->

## Installations

- Git
  - Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
  - [Download](https://git-scm.com/downloads)
- Node.js
  - As an asynchronous event driven JavaScript runtime, Node.js is designed to build scalable network applications.
  - [Download](https://nodejs.org/en/download/)
- Hexo
  - Hexo is a fast, simple and powerful blog framework. Hexo parses your article by Markdown rendering engin, it can produce static files with beautiful theme in a few second.
  - install Hexo by npm(node package management)
    - `npm install -g hexo-cli`
- hexo-deployer-git
  - this is a plugin for deploying hexo blog on github
  - `npm install hexo-deployer-git --save`

## Create Github repository

- initialise a **Github repository**
- login github locally

    ```bash
    git config --global user.email <xxx@163.com>
    git config --global user.name <xxx>
    ssh-keygen -t rsa -C <xxx@163.com>     // generate ssh
    ```

  - open .ssh folder, copy the ssh key string by `cat id_rsa.pub`

  - open github webpage - settings - SSH keys - add ssh keys
  
  - paste the ssh key here

## Hexo server

- initiate **hexo**
  - **initialise** a new blog by `hexo init blog`
  - **generate** the blog with modifications by `hexo generate` or `hexo g`
  - run the blog **server** locally for preview by `hexo server` or `hexo s`
  - **deploy** the blog by `hexo deploy` or `hexo d`

## Connecting local Hexo with Github repository

This step help us to deploy the generated static web templates to Github page server

Modify the configuration of `hexo deploy` command

1. cd `<root of hexo folder>`
2. modify `_config.yml` file

    ```yml
    deploy:
        type: git
        repo: '<address of your github reporsitory>'
        branch: master
    ```

3. Restart the server to update the configurations with following cmd in order

    ```shell
    hexo clean
    hexo generate
    hexo deploy
    ```

Now the Hexo blog is running on Github server.

Blog url: `<username>.gitbub.io`

## Operations

- Add post

In Hexo, post means articles that we wrote, post inherits the format of scaffold

```shell
hexo new <scaffold name> <post name>
```

Hexo will first **scan** `scaffolds/` folder and find `<scaffold name>.md`, then Hexo **copy the format** of `<scaffold name>.md` to a **new file** `<post name>.md` and put it in `source/_posts/`

- Add page

In Hexo, page means web page in hexo blog, such as about, categories, tags, archive(built-in with hexo)

```shell
hexo new page <page name>
```

Hexo will create a new dir `source/<page name>/index.md`

- Category and tag

Hexo also supports categories and tags for categorizing posts. First we need to create pages for displaying categories and tags.

```shell
hexo new page categories
hexo new page tags
```

Then hexo will create a folder named (categories) and a folder named (tags), with (index.md) inside both of them.

## Search engine for Next theme

1. first install hexo-generator-searchdb (`npm install hexo-generator-searchdb --save`)
2. configure `<hexo folder>/_config.yml`

    ```yml
    search:
      path: search.xml
      field: post
      format: html
      limit: 10000
    ```

3. configure `/theme/next/_config.yml`

    ```yml
    local_search:
      enable: true
    ```

## Word counting

This feature is supported by the Next theme with dependancy `hexo-wordcount`

it supports word count and reading minutes estimation

1. Install the dependancy by `npm i --save hexo-wordcount`

2. configure `themes/next/_config.yml`

    ```yml
    # Post wordcount display settings
    # Dependencies: https://github.com/willin/hexo-wordcount
    post_wordcount:
        item_text: true
        wordcount: true
        min2read: true
        totalcount: false
        separated_meta: true
    ```

## other skills

- put `<!-- more -->` in your post to show **read more** button at that exact position.

## References

- [Hexo 官网](https://hexo.io/zh-cn/docs/)
- [GitHub + Hexo 搭建个人网站详细教程](https://zhuanlan.zhihu.com/p/26625249)
- [我的个人博客之旅：从jekyll到hexo](https://blog.csdn.net/u011475210/article/details/79023429)
- [hexo是怎么工作的](http://coderunthings.com/2017/08/20/howhexoworks/)
- [多级分类](http://ijiaober.github.io/2014/08/05/hexo/hexo-04/)
