(function ($) {
    $.fn.disable = function (exclude) {
        return $(this).find("*").each(function () {
            if($(this).attr('id')!=exclude){
                $(this).attr("disabled", "disabled");
            }
        });
    };
    $.fn.myDigit = function (num, length, end) {
        var str = '';
        num = String(num);
        length = length || 2;
        for (var i = num.length; i < length; i++) {
            str += '0';
        }
        return num < Math.pow(10, length) ? str + (num | 0) : num;
    };
    $.fn.myToDateString = function (d, format) {
        var date = new Date(d || new Date())
            , ymd = [
            $.digit(date.getFullYear(), 4)
            , $.digit(date.getMonth() + 1)
            , $.digit(date.getDate())
        ]
            , hms = [
            $.digit(date.getHours())
            , $.digit(date.getMinutes())
            , $.digit(date.getSeconds())
        ];

        format = format || 'yyyy-MM-dd HH:mm:ss';

        return format.replace(/yyyy/g, ymd[0])
            .replace(/MM/g, ymd[1])
            .replace(/dd/g, ymd[2])
            .replace(/HH/g, hms[0])
            .replace(/mm/g, hms[1])
            .replace(/ss/g, hms[2]);
    };
})(jQuery);
//准备视图对象
window.viewObj = {
    tbData: [{
        rowId: new Date().valueOf(),
        name:'小倩',
        disability: 1,
        health: 1,
        laborAbility: 1,
        educational: 1,
        employment: 1,
        relationship: 1,
        income: 1300
    }],
    disabilityCategories: [
        {id: 0, name: '无'},
        {id: 1, name: '精神'},
        {id: 2, name: '智力'},
        {id: 3, name: '身体'}
    ],
    health: [
        {id: 1, name: '健康'},
        {id: 2, name: '疾病'}
    ],
    laborCapacity: [
        {id: 1, name: '正常'},
        {id: 2, name: '丧失'}
    ],
    educationDegree: [
        {id: 1, name: '文盲'},
        {id: 2, name: '幼儿园'},
        {id: 3, name: '小学'},
        {id: 4, name: '初中'},
        {id: 5, name: '高中'},
        {id: 6, name: '大学'},
        {id: 7, name: '硕士'},
        {id: 8, name: '博士'}
    ],
    employmentSituation: [
        {id: 1, name: '就业'},
        {id: 2, name: '无业'}
    ],
    relationship: [
        {id: 1, name: '母子关系'},
        {id: 2, name: '父子关系'},
        {id: 3, name: '本人'},
        {id: 4, name: '母女关系'},
        {id: 5, name: '父女关系'}
    ],
    renderSelectOptions: function(data, settings){
        settings =  settings || {};
        var valueField = settings.valueField || 'value',
            textField = settings.textField || 'text',
            selectedValue = settings.selectedValue || "";
        var html = [];
        for(var i=0, item; i < data.length; i++){
            item = data[i];
            html.push('<option value="');
            html.push(item[valueField]);
            html.push('"');
            if(selectedValue && item[valueField] == selectedValue ){
                html.push(' selected="selected"');
            }
            html.push('>');
            html.push(item[textField]);
            html.push('</option>');
        }
        return html.join('');
    },
    default:function (id,d) {
        var options = viewObj.renderSelectOptions(viewObj[id], {
            valueField: "id",
            textField: "name",
            selectedValue: d[id]
        });
        return '<select name="'+'tb_select_'+id+'" lay-filter="'+'plug_select'+'"><option value="">请选择分类</option>' + options + '</select>';
    }
};

//通用
function popup(title, url, w, h,id) {
  if (title == null || title == '') {
    title = false;
  }
  if (url == null || url == '') {
    url = "error/404";
  }
  if (w == null || w == '') {
    w = ($(window).width() * 0.9);
  }
  if (h == null || h == '') {
    h = ($(window).height() - 50);
  }
  layer.open({
    id: id,
    type: 2,
    area: [w + 'px', h + 'px'],
    fix: false,
    maxmin: true,
    shadeClose: true,
    shade: 0.4,
    title: title,
    content: url
  });
}

