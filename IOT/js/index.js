var today = new Date();
var year = today.getFullYear(); //获得年份
var month = today.getMonth()+1; //获得月份
var day = today.getDate() //获取日
var days = 0 //定义每个月的月份


function MonthDay(year,month) {
    var days = 0;
    if(month != 2){
        if(month == 4 || month == 6 || month == 11 || month==9){
            days = 30;
        }
        else{
            days = 31;
        }
    }else{
        if((year%4) == 0){
            days = 29;
        }else{
            days = 28;
        }
    }
    return days;
    // console.log("MonthDay");
}

function showDay(){
    var Day = year + "年" +month +"月" +day +"日";
    document.getElementById("iot_Data").innerHTML=Day
    // console.log("showday");
}
function showDate(){
    showDay();
    var days = MonthDay(year,month);
    console.log(month,year,days);
    // console.log("showDate");
    var firstDay = new Date(year,month-1,1);
    var weekend = firstDay.getDay();
    // console.log(weekend);
    var lastMonth = new Date(year,month-2);  //获取上一个月的实例对象
    var lastMonthYear =lastMonth.getFullYear(); 
    var lastmonth = lastMonth.getMonth()+1;     //输出真正对应的月份
    // console.log(lastMonth);
    var Lastdays = MonthDay(lastMonthYear,lastmonth);
    console.log(lastMonthYear,lastmonth,Lastdays);
    // console.log(Lastdays);
    var dataRow = document.getElementById("iot_day");
    dataRow.innerHTML="";
    if(weekend != 0){
        for(var i=0;i<weekend;i++){
            var dayElement =document.createElement('div');
            dayElement.className = 'iot_everyDay iot_lastMonth';
            dayElement.innerHTML = Lastdays-weekend+i+1;
            dataRow.appendChild(dayElement);
        }
    }
    // console.log(year);
    // console.log(today.getFullYear());
    for(var i= 1; i<=days; i++){
        var dayElement = document.createElement("div");
        dayElement.className = "iot_everyDay";
        dayElement.innerHTML = i+"";
        // && month == today.getMonth()+1 && year == today.getYear()
        if(i == day && month == today.getMonth()+1 && year == today.getFullYear()){
            dayElement.style.color="red";
        }
        dataRow.appendChild(dayElement);
    }
    // console.log(days);
    // console.log(weekend);
    for(var i = days+weekend;i<42;i++){
        var dayElement =document.createElement("div");
        dayElement.className = "iot_everyDay iot_nextMonth";
        dayElement.innerHTML = i+1-(days+weekend);
        dataRow.appendChild(dayElement)
    }
}

function lastMonth() {
    if (month > 1) {
        month = month - 1;
    }else {
        month = 12;
        year = year-1;
     }
     showDate();
}

function nextMonth(){
    if (month < 12) {
        month =month+1;
    }else {
        month = 1;
        year = year+1;
     }
     showDate();
}

function GongGao(){
    var JiaoXueUl = document.getElementById("iot_JiaoXueUl");
    JiaoXueUl.style.display='none';
    var GongGaoUl = document.getElementById('iot_GongGaoUl');
    GongGaoUl.style.display='flex';
    var arrowHead =  document.getElementById("iot_arrowhead") || document.getElementById("iot_arrowheadRight");
    arrowHead.id = 'iot_arrowheadLeft';
}

function JiaoXue(){
    var JiaoXueUl = document.getElementById("iot_JiaoXueUl");
    JiaoXueUl.style.display='flex';
    var GongGaoUl = document.getElementById('iot_GongGaoUl');
    GongGaoUl.style.display='none';
    var arrowHead =   document.getElementById("iot_arrowheadLeft");
    arrowHead.id = 'iot_arrowheadRight';
}



function Lunbo(){
    var father = document.querySelector("#iot_Carousel");
    var children = document.querySelectorAll('.iot_CarouselChi');
    var index = 0;
    var time =0 ;
    var left = document.getElementById('iot_Left')
    var right = document.getElementById('iot_Right')
    var button = document.querySelectorAll('.iot_Underbut')
    console.log(button);
    function position(){
        father.style.left = (index* -100) + '%';
    }       //实现位置变换
    function add() {        //实现增加图片操作
        if (index >= children.length-1) {
            index = 0
        }  else{
            index ++
        }
    }          
    function desc(){       //实现减少图片操作
        if(index < 1){
            index = children.length -1 
        }else{
            index --
        }
    }
    function timer(){
        time = setInterval(()=>{
                index++
                desc()
                add()
                position()
                // console.log(index);
        },3000)
        // console.log(11);
    }
    timer()
    left.addEventListener('click',()=>{
        desc()
        position()
        clearInterval(time)
        timer()
    })
    right.addEventListener('click',()=>{
        add()
        position()
        clearInterval(time)
        timer()
    })
    // children[0].style.background = 'url("./image/1.jpg");'; 
    for (let i = 0; i < children.length; i++) {
        
        children[i].onmouseenter=function(){  //鼠标悬停时不动
            clearInterval(time);
            // console.log(11); 
        }
        children[i].onmouseout = function() {  //鼠标离开后继续动
            timer();
        // console.log(22);
        }
    }
    children[0].onmouseenter=function(){
        clearInterval(time);
        console.log(11);
    }
    children[0].onmouseout = function() {
        timer();
        }

    for (let i = 0; i < children.length; i++) {
        button[i].addEventListener("click", () => {
            index = i
            position()
            clearInterval(time)
            timer()
            console.log(11);
         })
        
      }

}
