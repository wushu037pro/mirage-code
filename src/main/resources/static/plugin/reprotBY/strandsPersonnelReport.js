//留守儿童，孤儿，事实孤儿，困境儿童报表
var threme = "wonderland";
$().ready(function() {

	init();
	init1();
	init2();
	init3();
	
});
var totall=0;
var tPeopleg=0;
var tPeoplesg=0;
var tPeoplek=0;
function getWords(obj){
	var total=totall+tPeopleg+tPeoplesg+tPeoplek;
	var content="<span style='font-size:15px;'>目前全区困境未成年人共 "+total+" 人，其中，孤儿 "+tPeopleg+" 人，事实孤儿 "+tPeoplesg+" 人，困境儿童 "+tPeoplek+" 人，留守儿童 "+totall+" 人，流浪儿童 0 人。</span>";
	
	layer.tips(content, '#titleText', {
		  tips: [3, '#78BA32']
		});
	
}
function init(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/queryLset/data",
			    //data: ,
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts1(data);
			    	}
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}
function init1(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/orphanReport/data",
			    data: {begin:$("#begin").val(),end:$("#end").val()},
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts2(data);
			    	}
			    	
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}
function init2(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/orphanInfactReport/data",
			    data: {begin:$("#begin").val(),end:$("#end").val()},
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts3(data);
			    	}
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}
function init3(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/strandsChildrenReport/data",
			    data: {begin:$("#begin").val(),end:$("#end").val()},
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts4(data);
			    	}
			    	
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}

function initEcharts1(data){
	var name=[];
	var value=[];
	for(var i=0;i<data.length-1;i++){
		name.push(data[i].name2);
		value.push(data[i].value);
		totall+=parseInt(data[i].value);
	}
	var text='总人数：'+totall+'人';
	var myChart1 = echarts.init(document.getElementById('main1'),"wonderland"); 
    	  myChart1.dispose();
          myChart1 = echarts.init(document.getElementById('main1'),threme);


var option1 = {
	title: {
		        text: '各街道留守儿童人数',
		        subtext:text ,
	},	
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['人数']
    },
    grid: {
    	top:'27%',
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: name
    },
     
    yAxis:{
        type: 'value',
        name:'人数',	
        formatter:'{value}'		
    },
    
    series: [
        {
            name: '人数',
            type: 'bar',
            barWidth:30,
            xAxisIndex:0,
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data: value
        },
        
       
        
    ]
};

myChart1.setOption(option1, true);
}
function initEcharts2(data){

	var xname=[];
	var peopleValue=[];
	var cashValue=[];
	
	var tCash=0;
for(var i=0;i<data.length-1;i++){
	xname.push(data[i].name);
	peopleValue.push(data[i].value1);
	cashValue.push(data[i].value2/1000);
	tPeopleg+=parseInt(data[i].value1);
	
	tCash+=parseInt(data[i].value2);
		
	
}

var text = '总人数：'+tPeopleg+'人'+' 总金额：'+tCash/1000+'千元';

	
	
	var myChart2 = echarts.init(document.getElementById('main2'),"wonderland"); 
    	  myChart2.dispose();
    	  myChart2 = echarts.init(document.getElementById('main2'),threme);
	

	var option2 = {
	 title: {
			        text: '各街道孤儿人数及金额',
			        subtext: text,
	 },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: ['孤儿人数', '发放金额']
	    },
	    grid: {
	    	top:'27%',
	        left: '3%',
	        right: '7%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis:  {
	    	type: 'category',
	        data: xname
	        
	    },
	    yAxis:[ {
	    	type: 'value',
	        name:'人数',
	        formatter:'{value}人',
	    },
	    {
	    	type: 'value',
	        name:'金额（千元）',
	        formatter:'{value}人',
	    },],
	    series: [
	        {
	            name: '孤儿人数',
	            type: 'bar',
	           // barWidth:10,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data:peopleValue
	        },
	        {
	            name: '发放金额',
	            type: 'bar',
	            //barWidth:10,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data: cashValue
	        },
	        
	    ]
	};

	myChart2.setOption(option2);	
	
	
}

function initEcharts3(data){

	var xname=[];
	var peopleValue=[];
	var cashValue=[];
	
	var tCash=0;
for(var i=0;i<data.length-1;i++){
	xname.push(data[i].name);
	peopleValue.push(data[i].value1);
	cashValue.push(data[i].value2/1000);
	tPeoplesg+=parseInt(data[i].value1);
	tCash+=parseInt(data[i].value2);
}
var text = '总人数：'+tPeoplesg+'人'+' 总金额：'+tCash/1000+'千元';

	
	
	var myChart3 = echarts.init(document.getElementById('main3'),"wonderland"); 
    	  myChart3.dispose();
    	  myChart3 = echarts.init(document.getElementById('main3'),threme);
	

	var option3 = {
	 title: {
			        text: '各街道事实孤儿人数及金额',
			        subtext: text,
	 },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: ['事实孤儿人数', '发放金额']
	    },
	    grid: {
	    	top:'27%',
	        left: '3%',
	        right: '7%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis:  {
	    	type: 'category',
	        data: xname
	        
	    },
	    yAxis:[ {
	    	type: 'value',
	        name:'人数',
	        formatter:'{value}人',
	    },
	    {
	    	type: 'value',
	        name:'金额（千元）',
	        formatter:'{value}人',
	    },],
	    series: [
	        {
	            name: '事实孤儿人数',
	            type: 'bar',
	           // barWidth:10,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data:peopleValue
	        },
	        {
	            name: '发放金额',
	            type: 'bar',
	           // barWidth:10,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data: cashValue
	        },
	        
	    ]
	};

	myChart3.setOption(option3);	
	
	
}
function initEcharts4(data){
	var xname=[];
	var peopleValue=[];
	var cashValue=[];
	var tCash=0;
for(var i=0;i<data.length;i++){
	xname.push(data[i].name);
	peopleValue.push(data[i].value);
	cashValue.push((data[i].menoy/10000).toFixed(1));
	tPeoplek+=parseInt(data[i].value);
	tCash+=data[i].menoy;
}
	tCash=(tCash/10000).toFixed(1);
var text = '总人数：'+tPeoplek+'人'+' 总金额：'+tCash+'万元';

	
	var myChart4 = echarts.init(document.getElementById('main4'),"wonderland"); 
    	  myChart4.dispose();
    	  myChart4 = echarts.init(document.getElementById('main4'),threme);
	

	var option4= {
	 title: {
			        text: '各街道困境儿童救助人数，金额(万元)',
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
			  
			  init();
	
			});      
		});
 function add(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e; } 
 function sub(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e; }
 function mul(a, b) { var c = 0, d = a.toString(), e = b.toString(); try { c += d.split(".")[1].length; } catch (f) {} try { c += e.split(".")[1].length; } catch (f) {} return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c); }
 function div(a, b) { var c, d, e = 0, f = 0; try { e = a.toString().split(".")[1].length; } catch (g) {} try { f = b.toString().split(".")[1].length; } catch (g) {} return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e)); }
  