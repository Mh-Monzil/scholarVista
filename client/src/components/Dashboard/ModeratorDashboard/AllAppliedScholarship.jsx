import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import UseAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel, MdDelete, MdFeedback } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllAppliedScholarship = () => {
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [editScholarship, setEditScholarship] = useState({});

  const { data: allAppliedScholarships = [], refetch } = useQuery({
    queryKey: ["allAppliedScholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/applied-scholarships");
      console.log(data);
      return data;
    },
  });

  const deleteApplication = async (id) => {
    console.log(id);
    const { data } = await axiosSecure.delete(`/applied-scholarship/${id}`);
    console.log(data);
    if (data.deletedCount > 0) {
      refetch();
      toast.success("Application deleted successfully");
    }
  };

  const openModal = (scholarship) => {
    reset();
    setIsOpen(true);
    console.log(scholarship);
    setEditScholarship(scholarship);
  };

  const closeModal = () => {
    setIsOpen(false);
    console.log("close");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axiosSecure.patch(
        `/applied-scholarships/${editScholarship?._id}`,
        data
      );
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Application edited successfully");
        closeModal();
      } else {
        toast.error("Data is up to date");
      }
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold underline">
          All Applied Application
        </h2>
        <div className="overflow-x-auto mt-6 shadow-md">
          <table className="table">
            {/* head */}
            <thead className="bg-navy text-white">
              <tr className="text-center font-medium">
                <th>University Name</th>
                <th>Scholarship Name</th>
                <th>Scholarship Category</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Service Charge</th>
                <th>Status</th>
                <th>Details</th>
                <th>Feedback</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allAppliedScholarships?.map((scholarship) => (
                <tr
                  key={scholarship?._id}
                  className="text-center font-medium text-lg"
                >
                  <td>{scholarship?.universityName}</td>
                  <td>{scholarship?.scholarshipName}</td>
                  <td>{scholarship?.scholarshipCategory}</td>
                  <td>{scholarship?.subjectCategory}</td>
                  <td>{scholarship?.degree}</td>
                  <td>${scholarship?.applicationFees}</td>
                  <td>${scholarship?.serviceCharge}</td>
                  <td>{scholarship?.status}</td>
                  <td>
                    <Link
                      to={`/scholarship-details/${scholarship?.scholarship_id}`}
                    >
                      <button className=" tooltip" data-tip="Details">
                        <TbListDetails className="text-3xl text-green-500 mx-auto cursor-pointer" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(scholarship)}
                      className=" tooltip"
                      data-tip="Feedback"
                    >
                      <MdFeedback className="text-3xl text-orange-400 mx-auto cursor-pointer" />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteApplication(scholarship?._id)}
                      className="tooltip"
                      data-tip="Cancel"
                    >
                      <MdCancel className="text-3xl mb-1 text-rose-500 mx-auto cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal  */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-xl pb-3 font-medium text-center leading-6 text-gray-900"
                  >
                    Give your Feedback!
                  </DialogTitle>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" flex items-center mt-6"
                  >
                    {/* Feedback  */}
                    <div className=" w-full">
                      <input
                        id="feedback"
                        autoComplete="feedback"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-yellow/50 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-yellow/50"
                        type="text"
                        {...register("feedback", { required: true })}
                      />
                    </div>

                    <div className="">
                      <button
                        type="submit"
                        className="w-full px-6 py-2 text-lg font-semibold tracking-wide  capitalize transition-colors duration-300 transform bg-yellow rounded-sm hover:bg-navy hover:text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                      >
                        Submit
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

export default AllAppliedScholarship;
