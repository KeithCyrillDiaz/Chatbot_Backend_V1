import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    role: {
      type: String,
      enum: ["user", "model"], // Ensures only allowed roles are used
      required: true
    },
    parts: [
      {
        text: {
          type: String,
          required: false // Optional in case you support images or other data types
        },
        inlineData: {
          mimeType: String,
          data: String // base64 string
        }
      }
    ],
    timestamp: {
      type: Date,
      default: Date.now
    }
  });


const promptsSchema = new mongoose.Schema({
    modelName: {type: String, required: true},
    projectName: {type: String, required: true},
    userMessage: {type: String, required: true},
    assistantMessage: {type: String, required: true},
    history: {type: historySchema, required: true}
}, {timestamps: true});

export const PromptsModel = mongoose.model("Prompts", promptsSchema);