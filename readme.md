# dynamic-file 动态加载资源文件

umd规范，无任何依赖，动态加载js、css文件返回一个promise。

## install

```
npm i -S dynamic-file

// or
yarn add dynamic-file
```

## use

```
import dynamicFile from 'dynamic-file'

// or <script src="../dist/main.js"></script>
  
if(!window.jquery) {
    dynamicFile([
      'https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css',
      'https://cdn.bootcss.com/jquery/3.2.1/jquery.slim.min.js',
      'https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js',
      'https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js'
    ]).then(() => {
      alert('success！！！')
    })
}
```

## why?

前端开发需求总数层出不穷，有时需要在某个时刻、某个页面、某个组件，甚至某个逻辑中加载一些css、js文件，比如微信sdk，地图插件、主题css等等，还要在加载完成之后，执行一些逻辑。这些第三方文件，往往只在一个场景用到，并不想放在全局，而第三方文件又没办法通过dynamic import打包进来，此时就需要某种动态加载任意资源的方法了。

只需简单声明即可完成加载，该方法返回一个promise，等待文件加载完成调用后续逻辑。

支持UMD，浏览器可以在window.dynamicFile中直接使用。

## 需要注意的

内容基于promise.all实现并行加载，如果需要加载多个文件，并且其中某些文件有依赖关系，可以将分两步加载，将第二步放在第一步的then中执行。

并未实现单例模式，需要自行判断文件是否已经加载过，比如通过window.jquery。

