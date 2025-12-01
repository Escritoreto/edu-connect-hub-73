import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export const MinimalistTemplate3 = ({ data }: Props) => {
  const firstJob = data.experience[0];
  
  return (
    <div className="bg-white text-gray-900 w-[210mm] min-h-[297mm] mx-auto shadow-xl print:shadow-none p-14 flex flex-col" id="cv-preview">
      {/* Centered minimalist header */}
      <div className="text-center mb-12">
        {data.photoPreview && (
          <img 
            src={data.photoPreview} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 grayscale opacity-80"
          />
        )}
        <h1 className="text-4xl font-light text-emerald-900 tracking-wide">
          {data.firstName} {data.lastName}
        </h1>
        <div className="w-16 h-px bg-emerald-400 mx-auto my-3"></div>
        {firstJob && (
          <p className="text-sm text-emerald-600 uppercase tracking-widest font-light">
            {firstJob.jobTitle}
          </p>
        )}
        <div className="flex justify-center gap-6 text-xs text-gray-500 mt-4 font-light">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.countryCode} {data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
      
      {/* Summary */}
      {data.summary && (
        <div className="mb-10 text-center">
          <p className="text-gray-700 leading-relaxed font-light italic max-w-2xl mx-auto">
            "{data.summary}"
          </p>
        </div>
      )}
      
      <div className="h-px bg-gray-200 my-8"></div>
      
      {/* Skills as badges */}
      {data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-4">
            Competências
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-light rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="h-px bg-gray-200 my-8"></div>
      
      {/* Experience - centered style */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-6">
            Experiência Profissional
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="max-w-xl mx-auto text-center">
                <h3 className="text-lg font-semibold text-emerald-700">{exp.jobTitle}</h3>
                <p className="text-emerald-600 mb-2 font-light">{exp.company}</p>
                {(exp.startDate || exp.endDate) && (
                  <p className="text-xs text-gray-500 font-light mb-3">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Presente'}
                  </p>
                )}
                {exp.responsibilities && (
                  <p className="text-gray-700 leading-relaxed font-light text-sm">
                    {exp.responsibilities}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Education - centered style */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-widest text-center mb-6">
            Formação Acadêmica
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="max-w-xl mx-auto text-center">
                <h3 className="text-lg font-semibold text-emerald-700">{edu.degree}</h3>
                <p className="text-emerald-600 font-light mb-2">{edu.institution}</p>
                {(edu.startDate || edu.endDate) && (
                  <p className="text-xs text-gray-500 font-light">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : 'Cursando'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};