<template>
  <div id="client">
    <el-row class="box">
      <el-col :span="6" class="list">
        <div class="item">客户</div>
      </el-col>
      <el-col :span="18" class="container">
        <div class="container_box">
          <div ref="msg_container" class="msg_list">
            <div class="item1">
              <div class="txt">说啥？xxxxx</div>
            </div>
            <div class="item2">
              <div class="txt">说啥？adadwadw</div>
            </div>
            <div v-for="item in msglist" :key="item.id" class="item2">
              <div class="txt">{{ item.data }}</div>
            </div>
          </div>
          <div class="msg_foot">
            <textarea
              v-model="msg"
              class="content"
              placeholder="请输入消息"
              @keyup.self.enter="msg_end"
            ></textarea>
            <div class="btn">
              <el-button :disabled="msg == ''" type="success" @click="send">
                发送
              </el-button>
            </div>
            <div v-if="!joined" class="mask">
              <el-button type="primary">加入</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'Client',
    data() {
      return {
        joined: true,
        msg: '',
        msglist: [],
      }
    },
    methods: {
      msg_end() {
        this.send()
      },
      send() {
        const val = this.msg
        if (!val) return
        this.msglist.push({
          id: Date.now(),
          uid: 'a',
          data: val,
        })
        this.msg = ''
        this.$nextTick(() => {
          this.$refs['msg_container'].scrollTop =
            this.$refs['msg_container'].scrollHeight
        })
      },
    },
  }
</script>
<style lang="scss">
  #client {
    position: relative;
    min-height: calc(100vh - 150px);

    .box {
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .list {
      padding: 10px;
      background: #eee;
      box-sizing: border-box;
      height: 100%;
    }
    .container {
      height: 100%;

      .msg_list {
        height: 75%;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 10px;
        background: #fafafa;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2) inset;
        .item1,
        .item2 {
          display: flex;
          margin-bottom: 10px;
        }
        .txt {
          display: inline-block;
          padding: 10px;
          background: rgb(60, 182, 4);
          color: #fff;
          border-radius: 10px;
          word-break: break-all;
        }
        .item1 {
          margin-right: 20px;
          justify-content: flex-start;
          .txt {
            border-bottom-left-radius: 0;
          }
        }
        .item2 {
          margin-left: 20px;
          justify-content: flex-end;
          .txt {
            border-bottom-right-radius: 0;
          }
        }
      }
      .msg_foot {
        height: 25%;
        position: relative;
        display: flex;
        justify-content: space-between;

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.4);
          text-align: center;
          padding-top: 30px;
        }
        .content {
          width: 100%;
          height: 100%;
          outline: none;
          border: none;
          padding: 10px;
          border-right: solid 1px #eee;
          box-sizing: border-box;
        }
        .btn {
          width: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .el-button {
            margin: 5px 0;
          }
        }
      }
    }
    .container_box {
      height: 100%;
      flex-direction: column;
    }
  }
</style>
