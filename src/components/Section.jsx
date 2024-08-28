// src/components/Section.jsx
import PropTypes from "prop-types";

function Section({ title, content, imageUrl }) {
  return (
    <div className="flex flex-col lg:flex-row items-center my-10 p-5 rounded-md shadow-md bg-gray-800 mx-20">
      <img
        src={imageUrl}
        alt={title}
        className="w-full lg:w-1/3 h-82 object-cover rounded-md"
      />
      <div className=" w-full lg:w-2/3 mt-5 lg:mt-0 lg:ml-10">
        <h2 className="text-2xl font-bold text-jaune_univerdog_01">{title}</h2>
        <p className="mt-2 text-lg text-gray-400 font-normal ">{content}</p>
        {/* Button Partez explorer */}
        <div className="ml-auto mr-28 text-right w-full">
          <a href="/login">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              Découvrir
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Section;
