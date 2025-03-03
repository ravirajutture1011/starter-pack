import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        minlength : 3
    },
    password :{
        type : String, 
        required : true,
        minlength : 2
    }
})

const User = mongoose.model('User', userSchema);
export default User;