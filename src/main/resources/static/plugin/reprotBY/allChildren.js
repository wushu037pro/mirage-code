//留守儿童，孤儿，事实孤儿，困境儿童报表
var threme = "wonderland";
$().ready(function() {
	init4();
	init5();
	init6();
	
});


function init4(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/allChildren/data",
			    data: {begin:$("#begin").val(),end:$("#end").val()},
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts5(data);
			    	}
			    	
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}
function init5(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/strandsAllChildrenReport/data",
			    data: {begin:$("#begin").val(),end:$("#end").val()},
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts6(data);
			    	}
			    	
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}
function init6(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/strandsAllChildrenByJiedaoReport/data",
			    data: {begin:$("#begin").val(),end:$("#end").val()},
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts7(data);
			    	}
			    	
			    	
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}

function initEcharts5(data){
	var data1=[];
	
	var total=0;
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     total+=data[i].value;
	}
	var myChart = echarts.init(document.getElementById('main5'),"walden"); 
    myChart.dispose();
	 myChart = echarts.init(document.getElementById('main5'),threme);
 
	    var option = {
	    	    title : {
	    	        text: '全区留守儿童、事实孤儿、孤儿、困境儿童占比',
	    	        subtext:'共计'+total+'人',
	    	        x:'center'
	    	    },
	    	    tooltip : {
	    	        trigger: 'item',
	    	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    	    },
	    	    legend: {
	    	        orient : 'vertical',
	    	        x : 'left',
	    	        data:data1
	    	    },
	    	    
	    	    calculable : true,
	    	    series : [
	    	        {
	    	            name:'人数',
	    	            type:'pie',
	    	            radius : '55%',
	    	            center: ['50%', '55%'],label: {
	                		normal: {
	                    		formatter: '{b}：{c} ( {d}% )',
	                    		}
	                    },itemStyle : {
	    	                normal : {
	    	                    label : {
	    	                        show : true
	    	                    },
	    	                    labelLine : {
	    	                        show : true
	    	                    }
	    	                },
	    	                emphasis : {
	    	                    label : {
	    	                        show : true,
	    	                        position : 'center',
	    	                        textStyle : {
	    	                            fontSize : '17',
	    	                            fontWeight : 'bold'
	    	                        }
	    	                    }
	    	                }
	    	            },
	    	            data:data
	    	        }
	    	    ]
	    	};
    myChart.on('click', function (params) {
    	
    	yuanyin=params.data.name;
		//init4(name,params.data.name);
	});                    

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function initEcharts6(data){
	var xname=[];
	var peopleValue=[];
	var cashValue=[];
	var tPeople=0;
	var tCash=0.0;
for(var i=0;i<data.length;i++){
	xname.push(data[i].name);
	peopleValue.push(data[i].value);
	cashValue.push((data[i].menoy/10000).toFixed(1));
	tPeople+=parseInt(data[i].value);
	tCash+=data[i].menoy;
}
var text = '总人数：'+tPeople+'人'+' 总金额：'+(tCash/10000).toFixed(1)+'万元';

	
	var myChart4 = echarts.init(document.getElementById('main6'),"wonderland"); 
    	  myChart4.dispose();
    	  myChart4 = echarts.init(document.getElementById('main6'),threme);
	

	var option4= {
	 title: {
			        text: '各街道困境未成年人救助人数，金额(万元)',
			        subtext: text,
	 },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: ['人数', '金额']
	    },
	    grid: {
	    	top:'27%',
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis:  {
	    	type: 'category',
	        data: xname,
	        axisLabel:{
	            interval:0,//0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
	            rotate:0,//倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
	           }
	    },
	    yAxis:[{
            type: 'value',
            name:'人数',
            splitLine : {
                show: false
            }
        },
        {
            type: 'value',
            name:'金额(万元)',
            splitLine : {
                show: false
            }
        }
    ],
	    series: [
	        {
	            name: '人数',
	            type: 'bar',
	            //barWidth:40,
	            yAxisIndex:0,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data:peopleValue
	        },
	        {
	            name: '金额',
	            type: 'bar',
	            yAxisIndex:1,
	            //barWidth:40,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data: cashValue
	        },
	        
	    ],
	   
	};

	myChart4.setOption(option4);	
	
	
}
function initEcharts7(data){
	var data1=[];
	  var value=[];
	  var total=0;
	  for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     value.push(data[i].value);
	     total+=data[i].value;	
	 }
	 var end=100;
	 var flag = false;
	  if(data1.length>=10){
	  	flag = true;
	  	end = 10*100/data.length;
	  	if(end==0){
	  		end = 1;
	  	}
	  }
