<template>
  <div class="create">
    <h1 class="title">创建投票</h1>
    <el-form :model="create" :rules="rules" ref="create" label-position="left" class="create-form">
      <el-form-item label="投票名称" prop="name">
        <el-input v-model="create.name" placeholder="请填写投票名称"></el-input>
      </el-form-item>
      <el-form-item label="投票类型" prop="type">
        <el-select v-model="create.type" placeholder="请选择投票类型">
          <el-option label="单选" value="single"></el-option>
          <el-option label="多选" value="muti"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" required>
        <el-form-item prop="startTime">
          <el-date-picker
            v-model="create.startTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="结束时间" required>
        <el-form-item prop="endTime">
          <el-date-picker
            v-model="create.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

      </el-form-item>
      <el-form-item label="是否公开" prop="pub">
        <el-switch v-model="create.pub"></el-switch>
      </el-form-item>
      <el-form-item
        v-for="(option, index) in create.options"
        :label="'选项' + (index + 1)"
        :key="option.key"
        :prop="'options.' + index + '.value'"
        :rules="{
      required: true, message: '选项数目不能为 0', trigger: 'blur'
    }"
      >
        <div class="options">
          <el-input class="option-item" v-model="option.value"></el-input>
          <el-button class="option-button" @click.prevent="removeOption(option)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('create')">立即创建</el-button>
        <el-button @click="addOption">新增选项</el-button>
        <el-button @click="resetForm('create')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        create: {
          name: '',
          type: '',
          startTime: '',
          endTime: '',
          pub: false,
//          type: [],
          resource: '',
          desc: '',
          options: [{
            value: ''
          }]
        },
        rules: {
          name: [
            {required: true, message: '请输入投票名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择投票类型', trigger: 'change'}
          ],
          startTime: [
            {type: 'date', required: true, message: '请选择开始时间', trigger: 'change'}
          ],
          endTime: [
            {type: 'date', required: true, message: '请选择结束时间', trigger: 'change'}
          ]
//          type: [
//            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
//          ],
//          resource: [
//            {required: true, message: '请选择活动资源', trigger: 'change'}
//          ],
//          desc: [
//            {required: true, message: '请填写活动形式', trigger: 'blur'}
//          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      removeOption (item) {
        let index = this.create.options.indexOf(item)
        if (index !== -1) {
          this.create.options.splice(index, 1)
        }
      },
      addOption () {
        this.create.options.push({
          value: '',
          key: Date.now()
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-input, .el-select {
    width 100%
  }

  .create {
    width 30%
    min-width 400px
    margin 0 auto
    .create-form {
      background-color #ffffff
      margin-top 30px
      padding 20px 50px
      border-radius 5px
      border 1px solid #d8dee2
      .options{
        width 100%
        clear: both;
        text-align left
        .option-item{
          width 78%
        }
        .option-button{
          padding-left 0
          padding-right 0
          width 20%
        }
      }
      .create-button {
        width 100%
      }
    }
  }

  @media screen and (max-width: 400px) {
    .el-picker-panel .el-date-picker .el-popper {
      width 100%
    }

    .create {
      min-width 300px
    }
  }
</style>
