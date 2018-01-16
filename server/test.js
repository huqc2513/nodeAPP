var data = [
    {
        id:1,
        name :"一级分类：1",
        pid :0,
    },
    {
        id:2,
        name :"二级分类：1",
        pid :1,
    },
    {
        id:3,
        name :"三级分类：3",
        pid :2,
    },
    {
        id:4,
        name :"一级分类：2",
        pid :0,
    },
    {
        id:7,
        name :"f级分类：2",
        pid :4,
    },
    {
        id:10,
        name :"f级分类：2",
        pid :7,
    },
    {
        id:9,
        name :"f级分类：2",
        pid :10,
    },
    {
        id:12,
        name :"f级分类：2",
        pid :9,
    },
    {
        id:15,
        name :"f级分类：2",
        pid :12,
    },
    {
        id:13,
        name :"f级分类：2",
        pid :15,
    },
];


var map = {};
data.forEach(function (item) {
    map[item.id] = item;
});

var val = [];
data.forEach(function (item) {

    // 以当前遍历项，的pid,去map对象中找到索引的id
    var parent = map[item.pid];

    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {

        (parent.children || ( parent.children = [] )).push(item);

    } else {
        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
    }
});

console.log(map);