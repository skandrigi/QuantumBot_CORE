const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { logger } = functions;

exports.addMessage = function.https.onCall(async {data, context} => {
    try {
        logger.log("Received message request data:", data);

        if (!data.text || !data.userId) {
            logger.log("required fields (text or userId) are missing");
            throw new functions.https.HttpsError(
                "invalid-argument",
                "Required fields (text or userId) are missing"
            );
        }

        const {text, userId} = data;

        const messageData = {
            text,
            userId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        };

        const messageRef = await admin
        .firestore()
        .collection("chats")
        .doc(userId)
    }
})