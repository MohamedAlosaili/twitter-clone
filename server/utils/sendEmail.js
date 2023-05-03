import crypto from "crypto";
import nodemailer from "nodemailer";
import resetPasswordEmailTemplate from "./emailTemplate.js";

export const sendResetPasswordCode = async user => {
  const code = crypto.randomBytes(4).toString("hex");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "Twitter Clone <info@twitterclone.com>",
    to: user.email,
    subject: "Password reset request",
    html: resetPasswordEmailTemplate(user, code),
  });

  return code;
};
