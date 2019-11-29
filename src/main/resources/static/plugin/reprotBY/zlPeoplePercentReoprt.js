//特困人员相关报表
var threme = "wonderland";
var total=0;
var ziliren=0;
var banshineng=0;
var shineng=0;
var jizhong=0;
var fensan=0;

$().ready(function() {
	init1();
	init2();
	init3();
	init4();
	
	
});

function getWords(obj){
	console.log("this");
	var content="<span style='font-size:20px;'>"+$("#begin").val()+"全区共有特困人员 "+total+" 人，其中，自理人员占 "+(ziliren/total*100).toFixed(2)+" %半失能人员占  "+(banshineng/total*100).toFixed(2)+" % ，失能人员占 "+(shineng/total*100).toFixed(2)+" % ；集中供养人员占  "+(jizhong/total*100).toFixed(2)+" % ，分散供养人员占 "+(fensan/total*100).toFixed(2)+" % 。</span>";
	
	layer.tips(content, '#titleText', {
		  tips: [3, '#78BA32']
		});
	
}

function init1(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/zlPeoplePercentReoprt/data",
			    data: {begin:$("#begin").val(),end:$("#end").val()},
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
function init2(){
	 $.ajax({
	 			
			    type: "post",
			    url: "/zlMoneyPercentReoprt/data",
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
function init3(type){
	 $.ajax({
	 			
			    type: "post",
			    url: "/zlMenoyByAreaReoprt/data",
			    data: {begin:$("#begin").val(),type:type},
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

function init4(type){
	 $.ajax({
			
		    type: "post",
		    url: "/strandsPersonnelReport/data",
		    data: {begin:$("#begin").val()},
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
function initEcharts1(arr){
	var data1=[];
	var t=0;
	for(var i=0;i<arr.length;i++){
	     data1.push(arr[i].name);
	     t+=arr[i].value;
	     
	  }
	total=t;
	ziliren=arr[2].value;
	banshineng=arr[1].value;
	shineng=arr[0].value;
	var myChart1 = echarts.init(document.getElementById('main1'),"wonderland"); 
    	  myChart1.dispose();
          myChart1 = echarts.init(document.getElementById('main1'),threme);
	var	option1 = {
			    title : {
			        text: '自理，失能，半失能人数及占比',
			        subtext: '总人数：'+t+'人',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        x : 'left',
			        data: arr,
			    },
			    toolbox: {
	    	        show : true,
	    	        feature : {
	    	            mark : {show: true},
	    	            dataView : {show: true, readOnly: false},
	    	            magicType : {
	    	                show: true, 
	    	                type: ['pie', 'funnel']
	    	            },
	    	            restore : {show: true},
	    	            saveAsImage : {show: true}
	    	        }
	    	    },
			    calculable : true,
			    series : [
			        {
			            name: '人数',
			            type: 'pie',
			            radius : '70%',//可以设置成一个数组那样就是环形图数字小的是中间空白半径，大的是环形
			            center: ['50%', '60%'],
			            itemStyle : {
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
	    	            label: {
	                		normal: {
	                    		formatter: '{b}：{c} ( {d}% )',
	                    		}
	                    },
			            data:arr,
			            
			        }
			    ]
			};


myChart1.setOption(option1, true);
myChart1.on('click', function (params) {
	
   // init3(params.name);
      
      });
}
function initEcharts2(arr){
	var data1=[];
	var t=0;
	for(var i=0;i<arr.length;i++){
	     data1.push(arr[i].name);
	     t= add(t,arr[i].value);
	  }
	var myChart2 = echarts.init(document.getElementById('main2'),"wonderland"); 
    	  myChart2.dispose();
    	  myChart2 = echarts.init(document.getElementById('main2'),threme);
    	  	

    	  var	option2 = {
  			    title : {
  			        text: '自理，失能，半失能发放金额(万元)及占比',
  			        subtext: '合计发放金额'+(t/10000).toFixed(1)+'（万元）',
  			        x:'center'
  			    },
  			    tooltip : {
  			        trigger: 'item',
  			        formatter: "{a} <br/>{b} : {c} ({d}%)"
  			    },
  			    legend: {
  			        orient: 'vertical',
  			        left: 'left',
  			        data: ['失能','半失能','自理','生活类']
  			    },
  			  toolbox: {
      	        show : true,
      	        feature : {
      	            mark : {show: true},
      	            dataView : {show: true, readOnly: false},
      	            magicType : {
      	                show: true, 
      	                type: ['pie', 'funnel']
      	            },
      	            restore : {show: true},
      	            saveAsImage : {show: true}
      	        }
      	    },
  			  calculable : true,
  			    series : [
  			        {
  			            name: '金额',
  			            type: 'pie',
  			            radius : '70%',
  			            center: ['50%', '60%'],
  			            data:arr,
  			            label: {
	                		normal: {
	                    		formatter: '{b}：{c} ( {d}% )',
	                    		}
	                    },
	                    itemStyle : {
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
  			        }
  			    ]
  			};

	myChart2.setOption(option2);	
	myChart2.on('click', function (params) {
		
	   //init3(params.name);
	      
	      });
	
}


function initEcharts3(data){

		var xname=[];
		var peopleValue=[];
		var cashValue=[];
		var tPeople=0;
		var tCash=0.0;
	for(var i=0;i<data.length;i++){
		xname.push(data[i].name2);
		peopleValue.push(data[i].people);
		cashValue.push((data[i].money/10000).toFixed(1));
		tPeople+=parseInt(data[i].people);
		tCash=add(tCash,data[i].money);
	}
	var text = '总人数：'+tPeople+'人'+' 总金额：'+(tCash/10000).toFixed(1)+'万元';
	
	var myChart3 = echarts.init(document.getElementById('main3'),"wonderland"); 
    	  myChart3.dispose();
    	  myChart3 = echarts.init(document.getElementById('main3'),threme);
	

	var option3 = {
	 title: {
			        text: '各街道自理，失能，半失能人数及金额',
			        subtext: text
	 },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: ['人数','金额'],
	        //orient: 'vertical',
		    //right: 'right',
	        top: 50,
	    	
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
	    yAxis: [{
	    	 type: 'value',
	    	 name:'人数'
	    },
	    {
	    	 type: 'value',
	    	 name:'金额（万元）'
	    },
	    ],
	    series: [
	        {
	            name: '人数',
	            type: 'bar',
	           // barWidth:40,
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
	            //barWidth:40,
	            yAxisIndex:1,
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
	            data:cashValue
	        },
	    ],
	   
	};

	myChart3.setOption(option3);	
	
	
}


function initEcharts4(data){
	var  NAME=[];
	var amount=[];
	var famillynum=[];
	var fr=[];
	var jr=[];
	var fq=[];
	var jq=[];
	var sh=[];
	var tp=0;
	var money=0;
	var money1=0;
	if(data==''){
		return false;
	}else{
		//alert(data.length);
		for(var i=0;i<data.length;i++){
			NAME.push(data[i].name2);
			jizhong+=parseInt(data[i].jr);
			fensan+=parseInt(data[i].fr);
			fr.push(data[i].fr);
			jr.push(data[i].jr);
			fq.push((data[i].fq/10000).toFixed(1));
			jq.push((data[i].jq/10000).toFixed(1));
			sh.push((data[i].sh/10000).toFixed(1));
			tp+=parseInt(data[i].fr)+parseInt(data[i].jr);
			money+=parseInt(data[i].fq)+parseInt(data[i].jq);
			money1+=parseInt(data[i].sh)
		}
	}
	var text='总人数：'+tp+'人 总护理金额：'+(money/10000).toFixed(1)+'（万元）总生活费用：'+(money1/10000).toFixed(1)+'（万元）';
	var myChart4 = echarts.init(document.getElementById('main4'),"wonderland"); 
    	  myChart4.dispose();
          myChart4 = echarts.init(document.getElementById('main4'),threme);


var option4 = {
	title: {
		        text: '各街道特困人员救助人数，金额',
		        subtext: text,
	},	
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['分散人数','集中人数','分散金额','集中金额','生活救助资金'],
        //orient: 'vertical',
	    top: 50,
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
    	top:'27%',
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
    	
        type: 'category',
        data: NAME
    },
    yAxis:[
    	{
            type: 'value',
            name:'人数',	
            formatter:'{value}'		
        },
        {
            type: 'value',
            name:'金额(万元)',	
            formatter:'{value}'	
        }
    	
    ], 
    series: [
        
        {
            name: '分散人数',
            type: 'bar',
            //barWidth:10,
            yAxisIndex:0,
            stack:'人',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data: fr
        },
        {
            name: '集中人数',
            type: 'bar',
            //barWidth:10,
            yAxisIndex:0,
            stack:'人',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data: jr
        },
        
        {
            name: '分散金额',
            type: 'bar',
            //barWidth:10,
            yAxisIndex:1,
            stack:'钱',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data: fq
        },
        {
            name: '集中金额',
            type: 'bar',
            //barWidth:10,
            yAxisIndex:1,
            stack:'钱',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data: jq
        },
        {
            name: '生活救助金额',
            type: 'bar',
            //barWidth:10,
            yAxisIndex:1,
            stack:'生活',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data: sh
        },
        
    ]
};

myChart4.setOption(option4, true);
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
			  
			  	init1();
				init2();
				init3();
				init4();
	
			});      
		});
 
 
 layui.use('layer', function(){ //独立版的layer无需执行这一句
	  var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
	  
	  
	});
 
 
 
 function add(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e; } 
 function sub(a, b) { var c, d, e; try { c = a.toString().split(".")[1].length; } catch (f) { c = 0; } try { d = b.toString().split(".")[1].length; } catch (f) { d = 0; } return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e; }
 function mul(a, b) { var c = 0, d = a.toString(), e = b.toString(); try { c += d.split(".")[1].length; } catch (f) {} try { c += e.split(".")[1].length; } catch (f) {} return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c); }
 function div(a, b) { var c, d, e = 0, f = 0; try { e = a.toString().split(".")[1].length; } catch (g) {} try { f = b.toString().split(".")[1].length; } catch (g) {} return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e)); }
  