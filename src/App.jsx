import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Dados ── */
const testimonials = [
  { text: 'Tive 100% de melhora da crise alérgica. Não tive mais nenhum sintoma alérgico (coriza, coceira ou nariz entupido) nem parece que foi apenas 1 sessão.' },
  { text: 'Tati estou impressionada com a melhora da minha dor de ontem pra hoje. Você não imagina como acordei quase não sentindo mais dor. Muito obrigada.' },
  { text: 'Oi tati boa noite, tá jóia? Passando pra dizer que minha coluna está uma belezinha, sem dor nenhuma, olha está sendo muito bom essas seções, muito obrigada tá 💖' },
]

const faqs = [
  {
    q: 'Para que serve a acupuntura?',
    a: 'A acupuntura é uma técnica milenar da medicina tradicional chinesa que utiliza agulhas finas inseridas em pontos específicos do corpo para promover o equilíbrio energético, aliviar dores, reduzir o estresse e tratar diversas condições de saúde de forma natural e eficaz.',
  },
  {
    q: 'Quantas sessões eu vou precisar?',
    a: 'A quantidade de sessões varia de pessoa para pessoa. Tudo depende do tipo e da intensidade do que você está sentindo, se é algo recente ou crônico, do seu estilo de vida e de como seu corpo responde ao tratamento. Minha dica? Quanto mais cedo começarmos, mais rápido você sente os benefícios — e, muitas vezes, com menos sessões! Vamos conversar na primeira consulta para criar um plano que seja perfeito para você.',
  },
  {
    q: 'Preciso de encaminhamento médico?',
    a: 'Não precisa de encaminhamento médico. Você precisa apenas de agendar a sua sessão.',
  },
  {
    q: 'Acupuntura é só para dor?',
    a: 'Não. Com as técnicas da medicina chinesa posso tratar todas as doenças crônicas não transmissíveis e queixas como queda de cabelo, xerostomia (boca seca pós tratamento oncológico), tontura, infertilidade e diversas outras.',
  },
  {
    q: 'A clínica atende crianças?',
    a: 'É claro. E por contar com especialização em pediatria chinesa, utilizo técnicas específicas para os nossos pequenos, respeitando a individualidade e o tipo de tratamento aceito pela criança. E já te adianto: crianças respondem muito rápido ao tratamento e se beneficiam muito quando a queixa é cólica, refluxo, disquesia (dor pra evacuar), baixa imunidade, problemas respiratórios, alterações de sono e várias outras queixas.',
  },
]

/* ── FAQ Item ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const answerRef = useRef(null)

  return (
    <div className="faq-item rounded-lg overflow-hidden bg-sextenary">
      <button
        className="w-full px-6 py-4 text-left text-white font-medium flex justify-between items-center hover:bg-opacity-90 transition-all duration-200 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <svg
          className="w-6 h-6 transition-transform duration-200 flex-shrink-0"
          style={{ rotate: open ? '45deg' : '0deg' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? (answerRef.current?.scrollHeight ?? 500) + 'px' : '0px' }}
      >
        <p className="px-6 pb-4 text-white">{a}</p>
      </div>
    </div>
  )
}

/* ── LazyVideo ── */
function LazyVideo() {
  const [playing, setPlaying] = useState(false)

  if (!playing) {
    return (
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setPlaying(true)}
      >
        <img
          src="/optimized/videopreload-large.webp"
          alt="Assistir vídeo sobre acupuntura"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-septenary flex items-center justify-center hover:bg-sextenary transition-colors duration-200">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="#f8eeee" />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <video
      className="w-full h-full object-cover"
      controls
      autoPlay
      playsInline
      poster="/optimized/videopreload-large.webp"
    >
      <source src="/assets/video.mp4" type="video/mp4" />
      Seu navegador não suporta o elemento de vídeo.
    </video>
  )
}

