import { Schema, model, models } from "mongoose";

const UserSchema:any = new Schema({
    username: {type: String, required: true},
    profilePhotos: {
        type: String,
        default: function () {
            return `https://secure.gravatar.com/${UserSchema._id}?s-98&d-identicon`;
        }
    }
});

UserSchema.set("toJSON", { getters: true });

UserSchema.options.toJSON.transform = (doc:any, ret:any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
};

const User = models.User || model("User", UserSchema);
export default User;