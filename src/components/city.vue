<template>
    <div class="citylist">
        <div id="crm">
            <p>热门城市</p>
            <div class="chot">
                <p v-for="ho in hotcity" :key="ho.id" @click="handlecity(ho.id,ho.nm)">{{ho.nm}}</p>
            </div>
        </div>

        <div class="en" v-for="i in en" :key="i.id">
            <p :id="i" style="height: 1px;"></p>
            <p>{{handleen(i)}}</p>
            <div class="zh" v-for="ci in city.cts" v-if="handlezh(ci.py,i)" :key="ci.id">
                <p @click="handlecity(ci.id,ci.nm)">{{ci.nm}}</p>
            </div>
        </div>
        <div class="ciright" @touchstart.stop.prevent @touchmove.stop.prevent>
            <p @touchend="scrollTo('crm')">#</p>
            <p v-for="it in en" @touchend="scrollTo(it)" :key="it.id">{{handleen(it)}}</p>
        </div>
    </div>
</template>

<script>
import citylist from "../../city.json";
export default {
    name: "city",
    created() {
        //	console.log(citylist.cts)
        this.city = citylist;

        for (let m = 0; m < 9; m++) {
            this.hotcity.push(citylist.cts[m]);
        }
        for (let i = 0; i < citylist.cts.length; i++) {
            let bFlag = true;
            if (this.en.length == 0) {
                this.en.push(citylist.cts[i].py.substring(0, 1));
            }
            for (let j = 0; j < this.en.length; j++) {
                if (citylist.cts[i].py.substring(0, 1) == this.en[j]) {
                    bFlag = false;
                }
            }
            if (bFlag) {
                this.en.push(citylist.cts[i].py.substring(0, 1));
            }
        }
        this.en = this.en.sort();
    },
    computed: {
        cityTitle() {
            //数据依赖更新是，计算属性重新触发更新
            return this.$store.state.cityId;
        }
    },
    data() {
        return {
            city: "",
            en: [],
            hotcity: []
        };
    },
    methods: {
        handleen(i) {
            return i.toUpperCase();
        },
        handlezh(k, j) {
            return k.substring(0, 1) == j;
        },
        handlecity(id, nm) {
            this.$store.commit("changeCity", { id: id, nm: nm });
            this.$router.push({ path: "/" });
        },
        scrollTo(id) {
            var id = document.getElementById(id);
            window.scrollTo(0, id.offsetTop - 40);
        }
    },
    components: {}
};
</script>

<style scoped lang="scss">
.citylist {
	position: absolute;
	top: 50px;
	left: 0;
	z-index: 1000;
	background-color: #fff;
	right: 0;
	bottom: 0;
    #crm,
    .en {
        background-color: #d8d8d8;
        p {
            line-height: 30px;
            margin-left: 15px;
        }
    }
    .chot {
        background-color: #f5f5f5;
        padding: 10px 0;
        p {
            text-align: center;
            display: inline-block;
            background-color: white;
            width: 27%;
            margin: 5px 0;
        }
    }
    .zh {
        background-color: #f5f5f5;
        p {
            margin-left: 15px;
            line-height: 44px;
            width: 90%;
            border-bottom: 1px solid #c8c7cc;
        }
    }
    .ciright {
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        p {
            margin-top: 5px;
            width: 25px;
            text-align: center;
        }
    }
    a {
        color: black;
    }
}
</style>