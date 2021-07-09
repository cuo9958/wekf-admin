<template>
  <div id="client">
    <el-row class="box">
      <el-col :span="6" class="list">
        <div
          v-for="item in userlist"
          :key="item.uid"
          :class="curr_cid === item.cid ? 'item active' : 'item'"
          @click="selectUser(item)"
        >
          客户{{ item.uid }}
          <p v-if="item.msg !== ''">
            <small>{{ item.msg }}</small>
          </p>
        </div>
        <div class="item" @click="selectUser(12)">客户adw</div>
      </el-col>
      <el-col :span="18" class="container">
        <div class="container_box">
          <div ref="msg_container" class="msg_list">
            <div
              v-for="item in msglist"
              :key="item.id"
              :class="item.cid ? 'item1' : 'item2'"
            >
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
  import SocketIO from 'socket.io-client'

  export default {
    name: 'Client',
    data() {
      return {
        joined: true,
        msg: '',
        msglist: [],
        client: null,
        userlist: [],
        curr: null,
        curr_cid: '',
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        const client = new SocketIO('http://127.0.0.1:8082', {
          path: '/_img',
        })
        client.on('wait', this.wait.bind(this))
        client.on('talk', this.talk.bind(this))
        this.client = client
      },
      wait(cid, uid, pid) {
        this.userlist.push({
          cid,
          uid,
          pid,
          msg: '',
        })
      },
      talk(cid, msg) {
        console.log(cid, msg)
        //用户列表展示消息提示
        this.userlist.forEach((item) => {
          if (item.cid === cid) item.msg = msg.data
        })
        //加入消息列表
        this.msglist.push({
          cid: cid,
          type: msg.type,
          data: msg.data,
        })
      },
      selectUser(item) {
        this.curr = item
        this.curr_cid = item.cid
        this.getMsglist()
      },
      getMsglist() {
        this.msglist = []
      },
      msg_end() {
        this.send()
      },
      send() {
        const val = this.msg
        if (!val) return
        this.msglist.push({
          cid: '',
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
      background: #f3f3f3;
      box-sizing: border-box;
      height: 100%;

      .item {
        padding: 10px;
        border-bottom: solid 1px #ccc;
        background: #fff;
        font-size: 14px;
        color: #333;
        height: 30px;
        line-height: 20px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;

        p {
          margin: 0;
          padding: 0;
          padding-left: 10px;
          color: #aaa;
        }
        &:hover {
          background: #f3f3f3;
        }
      }
      .active {
        background: #efefef;
      }
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
