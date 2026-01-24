import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      companyName,
      userName,
      phoneNumber,
      emailAddress,
      inquiryContent,
    } = await req.json();

    // 필수값 최소 검증
    if (!userName || !emailAddress) {
      return Response.json(
        { success: false, message: '필수 항목이 누락되었습니다.' },
        { status: 400 }
      );
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

    return Response.json({ success: true });
  } catch (error: any) {
    console.error('메일 전송 오류:', error);

    return Response.json(
      { success: false, message: '메일 전송에 실패했습니다.' },
      { status: 500 }
    );
  }
}
