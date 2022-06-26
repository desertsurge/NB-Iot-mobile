<template>
  <div class="nr">

    <page-header backUrl="grid" title="SSB互转"></page-header>

    <van-cell-group class="settings output-container">
      <van-field v-model="ssbCenterH" @focus="focusInB($event)" type="number" label="SSB中心频点H" placeholder="请输入SSB中心频点H"/>
      <van-field v-model="ssbAbs" @focus="focusInB($event)" type="number" label="SSB绝对频点" placeholder="请输入SSB绝对频点"/>
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

<script lang="ts">
// @ is an alias to /src
import {Field, CellGroup, Button} from "vant";
import PageHeader from "../components/PageHeader.vue";

export default {
  name: "nr",
  components: {
    vanField: Field,
    vanCellGroup: CellGroup,
    // vanRadioGroup: RadioGroup,
    // vanRadio: Radio,
    // vanCell: Cell,
    vanButton: Button,
    PageHeader
  },
  data() {
    // pCenterA 是 a的输入值
    return {
      ctype: 1, a: 0/*2565*/, b: 100, c: 0.03, d: 273, e: 0, f: 48,
      arfcnValueNr: 0/*513000*/, pArfcnValueNr: 0, pCenterA: 0, pPointA: 0, pPointAAbs: 0, ssbCenterH: 0, ssbAbs: 0,
      mark: 0
    };
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
      console.log('computeA')
      this.methodA();
      return (this.arfcnValueNr / 200);
    },
    computedArfcn() {
      // this.methodArfcnValueNr()
      return this.a * 1000 / 5;
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
    toFixed(x) {
      return Number(x).toFixed(2);
    },
    methodArfcnValueNr() {
      this.arfcnValueNr = this.a * 1000 / 5
    },
    methodA() {
      this.a = this.arfcnValueNr / 200
    },
    focusIn(evt) {
      (evt.currentTarget || evt.relatedTarget).select();
    },
    clearA() {
      this.pCenterA = 0
      this.pArfcnValueNr = 0
      this.pPointA = 0
      this.pPointAAbs = 0
    },
    compute() {
      console.log("计算")
      if (this.pCenterA != 0) {
        console.log('计算pCenterA')
        if (this.pCenterA < 3000) {
          this.a = this.pCenterA
          this.arfcnValueNr = this.pCenterA * 200
        } else {
          console.log('大于')
        }
      } else if (this.pArfcnValueNr != 0) {
        console.log('计算arfcnValueNr')
        if (this.pArfcnValueNr < 600000) {
          this.arfcnValueNr = this.pArfcnValueNr
        } else {
          console.log('大于')

        }
      } else if (this.pPointA != 0) {
        console.log('计算pPointA')
        if (this.pPointA < 3000) {
          this.a = this.pPointA
          this.arfcnValueNr = this.pPointA * 200
        } else {
          console.log('大于')

        }
      } else if (this.pPointAAbs != 0) {
        console.log('计算pPointAAbs')
        if (this.pPointAAbs < 600000) {
          this.a = this.pPointAAbs * 0.005;
        } else {
          console.log('大于')
          this.a = this.pPointAAbs - 600000 * 0.015 + 3000;
        }
      }
    },
    focusInB(evt) {
      // console.log(evt)
      // console.log(arguments);
      (evt.currentTarget || evt.relatedTarget).select();
    },
    clearB() {
      this.ssbAbs = 0
      this.ssbCenterH = 0
    },
    computeB() {
      console.log("计算")
      if (this.ssbCenterH != 0) {
        this.ssbAbs = 0
        if (this.ssbCenterH <= 3000) {
          console.log(this.ssbCenterH)
          this.ssbAbs = this.toFixed(this.ssbCenterH * 200)
          console.log(this.ssbAbs)
        } else if (this.ssbCenterH > 3000) {
          this.ssbAbs = this.toFixed(600000 + (this.ssbCenterH - 3000) / 0.015)
        }
      } else {
        // this.ssbCenterH = 0
        if (this.ssbAbs <= 599999) {
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
