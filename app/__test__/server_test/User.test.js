const mongoose = require("mongoose");
const request = require("supertest");
const User = require('/Users/meimeixiong/Desktop/Desktop/Desktop Documents/Coding/CodeSmith/Immersive Program/Projects/OSP/Orcastration/server/models/userModel.js');
//server/models/userModel.js
require("dotenv").config();

beforeAll(async () => {  
   mongoose.connect ( 'mongodb+srv://max:123@users.jfqv078.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
mongoose.connection.on( 'error', () => {
    throw new Error ('cannot connect to database')
});
});

afterAll(async () => {
    try {
      await mongoose.connection.close()
    } catch (err) {
      console.log(err)
    }
  });

describe('User',() => {

    beforeEach (async () => (
        await new User({
            email: "createuser18@test.com",
            password: "working"
        }).save()
    ));

    //find and delete the email created for verification to comply with 'unique' rule of MongoDB
    afterEach (async () => (
        await User.findOneAndDelete({email: "createuser18@test.com"})
    ));

    it("should create a new user", async () => {

    //const { email } = req.query;
    //let result = await User.find({email})
    //const emailTest = result.email

    // const findEmail = async(req, res) => {
    //     const { _id } = req.query;
    //     let result = await User.find({_id})
    //      const email = result.email
    // expect(email).toBe("createuser8@test.com");
    // }
    User.find({email: "createuser18@test.com"})
      .then((user) => expect(user[0].email).toBe("createuser18@test.com"))
    
       
    //    // expect(response.password).toBe("working");
     
})
})


 
