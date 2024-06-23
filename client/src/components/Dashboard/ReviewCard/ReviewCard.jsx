import { FaRegStar } from "react-icons/fa6";
import YellowButton from "../../Shared/YellowButton";

const ReviewCard = ({ review, deleteReview }) => {
  const {
    _id,
    scholarshipName,
    universityName,
    subjectCategory,
    reviewerImage,
    reviewerName,
    reviewDate,
    ratingPoint,
    reviewerComment,
  } = review;

  return (
    <div className="container flex flex-col w-full p-6 mx-auto  rounded-md shadow-md">
      <div className="flex justify-between p-4 ">
        <div className="flex space-x-4">
          <div>
            <img
              src={reviewerImage}
              alt=""
              className="object-cover w-12 h-12 rounded-full"
            />
          </div>
          <div>
            <h4 className="font-bold">{reviewerName}</h4>
            <span className="text-xs text-gray-600">{reviewDate}</span>
          </div>
        </div>
      </div>
      <div className="p-2">
      <p> <span className="font-medium">University Name:</span> {universityName}</p>
      <p> <span className="font-medium">Scholarship Name:</span> {scholarshipName}</p>
      <p className="py-2">{reviewerComment}</p>
      </div>
      <div className="flex flex-1 justify-between items-center">
      <div className="flex items-center gap-2 px-4">
      <FaRegStar className="text-2xl" />
        <span className="font-semibold text-xl">{ratingPoint}</span>
      </div>
      <div>
        <button onClick={() => deleteReview(_id)} className="bg-navy text-white hover:bg-yellow/80 hover:text-navy transition-all duration-300 px-3 py-1.5 rounded-md font-semibold" >Delete</button>
      </div>
      </div>
    </div>
  );
};

export default ReviewCard;
