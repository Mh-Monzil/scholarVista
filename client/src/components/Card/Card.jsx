import YellowButton from "../Shared/YellowButton";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Card = ({ scholar }) => {
  const {
    _id,
    universityName,
    universityImage,
    scholarshipCategory,
    universityLocation,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    rating,
  } = scholar;

  const ratingStar = {
    size: 25,
    value: rating,
    edit: false,
    activeColor: "#F2A227",
  };

  return (
    <div className="card mx-auto rounded-md w-full bg-base-100 shadow-md ">
      <figure className="relative overflow-hidden rounded-ee-[70px]">
        <img
          className="w-full h-60 hover:scale-105 transition-all duration-300"
          src={`${universityImage}.jpg`}
        />
        <span className="absolute bg-navy text-white top-4 right-4 px-3 py-1 rounded-md text-sm">
          {subjectCategory}
        </span>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-navy">{universityName}</h2>
        <p className="flex items-center gap-1 font-medium text-sm">
          <IoLocationSharp />
          <span>{universityLocation}</span>
        </p>
        <p>
          <span className="font-medium">Deadline:</span> {applicationDeadline}{" "}
        </p>
        <p>
          <span className="font-medium">Scholarship Category:</span>{" "}
          {scholarshipCategory}{" "}
        </p>
        <div className="flex items-center justify-between py-2">
          <p className="text-3xl font-semibold text-navy">${applicationFees}</p>
          <span className="flex items-center font-medium gap-2">
            {rating}
            <ReactStars {...ratingStar} />
          </span>
        </div>
        {/* <div className="justify-end"> */}
        <Link to={`/scholarship-details/${_id}`}>
          <YellowButton label={"View Details"} />
        </Link>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Card;
