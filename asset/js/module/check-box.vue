<template>
    <div v-if="checkFlag">
        <div class="checkAnswerBoxOverlay">
        </div>
        <div class="checkAnswerBox">
            <div class="checkAnswerBox-wrapper">
                <div class="closeBtn" v-on:click="closeCheckAnswerBox">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </div>
                <div class="checkAnswerBox-content">
                    <h4>比對手上的項目，祝您中獎</h4>

                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="輸入您需要比對的項目" v-model="AnswerString">
                        <div class="input-group-append">
                            <button class="btn  btn-primary" type="button" v-on:click="checkAnswer">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                    <div class="checkAnswerList">
                        <template v-if="AnswerCheck.length > 0">
                            <div class="row">
                                <template v-for="(item, key) in AnswerCheck">
                                    <div class="col">
                                        <div class="answerbox" v-bind:answer="item.check">
                                            <div class="answerbox-string">
                                                {{item.key}}
                                            </div>
                                            <div class="answer">
                                                <i class="fa fa-check yes" aria-hidden="true"></i>
                                                <i class="fa fa-times no" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="winner" v-if="isWinner">
            <img v-bind:src="winnerSVG" v-on:click="closeWinner">
        </div>
    </div>
</template>
<script>
import Vue from 'vue';


const audio = {
    good: new Audio("./public/mp3/good.mp3"),
    bad: new Audio("./public/mp3/bad.mp3"),
    winner: new Audio("./public/mp3/winner.mp3"),
}



export default {
    data: function(){
        return {
            AnswerString: "",
            AnswerCheck: [],
            checkLoopIndex: 0,

            winnerSVG: "./public/img/winner.svg",
            isWinner: false,
        }
    },

    methods: {
        closeWinner() {
            this.isWinner = false;
        },
        checkAnswer() {
            let that = this;
            that.AnswerCheck = [];
            that.isWinner = false;
            if (that.AnswerString == "") {
                return false;
            }
            let value = that.AnswerString.split(",");
            value.forEach(function(val){
                that.AnswerCheck.push({
                    key: val,
                    check: 0,
                });
            });

            if (that.AnswerCheck.length > 0) {
                that.checkLoopIndex = 0;
                that.checkLoop(this);
            }
        },
        checkLoop() {
            var that = this;
            let checkKey = that.AnswerCheck[that.checkLoopIndex].key;

            that.AnswerCheck[that.checkLoopIndex].check = (that.storeData.indexOf(checkKey) != -1)?"1":"-1";
            if (that.AnswerCheck[that.checkLoopIndex].check == 1) {
                audio.good.play();
            } else {
                audio.bad.play();
            }

            that.$set(that.AnswerCheck, that.checkLoopIndex, that.AnswerCheck[that.checkLoopIndex]);

            let nextIndex = that.checkLoopIndex + 1;
            if (["",null, undefined].indexOf(that.AnswerCheck[nextIndex]) == -1) {
                that.checkLoopIndex = nextIndex;
                setTimeout(function(){ this.checkLoop() }.bind(this), 500);
            } else {
                that.summery();
            }
        },
        summery() {
            let that = this;
            let winner = true;
            for (var i in that.AnswerCheck) {
                if (that.AnswerCheck[i].check == -1) {
                    winner = false;
                }
            }

            if (winner) {
                audio.winner.play();
                that.isWinner = true;
                that.showWinner();
            }
        },
        showWinner() {
            let that = this;
            setTimeout(function(){
                document.querySelector(".winner").classList.add("show");
                document.querySelector(".winner").style.opacity = "0";
                setTimeout(function(){
                    that.isWinner = false;
                },10000);
            },500);
        },
        closeCheckAnswerBox() {
            let that = this;
            that.$emit("close-check-answer-box");
        }
    },
    computed: {

    },
    watch: {
        AnswerCheck: function(newParam, oldParam){
            // console.log(newParam, oldParam);
        },
        checkFlag: function(newParam, oldParam){
            if (newParam === false) {
                this.AnswerString = "";
                this.AnswerCheck = [];
            }
        }
    },
    beforeUpdate() {
        let that = this;

    },
    mounted(){
        let that = this;

        // console.log(this.storeData, this.numberData);
    },
    props: ['storeData','checkFlag'],
}
</script>