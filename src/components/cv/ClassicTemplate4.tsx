import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const ClassicTemplate4 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl print:shadow-none p-12 flex flex-col" id="cv-preview">
      {/* Header with photo on the side */}
      <div className="flex items-start gap-6 mb-8 pb-6 border-b-4 border-purple-600">
        <div className="flex-1">
          <h1 className="text-6xl font-serif font-bold text-purple-800 mb-2 leading-tight">
            {data.firstName}<br/>{data.lastName}
          </h1>
          {firstJob && (
            <p className="text-2xl text-purple-600 italic mb-3">{firstJob.jobTitle}</p>
          )}
        </div>
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-32 h-32 rounded object-cover border-4 border-purple-600 shadow-lg"
          />
        )}
      </div>
      
      {/* Contact bar */}
      <div className="bg-purple-100 -mx-12 px-12 py-3 mb-8 flex justify-around text-sm text-gray-700">
        {data.email && <span className="flex items-center gap-2">✉ {data.email}</span>}
        {data.phone && <span className="flex items-center gap-2">☎ {data.countryCode} {data.phone}</span>}
        {data.location && <span className="flex items-center gap-2">📍 {data.location}</span>}
      </div>
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-purple-800 mb-3">
            Resumo Profissional
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-purple-300 pl-4">
            {data.summary}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-purple-800 mb-4">
                Experiência Profissional
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="bg-white p-5 rounded shadow-md border-t-4 border-purple-600">
                    <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-purple-600 font-semibold text-lg mb-2">{exp.company}</p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-sm text-gray-500 mb-3">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                      </p>
                    )}
                    {exp.responsibilities && (
                      <p className="text-gray-700 leading-relaxed">{exp.responsibilities}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-purple-800 mb-4">
                Formação Acadêmica
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-white p-5 rounded shadow-md border-t-4 border-purple-600">
                    <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-purple-600 font-semibold text-lg mb-2">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-sm text-gray-500">
                        {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - Skills */}
        <div>
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-purple-800 mb-4">
                Habilidades
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div key={index} className="bg-purple-600 text-white px-4 py-2 rounded shadow text-center text-sm font-semibold">
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