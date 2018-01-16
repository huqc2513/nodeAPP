//将普通数组转化成ztree数组
function myZtree(arr){
    this.dataArr = arr || [];
    this.noPush = [];//获取没有加入到ztree中的数据
    this.chainArr = [];//获取ztree数据
};

//向ztree数组中插入数据， 根据parent_id查找父节点。bool为真时，若不存在父节点插入到根目录
myZtree.prototype.push = function(data, bool){
    let item = this.isExist('parent_id', data.parent_id);
    if(bool && !item){
        item = this.dataArr;
    }
    if(item){
        if(item !== this.dataArr){
            item.children ? item.children.push(data) : item.children = [data];
        }else{
            item.push(data);
        }
        let noIndex = this.noPush.indexOf(data);
        data = null;
        if(noIndex != -1){
            this.noPush.splice(noIndex, 1);
        }
    }
    let noArr  = data ? this.noPush.indexOf(data) != -1 : false;
    if(this.noPush.length){
        for(let i = 0, len = this.noPush.length; i < len; i++){
            if(noArr || !this.noPush[i]) continue;
            this.push(this.noPush[i]);
        }
    }
    data && this.noPush.indexOf(data) == -1 && this.noPush.push(data);
};


//根据属性判断数组是否存在
myZtree.prototype.isExist = function(type, value){
    return this._loop(this.dataArr, type, value);
};
//获取指定节点的节点链
myZtree.prototype.getChain = function(type, value, arr){
    this.chainArr = [];
    this._loop(arr || this.dataArr, type, value, true);
    return this.chainArr.reverse(); //倒转
};
//内部方法 遍历ztree节点
myZtree.prototype._loop = function(arr, type, value, bool){
    for(let i = 0, len = arr.length; i < len; i++){
        if(arr[i][type] === value){         //如果数组第一层的type等于值
            bool && this.chainArr.push(arr[i]);         //push到chainArr数组中
            return arr[i];
        }else if(arr[i].children && arr[i].children.length){  //如果有子元素
            let item = this._loop(arr[i].children, type, value, bool);
            if(item){
                bool && this.chainArr.push(arr[i]);     //push到chainArr数组中
                return item;
            }
        }
    }
};
//获取ztree数据
myZtree.prototype.getZtree = function(){
    return this.dataArr;
};
//获取没有加入到ztree中的数据
myZtree.prototype.getNotZtree = function(){
    return this.noPush;
};

module.exports = myZtree;