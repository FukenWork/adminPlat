const menuList = [{
    title: "用户信息",
    icon: 'user',
    path: '/userInfo',
    index: '1'
},
{
    title: "博客种类",
    icon: 'team',
    path: '/blok-name',
    index: '2'
},
{
    title: '产品架构',
    icon: 'chrome',
    path: '/product',
    index: '3',
    children: [{
        title: '前端文章',
        icon: 'apple',
        path: '/productOne',
        index: '3-1',
    },
    {
        title: '产品二',
        icon: 'android',
        path: '/productTwo',
        index: '3-2'
    }
    ]
}
]

export default menuList;