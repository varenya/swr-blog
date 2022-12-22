import { XCircleIcon } from "@heroicons/react/20/solid";

function WeatherErrror() {
  return (
    <div className="bg-white w-1/4 mx-auto rounded-lg p-8">
      <header className="flex justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 -ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
          />
        </svg>
        <h1 className="text-4xl text-center">Weather</h1>
      </header>
      <div className="rounded-md bg-red-50 p-6 mt-4">
        <div className="flex justify-center gap-2">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-8 w-8 text-red-400" aria-hidden="true" />
          </div>
          <h3 className="text-2xl text-red-500">Error loading weather info</h3>
        </div>
      </div>
    </div>
  );
}

export { WeatherErrror };
