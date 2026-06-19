import dotenv from "dotenv";

dotenv.config();

const sendGridKey = process.env.SENDGRID_API_KEY;
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const pushKey = process.env.FCM_SERVER_KEY;

export async function sendEmailNotification(
  to: string,
  subject: string,
  body: string,
) {
  console.log("[NotificationService] Sending email", { to, subject });
  if (!sendGridKey) {
    return { success: false, message: "SendGrid API key not configured." };
  }
  return { success: true, message: "Email sent (stub)" };
}

export async function sendSmsNotification(to: string, body: string) {
  console.log("[NotificationService] Sending SMS", { to, body });
  if (!twilioSid || !twilioToken) {
    return { success: false, message: "Twilio credentials not configured." };
  }
  return { success: true, message: "SMS sent (stub)" };
}

export async function sendPushNotification(
  deviceToken: string,
  title: string,
  body: string,
) {
  console.log("[NotificationService] Sending push notification", {
    deviceToken,
    title,
    body,
  });
  if (!pushKey) {
    return { success: false, message: "FCM server key not configured." };
  }
  return { success: true, message: "Push notification sent (stub)" };
}
