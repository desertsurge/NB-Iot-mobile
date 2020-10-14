<template>
  <div class="peak-rate">
    <van-nav-bar title="峰值速率" />
    <van-cell-group title="配置参数" class="settings">
      <van-field name="type" label="模式">
        <template #right-icon>
          <van-radio-group v-model="type" direction="horizontal">
            <van-radio name="up">上行</van-radio>
            <van-radio name="down">下行</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="layer"
        :value="layer"
        label="层数"
        placeholder="点击选择层数"
        @click="showLayerPicker = true"
      />
      <van-popup v-model="showLayerPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="layerColumns"
          @confirm="onLayerConfirm"
          @cancel="showLayerPicker = false"
        />
      </van-popup>

      <van-field name="module" label="调制方法">
        <template #right-icon>
          <van-radio-group v-model="module" direction="horizontal">
            <van-radio name="7.40624">256</van-radio>
            <van-radio name="5.55468">64</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-cell title="带宽" :value="bandwidth">
        <select name="bandwidth" v-model="bandwidth" class="form-control">
          <template v-for="opt in bandwidthOpts">
            <option :value="opt.value" :key="opt.value">{{ opt.key }}</option>
          </template>
        </select>
      </van-cell>
      <van-cell title="帧结构" :value="frame">
        <select name="frame" v-model="frame" class="form-control">
          <template v-for="opt in frameOpt">
            <option :value="opt.value" :key="opt.value">{{ opt.key }}</option>
          </template>
        </select>
      </van-cell>
    </van-cell-group>

    <van-cell-group title="输出" class="output-container">
      <van-cell title="峰值速率" :value="finalResult" class="finalResult" />
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  Field,
  CellGroup,
  RadioGroup,
  Radio,
  Picker,
  Popup,
  Cell,
  NavBar,
} from "vant";

export default {
  name: "Peak-rate",
  components: {
    vanField: Field,
    vanCellGroup: CellGroup,
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    vanPicker: Picker,
    vanPopup: Popup,
    vanCell: Cell,
    vanNavBar: NavBar,
  },
  data() {
    return {
      type: "up",
      layer: "1",
      showLayerPicker: false,
      module: "7.40624", // 256
      bandwidth: 273,
      bandwidthOpts: [
        { key: "100M", value: 273 },
        { key: "90M", value: 245 },
        { key: "80M", value: 217 },
        { key: "70M", value: 189 },
        { key: "60M", value: 162 },
        { key: "50M", value: 133 },
        { key: "40M", value: 106 },
        { key: "30M", value: 78 },
        { key: "20M", value: 51 },
        { key: "15M", value: 38 },
        { key: "10M", value: 24 },
      ],
      frame: 1,
      frameOpt: [
        { key: "2.5ms单（11，1，2）", value: 1, up: 6400, down: 21200 },
        { key: "2.5ms单（10，2，2）", value: 2, up: 6400, down: 20800 },
        { key: "2.5ms双（11，1，2）", value: 3, up: 9200, down: 18400 },
        { key: "2.5ms双（10，2，2）", value: 4, up: 9200, down: 18000 },
        { key: "2ms单（11，1，2）", value: 5, up: 8000, down: 19500 },
        { key: "2ms单（10，2，2）", value: 6, up: 8000, down: 19000 },
        { key: "5ms单（11，1，2）", value: 7, up: 6000, down: 21800 },
        { key: "5ms单（10，2，2）", value: 8, up: 6000, down: 21600 },
        { key: "5ms单（6，4，4）", value: 9, up: 6400, down: 20800 },
      ],
    };
  },
  computed: {
    layerColumns() {
      if (this.type == "up") {
        return [1, 2];
      } else {
        return [1, 2, 3, 4];
      }
    },
    oh() {
      if (this.type == "up") {
        return 0.08;
      } else {
        return 0.14;
      }
    },

    finalResult() {
      var bytes = this.result;
      if (bytes === 0) {
        return "0 B";
      }
      var k = 1024, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    result() {
      var frameEle;
      for (let i = 0; i < this.frameOpt.length; i++) {
        if (this.frameOpt[i].value == this.frame) {
          frameEle = this.frameOpt[i];
          break;
        }
      }

      window.console.log(
        `${this.layer}, ${this.module}, ${this.bandwidth}, ${
          frameEle[this.type]
        }, ${this.oh}, `
      );
      return (
        this.layer *
        this.module *
        this.bandwidth *
        12 *
        frameEle[this.type] *
        (1 - this.oh)
      );
    },
  },
  methods: {
    onLayerConfirm(value) {
      this.layer = value;
      this.showLayerPicker = false;
    },
    roundUp(x) {
      if (x < 0) {
        return Math.floor(x);
      } else {
        return Math.floor(x) == x ? x : Math.floor(x) + 1;
      }
    },
  },
};
</script>
<style>
.output-container {
  margin-bottom: 50px;
}
.settings .van-field__label {
  width: 140px;
}
.finalResult .van-cell__value {
  color: #f60;
}
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
</style>