import Banner from "../../components/Banner/Banner";
import Contact from "./Contact";
import Location from "./Location";
import StudentsReview from "./StudentsReview";
import TopScholarship from "./TopScholarship";


const Home = () => {
    return (
        <div>
            <Banner />
            <TopScholarship />
            <StudentsReview />
            <Contact />
            <Location />
        </div>
    );
};

export default Home;