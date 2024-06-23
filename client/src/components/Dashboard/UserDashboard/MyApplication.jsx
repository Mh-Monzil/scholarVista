import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import ReviewModal from "../../Modal/ReviewModal";
import UseAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyApplication = () => {
  const {user} = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const [reviewScholarship, setReviewScholarship] = useState({});

  const { data: appliedScholarship = [], refetch } = useQuery({
    queryKey: ["appliedScholarship"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-applied-scholarships/${user?.email}`);
      
      return data;
    },
  });
  console.log(appliedScholarship);

  const editApplication = (status, id) => {
    if (status === "processing")
      return toast.error("Cannot edit application is processing");
    navigate(`edit-Application/${id}`);
  };

  const deleteApplication = async (id) => {
    const { data } = await axiosSecure.delete(`/my-applied-scholarship/${id}`);
    console.log(data);
    if (data.deletedCount > 0) {
      refetch();
      toast.success("Application deleted successfully");
    }
  };

  const openModal = (scholarship) => {
    setIsOpen(true);
    setReviewScholarship(scholarship);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ReviewModal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        reviewScholarship={reviewScholarship}
      />
      <h2 className="text-2xl md:text-3xl font-bold underline">
        My Application
      </h2>
      <div className="overflow-x-auto mt-6 shadow-md">
        <table className="table">
          {/* head */}
          <thead className="bg-navy text-white">
            <tr className="text-center font-medium">
              <th>University Name</th>
              <th>University Address</th>
              <th>Subject Category</th>
              <th>Applied Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Status</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Cancel</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {appliedScholarship?.map((scholarship) => (
              <tr key={scholarship?._id} className="text-center font-medium text-lg">
                <td>{scholarship?.universityName}</td>
                <td>{scholarship?.universityLocation}</td>
                <td>{scholarship?.subjectCategory}</td>
                <td>{scholarship?.degree}</td>
                <td>${scholarship?.applicationFees}</td>
                <td>${scholarship?.serviceCharge}</td>
                <td>{scholarship?.status}</td>
                <td>
                  <Link
                    to={`/scholarship-details/${scholarship?.scholarship_id}`}
                  >
                    <button className="bg-green-200 rounded-md py-1.5 px-3 text-green-700 font-semibold">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() =>
                      editApplication(scholarship?.status, scholarship?._id)
                    }
                    className="bg-blue-200 rounded-md py-1.5 px-5 text-blue-700 font-semibold"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteApplication(scholarship?._id)}
                    className="bg-red-200 rounded-md py-1.5 px-3 text-rose-700 font-semibold"
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => openModal(scholarship)}
                    className="bg-yellow/90 rounded-md py-1.5 px-3 text-navy font-semibold"
                  >
                    Add Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
