<template>
  <div class="nr">
    <van-cell-group title="公共参数" class="settings">
<!--      <van-field v-model="b" type="number" label="系统带宽" placeholder="请输入系统带宽" />-->
      <van-field v-model="c" type="number" label="子载波间隔" placeholder="请输入子载波间隔" />
      <van-field v-model="d" type="number" label="最大RB数" placeholder="请输入最大RB数" />
      <van-field v-model="e" type="number" label="offsetToCarrier" placeholder="请输入offsetToCarrier" />
      <van-field v-model="f" type="number" label="Coreset #0 RB数" placeholder="请输入Coreset #0 RB数" />
    </van-cell-group>

    <van-cell-group title="配置参数" class="settings">
      <template #button>
        <van-button size="small" type="primary">Send SMS</van-button>
      </template>
      <van-field v-model="centerA" type="number" @focusin="focusIn" @focusout="focusout" label="中心频点" placeholder="请输入中心频点" />
      <van-field v-model="arfcnValueNr" @focusin="focusIn" @focusout="focusout" type="number" label="arfcnValueNr" placeholder="请输入arfcnValueNr" />
      <van-field v-model="pointA" @focusin="focusIn" @focusout="focusout" type="number" label="PointA" placeholder="请输入PointA" />
      <van-field v-model="pointAAbs" @focusin="focusIn" @focusout="focusout" type="number" label="PointA绝对频点" placeholder="请输入PointA绝对频点" />
      <div style="margin: 16px; text-align: center">
        <van-button round size="small" type="danger" @click="clearA" style="width: 45%">
          清除
        </van-button>
        &nbsp;
        <van-button round size="small" type="primary" @click="compute" style="width: 45%">
          计算
        </van-button>
      </div>
    </van-cell-group>

    <van-cell-group title="输出" class="settings">
      <van-cell title="中心频点" :value="computedA" />
      <van-cell title="arfcnValueNr" :value="computedArfcn" />
      <van-cell title="SSB中心频点H" :value="computedH" />
      <van-cell title="绝对频点point A" :value="computedPointA" />
      <van-cell title="SSB绝对频点" :value="computedSSBAbs" />
      <van-cell title="PointA绝对频点" :value="computedPointAAbs" />
    </van-cell-group>

    <van-cell-group title="互转" class="settings output-container">
      <van-field v-model="ssbCenterH" @focusin="focusInB" type="number" label="SSB中心频点H" placeholder="请输入SSB中心频点H" />
      <van-field v-model="ssbAbs" @focusin="focusInB" type="number" label="SSB绝对频点" placeholder="请输入SSB绝对频点" />
      <div style="margin: 16px 16px 50px;text-align: center">
        <van-button round size="small" type="danger" @click="clearB" style="width: 45%">
          清除
        </van-button>
        &nbsp;
        <van-button round size="small" type="primary" @click="computeB" style="width: 45%">
          计算
        </van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { Field, CellGroup, Cell, Button } from "vant";

export default {
  name: "nr",
  components: {
    vanField: Field,
    vanCellGroup: CellGroup,
    // vanRadioGroup: RadioGroup,
    // vanRadio: Radio,
    vanCell: Cell,
    vanButton: Button
  },
  data() {
    // centerA 是 a的输入值
    return { ctype: 1, a: 0/*2565*/, b: 100, c: 0.03, d: 273, e: 0, f: 48,
      arfcnValueNr: 0/*513000*/, centerA:0, pointA:0, pointAAbs: 0, ssbCenterH: 0, ssbAbs: 0,
      mark: 0};
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
    },
    computedA() {
      this.methodA();
      return (this.arfcnValueNr / 200);
    },
    computedArfcn() {
      // this.methodArfcnValueNr()
      return this.a*1000/5;
    }
  },
  methods: {
    roundUp(x) {
      if (x < 0) {
        return Math.floor(x);
      } else {
        return Math.floor(x) == x ? x : Math.floor(x) + 1;
      }
    },
    toFixed(x){
      return Number(x).toFixed(2);
    },
    methodArfcnValueNr() {
      this.arfcnValueNr = this.a * 1000 / 5
    },
    methodA() {
      this.a = this.arfcnValueNr / 200
    },
    focusIn(evt) {
      window.console.log(evt)
      evt.currentTarget.select();
    },
    focusout(evt) {
      window.console.log(evt)
    },
    clearA() {
      this.centerA = 0
      this.arfcnValueNr = 0
      this.pointA = 0
      this.pointAAbs = 0
    },
    compute() {
      window.console.log("计算")
      if(this.centerA != 0) {
        this.a = this.centerA
      }
    },
    focusInB(evt) {
      window.console.log(evt)
      evt.currentTarget.select();
    },
    clearB() {
      this.ssbAbs = 0
      this.ssbCenterH = 0
    },
    computeB() {
      window.console.log("计算")
      if(this.ssbCenterH != 0) {
        this.ssbAbs = 0
        if(this.ssbCenterH <= 3000) {
          this.ssbAbs = this.ssbCenterH * 200
        } else if (this.ssbCenterH > 3000) {
          this.ssbAbs = this.toFixed(600000 + (this.ssbCenterH - 3000) / 0.015)
        }
      } else {
        // this.ssbCenterH = 0
        if(this.ssbAbs <= 599999) {
          this.ssbCenterH = this.ssbAbs * 0.005
        } else if (this.ssbAbs > 599999) {
          this.ssbCenterH = this.toFixed((this.ssbAbs - 600000) * 0.015 + 3000)
        }
      }
    }
  }
};
</script>
<style>
.van-cell-group__title {
  background-color: #c8c9cc;
  color: #323233;
}
.output-container {
  margin-bottom: 50px;
}
.settings .van-field__label {
  width: 140px;
}
</style>