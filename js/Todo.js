'use strict';

var inputDom = document.querySelector("#write");
var todolist = document.querySelector(".todo .clist");
var donelist = document.querySelector(".done .clist");
var todoNumspan = document.querySelector(".todo h1 .num");
var doneNumspan = document.querySelector(".done h1 .num");
var main = document.querySelector(".main");
var body = document.body;

// 根据数据来渲染内容 ---》MVC模式
// 定义一个全局数组，用来存放数据
// var dataList = [];

// 判断本地存储localStorage是否有这个数组dataList
// 如果存在，则localStorage就是dataList,如果不存在就是一个空数组[]
// 将JSON.parse--> 将JSON格式的字符串转换成数组对象
var dataList =  localStorage.dataList?JSON.parse(localStorage.dataList):[];
// 判读完了就要渲染
renderList();

//定义一个渲染函数
function renderList() {
    // dataList转换成JSON格式的字符串
    // JSON.stringify(dataList) :将对象转换成JSON格式的字符串
    // 每一次修改完dataList的数据，要存放在localStorage
    localStorage.dataList = JSON.stringify(dataList);
    // 每一次渲染前把之前的内容先清空，再渲染
    todolist.innerHTML = "";
    donelist.innerHTML = "";
    var todoNum = 0;
    var doneNum = 0;
    dataList.forEach(function(item,index){
        // 当点击后，就新创建一个item这样一个div到clist的div里
        var newdiv = document.createElement("div");
        newdiv.className = "item";
        // 判读checkbox是否checked
        if (item.type == "todo") {
            newdiv.innerHTML = `
            <span class="checkbox">
                <input class="ipt_cbox" type="checkbox" name="check" value="" data-index="${index}">
            </span>
            <span class="content">${item.content}</span>
            <span class="delete" data-index="${index}"></span>
            `;
            todolist.appendChild(newdiv);
            todoNum++;
            inputDom.value = "";          
        }else{
            newdiv.innerHTML = `
            <span class="checkbox">
                <input class="ipt_cbox" type="checkbox" name="check" checked = "checked" value="" onclick="return false">
            </span>
            <span class="content">${item.content}</span>
            <span class="delete" data-index="${index}"></span>
            `;
            donelist.appendChild(newdiv);
            doneNum++;
            inputDom.value = "";
        }
        
    });
    // 修改待办事项的数量
    todoNumspan.innerHTML = todoNum;
    // 修改已完成事项的数量
    doneNumspan.innerHTML = doneNum;
}


// 监听输入框
// 将输入框的输入内容放置待办事项里
// 当输入内容时
inputDom.onkeypress = function (e) {
    // 事件对象e
    // 当用户在输入框按下回车键，并且输入框有内容，就将输入框的内容放置待办事项里
    if (e.key=="Enter"&&inputDom.value!="") {
        
        //往dataList数据里添加待办事项数据
        var data = {
            content:inputDom.value,
            type:"todo"
        }
        dataList.push(data);
        // 根据数据渲染列表
        renderList();
        
    }
}

// 监听clist,因为是冒泡事件监听，每一个子item最后都会冒泡到clist
//所有监听一个clist就可以监听到所有的子item事件是否发生点击事件
// 可以使用change事件来监听

// todolist.onchange = function(e){
//     // 事件对象e
//     // 前面设置的当点击事件是新增的item子项添加的index就保存在 e.target.dataset.index
//     var index = e.target.dataset.index;
//     // 找到了索引值，修改type，
//     dataList[index].type = "done";
//     // 改了类型后重新渲染页面
//     renderList();
// }

// 监听事件
// 直接监听main上发生的点击事件，因为也是冒泡事件，所以直接监听main的div发生的事件
// click事件返回一个事件对象e,判断e.target.classNam
// 如果 e.target.classNam == "delete" 则是触发了删除事件
// 如果是 e.target.classNam == "checkbox" 则是发生勾选框事件

main.addEventListener("click",function(e) {
    // 事件对象e
    // 事件对象e.target.className保存了被点击的对象类名
    // 判断点击的是不是delete
    if (e.target.className=="delete") {
        // 前面设置的当点击事件是新增的item子项添加的index就保存在 e.target.dataset.index
        var index =  e.target.dataset.index;
        // 找到了索引值index,就删除对应保存在数组里的数据
        // splice() 删除数组元素，1，删除一个元素
        dataList.splice(index,1);
        // 删除完后，重新渲染
        renderList();
    }  
    // 判断点击的是不是checkbox
    if (e.target.className=="ipt_cbox") {
         // 前面设置的当点击事件是新增的item子项添加的index就保存在 e.target.dataset.index
        var index = e.target.dataset.index;
        // 找到了索引值，修改type，
        dataList[index].type = "done";
        // 改了类型后重新渲染页面
        renderList();
    }    
    console.log(e.target.className);
    console.log(e)
});