/* ── App ── */
export default function App() {
  const [current, setCurrent] = useState(0)

  /* Auto-advance testimonials every 10s */
  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % testimonials.length), 10000)
    return () => clearInterval(id)
  }, [])

  const prev = () => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(i => (i + 1) % testimonials.length)

  return (
    <div id="app">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <main className="bg-transparent px-grid min-h-screen grid grid-cols-[1fr_0.8fr] bg-[url(/optimized/bg-clip-large.webp)] max-lg:bg-[url(/optimized/mobile-bg-medium.webp)] max-lg:bg-center bg-cover max-lg:block max-lg:pt-32 max-lg:relative">
        <div className="my-auto max-w-[650px] max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center max-lg:max-w-full max-lg:mx-auto">
          <img src="/tati.svg" alt="Logo Tatiane Acupunturista" className="max-lg:absolute max-lg:top-20" />
          <h1 className="text-fluid-title mt-5 leading-normal tracking-wide text-primary font-medium font-lora max-lg:absolute max-lg:bottom-56 max-lg:mx-grid">
            <span className="font-bold">Dor constante, noites sem dormir, mente agitada?</span>{' '}
            Existe um caminho natural para o alívio.
          </h1>
          <p className="mt-2 text-primary text-fluid-paragraph max-lg:absolute max-lg:bottom-44">
            E ele começa aqui.
          </p>
          <a
            href="https://www.instagram.com/tatianemedicinachinesa/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 max-lg:absolute max-lg:bottom-28"
          >
            QUERO ENTENDER MAIS
            <img src="/arrow-long-right.svg" alt="Seta para a direita" />
          </a>
        </div>

        <div className="flex justify-center items-center max-lg:hidden">
          <picture className="h-full block object-cover">
            <source media="(max-width: 600px)" srcSet="/optimized/tatiane-small.webp" />
            <source media="(max-width: 1050px)" srcSet="/optimized/tatiane-medium.webp" />
            <source media="(min-width: 1200px)" srcSet="/optimized/tatiane-large.webp" />
            <img src="/optimized/tatiane-large.webp" alt="Tatiane Acupunturista" loading="lazy" className="h-full block object-cover" />
          </picture>
        </div>
      </main>

      {/* ── QUEM SOU EU ───────────────────────────────────────── */}
      <section className="mt-28 max-lg:px-grid">
        <div className="max-w-[944px] mx-auto border-2 border-septenary rounded-2xl py-10 pr-9 pl-80 relative flex max-lg:block max-lg:pl-9">
          <div className="min-w-[300px] h-[90%] bg-septenary rounded-xl absolute -left-20 top-1/2 -translate-y-1/2 max-lg:hidden">
            <picture className="w-full h-full object-cover rounded-xl">
              <source media="(max-width: 600px)" srcSet="/optimized/sobre_tatiane-small.webp" />
              <source media="(max-width: 1050px)" srcSet="/optimized/sobre_tatiane-medium.webp" />
              <source media="(min-width: 1200px)" srcSet="/optimized/sobre_tatiane-large.webp" />
              <img
                src="/optimized/sobre_tatiane-medium.webp"
                alt="Tatiane"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
            </picture>
          </div>

          <div>
            <h2 className="text-fluid-title tracking-wide text-septenary font-bold font-lora">Quem sou eu?</h2>
            <p className="text-fluid-paragraph text-sextenary font-medium mt-4">
              Oi, eu sou a Tatiane, enfermeira há 18 anos dedicada a cuidar da sua saúde com carinho e atenção. Sou
              especialista em medicina tradicional chinesa, com destaque para a acupuntura, uma técnica milenar que ajuda
              a equilibrar corpo e mente e tratar doenças crônicas não transmissíveis.
              <br /><br />
              Casada e mãe de dois pets incríveis, o Bob e a Milla. Eu acredito que uma vida mais leve e saudável é
              possível, o segredo está em cuidar do corpo com exercícios físicos, uma alimentação equilibrada e sono de
              qualidade. Meu propósito é te ajudar a encontrar esse equilíbrio, trazendo alívio para dores, ansiedade ou
              cansaço, com um toque suave e humano.
              <br /><br />
              Acredito que a longevidade com qualidade de vida é um presente que conquistamos com dedicação.
            </p>
          </div>
        </div>
      </section>

      {/* ── O QUE É ACUPUNTURA ───────────────────────────────── */}
      <section className="mt-28 px-grid">
        <h2 className="text-fluid-title text-sextenary font-bold tracking-wide font-lora text-center mb-2">
          O que é acupuntura?
        </h2>
        <p className="text-center text-sextenary mb-6 max-w-[560px] mx-auto">
          Não sabe ao certo o que é <span className="font-bold">acupuntura</span>? Tudo bem! No vídeo abaixo eu te
          explico com calma como esse cuidado funciona.
        </p>

        <div className="max-w-[408px] mx-auto w-full h-max aspect-[9/16] my-auto rounded overflow-hidden">
          <LazyVideo />
        </div>
      </section>

      {/* ── ATENDIMENTO NOTURNO ──────────────────────────────── */}
      <section className="mt-28">
        <div className="mx-[13.13vw] max-lg:mx-grid rounded-lg bg-septenary">
          <div className="p-8 pb-0">
            <h3 className="font-lora text-[1.75rem] font-bold tracking-wide text-white">
              Trabalha ou não tem disponibilidade durante o dia?
            </h3>
            <p className="mt-2 text-fluid-paragraph text-white">
              Sei que a correria do dia a dia pode dificultar seu cuidado com a saúde. Por isso, ofereço atendimentos à
              noite, com horários flexíveis que se adaptam à sua rotina. Quer aliviar suas dores, reduzir o estresse ou
              melhorar o sono? Vamos encontrar o melhor momento para cuidar de você com todo o carinho que merece.
            </p>
          </div>
          <div className="mt-3 bg-sextenary px-8 py-4 flex items-center gap-4">
            <img src="/moon.svg" alt="Imagem da Lua" />
            <p className="text-white text-fluid-paragraph">Noite livre? Agende sua sessão noturna!</p>
          </div>
        </div>
      </section>

      {/* ── DÚVIDAS FREQUENTES ───────────────────────────────── */}
      <section className="py-16 px-4 bg-tertiary mt-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-lora text-sextenary text-fluid-title tracking-wide font-bold text-center mb-8">
            Dúvidas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────────────────── */}
      <section className="mt-28 px-grid">
        <h2 className="mb-6 text-fluid-title tracking-wider font-bold text-septenary font-lora text-center">
          Depoimentos de quem já passou por aqui
        </h2>
        <p className="max-w-[560px] mx-auto text-fluid-paragraph mb-10 text-sextenary text-center">
          Veja alguns depoimentos de clientes nossos que saíram satisfeitos após as sessões. Nada melhor do que ouvir de
          quem já viveu essa experiência.
        </p>

        <img src="/aspas.svg" className="block mx-auto" alt="Abrir aspas para o depoimento dos clientes." />

        <div className="flex items-center justify-between mt-4">
          <div className="max-mdl:hidden">
            <img
              src="/arrow-right-1.svg"
              alt="Ir para o depoimento anterior"
              className="cursor-pointer"
              onClick={prev}
            />
          </div>

          <div className="max-w-[660px] mx-auto">
            <p className="text-2xl font-medium text-sextenary text-center mb-4">
              {testimonials[current].text}
            </p>
            <div className="flex items-center justify-center gap-5">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-septenary rounded-full cursor-pointer max-mdl:w-4 max-mdl:h-4"
                  style={{ opacity: i === current ? 1 : 0.5 }}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </div>

          <div className="max-mdl:hidden">
            <img
              src="/arrow-right.svg"
              alt="Ir para o próximo depoimento"
              className="cursor-pointer"
              onClick={next}
            />
          </div>
        </div>

        <a
          href="https://www.instagram.com/stories/highlights/17994490160151751/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mx-auto mt-24 max-md:!hidden"
        >
          Ver mais depoimentos no Instagram
          <img src="/arrow-long-right-white.svg" alt="Seta para a direita" />
        </a>

        <a
          href="https://www.instagram.com/stories/highlights/17994490160151751/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mx-auto mt-24 !hidden max-md:!flex"
        >
          Ver depoimentos
          <img src="/arrow-long-right-white.svg" alt="Seta para a direita" />
        </a>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="mt-28 pb-10 bg-sextenary text-primary px-grid py-10 grid grid-cols-2 gap-10 max-xl:flex max-xl:flex-col">
        {/* Google Maps */}
        <div className="rounded" id="maps-google">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.5409179298767!2d-42.363044724940785!3d-21.130861280544064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbcc79bce1acfd7%3A0x5350b3b1d59ca76a!2zRXNwYcOnbyBCw6luaQ!5e0!3m2!1spt-BR!2sbr!4v1751216269161!5m2!1spt-BR!2sbr"
            title="Google Maps - Espaço Beni"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[300px] max-lg:max-w-[400px] max-xl:mx-auto"
          />
        </div>

        <div className="flex flex-col gap-7">
          {/* Endereço */}
          <div>
            <h3 className="text-fluid-title tracking-wide text-white font-lora font-bold text-right max-xl:text-center mb-4">
              Endereço
            </h3>
            <p className="max-w-[434px] ml-auto text-right font-medium text-fluid-paragraph max-xl:text-center max-xl:mx-auto">
              Espaço Beni - Travessa Francisco Navarro Carreteiro, 299, Centro, Muriaé, MG (Rua do BRADESCO)
            </p>
          </div>

          {/* Contatos */}
          <div>
            <h3 className="text-fluid-title tracking-wide text-white font-lora font-bold text-right max-xl:text-center max-xl:mx-auto mb-4">
              Contatos
            </h3>
            <div className="flex items-center justify-end gap-8 max-xl:justify-center">
              <a href="https://wa.me/+5532988847693" target="_blank" rel="noopener noreferrer">
                <img src="/whatsapp.svg" alt="WhatsApp" />
              </a>
              <a href="https://www.instagram.com/tatianemedicinachinesa/" target="_blank" rel="noopener noreferrer">
                <img src="/instagram.svg" alt="Instagram" />
              </a>
            </div>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-fluid-title tracking-wide text-white font-lora font-bold text-right mb-4 max-xl:text-center max-xl:mx-auto">
              Atendimento
            </h3>
            <div className="max-w-[500px] ml-auto text-right flex flex-col gap-4 max-xl:text-center max-xl:mx-auto">
              <div className="flex items-center justify-end gap-4 max-xl:flex-col-reverse max-xl:justify-center max-xl:gap-0">
                <p className="text-fluid-paragraph font-medium text-white">Atendimento somente com hora marcada.</p>
                <img src="/iclock.svg" alt="Relógio" />
              </div>
              <div className="flex items-center justify-end gap-4 max-xl:flex-col-reverse max-xl:justify-center max-xl:gap-0">
                <p className="text-fluid-paragraph font-medium text-white">Atendimentos também a noite.</p>
                <img src="/imoon.svg" alt="Lua" />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
