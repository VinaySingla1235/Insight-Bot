import User from "../models/User.js";
import { errorHandler } from "../utils/errors.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { ChatCompletionRequestMessage} from "openai";
import OpenAI from "openai";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        const openai = new OpenAI();
        console.log(message);
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return next(errorHandler(401, "User not registered or token malfunctioned"));
        }
        // grab chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        console.log(user.chats);
        // const config = configureOpenAI();
        // const openai = new OpenAIApi();
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        if (chatResponse.choices[0].message) {
            user.chats.push(chatResponse.choices[0].message);
        }
        user.save();
        console.log(user.chats);
        // console.log(chatResponse.choices[0]);
        return res.status(200).json({ "chats": user.chats });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        console.log("verifying user");
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return next(errorHandler(401, "User not registered or malfunctioned"));
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return next(errorHandler(401, "Permissions didn't match"));
        }
        res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        next(error);
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        console.log("verifying user");
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return next(errorHandler(401, "User not registered or malfunctioned"));
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return next(errorHandler(401, "Permissions didn't match"));
        }
        // @ts-ignore 
        user.chats = [];
        await user.save();
        res.status(200).json({ message: "OK" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=chat-controllers.js.map