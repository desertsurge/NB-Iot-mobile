<template>
  <div class="nr">
    <van-cell-group title="配置参数" class="settings">
      <van-field v-model="a" type="number" label="中心频点" placeholder="请输入中心频点" />
      <van-field v-model="b" type="number" label="系统带宽" placeholder="请输入系统带宽" />
      <van-field v-model="c" type="number" label="子载波间隔" placeholder="请输入子载波间隔" />
      <van-field v-model="d" type="number" label="最大RB数" placeholder="请输入最大RB数" />
      <van-field
        v-model="e"
        type="number"
        label="offsetToCarrier"
        placeholder="请输入offsetToCarrier"
      />
      <van-field v-model="f" type="number" label="Coreset #0 RB数" placeholder="请输入Coreset #0 RB数" />
    </van-cell-group>

    <van-cell-group title="输出" class="output-container">
      <van-cell title="arfcnValueNr" :value="a*1000/5" />
      <van-cell title="系统最低频点" :value="computedG" />
      <van-cell title="最低频SSB的N" :value="computedSSBN" />
      <van-cell title="最低频SSB的GSCN" :value="computedGSCN" />
      <van-cell title="SSB中心频点H" :value="computedH" />
      <van-cell title="绝对频点point A" :value="computedPointA" />
      <van-cell title="OffsetToPointA" :value="computedOffsetToPointA" />
      <van-cell title="KSSB" :value="computedKSSB" />
      <van-cell title="SSB绝对频点" :value="computedSSBAbs" />
      <van-cell title="PointA绝对频点" :value="computedPointAAbs" />
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
      let n = this.a - (this.d * 12 * this.c) / 2;
      return Number(n.toFixed(2));
    },
    computedSSBN() {
      let g = this.computedG;
      let m = this.computedM;
      if (this.f == 24) {
        return this.roundUp((g + 12 * 10 * this.c - m * 0.05) / 1.2);
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
      return Number((this.computedSSBN * 1.2 + this.computedM * 0.05).toFixed(2));
    },
    computedPointA() {
      return this.computedG - this.e * this.c * 12;
    },
    computedKSSB() {
      return Math.round(
        ((this.computedH - 12 * 10 * this.c - this.computedPointA) / 0.015) % 24
      );
    },
    computedOffsetToPointA() {
      return Math.round(
        (this.computedH -
          10 * 12 * this.c -
          this.computedKSSB * 0.015 -
          this.computedPointA) /
          (0.015 * 12)
      );
    },
    computedSSBAbs() {
      return Math.round(this.computedH * 200);
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
<style>
.output-container {
  margin-bottom: 50px;
}
.settings .van-field__label {
  width: 140px;
}
</style>