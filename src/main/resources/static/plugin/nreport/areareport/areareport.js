function getxiaoshu(num){
	return parseFloat(num/10000).toFixed(1); 
}
var myChart1;
function init1(data){
	var datastreet=data.street;
	var sumnum=data.sumnum[0];
	var data1=[];
	var data2=[];
	var data3=[];
	var data4=[];
	var data5=[];
	var data6=[];
	var data7=[];
	var total1=0;
	var total2=0;
	for(var i=0;i<datastreet.length;i++){
	     data1.push(datastreet[i].name);
	     data2.push(datastreet[i].value1);
	     data3.push(datastreet[i].value2);
	     data4.push(datastreet[i].value3);
	     data5.push(datastreet[i].value4);
	     data6.push(getxiaoshu(datastreet[i].valuejine1));
	     data7.push(getxiaoshu(datastreet[i].valuejine3));
	     total1+=datastreet[i].valuejine1;
	     total2+=datastreet[i].valuejine3;
	}
	var text='本月 非支出型户数：'+sumnum.num2+"，金额："+getxiaoshu(total1)+"万元";
	var text1='本月  支出型户数：'+sumnum.num1+",金额："+getxiaoshu(total2)+'万元';
	myChart1 = echarts.init(document.getElementById('main1'),"walden"); 
	myChart1.dispose();
	myChart1 = echarts.init(document.getElementById('main1'),threme);
    // 指定图表的配置项和数据
    var option = {
            title: {
                text: '低保户非支出型区域分布',subtext:text
            },
            tooltip: {},
            legend: {
            	x: 'right', data:['户数','金额']
            },
            xAxis: {
                data: data1,
                axisLabel: {
                    interval:0,
                    rotate:35
                 }
            },grid: {
    	        borderWidth: 0,
    	        y: 80,
    	        y2: 60,top: '30%', 
    	    },
    	    yAxis:[ {
		        type: 'value',
		        name:'户数 '
		        
		    },{
		          type : 'value',
				      name:'\n\n金额（万元）',
				      nameLocation:'center',
			        }],
            series: [{
                name: '户数',
                type: 'bar',
                barMaxWidth:30,
                yAxisIndex: 0,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: data2
            },{
                name: '金额',
                type: 'bar',
                yAxisIndex: 1,
                barMaxWidth:30,label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: data6
            }]
        };
    myChart1.on('click', function (params) {
   
		init4(params.name,'','否');
		init6(params.name,'否');
	});                    

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option);
    
    myChart2 = echarts.init(document.getElementById('main4'),"walden"); 
    myChart2.dispose();
	 myChart2 = echarts.init(document.getElementById('main4'),threme);
    // 指定图表的配置项和数据
    var option2 = {
            title: {
                text: '支出型区域分布',subtext:text1
            },
            tooltip: {},
            legend: {
            	x: 'right', data:['户数','金额']
            },
            xAxis: {
                data: data1,
                axisLabel: {
                    interval:0,
                    rotate:35
                 }
            },grid: {
    	        borderWidth: 0,
    	        y: 80,
    	        y2: 60,top: '30%', 
    	    },
    	    yAxis: [ {
		        type: 'value',
		        name:'户数 '
		        
		    },{
		          type : 'value',
				      name:'\n\n金额（万元）',
				      nameLocation:'center',
			        }],
            series: [{
                name: '户数',
                type: 'bar',barMaxWidth:30,label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }, yAxisIndex: 0,
                data: data4
            },{
                name: '金额',
                type: 'bar',barMaxWidth:30,label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }, yAxisIndex: 1,
                data: data7
            }]
        };
    myChart2.on('click', function (params) {
   
		init4(params.name,'','是');
		init6(params.name,'是');
	});                    

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
}

