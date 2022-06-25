<template>
    <van-tabs v-model:active="active">
        <van-tab title="组件A">
            <van-divider>setup组件A</van-divider>
            <p>data: [{{a}}]</p>
            <p>
                方法:
                <van-button type="success" size="small" @click="logA">logA</van-button>
            </p>
        </van-tab>
        <van-tab title="组件B">
            <van-divider>setup组件B</van-divider>
            <p>data: [{{b}}]</p>
            <p>
                方法:
                <van-button type="danger" size="small" @click="logB">logB</van-button>
            </p>
        </van-tab>
        <van-tab title="组件C">
            <van-divider>setup组件C</van-divider>
            <p>data: [{{c}}]</p>
            <p>
                方法:
                <van-button type="warning" size="small" @click="logC">logC</van-button>
            </p>
        </van-tab>
    </van-tabs>
</template>

<script setup>
    import { ref } from 'vue'

    import useA from './../components/comA.js'
    import useB from './../components/comB.js'
    import useC from './../components/comC.js'

    let active = ref(0)

    let { a, logA } = useA()
    let { b, logB } = useB()
    let { c, logC } = useC()

</script>

<style scoped>
    p {
        line-height: 1.8;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>