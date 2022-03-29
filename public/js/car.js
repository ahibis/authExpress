
const vm = new Vue({
    el:"#app",
    data:{
        cars:[]
    },
    async mounted() {
        this.cars = (await axios.get("/v1/car")).data
    },
})