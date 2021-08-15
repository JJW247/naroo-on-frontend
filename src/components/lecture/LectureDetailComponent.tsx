import { FC } from 'react';

const lectureUrl = 'https://player.vimeo.com/video/587581144?h=e542768ad0';

const LetureDetailComponent: FC = () => {
  return (
    <>
      {
        <div className="min-h-screen bg-white font-noto-700 mx-4 text-gray-900 mb-96">
          <div className="min-h-screen max-w-864 mx-auto">
            <div className="flex justify-between items-center mt-20 pb-8 border-b-1 border-gray-325">
              <div className="flex items-center cursor-pointer">
                <div className="w-66">
                  <img src={''} alt="profileImg" />
                </div>
                <div className="ml-2">
                  <div className="md:text-2xl">강사</div>
                  <div className="text-sm md:text-xl text-gray-700">회원</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray-600 text-sm md:text-xl hidden md:block">
                  2021/08/16
                </div>
                {false} ? (
                <div className="ml-4 text-white bg-main rounded-lg p-2 text-xs md:text-base">
                  강의가 만료되었습니다!
                </div>
                ) : (
                <div className="ml-4 text-white bg-gray-600 rounded-lg p-2 text-xs md:text-base">
                  강의를 시청하실 수 있습니다!
                </div>
              </div>
            </div>
            <div className="flex justify-end my-8">
              <div className="ml-2 text-sm bg-gray-200 text-gray-900 rounded-2xl py-1 px-3 flex items-center">
                테스트
              </div>
            </div>
            {lectureUrl ? (
              <div className="my-4 pt-4 pl-2 block w-full h-0 pb-56 relative">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={lectureUrl}
                  title="Vimeo video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="my-4 pt-4 pl-2 block w-full h-0 pb-56 relative">
                <img src={''} alt="defaultImage" />
              </div>
            )}
            <div className="md:text-5xl md:mt-10 md:mb-8">테스트</div>
            <div className="text-xs md:text-2xl mt-8 pb-1">테스트</div>

            <div className="pt-78 mb-12 border-t-1 border-gray-325 mt-16">
              <div className="font-size-46 mb-8">후기 작성</div>
              <div className="bg-gray-50 rounded-2xl p-12">
                <div className="text-2xl">강의 만족도</div>
                <div className="mt-6">
                  <button className="w-4 md:w-14 focus:outline-none mx-1">
                    테스트
                  </button>
                  <button className="w-4 md:w-14 focus:outline-none mx-1">
                    테스트
                  </button>
                  <button className="w-4 md:w-14 focus:outline-none mx-1">
                    테스트
                  </button>
                  <button className="w-4 md:w-14 focus:outline-none mx-1">
                    테스트
                  </button>
                  <button className="w-4 md:w-14 focus:outline-none mx-1">
                    테스트
                  </button>
                </div>
                <div className="text-2xl mt-62">강의 후기 작성</div>
                <form className="relative">
                  <div>
                    <textarea
                      className="resize-none bg-gray-white p-2 md:py-6 md:px-8 w-full rounded-md md:rounded-xl text-gray-900 placeholder-gray-350 focus:outline-none mt-6 font-noto-500"
                      rows={10}
                      placeholder="강의가 어떠셨나요?&#13;&#10;강의 후기를 자세하게 작성해주세요 (최대 360자)"
                      maxLength={360}
                    />
                  </div>
                  <input
                    className="absolute bottom-0 right-0 bg-gray-600 text-white focus:outline-none px-2 py-3 text-sm rounded-lg mx-4 mb-8"
                    type="submit"
                    value="후기 남기기"
                  />
                </form>
                {false && <div className="err-msg">에러 테스트</div>}
              </div>
            </div>
            <div className="relative text-xs md:text-base mt-16">
              <div className="absolute rounded-2xl border-t-4 border-r-4 border-purple-100 w-full h-full top-0 left-0"></div>
              <div className="bg-purple-50 rounded-2xl md:flex justify-between px-4 py-16">
                <div className="flex md:justify-end md:w-1/4 mb-4 md:mb-0">
                  <div className="w-6 md:w-10">
                    <img src={''} alt="pencil" />
                  </div>
                  <div className="ml-4 text-xs md:text-2xl text-main">
                    테스트
                    <br className="hidden md:block" />
                    테스트
                  </div>
                </div>
                <div className="md:w-3/4 md:ml-16 md:pr-16">
                  <div className="flex w-full">
                    <div className="w-1/3">테스트</div>
                    <div className="w-2/3 font-noto-500">테스트</div>
                  </div>
                  <div className="flex w-full mt-4">
                    <div className="w-1/3">테스트</div>

                    <div className="w-2/3 font-noto-500">테스트</div>
                  </div>
                  <div className="flex w-full mt-4">
                    <div className="w-1/3">테스트</div>
                    <div className="w-2/3 font-noto-500">테스트</div>
                  </div>
                  <div className="flex w-full mt-4">
                    <div className="w-1/3">테스트</div>
                    <div className="w-2/3 font-noto-500">테스트</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LetureDetailComponent;
