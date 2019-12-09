<template>
  <div class="nr">
    <van-cell-group title="配置参数">
      <van-field v-model="a" label="中心频点" placeholder="请输入中心频点" />
      <van-field v-model="b" label="系统带宽" placeholder="请输入系统带宽" />
      <van-field v-model="c" label="子载波间隔" placeholder="请输入子载波间隔" />
      <van-field v-model="d" label="最大RB数" placeholder="请输入最大RB数" />
      <van-field v-model="e" label="offset to Carrier" placeholder="请输入offset to Carrier" />
      <van-field v-model="f" label="Coreset #0 RB数" placeholder="请输入Coreset #0 RB数" />
    </van-cell-group>

    <van-cell-group title="输出">
      <van-cell title="arfcnValueNr" :value="a*1000/5" />
      <van-cell title="系统最低频点" :value="computedG" />
      <van-cell title="最低SSB的N" :value="computedSSBN" />
      <van-cell title="最低SSB的GSCN" :value="computedGSCN" />
      <van-cell title="SSB中心频点H" :value="computedH" />
      <van-cell title="绝对频点point A" :value="computedPointA" />
      <van-cell title="OffsetToPointA" :value="computedOffsetToPointA" />
      <van-cell title="KSSB" :value="computedKSSB" />
      <van-cell title="SSB绝对频点" :value="computedSSBAbs" />
      <van-cell title="PointA绝对频点" :value="computedGSCN" />
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { Field, CellGroup, /* RadioGroup, Radio,  */ Cell } from "vant";

export default {
  name: "nr",
  components: {
    vanField: Field,
    vanCellGroup: CellGroup,
    // vanRadioGroup: RadioGroup,
    // vanRadio: Radio,
    vanCell: Cell
  },
  data() {
    return { ctype: 1, a: 2565, b: 100, c: 0.03, d: 273, e: 0, f: 48 };
  },
  computed: {
    computedM() {
      if (this.ctype == 1) {
        return 3;
      } else {
        return 1;
      }
    },
    computedG() {
      return this.a - (this.d * 12 * this.c) / 2;
    },
    computedSSBN() {
      let g = this.computedG;
      let m = this.computedM;
      window.console.info(this.e);
      if (this.f == 24) {
        return this.roundUp((g + 12 * 10 * this.c - g * 0.05) / 1.2);
      } else if (this.f == 48) {
        return this.roundUp(
          (g + 12 * 12 * this.c + 12 * 10 * this.c - m * 0.05) / 1.2
        );
      }
      return 0;
    },
    computedGSCN() {
      return 3 * this.computedSSBN;
    },
    computedH() {
      return this.computedSSBN * 1.2 + this.computedM * 0.05;
    },
    computedPointA() {
      return this.computedG - this.e * this.c * 12;
    },
    computedKSSB() {
      return (
        ((this.computedH - 12 * 10 * this.c - this.computedPointA) / 0.015) % 24
      );
    },
    computedOffsetToPointA() {
      return (
        (this.computedH -
          10 * 12 * this.c -
          this.computedKSSB * 0.015 -
          this.computedPointA) /
        (0.015 * 12)
      );
    },
    computedSSBAbs() {
      return this.computedH * 200;
    },
    computedPointAAbs() {
      return this.computedPointA * 200;
    }
  },
  methods: {
    roundUp(x) {
      if (x < 0) {
        return Math.floor(x);
      } else {
        return Math.floor(x) == x ? x : Math.floor(x) + 1;
      }
    }
  }
};
</script>
