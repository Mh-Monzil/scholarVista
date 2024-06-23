import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import Card from "../../components/Card/Card";
import NavyButton from "../../components/Shared/NavyButton";
import { Link } from "react-router-dom";

const TopScholarship = () => {
  const axiosPublic = UseAxiosPublic();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/top-scholarships");
      console.log(data);
      return data.slice(0, 6);
    },
  });

  return (
    <div className="max-w-7xl mx-auto mt-12 lg:mt-24 p-4">
      <SectionTitle
        title={"Top Scholarship"}
        description={
          "Discover the pinnacle of educational opportunities! Explore our curated selection of top scholarships, opening doors to academic excellence and success."
        }
      />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
        {scholarships?.map((scholar) => (
          <Card key={scholar._id} scholar={scholar} />
        ))}
      </div>
      <div className="w-64 mx-auto md:mx-0 md:ml-auto my-12">
        <Link to="/all-scholarship">
        <NavyButton  label={"See All Scholarship"} />
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;
