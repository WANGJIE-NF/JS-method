//  邮箱的验证
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

if(reg.test(email)){
    alert("邮箱格式正确");
}else{
    alert("邮箱格式不正确");
}


// 最短6位数，最长20位，阿拉伯数和英文字母（不区分大小写）组成
var reg =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/;


// 将字符串 '123456789' 转换为12.345.678
var str = '123345678'
var reg = /(?=(\B)(\d{3})+$)/g;
console.log(str.replace(reg,'.'))