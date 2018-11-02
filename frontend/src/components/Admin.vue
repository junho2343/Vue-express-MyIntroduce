<template>
  <div class="panel panel-default" v-if="type != 'success'">
    <div class="panel-heading">Admin Page</div>
    <div class="panel-body">
      <div class="form-group">
        <form action="" onsubmit="return false">
          <input type="password" class="form-control" placeholder="Password" v-model="password" autofocus>
          <button class="btn btn-primary form-control" @click="send">Send</button>
        </form>
        <p v-bind:class="type">비밀번호가 일치하지 않습니다.</p>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <!--  onsubmit="return false" -->
    <form @submit.prevent="save">
      <textarea class="form-control" name="data" rows="30">{{ profile }}</textarea>
      <button type="submit" class="btn btn-primary">저장하기</button>
      <button type="button" class="btn btn-primary" @click="download">다운로드</button>
      <router-link :to="'/'"><button class="btn btn-primary">돌아가기</button></router-link>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Admin',
  created () {
    this.$store.dispatch('setJsonData')
  },
  computed: {
    profile () {
      return JSON.stringify(this.$store.state.profile, null, 4)
    }
  },
  data: () => {
    return {
      password: '',
      real: 'junho',
      type: 'none'
      // data: JSON.stringify(json, null, 4)
    }
  },
  methods: {
    send: function () {
      if (this.password === this.real) {
        this.type = 'success'
      } else {
        this.type = 'error'
      }
    },
    save: function (event) {
      let data = JSON.parse(event.target.elements.data.value)

      this.$store.dispatch('saveJsonData', data)
    },
    download: function () {
      let href = 'data:text/json;utf-8,' + encodeURIComponent(JSON.parse(JSON.stringify(this.profile, null, 4)))
      let link = document.createElement('a')

      link.download = 'data.json'
      link.href = href

      link.click()
    }
  }
}

</script>
<style>
  #app {display: flex; align-items: center; justify-content: center;}
  button {margin-top:10px;}
  .none {display: none;}
  .error {color:red;display: block;}
  .container{height: 100%;}
  textarea::-webkit-scrollbar{width: 10px;}
  textarea::-webkit-scrollbar-thumb{background:gray;border-radius: 10px;}
</style>
