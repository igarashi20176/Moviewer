"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// お気に入りに追加
router.post('/on_fav', async (req, res) => {
    const { user_id, post_id } = req.body;
    try {
        const like = await prisma.like.create({
            data: {
                userId: user_id, postId: post_id
            }
        });
        return res.json(like);
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(e);
            }
        }
        return res.status(400).json(e);
    }
});
// お気に入りから削除 
router.delete('/off_fav', async (req, res) => {
    const { user_id, post_id } = req.body;
    try {
        const like = await prisma.like.delete({
            where: {
                userId_postId: {
                    userId: user_id, postId: post_id
                }
            }
        });
        return res.json(like);
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log(e);
            }
        }
        return res.status(400).json(e);
    }
});
exports.default = router;