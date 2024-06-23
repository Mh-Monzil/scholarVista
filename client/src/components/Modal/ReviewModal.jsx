import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/useAuth";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ isOpen, openModal, closeModal, reviewScholarship }) => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const { rating, comments, date } = data;
    const { scholarship_id, universityName, scholarshipName } =
      reviewScholarship;

    try {
      const reviewInfo = {
        scholarshipName,
        universityName,
        university_id: scholarship_id,
        reviewerImage: user?.photoURL,
        reviewerName: user?.displayName,
        reviewerEmail: user?.email,
        reviewDate: date,
        ratingPoint: parseInt(rating),
        reviewerComment: comments,
      };

      const { data } = await axiosSecure.post("/reviews", reviewInfo);
      const res = await axiosSecure.get(`/reviews/${scholarship_id}`);
      const allReviews = res.data;

      let totalRating = 0;
      const reviewRating = allReviews.map(
        (rating) => (totalRating += rating.ratingPoint)
      );
      const avgRating = totalRating / allReviews.length;
      
      const res2 = await axiosSecure.patch(`/update-scholarships/${scholarship_id}`, {rating: avgRating})
      console.log(res2.data, "rating updated");

      if (data.insertedId) {
        closeModal();
        toast.success("Review added successfully");
        reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Transition appear show={isOpen}>
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
                    Add a Review
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

export default ReviewModal;
