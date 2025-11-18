import { useState, useEffect } from 'react';

const AnalysisLoader = ({ stages, currentStage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStage > 0) {
      const percentage = (currentStage / stages.length) * 100;
      setProgress(percentage);
    }
  }, [currentStage, stages.length]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg border border-blue-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Analyzing Your Resume
        </h3>
        <p className="text-sm text-gray-600">
          Please wait while we process your resume...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-right">
          {Math.round(progress)}% Complete
        </p>
      </div>

      {/* Stages List */}
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStage;
          const isActive = index === currentStage;
          const isPending = index > currentStage;

          return (
            <div
              key={stage.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-blue-50 border-2 border-blue-400'
                  : isCompleted
                  ? 'bg-green-50 border-2 border-green-400'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {/* Stage Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-blue-500 animate-pulse'
                    : isCompleted
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : isActive ? (
                  <svg
                    className="w-6 h-6 text-white animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <span className="text-white font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Stage Info */}
              <div className="flex-1">
                <h4
                  className={`font-semibold ${
                    isActive
                      ? 'text-blue-700'
                      : isCompleted
                      ? 'text-green-700'
                      : 'text-gray-500'
                  }`}
                >
                  {stage.name}
                </h4>
                <p
                  className={`text-sm ${
                    isActive
                      ? 'text-blue-600'
                      : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  {stage.description}
                </p>
              </div>

              {/* Status Badge */}
              <div>
                {isCompleted && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Complete
                  </span>
                )}
                {isActive && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Processing...
                  </span>
                )}
                {isPending && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                    Pending
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisLoader;
