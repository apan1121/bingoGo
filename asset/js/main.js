import "../less/main.less";
import Cookies from "js.cookie";
import storeBoxVue from "./module/store-box";
import gameBoxVue from "./module/game-box";
import Vue from 'vue';

new Vue({
    el: "#appContainer",
    data: {
        title: Cookies.get("title"),
        numberFormat: Cookies.get("numberFormat"),
        // title: "",
        // numberFormat: "",
        storeData: [],
        numberData: [],
    },
    components: {
        storeBoxVue,
        gameBoxVue
    },
    watch: {
    },
    methods: {
        clear() {
            if (confirm("您確定要清除全部資料嗎？")){
                Cookies.set("storeData", null);
                Cookies.set("numberFormat", null);
                location.reload();
            }
        },
        saveStoreData() {
            Cookies.set("storeData", this.storeData);
            this.$el.querySelector(".number-board, .string-board").classList.add("new");
        },
        checkData() {
            let that = this;
            let flag = true;

            if (["", null, undefined].indexOf(that.title) >= 0) {
                flag = false;
            }

            that.createNumberData(that.numberFormat);
            if (that.numberData.length == 0) {
                flag = false;
            }

            if (!flag) {
                alert("請詳細設定賓果網站所需資訊");
                if (["", null, undefined].indexOf(that.title) >= 0) {
                    that.title = prompt("請輸入活動名稱");
                    if (["", null, undefined].indexOf(that.title) >= 0) {
                        flag = false;
                    }
                }

                if (["", null, undefined].indexOf(that.numberFormat) >= 0) {
                    flag = false;
                    that.numberFormat = prompt("請輸入賓果選項區間\nex: 1-72 或是 apple,orange,banana", "");
                }

                if (!that.createNumberData(that.numberFormat)) {
                    flag = false;
                    that.numberFormat = "";
                }
            }

            return flag;
        },
        createNumberData(params) {
            let that = this;
            that.numberData = [];
            if (["", null, undefined].indexOf(params) == -1 ){
                if (params.match(/^[\d]{1,}\-[\d]{1,}$/)) {
                     let loopValue = params.split("-");
                     let maxLength = Math.max.apply(null,[ (loopValue[0] +"").length, (loopValue[1] +"").length]);

                     let zero = "0";
                     for (var i = 0; i < maxLength; i++) {
                         zero += "0";
                     }

                     for (var i = loopValue[0]; i <= loopValue[1]; i++) {
                         that.numberData.push( (zero +""+i).substr(-maxLength) );
                     }
                } else {
                    let tmpData = params.split(",").map(function(val){
                        return val.replace(/^\s*|\s*$/g,"");
                    }).filter(function(val){
                        return ["",null, undefined].indexOf(val) == -1;
                    });
                    for (var i in tmpData) {
                        that.numberData.push(tmpData[i]);
                    }
                }
            }


            return that.numberData.length > 0;
        },
        setDefaultStoreData() {
            let that = this;
            let defaultStoreData = Cookies.get("storeData");
            if (Array.isArray(defaultStoreData)){
                defaultStoreData.map(function(val){
                    let index = that.numberData.indexOf(val);
                    if (index >= 0 ){
                        that.numberData.splice(index, 1);
                        that.storeData.push(val);
                    }
                });
            }
        }
    },
    beforeMount(){
        let that = this;
    },
    mounted(){
        let that = this;
        let check = 0;
        while(!that.checkData()) {
        }

        Cookies.set("title", this.title);
        Cookies.set("numberFormat", this.numberFormat);

        // this.createNumberData("1-72");
        this.setDefaultStoreData();
    }
});