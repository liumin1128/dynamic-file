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

<script src="../dist/main.js"></script>
  
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

前端开发过程中，经常需要加载一些外部资源，类似各种sdk，css主题。有时我们不希望在head中声名，因为这个文件可能只在某些页面中，甚至某些组件中才被需要，全局加载无疑会带来不必要的性能问题，所以可能会=会需要一种运行在浏览器端，动态加载css或js的方法。

只需简单声明即可完成加载，该方法返回一个promise，等待文件加载完成调用后续逻辑。

支持UMD，浏览器可以在window.dynamicFile中直接使用。

## 需要注意的

内容基于promise.all实现并行加载，如果需要加载多个文件，并且其中某些文件有依赖关系，可以将分两步加载，将第二步放在第一步的then中执行。

并未实现单例模式，需要自行判断文件是否已经加载过，比如通过window.jquery。

