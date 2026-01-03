import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String
    },

    mobile: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "owner", "deliveryBoy"],
      required: true
    },

    /*  EMAIL VERIFICATION  */
    isEmailVerified: {
      type: Boolean,
      default: false
    },

    emailVerifyToken: {
      type: String
    },

    emailVerifyExpires: {
      type: Date
    },

    /* OTP (FOR PASSWORD RESET) */
    resetOtp: {
      type: String
    },

    isOtpVerified: {
      type: Boolean,
      default: false
    },

    otpExpires: {
      type: Date
    },

    /*  SOCKET */
    socketId: {
      type: String
    },

    isOnline: {
      type: Boolean,
      default: false
    },

    /* LOCATION  */
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  { timestamps: true }
);

/*  GEO INDEX  */
userSchema.index({ location: "2dsphere" });
// ⏳ Auto-delete unverified users after expiry
userSchema.index(
  { emailVerifyExpires: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { isEmailVerified: false }
  }
);


const User = mongoose.model("User", userSchema);
export default User;






// import mongoose from "mongoose";
// import { type } from "os";

// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique:true
//     },
//     password:{
//         type: String,
//     },
//     mobile:{
//         type: String,
//         required: true, 
//     },
//     role:{
//         type:String,
//         enum:["user","owner","deliveryBoy"],
//         required:true
//     },
//     resetOtp:{
//         type:String
//     },
//     isOtpVerified:{
//         type:Boolean,
//         default:false
//     },
//     otpExpires:{
//         type:Date
//     },
//     socketId:{
//      type:String,
     
//     },
//     isOnline:{
//         type:Boolean,
//         default:false
//     },
//    location:{
// type:{type:String,enum:['Point'],default:'Point'},
// coordinates:{type:[Number],default:[0,0]}
//    }
  
// }, { timestamps: true })

// userSchema.index({location:'2dsphere'})


// const User=mongoose.model("User",userSchema)
// export default User
