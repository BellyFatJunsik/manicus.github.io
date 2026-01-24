import { useEffect, useRef } from 'react';
import { useSEO } from '../hooks/useSEO';
import HeroCanvas from '../components/HeroCanvas';

const Home = ({ openModal }) => {
  useSEO({
    title: '매니커스 - 비즈니스 맞춤 웹사이트 제작 및 시스템 구축',
    description: '매니커스는 비즈니스의 목적과 맥락을 이해하고, 기획부터 디자인, 개발까지 전문가가 함께하는 웹사이트 제작 및 시스템 구축 서비스를 제공합니다.',
    keywords: '웹사이트 제작, 홈페이지 제작, 시스템 구축, 웹 개발, 반응형 웹사이트, SEO 최적화, 매니커스',
    ogImage: 'https://c.animaapp.com/DaKYKUSd/img/frame-22.svg',
    ogUrl: window.location.href
  });

  useEffect(() => {
    const handleInquiryClick = (e) => {
      if (e.target.closest('#inquiryBtnHero')) {
        e.preventDefault();
        openModal();
      }
    };

    document.addEventListener('click', handleInquiryClick);
    return () => {
      document.removeEventListener('click', handleInquiryClick);
    };
  }, [openModal]);

  return (
    <>
      <div className="frame-3" data-uid="y1UqHzhryjaIhs6R">
        <HeroCanvas />
        <img 
          data-uid="i35pmSBE22uMjkRp" 
          className="vector" 
          src="https://c.animaapp.com/DaKYKUSd/img/vector-13.svg" 
          style={{zIndex: 1}}
          alt="배경 그래픽"
        />
        <div data-uid="ffV3t4XgGN6eIjjJ" className="frame-4" style={{zIndex: 2}}>
          <div data-uid="sdJOjngT7d8JZLDy" className="frame-5">
            <div data-uid="GC6FcmSzmqmvV6An" className="text-wrapper-3">
              비즈니스는 다 다르니까
            </div>
            <div data-uid="3MirNgsYrZF4LT0i" className="text-wrapper-4">
              맞춤 설계가 기본입니다
            </div>
          </div>
          <div data-uid="3jXLJdWBOKoLU5yg" className="frame-6">
            <p data-uid="GZeiVLphVctClFjX" className="p">
              매니커스는 비즈니스의 목적과 맥락을 먼저 이해합니다
            </p>
            <p data-uid="BMeUu0ZNTBn84GTt" className="text-wrapper-5">
              기획, 디자인, 개발까지 경험 많은 전문가가 함께하고,
            </p>
            <p data-uid="MpwitY7ocbyIUaJi" className="text-wrapper-5">
              그 결과는 실제 운영에서 증명되는 안정성으로 이어집니다
            </p>
          </div>
          <div 
            data-uid="vuFZCsV9Wn4Meawg" 
            className="frame-7" 
            id="inquiryBtnHero" 
            style={{cursor: 'pointer'}}
          >
            <div data-uid="LFusppMo2aHATCn0" className="text-wrapper-6">상담 문의</div>
            <img 
              data-uid="yfSRqpcJ9rvWJAGr" 
              className="tabler-arrow-right" 
              src="https://c.animaapp.com/DaKYKUSd/img/tabler-arrow-right.svg"
              alt="화살표"
            />
          </div>
        </div>
        <div 
          data-uid="stqj9LXLJgHFrAG7" 
          className="frame-8" 
          style={{zIndex: 2, left: 'calc((100vw - 1400px) / 2 + 969px)'}}
        >
          <div data-uid="1CZSNiGMPNhDGSSC" className="tailored-by">Tailored&nbsp;&nbsp;by</div>
          <div data-uid="jweHgAz3GIXld13H" className="text-wrapper-7">Technology</div>
        </div>

        <img 
          data-uid="BSQKf7cEKuwOKSqo" 
          style={{
            position: 'absolute',
            top: '342px',
            left: 'calc((100vw - 1400px) / 2 + 790px)',
            width: '189px',
            height: '180px',
            aspectRatio: '1.05',
            transform: 'scale(1.7)'
          }} 
          src="/m.svg"
          alt="M"
        />
        <img 
          data-uid="0dNPNpnbVihOE2wJ" 
          style={{
            position: 'absolute',
            top: '92px',
            left: 'calc((100vw - 1400px) / 2 + 960px)',
            width: '189px',
            height: '180px',
            aspectRatio: '1.05',
            transform: 'scale(1.7)'
          }} 
          src="/n.svg"
          alt="N"
        />
        <img 
          data-uid="5ABJxA3FLbyXOAz5" 
          style={{
            position: 'absolute',
            top: '328px',
            left: 'calc((100vw - 1400px) / 2 + 1097px)',
            width: '189px',
            height: '180px',
            aspectRatio: '1.05',
            transform: 'scale(1.7)'
          }} 
          src="/c.svg"
          alt="C"
        />
        <img 
          data-uid="Zy3gSYTCxmJDcX9H" 
          style={{
            position: 'absolute',
            top: '74px',
            left: 'calc((100vw - 1400px) / 2 + 1220px)',
            width: '209px',
            height: '180px',
            aspectRatio: '1.05',
            transform: 'scale(1.7)'
          }} 
          src="/s.svg"
          alt="S"
        />
      </div>

      {/* Our Services 섹션 */}
      <div data-uid="YzvdITDBtbtS37th" className="frame-9">
        <div className="content-center">
          <div data-uid="BMZt13heeC2ZN2hr" className="frame-10">
            <div data-uid="7UL3dGftgYFkNHec" className="frame-11">
              <img 
                data-uid="YaFIjApatRoKUeaC" 
                className="img" 
                src="https://c.animaapp.com/DaKYKUSd/img/application.svg"
                alt="웹사이트 제작"
              />
              <div data-uid="SHENmFaWajnPMxf3" className="text-wrapper-8">웹사이트 · 홈페이지 제작</div>
              <img 
                data-uid="xyYkPzZicW2fnBY3" 
                className="line" 
                src="https://c.animaapp.com/DaKYKUSd/img/line-2-2.svg"
                alt="구분선"
              />
              <p data-uid="LwiDZfwEZQDvyLBA" className="SEO">
                원페이지 랜딩부터 기업·기관 홈페이지, 대형 맞춤형 사이트까지 비즈니스의 목적에 맞는 웹사이트를 제작합니다.
                기획단계부터 디자인, 개발까지 전체 제작 <br data-uid="mCJvVPJ70VxjtqII" />과정을 하나의 흐름으로 진행합니다. 반응형, SEO를 고려하여
                설계하여 오픈 이후에도 운영하기 쉬운 <br data-uid="1UyXUqSydhu4mPbM" />웹사이트를 만듭니다.
              </p>
            </div>
            <div data-uid="g719hp4mQhAaxiAT" className="frame-7">
              <div data-uid="fbH0z9p4KZF3s0X5" className="text-wrapper-9">견적 문의</div>
              <img 
                data-uid="awNGECY8LcoruQY4" 
                className="tabler-arrow-right-2" 
                src="https://c.animaapp.com/DaKYKUSd/img/tabler-arrow-right-1.svg"
                alt="화살표"
              />
            </div>
          </div>
          <div data-uid="CXoScqNyf9Elvhqb" className="text-wrapper-10">Our Services</div>
          <div data-uid="wh0QONHNJphhtYaa" className="frame-12">
            <div data-uid="2k7W4X47DDyAS9KP" className="frame-11">
              <img 
                data-uid="DmvnbDuU1dfBd2oL" 
                className="img" 
                src="https://c.animaapp.com/DaKYKUSd/img/self-service-portal.svg"
                alt="시스템 구축"
              />
              <p data-uid="RMK36ORFYEAFRtCR" className="text-wrapper-8">기능 개발 · 시스템 구축</p>
              <img 
                data-uid="9fR8ITCoUwHHWG5m" 
                className="line" 
                src="https://c.animaapp.com/DaKYKUSd/img/line-2-2.svg"
                alt="구분선"
              />
              <p data-uid="RZxGBsInvXRjW6qB" className="text-wrapper-11">
                웹사이트 기능 확장은 물론 실제 업무를 처리하는 내부 운영 시스템까지 개발합니다.<br data-uid="1HZIa7hyIZGamIom" />관리자 페이지(CMS),
                쇼핑몰, 예약·결제 시스템부터 유통·물류 관리, 내부 관리 시스템 등 업무 목적과 운영 환경에 맞춰 구조를
                설계하고 구현합니다.
              </p>
            </div>
            <div data-uid="OJL8UFrpTeZzpSGU" className="frame-7">
              <div data-uid="JpralN7nSSk5WxdI" className="text-wrapper-12">견적 문의</div>
              <img 
                data-uid="k9MRFVVNgc7CKBvr" 
                className="tabler-arrow-right-2" 
                src="https://c.animaapp.com/DaKYKUSd/img/tabler-arrow-right-3.svg"
                alt="화살표"
              />
            </div>
          </div>
          <div data-uid="ybzCgqe6VkWAyo0F" className="frame-13">
            <div data-uid="8GQqk4LbnBP6rQpC" className="frame-11">
              <img 
                data-uid="LoOYuGwb3BPiguTR" 
                className="img" 
                src="https://c.animaapp.com/DaKYKUSd/img/search.svg"
                alt="운영 유지보수"
              />
              <p data-uid="yDr7AvO0oYwCvWuz" className="text-wrapper-8">운영 · 유지보수 · 인프라 지원</p>
              <img 
                data-uid="9eORXor3z1JUls8e" 
                className="line" 
                src="https://c.animaapp.com/DaKYKUSd/img/line-2-2.svg"
                alt="구분선"
              />
              <p data-uid="YYreB4E1DumVMcqj" className="text-wrapper-11">
                서비스 오픈 이후에도 안정적인 운영을 이어갈 수 있도록 정기 유지보수, 기능 개선을 지원합니다. 장애 발생 시
                신속한 대응을 통해 서비스가 중단 없이 운영될 수 있도록 지원합니다. <br data-uid="YLGRSIGM8y9vW0se" />또한 도메인, 호스팅, SSL 등 기본
                인프라 환경을 서비스 특성에 맞게 구성하고 관리합니다.
              </p>
            </div>
            <div data-uid="otPxNboSwyOfn22G" className="frame-7">
              <div data-uid="cNOyRzcDAyPIFk32" className="text-wrapper-12">견적 문의</div>
              <img 
                data-uid="fbx7l95zRk7Dfl2T" 
                className="tabler-arrow-right-2" 
                src="https://c.animaapp.com/DaKYKUSd/img/tabler-arrow-right-3.svg"
                alt="화살표"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Work 섹션 */}
      <div data-uid="m9KzLMNmT3hqA9Md" className="frame-14">
        <div className="content-center">
          <div data-uid="zx8FOpbjzsDL1BuU" className="text-wrapper-13">Our Work</div>
          <p data-uid="hwh4cks9xHi8jO36" className="text-wrapper-14">
            매니커스는 다양한 구축 경험을 통해 업무 환경에 맞는 웹과 시스템을 안정적으로 구현해왔습니다.
          </p>
          <p data-uid="aetsUYjSvdpfkuni" className="text-wrapper-14">
            단순한 제작사가 아닌, 운영을 함께 고민하는 기술 파트너로 일합니다.
          </p>
          <div data-uid="mUzSc7KR2XNhHfOD" className="frame-15">
            <div data-uid="zV2Z9BeWxBdl6jKu" className="frame-16">
              <div data-uid="GxQ1FOUofbKGHIii" className="group-2"></div>
              <div data-uid="Mb90MEAuEv20gNDX" className="group-3">
                <div data-uid="CeThgFPeRkuCUcSw" className="text-wrapper-15">공개소프트웨어</div>
                <p data-uid="2l1sobTqoPfObXG8" className="text-wrapper-16">
                  공공과 민간을 잇는 오픈소스 통합 서비스<br />
                  정보 제공부터 참여까지 지원하는 포털 시스템
                </p>
              </div>
            </div>
            <div data-uid="DA8JSb1hxCNBXIgG" className="frame-17">
              <img 
                data-uid="x0soeVfdcn6P1wxg" 
                className="element" 
                src="https://c.animaapp.com/DaKYKUSd/img/-----------2025-12-28------5-46-30-1@2x.png"
                alt="아너스글로벌"
              />
              <div data-uid="j0xkguNAin1ULjn6" className="frame-18">
                <div data-uid="DdpHDVvKNm3ECr9X" className="text-wrapper-17">아너스글로벌</div>
                <p data-uid="3pEXLb1ojYE3TkIp" className="text-wrapper-18">
                  글로벌 물류 기업<br />
                  : 기업 정보 제공 중심의 다국어 웹사이트 구축
                </p>
              </div>
            </div>
            <div data-uid="YMJYA7tGbtExyNuj" className="frame-17">
              <img 
                data-uid="k3AVJmqp2ENYyQmy" 
                className="element" 
                src="/site3.png"
                alt="창고관리시스템"
              />
              <div data-uid="IjpYOgVik2l5tLE8" className="frame-18">
                <div data-uid="ZQzVPD9q2TOYPKY5" className="text-wrapper-17">창고관리시스템 (WMS)</div>
                <p data-uid="fhL0HuOpte6FGtFo" className="text-wrapper-18">
                  중소형 물류창고에 최적화된 입고·재고·출고 전 과정을 안정적으로 관리하는 업무 시스템 구축
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How we work 섹션 */}
      <div data-uid="niawrp1pIOKy2f66" className="frame-19">
        <div className="content-center">
          <div data-uid="uEGGnQMY3519oYvr" className="text-wrapper-19">How we work</div>
          <p data-uid="xg43LqfMnMoyzwli" className="text-wrapper-20">
            매니커스는 결과부터 약속하지 않습니다. 대신, 문제를 정확히 이해하고 해답을 만들어가는 과정에 집중합니다.<br data-uid="aAn5yU1P5GuiK0Yb" />
            모든 프로젝트는 아래의 흐름으로 진행됩니다.
          </p>
          <div data-uid="WyQNF39Imot2ISJ1" className="frame-20">
            <div data-uid="JOh5oV2h5oiJYaLX" className="frame-21">
              <img 
                data-uid="QzcIqoLWneLgvody" 
                className="scenario-scheme" 
                src="https://c.animaapp.com/DaKYKUSd/img/scenario--scheme@2x.png"
                alt="문제 이해"
              />
              <div data-uid="p1lHjISXjEEFfP0t" className="text-wrapper-21">
                문제를 이해하는 것부터 <br data-uid="oMUO534Js8SIihvV" />시작합니다
              </div>
            </div>
            <div data-uid="91a34ZlD3BajXm5X" className="frame-22">
              <img 
                data-uid="Ly7GxTN14AKKDB9R" 
                className="img-2" 
                src="https://c.animaapp.com/DaKYKUSd/img/structure--architecture@2x.png"
                alt="구조화"
              />
              <p data-uid="GmMLezxPKhYRBFvk" className="text-wrapper-21">
                복잡한 내용을 명확한<br data-uid="wbZMfAHT9JIXVkL8" />
                방향으로 구조화합니다
              </p>
            </div>
            <div data-uid="HtqS097qztpQLWHZ" className="frame-22">
              <img 
                data-uid="ywO2gxipOEZIRH30" 
                className="img-2" 
                src="https://c.animaapp.com/DaKYKUSd/img/algorithm--flow--board--canban--backlog@2x.png"
                alt="구현"
              />
              <div data-uid="IQw2ojDllDh4fqen" className="text-wrapper-21">
                보여주기보다 쓰임을<br data-uid="yrPx2leSS2Wm8MaD" />기준으로 구현합니다
              </div>
            </div>
            <div data-uid="3MfRwaJLtX8hK47V" className="frame-22">
              <img 
                data-uid="v5SjyA0a38cHxId0" 
                className="img-2" 
                src="https://c.animaapp.com/DaKYKUSd/img/profile--sign-in--register--sign-up@2x.png"
                alt="마무리"
              />
              <div data-uid="2yUqicSylGLXIbxp" className="text-wrapper-21">
                디테일과 완성도를 기준으로<br data-uid="FT3sNTsCsX38waAg" />마무리합니다
              </div>
            </div>
            <div data-uid="PKtuHDCxmsHOH9Qz" className="frame-22">
              <img 
                data-uid="D3nYRCY2OZ8hQSaj" 
                className="img-2" 
                src="https://c.animaapp.com/DaKYKUSd/img/team--personal--people--group@2x.png"
                alt="파트너십"
              />
              <div data-uid="oNgaXDAUlWeLyZZW" className="text-wrapper-21">
                프로젝트 이후에도<br data-uid="ZdJnPjSMq00sZszf" />연결된 파트너로 남습니다
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 견적 요청 섹션 */}
      <div data-uid="EEgRPARaxYrVuBHX" className="frame-23">
        <div className="content-center">
          <div data-uid="aWdmynsusuXAdAwS" className="frame-24">
            <div data-uid="prrPu4HF2xdD8qrK" className="text-wrapper-22">프로젝트에 맞는 견적을 받아보세요</div>
            <p data-uid="GPldvMqcycNR7w3o" className="text-wrapper-23">
              작은 문의부터 큰 프로젝트까지 매니커스는 함께 고민할 준비가 되어있습니다
            </p>
            <img 
              data-uid="Czvr1sR8nK573g3q" 
              className="bitcoin-icons-arrow" 
              src="https://c.animaapp.com/DaKYKUSd/img/bitcoin-icons-arrow-right-outline.svg"
              alt="화살표"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
