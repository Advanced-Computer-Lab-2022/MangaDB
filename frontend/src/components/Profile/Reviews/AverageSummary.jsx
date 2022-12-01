import { Fragment } from "react";
import { StarIcon as Star } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Avgreviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1092 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
};
const AverageSummary = (props) => {
  return (
    <Fragment>
      <div className="mt-3 flex items-center">
        <div>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Star
                key={rating}
                className={classNames(
                  Avgreviews.average > rating
                    ? "text-yellow-400"
                    : "text-gray-300",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <p className="ml-2 text-sm text-gray-900">
          Based on {Avgreviews.totalCount} reviews
        </p>
      </div>
      <div className="mt-6">
        <dl className="space-y-3">
          {Avgreviews.counts.map((count) => (
            <div key={count.rating} className="flex items-center text-sm">
              <dt className="flex-1 flex items-center">
                <p className="w-3 font-medium text-gray-900">{count.rating}</p>
                <div
                  aria-hidden="true"
                  className="ml-1 flex-1 flex items-center"
                >
                  <Star
                    className={classNames(
                      count.count > 0 ? "text-yellow-400" : "text-gray-300",
                      "flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />

                  <div className="ml-3 relative flex-1">
                    <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                    {count.count > 0 ? (
                      <div
                        className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                        style={{
                          width: `calc(${count.count} / ${Avgreviews.totalCount} * 100%)`,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                {Math.round((count.count / Avgreviews.totalCount) * 100)}%
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Fragment>
  );
};
export default AverageSummary;