function init3(data,name){
	myChart3 = echarts.init(document.getElementById('main3'),"walden"); 
	myChart3.dispose();
	myChart3 = echarts.init(document.getElementById('main3'),threme);
	var data1=[];
	var data2=[];
	var data3=[];
	var data4=[];
	var b=0;
	var c=0;
	var total=0;
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name.replace('社区',''));
	     data2.push(data[i].value1);
	     data4.push(getxiaoshu(data[i].valuejine1));
	     c+=data[i].value1;
	     b+=data[i].value2;
	     total+=data[i].valuejine1;
	     data3.push(data[i].value2);
	}
	var text='本月共'+c+'户，共'+getxiaoshu(total)+'万元';
	var Zoomshow=false;
	var end=100;
	if(data.length>20&&data.length<=40){
	     end=25;
	     Zoomshow=true;
	  }else if(data.length>40&&data.length<=60){
	     end=17;
	     Zoomshow=true;
	  }else if(data.length>60&&data.length<=80){
	     end=13;
	     Zoomshow=true;
	  }else if(data.length>80&&data.length<=120){
	     end=10;
	     Zoomshow=true;
	  }else if(data.length>120){
		     end=4;
		     Zoomshow=true;
		  }
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '社区分布',subtext:text
        },
        tooltip: {},
        legend: {
        	 data:['户数','金额']
        },dataZoom: {
	        show: Zoomshow,
	        start : 0,
	        end: end
	    },toolbox: {
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
        xAxis: {
            data: data1,
            axisLabel: {
                interval:0,
                rotate:35
             }
        },yAxis: [ {
	        type: 'value',
	        name:'户数 '
	        
	    },{
	          type : 'value',
			      name:'\n\n金额（万元）',
			      nameLocation:'center',
		        }]
        ,grid: {
	        borderWidth: 0,
	        y: 80,
	        y2: 60,bottom: '26%', 
	    },
   
        series: [{
            name: '户数',
            type: 'bar',label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },yAxisIndex: 0,barMaxWidth:30,
            data: data2
        },{
            name: '金额',
            type: 'bar',label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },yAxisIndex: 1,barMaxWidth:30,
            data: data4
        }]
    };
   
	
    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option);
}
function init2(data){
	var myChart = echarts.init(document.getElementById('main2'),"walden"); 
    myChart.dispose();
	 myChart = echarts.init(document.getElementById('main2'),threme);
	var data1=[];
	var data2=[];
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	 
	}
    // 指定图表的配置项和数据
    var option = {
    	    title : {
    	        text: '低保人数区域分布',
    	        x:'center'
    	    },
    	    tooltip : {
    	        trigger: 'item',
    	        formatter: "{a} <br/>{b} : {c} ({d}%)"
    	    },
    	    legend: {
    	        x : 'center',
    	        y : 'bottom',
    	        data:data1
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
    	            name:'半径模式',
    	            type:'pie',
    	            radius : [20, 110],
    	            center : ['25%', 200],
    	            roseType : 'radius',
    	            width: '40%',       // for funnel
    	            max: 40,            // for funnel
    	            itemStyle : {
    	                normal : {
    	                    label : {
    	                        show : false
    	                    },
    	                    labelLine : {
    	                        show : false
    	                    }
    	                },
    	                emphasis : {
    	                    label : {
    	                        show : true
    	                    },
    	                    labelLine : {
    	                        show : true
    	                    }
    	                }
    	            },
    	            data:data
    	        },
    	        {
    	            name:'面积模式',
    	            type:'pie',
    	            radius : [30, 110],
    	            center : ['75%', 200],
    	            roseType : 'area',
    	            x: '50%',               // for funnel
    	            max: 40,                // for funnel
    	            sort : 'ascending',     // for funnel
    	            data:data
    	        }
    	    ]
    	};
    	                    

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
function init5(data,name){
		var data1=[];
		
		var total=0;
		for(var i=0;i<data.length;i++){
		     data1.push(data[i].name);
		     total+=data[i].value;
		}
		 myChart4 = echarts.init(document.getElementById('main2'),"walden"); 
		 myChart4.dispose();
		 myChart4 = echarts.init(document.getElementById('main2'),threme);
	    // 指定图表的配置项和数据
	    var option = {
	    	    title : {
	    	        text: name+'致贫原因分析', 
	    	        subtext:"合计："+total+'人',
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
	    	            name:'人数',
	    	            type:'pie',
	    	            radius : '55%',
	    	            center: ['66%', '60%'],label: {
	                		normal: {
	                    		formatter: '{b}：{c} ( {d}% )',
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
    	                },
	    	            data:data
	    	        }
	    	    ]
	    	};
	    myChart4.on('click', function (params) {
	    	
	    	yuanyin=params.data.name;
			//init4(name,params.data.name);
		});                    

	    // 使用刚指定的配置项和数据显示图表。
	    myChart4.setOption(option);
}
