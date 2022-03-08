console.log("lol")
const vm = new Vue({
    el:"#app",
    data:{
        email:"",
        password:"",
        passwordConfirm:"",
        message:"",
        messageStyle:"color:red"
    },
    methods:{
        async registration(){
            const {email,password,passwordConfirm} = this;
            let data;
            try{
                data = await axios.post("/registration",{email,password,passwordConfirm})
                this.messageStyle="color:green"
            }catch(e){
                data = e.response;
                this.messageStyle="color:red"
            }
            let message = data.data.message
            if(message) this.message = message
        },
        async auth(){
            const {email,password,passwordConfirm} = this;
            let data;
            try{
                data = await axios.post("/auth",{email,password})
                this.messageStyle="color:green"
            }catch(e){
                data = e.response;
                this.messageStyle="color:red"
            }
            let message = data.data.message
            if(message) this.message = message
        }
    }
})