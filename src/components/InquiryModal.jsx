import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialForm = {
  companyName: '',
  userName: '',
  phoneNumber: '',
  emailAddress: '',
  inquiryContent: '',
  privacyAgree: false,
};

export default function InquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleOpenChange = (open) => {
    if (!open && status !== 'loading') {
      onClose();
      if (status === 'success') {
        setStatus(null);
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'inquiryContent') setCharCount(value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus('loading');

    try {
      const apiUrl = import.meta.env.PROD
        ? '/api/send-email'
        : import.meta.env.VITE_API_URL || 'http://localhost:3001/api/send-email';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          userName: formData.userName,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
          inquiryContent: formData.inquiryContent || '(문의 내용 없음)',
        }),
      });

      if (!response.ok) throw new Error('이메일 전송에 실패했습니다.');

      setStatus('success');
      setFormData(initialForm);
      setCharCount(0);
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      setStatus(null);
      const isNetworkError = error?.message === 'Failed to fetch' || error?.name === 'TypeError';
      alert(
        isNetworkError
          ? '서버에 연결할 수 없습니다. 로컬 테스트 시 백엔드 서버(포트 3001)가 실행 중인지 확인하세요.'
          : `문의 접수 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`
      );
      setIsSubmitting(false);
    }
  };

  const handleSuccessConfirm = () => {
    setStatus(null);
    setIsSubmitting(false);
    onClose();
  };

  const isFormValid =
    formData.companyName &&
    formData.userName &&
    formData.phoneNumber &&
    formData.emailAddress &&
    formData.privacyAgree;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[min(92vh,860px)] overflow-y-auto sm:max-w-lg"
        showCloseButton={status !== 'loading'}
      >
        {status === 'loading' || status === 'success' ? (
          <div className="flex min-h-52 flex-col items-center justify-center gap-4 py-6 text-center">
            {status === 'loading' ? (
              <>
                <Loader2 className="size-7 animate-spin text-brand" />
                <p className="text-sm text-muted-foreground">접수 중…</p>
              </>
            ) : (
              <>
                <p className="font-mono text-sm tracking-[0.16em] text-brand">DONE</p>
                <DialogTitle>문의가 접수되었습니다.</DialogTitle>
                <Button onClick={handleSuccessConfirm}>확인</Button>
              </>
            )}
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="font-mono text-[0.7rem] tracking-[0.12em] text-brand">INQUIRY</p>
              <DialogTitle className="text-xl tracking-tight">도입 · 견적 문의</DialogTitle>
              <DialogDescription>
                라이선스 범위가 궁금하면{' '}
                <Link to="/license" onClick={onClose} className="text-brand underline-offset-2 hover:underline">
                  라이선스 안내
                </Link>
                를 먼저 확인하세요.
              </DialogDescription>
            </DialogHeader>

            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="companyName">회사명 *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="userName">이름 *</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">휴대폰 *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emailAddress">이메일 *</Label>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="inquiryContent">문의 내용</Label>
                <Textarea
                  id="inquiryContent"
                  name="inquiryContent"
                  maxLength={700}
                  rows={4}
                  placeholder="도입 희망 제품, 창고/사용자 규모, 연동 대상 등"
                  value={formData.inquiryContent}
                  onChange={handleInputChange}
                />
                <span className="self-end font-mono text-xs text-muted-foreground">
                  {charCount}/700
                </span>
              </div>

              <div className="grid gap-3 sm:col-span-2">
                <p className="text-sm font-semibold">개인정보 수집 · 이용 안내</p>
                <div className="max-h-28 space-y-1 overflow-auto rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                  <p>수집·이용 주체: (주)매니커스 (793-86-03495)</p>
                  <p>수집 항목: 회사명, 이름, 휴대폰, 이메일, 문의내용</p>
                  <p>목적: 견적 산출 및 상담 응대</p>
                  <p>보유: 문의 처리 완료일로부터 1년 (법령 예외 제외)</p>
                </div>
                <label className="flex items-start gap-2 text-sm">
                  <Checkbox
                    checked={formData.privacyAgree}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, privacyAgree: checked === true }))
                    }
                    className="mt-0.5"
                  />
                  <span>개인정보 수집·이용에 동의합니다.</span>
                </label>
              </div>

              <Button type="submit" className="sm:col-span-2" disabled={!isFormValid || isSubmitting}>
                제출하기
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
