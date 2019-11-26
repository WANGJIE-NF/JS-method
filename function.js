/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{参数类型}参数名 参数说明
 *@return {返回值类型} 返回值说明
*/

/* 模块说明
* @module 模块名
*/

/* 类说明
 * @class 类名
 * @constructor
 */

// TODO: 标注待实现的功能。

// FIXME: 标注出现的问题。

/**
 * 返回元素第N层祖先的元素节点函数
 * @param {Object} elem 
 * @param {Number} n 
 * @return {Object} dom 对象
 */
function retParent (elem, n) {
    while (n) {
        elem = elem.parentElement;
        n--;
        if(elem == null) {return null}
    }
    return elem;    
}

// 返回元素的子元素兼容性方法 IE4和IE5
Element.prototype.myChildren = function(){
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for(i = 0;i < len; i++) {
        if(child[i].nodeType == 1) {
            arr.push(child[i])
        }
    }
    return arr
}

/**
 * 元素的第N个兄弟节点
 * @param {Object} elem dom 对象
 * @param {Number} n 第N个兄弟节点， N为正 返回后面的，N为负 返回前面
 */
function retSibling(elem,n) {
    while(elem && n) {
        if(n > 0) {
            if(elem.nextElementSibling) {
                elem = elem.nextElementSibling;
            }else{
                for(elem.nextsigling; elem && elem.nodeType != 1; elem.nextsigling){};
            }
            n--;
        }else{
            if(elem.previousElementSibling) {
                elem = elem.previousElementSibling;
            }else{
                for(elem.previousElementSibling; elem && elem.nodeType != 1; elem.previousElementSibling) {};
            }
            n++
        }
    }
    return elem;
}

// 向后插入一个子节点
Element.prototype.insertAfter = function(targetNode,afterNode){
    var beforeNode = afterNode.nextElementSibling;
    if(beforeNode == null){
        this.appendChild(targetNode);
    }else{
        this.insertBefore(targetNode,beforeNode);
    }
}


