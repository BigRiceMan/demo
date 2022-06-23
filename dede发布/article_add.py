import requests
import os


def article_add(url,host, o):
    url = url
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"

    headers = {
        'User-Agent': user_agent,
        'Host': host,
        'Cookie': o['cookies']
    }
    dede_data = {
        'channelid': '1',
        'typeid':  o['typeid'],
        'title': o['title'],
        'body': o['body'],
        'tags': o['tags'],
        'picname': '',
        'source': '',
        'writer': '',
        'pubdate': '',
        'dopost': 'save',
        'shorttitle': '',
        'redirecturl': '',
        'weight': '',
        'typeid2': '',
        'keywords': '',
        'autokey': '1',
        'description': '',
        'remote': '1',
        'autolitpic': '1',
        'imageField.x': '38',
        'imageField.y': '11',
        'ddisremote': '1',
    }
    res = requests.post(url, headers=headers, data=dede_data)
    if res.text.find('已发布文章') <= -1:
        print('发布文章出错,请检查')
        return False
    else:
        print('文章已成功发布')
        return True
