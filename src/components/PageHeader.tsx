interface PageHeaderProps {
  title: string;
  description: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, description, backgroundImage, children }: PageHeaderProps) => {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="container relative z-10">
        <h1 className="text-2xl lg:text-4xl font-bold mb-3 text-white">{title}</h1>
        <p className="text-white/80 mb-6 max-w-2xl text-sm sm:text-base">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
