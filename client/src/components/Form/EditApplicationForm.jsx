import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils/image";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditApplicationForm = () => {
  const application = useLoaderData();
  const {id} = useParams();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

console.log(id);
  const {
    scholarship_id,
    phone,
    image_url,
    address,
    gender,
    degree,
    sscResult,
    hscResult,
    studyGap,
    universityName,
    scholarshipCategory,
    subjectCategory,
  } = application;

  const onSubmit = async (data) => {
    
    // console.log(data);
    const {
      phone,
      address,
      gender,
      degree,
      sscResult,
      hscResult,
      studyGap
    } = data;

    
    
    
    try{
        const editedInfo = {

            scholarship_id,
          phone,
          image_url,
          address,
          gender,
          degree,
          sscResult,
          hscResult,
          studyGap,
          universityName,
          scholarshipCategory,
          subjectCategory
        };
        
        const res = await axiosSecure.patch(`/applied-scholarships/${id}`, editedInfo);
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            toast.success("Application edited successfully")
        }else{
            toast.error("Data is up to date")
        }

    }catch(error){
        console.log(error.message);
    }

  };

  console.log(application);
  return (
    <div className="max-w-5xl mx-auto my-12 shadow-md p-8">
      <h2 className="text-center my-4 text-3xl font-semibold">
        Edit Application Form
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid grid-cols-1  md:grid-cols-2 md:gap-x-5"
      >
        {/* phone number  */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            id="phone"
            autoComplete="phone"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="tel"
            defaultValue={phone}
            {...register("phone", { required: true })}
          />
        </div>

        {/* address  */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="address"
          >
            Address
          </label>
          <input
            id="address"
            autoComplete="address"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            defaultValue={address}
            {...register("address", { required: true })}
          />
        </div>

        {/* gender  */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 "
              htmlFor="gender"
            >
              Gender
            </label>
          </div>

          <select
            id="gender"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue={gender}
            {...register("gender", { required: true })}
          >
            <option>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue={degree}
            {...register("degree", { required: true })}
          >
            <option>Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* ssc result  */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="sscResult"
          >
            SSC Result
          </label>
          <input
            id="sscResult"
            autoComplete="sscResult"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            defaultValue={sscResult}
            {...register("sscResult", { required: true })}
          />
        </div>

        {/* hsc result  */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="hscResult"
          >
            HSC Result
          </label>
          <input
            id="hscResult"
            autoComplete="hscResult"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
            defaultValue={hscResult}
            {...register("hscResult", { required: true })}
          />
        </div>

        {/* study gap */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 "
              htmlFor="studyGap"
            >
              Study Gap <small>(optional)</small>
            </label>
          </div>

          <select
            id="studyGap"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            defaultValue={studyGap}
            {...register("studyGap")}
          >
            <option>Select Gap Year</option>
            <option value="1 year">1 Year</option>
            <option value="2 year">2 Year</option>
            <option value="3 year">3 Year</option>
            <option value="4 year +">4 Year +</option>
          </select>
        </div>

        {/* university name   */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="uniName"
          >
            University Name
          </label>
          <input
            id="uniName"
            defaultValue={universityName}
            readOnly
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
          />
        </div>
        {/* university name   */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="scholarshipCategory"
          >
            Scholarship Category
          </label>
          <input
            id="scholarshipCategory"
            defaultValue={scholarshipCategory}
            readOnly
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
          />
        </div>
        {/* university name   */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            htmlFor="subCategory"
          >
            Subject Category
          </label>
          <input
            id="subCategory"
            defaultValue={subjectCategory}
            readOnly
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="text"
          />
        </div>

        <div className="mt-6 md:col-span-2">
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-semibold tracking-wide  capitalize transition-colors duration-300 transform bg-yellow rounded-sm hover:bg-navy hover:text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApplicationForm;
