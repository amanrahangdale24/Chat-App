import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import User from "../models/User.js";


export const getAllContacts = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password"); // find all expect the logged in users. 
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getAllContacts controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessagesByUserId controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;
        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.equals(recieverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        const receiverExists = await User.exists({ _id: recieverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }
        let imageUrl;

        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })
        await newMessage.save();
        
        const receiverSocketId = getReceiverSocketId(recieverId);
        if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        //find all the messages where the logged-in user is either sender or reciever. 
        const messages = await Message.find({
            $or: [{ senderId: loggedInUser }, { recieverId: loggedInUser }]
        })

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) => {
                    // If the logged-in user is the sender, the partner is the receiver;
                    // otherwise (logged-in user is the receiver), the partner is the sender.
                    return msg.senderId.toString() === loggedInUser.toString()
                        ? msg.recieverId.toString()
                        : msg.senderId.toString();
                })
            )
        ]

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        res.status(200).json(chatPartners);

    } catch (error) {
        console.log("Error in getChatPartners controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}