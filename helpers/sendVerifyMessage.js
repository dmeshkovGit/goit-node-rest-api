import sendMail from "./mail.js";

export default function sendVerifyMessage(email, verifyToken) {
  const verifyMessage = {
    from: `"Contacts App" <${process.env.NODEMAIL_EMAIL}>`,
    to: email,
    subject: "Email verification",
    html: `To confirm your email please click on the <a href="${process.env.VERIFY_URL}${verifyToken}">link</a>`,
    text: `To confirm your email please open the link ${process.env.VERIFY_URL}${verifyToken}`,
  };

  sendMail(verifyMessage);
}
