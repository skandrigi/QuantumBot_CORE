const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.addMessage = functions.https.onCall(async (data, context) => {
    try {
        functions.logger.log("Received message request data:", data);

        if (!data.text || !data.userId) {
            functions.logger.log("Required fields (text or userId) are missing");
            throw new functions.https.HttpsError(
                "invalid-argument",
                "Required fields (text or userId) are missing"
            );
        }

        const { text, userId } = data;

        const messageData = {
            text,
            userId,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };

        const messageRef = await admin
            .firestore()
            .collection("chats")
            .doc(userId)
            .collection("messages")
            .add(messageData);

        functions.logger.log("Message added successfully, message ID:", messageRef.id);
        return { messageId: messageRef.id };  // Return the message ID to the client

    } catch (error) {
        functions.logger.error("Error adding message:", error);
        throw new functions.https.HttpsError(
            "unknown",
            "An error occurred while adding the message",
            error.message
        );
    }
});
