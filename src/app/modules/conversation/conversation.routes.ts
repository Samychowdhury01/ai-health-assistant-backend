import { Router } from "express";
import { ConversationControllers } from "./conversation.controller";

const router = Router()

router.get('/:userId', ConversationControllers.getUserConversation)
router.post('/', ConversationControllers.createConversation)
router.put('/:id', ConversationControllers.updateConversation)
export const ConversationRoutes = router