#!/usr/bin/python3
import sys
import time
import pymysql
import os
import shutil
from article_add import article_add
from read_file import listdirs

# 配置
# 4excel 配置
# url = "https://www.4excel.cn/houtai020/article_add.php"
# myhost = "www.4excel.cn"
# base_path = "D:/火车头采集/4excel.cn待发文章"
# cookies = 'menuitems=1_1%2C2_1%2C3_1; _ga=GA1.1.904164433.1651916586; PHPSESSID=vubdofg00p647f4thgvmbnoch3; _csrf_name_6c7e31f0=72d863fdd75d280ac66e940c11de3525; _csrf_name_6c7e31f0__ckMd5=3820789060f68c82; DedeUserID=1; DedeUserID__ckMd5=426df176ffb26fd2; DedeLoginTime=1657182731; DedeLoginTime__ckMd5=bda5f6043a8aa84f; Hm_lvt_90d669285bf1f0c655c711354ebff9c8=1656902402,1657085323,1657112733,1657182787; Hm_lpvt_90d669285bf1f0c655c711354ebff9c8=1657185622; _ga_2JV760YETC=GS1.1.1657182787.17.1.1657185624.0; ENV_GOBACK_URL=%2Fhoutai020%2Fcontent_list.php%3Fchannelid%3D1%26cid%3D196'

# 306u.com 配置
url = "b.cn/dede/article_add.php"
myhost = "306u.com"
base_path = "D:/火车头采集/4excel.cn待发文章"
cookies = 'menuitems=1_1%2C2_1%2C3_1; _ga=GA1.1.904164433.1651916586; PHPSESSID=vubdofg00p647f4thgvmbnoch3; _csrf_name_6c7e31f0=72d863fdd75d280ac66e940c11de3525; _csrf_name_6c7e31f0__ckMd5=3820789060f68c82; DedeUserID=1; DedeUserID__ckMd5=426df176ffb26fd2; DedeLoginTime=1657182731; DedeLoginTime__ckMd5=bda5f6043a8aa84f; Hm_lvt_90d669285bf1f0c655c711354ebff9c8=1656902402,1657085323,1657112733,1657182787; Hm_lpvt_90d669285bf1f0c655c711354ebff9c8=1657185622; _ga_2JV760YETC=GS1.1.1657182787.17.1.1657185624.0; ENV_GOBACK_URL=%2Fhoutai020%2Fcontent_list.php%3Fchannelid%3D1%26cid%3D196'


filter_ext = ".txt"
# 第一步 获取数据库
# 打开数据库连接
db = pymysql.connect(host='localhost',
                     user='root',
                     password='root',
                     database='l_cn')

# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()

# 使用 execute()  方法执行 SQL 查询
# cursor.execute("SELECT VERSION()")

# 使用 fetchone() 方法获取单条数据.
# data = cursor.fetchone()
# print("Database version : %s " % data)


sql = "SELECT * FROM yqt001_arctype"
list = []
try:
    cursor.execute(sql)
    results = cursor.fetchall()
    for row in results:
        cid = row[0]
        cname = row[4]
        list.append([cid, cname])
except:
    print("Error: unable to fetch data")
    os._exit(0)
db.close()
print(list)
# 关闭数据库连接

# for row in list:
#     print(row[1], "的id为", row[0])

# 第二步 获取文章

o = {}
file_name_list = os.listdir(base_path)
for fullname in file_name_list:
    tmp = os.path.splitext(fullname)
    file_name = tmp[0]
    if tmp[-1] == filter_ext:
        for row in list:
            if file_name.find(row[1]) > -1:
                if row[1] not in o:
                    o[row[1]] = [file_name]
                else:
                    o[row[1]].append(file_name)
                break


# 第三步 处理文章
# 开关
# 归类文章
is_classify = True

if is_classify == True:
    for key, value in o.items():
        if not os.path.exists(base_path+"/"+key):
            os.makedirs(base_path+"/"+key)
        for v in value:
            shutil.move(base_path+"/"+v+filter_ext,
                        base_path+"/"+key+"/"+v+filter_ext)

# 第四步 发布文章


# for key, value in o.items():
#     for row in list:
#         if key == row[1]:
# 是否发布
is_publish = True
limitcount = 30


timer = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
if is_publish == True:
    dirs_list = listdirs(base_path)
    print(dirs_list)
    for item in dirs_list:
        for row in list:
            if item in row[1]:
                print('该栏目存在,ID为:', row[0])
                file_name_list = os.listdir(base_path+"/"+item)
                count = limitcount
                for fullname in file_name_list:
                    count = count-1
                    if count <= 0:
                        break
                    tmp1 = os.path.splitext(fullname)
                    file_name = tmp1[0]
                    file_body = ''
                    if tmp1[-1] == filter_ext:
                        is_add = False
                        with open(base_path+"/"+item+"/"+fullname, 'r', encoding='UTF-8') as fd:
                            file_body = fd.read()
                            if len(file_body) > 200:
                                articel_obj = {
                                    'cookies': cookies,
                                    'typeid': row[0],
                                    'title': file_name,
                                    'body': file_body,
                                    'tags': '',
                                    'pubdate': timer,
                                }
                                is_add = article_add(url, myhost, articel_obj)
                        if is_add == True:
                            os.remove(base_path+"/"+item+"/"+fullname)
