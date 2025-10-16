import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Inglês para Estudantes Internacionais",
    instructor: "Prof. Sarah Johnson",
    duration: "8 semanas",
    students: "12.5k",
    rating: 4.9,
    price: "Gratuito",
    level: "Iniciante a Avançado",
    description: "Aprenda inglês acadêmico e prepare-se para estudar no exterior.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
  },
  {
    id: 2,
    title: "Educação Financeira para Jovens",
    instructor: "Prof. Carlos Silva",
    duration: "6 semanas",
    students: "8.3k",
    rating: 4.8,
    price: "Gratuito",
    level: "Iniciante",
    description: "Domine conceitos financeiros essenciais para sua independência.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
  },
  {
    id: 3,
    title: "Preparação para TOEFL/IELTS",
    instructor: "Prof. Maria Santos",
    duration: "10 semanas",
    students: "15.2k",
    rating: 4.9,
    price: "R$ 197",
    level: "Intermediário",
    description: "Prepare-se para os testes de proficiência em inglês mais importantes.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16 text-primary-foreground">
          <div className="container">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Cursos Online Certificados
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Aprenda no seu ritmo com cursos criados por especialistas. Certificados reconhecidos internacionalmente.
            </p>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-12">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Cursos Populares</h2>
              <Button variant="outline">Ver Todos os Cursos</Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elegant transition-all group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary text-secondary-foreground">
                        {course.price}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {course.instructor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        {course.rating}
                      </div>
                    </div>

                    <Badge variant="outline">{course.level}</Badge>

                    <Button variant="hero" className="w-full">
                      Inscrever-se Agora
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
