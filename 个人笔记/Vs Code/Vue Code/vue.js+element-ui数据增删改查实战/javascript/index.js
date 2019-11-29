var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            input: '',
            userInfo: { // 添加用户信息
                name: '',
                gender: '',
                phoneNum: '',
                birthday: ''
            },
            tableData: [{
                name: '风花雪月',
                gender: '女生',
                phoneNum: '18989844534',
                birthday: '2010-12-09'
            }],
            dialogVisible:false, // 弹窗的显示
            editObj:{
                name: '',
                gender: '',
                phoneNum: '',
                birthday: ''
            },
            userIndex:0,
        }
    },
    methods: {
        // 添加用户信息
        addUser() {
            if (!this.userInfo.name) {
                this.$message({
                    message: '请输入姓名',
                    type: 'warning'
                });
                return;
            }
            // 校验电话号码
            if (!/^1[3456789]\d{9}$/.test(this.userInfo.phoneNum)) {
                this.$message({
                    message: '请输入正确的电话号码',
                    type: 'warning'
                });
                return;
            }
            // 假设 此时 userInfo 指向堆内存 A
            // 这里的push是浅拷贝，刚push的userInfo指向堆内存 A push到table中的数据会跟着原userInfo一块变
            this.tableData.push(this.userInfo)
            // 这里对userInfo对象重新赋值，此时userInfo 指向一个新的堆内存，不再指向A，此时指向A的只有tableData刚push的userInfo
            this.userInfo = {
                name: '',
                gender: '',
                phoneNum: '',
                birthday: ''
            }
        },
        // 删除一组数据
        delUser(index) {
            // console.log(index)
            this.$confirm('确认删除？')
                .then(_ => {
                    this.tableData.splice(index, 1);
                })
                .catch(_ => { });
        },
        // 编辑数据
        editUser(item,idx){
            this.userIndex = idx;
            // console.log(item)
            this.editObj = {
                name: item.name,
                gender:item.gender,
                phoneNum:item.phoneNum,
                birthday:item.birthday
            }
            this.dialogVisible = true
        },
        handleClose(){
            this.dialogVisible = false
        },
        confirm(){
            this.dialogVisible = false
            /*
             * vue文档：https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9
             *   由于 JavaScript 的限制，Vue 不能检测以下数组的变动 (非响应式)：
             *     1. 当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
             *     2. 当你修改数组的长度时，例如：vm.items.length = newLength
             *   所以下面这行，M会被修改，但是V不会渲染
             */
            // this.tableData[this.userIndex] = this.editObj
            // 解决方法：看官网。下面都行。 this = vm
            Vue.set(this.tableData,this.userIndex,this.editObj) // 可以把 this 换成 vm
            // vm.tableData.splice(vm.userIndex, 1, vm.editObj)
            
        }
    }
})