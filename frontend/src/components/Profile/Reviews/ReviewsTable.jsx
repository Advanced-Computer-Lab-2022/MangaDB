import Review from "./Review";

const ReviewsTable = (props) => {
  return (
    <div className="flex flex-col my-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-8">
            <div
              className="grid grid-flow-row gap-y-8"
            >
              {props.reviews.map((review, reviewIdx) => (
                <div
                  key={review.email}
                  className={reviewIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <Review
                    rating={review.rating}
                    content={review.content}
                    date={review.date}
                    author={review.author}
                    id={review.id}
                  ></Review>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewsTable;
