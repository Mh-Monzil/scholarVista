import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import YellowButton from "../../components/Shared/YellowButton";
import { IoLocationSharp } from "react-icons/io5";
import { useState } from "react";
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
import ApplyModal from "../../components/Modal/ApplyModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

//modal

const ScholarshipDetails = () => {
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  let [isOpen, setIsOpen] = useState(false);

  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["scholarships-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarship-details/${id}`);
      return data;
    },
  });

  console.log(scholarship?._id);

  const { data: reviews = [] } = useQuery({
    enabled: !isLoading,
    queryKey: ["reviews" ],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${scholarship?._id}`);
      console.log(reviews);
      return data;
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  

  

  return (
    <div className="max-w-7xl mx-auto px-4">
      <ApplyModal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        scholarship={scholarship}
      />
      <div className=" my-10 grid grid-cols-1 lg:grid-cols-3  gap-6 lg:gap-10">
        <div className="md:col-span-2 row-span-2 card mx-auto rounded-md w-full bg-base-100  ">
          <figure className="relative ">
            <img
              className="w-full h-96 object-cover rounded-md"
              src={`${scholarship?.universityImage}.jpg`}
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-navy">
                {scholarship?.universityName}
              </h2>
              <span>{scholarship?.postDate}</span>
            </div>
            <p className="flex items-center gap-1 font-medium text-sm">
              <IoLocationSharp />
              <span>{scholarship?.universityLocation}</span>
            </p>
            <p className=" font-medium py-2 text-navy">
              {scholarship?.scholarshipDescription}
            </p>
          </div>
        </div>

        {/* sidebar */}
        <div className=" card mx-auto rounded-md w-full bg-base-100 shadow-md ">
          
          <div className="card-body">
            <h2 className="card-title text-navy">Want to apply?</h2>
            <p>
              <span className="font-medium">Subject Category:</span>{" "}
              {scholarship?.subjectCategory}
            </p>
            <p>
              <span className="font-medium">Subject Name:</span>{" "}
              {scholarship?.subjectName}
            </p>

            <p>
              <span className="font-medium">Scholarship Category:</span>{" "}
              {scholarship?.scholarshipCategory}
            </p>
            <p>
              <span className="font-medium">Stipend:</span>{" "}
              {scholarship?.stipend}
            </p>
            <p>
              <span className="font-medium">Deadline:</span>{" "}
              {scholarship?.applicationDeadline}
            </p>
            <p>
              <span className="font-medium">Service Charge: </span>
              {scholarship?.serviceCharge}
            </p>
            <p className="text-2xl font-semibold text-navy">
              ${scholarship?.applicationFees}
            </p>
            <div onClick={openModal}>
              <YellowButton label={"Apply"} />
            </div>
          </div>
        </div>
      </div>

      {/* slider review  */}
      <div className="my-14">
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
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <ApplicantsReview review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
