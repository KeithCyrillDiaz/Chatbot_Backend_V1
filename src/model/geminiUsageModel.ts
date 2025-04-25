
import mongoose from "mongoose";

// RATE LIMITS
// 15 RPM
// 1,000,000 TPM
// 1,500 RPD

const RATE_LIMITS = {
    requestPerMinute: 14,
    tokenPerMonth: 999_999, //1million - 1
    requestPerDay: 1_499,
    tokenPerDay: 32_258,
}

export const GEMINI_USAGE_MESSAGES = {
    RPM: "Request Per Minute Has Exceeded",
    RPD: "Request Per Day has exceeded",
    TPD: "Token Per Day has exceeded",
    TPM: "Token Per Month has exceeded"
}

const isLimit = (value1: number, value2: number):boolean => {
    return value1 <= value2;
}

const GeminiUsageSchema = new mongoose.Schema({

    requestPerMinute:{type: Number, default: 0, validate: {
        validator: (value: number) => isLimit(value, RATE_LIMITS.requestPerMinute),
        message: GEMINI_USAGE_MESSAGES.RPM
    }},
    requestPerDay: {type: Number, default: 0, validate: {
        validator: (value: number) => isLimit(value, RATE_LIMITS.requestPerDay),
        message: GEMINI_USAGE_MESSAGES.RPD
    }},
 
    tokenPerDay: {type: Number, default: 0, validate: {
        validator: (value: number) => isLimit(value, RATE_LIMITS.tokenPerDay),
        message: GEMINI_USAGE_MESSAGES.TPD
    }},
    tokenPerMonth:{type: Number, default: 0, validate: {
        validator: (value: number) => isLimit(value, RATE_LIMITS.tokenPerMonth),
        message: GEMINI_USAGE_MESSAGES.TPM
    }},

}, {timestamps: true})

export const GeminiUsageModel = mongoose.model("GeminiUsage", GeminiUsageSchema);