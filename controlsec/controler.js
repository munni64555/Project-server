import mymodel from "../schemas/Schemaa.js"
import appiconmodel from "../schemas/appschematype.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
export const home = (req, res) => {
    res.send("this is home page")
}
export const about = (req, res) => {
    res.send("this is about page")
}
export const service = (req, res) => {
    res.send("this is service page")
}
export const product = (req, res) => {
    res.send("this is product page")
}
export const contact = (req, res) => {
    res.send("this is contact page")
}
export const apilist = async (req, res) => {
    const empdata = await mymodel.find();
    res.status(200).json({ datalist: empdata })
}
export const applistdata = async (req, res) => {
    const allmenu = await appiconmodel.find();
    res.status(200).json({ addlist: allmenu });
}

/* export const userRegisterControl = async (req,res)=>{
        const {FullName,Email,Password,ConfirmPassword} = req.body;
        const rdata = await mymodel.insertOne({FullName,Email,Password,ConfirmPassword});
        //res.status(200).json({userinfo:rdata});

        res.status(200).json({userinfo:rdata,msg:"user register successfully",status:220});
    }
 */

export const userRegisterControl = async (req, res) => {
    const { FullName, Email, Password, Address, DOB, Course, Phone, Profile } = req.body;
    const alldata = await mymodel.findOne({ Email: Email });
    console.log("FindOne:", alldata);
    if (alldata) {
        if (alldata.Email === Email) {
            res.status(200).json({ userinfo: alldata, msg: "Email already exits", status: 230 });
        }
    }
    else {
        const mypass = bcrypt.hashSync(Password, 10);
        const rdata = await mymodel.insertOne({ FullName, Email, Phone, Password: mypass, Address, DOB, Course, Profile });
        res.status(200).json({ userinfo: rdata, msg: "user register successfully", status: 220 });
    }
}
/* 
export const logincontrol = async (req, res) => {
    const { Email, Password } = req.body;
    if (Email == "") {
        res.status(200).json({ msg: "email is required", status: 210 });
    }
    if (Password == "") {
        res.status(200).json({ msg: "password is required", status: 211 });
    }

    if (Email) {
        const userdata = await mymodel.findOne({ Email: Email });
        if (!userdata) {
            res.status(200).json({ msg: "email not found", status: 260 });
        }
        const passwordcomp = await bcrypt.compareSync(Password, userdata.Password)
        if (Email == userdata.Email && passwordcomp) {
            const mytoken = jwt.sign({FullName:"muskan"},"hello",{expiresIn:"1h"});
            res.cookie("token", mytoken,{
                httpOnly:true,
                secure:true,
                sameSite:"none",
                max:60*60*1000
            })
            res.status(200).json({ msg: "welcome to dashbord", status: 251, userinfo: userdata.Email, token:mytoken});
        }
        else {
            res.status(200).json({ msg: "email and password worng", status: 240 });
        }
    }
}
 */ 
export const logincontrol = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email) {
            return res.status(200).json({
                msg: "Email is required",
                status: 210
            });
        }

        if (!Password) {
            return res.status(200).json({
                msg: "Password is required",
                status: 211
            });
        }

        const userdata = await mymodel.findOne({ Email });

        if (!userdata) {
            return res.status(200).json({
                msg: "Email not found",
                status: 260
            });
        }

        const passwordMatch = bcrypt.compareSync(
            Password,
            userdata.Password
        );

        if (!passwordMatch) {
            return res.status(200).json({
                msg: "Email or Password Wrong",
                status: 240
            });
        }

        const token = jwt.sign(
            {
                id: userdata._id,
                FullName: userdata.FullName,
                Email: userdata.Email
            },
            "jksdhfjafgbjhf",
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token, {
           httpOnly:true,
                secure:true,
                sameSite:"none",
            maxAge: 60 * 60 * 1000
        });

        console.log("COOKIE SENT");
        console.log(res.getHeaders());

        return res.status(200).json({
    msg: "Welcome to Dashboard",
    status: 251,
    userinfo: userdata.Email,
    token: token
});
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            msg: "Server Error",
            status: 500
        });
    }
}; 

