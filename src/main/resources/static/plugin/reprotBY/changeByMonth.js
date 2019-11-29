
var threme = "wonderland";
$().ready(function() {
	init();
	
});

function init(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/changeByMonth/data",
			    data: {helpDate:$("#time").val()},
			    success: function(data){
			    	if(!data || data.length<=0){
			    		alert("该时间内没有数据");
			    	}else{
			    		initEcharts1(data);
			    		initEcharts2(data);
			    		initEcharts3(data);
			    		initEcharts4(data);
			    	}
			    	
			    },
			    error:function(data){
			         alert("加载失败！！");
			    }
			});

}

function initEcharts1(data){
	var yue=[];
	var chu=[];
	var nhu=[];
	var cren=[];
	var nren=[];
	var t = data.length-1;
	var text="";
	for(var i=0;i<data.length-1;i++){
		yue.push(data[i].yue);
		chu.push(data[i].chu);
		nhu.push(data[i].nhu);
		cren.push(data[i].cren);
		nren.push(data[i].nren);
	}
	
	
	
	var myChart1 = echarts.init(document.getElementById('main1'),"wonderland"); 
    	  myChart1.dispose();
          myChart1 = echarts.init(document.getElementById('main1'),threme);
var	option = {
		    title: {
		        text: '低保家庭户数及人口',
		        subtext:text,
		        subtextStyle:{
		        	
		        	
		        	
		        }	
		        	
		    },
		    tooltip: {
		        trigger: 'axis',
		        show : true,
		    },
		    legend: {
		        data:['农村户数','农村人数','城市户数','城市人数']
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    grid: {
		    	top:'25%',
		        left: '3%',
		        right: '7%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis:  {
		        type: 'category',
		        // boundaryGap: false,
		        data:yue,
		    },
		    yAxis: [
		        {
		            type: 'value',
		            name:'户数',
		           
		            splitLine : {
		                show: false
		            }
		        },
		        {
		            type: 'value',
		            name:'人数',
		            splitLine : {
		                show: false
		            }
		        }
		    ],
		    series: [
		    	{
		            name:'农村户数',
		            type:'bar',
		            data:nhu,
		            yAxisIndex:0,
		            stack:'户数',
		            label:{
		            	show:true,
		            	data:nhu,
		            	position:'inside',
		            }
		           
		        },
		        {
		            name:'农村人数',
		            type:'bar',
		            data:nren,
		            yAxisIndex:1,
		            stack:'人数',
		            label:{
		            	show:true,
		            	data:nren,
		            	position:'inside',
		            }
		            
		        },
		        {
		            name:'城市户数',
		            type:'bar',
		            data:chu,
		            yAxisIndex:0,
		            stack:'户数',
		            label:{
		            	show:true,
		            	data:chu,
		            	position:'top',
		            }
		           
		        },
		        {
		            name:'城市人数',
		            type:'bar',
		            data:cren,
		            yAxisIndex:1,
		            stack:'人数',
		            label:{
		            	show:true,
		            	data:cren,
		            	position:'top',
		            }
		            
		        },
		        
		    ]
		};

myChart1.setOption(option, true);
}
function initEcharts2(data){
	var moneyn=[];
	var moneyc=[];
	var yue= [];
	var t=data.length-1;
	for(var i=0;i<data.length-1;i++){
		moneyn.push(data[i].moneyn);
		moneyc.push(data[i].moneyc);
		yue.push(data[i].yue);
	}
	var text=$("#time").val()+'年农村合计发放金额:'+data[t].moneyn+'(万元) 城市合计发放金额:'+data[t].moneyc+'(万元)';
	var myChart2 = echarts.init(document.getElementById('main2'),"wonderland"); 
    	  myChart2.dispose();
    	  myChart2 = echarts.init(document.getElementById('main2'),threme);
	var	option2 = {
			    title: {
			        text: '低保资金发放（万元）',
			        subtext: text
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['农村低保发放金额','城市低保发放金额']
			    },
			    toolbox: {
			        show: true,
			        feature: {
			            dataZoom: {
			                yAxisIndex: 'none'
			            },
			            dataView: {readOnly: false},
			            magicType: {type: ['line', 'bar']},
			            restore: {},
			            saveAsImage: {}
			        }
			    },
			    grid: {
			    	top:'25%',
			        left: '3%',
			        right: '7%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: yue,
			    },
			    yAxis: {
			        type: 'value',
			        name:'万元',
			        axisLabel: {
			            formatter: '{value}'
			        }
			    },
			    series: [
			        {
			            name:'农村低保发放金额',
			            type:'line',
			            data:moneyn,
			            label:{
			            	show:true,
			            	data:moneyn,
			            	position:'top',
			            },
			            /*
						 * markPoint: { data: [ {type: 'max', name: '最大值'},
						 * {type: 'min', name: '最小值'} ] }, markLine: { data: [
						 * {type: 'average', name: '平均值'} ] }
						 */
			        },
			        {
			            name:'城市低保发放金额',
			            type:'line',
			            data:moneyc,
			            label:{
			            	show:true,
			            	data:moneyc,
			            	position:'top',
			            },
			            /*
						 * markPoint: { data: [ {type: 'max', name: '最大值'},
						 * {type: 'min', name: '最小值'} ] }, markLine: { data: [
						 * {type: 'average', name: '平均值'} ] }
						 */
			        },			        
			        ],
			                
			            };
			  

	myChart2.setOption(option2);	
	
	
}


function initEcharts3(data){
	
	// console.log(data);
	var yue=[];
	var chu=[];
	var nhu=[];
	var cren=[];
	var nren=[];
	var t = data.length-1;
	yue.push('01');
	chu.push(0);
	nhu.push(0);
	cren.push(0);
	nren.push(0);
	var n1=0;
	var n2=0;
	var c1=0;
	var c2=0;
	
	for(var i=0;i<data.length-2;i++){
		yue.push(data[i+1].yue);
		chu.push(parseInt(data[i+1].chu)-parseInt(data[i].chu));
		nhu.push(parseInt(data[i+1].nhu)-parseInt(data[i].nhu));
		cren.push(parseInt(data[i+1].cren)-parseInt(data[i].cren));
		nren.push(parseInt(data[i+1].nren)-parseInt(data[i].nren));
		n1+=(parseInt(data[i+1].nhu)-parseInt(data[i].nhu))/11;
		n2+=(parseInt(data[i+1].nren)-parseInt(data[i].nren))/11;
		c1+=(parseInt(data[i+1].chu)-parseInt(data[i].chu))/11;
		c2+=(parseInt(data[i+1].cren)-parseInt(data[i].cren))/11;
	}
	
	var text='';
	var myChart3 = echarts.init(document.getElementById('main3'),"wonderland"); 
    	  myChart3.dispose();
          myChart3 = echarts.init(document.getElementById('main3'),threme);
var	option = {
		    title: {
		        text:'低保家庭环比增长',
		        subtext:text,
		        
		    },
		    tooltip: {
		        trigger: 'axis',
		        
		       
		    },
		    legend: {
		        data:['农村户数增长','农村人数增长','城市户数增长','城市人数增长'],
		    	
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    grid: {
		    	top:'25%',
		        left: '3%',
		        right: '7%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: yue,
		    },
		    yAxis:[
		    	 {
				        type: 'value',
				        name:'户数',
				        axisLabel: {
				            formatter: '{value}'
				        }
				    },
				 {
				        type: 'value',
				        name:'人数',
				        axisLabel: {
				            formatter: '{value}'
				        }
				    },   
		    ],
		    series: [
		        {
		            name:'农村户数增长',
		            type:'line',
		            data:nhu,
		            yAxisIndex:0,
		            label:{
		            	show:true,
		            	data:nhu,
		            	position:'top',
		            }
		           
		        },
		        {
		            name:'农村人数增长',
		            type:'line',
		            data:nren,
		            yAxisIndex:1,
		            label:{
		            	show:true,
		            	data:nren,
		            	position:'bottom',
		            }
		            
		        },
		        {
		            name:'城市户数增长',
		            type:'line',
		            data:chu,
		            yAxisIndex:0,
		            label:{
		            	show:true,
		            	data:chu,
		            	position:'top',
		            }
		           
		        },
		        {
		            name:'城市人数增长',
		            type:'line',
		            data:cren,
		            yAxisIndex:1,
		            label:{
		            	show:true,
		            	data:cren,
		            	position:'bottom',
		            }
		            
		        },
		    ]
		};

myChart3.setOption(option, true);
}


function initEcharts4(data){
	var moneyn=[];
	var moneyc=[];
	var yue= [];
	yue.push('01');
	moneyn.push(0);
	moneyc.push(0);
	var n=0.0;
	var c=0.0;
	var t=data.length-1;
	for(var i=0;i<data.length-2;i++){
		yue.push(data[i+1].yue);
		moneyn.push(sub(data[i+1].moneyn,data[i].moneyn));
		moneyc.push(sub(data[i+1].moneyc,data[i].moneyc));
		n+=(sub(data[i+1].moneyn,data[i].moneyn))/11;
		c+=(sub(data[i+1].moneyc,data[i].moneyc))/11;
		
	}
	var text=$("#time").val()+'年每月农村平均发放金额环比增长:'+n.toFixed(1)+'(万元) 城市平均发放金额环比增长:'+c.toFixed(1)+'(万元)';
	var myChart4 = echarts.init(document.getElementById('main4'),"wonderland"); 
    	  myChart4.dispose();
    	  myChart4 = echarts.init(document.getElementById('main4'),threme);
	var	option2 = {
			    title:{
			        text:'资金发放环比增长(万元)',
			        subtext: text,
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['农村发放金额环比增长','城市发放金额环比增长']
			    },
			    toolbox: {
			        show: true,
			        feature: {
			            dataZoom: {
			                yAxisIndex: 'none'
			            },
			            dataView: {readOnly: false},
			            magicType: {type: ['line', 'bar']},
			            restore: {},
			            saveAsImage: {}
			        }
			    },
			    grid: {
			    	top:'25%',
			        left: '3%',
			        right: '7%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: yue,
			    },
			    yAxis: {
			        type: 'value',
			        name:'万元',
			        axisLabel: {
			            formatter: '{value}'
			        }
			    },
			    series: [
			        {
			            name:'农村发放金额环比增长',
			            type:'line',
			            data:moneyn,
			            label:{
			            	show:true,
			            	data:moneyn,
			            	position:'top',
			            }
			           /*
						 * markPoint: { data: [ {type: 'max', name: '最大值'},
						 * {type: 'min', name: '最小值'} ] }, markLine: { data: [
						 * {type: 'average', name: '平均值'} ] }
						 */
			        },
			        {
			            name:'城市发放金额环比增长',
			            type:'line',
			            data:moneyc,
			            label:{
			            	show:true,
			            	data:moneyc,
			            	position:'bottom',
			            }
			           /*
						 * markPoint: { data: [ {type: 'max', name: '最大值'},
						 * {type: 'min', name: '最小值'} ] }, markLine: { data: [
						 * {type: 'average', name: '平均值'} ] }
						 */
			        },
			        ],
			                
			            };
			  

	myChart4.setOption(option2);	
	
	
}


layui.use('laydate', function(){
  var laydate = layui.laydate;
  
  // 执行一个laydate实例
  laydate.render({
  	
  elem: '#time'
  ,type: 'year'

  });
});
 layui.use('form', function(){
		  var form = layui.form;
		  form.render('select'); // 刷新select选择框渲染
		  form.on('select(theme-select)', function(data){
		  
			  // console.log(data.value); //得到被选中的值
			  
			  threme = data.value;
			  
			  init();
	
			});      
		});
 function add(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e; } 
 function sub(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e; }
 function mul(a, b) { var c = 0, d = a.toString(), e = b.toString(); try { c += d.split(".")[1].length; } catch (f) {} try { c += e.split(".")[1].length; } catch (f) {} return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c); }
 function div(a, b) { var c, d, e = 0, f = 0; try { e = a.toString().split(".")[1].length; } catch (g) {} try { f = b.toString().split(".")[1].length; } catch (g) {} return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e)); }
