<template>
<el-container>
    <transition name="el-zoom-in-top">
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" size="mini" v-show="dialogFormVisible" class="transition-box">
            <el-form :inline="true" :model="addstudent" class="demo-form-inline" size="mini">
                <el-divider content-position="left">基本信息：</el-divider>
                <el-form-item label="sid:" prop="snumber">
                    <el-input v-model="addstudent.snumber" placeholder="20200612xxx" :rules="[
            { required: true, message: '请输入有效学号', trigger: 'blur' },
            { type: 'number', message: '请输入正确的字符', trigger: 'blur,change' } ]">
                    </el-input>
                </el-form-item>
                <el-form-item label="class:">
                    <el-input v-model="addstudent.class" placeholder="软件工程3班"></el-input>
                </el-form-item>
                <el-form-item label="name:">
                    <el-input v-model="addstudent.name" placeholder="中华"></el-input>
                </el-form-item>
                <el-form-item label="sex:">
                    <el-radio-group v-model="addstudent.sex" style="margin-left:40px;margin-right:40px;">
                        <el-radio label="male"></el-radio>
                        <el-radio label="female"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-divider content-position="left">grades：</el-divider>
                <el-form-item label="c:">
                    <el-input v-model="addstudent.clan" placeholder="1-100" style="width:80px"></el-input>
                </el-form-item>
                <el-form-item label="java:">
                    <el-input v-model="addstudent.javalan" placeholder="1-100" style="width:80px"></el-input>
                </el-form-item>
                <el-form-item label="db:">
                    <el-input v-model="addstudent.dblan" placeholder="1-100" style="width:80px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close()" size="mini">cancel</el-button>
                <el-button type="success" @click="addAndUpdateStudent()" size="mini">comfrim</el-button>
            </div>
        </el-dialog>
    </transition>
    <el-header><i class="el-icon-edit" @click="fetch()">student management system</i></el-header>
    <el-form :inline="true" :model="xstudent" class="demo-form-inline" size="mini" ref="xstudent">
        <el-form-item label="sid" prop="snumber" :rules="[
            {min:3,max:3,message:'3digit', trigger: 'blur'}
          ]">
            <el-input v-model="xstudent.snumber" placeholder="findbyid"></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name" :rules="[
           {min:0,max:4,message:'', trigger: 'blur'},
         ]">
            <el-input v-model="xstudent.name" placeholder="find"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('xstudent')">find</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="add()">create</el-button>
        </el-form-item>
    </el-form>
    <el-main>
        <!-- 这里不要把所有的列的width都设置，要不然会出现空白的列，是由组件自动填充的 -->
        <el-table :data="studentList" border style="width: 100%;">
            <el-table-column fixed prop="snumber" label="sid" width="170" style="text-align:center;justify-content: center;">
            </el-table-column>
            <el-table-column prop="class" label="class">
            </el-table-column>
            <el-table-column prop="name" label="name">
            </el-table-column>
            <el-table-column prop="sex" label="sex">
            </el-table-column>
            <el-table-column prop="clan" label="c" :rules="[{min:0,max:3,message:'', trigger: 'blur'}]">
            </el-table-column>
            <el-table-column prop="javalan" label="java">
            </el-table-column>
            <el-table-column prop="dblan" label="db">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row._id)" type="primary" size="mini">EDIT</el-button>
                    <el-button @click="remove(scope.row._id)" type="danger" size="mini">delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div float="left" style="font-size:12px;color:info">there is {{page.total}} records</div>
        <div class="block" style='text-align:right;margin-top:10px'>
            <el-pagination @current-change="currentChange" layout="prev, pager, next" :page-size="page.size" :current-page="page.current" :total="page.total">
            </el-pagination>
        </div>
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            dialogTitle: '',
            dialogFormVisible: false,
            formLableWidth: '120px',

            studentList: [],

            xstudent: {
                snumber: '',
                name: ""
            },

            addstudent: {},

            //sub page
            page: {
                current: 1,
                size: 5,
                total: 0
            },

            rules: {
                name: [{
                    required: true,
                    message: 'name can not be empty',
                    trigger: 'blur'
                }]
            },
        }
    },
    created() {
        //this.fetch();
        this.pageInation();
    },
    methods: {
        //student list without sub page list
        fetch() {
            this.xstudent.name = '';
            this.page.current = 1;
            this.pageInation();
        },

        add() {
            this.dialogTitle = "Create";
            this.dialogFormVisible = true;
        },
        addStudent() {
            this.$http.post('student',this.addstudent).then(()=>{
                this.addstudent = {};

                this.dialogFormVisible = false;
                this.$message({
                    message:'success!',
                    type: 'success'
                });
            })
        },

        remove(id) {
            this.$http.delete(`student/${id}`).then(()=>{
                this.$message({
                    message: 'delete success!',
                    type: 'success'
                })
            });
        },

        edit(id) {
            this.id = id;
            this.dialogTitle = "editstudent";
            this.$http.get(`student/${id}`).then(res => {
                this.addstudent = res.data;
                this.dialogFormVisible = true;
            })
        },
        ConfirmUpdateStudent(id) {
            this.$http.put(`confirmUpdate/${id}`, this.addstudent).then(()=>{
                this.dialogFormVisible = false;
                this.$message({
                    message:'update success',
                    type: 'success'
                });
                this.addstudent={};
                this.pageInation();
            })
        },
        addAndUpdateStudent() {
            this.dialogFormVisible = false;
            if(this.dialogTitle == "Create"){
                this.addStudent();
            }else{
                this.ConfirmUpdateStudent(this.id)
            }

        },
        close() {
            if (this.dialogTitle == "editstudent"){
                this.addstudent = {};
            }
            this.dialogFormVisible = false;

        },

        onSubmit(ruleForm) {
            if (this.xstudent.snumber != '' && this.xstudent.name == ''){
                this.$refs[ruleForm].validate((valid)=>{
                    if (valid) {
                        this.$http.get(`findBySnumber/${this.xstudent.snumber}`).then(res => {
                            console.log('id search');
                            this.studentList = res.data;
                            this.xstudent.snumber = '';
                            this.page.total = 0;

                        })
                    }else{
                        this.message('3 dights','error');
                        return false;
                    }
                });
            }else if (this.xstudent.snumber == '' && this.xstudent.name != ''){
                this.$refs[ruleForm].validate((valid) => {
                    if(valid){
                        console.log('name search')
                        this.$http.get('findByName?currentPage='+this.page.current+'&pageSize=' + this.page.size +'&names=' + this.xstudent.name).then(res=>{
                            console.log('name search result:');
                            console.log(res.data);
                            this.studentList = res.data.data;
                            this.page.total = res.data.total;
                        })
                    }else{
                        this.message('do not input too bad','warning');
                        return false;
                    }
                });
            }else{
                if(this.xstudent.snumber == '' && this.xstudent.name == ''){
                    this.message('please enter the dight', 'error')
                    return;
                }
            }
        },


        message(messages, mtype) {
            this.$message({
                message: messages,
                type: mtype
            });
        },
        pageInation() {
            let that = this;
            //everyclick will change the page number
            this.$http.get('studentList?currentPage=' + that.page.current + '&pageSize=' + that.page.size).then(res => {
                if (res.data.data == null || res.data.data.length == 0) {
                    //all page is deleted expect the 1st page
                    that.page.current = that.page.current - 1;
                    that.pageInation();
                } else {
                    that.studentList = res.data.data;
                    that.page.total = res.data.total;
                }
            });
        },


        currentChange(current) {
            console.log(current);
            this.page.current = current;

            // query by name
            if (this.xstudent.name != '') {
                this.$http.get('findByName?currentPage=' + this.page.current + '&pageSize=' + this.page.size + '&names=' + this.xstudent.name).then(res => {
                    console.log('name search result');
                    console.log(res.data)
                    this.studentList = res.data.data;
                    this.page.total = res.data.total;
                });
                return;
            }
            this.pageInation();
        }
    }
}
</script>

<style>
.el-form {
    text-align: center;
    justify-content: center;
}

body {
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    margin-bottom: 10px;
}

/*.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }*/
</style>