export const singleusercontrol = async (req, res) => {
    const { Email } = req.body;
    console.log(req.body);
    if (Email) {
        const singleuserdata = await mymodel.findOne({ Email: Email });
        console.log(singleuserdata + "abc");
        res.status(200).json({ msg: "user found", status: 240, userlist: singleuserdata });

    }
    else {
        res.status(200).json({ msg: "user not found", status: 241 })
    }
}


export const userdeletecontrol = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const userd = await mymodel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "user delete successfully", status: 301 })
}

/*     export const singledatacontrol = async(req,res) =>{
        const id =req.params.id;
        const single = await mymodel.find({_id:id});
        res.status(200).json({msg:"found user", status:251,user:single});
    } */

export const singledatacontrol = async (req, res) => {
    const id = req.params.id;
    const single = await mymodel.findById(id);
    res.status(200).json({ msg: "found user", status: 251, user: single });

}

export const userupdatecontrol = async (req, res) => {
    const id = req.params.id;
    const updateinfo = await mymodel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: 'user updateed sucessfully', status: 302, user: updateinfo });
}



/* export const apilist= async(req,res)=>{
    const empdata= await mymodel.find({eyeColor:"Blue"});
    res.status(200).json({datalist:empdata})
} */

/*  export const apilist= async(req,res)=>{
 const empdata= await mymodel.find({"firstName": "Emily"});
 res.status(200).json({datalist:empdata})
} */

/*  export const apilist= async(req,res)=>{
const empdata= await mymodel.find({"age":{$gte: "39"}});
console.log(empdata);
res.status(200).json({datalist:empdata})
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({"age":{$lt: "39"}});
console.log(empdata);
res.status(200).json({datalist:empdata})
} */

/* export const apilist= async(req,res)=>{
   const empdata= await mymodel.find({"age":{$lte: "29"}});
   console.log(empdata);
   res.status(200).json({datalist:empdata})
} */

/*      export const apilist= async(req,res)=>{
    const empdata= await mymodel.find({"age":{$eq: "23"}});
    console.log(empdata);
    res.status(200).json({datalist:empdata})
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({"id":{$gte:1,$lte:10}});
res.status(200).json({datalist:empdata})
}
*/

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({$and:[{"age":{$gte:"23"}},{"age":{$lte:"26"}}]});
console.log(empdata);
res.status(200).json({datalist:empdata})
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({$or:[{"id":1},{"id":10}]});
console.log(empdata);
res.status(200).json({datalist:empdata})
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({"id":{$in:[1,10]}});
console.log(empdata);
res.status(200).json({datalist:empdata})
} */

/*      export const apilist= async(req,res)=>{
    const empdata= await mymodel.find({$or:[{"age":"23"},{"age":"26"},{"age":"29"}]});
    res.status(200).json({datalist:empdata})
} */

/*
// ager koi 1 condistion true to dono true
export const apilist= async(req,res)=>{
const empdata= await mymodel.find({$or:[{"age":{$lte:"23"}},{"gender":"female"}]});
res.status(200).json({datalist:empdata})     //age aur gender me se koi bhi match ho to record aa jayega
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({},{"age":1});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({},{"address":1});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({},{"age":1,"gender":1});
res.status(200).json({datalist:empdata})     
} */

/*     export const apilist= async(req,res)=>{
    const empdata= await mymodel.find({},{'hair.type':1});
    res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({},{'company.address.coordinates.lat':1});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({"firstName":"Emily"},{_id:0});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({"firstName":/^E/});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find({"firstName":/a$/});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.deleteMany();
res.status(200).json({datalist:empdata})     
} */

/* export const apilist1= async(req,res)=>{
const empdata= await mymodel.deleteOne({"firstName":"Emily"});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.find();
res.status(200).json({datalist:empdata})     
}*/

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.insertMany([{"firstname":"Emily" ,"secondname":"khatoon"}]);
res.status(200).json({datalist:empdata})     
}  */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.insertOne({"age":"22"});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.updateOne({"firstname":"afrida","secondname":"ansari"});
res.status(200).json({datalist:empdata})     
} */

/* export const apilist= async(req,res)=>{
const empdata= await mymodel.updateMeny({"firstname":"afrida","secondname":"ansari"});
res.status(200).json({datalist:empdata})     
} */

