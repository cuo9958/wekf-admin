<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="user_name">
        <el-input v-model.trim="form.user_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          v-model.trim="form.pwd"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model.trim="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headimg">
        <my-upload v-model="form.headimg" />
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-radio-group v-model="form.role">
          <el-radio label="admin"></el-radio>
          <el-radio label="editor"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/userManagement'
  import MyUpload from '../../../../components/upload.vue'

  export default {
    name: 'UserManagementEdit',
    components: { MyUpload },
    data() {
      return {
        form: {
          user_name: '',
          pwd: '',
          nickname: '',
          role: '',
          headimg: '',
        },
        rules: {
          user_name: [
            { required: true, trigger: 'blur', message: '请输入用户名' },
          ],
          nickname: [
            { required: true, trigger: 'blur', message: '请输入邮箱' },
          ],
          role: [{ required: true, trigger: 'blur', message: '请选择权限' }],
        },
        title: '',
        dialogFormVisible: false,
        headers: {},
        uploading: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$emit('fetch-data')
            this.close()
          } else {
            return false
          }
        })
      },
      handleProgress() {
        this.uploading = true
      },
      handleSuccess() {
        console.log('成功')
      },
    },
  }
</script>
