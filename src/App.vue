<template>
<el-container>
    <el-dialog title="Create New Student" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form :inline="true" :model="addstudent" class="demo-form-inline" size="mini">
            <el-divider content-position="left">basic information</el-divider>
            <el-form-item label="StudentNumber">
                <el-input v-model="addstudent.snumber" placeholder="StudentNumber" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="Class">
                <el-input v-model="addstudent.class" placeholder="Class" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="Name">
                <el-input v-model="addstudent.name" placeholder="Name" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="sex" prop="resource" style="margin-left:40px ; margin-right:40px">
                <el-radio-group v-model="addstudent.sex">
                    <el-radio label="Male"></el-radio>
                    <el-radio label="Female"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-divider content-position="left">grades</el-divider>
            <el-form-item label="C">
                <el-input v-model="addstudent.clan" placeholder="StudentNumber" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="JAVA">
                <el-input v-model="addstudent.jlan" placeholder="Class" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item label="DB">
                <el-input v-model="addstudent.dblan" placeholder="Name" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false" size="mini">Confrim</el-button>
        </span>
    </el-dialog>

    <el-header><i class="el-icon-edit">Student Management System</i></el-header>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="studentID">
            <el-input v-model="formInline.user" placeholder="find"></el-input>
        </el-form-item>
        <el-form-item label="name">
            <el-select v-model="formInline.region" placeholder="find2">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Search</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="dialogVisible = true"> Create</el-button>
        </el-form-item>
    </el-form>
    <el-main>
        <template>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="date" label="日期">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="province" label="省份">
                </el-table-column>
                <el-table-column prop="city" label="市区">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="zip" label="邮编">
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                        <el-button type="danger" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {

            addstudent: {
                snumber: '',
                class: '',
                name: '',
                sex: '',
                clan: '',
                jlan: '',
                dblan: ''

            },
            formInline: {
                user: '',
                region: ''
            },
            // tableData: [{
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     province: '上海',
            //     city: '普陀区',
            //     address: '上海市普陀区金沙江路 1518 弄',
            //     zip: 200333
            // }, {
            //     date: '2016-05-04',
            //     name: '王小虎',
            //     province: '上海',
            //     city: '普陀区',
            //     address: '上海市普陀区金沙江路 1517 弄',
            //     zip: 200333
            // }, {
            //     date: '2016-05-01',
            //     name: '王小虎',
            //     province: '上海',
            //     city: '普陀区',
            //     address: '上海市普陀区金沙江路 1519 弄',
            //     zip: 200333
            // }, {
            //     date: '2016-05-03',
            //     name: '王小虎',
            //     province: '上海',
            //     city: '普陀区',
            //     address: '上海市普陀区金沙江路 1516 弄',
            //     zip: 200333
            // }],

            studentList:[],
            dialogVisible: false

        }
    },
    methods: {
        //student sub page list
        
        onSubmit() {
            console.log('submit!');
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
