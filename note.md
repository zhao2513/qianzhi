> 问题1：
> 如何避免拖拽图片后，打开新页面？
> 解决:用一个div包裹图片，给div设置拖拽功能，
>并且手动禁止图片拖拽

```JS
    //jq
    //禁止鼠标右键菜单
    copyImg.on("contextmenu", function() { return false; });
    //禁止拖拽
    copyImg.on("dragstart", function() { return false; });
```

问题二：当父级设置left时，鼠标到复制的图片位置不对
JQ的offset().left实例方法获取到该DOM到可视区的left
offsetLeft获取到该DOM到父级的left
所以设置父级的left后会失效。