/**
 * 父窗口弹出
 * @param url
 * @param data
 * @param tableId
 */
function postAjaxre(url,data,tableId){
  $.ajax({
    url: url,
    type: "post",
    data:data,
    dataType: "json", traditional: true,
    success: function (data) {
      if(data.flag){
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
        window.parent.layui.table.reload(tableId);
        window.top.layer.msg(data.msg,{icon:6,offset: 'rb',area:['120px','80px'],anim:2});
      }else{
        layer.msg(data.msg,{icon:5,offset: 'rb',area:['120px','80px'],anim:2});
      }
    }
  });
}

function layerAjax(url,data,tableId){
  var indexLoad;
  $.ajax({
    url:url,
    type:'post',
    data:data,
    traditional: true,
    beforeSend: function () {
      // 防止重复提交
      indexLoad=layer.load(0, { shade: [0.3, '#333'] })
    },
    success:function(d){
      indexLoad && layer.close(indexLoad);
      var index = parent.layer.getFrameIndex(window.name);
      if(d.flag){
        parent.layer.close(index);
        window.parent.layui.table.reload(tableId);
        window.top.layer.msg(d.msg,{icon:6,offset: 'rb',area:['200px','80px'],anim:2});
      }else{
        layer.msg(d.msg,{icon:5});
      }
    },error:function(e){
      indexLoad && layer.close(indexLoad);
      layer.alert("发生错误", {icon: 6},function () {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
      });
    }
  });
}

function commonAjaxJson(url,data,tableId,callBack){
    var index;
    $.ajax({
        url:url,
        type:'post',
        data:data,
        contentType:"application/json",
        traditional: true,
        beforeSend: function () {
            // 防止重复提交
            index=layer.load(0, { shade: [0.3, '#333'] })
        },
        success:function(d){
            index && layer.close(index);
            if(d.flag) {
                layer.msg(d.msg,{icon:6});
            }else{
                layer.msg(d.msg,{icon:5});
            }
            if(callBack && d.data){
                callBack(d.data);
            }
            if(tableId) {
                layui.table.reload(tableId);
            }
        },
        error:function(e){
            index && layer.close(index);
            layer.msg('发生错误',{icon:5});
        }
    });
}

function commonAjax(url,data,tableId,callBack){
  var index;
  $.ajax({
    url:url,
    type:'post',
    data:data,
    traditional: true,
    beforeSend: function () {
      // 防止重复提交
      index=layer.load(0, { shade: [0.3, '#333'] })
    },
    success:function(d){
      index && layer.close(index);
      if(d.flag) {
        layer.msg(d.msg,{icon:6});
      }else{
        layer.msg(d.msg,{icon:5});
      }
      if(callBack){
          callBack(d.data);
      }
      if(tableId) {
          layui.table.reload(tableId);
      }
    },
    error:function(e){
      index && layer.close(index);
      layer.msg('发生错误',{icon:5});
    }
  });
}

function eleClick(active,ele){
  $(ele).on('click', function () {
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
  });
}

function toolDelByFlag(id,list, flag) {
  var data={id:id};
  if(flag!=null){
    data.flag=flag;
  }
    $.ajax({
        url:"del",
        type:"post",
        data:data,
        success:function(d){
            if(d.flag){
                window.top.layer.msg(d.msg,{icon:6,offset: 'rb',area:['120px','80px'],anim:2});
                layui.table.reload(list);
            }else{
                window.top.layer.msg(d.msg,{icon:5,offset: 'rb',area:['120px','80px'],anim:2});
            }
        },error:function(){
            alert('error');
        }
    });
}
function toolDel(id, list) {
    toolDelByFlag(id,list,null);
}

function reCount() {
    var sumamount=+($('#szgk-sumamount').val() || '0').replace(',','');
    var homeout=+($('#szgk-homeout').val() || '0').replace(',','');
    var homesum=+($('#szgk-homesum').val() || '0').replace(',','');
    if(homesum && homesum!='0'){
        console.log(sumamount+"-"+homeout+"-"+homesum);
        $('#szgk-avgamount').val(((sumamount-homeout)/homesum).toFixed(2));
    }
}