var myChart = echarts.init(document.getElementById('main7'),"wonderland"); 
	  myChart.dispose();
	  myChart = echarts.init(document.getElementById('main7'),threme);   
var   option = {
title : {
    text: '各社区困境未成年人人数',
    x: 'left',
    subtext: "总人数："+total+"人",
},
tooltip : {
    trigger: 'axis',
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
},
legend: {
    data:["人数"],
},
grid: {
	top:'27%',
    left: '3%',
    right: '7%',
    bottom: '5%',
    containLabel: true
},
// 值域
/*     dataRange: {
    orient: 'vertical',        // 布局方式，默认为垂直布局，可选为：
                               // 'horizontal' ¦ 'vertical'
    x: 'left',                 // 水平安放位置，默认为全图左对齐，可选为：
                               // 'center' ¦ 'left' ¦ 'right'
                               // ¦ {number}（x坐标，单位px）
    y: 'bottom',               // 垂直安放位置，默认为全图底部，可选为：
                               // 'top' ¦ 'bottom' ¦ 'center'
                               // ¦ {number}（y坐标，单位px）
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#ccc',       // 值域边框颜色
    borderWidth: 0,            // 值域边框线宽，单位px，默认为0（无边框）
    padding: 5,                // 值域内边距，单位px，默认各方向内边距为5，
                               // 接受数组分别设定上右下左边距，同css
    itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
                               // 横向布局时为水平间隔，纵向布局时为纵向间隔
    itemWidth: 20,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
    itemHeight: 14,            // 值域图形高度，线性渐变垂直布局高度为该值 * 10
    splitNumber: 5,            // 分割段数，默认为5，为0时为线性渐变
   // color: ['#1e90ff', '#f0ffff'],//颜色 
    //text:['高','低'],         // 文本，默认为数值文本
    textStyle: {
        color: '#333'          // 值域文字颜色
    }
}, */
dataZoom : {
		       show : flag,
		       realtime : true,
		       start :0,
		       end : end
		},

calculable : true,
xAxis : [
    {
        type : 'category',
        data : data1, 
        axisLabel:{  
                     interval:0,//横轴信息全部显示  
                     rotate:-30,//-30度角倾斜显示  
                },
    }
],
yAxis : [
    {	name:"人数",
        type : 'value'
    }
],
series : [
    {
        name:"人数",
        type:'bar',
        data:value,
         barWidth:30,
         itemStyle: {
	                normal: {
	                   
	                    label: {
	                        show: true,
	                        position: 'top',
	                        formatter: '{c}'
	                    }
	                }
	            },
       
    }
    
]
};

myChart.setOption(option, true);	    	
  }
layui.use(['laydate','form'], function(){
	  var laydate = layui.laydate;
	
	 
	  laydate.render({
	    elem: '#begin',
	    type:'month',
	    format: 'yyyyMM'
	
	  });
	  laydate.render({
	    elem: '#end',
	    type:'month',
	    format: 'yyyyMM'
	
	  });

	
	  
	 
	});
 layui.use('form', function(){
		  var form = layui.form;
		  form.render('select'); //刷新select选择框渲染
		  form.on('select(theme-select)', function(data){
		  
			  //console.log(data.value); //得到被选中的值
			  
			  threme = data.value;
			  
			  init4();
	
			});      
		});
 function add(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e; } 
 function sub(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e; }
 function mul(a, b) { var c = 0, d = a.toString(), e = b.toString(); try { c += d.split(".")[1].length; } catch (f) {} try { c += e.split(".")[1].length; } catch (f) {} return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c); }
 function div(a, b) { var c, d, e = 0, f = 0; try { e = a.toString().split(".")[1].length; } catch (g) {} try { f = b.toString().split(".")[1].length; } catch (g) {} return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e)); }
  