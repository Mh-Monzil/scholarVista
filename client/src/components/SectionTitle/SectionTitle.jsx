

const SectionTitle = ({title, description}) => {
    return (
        <div className="">
            <h2 className=" text-4xl md:text-5xl font-bold md:w-[600px] mx-auto text-center leading-10 md:leading-[70px]">{title}</h2>
            <p className="text-lg font-semibold md:max-w-[800px] mx-auto text-center py-4">{description}</p>
        </div>
    );
};

export default SectionTitle;