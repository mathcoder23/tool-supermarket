<template>
    <div class="flex flex-direction c-body">
        <view class="cu-modal show" v-if="showCompare">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">

                    <view class="content">
                        结果:<span
                            v-if="compareResult"
                            :class="{'c-num-more':compareResult>=0,'c-num-less':compareResult<0}">{{compareResult}}</span>
                        <span v-if="compareResult">元</span>
                    </view>
                    <view class="action" @click="clickShowCompareHidden">
                        <text class="icon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl">
                    <div style="display: flex;align-items: center">
                        <div>总额:<span class="c-num">{{formatNum(checkSum)}}</span>元</div>
                        <div>
                            <input placeholder="输入数据" v-model="inputSum"></input>
                        </div>
                    </div>
                </view>
            </view>
        </view>

        <view class="cu-modal show" v-if="showTool">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">

                    <view class="content">
                        质量/价格计算
                    </view>
                    <view class="action" @click="showTool = false">
                        <text class="icon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl">
                    <view class="cu-form-group margin-top">
                        <view class="title">每kg价格</view>
                        <input placeholder="输入每kg价格" v-model="toolKg"></input>
                    </view>
                    <view class="cu-form-group margin-top">
                        <view class="title">给定价格计算质量</view>
                        <input placeholder="输入给定价格计算质量" v-model="toolPrice"></input>
                    </view>
                    {{showW}} kg
                    <view class="cu-form-group margin-top">
                        <view class="title">给定质量计算价格</view>
                        <input placeholder="输入给定质量计算价格" v-model="toolW"></input>
                    </view>
                    {{showPrice}} 元
                </view>
            </view>
        </view>

        <view class="margin-xs padding radius shadow bg-white">
            <div class=" flex justify-between align-center">
                <div @click="clickShowCompare">总额:<span class="c-num">{{formatNum(checkSum)}}</span>元</div>
                <div>数项:<span class="c-num">{{checkCount}}</span></div>
            </div>
        </view>

        <div class="margin-xs padding-sm radius shadow bg-white tag-block" style="flex:1; overflow: auto;">
            {{test}}
            <div class="num-tag-list">
                <div v-for="item in itemList" class="cu-tag radius num-tag"
                     style="min-width: 150upx;"
                     @click="clickTag(item)"
                     :style="{'background-color':item.color+'!important'
                        ,'color':item.enable?'white':'black'
                     ,'text-decoration':item.enable?'auto':'line-through'

                     }">
                    {{item.value}}
                </div>
            </div>
            <div class="flex" style="justify-content: flex-end">
                <button class="cu-btn bg-red margin-tb-xs " @click="clickClear">清空</button>
                <button class="cu-btn bg-green margin-tb-xs margin-left " @click="clickShowTool">工具</button>
            </div>
        </div>
        <div class="margin-xs  radius shadow padding bg-white" style="height: 30upx;padding-left:30upx;">
            <!--            <input :placeholder="hint" v-model="tempNumStr"></input>-->
            <span v-if="tempNumStr.length === 0" style="color:grey;">
                {{hint}}
            </span>
            <span v-else>
            {{tempNumStr}}
            </span>
        </div>
        <div class="margin-xs padding-sm radius shadow bg-white">
            <div style="display: flex;">
                <div style="flex:3">
                    <div class="c-key-row" v-for="item in keyboard">
                        <button class="c-key padding-xs radius shadow bg-white" v-for="it in item"
                                @click.native="clickKeyNum(it)"
                                :style="{flex:it instanceof Object?it.span:1}">
                            {{it instanceof Object?it.value:it}}
                        </button>
                    </div>
                </div>

                <div style="flex:1" class="c-btns">
                    <button class="c-key-clear  padding-xs radius shadow bg-white"
                            style="flex:1"
                            @click.native="clickKeyClear">清除
                    </button>
                    <button class="c-key  padding-xs radius shadow bg-white"
                            :style="{'background-color':currentColor}"
                            style="flex:1" @click.native="clickChangeStyle">换色
                    </button>
                    <button class="c-key-add  padding-xs radius shadow bg-white c-key-add"
                            @click.native="clickKeyAdd"
                    >录入
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    const tagColorList = ['#99CC00', '#CC9933', '#996699', '#336666']
    export default {
        name: "Check",
        data() {
            return {
                checkSum: 0,
                checkCount: 0,
                keyboard: [
                    ['7', '8', '9'],
                    ['4', '5', '6'],
                    ['1', '2', '3'],
                    [{value: '0', span: 2}, {value: '.', span: 1}],
                ],
                // 录入的项目列表
                itemList: [],
                tempNumStr: '',
                currentStyle: 0,
                currentColor: tagColorList[0],
                hint: '下方键盘录入数据...',
                showCompare: false,
                showTool: false,
                inputSum: '',
                compareResult: 0,
                test: '',
                start: 0,
                toolKg: '',
                toolW: '',
                toolPrice: '',
                showPrice: '',
                showW: '',
            }
        },
        watch: {
            inputSum() {
                this.compareResult = this.accSub(this.checkSum, this.inputSum)
            },
            toolPrice() {
                if (this.toolKg) {
                    this.showW = this.toolPrice / this.toolKg
                } else {
                    this.showW = ''
                }
            },
            toolW() {
                if (this.toolKg) {
                    this.showPrice = this.toolW * this.toolKg
                } else {
                    this.showPrice = ''
                }
            },
        },
        methods: {
            clickTag(item) {
                item.enable = !item.enable
                this.check()
            },
            clickShowCompare() {
                this.showCompare = true
                this.compareResult = this.accSub(this.checkSum, this.inputSum)
            },
            clickShowTool() {
                this.showTool = true
            },
            clickShowCompareHidden() {
                this.showCompare = false
            },
            accSub(arg1, arg2) {
                var r1, r2, m, n;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                } catch (e) {
                    r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
                n = (r1 >= r2) ? r1 : r2;
                return ((arg1 * m - arg2 * m) / m).toFixed(n);
            }
            ,
            accAdd(arg1, arg2) {
                var r1, r2, m, c;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                } catch (e) {
                    r2 = 0;
                }
                c = Math.abs(r1 - r2);
                m = Math.pow(10, Math.max(r1, r2));
                if (c > 0) {
                    var cm = Math.pow(10, c);
                    if (r1 > r2) {
                        arg1 = Number(arg1.toString().replace(".", ""));
                        arg2 = Number(arg2.toString().replace(".", "")) * cm;
                    } else {
                        arg1 = Number(arg1.toString().replace(".", "")) * cm;
                        arg2 = Number(arg2.toString().replace(".", ""));
                    }
                } else {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
                return (arg1 + arg2) / m;
            }
            ,
            check() {
                let okList = this.itemList.filter(item => {
                        return item.enable
                    }
                )
                this.checkCount = okList.length
                let sum = 0
                okList.forEach(a => {
                    sum = this.accAdd(sum, a.value)
                })
                this.checkSum = sum
            }
            ,
            clickClear() {
                this.currentStyle = 0
                this.currentColor = tagColorList[0]
                this.tempNumStr = ''
                this.itemList.splice(0, this.itemList.length)
                this.check()

            }
            ,
            clickChangeStyle() {
                this.currentStyle = ++this.currentStyle % tagColorList.length
                this.currentColor = tagColorList[this.currentStyle]
            }
            ,
            formatNum(num) {
                return num
            }
            ,
            clickKeyClear() {
                this.tempNumStr = ''
            }
            ,
            clickKeyAdd() {
                if (this.tempNumStr.length === 0 || this.tempNumStr === '0') {
                    return
                }
                this.itemList.push({
                        value: parseFloat(this.tempNumStr),
                        color: this.currentColor,
                        enable: true
                    }
                )
                this.clickKeyClear()
                this.check()
            }
            ,
            clickKeyTest() {
                this.tempNumStr += "1"
            },
            clickKeyTestEnd() {
                this.tempNumStr += "1"
            },
            /**
             * 点击键盘数字
             */
            clickKeyNum(key) {
                let value = key instanceof Object ? key.value : key
                if (value === "." && this.tempNumStr.indexOf('.') >= 0) {
                    //不允许多个小数点
                    return
                }
                if (this.tempNumStr.indexOf('.') < 0 && this.tempNumStr.indexOf('0') === 0 && value === '0' && this.tempNumStr.length <= 1) {
                    // 没有小数点，第一位为0后不能在录入0
                    return
                }
                this.tempNumStr += value
            }
        }
    }
