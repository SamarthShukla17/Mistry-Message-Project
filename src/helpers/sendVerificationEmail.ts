import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import { Resend } from "resend";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  console.log('Resend API Key:', process.env.RESEND_API_KEY); // Add this line for debugging
  
  const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend with the API key
  
  try {
    const response = await resend.emails.send({
      from: 'dev@mistrymessage.online',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    console.log('Email send response:', response);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
