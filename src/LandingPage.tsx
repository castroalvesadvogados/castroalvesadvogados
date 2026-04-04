import { motion } from "motion/react";
import { Mail, MapPin, Linkedin, Instagram, Facebook, Scale, Shield, Briefcase, Users, ChevronRight, Menu, X, Globe, CreditCard, Database, ArrowLeftRight, Cpu, Gavel, LifeBuoy, Lock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "./lib/utils";
import rafaelImg from "./assets/Rafael.png";
import danielImg from "./assets/Daniel.png";

// --- Schemas ---
const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  subject: z.string().min(5, "Assunto é obrigatório"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Especialidades", href: "#areas" },
    { name: "O Escritório", href: "#about" },
    { name: "Equipe", href: "#team" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12",
      isScrolled ? "glass py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className={cn(
            "text-xl md:text-2xl font-serif font-bold tracking-tighter transition-colors duration-300",
            isScrolled ? "text-navy-900" : "text-white"
          )}>
            CASTRO ALVES
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-champagne font-medium">
            Advogados
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-xs uppercase tracking-widest font-medium transition-colors hover:text-gold-champagne",
                isScrolled ? "text-navy-900" : "text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary py-2 px-6">
            Contato
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-navy-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-xl p-8 flex flex-col space-y-6 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-navy-900"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900 pt-40 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Financial District" 
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-transparent to-navy-900/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl text-white mb-8 leading-[1.1]">
            Especialistas em <br /> 
            <span className="italic font-light">Sistema Financeiro</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Suporte estratégico para instituições no Brasil e no exterior, com foco nas complexidades regulatórias dos sistemas financeiro e de pagamentos.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a href="#contact" className="btn-primary bg-gold-champagne text-navy-900 hover:bg-white hover:text-navy-900 w-full md:w-auto">
              Contato
            </a>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#areas" className="text-white uppercase tracking-widest text-xs font-medium flex items-center group">
                Especialidades <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#team" className="text-white uppercase tracking-widest text-xs font-medium flex items-center group">
                Equipe <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-champagne to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

const PracticeAreas = () => {
  const areas = [
    {
      title: "Autorizações do Banco Central",
      description: "Condução de processos de autorização para funcionamento, reorganizações societárias e exercício de cargos estatutários.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Instituições Financeiras",
      description: "Consultoria regulatória abrangente para bancos, corretoras, distribuidoras e demais entidades do SFN.",
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      title: "Instituições de Pagamento",
      description: "Assessoria na constituição e autorização de IPs, incluindo emissores de moeda eletrônica e credenciadores.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Arranjos de Pagamento",
      description: "Consultoria em arranjos de pagamento, Pix e Open Finance, garantindo a conformidade com o SPB.",
      icon: <CreditCard className="w-8 h-8" />,
    },
    {
      title: "Cooperativas de Crédito",
      description: "Assessoria jurídica especializada na constituição, governança e regulação de cooperativas singulares e centrais.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Infraestrutura do Mercado Financeiro",
      description: "Suporte jurídico para entidades de liquidação e registro, assegurando aderência aos padrões do BCB e CVM.",
      icon: <Database className="w-8 h-8" />,
    },
    {
      title: "M&A no Sistema Financeiro",
      description: "Estruturação de fusões e aquisições envolvendo instituições financeiras e transferência de controle.",
      icon: <ArrowLeftRight className="w-8 h-8" />,
    },
    {
      title: "Concorrência no Sistema Financeiro",
      description: "Análise estratégica de impactos concorrenciais e defesa em processos de concentração de mercado.",
      icon: <Scale className="w-8 h-8" />,
    },
    {
      title: "Ativos Virtuais e Tokenização",
      description: "Acompanhamento regulatório e estruturação jurídica para o mercado de ativos virtuais e novos produtos financeiros.",
      icon: <Cpu className="w-8 h-8" />,
    },
    {
      title: "Câmbio e Capitais Internacionais",
      description: "Estruturação de operações cambiais, registro de capitais estrangeiros no país e capitais brasileiros no exterior.",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: "Processos Sancionadores",
      description: "Defesa em processos administrativos sancionadores, incluindo a negociação de Termos de Compromisso.",
      icon: <Gavel className="w-8 h-8" />,
    },
    {
      title: "Regimes de Resolução",
      description: "Suporte jurídico em regimes de RAET, intervenção e liquidação extrajudicial de instituições financeiras.",
      icon: <LifeBuoy className="w-8 h-8" />,
    },
    {
      title: "Tratamento de Dados",
      description: "Assessoramento no tratamento adequado de informações segundo a LGPD e a Lei de Sigilo Bancário.",
      icon: <Lock className="w-8 h-8" />,
    },
    {
      title: "Operações no Mercado",
      description: "Assessoria em cessão de recebíveis, captação de recursos, crédito imobiliário, rural e do Proagro.",
      icon: <TrendingUp className="w-8 h-8" />,
    },
  ];

  return (
    <section id="areas" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <span className="text-gold-champagne uppercase tracking-widest text-xs font-bold mb-4 block">Especialidades</span>
            <h2 className="text-4xl md:text-5xl text-navy-900 leading-tight">
              Dedicados exclusivamente às complexidades do mercado financeiro.
            </h2>
          </div>
          <p className="text-lead/60 max-w-sm mt-6 md:mt-0">
            Oferecemos suporte estratégico para instituições no Brasil e no exterior com foco no sistema financeiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {areas.map((area, index) => (
            <motion.div
              key={area.title}
              whileHover={{ y: -10 }}
              className="p-8 border border-gray-100 hover:border-gold-champagne/30 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="text-gold-champagne mb-6 group-hover:scale-110 transition-transform duration-500">
                {area.icon}
              </div>
              <h3 className="text-lg text-navy-900 mb-3 leading-tight">{area.title}</h3>
              <p className="text-lead/70 text-xs leading-relaxed mb-4">
                {area.description}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-champagne scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-off-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-champagne uppercase tracking-widest text-xs font-bold mb-4 block">Sobre o Escritório</span>
          <h2 className="text-4xl md:text-5xl text-navy-900 mb-8 leading-tight">
            Uma Trajetória Pautada pela Ética e por Resultados.
          </h2>
          <div className="space-y-6 text-lead/80 font-light leading-relaxed">
            <p>
              Fundado com a missão de redefinir o padrão de atendimento jurídico, o Castro Alves Advogados combina a solidez da tradição com a agilidade da advocacia moderna.
            </p>
            <p>
              Nossa equipe é composta por profissionais altamente qualificados, dedicados a entender profundamente o negócio e os objetivos de cada cliente, proporcionando soluções sob medida que geram valor real.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Team = () => {
  const members = [
    {
      name: "Rafael Alves | Advogado",
      image: rafaelImg,
      linkedin: "https://www.linkedin.com/in/rafael-de-castro-alves-27aa98183",
      email: "rafael@castroalvesadvogados.com",
      bio: [
        "Foi Procurador do Banco Central entre 2014 e 2023, onde atuou na consultoria de supervisão do sistema financeiro, em especial em autorizações para funcionamento de entidades supervisionadas e em processos administrativos sancionadores.",
        "Atuou também na área de processos judiciais relevantes e foi também responsável pela análise jurídica de propostas de normas do Banco Central e do Conselho Monetário Nacional.",
        "Mestre em Direito e Finanças pela Johann Wolfgang Goethe-Universität Frankfurt am Main.",
      ]
    },
    {
      name: "Daniel Castro | Consultor",
      image: danielImg,
      linkedin: "https://www.linkedin.com/in/daniel-castro-8449093/",
      email: "daniel.castro@castroalvesadvogados.com",
      bio: [
        "24 anos de experiência no Banco Central (2002-2025), sendo mais de 14 anos no sistema de pagamentos. Ex-chefe da divisão responsável pela regulação de infraestruturas do mercado financeiro.",
        "Atuou em projetos inovadores como o Pix, tokenização de ativos e o estabelecimento do ecossistema brasileiro para registro de arranjos de pagamento e duplicatas escriturais.",
        "Ex-consultor do Bank for International Settlements (BIS), onde atuou no BIS Innovation Hub, desenvolvendo projetos relacionados a pagamentos instantâneos e à aplicação de IA na supervisão bancária.",
        "Doutor em Finanças pela Universidade de Brasília (UnB), mestre e MBA em Finanças, além de graduações em Ciência da Computação e Administração."
      ]
    },
  ];

  return (
    <section id="team" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <span className="text-gold-champagne uppercase tracking-widest text-xs font-bold mb-4 block">Nossa Equipe</span>
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        {members.map((member, index) => (
          <motion.div 
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "flex flex-col lg:flex-row gap-12 items-start",
              index % 2 !== 0 && "lg:flex-row-reverse"
            )}
          >
            <div className="w-full lg:w-1/3">
              <div className="relative overflow-hidden aspect-[3/4] shadow-2xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <h3 className="text-3xl text-navy-900 mb-8">{member.name}</h3>
              <div className="space-y-4 text-lead/80 font-light leading-relaxed text-sm md:text-base">
                {member.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 flex space-x-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-navy-900/10 rounded-full flex items-center justify-center text-navy-900 hover:bg-gold-champagne hover:text-white hover:border-gold-champagne transition-all">
                  <Linkedin size={18} />
                </a>
                <a href={`mailto:${member.email}`} className="w-10 h-10 border border-navy-900/10 rounded-full flex items-center justify-center text-navy-900 hover:bg-gold-champagne hover:text-white hover:border-gold-champagne transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <span className="text-gold-champagne uppercase tracking-widest text-xs font-bold mb-4 block">Contato</span>
            <p className="text-white/60 mb-12 font-light max-w-md">
              Estamos prontos para oferecer a melhor estratégia jurídica para você ou sua empresa. Agende uma consulta inicial.
            </p>

            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gold-champagne shrink-0 mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Endereços</h4>
                  <div className="space-y-6">
                    <div>
                      <span className="text-gold-champagne text-[10px] uppercase tracking-widest font-bold block mb-1">São Paulo</span>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        Rua Funchal, 418, Vila Olímpia<br />
                        São Paulo/SP
                      </p>
                    </div>
                    <div>
                      <span className="text-gold-champagne text-[10px] uppercase tracking-widest font-bold block mb-1">Brasília</span>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        Centro Empresarial Varig - SCN Quadra 04<br />
                        Bloco B, Asa Norte<br />
                        Brasília/DF
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gold-champagne shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4">E-mail</h4>
                  <p className="text-white/60 font-light text-sm">contato@castroalvesadvogados.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-navy-900">Nome Completo</label>
                  <input 
                    {...register("name")}
                    className="w-full border-b border-gray-200 py-3 text-navy-900 focus:border-gold-champagne outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                  {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-navy-900">E-mail</label>
                  <input 
                    {...register("email")}
                    className="w-full border-b border-gray-200 py-3 text-navy-900 focus:border-gold-champagne outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-navy-900">Assunto</label>
                <input 
                  {...register("subject")}
                  className="w-full border-b border-gray-200 py-3 text-navy-900 focus:border-gold-champagne outline-none transition-colors"
                  placeholder="Como podemos ajudar?"
                />
                {errors.subject && <p className="text-red-500 text-[10px]">{errors.subject.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-navy-900">Mensagem</label>
                <textarea 
                  {...register("message")}
                  rows={4}
                  className="w-full border-b border-gray-200 py-3 text-navy-900 focus:border-gold-champagne outline-none transition-colors resize-none"
                  placeholder="Descreva brevemente seu caso"
                />
                {errors.message && <p className="text-red-500 text-[10px]">{errors.message.message}</p>}
              </div>
              <button type="submit" className="btn-primary w-full py-4 mt-4">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col mb-6">
            <span className="text-2xl font-serif font-bold tracking-tighter text-white">
              CASTRO ALVES
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-champagne font-medium">
              Advogados
            </span>
          </div>
          <p className="text-white/40 text-sm font-light max-w-sm leading-relaxed">
            Excelência jurídica e compromisso com resultados. Atuamos com ética e transparência para garantir a melhor defesa dos seus interesses.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-8">Links Rápidos</h4>
          <ul className="space-y-4 text-sm text-white/60 font-light">
            <li><a href="#home" className="hover:text-gold-champagne transition-colors">Início</a></li>
            <li><a href="#areas" className="hover:text-gold-champagne transition-colors">Especialidades</a></li>
            <li><a href="#about" className="hover:text-gold-champagne transition-colors">O Escritório</a></li>
            <li><a href="#team" className="hover:text-gold-champagne transition-colors">Equipe</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/30 font-medium">
        <p>© 2026 Castro Alves Advogados. Todos os direitos reservados.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PracticeAreas />
      <About />
      <Team />
      <Contact />
      <Footer />

      {/* Floating Email Button */}
      <a 
        href="mailto:contato@castroalvesadvogados.com"
        className="fixed bottom-8 right-8 w-16 h-16 bg-gold-champagne text-navy-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <Mail size={24} />
      </a>
    </div>
  );
}
