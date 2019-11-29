function getxiaoshu(num){
	return parseFloat(num/10000).toFixed(1); 
}
function init1(data){
	var data1=[];
	var totol=0;
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     totol+=data[i].value;
	  }
	myChart1 = echarts.init(document.getElementById('main1'),"walden"); 
	myChart1.dispose();
	myChart1 = echarts.init(document.getElementById('main1'),threme);
    // 指定图表的配置项和数据
    var option = {
    		title : {
    	        text: '各残疾类别救助人数占比情况',  	
    	        subtext:'共计'+totol+'人',
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
    	                type: ['pie', 'funnel'],
    	                option: {
    	                    funnel: {
    	                        x: '25%',
    	                        width: '50%',
    	                        funnelAlign: 'center',
    	                        max: 1548
    	                    }
    	                }
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
    	            radius : ['35%', '60%'],
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
    	            data:data
    	        }
    	    ]
    	};
    myChart1.on('click', function (params) {
    	$.ajax({
            type: "get",
            url: "/areareport/disabledleveldata",
            data: 	{beginDate:$("#beginDate").val(),endDate:$("#beginDate").val(),type:params.data.name},	          
            success: function(data){	
               init2(data,params.data.name);
            },
            error:function(data){
                 alert("加载失败！！");
            }
	     });   
    	jiedao(params.data.name,'','');
    	shequ(params.data.name,'','','');
	}); 
    myChart1.setOption(option);                    
}


function init2(data,name){
	myChart2 = echarts.init(document.getElementById('main2'),"walden"); 
	myChart2.dispose();
	myChart2 = echarts.init(document.getElementById('main2'),threme);
	 var totol=0;
	 var data1=[];
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     totol+=data[i].value;
	  }
    // 指定图表的配置项和数据
    var option = {
    	    title : {
    	        text: name+'等级救助人数占比情况',
    	        subtext:'共计'+totol+'人',
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
    	                type: ['pie', 'funnel'],
    	                option: {
    	                    funnel: {
    	                    
    	                        width: '60%',
    	                        funnelAlign: 'left',
    	                        max: 1548
    	                    }
    	                }
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
    	            center: ['50%', '50%'],label: {
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
    	                    
    myChart2.on('click', function (params) {
    	
    	jiedao(name,params.data.name);
    	shequ(name,params.data.name,'');
	}); 	                    

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option);
}
function init3(data,cate,level){
	var data1=[];
	var data2=[];
	var data3=[];
	var totol1=0;
	var totol2=0;
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     data2.push(data[i].value);
	     data3.push(getxiaoshu(data[i].value2));
	     totol1+=data[i].value;
	     totol2+=data[i].value2;
	}
	myChart3 = echarts.init(document.getElementById('main3'),"walden"); 
	myChart3.dispose();
	myChart3 = echarts.init(document.getElementById('main3'),threme);
	var option = {
            title: {
                text: '区域分布', subtext:'共计'+totol1+'人,'+getxiaoshu(totol2)+'万元',
            },
            tooltip: {},
            legend: {
            	x: 'right', data:['人数','金额']
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
    	    yAxis : [
 			        { type : 'value',
 				      name:'人数（人）\n\n',
 				      nameLocation:'center',
 			        },{
 			          type : 'value',
 				      name:'\n\n金额（万元）',
 				      nameLocation:'center',
 			        }
 		    ],
            series: [{
                name: '人数',
                type: 'bar',
                barMaxWidth:30,
                yAxisIndex: 0,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: data2
            },{
                name: '金额',
                type: 'bar',
                barMaxWidth:30,
                yAxisIndex: 1,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: data3
            }]
        };
	myChart3.on('click', function (params) {
    	shequ(cate,level,params.name);
	});  
	myChart3.setOption(option);                    
}
function init4(data,cate,level,jiedao){
	var data1=[];
	var data2=[];
	var data3=[];
	var totol1=0;
	var totol2=0;
	for(var i=0;i<data.length;i++){
	     data1.push(data[i].name);
	     data2.push(data[i].value);
	     data3.push(data[i].value2);
	     totol1+=data[i].value;
	     totol2+=data[i].value2;
	}
	var Zoomshow=false;
	var end=100;
	if(data.length>20&&data.length<=40){
	     end=30;
	     Zoomshow=true;
	  }else if(data.length>40&&data.length<=60){
	     end=20;
	     Zoomshow=true;
	  }else if(data.length>60&&data.length<=80){
	     end=15;
	     Zoomshow=true;
	  }else if(data.length>80&&data.length<=120){
	     end=10;
	     Zoomshow=true;
	  }else if(data.length>120){
		     end=4;
		     Zoomshow=true;
		  }
	myChart4 = echarts.init(document.getElementById('main4'),"walden"); 
	myChart4.dispose();
	myChart4 = echarts.init(document.getElementById('main4'),threme);
	var option = {
            title: {
                text: '社区分布', subtext:'共计'+totol1+'人,'+totol2+'元',
            },
            tooltip: {},
            legend: {
            	x: 'right', data:['人数','金额']
            },dataZoom: {
    	        show: Zoomshow,
    	        start : 0,
    	        end: end
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
    	    yAxis : [
    			        { type : 'value',
    				      name:'人数（人）\n\n',
    				      nameLocation:'center',
    			        },{
    			          type : 'value',
    				      name:'\n\n金额（元）',
    				      nameLocation:'center',
    			        }
    		],
            series: [{
                name: '人数',
                type: 'bar',
                barMaxWidth:30,
                yAxisIndex: 0,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: data2
            },{
                name: '金额',
                type: 'bar',
                barMaxWidth:30,
                yAxisIndex: 1,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: data3
            }]
        };
	myChart4.on('click', function (params) {
 
	});  
	myChart4.setOption(option);                    
}
