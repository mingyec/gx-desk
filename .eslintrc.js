// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    'rules': {
        'indent': ['error', 4],
        "no-magic-numbers": ["error", {  //使用number类型需要先用const声明
            "ignoreArrayIndexes": true,
            "ignore": [0, 1, -1],
            "enforceConst": true
        }],
        "no-var": "error",  //禁用var
        "prefer-template": "error",  //ES6模版语法优先
        "no-cond-assign": "error",  //不在if中使用赋值操作
        "no-undef": "error",  //函数和变量在使用前必须进行声明
        "no-alert": "error",  //代码不用 alert,confirm 和 prompt
        "no-unused-vars": "error",  //变量定义后一定要被使用

        "no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
        "no-redeclare": 2,//禁止重复声明变量
        "no-underscore-dangle": 1,//标识符不能以_开头或结尾
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
