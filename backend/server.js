import express from 'express'
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs'
import multer, { diskStorage } from 'multer';
import path from 'path';
// import validate from 'mongoose-validator'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
// const { sign } = jwt;


const app = express()
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.static('public'))
const router = express.Router();

main()
  
async function main() {
    await mongoose.connect('mongodb+srv://blessan:cqEL6bg3zdTt3Rjc@task-manager.or5zbep.mongodb.net/?retryWrites=true&w=majority')

    const ProductSchema = new mongoose.Schema({
        pid: Number,
        name: String,
        price:Number,
        image:String,
        description:String
    })

    const UserSchema = new mongoose.Schema({
        name: {
            type:String,
            required:true,
            trim:true
        } , 
        username: {
            type:String,
            required:true,
            trim:true
        },
        email: {
            type: String,
            required:true,
            trim:true,
            unique:true,
            // validate(value) {
            //     if(!validator.isEmail(value)) {
            //         throw new Error('Email is invalid')
            //     }
                
            // }

        },
        password: {
            type: String,
            required:true,
            minlength:7,
            trim:true,
            // validate(value) {
                
            // }
        },
        image:{
            type:String
        },
        token: {
            type:String , 
            default:null
        }
    })

    const User = mongoose.model('User' , UserSchema)

    // UserSchema.pre('create', async function (next) {
    //     const user = this

    //     if(user.isModified('password')) {
    //         user.password = await bcrypt.hash(user.password, 8)
    //     }
    //     next()
    // })
    // const storage = multer.diskStorage( {
    //     destination:(req,res,cb) => {
    //         cb(null,'public/Images')

    //     },
    //     // filename:(req,file,cb) => {
    //     //     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    //     // }
    //     filename:(req,file,cb) => {
    //         cb(null, file)
    //     }
    // })

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
         cb(null, 'public/Images');
            },
         filename: (req, file, cb) => {
            // const originalname = file.originalname;
            // const extension = originalname.split(".");
            // filename = Date.now() + '.' + extension[extension.length-1];
            cb(null,file.originalname);
            // cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
          }
        });

    // console.log("multer filename" , filename)

    const upload = multer({
        storage:storage  
    })

    app.post('/upload' , upload.single('file'),(req,res) => {
        console.log("This is the request made ",req.file.filename)
        // const filter =  req.body.params.email
        // const filterTwo = {email:filter}
        
        console.log("new email" , filter)
        // console.log("rewueest" ,req.body)
        // const update = { image: req.body.params.formdata}
        const update = { image: req.file.filename}
        const opts = { new: true, upsert: true };
        
        User.findOneAndUpdate({image:req.file.filename})
        // User.findOneAndUpdate(filterTwo,update,opts)
        // User.findOneAndUpdate(filterTwo,update,opts)
        .then(result => res.json(result))
        .catch(err => console.log(err))
        
    })

    // app.get('/public/Images' , async(req,res) => {
    //     const img = 'file_1690094726351.png'
    //     // console.log(" The required image ",img)
    //     res.send(img)
    // })
    // .then(img => res.send(img))
    // .catch(err => console.log(err))

    app.get('/getImage' , async (req,res) => {
        const condition = req.query.email
        
        const users =  await User.findOne({email:condition})
        const infoNeeded = users.image
        // console.log("From condition" , infoNeeded)
        res.send(infoNeeded)
        // .then(users => res.json(users))
        // .catch(err => console.log(err))
    } )










    const Product = mongoose.model('Product', ProductSchema);

    const persons = await Product.find()
    // .then(p => console.log(p))
    .then(console.log(' Product found '))
    .catch(error => console.log(error));
    

    app.get('/api/products' , (req,res) => {
      
        res.send(persons);
    })

    app.post("/login" , async(req,res) => {
        const {email,password} = req.body

        try {
            const check = await User.findOne({email:email})
            console.log(check)
            const isMatch = await bcrypt.compare(password , check.password)
            if(check.email===email && isMatch) {
                console.log("matching")
                res.send(["exist" , check])
                // res.cookie(Name, "Hello")
            }
            else if(check.email!==email || !isMatch){
                res.json("Invalid Credentials")
            }
        }
        catch(e){
            res.json("Not exist")
        }
        // const options = {
        //     expiresIn:"2h",
        //     httpOnly:true
        // }
        // res.status(200).cookie("token" , check.token , options).json({
        //     success:true,
        //     token
        // })
        // res.cookie("jwtoken" , check.token)
    })

    /////////////////// COOKIE section ///////////////////////

    



////////////////////Token - jwt //////////////////////



// User.token = token



    app.post("/register" , async(req,res) => {
        const {name,username,email,password} = req.body

        const token = jwt.sign(
            {email:email} , 
            'blessan' ,
            {
                expiresIn:"2h"
            }
        )

        const data = {
            name:name,
            email:email,
            username:username,
            password:await bcrypt.hash(password , 8),
            token:token
            
        }

        try {
            const check = await User.findOne({email:email})
            console.log('checkk',check)
            if(check) {
               
                res.json("exist")
            }
            else {
                // console.log('Inside else part')
                await User.create(data)
                res.json("Not exist")
            }
        }
        catch(e){
            // console.log("errorrrr",e)
            res.json("Not exist")
            
        }
    })


    app.get("/api/products/:_id", async(req,res) => {
        try{
            const productId = req.params._id
            const oneProduct = await Product.findById(productId)

            if(!oneProduct) {
                return res.status(404).json({error:'Product not found'})
            }

            res.json(oneProduct)
        }
        catch(error) {
            res.status(500).json({error:'Internal server error'})
        }

      
    })

    app.get("/user/:email" , async(req,res) => {
        try {
            const userEmail = req.params.email
            const userRequired = await User.find({email:userEmail})
            console.log("From user required" ,  userRequired)
            res.json(userRequired)
        }
        catch(error) {
            res.json("Not working ")
        }
    } )

    app.get("/userDetail" , async(req,res) => {
        try {
            const userEmail = req.query.email
            const userRequired = await User.find({email:userEmail})
            console.log("From user required" ,  userRequired)
            res.send(userRequired)
        }
        catch(error) {
            res.json("Not working ")
        }
    } )


    // router.post("/api/Register", async (req, res) => {
    //     let newDocument = {
    //       name: req.body.name,
    //       password: req.body.password,
    //       username: req.body.username,
    //       email:req.body.email
    //     };
    //     let collection = await db.collection("users");
    //     let result = await collection.insertOne(newDocument);
    //     res.send(result).status(204);
    //   });
}


// } catch (e) {
//     console.error(e);
// } finally {
//     await client.close();
// }

// }

// main().catch(console.error);



const port = 5000;

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})

// module.exports = User