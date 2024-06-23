import UseAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./scholarshipDetails.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import ApplicantsReview from "../../components/ApplicantsReview/ApplicantsReview";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const StudentsReview = () => {
    const axiosPublic = UseAxiosPublic();

    const {data: studentsReviews = [], isLoading} = useQuery({
        queryKey: ['studentsReview'],
        queryFn: async () => {
            const {data} = await axiosPublic.get("reviews");
            console.log(data);
            return data.slice(0,8);
        }
    })
    console.log(studentsReviews);

    return (
        <div style={{
          backgroundImage: ` url('https://i.ibb.co/chZhDYM/design11-01-generated.jpg')`,
        }} className="my-24 py-2 px-4 sm:p-4 bg-fixed bg-bottom bg-cover rounded-md">
          <div className="max-w-7xl mx-auto mt-12 lg:mt-24">
           <h2 className="text-white text-4xl md:text-5xl font-bold md:w-[600px] mx-auto text-center leading-10 md:leading-[70px]">Students Reviews</h2>
           <p className="text-white text-lg font-semibold md:max-w-[800px] mx-auto text-center py-4">Hear from past recipients about their scholarship experiences. Learn how various scholarships have helped students achieve their academic and career goals through their own words and stories.</p>
            <div>
                {
                    <div className="my-10">
                    <Swiper
                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={false}
                      slidesPerView={"auto"}
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      pagination={true}
                      autoplay={true}
                      loop={true}
                      modules={[EffectCoverflow, Pagination]}
                      breakpoints={{
                        // when window width is >= 1024px (large devices)
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      className="mySwiper w-full"
                    >
                      {studentsReviews.map((review) => (
                        <SwiperSlide key={review._id}>
                          <ApplicantsReview review={review} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                }
            </div>
        </div>
        </div>
    );
};

export default StudentsReview;