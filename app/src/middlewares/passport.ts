import passport from 'passport'
import { Strategy } from 'passport-local'
import { Users } from '../models/users'
import { passCheck } from './passCheck'
import { sendEmail } from '../services/nodemailer'


passport.serializeUser((user, done) => {
    done(null, user)
})
  
passport.deserializeUser(async (id, done) => {
    const user: any = await Users.findById(id)  
    done(null, { _id: user._id, email: user.email })
})

passport.use(
    'local-signup',
    new Strategy(
      {
        usernameField: 'fieldEmail',
        passwordField: 'fieldPassword',
        passReqToCallback: true
      },
      async (req, fieldEmail, fieldPassword, done) => {
        try {
            const userExists = await Users.find({ email: fieldEmail })
 
          if (userExists.length > 0) {
           return done(null, false, { message: 'Email already exists' })
          } else {
            const newUser = new Users()
            let avatar = ""
            if (!req.file?.originalname){
              avatar = "NO" 
            }else{
              avatar = req.file?.originalname
            }
            newUser.email = fieldEmail
            //@ts-ignore
            newUser.password = newUser.encryptPassword(fieldPassword)
            newUser.name = req.body.fieldName
            newUser.surname = req.body.fieldSurname
            newUser.address = req.body.fieldAddress
            newUser.age=req.body.fieldAge
            newUser.phone=req.body.fieldPhone
            newUser.pictureName=avatar
         await newUser.save()
         
           let destMail = process.env.DESTMAIL
           let subject = `nuevo usuario Registrado con el username  ${req.body.fieldName}`
           let body = `<pre>${newUser}</pre>`
           
           sendEmail(destMail, body, subject)

            const userFromDatabase: any = await Users.findOne({ email: fieldEmail })
  
            done(null, {
              _id: userFromDatabase._id,
              email: userFromDatabase.email
            })
          }
        } catch (error) {
          console.error(error)
        }
      }
    )
)

passport.use(
    'local-signin',
    new Strategy(
      {
        usernameField: 'fieldEmail',
        passwordField: 'fieldPassword',
        passReqToCallback: true
      },
      async (req, fieldEmail, fieldPassword, done) => {
        try {
          const user = await Users.findOne({ email: fieldEmail })
          if (user === null) {
            return done(null, false, { message: 'User not found' })
          } else if (!passCheck(fieldPassword, user.password)) {
            return done(null, false, { message: 'Wrong password' })
          } else {
            return done(null, { _id: user._id, email: user.email })
          }
        } catch (error) {
          console.log(error)
        }
      }
    )
)