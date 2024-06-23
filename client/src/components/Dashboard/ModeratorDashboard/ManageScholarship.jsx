import { Fragment, useState } from "react";
import UseAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageScholarship = () => {
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [scholarship, setScholarship] = useState({});
  const { register, handleSubmit, reset } = useForm();

  const { data: scholarships = [], isLoading, refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/scholarships");
      console.log(data);
      return data;
    },
  });

  const openModal = (scholarship) => {
    reset();
    setIsOpen(true);
    setScholarship(scholarship);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteApplication = async (id) => {
    console.log(id, "delete");
    const {data} = await axiosSecure.delete(`/scholarship/${id}`);
    console.log(data);
    if(data.deletedCount > 0){
      toast.success("Scholarships deleted successfully")
      refetch();
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axiosSecure.patch(
        `/update-scholarships/${scholarship?._id}`,
        data
      );
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Scholarship Updated successfully");
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
          Manage Scholarships
        </h2>
        <div className="overflow-x-auto mt-6 shadow-md">
          <table className="table">
            {/* head */}
            <thead className="bg-navy text-white">
              <tr className="text-center font-medium">
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Details</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship) => (
                <tr
                  key={scholarship?._id}
                  className="text-center font-medium text-lg"
                >
                  <td>{scholarship?.scholarshipName}</td>
                  <td>{scholarship?.universityName}</td>
                  <td>{scholarship?.subjectCategory}</td>
                  <td>{scholarship?.degree}</td>
                  <td>${scholarship?.applicationFees}</td>
                  <td>
                    <Link to={`/scholarship-details/${scholarship?._id}`}>
                      <button className=" tooltip" data-tip="Details">
                        <TbListDetails className="text-3xl text-green-500 mx-auto cursor-pointer" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(scholarship)}
                      className=" tooltip"
                      data-tip="Edit"
                    >
                      <FaRegEdit className="text-3xl text-blue-500 mx-auto cursor-pointer" />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteApplication(scholarship?._id)}
                      className="tooltip"
                      data-tip="Delete"
                    >
                      <MdDelete className="text-4xl text-rose-500 mx-auto cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* edit modal  */}
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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
                    Edit Scholarship
                  </DialogTitle>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" grid grid-cols-1  md:grid-cols-2 md:gap-x-5"
                  >
                    {/* university name  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="universityName"
                      >
                        University Name
                      </label>
                      <input
                        id="universityName"
                        autoComplete="universityName"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="text"
                        defaultValue={scholarship?.universityName}
                        {...register("universityName", { required: true })}
                      />
                    </div>

                    {/*   Scholarship Category */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor=" scholarshipCategory"
                      >
                        Scholarship Category
                      </label>
                      <input
                        id="scholarshipCategory"
                        autoComplete="scholarshipCategory"
                        className="block w-full px-4 py-1.5 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                        type="text"
                        defaultValue={scholarship?.scholarshipCategory}
                        {...register("scholarshipCategory", { required: true })}
                      />
                    </div>

                    {/* scholarship name  */}
                  <div className="mt-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-600 "
                      htmlFor="scholarshipName"
                    >
                      Scholarship Name
                    </label>
                    <input
                      id="scholarshipName"
                      autoComplete="scholarshipName"
                      className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                      type="text"
                      defaultValue={scholarship?.scholarshipName}
                      {...register("scholarshipName", {
                        required: true,
                      })}
                    />
                  </div>

                    {/* University Location  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="universityLocation"
                      >
                        University Location
                      </label>
                      <input
                        id="universityLocation"
                        autoComplete="universityLocation"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="text"
                        defaultValue={scholarship?.universityLocation}
                        {...register("universityLocation", { required: true })}
                      />
                    </div>

                    {/* Application Deadline  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="applicationDeadline"
                      >
                        Application Deadline
                      </label>
                      <input
                        id="applicationDeadline"
                        autoComplete="applicationDeadline"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="date"
                        defaultValue={scholarship?.applicationDeadline}
                        {...register("applicationDeadline", { required: true })}
                      />
                    </div>

                    {/* applying degree */}
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-600 "
                          htmlFor="degree"
                        >
                          Applying Degree
                        </label>
                      </div>

                      <select
                        id="degree"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        defaultValue={scholarship?.degree}
                        {...register("degree", { required: true })}
                      >
                        <option>Select Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                      </select>
                    </div>

                    {/* Subject Category  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="subjectCategory"
                      >
                        Subject Category
                      </label>
                      <input
                        id="subjectCategory"
                        autoComplete="subjectCategory"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="text"
                        defaultValue={scholarship?.subjectCategory}
                        {...register("subjectCategory", { required: true })}
                      />
                    </div>

                    {/* subject name */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="subjectName"
                      >
                        Subject Name
                      </label>
                      <input
                        id="subjectName"
                        autoComplete="subjectName"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="text"
                        defaultValue={scholarship?.subjectName}
                        {...register("subjectName", { required: true })}
                      />
                    </div>

                    {/* application fees  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="applicationFees"
                      >
                        Application Fees ($)
                      </label>
                      <input
                        id="applicationFees"
                        autoComplete="applicationFees"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="text"
                        defaultValue={scholarship?.applicationFees}
                        {...register("applicationFees", { required: true })}
                      />
                    </div>

                    {/* scholarship description  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="scholarshipDescription"
                      >
                        Scholarship Description
                      </label>
                      <input
                        id="scholarshipDescription"
                        autoComplete="scholarshipDescription"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="text"
                        defaultValue={scholarship?.scholarshipDescription}
                        {...register("scholarshipDescription", {
                          required: true,
                        })}
                      />
                    </div>

                    {/* stipend  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="stipend"
                      >
                        Stipend
                      </label>
                      <input
                        id="stipend"
                        autoComplete="stipend"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="text"
                        defaultValue={scholarship?.stipend}
                        {...register("stipend", {
                          required: true,
                        })}
                      />
                    </div>

                    {/* service charge  */}
                    <div className="mt-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="serviceCharge"
                      >
                        Service Charge ($)
                      </label>
                      <input
                        id="serviceCharge"
                        autoComplete="serviceCharge"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
                        type="number"
                        defaultValue={scholarship?.serviceCharge}
                        {...register("serviceCharge", {
                          required: true,
                        })}
                      />
                    </div>

                    <div className="mt-6 md:col-span-2">
                      <button
                        type="submit"
                        className="w-full px-6 py-3 text-lg font-semibold tracking-wide  capitalize transition-colors duration-300 transform bg-yellow rounded-sm hover:bg-navy hover:text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
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

export default ManageScholarship;
