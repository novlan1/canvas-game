<template>
  <div class="wrap">
    <div class="title">
      <!-- 点灯笼 -->
      第{{ curLevel }}关
    </div>
    <div class="top-wrap">
      <van-tag
        type="primary"
        size="large"
        class="cur-level-tag"
        @click.stop="showActions=true;"
      >
        点我
      </van-tag>
      <!-- <van-tag
        type="warning"
        size="large"
        class="reset-tag"
        @click.stop="onReset"
      >
        重置
      </van-tag>
      <van-tag
        type="warning"
        size="large"
        @click.stop="showRule=true;showActions=true;"
      >
        xuan
      </van-tag> -->
    </div>
    <div class="game-wrap">
      <div
        v-for="(item, index) of lanternList"
        :key="index"
        class="row"
      >
        <div
          v-for="(it, idx) of item"
          :key="idx"
          class="grid"
          :class="`grid-${it}`"
          @click.stop="onClickLantern(index, idx)"
        >
        <!-- {{ it }} -->
        </div>
      </div>
    </div>

    <div class="button-wrap">
      <!-- <van-button
        round
        type="info"
        size="small"
        @click.stop="onReset"
      >
        重置
      </van-button> -->
    </div>
    <van-action-sheet
      v-model="showActions"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="showActions=false"
      @select="onSelectAction"
    />
    <van-popup
      v-model="showPickLevel"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        title="选择关卡"
        show-toolbar
        :default-index="curLevel-1"
        :columns="levelColumns"
        @cancel="showPickLevel=false"
        @change="onChangePickerLevel"
        @confirm="onConfirmPikcerLevel"
      />
    </van-popup>
    <van-popup
      v-model="showRule"
      position="bottom"
      closeable
      :style="{ height: '30%' }"
    >
      <div class="rule-wrap">
        <!-- “点灯笼”一共有{{ maxLevel }}关。灯笼有明暗两种初始状态，点击灯笼将使自身及相邻上下左右的灯笼状态反转，点亮全部灯笼则挑战成功。灰色不可点击。 -->
        <p>1. “点灯笼”一共有{{ maxLevel }}关。</p>
        <p>2. 灯笼有明暗两种初始状态，点击灯笼，将使自身及相邻上下左右的灯笼状态反转。</p>
        <p>3. 点亮全部灯笼则挑战成功。</p>
        <p>4. 灰黑色不可点击。</p>
      </div>
    </van-popup>
    <van-dialog
      v-model="showStrategy"
      :title="`第${curLevel}关攻略`"
      :show-cancel-button="false"
      confirm-button-text="我知道了"
    >
      <div class="strategy-img-wrap">
        <div class="strategy-tip">
          依次点击下图中的数字
        </div>
        <!-- <img
          :src="curStrategyImg"
          class=""
        > -->
        <div class="game-wrap strategy-game-wrap">
          <div
            v-for="(item, index) of pureLanternList"
            :key="index"
            class="row"
          >
            <div
              v-for="(it, idx) of item"
              :key="idx"
              class="grid"
              :class="`grid-${it}`"
              @click.stop="onClickLantern(index, idx)"
            >
              <span
                v-if="strategyList[index] && strategyList[index][idx]>0"
                class="strategy-num"
              >{{ strategyList[index] && strategyList[index][idx] }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { gameConfig,strategyConfig } from 'src/project/lantern-game/utils/config.js';
import { Dialog, Toast } from 'vant';

const actions = [
  {
    name: '选择关卡',
    key: 'chooseLevel'
  },
  {
    name: '重置关卡',
    key: 'resetLevel',
  },
  {
    name: '查看规则',
    key: 'checkRule'
  },
  {
    name: '查看攻略',
    key: 'checkStrategy'
  }
]

export default {
  data() {
    return {
      lanternList: [], // 游戏配置
      pureLanternList: [], // 未污染的游戏配置
      strategyList: [], // 当前关卡攻略
      curLevel: 0, // 用户所在关卡
      // selectedLevel: 0, // 选中的关卡，可能比curLevel小
      maxLevel: 0,
      showPickLevel: false,
      showActions: false, // 显示选项面板
      showRule: false,
      showStrategy: false, // 是否显示攻略
      actions,
      strategyConfig,
    };
  },
  computed: {
    levelColumns() {
      const { maxLevel } = this;
      const res = [];
      for (let i = 0 ;i < maxLevel; i++) {
        res.push(`第${i + 1}关`);
      }
      return res;
    },
    curStrategyImg() {
      const { curLevel } = this;
      return `http://doc.uwayfly.com/lantern-level-${curLevel}.png`
    }
  },
  mounted() {
    this.maxLevel = gameConfig.length - 1;
    this.curLevel = +localStorage.getItem('curLevel') || 1;
    if (this.curLevel > this.maxLevel) {
      this.curLevel = 1;
      localStorage.setItem('curLevel', 1);
    }
    // this.selectedLevel = this.curLevel;
    this.init(this.curLevel);
  },
  methods: {
    init(level) {
      const list = gameConfig[level];
      const cList = strategyConfig[level] || []
      const rowLen = list.length;
      const colLen = list[0].length;

      const res = [];
      const res2 = [];
      for (let i = 0;i < colLen; i++) {
        const temp = [];
        const temp2 = []
        for (let j = 0 ;j < rowLen; j++) {
          temp.push(list[j][i]);
          temp2.push(cList[j] && cList[j][i])
        }
        res.push(temp);
        res2.push(temp2)
      }
      console.log('res', res);
      console.log('res2', res2,cList);
      try {
        this.lanternList = JSON.parse(JSON.stringify(res));
        this.pureLanternList = JSON.parse(JSON.stringify(res));
        this.strategyList = JSON.parse(JSON.stringify(res2))
      } catch (e) {
      }
    },
    // 选择选项
    onSelectAction(item) {
      console.log('item', item)
      switch (item.key) {
        case 'chooseLevel':
          this.onShowPickLevel();
          break;
        case 'resetLevel':
          this.onReset();
          break;
        case 'checkRule':
          this.showRule = true;
          break
        case 'checkStrategy':
          this.showStrategy = true;
          break
      }
      
    },
    // 选择关卡
    onShowPickLevel() {
      this.showPickLevel = !this.showPickLevel;
    },
    // 改变关卡，滑动时
    onChangePickerLevel(picker, value, index) {
      console.log(picker, value, index);
    },
    // 确定选择关卡
    onConfirmPikcerLevel(value, index) {
      console.log(value, index);
      if (this.curLevel != index + 1) {
        this.curLevel = index + 1;
        this.init(this.curLevel);
        window.localStorage.setItem('curLevel', this.curLevel);
        Toast(`已切换到第${this.curLevel}关`)
      }
      this.showPickLevel = false;
    },
    // 重置
    onReset() {
      this.init(this.curLevel);
      Toast('重置成功')
    },
    // 点击灯笼
    onClickLantern(index, idx) {
      this.onChnageLanternColor(index, idx);
      this.onCheckSucc();
    },
    // 检查是否成功
    onCheckSucc() {
      for (const row of this.lanternList) {
        for (const item of row) {
          if (item == 0) {
            return false;
          }
        }
      }
      if (this.curLevel >= this.maxLevel) {
        console.log('恭喜通关');
        Dialog.confirm({
          title: '提示',
          message: '恭喜通关！没有更多了！',
        }).then(() => {

        });
        return;
      }

      console.log('恭喜晋级');
      Dialog.confirm({
        title: '提示',
        message: `恭喜晋级第${this.curLevel + 1}关`,
      })
        .then(() => {
          this.curLevel += 1;
          console.log('当前关卡', this.curLevel);
          // if (this.curLevel > this.curLevel) {
          //   this.curLevel = this.selectedLevel;
            window.localStorage.setItem('curLevel', this.curLevel);
          // }
          this.init(this.curLevel);
        })
        .catch(() => {
        });
    },
    // 点击灯笼改变颜色
    onChnageLanternColor(index, idx) {
      const { lanternList } = this;
      const num = this.lanternList[index][idx];
      if (num == -1) {
        return;
      }
      const reverseNum = Number(!num);

      this.lanternList[index][idx] = reverseNum;
      this.$forceUpdate();
      console.log('123123', index, idx, reverseNum, lanternList[index][idx - 1]);

      if (lanternList[index + 1] && lanternList[index + 1][idx] != -1) {
        lanternList[index + 1][idx] = Number(!lanternList[index + 1][idx]);
      }
      if (lanternList[index - 1] && lanternList[index - 1][idx] != -1) {
        lanternList[index - 1][idx] = Number(!lanternList[index - 1][idx]);
      }
      if (lanternList[index][idx + 1] != null && lanternList[index][idx + 1] != -1) {
        console.log('======+');
        lanternList[index][idx + 1] = Number(!lanternList[index][idx + 1]);
      }
      if (lanternList[index][idx - 1] != null  && lanternList[index][idx - 1] != -1) {
        console.log('======-');
        lanternList[index][idx - 1] = Number(!lanternList[index][idx - 1]);
      }
      console.log('lanternList', lanternList);
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss">
.wrap {
  margin: 10px 60px 60px 60px;
}
.title{
  text-align: center;
  height: 56px;
  line-height: 56px;
  font-weight: 500;
  font-size: 18px;
  color: #06f;
}
.top-wrap {
  margin-bottom: 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .cur-level-tag,
  .reset-tag {
    margin-right: 10px;
  }
}
.game-wrap {
  // width: 360px;
  // height: 360px;
  // transform: rotate(90deg) translateY(-50%);
  // transform-origin: 0 0;

  &.strategy-game-wrap {
    // transform: scale(0.7);
    user-select: none;
    pointer-events: none;
    .grid {
      width: 39px;
      height: 39px;
    }
  }

  .row {
    display: flex;
    justify-content: center;
  }
  .grid {
    width: 76px;
    height: 76px;
    text-align: center;
    line-height: 50px;
    background: url(../../assets/img/dark-lantern.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    &.grid--1 {
      filter: grayscale(1);
    }
    &.grid-0 {
      background-size: 100% 100%;
      filter: grayscale(0.2);
      border: none;
    }
    &.grid-1{
      background: url(../../assets/img/lantern3.png) no-repeat center;
      border: none;
      background-size: 80% 80%;
    }
    .strategy-num{
      text-align: center;
      background: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
}


.button-wrap{
  margin-top: 50px;
}

.rule-wrap {
  font-size: 14px;
  color: rgba(0,0,0,0.8);
  margin: 50px 20px 0;
  // text-indent: 20px;
  line-height: 24px;
}
.strategy-img-wrap {
  text-align: center;
  margin: 20px 0;
  .strategy-tip {
    color: rgba(0,0,0,0.7);
    margin-bottom: 15px;
  }
  img {
    width: 125px;
  }
}
</style>
