import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate3 = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto shadow-xl p-12 overflow-hidden flex flex-col" id="cv-preview">
      {/* Header - Left aligned with vertical accent */}
      <div className="flex gap-4 mb-8 pb-6 border-b-2 border-green-200">
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-24 h-24 rounded object-cover border-2 border-green-600"
          />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-green-800 mb-1">
            {data.firstName} {data.lastName}
          </h1>
          {data.jobTitle && (
            <p className="text-xl text-green-600 mb-3">{data.jobTitle}</p>
          )}
          <div className="flex gap-4 text-sm text-gray-600">
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>☎ {data.countryCode} {data.phone}</span>}
            {data.location && <span>📍 {data.location}</span>}
          </div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="flex gap-8">
        {/* Left Column */}
        <div className="w-2/3 space-y-6">
          {/* Summary */}
          {data.summary && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-1 bg-green-600"></span>
                PERFIL
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {data.jobTitle && data.company && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-green-600"></span>
                EXPERIÊNCIA
              </h2>
              <div className="relative pl-6 border-l-2 border-green-300">
                <div className="absolute -left-2 top-0 w-3 h-3 bg-green-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-800">{data.jobTitle}</h3>
                <p className="text-green-600 font-semibold mb-1">{data.company}</p>
                {(data.expStartDate || data.expEndDate) && (
                  <p className="text-sm text-gray-500 mb-2">
                    {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                  </p>
                )}
                {data.responsibilities && (
                  <p className="text-gray-700 leading-relaxed text-justify">{data.responsibilities}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.degree && data.institution && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-green-600"></span>
                FORMAÇÃO
              </h2>
              <div className="relative pl-6 border-l-2 border-green-300">
                <div className="absolute -left-2 top-0 w-3 h-3 bg-green-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-800">{data.degree}</h3>
                <p className="text-green-600 font-semibold mb-1">{data.institution}</p>
                {(data.startDate || data.endDate) && (
                  <p className="text-sm text-gray-500">
                    {data.startDate && new Date(data.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.endDate ? new Date(data.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - Skills */}
        <div className="w-1/3">
          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-1 bg-green-600"></span>
                SKILLS
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-green-50 border-l-4 border-green-600 px-3 py-2">
                    <span className="text-gray-700 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
