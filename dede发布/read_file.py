#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os


def listdirs(base_path):
    data = []
    file_name_list2 = os.listdir(base_path)
    for item in file_name_list2:
        if os.path.isdir(base_path+"/"+item):
            data.append(item)

    return data
