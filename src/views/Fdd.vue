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
      low: 2110,
      high: 2170,
      off: 0
    }
  },
  2: {
    down: {
      low: 1930,
      high: 1990,
      off: 600
    }
  },
  3: {
    down: {
      low: 1805,
      high: 1880,
      off: 1200
    }
  },
  4: {
    down: {
      low: 2110,
      high: 2155,
      off: 1950
    }
  },
  5: {
    down: {
      low: 869,
      high: 894,
      off: 2400
    }
  },
  6: {
    down: {
      low: 875,
      high: 885,
      off: 2650
    }
  },
  7: {
    down: {
      low: 2620,
      high: 2690,
      off: 2750
    }
  },
  8: {
    down: {
      low: 925,
      high: 960,
      off: 3450
    }
  },
  9: {
    down: {
      low: 1844.9,
      high: 1879.9,
      off: 3800
    }
  },
  10: {
    down: {
      low: 2110,
      high: 2170,
      off: 4150
    }
  },
  11: {
    down: {
      low: 1475.9,
      high: 1495.9,
      off: 4750
    }
  },
  12: {
    down: {
      low: 729,
      high: 746,
      off: 5010
    }
  },
  13: {
    down: {
      low: 746,
      high: 756,
      off: 5180
    }
  },
  14: {
    down: {
      low: 758,
      high: 768,
      off: 5280
    }
  },
  17: {
    down: {
      low: 734,
      high: 746,
      off: 5730
    }
  },
  18: {
    down: {
      low: 860,
      high: 875,
      off: 5850
    }
  },
  19: {
    down: {
      low: 875,
      high: 890,
      off: 6000
    }
  },
  20: {
    down: {
      low: 791,
      high: 821,
      off: 6150
    }
  },
  21: {
    down: {
      low: 1495.9,
      high: 1510.9,
      off: 6450
    }
  },
  22: {
    down: {
      low: 3510,
      high: 3590,
      off: 6600
    }
  },
  23: {
    down: {
      low: 2180,
      high: 2200,
      off: 7500
    }
  },
  24: {
    down: {
      low: 1525,
      high: 1559,
      off: 7700
    }
  },
  25: {
    down: {
      low: 1930,
      high: 1995,
      off: 8040
    }
  },
  26: {
    down: {
      low: 859,
      high: 894,
      off: 8690
    }
  },
  27: {
    down: {
      low: 852,
      high: 869,
      off: 9040
    }
  },
  28: {
    down: {
      low: 758,
      high: 803,
      off: 9210
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
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28
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
      statusBarHeight: 40,
      touchBarHeight: 20
    };
  },
  components: {
    // text
  },
  created() {
    let self = this;
    let bandSelect = localStorage.getItem("ftt.band.select");
    if (bandSelect) {
      self.bandClick(bandSelect);
    } else {
      self.bandClick(1);
    }
  },
  computed: {
    result() {
      let r = this.changeShowAlert();
      if (r == "") {
        return r;
      }
      return (this.value - this.role.low) * 10 + this.role.off;
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
      localStorage.setItem("ftt.band.select", band);
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
