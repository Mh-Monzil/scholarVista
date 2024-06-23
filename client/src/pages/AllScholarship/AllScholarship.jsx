import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import Card from "../../components/Card/Card";
import ScaleLoader from "react-spinners/ScaleLoader";
import YellowButton from "../../components/Shared/YellowButton";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllScholarship = () => {
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [notFound, setNotFound] = useState('');
  const [scholarships, setScholarships] = useState([]);

  const { data : scholar = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/scholarships");
      // console.log(data);
      setScholarships(data);
    },
  });

  const onSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.searchValue.value;
    console.log(searchValue);

    try{
      const { data } = await axiosSecure.get(`/scholarship-search/${searchValue}`)
      console.log(data);
      if(typeof data === "string"){
        setNotFound("Nor Scholarship Available");
      }else{
        setScholarships(data);
      }
    }catch(error){
      console.log(error.message);
    }

  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <ScaleLoader className=" " height={30} width={3} color="#F2A227" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold pt-10 pb-3">
          All ScholarShips
        </h2>
        <p className="text-lg font-medium px-4">
          Discover all available scholarships from top universities worldwide.
          Explore diverse categories, detailed information, and application
          requirements in one place.
        </p>
      </div>

      <form onSubmit={onSearch} className="flex items-center gap-2 mt-12">
        <input
          type="text"
          name="searchValue"
          placeholder="Type here"
          className="input input-bordered input-warning w-full max-w-xs "
        />
        <button type="submit">
          <YellowButton label={"Search"} />
        </button>
      </form>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
        {scholarships.map((scholar) => (
          <Card key={scholar._id} scholar={scholar} />
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
