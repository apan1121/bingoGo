<template>
    <div class="col game-box">
        <div class="row">
            <div class="col-12 col-md-8 display-box">
                <div class="center-box">
                    <div class="ball">
                        <div class="number" v-if="!isNaN(displayNumber)">
                            {{displayNumber}}
                        </div>
                        <div class="string" v-else>
                            {{displayNumber}}
                        </div>
                        <div class="shadow"></div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 button-box">
                <div class="row">
                    <div class="col button-item">
                        <div class="center-box">
                            <button class="btn btn-primary bingoBtn" v-on:click="getNumber">
                                <i class="fa fa-child" aria-hidden="true"></i>
                            </button>
                            <div class="notice">
                                剩下 {{numberData.length}} 個選項
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

const audio = {
    ding: new Audio("./public/mp3/91926_7037-lq.mp3"),
    linn: new Audio("./public/mp3/linn_shaker.mp3"),
}


export default {
    data: function(){
        return {
            timer: null,
            shadowAction: false,
            displayNumber: "Bingo!",
            randCount: 0,
            randTimer: [0,10, 10, 10, 20, 10, 20, 40, 40, 50, 60, 50, 50, 50, 100, 100, 200, 200, 300, 500,600,700,1000]
        }
    },

    methods: {
        getNumber: function(){
            let that = this;
            if (that.numberData.length == 0) {
                alert("已經沒選項了");
                that.$el.querySelector(".bingoBtn").disabled = true;
            } else {
                this.randCount = 0;
                this.$el.querySelector(".bingoBtn").disabled = true;
                this.randDisplay();
            }
        },
        randDisplay: function(){
            let that = this;
            clearTimeout(that.timer);
            that.randCount += 1;
            that.displayNumber = that.getRandNumberData();
            audio.linn.play();
            if (that.randCount >= that.randTimer.length) {
                that.useNumber();
            }  else {
                that.timer = setTimeout(function(){
                    that.randDisplay();
                }, that.randTimer[that.randCount]);
            }
        },
        useNumber: function(){
            let that = this;
            let randIndex = that.numberData.indexOf(that.displayNumber);
            setTimeout(function(){
                that.$el.querySelector(".shadow").classList.add("shadow-show");
                audio.ding.play();
                setTimeout(function(){
                    that.$el.querySelector(".shadow").classList.remove("shadow-show");
                    that.storeData.push( that.numberData.splice(randIndex,1)[0] );
                    that.$emit('savestoredata');
                    if (that.numberData.length > 0) {
                        that.$el.querySelector(".bingoBtn").disabled = false;
                    }
                },1000);
            },100);

        },
        getRandNumberData: function(){
            let that = this;
            let total = that.numberData.length;
            let randIndex = parseInt( (Math.random() * 10000)  % total);
            return that.numberData[randIndex];
        }
    },
  computed: {

  },
  beforeUpdate() {
      let that = this;

  },
  mounted(){
      let that = this;
      // console.log(this.storeData, this.numberData);
  },
  props: ['storeData','numberData'],
}
</script>

<style>

</style>
