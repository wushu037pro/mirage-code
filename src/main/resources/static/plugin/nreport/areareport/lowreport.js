
function init1(data){
	var data1=[];
	var total=0;
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     total+=data[i].value;
	  }
	myChart1 = echarts.init(document.getElementById('main1'),"walden"); 
	myChart1.dispose();
	myChart1 = echarts.init(document.getElementById('main1'),threme);
    // 指定图表的配置项和数据
    var option = {
    	    title : {
    	        text: '致贫原因分析',  
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
    	            center: ['50%', '60%'],label: {
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
    myChart1.on('click', function (params) {
    	
    	yuanyin=params.data.name;
		init5(params.data.name);
		init4(params.data.name,''); 
	});                    

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option);
}

function init3(data){
	myChart2 = echarts.init(document.getElementById('main3'),"walden"); 
	myChart2.dispose();
	myChart2 = echarts.init(document.getElementById('main3'),threme);
	var data1=[];
	var data2=[];
	var total=0;

	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name.replace('社区',''));
	     data2.push(data[i].value1);
	     total+=data[i].value1;
	  }
	var Zoomshow=false;
	var end=100;
	if(data.length>20&&data.length<=40){
	     end=50;
	     Zoomshow=true;
	  }else if(data.length>40&&data.length<=60){
	     end=30;
	     Zoomshow=true;
	  }else if(data.length>60&&data.length<=80){
	     end=25;
	     Zoomshow=true;
	  }else if(data.length>80&&data.length<=120){
		     end=20;
		     Zoomshow=true;
	  }else if(data.length>120){
		     end=8;
		     Zoomshow=true;
		  }
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '社区分布',subtext:'共计：'+total+'人'
        },
        tooltip: {},
        legend: {
            data:['人数']
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
            data: data1,axisLabel:{
                interval:0,
                rotate:30,
                margin: 30,
                textStyle:{
                  align: 'center'
                },
            },
        },grid: {
	        borderWidth: 0,
	        y: 80,
	        y2: 60,bottom: '26%', 
	    },
	    yAxis: {
	        type: 'value',
	        name:'人数 '
      
	    },
        series: [{
            name: '人数',
            type: 'bar',barWidth : 25,label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data: data2
        }]
    };
   
	
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option);
}
function init2(data){
	myChart3 = echarts.init(document.getElementById('main2'),"walden"); 
	myChart3.dispose();
	myChart3 = echarts.init(document.getElementById('main2'),threme);
	var data1=[];
	var data2=[];
	var total=0;
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     total+=data[i].value;
	}
    // 指定图表的配置项和数据
    var option = {
    	    title : {
    	        text: '街道分布',
    	        subtext:'合计：'+total+'人',
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
    	            name:'面积模式',
    	            type:'pie',
    	            radius : [30, 110],
    	            center : ['50%', 200],
    	            roseType : 'area',
    	            x: '60%',               // for funnel
    	            max: 30,
	                emphasis : {
	                    label : {
	                        show : true,
	                        position : 'center',
	                        textStyle : {
	                            fontSize : '17',
	                            fontWeight : 'bold'
	                        }
	                    }
	                },                // for funnel
    	            sort : 'ascending',     // for funnel
    	            label: {
            		normal: {
                		formatter: '{b}：{c} ( {d}% )',
                		}
                },
    	            data:data
    	        }
    	    ]
    	};
    	                    
    myChart3.on('click', function (params) {  
		init4(yuanyin,params.data.name);
	});  
    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option);
}

