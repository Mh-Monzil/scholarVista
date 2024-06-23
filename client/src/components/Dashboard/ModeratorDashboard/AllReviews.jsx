import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../hooks/useAxiosPublic";
import ReviewCard from "../ReviewCard/ReviewCard";
import {toast} from 'react-hot-toast'
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews`);
      //   console.log(reviews);
      return data;
    },
  });
  console.log(reviews);

  const deleteReview = async (id) => {
    try{
      console.log("delete", id);
      const {data} = await axiosSecure.delete(`/delete-reviews/${id}`)
      console.log(data);
      if(data.deletedCount > 0){
        toast.success("Review deleted successfully")
        refetch();
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }

  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold underline">
        All Reviews
      </h2>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-10">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} deleteReview={deleteReview} />
          ))}
        </div>
    </div>
  );
};

export default AllReviews;
