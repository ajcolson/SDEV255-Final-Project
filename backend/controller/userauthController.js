import express from "express"
import jwt from "jwt-simple"
import bcrypt from "bcryptjs"
import User from "../model/user.js"

const SECRET_KEY = process.env.SECRET_KEY

export const createUser = async (req, res) => {
    try {
    const username = "" + req.body.Username
    const password = "" + req.body.PasswordHash

    if (username == "" || password == "") {
      res.status(400).json({ error: "Missing username and/or password"});
      return;
    }

    // Create a hash for the submitted password
    const NaCL = bcrypt.genSaltSync(42)
    const passHash = bcrypt.hashSync(password, NaCL)
    const newUser = await User.create({
      Username: username,
      PasswordHash: passHash
    })

    await newUser.save()
    res.status(201).json({message:"user created"})
  } catch (ex) {
    res.status(400).json({error:ex.message})
  }
}

export const authUser = async (req, res) => {
  try {
    const username = "" + req.body.Username
    const password = "" + req.body.PasswordHash
    
    if (username == "" || password == "") {
      res.status(401).json({ error: "Missing username and/or password" })
      return;
    }

    // Get user from the database
    const user = await User.findOne({ username: username})
    if (!user)
      res.status(401).json({ error: "Bad username" })
    else {
      // Check if password hash from database matches 
      if (bcrypt.compareSync(password, user.passHash)) {
        // Send back a token that contains username
        const token = jwt.encode({ username: user.username }, SECRET_KEY)
        res.json({ token: token })
      } else res.status(401).json({ error: "Bad password" })                  
    }
  } catch (ex) {
    res.status(400).json({error:ex.message})
  }
}