/**
 * 封装一个动态table的组件
 * table
 * tableIns
 * layTableId
 * Created by lan on 2019/1/13.
 */
function MyTable() {
    var oParent = null;
    //默认参数
    this._config = {
        table: null,//table对象
        tableIns: null,//table实例
        prefixCss: null,//包裹btn的Class前缀
        url: null,//保存的地址
        defaultNewRow:null//默认添加行
    }
}
MyTable.prototype.init = function (config) {
    this._config = config;
    this.bind();
};
MyTable.prototype.get = function (key) {
    return this._config[key];
};
MyTable.prototype.set = function (key, value) {
    this._config[key] = value;
};
MyTable.prototype.bind = function () {
    var That = this;
    var _table = That.get('table');
    That.tableIns = That.get('tableIns');
    var layTableId = That.tableIns.config.id;
    var prefix = That.get('prefixCss');
    //定义事件集合
    That.active = {
        addRow: function () {	//添加一行
            var newData=That.get('defaultNewRow')();
            if(newData && !newData.familyId){
                layer.msg("请先保存户主信息！", {icon: 5}); //提示
                return;
            }
            var oldData = _table.cache[layTableId];
            oldData.push(That.get('defaultNewRow')());
            That.tableIns.reload({
                data: oldData
            });
        },
        updateRow: function (obj) {
            var oldData = _table.cache[layTableId];
            for (var i = 0, row; i < oldData.length; i++) {
                row = oldData[i];
                if (row.id == obj.id) {
                    $.extend(oldData[i], obj);
                    return;
                }
            }
            That.tableIns.reload({
                data: oldData
            });
        },
        removeEmptyTableCache: function () {
            var oldData = _table.cache[layTableId];
            for (var i = 0, row; i < oldData.length; i++) {
                row = oldData[i];
                if (!row || !row.rowId) {
                    oldData.splice(i, 1);    //删除一项
                }
                continue;
            }
            That.tableIns.reload({
                data: oldData
            });
        },
        save: function () {
            if(!$('#rowId').val()){
                layer.msg("请先保存户主信息！", {icon: 5}); //提示
                return;
            }
            var oldData = _table.cache[layTableId];
            for (var i = 0, row; i < oldData.length; i++) {
                row = oldData[i];
                if(!row.familyId){
                    layer.msg("请先保存户主信息！", {icon: 5}); //提示
                    return;
                }
                if(row.amount && !/^\d+\.?\d{0,2}$/.test(row.amount)){
                    layer.msg("请输入合法的金额！", {icon: 5}); //提示
                    return;
                }
                if(row.propertyValue && !/^\d+\.?\d{0,2}$/.test(row.propertyValue)){
                    layer.msg("请输入合法的金额！", {icon: 5}); //提示
                    return;
                }
            }
            console.log(JSON.stringify(_table.cache[layTableId], null, 2));	//使用JSON.stringify() 格式化输出JSON字符串
            commonAjaxJson(That.get('url'),JSON.stringify(_table.cache[layTableId], null, 2),null,function (data) {
                layer.msg("保存成功!");
            });
        }
    };
    //注册按钮事件
    $('.'+prefix+' .layui-btn[data-type]').on('click', function () {
        var type = $(this).data('type');
        activeByType(type);
    });
    //监听工具条
    _table.on('tool(' + That.tableIns.config.elem[0].id + ')', function (obj) {
        var data = obj.data, event = obj.event, tr = obj.tr; //获得当前行 tr 的DOM对象;
        console.log(data);
        switch (event) {
            case "state":
                var stateVal = tr.find("input[name='state']").prop('checked') ? 1 : 0;
                $.extend(obj.data, {'state': stateVal});
                activeByType('updateRow', obj.data);	//更新行记录对象
                break;
            case "del":
                layer.confirm('真的删除行么？', function (index) {
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                    activeByType('removeEmptyTableCache');
                });
                break;
        }
    });

    function activeByType(type, arg) {
        var active = That.active;
        if (arguments.length === 2) {
            active[type] ? active[type].call(this, arg) : '';
        } else {
            active[type] ? active[type].call(this) : '';
        }
    }
};