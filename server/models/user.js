const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // BASIC IDENTITY
    name: {
      type: String,
      required: true,
      trim: true
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    email: {
      type: String,
      unique: true,
      sparse: true // allows null but still enforces uniqueness
    },

    mobileNumber: {
      type: String,
      unique: true,
      sparse: true // user can register via email OR mobile
    },

    password: {
      type: String,
      required: true
    },

    // PERSONAL INFO
    birthdate: {
      type: Date,
      required: true
    },

    gender: {
      type: String,
      enum: ["male", "female", "custom", "prefer_not_to_say"],
      default: "prefer_not_to_say"
    },

    // PROFILE
    profilePicture: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      maxlength: 160
    },

    location: {
      type: String
    },

    relationshipStatus: {
      type: String,
      enum: ["single", "in_a_relationship", "married", "complicated"],
    },

    // SOCIAL GRAPH
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    friendRequests: {
      sent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      received: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },

    // SETTINGS
    isAdmin: {
      type: Boolean,
      default: false
    },

    isVerified: {
      type: Boolean,
      default: false // email / mobile verification
    },

    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);