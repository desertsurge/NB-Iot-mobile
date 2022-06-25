<template>
  <div>
    <van-divider>Rust + Wasm</van-divider>
    <van-button type="success"
                icon="like-o"
                zise="mini"
                text="Hello, Rust + Wasm"
                @click="welcomeHandle"
                loading-text="loading..." />
  </div>
</template>

<script setup>
import wasm, { welcome, hello } from './../pkg/vue_vite_wasm_demo'
// console.log(wasm)
wasm().then(instance=>{
  // console.log(instance)
  hello('天問')
})
const welcomeHandle = ()=>{
  welcome('Tiven')
}

</script>
