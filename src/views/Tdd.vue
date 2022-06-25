<template>
  <div class="wrapper">
    <page-header backUrl="grid" title="TDD频点"></page-header>
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

<script lang="ts">
// import text from '@/components/text.vue'
import localStorage from "../script/localStorage";
import PageHeader from "../components/PageHeader.vue";
const standard = {
  33: {
    down: {
      low: 1900,
      high: 1920,
      off: 36000
    }
  },
  34: {
    down: {
      low: 2010,
      high: 2025,
      off: 36200
    }
  },
  35: {
    down: {
      low: 1850,
      high: 1910,
      off: 36350
    }
  },
  36: {
    down: {
      low: 1930,
      high: 1990,
      off: 36950
    }
  },
  37: {
    down: {
      low: 1910,
      high: 1930,
      off: 37550
    }
  },
  38: {
    down: {
      low: 2570,
      high: 2620,
      off: 37750
    }
  },
  39: {
    down: {
      low: 1880,
      high: 1920,
      off: 38250
    }
  },
  40: {
    down: {
      low: 2300,
      high: 2400,
      off: 38650
    }
  },
  41: {
    down: {
      low: 2496,
      high: 2690,
      off: 39650
    }
  },
  42: {
    down: {
      low: 3400,
      high: 3600,
      off: 41590
    }
  },
  43: {
    down: {
      low: 3600,
      high: 3800,
      off: 43590
    }
  },
  44: {
    down: {
      low: 703,
      high: 803,
      off: 45590
    }
  }
};
export default {
  data() {
    return {
      bands: [
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44
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
    PageHeader
},
  created() {
    let self = this;
    let bandSelect = localStorage.getItem("tdd.band.select");
    if (bandSelect) {
      self.bandClick(bandSelect);
    } else {
      self.bandClick(33);
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
      let sh = window.outerHeight;
      return this.realPx(sh) - 50;
    }
  },
  methods: {
    bandClick(band) {
      let selected = standard[band];
      this.selectedBand = band;
      this.role = selected.down;
      localStorage.setItem("tdd.band.select", band);
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
