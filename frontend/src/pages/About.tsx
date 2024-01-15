import koul from "../assets/koul.jpeg"
import rishab from "../assets/rishab.jpeg"
import singla from "../assets/singla.jpeg"
import aswani from "../assets/Ashwani.jpeg"
import  "../App.css"

const About = () => {
  const developers = [
    {
      id: 1,
      name: "Aditya Koul",
      role: "Front-end Developer",
      image: koul,
      post: "Passionate about coding and building awesome applications. Expert in front-end technologies.",
    },
    {
      id: 2,
      name: "Rishab sharma",
      role: "UI/UX Designer",
      image: rishab,
      post: "Back-end wizard with a focus on performance and scalability. Loves solving complex problems.",
    },
    {
      id: 3,
      name: "Vinay Singla(Team Lead)",
      role: "Full-stack Developer",
      image: singla,
      post: "Full-stack enthusiast who enjoys working on both client , server-side development and Machine Learning",
    },
    {
      id: 4,
      name: "Aswani",
      role: "Mentor",
      image: aswani,
      post: "UI/UX designer with a keen eye for detail. Creates beautiful and intuitive user interfaces.",
    },
  ];
  return (
    <div>
      <div className="flex w-full text-center items-center justify-center flex-col">
        <h1 className="font-bold my-10 text-4xl">About Our Developers</h1>
        <p className=" font-semibold mb-5 text-2xl">
          Welcome to our developer team's About page! Learn more about the
          talented individuals behind our projects.
        </p>
      </div>

      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-2">
        {developers.map((developer, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={developer.image}
              className="w-full h-[400px] object-cover object-center"
            />

            <div className="p-4 h-auto">
              <h3 className="text-gray-600 mb-2 font-semibold">
                <span className="text-xl font-bold text-emerald-500">
                  {developer.name}
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{developer.role}
              </h3>
              <p className="text-gray-600 italic overflow-hidden overflow-ellipsis">
                {developer.post}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