// getScrollOffset 滚动条滚动距离兼容性函数
function getScrollOffset() {
    if(window.pageXOffset) {
        return {
            x : window.pageXOffset(),
            Y : window.pageYOffset()
        }
    }else{
        return {
            X : document.body.scrollLeft + document.documentElement.scrollLeft,
            Y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// getViewportOffset 返回浏览器视口尺寸兼容性函数
function getViewportOffset() {
    if(window.innerWidth) {
       return { 
            W : window.innerWidth,
            H : window.innerHeight
       }
    }else { 
        if(document.compatMode === "BackCompat") {
            return {
                W : document.body.clientWidth,
                H : document.body.clientHeight
            }
        }else {
            return {
                W : document.documentElement.clientWidth,
                H : document.documentElement.clientHeight
            }
        }

    }
}

// getStyle 读取元素的样式兼容性函数
function getStyle(ele,prop) {
    if(window.getComputedStyle) {
        return window.getComputedStyle(ele,prop)[prop]; // ie8以下不兼容
    }else {
        return ele.currentStyle[prop];  // ie独有
    }
}

// addEvent 绑定事件兼容性函数
function addEvent(elem,type,handle) {
    if(elem.addEventListener) {
        elem.addEventListener(type,handle,false);
    }else if(elem.addachEment) {
        elem.attachEvent("on" + type,function() {
            handle.call(elem);
        })
    }else{
        elem["on" + type] = handle;
    }
}

// stopBubble  取消冒泡兼容性函数
function stopBubble(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else{
        event.cancelBubble();
    }
}

// cancelHandler 阻止默认事件兼容性函数
function cancelHandler(event) {
    if(event.preventDefaule) {
        event.preventDefaule();
    }else{
        event.returnValue = false;
    }
}


// 函数防抖：将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，
// 但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。

// 函数节流：使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。

// 区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，
// 而函数防抖只是在最后一次事件后才触发一次函数。比如在页面的无限加载场景下，我们需要用户在滚动页面时，
// 每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现

// 节流
function throttle(handler,wait){
    var lastTime = 0;
    return function(e){
        nowTmie = new Date().getTime();
        if(nowTmie - lastTime > wait){
            handler.apply(this,arguments);
            lastTime = nowTmie;
        }
    }
}

// 防抖
function debounce (handler,delay){
    var timer = null;
    return function(){
        var _self = this,
            _arg = arguments;
        clearTimeout(timer);
        timer = setInterval(function(){
            handler.apply(_self,_arg)
        },delay)
    }
}


// 圣杯模式
function inherit(Target, Origin){
    function F (){};
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constuctor = Target;
    Target.prototype.uber = Origin;
}

// cookie
const cookie = {
    setCookie(cname,cvalue,exdays){
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) { 
                return c.substring(name.length,c.length); 
            }
        }
        return "";
    },
    checkCookie(){
        var user = this.getCookie("username");
        if (user != ""){
            alert("欢迎 " + user + " 再次访问");
        }
        else {
            user = prompt("请输入你的名字:","");
                if (user != "" && user != null){
                    this.setCookie("username", user, 30);
            }
        }
    }
}

// 数组去重
function unique1 (arr){
    var newArr = [];
    arr.forEach((val) => {
        if(!newArr.includes(val)){
            newArr.push(val);
        }
    })
    return newArr
}


/**
 * 生成指定区间内的指定长度的一个数组，并排序
 * @method randomNub
 * @for arr
 * @param {Number} len 数组长度
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns 数组
 */
function randomNub(len, min, max) {
    if (len > (max - min + 1)) {
        return `要求长度${len},大于区间 ${min} - ${max}(${max - min + 1}个)`;
    }
    let arr = [];
    while (arr.length !== 10) {
        var nowNum = parseInt(Math.random() * (max - min + 1)) + min;
        if (arr.indexOf(nowNum) == -1) {
            arr.push(nowNum);
        }
    }
    arr.sort(function(a, b) {
        return a - b
    });
    return arr
}



// 解析 URL 成一个对象
String.prototype.urlObj= function urlObj(){ 
    var url = this.split('?')[1].split('&'), 
    len = url.length; 
    this.url = {}; 
    for(var i = 0; i < len; i += 1){ 
        var cell = url[i].split('='), 
        key = cell[0], 
        val = cell[1]; 
        this.url[key] = val; 
    } 
    return this.url; 
} 


/**
 * 字符串中出现最多的字符
 * @method maxStr
 * @for obj
 * @param {String} str 
 * @returns {object} maxStr 包含字符 key 和数量 counter 的一个对象
 */
function maxStr(str){
    var obj = {};
    var maxStr = {
        key: '',
        counter: 0
    };
    const len = str.length;
    for (let i = 0; i < len; i++){
        if(obj[str[i]] == undefined){
            obj[str[i]] = 1;
        }else{
            obj[str[i]] += 1;
        }
    }
    for( let prop in obj){
        if(obj[prop] > maxStr.counter){
            maxStr.key = prop;
            maxStr.counter = obj[prop]
        }
    }
    return maxStr;
}



// 字符串字节长度
function byteLenght(s){ 
    if(!arguments.length || !s) return null;  
    if("" == s) return 0;
    var len = s.length;
    for(var i=0; i<s.length; i++){   
        if(s.charCodeAt(i) > 255){
            len += 1; 
        }
    }
    return len;
}

// 深度克隆
function deepClone(origin){
    if(typeof(origin) !== 'object' || origin === null) return origin
    var target = Array.isArray(origin) ? [] : {};  
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)) {
                target[prop] = deepClone(origin[prop]);
        }
    }
    return target
}

// 冒泡排序（升序）
// 1.对相邻的数对比，如果前者大于后者，就交换值，一轮结束后确定最后一个值
// 2.循环第一步 n-1 次
// 3.优化：内层for循环不对已经排序的数比较
function bubbleSort(arr){
    var len = arr.length;
    for(var i = 0; i< len;i++){
        for(var j = 0;j< len -i -1;j++){
            if(arr[j]>arr[j+1]){ 
                var temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// 选择排序（升序）
// 1.首先在未排序序列中找到最小元素，存放到排序序列的起始位置。
// 2.再从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾。
// 3.重复第二步，直到所有元素均排序完毕。
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {   
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
// 快速排序（升序）
// 1．先从数列中取出一个数作为基准数。
// 2．分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边。
// 3．再对左右区间重复第一步和第二步，直到各区间只有一个数。  
var quickSort = function(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);   //基准位置（理论上可任意选取）
    var pivot = arr.splice(pivotIndex, 1)[0];  //基准数
    var left = [];  // 储存小于基准的数
    var right = [];  // 储存大于基准的数
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  //链接左数组、基准数构成的数组、右数组
};

懒加载
// https://www.cnblogs.com/wangjie-nf/p/11489535.html

轮播图
// https://www.cnblogs.com/wangjie-nf/p/11521846.html