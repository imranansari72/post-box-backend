import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      min: 6,
    },
    profilePicture: {
      data: Buffer,
      contentType: String,
    },
    coverPicture: {
      data: Buffer,
      contentType: String,
    },

    friends: {
      type: Array,
      default: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          friendSince: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    savedPosts: {
      type: Array,
      default: [
        {
          postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
          },
          savedSince: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },

  {
    timestamps: true,
  }
);

// hash password before saving to database

userSchema.pre("save", function (next) {
  console.log("this", this);
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

export default mongoose.model("User", userSchema);
