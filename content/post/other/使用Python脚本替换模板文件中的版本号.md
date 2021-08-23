## 需求


后端模板文件引用前端资源，发布时，使用Python脚本自动替换前端资源的版本。


## 准备工作


前端使用Webpack构建，每次构建完成时，会生成一个buildfile.json


buildfile.json


```json
{
    "about.css": "about-ca3f85cec35d3ab39ac0.css",
    "about.js": "about-613281148cb8885f2b3d.js",
    "home.css": "home-94093b44a5a85be01f38.css",
    "home.js": "home-6dd4e116818ee4945f65.js"
}
```


## 读取前端构建文件


```python
import os
import json

BUILD_FILES = {}

def get_build_files():
	build_file_path = '/Users/pengjie/try/iseo2/dist/buildfile.json'
	if(os.path.exists(build_file_path)):
		with open(build_file_path,'r') as f:
			return json.load(f)
	else:
		print('build file not exists.')
		return ''

BUILD_FILES = get_build_files();
```


## 获取所有模板文件


```python
def get_template_files():
	template_path = '/Users/pengjie/try/iseo2/tmpviews'
	template_files = []
	for dirpath, dirnames, filenames in os.walk(template_path):
		for filename in filenames:
			if(filename[0] != '.'):
				filepath = os.path.join(dirpath,filename)
				template_files.append(filepath)
	return template_files
```


## 获取所有要替换的script和link


```python
import os
import re
from bs4 import BeautifulSoup

def get_replace_list(content):
	replace_list = []
	soup = BeautifulSoup(content,'html.parser')

	# 获取所有link
	links = soup.find_all('link')
	for item in links:
		name = os.path.basename(item.get('href'))
		matches = re.search(r'\-(.+)?(\.)',name,re.I)
		key = name.replace(matches[0],'.')
		replace_list.append({ 'old': name, 'new': BUILD_FILES.get(key,'')})

	# 获取所有script
	scripts = soup.find_all('script')
	for item in scripts:
		name = os.path.basename(item.get('src'))
		matches = re.search(r'\-(.+)?(\.)',name,re.I)
		key = name.replace(matches[0],'.')
		replace_list.append({ 'old': name, 'new': BUILD_FILES.get(key,'')})

	return replace_list
```


## 查找并替换


```python
def search_and_replace(tplpath):
	content = ''
	with open(tplpath,'r',encoding="utf-8") as f:
		content = f.read()
		replace_list = get_replace_list(content)
		for item in replace_list:
			if(item['old'] and item['new']):
				content = content.replace(item['old'],item['new'])

	with open(tplpath,"w",encoding="utf-8") as f:
		f.write(content)
```


## 完整脚本内容


```python
import os
import re
import json
from bs4 import BeautifulSoup

BUILD_FILES = {}

def run():
	view_path = '/Users/pengjie/try/iseo2/tmpviews'
	for dirpath, dirnames, filenames in os.walk(view_path):
		for filename in filenames:
			if(filename[0] != '.'):
				filepath = os.path.join(dirpath,filename)

				# 读取文件，获取替换列表
				content = ''
				with open(filepath,'r',encoding="utf-8") as f:
					content = f.read()
					replace_list = get_replace_list(content)
					for item in replace_list:
						if(item['old'] and item['new']):
							content = content.replace(item['old'],item['new'])

				with open(filepath,"w",encoding="utf-8") as f:
					f.write(content)
				print('----')

# 获取替换列表
def get_replace_list(content):
	replace_list = []
	soup = BeautifulSoup(content,'html.parser')

	# 获取所有link
	links = soup.find_all('link')
	for item in links:
		name = os.path.basename(item.get('href'))
		matches = re.search(r'\-(.+)?(\.)',name,re.I)
		key = name.replace(matches[0],'.')
		replace_list.append({ 'old': name, 'new': BUILD_FILES.get(key,'')})

	# 获取所有script
	scripts = soup.find_all('script')
	for item in scripts:
		name = os.path.basename(item.get('src'))
		matches = re.search(r'\-(.+)?(\.)',name,re.I)
		key = name.replace(matches[0],'.')
		replace_list.append({ 'old': name, 'new': BUILD_FILES.get(key,'')})

	return replace_list
					
# 获取构建文件
def get_build_file():
	build_file_path = '/Users/pengjie/try/iseo2/dist/buildfile.json'
	if(os.path.exists(build_file_path)):
		with open(build_file_path,'r') as f:
			return json.load(f)
	else:
		print('build file not exists.')
		return ''

if __name__ == '__main__':
	BUILD_FILES = get_build_file()
	if(BUILD_FILES):
		run()
```
