const mongoose = require("mongoose");
const request = require("supertest");
const User = require('/Users/meimeixiong/Desktop/Desktop/Desktop Documents/Coding/CodeSmith/Immersive Program/Projects/OSP/Orcastration/server/models/userModel.js');
const bcrypt = require('bcryptjs');

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



describe('Login?',() => {

    beforeEach (async () => (
        await new User({
            email: "testpassword@test.com",
            password: "match"
        }).save()
    ));

    //find and delete the email created for verification to comply with 'unique' rule of MongoDB
    afterEach (async () => (
        await User.findOneAndDelete({email: "testpassword@test.com"})
    ));

    
    it("should throw an error if password is wrong", async () => {
     try {
        let userEmail = await User.find({ email: "testpassword@test.com" })
        console.log('userEmail', userEmail);
        let wrongPassword = "abc"
        //create userSchema.authenticate in userModels.js but it is not working
        const result = await bcrypt.compare(wrongPassword, userEmail[0].password)
        console.log('result', result);
        expect(result).toEqual(false)
     }
      catch (err) {
        throw new Error(err)
    }

}); 
})
