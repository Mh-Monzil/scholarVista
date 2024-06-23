import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try{
      const res = await axiosSecure.post('/scholarships', data);
      console.log(res.data);
      if(res.data.insertedId){
        toast.success("Scholarship added successfully")
        reset();
      }
    }catch(error){
      console.log(error);
    }
  };


  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold underline">
        Add Scholarship
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto mt-16 grid grid-cols-1  md:grid-cols-2 md:gap-x-5"
      >
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
            {...register("scholarshipName", {
              required: true,
            })}
          />
        </div>

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
            {...register("universityName", { required: true })}
          />
        </div>

        {/* photo url  */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="photo"
          >
            Photo URL
          </label>
          <input
            id="photo"
            autoComplete="photo"
            className="block w-full px-4 py-1.5 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            type="file"
            {...register("photo", { required: true })}
            accept="image/*"
          />
        </div>

        {/*   University Country */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor=" universityCountry"
          >
            University Country
          </label>
          <input
            id="universityCountry"
            autoComplete="universityCountry"
            className="block w-full px-4 py-1.5 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            type="text"
            {...register("universityCountry", { required: true })}
          />
        </div>

        {/*   University City */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor=" universityCity"
          >
            University City
          </label>
          <input
            id="universityCity"
            autoComplete="universityCity"
            className="block w-full px-4 py-1.5 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            type="text"
            {...register("universityCity", { required: true })}
          />
        </div>

        {/*   University World Rank */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor=" universityWorldRank"
          >
            University World Rank
          </label>
          <input
            id="universityWorldRank"
            autoComplete="universityWorldRank"
            className="block w-full px-4 py-1.5 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            type="text"
            {...register("universityWorldRank", { required: true })}
          />
        </div>

        {/* Subject Category */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 "
              htmlFor="subjectCategory"
            >
              Subject Category
            </label>
          </div>
          <select
            id="subjectCategory"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            {...register("subjectCategory", { required: true })}
          >
            <option>Select Subject Category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
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
            {...register("subjectName", { required: true })}
          />
        </div>

        {/* Scholarship Category */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 "
              htmlFor="scholarshipCategory"
            >
              Scholarship Category
            </label>
          </div>
          <select
            id="scholarshipCategory"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            {...register("scholarshipCategory", { required: true })}
          >
            <option>Select Subject Category</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        {/* Applied degree */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 "
              htmlFor="degree"
            >
              Applied Degree
            </label>
          </div>

          <select
            id="degree"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            {...register("degree", { required: true })}
          >
            <option>Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* tuition fees  */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="tuitionFees"
          >
            Tuition Fees ($)
          </label>
          <input
            id="tuitionFees"
            autoComplete="tuitionFees"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-orange-200 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-orange-200"
            type="text"
            {...register("tuitionFees", { required: true })}
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
            {...register("applicationFees", { required: true })}
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
            {...register("serviceCharge", {
              required: true,
            })}
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
            {...register("applicationDeadline", { required: true })}
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
            {...register("stipend", {
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
    </div>
  );
};

export default AddScholarship;
