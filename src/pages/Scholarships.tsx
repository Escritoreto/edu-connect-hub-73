import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, GraduationCap, Calendar } from "lucide-react";
import headerScholarships from "@/assets/header-scholarships.jpg";
const scholarships = [{
  id: 1,
  title: "Bolsa Fulbright - EUA",
  university: "Várias Universidades",
  country: "Estados Unidos",
  level: "Mestrado/Doutorado",
  deadline: "15 de Outubro, 2025",
  value: "Cobertura Total",
  description: "Bolsa integral para mestrado e doutorado em universidades americanas."
}, {
  id: 2,
  title: "Chevening Scholarship - UK",
  university: "Universidades do Reino Unido",
  country: "Reino Unido",
  level: "Mestrado",
  deadline: "2 de Novembro, 2025",
  value: "Cobertura Total",
  description: "Bolsa do governo britânico para mestrado de 1 ano."
}, {
  id: 3,
  title: "DAAD - Alemanha",
  university: "Universidades Alemãs",
  country: "Alemanha",
  level: "Graduação/Mestrado",
  deadline: "30 de Setembro, 2025",
  value: "€850/mês",
  description: "Bolsas para estudos na Alemanha em diversas áreas."
}];
const Scholarships = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PageHeader
          title="Bolsas de Estudo"
          description="Encontre a bolsa perfeita para seus estudos. Milhares de oportunidades em universidades do mundo todo."
          backgroundImage={headerScholarships}
        >
          <div className="bg-background/90 backdrop-blur-sm rounded-xl p-6 shadow-card border border-border max-w-4xl">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por curso, universidade..." className="pl-10" />
                </div>
              </div>
              <Input placeholder="País" />
              <Button variant="hero" className="w-full">
                Buscar Bolsas
              </Button>
            </div>
          </div>
        </PageHeader>

        {/* Filters & Results */}
        <section className="py-12">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Bolsas Disponíveis</h2>
              <p className="text-muted-foreground">{scholarships.length} resultados encontrados</p>
            </div>

            <div className="grid gap-6">
              {scholarships.map(scholarship => <div key={scholarship.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {scholarship.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {scholarship.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {scholarship.country}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GraduationCap className="h-4 w-4" />
                          {scholarship.level}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {scholarship.deadline}
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right space-y-3">
                      <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold">
                        {scholarship.value}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Salvar
                        </Button>
                        <Button variant="hero" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Scholarships;