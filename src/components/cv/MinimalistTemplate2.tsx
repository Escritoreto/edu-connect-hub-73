import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate2 = ({ data }: Props) => {
  const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl p-16" id="cv-preview">
      {/* Compact Header with photo on the right */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-blue-200">
        <div>
          <h1 className="text-5xl font-light text-blue-900 mb-1">
            {data.firstName} <span className="font-bold">{data.lastName}</span>
          </h1>
          {data.jobTitle && (
            <p className="text-lg text-blue-600 font-light uppercase tracking-widest mt-2">
              {data.jobTitle}
            </p>
          )}
        </div>
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-300"
          />
        )}
      </div>
      
      {/* Contact in single line */}
      <div className="flex justify-between text-sm text-gray-600 font-light mb-10 pb-6 border-b border-gray-200">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.countryCode} {data.phone}</span>}
        {data.location && <span>{data.location}</span>}
      </div>
      
      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-12">
        {/* Main content */}
        <div className="col-span-2 space-y-8">
          {/* Summary */}
          {data.summary && (
            <div>
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-3 pb-2 border-b border-blue-200">
                Sobre
              </h2>
              <p className="text-gray-700 leading-relaxed font-light">
                {data.summary}
              </p>
            </div>
          )}
          
          {/* Experience */}
          {data.jobTitle && data.company && (
            <div>
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 pb-2 border-b border-blue-200">
                Experiência
              </h2>
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{data.jobTitle}</h3>
                <p className="text-blue-600 mb-1 font-light">{data.company}</p>
                {(data.expStartDate || data.expEndDate) && (
                  <p className="text-xs text-gray-500 font-light mb-3">
                    {data.expStartDate && new Date(data.expStartDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {data.expEndDate ? new Date(data.expEndDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Presente'}
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
            <div>
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 pb-2 border-b border-blue-200">
                Formação
              </h2>
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{data.degree}</h3>
                <p className="text-blue-600 font-light mb-1">{data.institution}</p>
                {(data.startDate || data.endDate) && (
                  <p className="text-xs text-gray-500 font-light">
                    {data.startDate && new Date(data.startDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} - {data.endDate ? new Date(data.endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }) : 'Cursando'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 pb-2 border-b border-blue-200">
                Habilidades
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="text-gray-700 font-light text-sm py-1 border-l-2 border-blue-400 pl-3"
                  >
                    {skill}
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
