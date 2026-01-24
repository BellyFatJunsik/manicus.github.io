import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error('RESEND_API_KEY 환경 변수가 설정되지 않았습니다.');
}

const resend = new Resend(apiKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 환경 변수 확인
  if (!apiKey) {
    console.error('RESEND_API_KEY 환경 변수가 설정되지 않았습니다.');
    return res.status(500).json({
      success: false,
      message: '서버 설정 오류: RESEND_API_KEY가 설정되지 않았습니다.',
    });
  }

  try {
    const {
      companyName,
      userName,
      phoneNumber,
      emailAddress,
      inquiryContent,
    } = req.body;

    // 필수값 최소 검증
    if (!userName || !emailAddress) {
      return res.status(400).json({
        success: false,
        message: '필수 항목이 누락되었습니다.',
      });
    }

    await resend.emails.send({
      from: 'Manicus 문의 <contact@manicus.co.kr>',
      to: ['ceo@manicus.co.kr'],
      reply_to: emailAddress,
      subject: `홈페이지 문의 - ${companyName || '회사명 없음'}`,
      html: `
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
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('메일 전송 오류:', error);

    return res.status(500).json({
      success: false,
      message: '메일 전송에 실패했습니다.',
    });
  }
}
