import { NextRequest, NextResponse } from 'next/server';
import { 
  sendBookingConfirmation, 
  sendBookingReminder,
  sendMentorApplicationNotification,
  sendMentorApplicationStatusNotification
} from '@/lib/emails/resend';
import { verifyConvexWebhookAuth } from '@/lib/emails/verify-convex-webhook';

export async function POST(request: NextRequest) {
  try {
    const auth = verifyConvexWebhookAuth({
      authorizationHeader: request.headers.get('authorization'),
      expectedSecret: process.env.CONVEX_WEBHOOK_SECRET,
      nodeEnv: process.env.NODE_ENV,
    });

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case 'booking_confirmation':
        result = await sendBookingConfirmation({
          to: data.to,
          studentName: data.studentName,
          mentorName: data.mentorName,
          careerTitle: data.careerTitle,
          scheduledAt: new Date(data.scheduledAt),
          duration: data.duration,
          meetingLink: data.meetingLink,
        });
        break;

      case 'booking_reminder':
        result = await sendBookingReminder({
          to: data.to,
          userName: data.userName,
          mentorName: data.mentorName,
          studentName: data.studentName,
          careerTitle: data.careerTitle,
          scheduledAt: new Date(data.scheduledAt),
          meetingLink: data.meetingLink,
        });
        break;

      case 'mentor_application':
        result = await sendMentorApplicationNotification({
          to: data.to,
          applicantName: data.applicantName,
          applicationId: data.applicationId,
        });
        break;

      case 'mentor_application_approved':
        result = await sendMentorApplicationStatusNotification({
          to: data.to,
          applicantName: data.applicantName,
          status: 'approved',
        });
        break;

      case 'mentor_application_rejected':
        result = await sendMentorApplicationStatusNotification({
          to: data.to,
          applicantName: data.applicantName,
          status: 'rejected',
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Unknown email type' },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
