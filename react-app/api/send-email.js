// Vercel Serverless Function
// 이 파일은 Vercel에 배포하면 자동으로 서버리스 함수로 작동합니다

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { companyName, userName, phoneNumber, emailAddress, inquiryContent } = req.body;

    // Gmail SMTP 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'gfccjs80@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'ntiydmjbjyezzzdf',
      },
    });

    // 수신 이메일 주소
    const toEmail = process.env.RECEIVE_EMAIL || 'contact@manicus.co.kr';

    // 이메일 내용
    const mailOptions = {
      from: process.env.GMAIL_USER || 'gfccjs80@gmail.com', // Gmail 주소
      to: toEmail,
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
      text: `
        상담 문의가 접수되었습니다
        
        회사명: ${companyName}
        이름: ${userName}
        휴대폰번호: ${phoneNumber}
        이메일주소: ${emailAddress}
        문의내용: ${inquiryContent || '(문의 내용 없음)'}
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    res.status(500).json({ success: false, message: '이메일 전송에 실패했습니다.', error: error.message });
  }
}
