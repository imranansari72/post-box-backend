import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    likes: {
      type: Array,
      default: [
        {
          userId: {
            type: String,
          },
        },
      ],
    },
    comments: {
      type: Array,
      default: [
        {
          userId: {
            type: String,
          },
          text: {
            type: String,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
