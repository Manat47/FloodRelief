const sendNotification = async (recipient_id, message) => {
    try {
        console.log(`🔔 ส่งแจ้งเตือนถึง ${recipient_id}: ${message}`);
        // สมมติว่าใช้ Firebase Cloud Messaging (FCM) สามารถเพิ่มโค้ดตรงนี้ได้
    } catch (error) {
        console.error("❌ แจ้งเตือนล้มเหลว:", error);
    }
};

module.exports = sendNotification;
