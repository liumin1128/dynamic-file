import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default{
    input: "src/main.js",
    output: {
        name: 'dynamicFile',
        file: "dist/bundle.js",
        format: "umd"
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**', // 只编译我们的源代码
            runtimeHelpers: true,
            plugins: [
              [
                '@babel/transform-runtime',
                // 非cjs设置为true
                { useESModules: true }
              ]
            ]
            // babelrc: false
        })
    ]
}
