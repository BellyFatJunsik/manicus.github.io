import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const useGmail = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
const resendApiKey = process.env.RESEND_API_KEY;

let transporter = null;
let resend = null;

if (useGmail) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
} else if (resendApiKey) {
  resend = new Resend(resendApiKey);
}

function getHtmlBody(data) {
  const { companyName, userName, phoneNumber, emailAddress, inquiryContent } = data;
  return `
    <h2>📩 홈페이지 문의 접수</h2>
    <table border="1" cellpadding="8" cellspacing="0">
      <tr><th align="left">회사명</th><td>${companyName || '-'}</td></tr>
      <tr><th align="left">담당자</th><td>${userName}</td></tr>
      <tr><th align="left">연락처</th><td>${phoneNumber || '-'}</td></tr>
      <tr><th align="left">이메일</th><td>${emailAddress}</td></tr>
    </table>
    <br />
    <strong>문의 내용</strong>
    <pre style="white-space: pre-wrap;">${inquiryContent || '(문의 내용 없음)'}</pre>
  `;
}

function getChatHtmlBody(data) {
  const { chatTranscript, guestEmail, userName } = data;
  return `
    <h2>💬 상담 대화 수신</h2>
    <p><strong>고객 이메일 (답변용):</strong> ${guestEmail || '-'}</p>
    <p><strong>이름:</strong> ${userName || '-'}</p>
    <hr />
    <strong>대화 내용</strong>
    <pre style="white-space: pre-wrap; background:#f5f5f5; padding:16px; border-radius:8px;">${chatTranscript || '(내용 없음)'}</pre>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!useGmail && !resendApiKey) {
    return res.status(500).json({
      success: false,
      message: '서버 설정 오류: GMAIL_USER+GMAIL_APP_PASSWORD 또는 RESEND_API_KEY를 설정하세요.',
    });
  }

  try {
    const toEmail = process.env.RECEIVE_EMAIL || 'ceo@manicus.co.kr';
    const fromEmail = process.env.GMAIL_USER || 'contact@manicus.co.kr';

    if (req.body.type === 'chat') {
      const { chatTranscript, guestEmail, userName } = req.body;
      if (!guestEmail || !chatTranscript) {
        return res.status(400).json({
          success: false,
          message: '이메일과 대화 내용이 필요합니다.',
        });
      }
      const subject = `[상담 대화] ${userName || '고객'} - ${guestEmail}`;
      const html = getChatHtmlBody({ chatTranscript, guestEmail, userName });
      const text = `고객 이메일: ${guestEmail}\n이름: ${userName || '-'}\n\n대화 내용:\n${chatTranscript}`;

      if (useGmail && transporter) {
        await transporter.sendMail({
          from: fromEmail,
          to: toEmail,
          replyTo: guestEmail,
          subject,
          html,
          text,
        });
      } else if (resend) {
        await resend.emails.send({
          from: 'Manicus 문의 <contact@manicus.co.kr>',
          to: [toEmail],
          reply_to: guestEmail,
          subject,
          html,
        });
      }
      return res.status(200).json({ success: true });
    }

    const {
      companyName,
      userName,
      phoneNumber,
      emailAddress,
      inquiryContent,
    } = req.body;

    if (!userName || !emailAddress) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다.',
      });
    }

    const subject = `홈페이지 문의 - ${companyName || '회사명 없음'}`;
    const html = getHtmlBody({
      companyName,
      userName,
      phoneNumber,
      emailAddress,
      inquiryContent,
    });

    if (useGmail && transporter) {
      await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        replyTo: emailAddress,
        subject,
        html,
        text: [
          `회사명: ${companyName || '-'}`,
          `담당자: ${userName}`,
          `연락처: ${phoneNumber || '-'}`,
          `이메일: ${emailAddress}`,
          `문의 내용: ${inquiryContent || '(문의 내용 없음)'}`,
        ].join('\n'),
      });
    } else if (resend) {
      await resend.emails.send({
        from: 'Manicus 문의 <contact@manicus.co.kr>',
        to: [toEmail],
        reply_to: emailAddress,
        subject,
        html,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('메일 전송 오류:', error);
    return res.status(500).json({
      success: false,
      message: '메일 전송에 실패했습니다.',
    });
  }
}