</script>

<style scoped>
    page {
        height: 100%;
    }

    .c-num {
        font-size: 1.5rem;
        margin-left: 10px;
        margin-right: 10px;
        color: #66CC99;
    }

    .c-num-more {
        font-size: 1.5rem;
        margin-left: 10px;
        margin-right: 10px;
        color: #66CC99;
    }

    .c-num-less {
        font-size: 1.5rem;
        margin-left: 10px;
        margin-right: 10px;
        color: #FF9999;
    }

    .c-key-row {
        display: flex;
        margin: -5px 0px 0px -5px;
    }

    .c-body {
        height: 100%;
        overflow: auto;
    }

    .c-key {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #339999;
        color: white;
        font-weight: bold;
        margin: 5px;
        flex: 1 !important;
    }

    .c-key:active {
        background-color: #66CCCC;
    }

    .c-key-add:active {
        background-color: #CC9999;
    }

    .c-key-clear:active {
        background-color: #FF9999;
    }

    .c-key-add {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        margin: 5px;
        flex: 2;
        background-color: #666666;
    }

    .c-key-clear {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        margin: 5px;
        flex: 1;
        background-color: #FF6666
    }

    .c-btns {
        display: flex;
        flex-direction: column;
        margin: -5px 0px 0px -5px;
    }

    .num-tag-list {
        height: 0;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        align-content: baseline;
        flex: 1;
    }

    .num-tag {
        margin-bottom: 10px;
        color: white;
        background-color: #4cd964 !important;
    }

    .tag-block {
        display: flex;
        flex-direction: column;
    }

    .tag-dis {
        background-color: grey;
    }
</style>
