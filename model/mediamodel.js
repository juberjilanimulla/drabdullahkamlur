import { Schema, model } from "mongoose";

const mediaSchema = new Schema(
  {
    image: {
      type: String,
      default: "",
    },
    title: String,
    description: String,
  },
  { timestamps: true, versionKey: false }
);

function currentLocalTimePlusOffset() {
  const now = new Date();
  const offset = 5.5 * 60 * 60 * 1000;
  return new Date(now.getTime() + offset);
}

// Middleware to update timestamps
mediaSchema.pre("save", function (next) {
  const currentTime = currentLocalTimePlusOffset();
  this.createdAt = currentTime;
  this.updatedAt = currentTime;
  next();
});

mediaSchema.pre("findOneAndUpdate", function (next) {
  const currentTime = currentLocalTimePlusOffset();
  this.set({ updatedAt: currentTime });
  next();
});

const mediamodel = model("media", mediaSchema);
export default mediamodel;
