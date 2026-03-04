import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PublicationCard from "@/components/PublicationCard";
import PublicationFilters from "@/components/PublicationFilters";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import headerUniversities from "@/assets/header-universities.jpg";

const Universities = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("category", "university")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPublications(data);
      setFilteredPublications(data);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    let filtered = [...publications];
    if (searchQuery) {
      filtered = filtered.filter((pub) =>
        pub.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (countryFilter && countryFilter !== "all") {
      filtered = filtered.filter((pub) => pub.country === countryFilter);
    }
    if (areaFilter && areaFilter !== "all") {
      filtered = filtered.filter((pub) => pub.area === areaFilter);
    }
    setFilteredPublications(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [publications, searchQuery, countryFilter, areaFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Universidades Privadas"
          description="Explore universidades privadas de todo o mundo. Encontre a instituição ideal para os seus estudos sem necessidade de bolsa."
          backgroundImage={headerUniversities}
        >
          <PublicationFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            countryFilter={countryFilter}
            setCountryFilter={setCountryFilter}
            areaFilter={areaFilter}
            setAreaFilter={setAreaFilter}
            scholarshipTypeFilter=""
            setScholarshipTypeFilter={() => {}}
            studyLevelFilter=""
            setStudyLevelFilter={() => {}}
            statusFilter=""
            setStatusFilter={() => {}}
            onSearch={handleSearch}
          />
        </PageHeader>

        <section className="py-12">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-xl">Universidades Disponíveis</h2>
              <p className="text-muted-foreground">
                {filteredPublications.length} resultados encontrados
              </p>
            </div>
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            ) : filteredPublications.length > 0 ? (
              <div className="grid gap-6">
                {filteredPublications.map((publication) => (
                  <PublicationCard key={publication.id} publication={publication} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhuma universidade encontrada com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Universities;
