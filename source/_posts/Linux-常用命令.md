---
title: Linux 常用命令
date: 2020-06-08 23:56:38
tags:
    - Linux
    - 运维
categories: note
---

本文包括基本文本处理命令，监控命令，网络分析命令等的参数及常用使用方法的记录。
<!-- more -->
## 文本处理

vim,grep,sed,awk

## find 查找文件

### **按时间查找**

modification time (**mtime**)：
當該檔案的『內容資料』變更時，就會更新這個時間！內容資料指的是檔案的內容，而不是檔案的屬性或權限喔！

status time (**ctime**)：
當該檔案的『狀態 (status)』改變時，就會更新這個時間，舉例來說，像是權限與屬性被更改了，都會更新這個時間啊。 

access time (**atime**)：
當『該檔案的內容被取用』時，就會更新這個讀取時間 (access)。舉例來說，我們使用 cat 去讀取 /etc/man_db.conf ， 就會更新該檔案的 atime 了。

修改时间在 7 天前：`find -atime +7`

修改时间在 7 天内：`find -atime -7`

修改时间在 7 分钟前：`find -amin +7`

修改时间在 7 分钟内：`find -amin -7`

### **按文件信息查找**

- 按文件名: `-name` / `-iname`

    `-iname` 可忽略大小写

- 按大小: `-size`

    找尋所有大於 50MB 的檔案

    `find /var -type f -size +50M`

    找尋所有小於 50MB 的檔案

    `find /var -type f -size -50M`

- 按路径: `-path` / `-ipath`
- 按文件类型: `-type`

    type|explanation
    -|-
    **d**|**directory**
    **f**|**regular file**
    l|symbolic link
    c|character (unbuffered) special
    b|block (buffered) special
    p|named pipe (FIFO)
    s|socket

### 其他

- **按文件权限查找** -perm

- **执行指令** -exec

    將目前目錄下所有權限為 777 的檔案找出來，用 chmod 將這些檔案的權限更改為 644

    `find . -type f -perm 0777 -print -exec chmod 644 {} \;`

## 监控命令

### netstat 查看端口

- 参数

参数|描述
-|-
-r, --route | display routing table
-I, --interfaces=<Iface> |display interface table for <Iface>
-i, --interfaces |display interface table (网卡)
-g, --groups |display multicast group memberships
-s, --statistics |display networking statistics (like SNMP)
-M, --masquerade |display masqueraded connections
-v, --verbose  | be verbose
-n, --numeric  | don't resolve names
--numeric-hosts | don't resolve host names
--numeric-ports | don't resolve port names
--numeric-users | don't resolve user names
-N, --symbolic |  resolve hardware names
-e, --extend |display other/more information
-p, --programs |  display PID/Program name for sockets
-c, --continuous |continuous listing
-l, --listening | display listening server sockets
-a, --all, --listening | display all sockets (default: connected)
-o, --timers |display timers
-F, --fib  | display Forwarding Information Base (default)
-C, --cache | display routing cache instead of FIB
-T, --notrim |stop trimming long addresses
-Z, --context  | display SELinux security context for sockets

- 常见用法

找出程序运行的端口

`netstat -ap | grep ssh`

查看 UDP 端口使用情况

`netstat -apu` (all, program, udp)

### iostat

### ps 查询进程

**ps 可输出当前系统中进程的快照（静态）。若想查看动态进程信息，可以使用 top**

- ps 常用参数

    参数|描述
    -|-
    -a|显示除控制进程（session leader）和无终端进程外的所有进程
    -A|显示所有进程
    -e|此参数的效果和指定-A参数相同
    -f|显示完整格式的输出
    -u<用户识别码> |列出属于该用户的进程的状况，也可使用用户名称来指定
    -L|显示进程中的线程
    -l|显示长列表
    a|显示跟任意终端关联的所有进程
    u |采用基于用户的格式显示
    x |显示所有的进程，甚至包括未分配任何终端的进程
    o format|仅显示由format指定的列
    k sort|指定用以将输出排序的列
    --format format|仅显示由format指定的列
    --forest|用层级结构显示出进程和父进程之间的关系
    --sort order|指定将输出按哪列排序
    -C cmdlist|显示包含在cmdlist列表中的进程
    -g grplist|显示会话或组ID在grplist列表中的进程
    -p pidlist|显示PID在pidlist列表中的进程
    -s sesslist|显示会话ID在sesslist列表中的进程
    -t ttylist|显示终端ID在ttylist列表中的进程
    -u userlist|显示有效用户ID在userlist列表中的进程

- 常见用法

    查找指定进程

    `ps -ef|grep httpd`

    列出目前所有的正在内存当中的程序

    `ps -aux`

    按照 (CPU，内存) 进行排序，-表示逆序，+表示正序

    `ps -aux --sort=-pcpu,+pmem`

    用树的风格显示进程的层次关系

    `ps -f --forest -C nginx`

    显示某进程的所有线程

    `ps -Lf <pid>`

    以树状结构显示进程

    `pstree -p work | grep nginx`

### top

使用方式

top [-d number] | top [-bnp]

### tcpdump

### iptable

## 网络分析工具

**ping**，透过 ICMP 封包 来进行整个网络的状况报告
**traceroute**，用来检测发出数据包的主机到目标主机之间所经过的网关数量
**netstat**，用于显示与IP/TCP/UDP/ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况
**nslookup**，查询 DNS 记录，查询域名解析是否正常
**ifconfig**，用来查看和配置网络设备。当网络环境发生改变时可通过此命令对网络进行相应的配置。用ifconfig命令配置的网卡信息，在网卡重启后机器重启后，配置就不存在。要想将上述的配置信息永远的存的电脑里，那就要修改网卡的配置文件了。

iptables -A INPUT -p tcp -s 192.168.1.2 –dport 80 -j ACCEPT   (允许来自192.168.1.2这台主机访问80端口)

## 磁盘io分析工具

iostat
iotop
