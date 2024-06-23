import YellowButton from "../../components/Shared/YellowButton";
import Lottie from "lottie-react";
import contactAnimation from '/public/contact.json';

const Contact = () => {

  return (
    <section className="  text-gray-900">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
        <div className="py-6 md:py-0 md:px-6">
        <Lottie className="" animationData={contactAnimation} ></Lottie>
        </div>
        <form
          noValidate=""
          className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
        >
          <label className="block">
            <span className="mb-1">Full name</span>
            <input
              type="text"
              placeholder="Mohiuddin Monzil"
              className="block w-full rounded-md shadow-sm border  focus:border-navy p-3 "
            />
          </label>
          <label className="block">
            <span className="mb-1">Email address</span>
            <input
              type="email"
              placeholder="name@gmail.com"
              className="block w-full rounded-md shadow-sm border  focus:border-navy p-3"
            />
          </label>
          <label className="block">
            <span className="mb-1">Message</span>
            <textarea
              rows="3"
              className="block w-full rounded-md shadow-sm border  focus:border-navy p-3"
            ></textarea>
          </label>
          <button>
            <YellowButton label={"Contact"} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
