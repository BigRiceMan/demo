#!/usr/bin/python3
 
from pickle import TRUE
import pymysql
import os
import shutil
from article_add import article_add
from read_file import listdirs
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

url = "http://4excel.cn/houtai020/article_add.php"
host = "4excel.cn"
base_path = "C:/Users/kimyi/Desktop/30W文章采集"
filter_ext = ".txt"

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
is_classify = False

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
is_publish = True
limitcount = 5
if is_publish==True:
    dirs_list = listdirs(base_path)
    print(dirs_list)
    for item in dirs_list:
        for row in list:
            if item in row[1]:
                print('该栏目存在,ID为:', row[0])
                file_name_list = os.listdir(base_path+"/"+item)
                count=limitcount
                for fullname in file_name_list:
                    count=count-1
                    if count <=0:
                        break
                    tmp1 = os.path.splitext(fullname)
                    file_name = tmp1[0]
                    file_body = ''
                    if tmp1[-1] == filter_ext:
                        is_add=False
                        with open(base_path+"/"+item+"/"+fullname, 'r', encoding='UTF-8') as fd:
                            file_body = fd.read()
                            if len(file_body) > 200:
                                articel_obj = {
                                    'cookies': 'menuitems=1_1%2C2_1%2C3_1; Hm_lvt_90d669285bf1f0c655c711354ebff9c8=1651916576; Hm_lpvt_90d669285bf1f0c655c711354ebff9c8=1651916579; _ga_2JV760YETC=GS1.1.1651916585.1.0.1651916585.0; _ga=GA1.1.904164433.1651916586; PHPSESSID=r4ot78pe44pi3p6i98fckbuqf6; _csrf_name_6c7e31f0=ded208593509e007c8771b4bf6b25eb7; _csrf_name_6c7e31f0__ckMd5=89471b3f1e71a159; DedeUserID=1; DedeUserID__ckMd5=426df176ffb26fd2; DedeLoginTime=1651916645; DedeLoginTime__ckMd5=aed3466be9eb343f',
                                    'typeid': row[0],
                                    'title': file_name,
                                    'body': file_body,
                                    'tags': ''
                                }
                                is_add = article_add(url,host,articel_obj)
                        if is_add==True:
                            os.remove(base_path+"/"+item+"/"+fullname)
