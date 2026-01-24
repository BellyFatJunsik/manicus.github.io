import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { companyName, userName, phoneNumber, emailAddress, inquiryContent } = req.body;

    const { data, error } = await resend.emails.send({
      from: 'contact@manicus.co.kr',
      to: 'ceo@manicus.co.kr',
      replyTo: emailAddress,
      subject: `상담 문의 - ${companyName}`,
      html: `
        <h2>상담 문의가 접수되었습니다</h2>
        <p><strong>회사명:</strong> ${companyName}</p>
        <p><strong>이름:</strong> ${userName}</p>
        <p><strong>휴대폰번호:</strong> ${phoneNumber}</p>
        <p><strong>이메일주소:</strong> ${emailAddress}</p>
        <p><strong>문의내용:</strong></p>
        <p>${inquiryContent || '(문의 내용 없음)'}</p>
      `,
    });

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
