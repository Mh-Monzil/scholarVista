import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyReviews = () => {
  const {user} = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [editReview, setEditReview] = useState({});
  const { register, handleSubmit, reset } = useForm();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-reviews/${user?.email}`);
      console.log(data);
      return data;
    },
  });
  console.log(reviews);

  const openModal = (review) => {
    reset();
    setEditReview(review)
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(editReview);

  const deleteReview = async (id) => {
    console.log(id);
    const { data } = await axiosSecure.delete(`/delete-reviews/${id}`)
    console.log(data);
    if(data.deletedCount > 0) {
      toast.success("Review deleted successfully")
      refetch();
    }
  }

  const onSubmit = async (data) => {
    const { rating, comments, date } = data;
    try {
      const reviewInfo = {
        reviewDate: date,
        ratingPoint: parseInt(rating),
        reviewerComment: comments,
      };
      console.log(reviewInfo);
      const { data } = await axiosSecure.patch(`/update-reviews/${editReview?._id}`, reviewInfo);
      console.log(data);
      if(data.modifiedCount > 0) {
        closeModal();
        toast.success("Review edited successfully");
        reset();
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (<>
    <div>
      <h2 className="text-2xl md:text-3xl font-bold underline">
        My Reviews
      </h2>
      <div className="overflow-x-auto mt-6 shadow-md">
        <table className="table">
          {/* head */}
          <thead className="bg-navy text-white">
            <tr className="text-center">
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comments</th>
              <th>Review Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review?._id} className="text-center font-medium text-lg">
                <td className="max-w-60">{review?.scholarshipName}</td>
                <td>{review?.universityName}</td>
                <td className="max-w-sm">{review?.reviewerComment}</td>
                <td>{review?.reviewDate}</td>
                <td >
                  <FaRegEdit onClick={() => openModal(review)} className="text-3xl text-navy mx-auto cursor-pointer" />
                </td>
                <td onClick={() => deleteReview(review?._id)}>
                  <MdDelete className="text-4xl text-rose-500 mx-auto cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  
  {/* modal  */}
  <Transition appear show={isOpen} as={Fragment} >
          <Dialog
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={closeModal}
          >
            <div
              className="fixed inset-0 backdrop-blur-sm bg-black/50"
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto text-black">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium text-center leading-6 text-gray-900"
                    >
                      Edit Review
                      {editReview?.reviewerName}
                    </DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mt-4">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-600 "
                          htmlFor="rating"
                        >
                          Rating Point
                        </label>
                        <input
                          id="rating"
                          autoComplete="rating"
                          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                          type="number"
                          min={1}
                          max={5}
                          defaultValue={editReview?.ratingPoint}
                          {...register("rating", { required: true })}
                        />
                      </div>
  
                      <div className="mt-4">
                        <div className="flex justify-between">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-600 "
                            htmlFor="comments"
                          >
                            Comments
                          </label>
                        </div>
  
                        <input
                          id="comments"
                          autoComplete="comments"
                          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                          type="text"
                          defaultValue={editReview?.reviewerComment}
                          {...register("comments", { required: true })}
                        />
                      </div>
  
                      <div className="mt-4">
                        <div className="flex justify-between">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-600 "
                            htmlFor="date"
                          >
                            Review Date
                          </label>
                        </div>
  
                        <input
                          id="date"
                          autoComplete="date"
                          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                          type="date"
                          defaultValue={editReview?.reviewDate}
                          {...register("date", { required: true })}
                        />
                      </div>
  
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="w-full px-6 py-3 text-sm font-semibold tracking-wide  capitalize transition-colors duration-300 transform bg-yellow rounded-sm hover:bg-navy hover:text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                        >
                          Add Review
                        </button>
                      </div>
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
  </>
  );
};

export default MyReviews;


