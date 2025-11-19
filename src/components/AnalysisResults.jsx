import ReactMarkdown from 'react-markdown';

// eslint-disable-next-line no-unused-vars
const AnalysisResults = ({ results, role, company }) => {
  if (!results) return null;

  const getChanceColor = (chance) => {
    const percentage = parseInt(chance);
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getChanceBgGradient = (chance) => {
    const percentage = parseInt(chance);
    if (percentage >= 70) return 'from-green-400 to-emerald-500';
    if (percentage >= 50) return 'from-amber-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </div>

      {/* Summary Card */}
      {results.summary && (
        <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Profile Summary</h3>
              <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
                <ReactMarkdown>{results.summary}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selection Probability - Hero Card */}
      {results.selection_chance && (
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="relative p-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Selection Probability</h3>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className={`text-7xl font-black ${getChanceColor(results.selection_chance)}`}>
                  {results.selection_chance}
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Success Rate</div>
                  <div className={`text-lg font-semibold ${getChanceColor(results.selection_chance)}`}>
                    {parseInt(results.selection_chance) >= 70 ? 'High Chance' : parseInt(results.selection_chance) >= 50 ? 'Moderate Chance' : 'Needs Improvement'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getChanceBgGradient(results.selection_chance)} transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: results.selection_chance }}
                >
                  <div className="w-full h-full flex items-center justify-end pr-3">
                    <span className="text-white text-xs font-bold">{results.selection_chance}</span>
                  </div>
                </div>
              </div>
            </div>

            {results.selection_reasoning && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none">
                    <ReactMarkdown>{results.selection_reasoning}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overall Assessment (when no role/company specified) */}
      {results.overall_assessment && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Overall Assessment
          </h3>
          <div className="text-gray-700 prose prose-sm max-w-none">
            <ReactMarkdown>{results.overall_assessment}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Strengths & Shortcomings - Premium Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        {results.strengths && results.strengths.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                Key Strengths
              </h3>
              <p className="text-green-100 text-sm mt-1">{results.strengths.length} identified</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start group hover:translate-x-1 transition-transform">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-green-200 transition-colors">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none flex-1">
                      <ReactMarkdown>{strength}</ReactMarkdown>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Shortcomings Card */}
        {results.shortcomings && results.shortcomings.length > 0 && (
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-lg border border-red-200 hover:shadow-xl transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                Areas for Improvement
              </h3>
              <p className="text-red-100 text-sm mt-1">{results.shortcomings.length} areas identified</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {results.shortcomings.map((shortcoming, index) => (
                  <li key={index} className="flex items-start group hover:translate-x-1 transition-transform">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-red-200 transition-colors">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none flex-1">
                      <ReactMarkdown>{shortcoming}</ReactMarkdown>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Actionable Recommendations */}
      {results.recommendations && results.recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                  Action Plan
                </h3>
                <p className="text-indigo-100 mt-1">Follow these recommendations to improve your chances</p>
              </div>
              <div className="hidden md:block">
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{results.recommendations.length}</div>
                  <div className="text-indigo-100 text-sm">Steps</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="group hover:scale-[1.02] transition-transform">
                  <div className="flex items-start p-5 bg-white rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1 prose prose-sm max-w-none">
                      <ReactMarkdown>{recommendation}</ReactMarkdown>
                    </div>
                    <div className="flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Recommended Roles/Companies - Modern Badges */}
      {(results.recommended_roles || results.recommended_companies) && (
        <div className="grid md:grid-cols-2 gap-6">
          {results.recommended_roles && results.recommended_roles.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-900">Best Fit Roles</h3>
                  <p className="text-purple-600 text-sm">Based on your profile</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.recommended_roles.map((role, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border-2 border-purple-200 text-purple-700 rounded-xl text-sm font-semibold hover:bg-purple-100 hover:border-purple-300 transition-all cursor-pointer shadow-sm"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {results.recommended_companies && results.recommended_companies.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg border border-indigo-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-900">Target Companies</h3>
                  <p className="text-indigo-600 text-sm">Great matches for you</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.recommended_companies.map((company, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border-2 border-indigo-200 text-indigo-700 rounded-xl text-sm font-semibold hover:bg-indigo-100 hover:border-indigo-300 transition-all cursor-pointer shadow-sm"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Career Roadmap Section */}
      {results.roadmap && (
        <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl shadow-lg border border-teal-200 p-8 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-teal-900">Your Career Roadmap</h3>
              <p className="text-teal-700 text-sm font-medium">Step-by-step path to achieve your goals</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Short Term */}
            {results.roadmap.short_term && results.roadmap.short_term.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-400">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">Short Term (1-3 Months)</h4>
                    <p className="text-sm text-gray-600">Immediate action items</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {results.roadmap.short_term.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1 prose prose-sm max-w-none text-gray-700">
                        <ReactMarkdown>{item}</ReactMarkdown>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mid Term */}
            {results.roadmap.mid_term && results.roadmap.mid_term.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-400">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">Mid Term (3-6 Months)</h4>
                    <p className="text-sm text-gray-600">Build momentum with these goals</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {results.roadmap.mid_term.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1 prose prose-sm max-w-none text-gray-700">
                        <ReactMarkdown>{item}</ReactMarkdown>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Long Term */}
            {results.roadmap.long_term && results.roadmap.long_term.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-400">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">Long Term (6-12 Months)</h4>
                    <p className="text-sm text-gray-600">Strategic objectives for career growth</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {results.roadmap.long_term.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1 prose prose-sm max-w-none text-gray-700">
                        <ReactMarkdown>{item}</ReactMarkdown>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-teal-100 rounded-xl border border-teal-300">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-teal-800 font-medium">
                <strong>Pro Tip:</strong> Break down each goal into smaller weekly tasks and track your progress. Consistency is key to achieving your career objectives!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Raw Analysis Fallback */}
      {results.raw_analysis && !results.summary && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Analysis
          </h3>
          <div className="prose prose-sm max-w-none text-gray-700">
            <ReactMarkdown>{results.raw_analysis}</ReactMarkdown>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default AnalysisResults;
