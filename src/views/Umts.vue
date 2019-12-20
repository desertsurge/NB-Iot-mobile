<template>
  <div class="wrapper">
    <div class="main" :style="{height: scrollHeight + 'px'}">
      <div class="band-ctt">
        <div
          v-for="(band, idx) in bands"
          @click="bandClick(band)"
          :class="['band-item',selectedBand == band?'active':'']"
          :key="idx"
          :style="{height: itemHeight + 'px', lineHeight: itemHeight + 'px'}"
        >
          <div class="band-name">Band {{band}}</div>
          <div v-if="selectedBand == band" class="icon-right"></div>
        </div>
      </div>
      <div class="main-ctt">
        <div class="label">频段：Band {{selectedBand}}</div>
        <input class="input" type="number" v-model="value" placeholder="实际频点值" />
        <div class="alert information">范围：（{{role.low}} - {{role.high}}） OFF:{{role.off}}</div>
        <div v-if="showAlert" class="alert danger">
          <div>输入数值必须在范围之内：</div>
          <div>（{{role.low}} - {{role.high}}）</div>
        </div>
        <div class="result-ctt">
          <div class="result-title">ARFCN</div>
          <div v-if="result" class="result-body">{{result}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import text from '@/components/text.vue'
import localStorage from "localStorage";
const standard = {
  1: {
    down: {
      low: 2112.4,
      high: 2167.6,
      off: 0
    }
  },
  2: {
    down: {
      low: 1932.4,
      high: 1987.6,
      off: 0
    }
  },
  3: {
    down: {
      low: 1807.4,
      high: 1877.6,
      off: 1575
    }
  },
  4: {
    down: {
      low: 2112.4,
      high: 2152.6,
      off: 1805
    }
  },
  5: {
    down: {
      low: 871.4,
      high: 891.6,
      off: 0
    }
  },
  6: {
    down: {
      low: 877.4,
      high: 882.6,
      off: 0
    }
  },
  7: {
    down: {
      low: 2622.4,
      high: 2687.6,
      off: 2175
    }
  },
  8: {
    down: {
      low: 927.4,
      high: 957.6,
      off: 340
    }
  },
  9: {
    down: {
      low: 1847.4,
      high: 1877.4,
      off: 0
    }
  },
  10: {
    down: {
      low: 2112.4,
      high: 2167.6,
      off: 1490
    }
  },
  11: {
    down: {
      low: 1478.4,
      high: 1493.4,
      off: 736
    }
  },
  12: {
    down: {
      low: 731.4,
      high: 743.6,
      off: -37
    }
  },
  13: {
    down: {
      low: 748.4,
      high: 753.6,
      off: -55
    }
  },
  14: {
    down: {
      low: 760.4,
      high: 765.6,
      off: -63
    }
  },
  19: {
    down: {
      low: 877.4,
      high: 887.6,
      off: 735
    }
  },
  20: {
    down: {
      low: 793.4,
      high: 818.6,
      off: -109
    }
  },
  21: {
    down: {
      low: 1498.4,
      high: 1508.4,
      off: 1326
    }
  },
  22: {
    down: {
      low: 3512.4,
      high: 3587.6,
      off: 2580
    }
  },
  25: {
    down: {
      low: 1932.4,
      high: 1992.6,
      off: 910
    }
  },
  26: {
    down: {
      low: 861.4,
      high: 891.6,
      off: -291
    }
  },
  32: {
    down: {
      low: 1454.4,
      high: 1493.6,
      off: 131
    }
  }
};
export default {
  data() {
    return {
      bands: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        19,
        20,
        21,
        22,
        25,
        26,
        32
      ],
      role: {
        low: 0,
        high: 0,
        off: 0
      },
      selectedBand: 0,
      showAlert: false,
      value: "",

      curHomeBackTriggerTimes: 1,
      maxHomeBackTriggerTimes: 2,
      // statusBarHeight: weex.config.eros.statusBarHeight ? weex.config.eros.statusBarHeight : 40,
      // touchBarHeight: weex.config.eros.touchBarHeight ? weex.config.eros.touchBarHeight : 20
      statusBarHeight: 40,
      touchBarHeight: 20
    };
  },
  components: {
    // text
  },
  created() {
    let self = this;
    // this.$storage
    // self.$storage.get('band.select').then(resData => {
    //     // window.console.log(`获取选择的Band：${resData}`);
    //     if (resData) {
    //         self.bandClick(resData);
    //     } else {
    //         self.bandClick(1);
    //     }
    // });
    let bandSelect = localStorage.getItem("uband.select");
    if (bandSelect) {
      self.bandClick(bandSelect);
    } else {
      self.bandClick(1);
    }
    this.androidFinishApp();
  },
  computed: {
    result() {
      let r = this.changeShowAlert();
      if (r == "") {
        return r;
      }
      return (this.value - this.role.off) * 5;
    },
    itemHeight() {
      return this.scrollHeight / this.bands.length;
    },
    scrollHeight() {
      let sh = window.outerHeight; //weex.config.eros.deviceHeight - this.statusBarHeight - this.touchBarHeight;
      return this.realPx(sh) - 50;
    }
  },
  methods: {
    bandClick(band) {
      let selected = standard[band];
      this.selectedBand = band;
      this.role = selected.down;
      localStorage.setItem("uband.select", band);
    },
    realPx(val) {
      return val; //750 / weex.config.eros.deviceWidth;
    },
    changeShowAlert() {
      this.showAlert = false;
      if (!this.value || (this.value + "").length < 3) {
        return "";
      }
      if (this.value < this.role.low || this.value > this.role.high) {
        this.showAlert = true;
        return "";
      }
      return null;
    }
  }
};
</script>

<style scoped>
.status-bar {
  width: 750px;
  height: 40px;
  background-color: #1da1f2;
}
.touch-bar {
  height: 68px;
  width: 750px;
  background-color: #1da1f2;
}
.main {
  vertical-align: top;
  flex-direction: row;
  align-items: flex-start;
  display: flex;
}
.band-ctt {
  width: 30%;
  display: inline-block;
  background-color: #1da1f2;
  /* flex-direction: column; */
}
.main-ctt {
  width: 70%;
  display: inline-block;
  background-color: #6f5499;
  text-align: center;
}
.band-item {
  padding-left: 15px;
}
.band-name {
  color: #ffffff;
  font-size: 12px;
}
.active {
  color: #ffffff;
  background-color: #6f5499;
}
.icon-right {
  position: absolute;
  right: 20px;
  top: 13px;
  color: #ffffff;
}
.label {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 28px;
  color: #ffffff;
  margin-top: 20px;
}
.input {
  text-align: center;
  border-color: #cccccc;
  border-style: solid;
  border-width: 1px;
  padding: 20px;
  font-size: 20px;
  width: 80%;
  color: #555555;
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.alert {
  border-style: solid;
  border-width: 1px;
  padding: 20px;
  font-size: 12px;
  width: 80%;
  margin: 0 auto;
}

.danger {
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a94442;
  border-radius: 10px;
  margin-top: 20px;
}
.information {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.result-ctt {
  margin-top: 40px;
  background-color: #ffffff;
}
.result-title {
  font-size: 20px;
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.result-body {
  font-size: 48px;
  font-weight: bold;
  color: #ff6600;
  padding: 20px;
  text-align: center;
}
</style>
