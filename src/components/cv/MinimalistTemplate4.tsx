import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate4 = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl p-16" id="cv-preview">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-6xl font-light text-purple-800 mb-2">
              {data.firstName}
            </h1>
            <h1 className="text-6xl font-bold text-purple-900 mb-4">
              {data.lastName}
            </h1>
            {data.jobTitle && (
              <p className="text-lg text-purple-600 font-light tracking-wide uppercase">
                {data.jobTitle}
              </p>
            )}
          </div>
          {data.photoPreview && (
            <img 
              src={data.photoPreview} 
              alt="Profile" 
              className="w-28 h-28 object-cover grayscale"
            />
          )}
        </div>
        
        <div className="h-px bg-purple-300 my-6"></div>
        
        <div className="flex gap-8 text-sm text-gray-600 font-light">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.countryCode} {data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed font-light text-lg">
            {data.summary}
          </p>
        </div>
      )}
      
      {/* Experience */}
      {data.jobTitle && data.company && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-purple-900 uppercase tracking-widest mb-6">
            Experiência
          </h2>
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-lg font-semibold text-purple-700">{data.jobTitle}</h3>
              {(data.expStartDate || data.expEndDate) && (
                <span className="text-sm text-gray-500 font-light">
                  {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
                </span>
              )}
            </div>
            <p className="text-purple-600 mb-3 font-light">{data.company}</p>
            {data.responsibilities && (
              <p className="text-gray-700 leading-relaxed font-light">
                {data.responsibilities}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Education */}
      {data.degree && data.institution && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-purple-900 uppercase tracking-widest mb-6">
            Formação
          </h2>
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-lg font-semibold text-purple-700">{data.degree}</h3>
            {(data.startDate || data.endDate) && (
              <span className="text-sm text-gray-500 font-light">
                {data.startDate && new Date(data.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {data.endDate ? new Date(data.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Cursando'}
              </span>
            )}
          </div>
          <p className="text-purple-600 font-light">{data.institution}</p>
        </div>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-purple-900 uppercase tracking-widest mb-6">
            Habilidades
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 border border-purple-300 text-purple-700 font-light text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};