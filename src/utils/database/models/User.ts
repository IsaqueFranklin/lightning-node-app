import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true},
})