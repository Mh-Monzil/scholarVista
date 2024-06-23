import bgImage1 from "../../assets/banner/uni1.png";
import bgImage2 from "../../assets/banner/uni2.png";
import bgImage3 from "../../assets/banner/uni3.png";
import { useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import WhiteButton from "../Shared/WhiteButton";

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="px-0">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper h-[80vh] lg:h-[calc(100vh-80px)]"
      >
        <SwiperSlide className="relative">
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage1})`,
            }}
            className=" flex flex-col items-center justify-center w-full h-full text-white  bg-cover bg-center -z-10 rounded-sm p-4 md:p-10"
          >
            <h2
              data-aos="fade-right"
              data-aos-duration="400"
              data-aos-easing="ease-in-out"
              className="text-4xl md:text-5xl xl:text-7xl font-bold md:w-[600px] text-center leading-10 md:leading-[70px]"
            >
              Unlock Your Future with Our <span className="text-yellow">Scholarships</span>
            </h2>
            <p
              data-aos="fade-left"
              data-aos-duration="400"
              data-aos-easing="ease-in-out"
              className="text-lg font-semibold md:max-w-[800px] text-center py-4"
            >
              Discover a world of opportunities with scholarships tailored to
              your academic goals. Apply now and take the first step towards a
              brighter future.
            </p>
            <div
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              className="flex items-center gap-8 mt-10"
            >
              <WhiteButton label={"Apply Now"} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage2})`,
            }}
            className=" flex flex-col items-center justify-center w-full h-full text-white  bg-cover bg-center rounded-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold md:w-[600px] text-center leading-10 md:leading-[70px]">
              Achieve Your <span className="text-yellow">Dream</span> with Ease
            </h2>
            <p className="text-lg font-semibold md:max-w-[800px] text-center px-8 py-4">
              Our scholarships are designed to support students from all
              backgrounds. Whether you excel in academics, sports, or the arts,
              we have a scholarship for you.
            </p>
            <div className="flex items-center gap-8 mt-10">
              <WhiteButton label={"Apply Now"} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage3})`,
            }}
            className=" flex flex-col items-center justify-center w-full h-full text-white  bg-cover bg-center rounded-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold md:w-[600px] text-center leading-10 md:leading-[70px] px-2">
              Start Your Journey to <span className="text-yellow">Excellence</span>
            </h2>
            <p className="text-lg font-semibold md:max-w-[800px] text-center px-8 py-4">
              Join a community of scholars at top universities around the world.
              Our platform makes it easy to find and apply for the best
              scholarships suited to you.
            </p>
            <div className="flex items-center gap-8 mt-10">
              <WhiteButton label={"Apply Now"} />
            </div>
          </div>
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}></svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
