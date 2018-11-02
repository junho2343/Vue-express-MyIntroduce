<template>
  <div class="container" v-if="Object.keys(profile).length">
    <canvas id="fire"></canvas>
    <div class="row first">
      <button class="btn btn-light" @click="lang = 'kr'" v-html="profile.profile[lang].korean" />
      <button class="btn btn-light" @click="lang = 'en'" v-html="profile.profile[lang].english" />
      <router-link :to="'/admin'"><button class="btn btn-light" v-html="profile.profile[lang].admin" /></router-link>
    </div>
    <div class="row">
      <h2 class="page-header">{{ profile.profile[lang].name.toUpperCase() }} <small>{{ profile.profile[lang].job }}</small></h2>
    </div>
    <div class="row">
      <h3 class="page-header">{{ profile.profile[lang].title.profile }}</h3>
      <p><strong>{{ profile.profile[lang].title.name }}</strong> {{ profile.profile[lang].name }}</p>
      <p><strong>{{ profile.profile[lang].title.age }}</strong> {{ getDate() }}</p>
      <p><strong>{{ profile.profile[lang].title.birthday }}</strong> {{ profile.profile[lang].birthday }}</p>
      <p><strong>{{ profile.profile[lang].title.address }}</strong> {{ profile.profile[lang].address }}</p>
      <p><strong>{{ profile.profile[lang].title.github }}</strong> <router-link  :to="'/github'">{{ profile.profile.github }}</router-link> </p>
      <ul v-for="(data, key) in profile.profile[lang].profile" :key="key">
        <p><strong>{{ profile.profile[lang].title[key] }}</strong></p>
        <li v-for="(val, idx) in data" :key="idx">{{ val }}</li>
      </ul>
    </div>
    <div class="row">
      <h3 class="page-header">{{ profile.profile[lang].title.career }}</h3>
      <ul v-for="(data, key) in profile.profile[lang].curriculum" :key="key">
        <h4>{{ key }}</h4>
        <li v-for="(val, idx) in data" :key="idx">{{ val }}</li>
      </ul>
    </div>
    <div class="row page-footer blue">
      <p>Copyright 2018. JUNHO MUN. All rights reserved. </p>
    </div>
</div>
<div v-else>데이터 가져오는중</div>
</template>
<script>
class App {
  resize () {
    let height = document.body.clientHeight
    let width = document.body.clientWidth
    this.canvas.width = width
    this.canvas.height = height
  }
  start () {
    this.fireSet()
  }
  stop () {
  }
}

class Fire extends App {
  constructor () {
    super()

    this.canvas = document.getElementById('fire')
    this.c = this.canvas.getContext('2d')

    this.resize()
    window.onresize = () => {
      this.resize()
    }

    this.width = this.canvas.width
    this.height = this.canvas.height

    // 터지는 불꽃 수
    this.max = 100

    // 불꽃 크기
    this.size = 100

    // 불꽃 딜레이

    this.fireDelay = 700
    // 예외처리
  }
  async fireSet () {
    while (true) {
      // 불꽃 크기
      const size = Math.random() * this.size + 50

      // 불꽃터지는 count
      const count = 0

      // x, z
      const x = Math.random() * this.width - size
      const y = Math.random() * this.height - size

      // 터지는 불꽃 방향, 거리, 색깔, 굵기
      let direction = []
      let spread = []
      let color = []
      let width = []

      for (let i = 0; i < this.max; i++) {
        direction.push(Math.random() * 360)
        spread.push(Math.random() * size)
        color.push(`hsla( ${Math.random() * 360}, ${Math.random() * 100}%, 75% , 0.7 )`)
        width.push(Math.random() * 3)
      }

      // 불꽃놀이 사라지는 거리
      const remove = Math.random() * 50

      // 불꽃놀이간 딜레이
      const time = Math.random() * this.fireDelay

      // to array
      const arr = {
        size: size,
        count: count,
        x: x,
        y: y,
        direction: direction,
        spread: spread,
        color: color,
        remove: remove,
        width: width
      }

      // start
      await this.delay(this.animation(arr), time)
    }
  }
  delay (fn, time) {
    return new Promise(resolve => {
      setTimeout(() => { resolve(fn) }, time)
    })
  }
  animation (data) {
    // fire
    for (let i = 0; i < this.max; i++) {
      // 거리 값
      let temp

      if (data.spread[i] > data.count) {
        temp = data.count
      } else {
        temp = data.spread[i]
      }

      // 거리 값에서 삭제될 거리
      let remove = (temp - (data.size - data.count) / 2) < 0 ? 0 : (temp - (data.size - data.count) / 2)

      this.c.save()
      this.c.beginPath()

      // add
      this.c.strokeStyle = data.color[i]
      this.c.lineWidth = data.width[i]
      this.c.lineCap = 'round'
      this.c.translate(data.x, data.y)

      this.c.rotate(data.direction[i] * Math.PI / 180)

      this.c.moveTo(0, 0)
      this.c.lineTo(temp, 0)
      this.c.stroke()

      // delete
      this.c.beginPath()
      this.c.strokeStyle = 'white'
      this.c.lineWidth = 4
      this.c.globalCompositeOperation = 'destination-out'
      this.c.moveTo(0, 0)
      this.c.lineTo(remove, 0)
      this.c.stroke()

      if (data.count >= data.size) {
        this.c.lineTo(temp < 0 ? 0 : temp, 0)
        this.c.stroke()
      }

      this.c.globalCompositeOperation = 'source-over'
      this.c.restore()
    }
    // stop
    if (data.count >= data.size) {
      return false
    }
    let remove = data.size / 150
    data.remove = data.remove - remove <= 0 ? 0 : data.remove - remove
    data.count += 2

    window.requestAnimationFrame(() => { this.animation(data) })
  }
}

// 주소영문변환 url
// http://www.epost.go.kr/search.RetrieveIntegrationNewZipCdList.comm
export default {
  name: 'Index',
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  created () {
    this.$store.dispatch('setJsonData')
  },
  data () {
    return {
      lang: 'en'
    }
  },
  methods: {
    getDate: () => {
      let date = new Date()
      return ((date.getFullYear() + 1) + '').substring(2, 4)
    }
  },
  mounted () {
    // const fire = new Fire()
    // fire.stop()
  }
}
</script>
<style lang="scss" src="@/assets/common.scss"></style>
