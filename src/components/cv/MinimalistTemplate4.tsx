import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate4 = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl" id="cv-preview">
      {/* Left accent bar */}
      <div className="flex h-full">
        <div className="w-2 bg-gradient-to-b from-purple-600 to-purple-400"></div>
        
        <div className="flex-1 p-16">
          {/* Header with photo inline */}
          <div className="flex items-center gap-6 mb-10">
            {data.photoPreview && (
              <img 
                src={data.photoPreview} 
                alt="Profile" 
                className="w-28 h-28 rounded object-cover grayscale"
              />
            )}
            <div className="flex-1">
              <h1 className="text-5xl font-extralight text-purple-900">
                {data.firstName}
              </h1>
              <h1 className="text-5xl font-bold text-purple-900 mb-2">
                {data.lastName}
              </h1>
              {data.jobTitle && (
                <p className="text-base text-purple-600 font-light tracking-wider">
                  {data.jobTitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Contact */}
          <div className="mb-10 pb-6 border-b border-purple-200">
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 font-light">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.countryCode} {data.phone}</span>}
              {data.location && <span>{data.location}</span>}
            </div>
          </div>
          
          {/* Summary */}
          {data.summary && (
            <div className="mb-10">
              <p className="text-gray-700 leading-relaxed font-light text-base border-l-4 border-purple-400 pl-6">
                {data.summary}
              </p>
            </div>
          )}
          
          {/* Timeline style content */}
          <div className="space-y-10">
            {/* Experience */}
            {data.jobTitle && data.company && (
              <div className="relative">
                <div className="absolute left-0 top-0 w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="pl-8">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-2">Experiência Profissional</p>
                  <h3 className="text-xl font-semibold text-purple-800">{data.jobTitle}</h3>
                  <p className="text-purple-600 mb-2 font-light">{data.company}</p>
                  {(data.expStartDate || data.expEndDate) && (
                    <p className="text-sm text-gray-500 font-light mb-3">
                      {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                    </p>
                  )}
                  {data.responsibilities && (
                    <p className="text-gray-700 leading-relaxed font-light text-sm">
                      {data.responsibilities}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Education */}
            {data.degree && data.institution && (
              <div className="relative">
                <div className="absolute left-0 top-0 w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="pl-8">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-2">Formação Acadêmica</p>
                  <h3 className="text-xl font-semibold text-purple-800">{data.degree}</h3>
                  <p className="text-purple-600 font-light mb-2">{data.institution}</p>
                  {(data.startDate || data.endDate) && (
                    <p className="text-sm text-gray-500 font-light">
                      {data.startDate && new Date(data.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {data.endDate ? new Date(data.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Skills */}
            {skills.length > 0 && (
              <div className="relative">
                <div className="absolute left-0 top-0 w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="pl-8">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-4">Habilidades</p>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="text-gray-700 font-light text-sm py-1"
                      >
                        • {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
