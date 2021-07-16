let main = $(".main");
let list = $(".list");
let inputBtn = $(".inputBtn");
let inputText = $(".inputText")
let delBtn = $(".delBtn");




// 資料
let data=[
  {"content":"把發霉的檸檬拿去丟掉","done":"false"},
  {"content":"約朋友禮拜五吃晚餐","done":"false"},
  {"content":"禮拜天晚餐約會","done":"false"},
  {"content":"到垃圾","done":"false"},
  {"content":"大掃除","done":"false"},
  {"content":"買聖誕節禮物","done":"false"}
]

function saveDate(data){
  localStorage.setItem("todolist",JSON.stringify(data));
}

// localstorage只能存字符串 把數組轉字符 JSON.stringify()
// localStorage.setItem("todo",JSON.stringify(data));
// let backData = localStorage.getItem("todo");
// 取回需轉回陣列
// console.log(JSON.parse(backData));

// 讀取本地數據
function getData(){
  let data = localStorage.getItem("todolist");
  if(data !== null){
    return JSON.parse(data);
  }else{
    return[];
  }
}

getData();
 

// 渲染
function renderData(){
  if(data.length==0){
    main.css("display","none");
  }else{
    main.css("display","block");
  }

  let local = getData();
  let arr = [];
  let unNum="";
  $.each(local,function(index,item){
    // console.log(local[index].done == false);
    if(local[index].done == false){
      // console.log(local[index]);
      arr.push((local[index]));
    }
    unNum = arr.length;
  }) 
  //  console.log(unNum);
  
  $('.un-num').text(unNum);
 
  let newData = getData();
  list.empty();
  $('.uncomplete').empty();
  $('.finished').empty();
  $.each(newData,function(index,item){
    if(item.done){
      list.prepend( `<li class="w-100 contain-li">
      <input type="checkbox" name="" id="checkbox" checked=checked></i>
      <p class="d-inline-block listItem checked ">${item.content}</p>
      <input class="delBtn" data-num="${index}" type="button" value="X">
      </li>
      `);
     }else{
      list.prepend( `<li class="w-100 contain-li">
      <input type="checkbox" name="" id="checkbox"></i>
      <p class="d-inline-block listItem">${item.content}</p>
      <input class="delBtn" data-num="${index}" type="button" value="X">
      </li>
      `);
     }
    // console.log(item.done);
   if(item.done){
    $('.finished').prepend(`<li class="w-100 contain-li">
    <input class="inputCheckbox" type="checkbox" name="" id="checkbox" checked=checked>
    <p class="d-inline-block listItem checked ">${item.content}</p>
    <input class="delBtn" data-num="${index}" type="button" value="X">
    </li>
    `);
   }else{
    $(".uncomplete").prepend( `<li class="w-100 contain-li">
    <input class="un-checkbox" type="checkbox" name="" id="checkbox"></i>
    <p class="d-inline-block listItem">${item.content}</p>
    <input class="delBtn" data-num="${index}" type="button" value="X">
    </li>
    `);
   }
    })
   
  }

renderData();

// 新增 把值取出再丟回data
inputBtn.on('click',function(e){
  if(inputText.val()==""){
    alert('請輸入代辦事項!')
    return;
  }
  // 把本地數據庫原有的取出
  let local = getData();
  // 把新的加進去
  local.push({content:$(".inputText").val(),done:false});
  console.log($(".inputText").val());
   inputText.val("");
  // 再存回本地數據庫
  saveDate(local);
  // 把本地數據庫資料渲染到畫面
  renderData();


})

//  刪除
$('.list,.uncomplete,.finished').on('click','.delBtn',function(){
  let num =$(this).attr('data-num');


  // 讀取本地數據  
  let local = getData();
  // 刪掉這筆
  local.splice(num,1);
  // 存到本地數據庫
  saveDate(local);
  // 把本地數據庫資料渲染到畫面
  renderData();
})


// 待完成和已完成
// list.on('click',function(e){
//   if(e.target.nodeName=="P"){
//      e.target.classList.toggle('checked');
//      console.log(e.target);
//     //  e.target.classList.toggle('fas fa-check');
     
//   }
   
// })

list.on('click','input',function(){

  // console.log($(this));
  // 獲取本地數據
  let local = getData();
  // 修改
  let num =$(this).siblings('.delBtn').attr('data-num');

  
  local[num].done= $(this).prop("checked");
  // console.log(local);
  // 存到本地數據
  saveDate(local);
  // 重新渲染
  renderData();


  
})


$('.finished').on('click','.inputCheckbox',function(){

console.log('123');
  // 獲取本地數據
  let local = getData();
  // // 修改
  let num =$(this).siblings('.delBtn').attr('data-num');


  local[num].done= $(this).prop("checked");

  // // 存到本地數據
  saveDate(local);
  // // 重新渲染
  renderData();
})


$('.uncomplete').on('click','.un-checkbox',function(){
    // 獲取本地數據
    let local = getData();
    // // 修改
    let num =$(this).siblings('.delBtn').attr('data-num'); 
    local[num].done= $(this).prop("checked");
    // // 存到本地數據
    saveDate(local);
    // // 重新渲染
    renderData();
  })
  



  $(".delItem").on('click',function(){
    let local = getData();

    let arr = [];
 
    $.each(local,function(index,item){
      // console.log(local[index].done == false);
      if(local[index].done == false){
     
        arr.push((local[index]));
      }
  
    }) 
    saveDate(arr);
    renderData();
  })


  // clock
  let time = new Date();
  let hour = time.getHours();

  let mins = time.getUTCMinutes();
  let sec = time.getSeconds();

  let secDeg = sec*6;
  let minsDeg = mins*6+sec*0.1;
  let hourDeg = hour*30+mins*0.5;
  console.log(hourDeg);
  console.log(secDeg);


   document.write(`
    <style>
     @keyframes j_s {
    from {transform: rotate(${secDeg}deg);}
    to {transform: rotate(${360+secDeg}deg);}
    }
    @keyframes j_m {
    from {transform: rotate(${minsDeg}deg);}
    to {transform: rotate(${360+minsDeg}deg);}
    }
    @keyframes j_h {
    from {transform: rotate(${hourDeg}deg);}
    to {transform: rotate(${360+hourDeg}deg);}
    }
  </style>
   `);