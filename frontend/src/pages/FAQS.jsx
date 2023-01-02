import { Fragment, useEffect, useState } from "react";
import NavBarSearch from "../components/UI/NavBar/NavBarSearch";
import { useNavigate } from "react-router-dom";
const faqs = [
  {
    id: 1,
    question: "What Do I Get My Certificate?",
    answer: "When You Pass The Final Exam And Finish Watching All Lessons.",
  },
  {
    id: 2,
    question: "Can I Get A Refund If I Don't Like The Course I Just Bought?",
    answer:
      "You Can Always Be Refunded If You Have Only Attended 50% Of The Course.",
  },
  {
    id: 3,
    question: "How Can I Become An Instructor?",
    answer: "Contact The CanCham Admin To Create An Account For You.",
  },
  {
    id: 4,
    question: "Can I Rewatch A Lesson?",
    answer:
      "Yes, You Can Rewatch A Lesson At Any Time If You Are Registered For The Course.",
  },
  {
    id: 5,
    question: "Can I Take Notes While Watching The Video?",
    answer: "Yes, You Can Take Notes And Also Download Them Later.",
  },
  {
    id: 6,
    question: "Is There A Way To Ask My Instructor A Question?",
    answer: "Yes, You Can Ask Questions Via The Questions And Answers Section.",
  },
];
const FAQS = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if(role === "ADMIN"){
      navigate('/403')
    }
    window.scrollTo(0, 0, "smooth");
  }, []);
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem("countryCode") === null
      ? "US"
      : localStorage.getItem("countryCode")
  );

  const onChangeHandler = (e) => {
    setCountryCode(e);
    localStorage.setItem("countryCode", e);
  };

  return (
    <Fragment>
      <NavBarSearch onChange={onChangeHandler} currentTab="FAQs" />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl lg:mx-auto lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Can’t find the answer you’re looking for? Send us an email at
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                info@cancham.org.eg
              </p>
            </p>
          </div>
          <div className="mt-12">
            <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="font-semibold text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default FAQS;
