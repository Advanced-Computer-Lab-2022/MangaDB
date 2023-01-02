import { Fragment } from "react";
import { StarIcon as Star } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AverageSummary = (props) => {
  const totalCount =
    +props.count[0].count +
    props.count[1].count +
    props.count[2].count +
    props.count[3].count +
    props.count[4].count;

  const weightedSum =
    +props.count[0].rating * +props.count[0].count +
    +props.count[1].rating * +props.count[1].count +
    +props.count[2].rating * +props.count[2].count +
    +props.count[3].rating * +props.count[3].count +
    +props.count[4].rating * +props.count[4].count;

  const weightedAvergae = weightedSum / totalCount;

  const avgRating = Math.round(weightedAvergae * 10) / 10;

  return (
    <Fragment>
      <div className="flex items-center">
        <div>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Star
                key={rating}
                className={classNames(
                  avgRating > rating ? "text-yellow-400" : "text-gray-300",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        <p className="ml-2 text-sm text-gray-900">
          Based on {totalCount} reviews
        </p>
      </div>
      <div className="mt-6">
        <dl className="space-y-3">
          {props.count.map((count) => (
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
                          width: `calc(${count.count} / ${totalCount} * 100%)`,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                {!isNaN(Math.round((count.count / totalCount) * 100)) ? Math.round((count.count / totalCount) * 100) : 0}%
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Fragment>
  );
};
export default AverageSummary;
