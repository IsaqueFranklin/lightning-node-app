import { Schema, model, models } from "mongoose";

const PostSchema:any = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
})

PostSchema.set("toJSON", { getters: true });

PostSchema.options.toJSON.transform = (doc:any, ret:any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
};

const User = models.User || model("User", PostSchema);
export default User;