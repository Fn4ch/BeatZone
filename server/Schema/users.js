import User from '../models/user'
import { ApolloError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

module.exports = {
    Mutation: {
        async registerUser(_,{registerInput: {usernamem, password, email}})
        {
            const oldUser = await User.findOne({email})

            if(oldUser)
            throw new ApolloError('Пользователь с таким email уже зарегистрирован:' + email,'USER_ALREADY_EXISTS')

            let encryptedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                username: username,
                email: email.toLowercase(),
                passwrod: encryptedPassword
            })

            const token = jwt.sign({user_id: newUser._id,email}, "UNSAFE_STRING", {expiresIn: "4h"})

            newUser.token = token

            const res = await newUser.save()
            return{
                id: res.id,
                ...res._doc
            }
        }
    }
}