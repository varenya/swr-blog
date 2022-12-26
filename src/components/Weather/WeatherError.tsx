import { ArrowPathIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { FallbackProps } from "react-error-boundary";

function WeatherError({ error, resetErrorBoundary }: FallbackProps) {
  const showRetry = error.cause && error.cause == "network";
  return (
    <div className="bg-white w-1/4 mx-auto rounded-lg p-8">
      <div className="rounded-md bg-red-50 p-6 mt-4">
        <div className="flex justify-center gap-4 flex-col">
          <div className="flex justify-center gap-2 items-center">
            <XCircleIcon className="h-8 w-8 text-red-400" aria-hidden="true" />
            <h3 className="text-lg text-red-500">{error.message}</h3>
          </div>
          {showRetry ? (
            <div>
              <button
                type="button"
                className="mx-auto flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={resetErrorBoundary}
              >
                <ArrowPathIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Retry
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { WeatherError };
