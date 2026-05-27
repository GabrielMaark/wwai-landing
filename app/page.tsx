'use client'

import React, { useEffect, useState } from 'react'
import AuroraBackground from './components/AuroraBackground'

const socios = [
  { initial: 'R', name: 'Rafael Milagre', creds: 'Founder Viver de IA · Mentor G4' },
  { initial: 'Y', name: 'Yago Martins', creds: 'CEO Viver de IA · Mentor G4' },
  { initial: 'T', name: 'Tallis Gomes', creds: 'Founder G4, Easy Taxi e Singu' },
  { initial: 'A', name: 'Alfredo Soares', creds: 'Founder G4, XTech · Sócio Vtex' },
  { initial: 'B', name: 'Bruno Nardon', creds: 'Founder G4, Kanui e Norte Ventures' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Stars/aurora handled by AuroraBackground (Three.js)

    // Hamburger menu
    const hamburger = document.getElementById('hamburger')
    const navMobile = document.getElementById('nav-mobile')
    const toggleMenu = () => navMobile?.classList.toggle('open')
    hamburger?.addEventListener('click', toggleMenu)
    const closeMenu = () => navMobile?.classList.remove('open')
    const mobileLinks = navMobile ? Array.from(navMobile.querySelectorAll('a')) : []
    mobileLinks.forEach((a) => a.addEventListener('click', closeMenu))

    // Fade-up on scroll
    const fadeEls = document.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('#hero .fade-up').forEach((el) => {
      setTimeout(() => el.classList.add('visible'), 80)
    })
    fadeEls.forEach((el) => {
      if (!el.closest('#hero')) observer.observe(el)
    })

    return () => {
      hamburger?.removeEventListener('click', toggleMenu)
      mobileLinks.forEach((a) => a.removeEventListener('click', closeMenu))
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="noise-layer" aria-hidden="true" />

      {/* NAVBAR — floating pill */}
      <div className="nav-wrapper">
        <nav className="nav-pill" style={{
          background: scrolled
            ? 'rgba(10, 10, 10, 0.95)'
            : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: scrolled
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.3s ease'
        }}>
          <a href="#" className="nav-logo">WWAI</a>
          <ul className="nav-links">
            <li><a href="#problema">Sobre</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#socios">Sócios</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
          <a
            href="#cta-final"
            style={{
              background: '#00FF50',
              color: '#000000',
              padding: '10px 20px',
              borderRadius: '999px',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#00E848')}
            onMouseLeave={e => (e.currentTarget.style.background = '#00FF50')}
          >
            Quero uma análise →
          </a>
          <button className="nav-hamburger" id="hamburger" aria-label="Menu">
            <span /><span /><span />
          </button>
        </nav>
      </div>
      <div className="nav-mobile" id="nav-mobile">
        <a href="#problema">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#socios">Sócios</a>
        <a href="#contato">Contato</a>
        <a href="#cta-final" className="nav-cta">Quero uma análise →</a>
      </div>

      {/* HERO */}
      <section id="hero" style={{ background: '#000000' }}>

        {/* Aurora boreal — divs CSS */}
        <AuroraBackground />

        <div className="hero-inner">
          <div className="hero-badge fade-up">
            <span className="badge-dot" />
            Especialistas em IA Generativa Aplicada
          </div>
          <h1 className="hero-headline fade-up stagger-1">
            <span className="hl">Seu negócio com mais escala,</span>
            <span className="hl">mais eficiência e menos custo com IA.</span>
          </h1>
          <p className="hero-sub fade-up stagger-2">
            Implementamos a estrutura técnica das maiores empresas de IA do país
            no seu negócio para reduzir sua folha, cortar desperdícios de API e
            liberar seu tempo para o que realmente importa.
          </p>
          <div className="hero-ctas fade-up stagger-3">
            <a href="#cta-final" className="btn-primary">
              Quero uma análise da minha operação
            </a>
            <a href="#servicos" className="btn-secondary">
              Ver serviços
            </a>
          </div>
          <p className="hero-micro fade-up stagger-4">
            Implementação rápida por especialistas que vivem o mercado de IA generativa.
          </p>
        </div>

        {/* Transição aurora → branco, dentro do hero */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to bottom, transparent, #ffffff)',
          zIndex: 10,
          pointerEvents: 'none'
        }} />

      </section>

      {/* PROBLEMA */}
      <section id="problema">
        <div className="container problema-inner">
          <div className="header fade-up" style={{ marginBottom: '80px' }}>
            <p className="section-label">IA Amadora vs. IA Profissional</p>
            <h2 className="section-headline">
              O que separa empresas que<br />usam IA das que crescem com IA
            </h2>
          </div>

          {([
            {
              label: 'Sua empresa está usando IA errado',
              title: 'Sua equipe usa IA como um "Google melhorado"',
              description: 'A maioria das empresas parou na geração de textos, legendas e imagens básicas. Enquanto seu time perde tempo com tarefas manuais, seus concorrentes estão automatizando departamentos inteiros e ganhando escala real.',
              cta: 'Entender o diagnóstico',
              link: '#cta-final',
              visual: (
                <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',display:'block'}}>
                  <defs>
                    <marker id="ag1" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#00FF50"/></marker>
                    <marker id="ar1" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#ef4444"/></marker>
                  </defs>
                  <rect width="600" height="280" fill="#0a0a0a"/>
                  {/* Divider */}
                  <line x1="300" y1="20" x2="300" y2="265" stroke="#1e1e1e" strokeWidth="1"/>
                  {/* Labels */}
                  <text x="150" y="38" textAnchor="middle" fill="#555" fontSize="10" fontFamily="monospace" letterSpacing="3">MANUAL</text>
                  <text x="450" y="38" textAnchor="middle" fill="#00FF50" fontSize="10" fontFamily="monospace" letterSpacing="3">AUTOMATIZADO</text>
                  {/* LEFT: red stacked boxes with loop */}
                  <rect x="55" y="60" width="110" height="36" rx="6" fill="#110000" stroke="#ef4444" strokeWidth="1"/>
                  <text x="110" y="83" textAnchor="middle" fill="#ef4444" fontSize="12" fontFamily="sans-serif">Gerar texto</text>
                  <line x1="110" y1="96" x2="110" y2="113" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#ar1)"/>
                  <rect x="55" y="116" width="110" height="36" rx="6" fill="#110000" stroke="#ef4444" strokeWidth="1"/>
                  <text x="110" y="139" textAnchor="middle" fill="#ef4444" fontSize="12" fontFamily="sans-serif">Revisar</text>
                  <line x1="110" y1="152" x2="110" y2="169" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#ar1)"/>
                  <rect x="55" y="172" width="110" height="36" rx="6" fill="#110000" stroke="#ef4444" strokeWidth="1"/>
                  <text x="110" y="195" textAnchor="middle" fill="#ef4444" fontSize="12" fontFamily="sans-serif">Publicar</text>
                  {/* Loop arrow */}
                  <path d="M 55 190 Q 20 160 20 134 Q 20 108 55 78" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ar1)"/>
                  <text x="150" y="230" textAnchor="middle" fill="#555" fontSize="11" fontFamily="sans-serif">repetido manualmente</text>
                  {/* RIGHT: green flow */}
                  <rect x="345" y="60" width="110" height="36" rx="6" fill="#001a00" stroke="#00FF50" strokeWidth="1"/>
                  <text x="400" y="83" textAnchor="middle" fill="#00FF50" fontSize="12" fontFamily="sans-serif">Gerar texto</text>
                  <line x1="400" y1="96" x2="400" y2="113" stroke="#00FF50" strokeWidth="1.5" markerEnd="url(#ag1)"/>
                  <rect x="345" y="116" width="110" height="36" rx="6" fill="#001a00" stroke="#00FF50" strokeWidth="1"/>
                  <text x="400" y="139" textAnchor="middle" fill="#00FF50" fontSize="12" fontFamily="sans-serif">Revisar</text>
                  <line x1="400" y1="152" x2="400" y2="169" stroke="#00FF50" strokeWidth="1.5" markerEnd="url(#ag1)"/>
                  <rect x="345" y="172" width="110" height="36" rx="6" fill="#001a00" stroke="#00FF50" strokeWidth="1"/>
                  <text x="400" y="195" textAnchor="middle" fill="#00FF50" fontSize="12" fontFamily="sans-serif">Publicar</text>
                  {/* Check */}
                  <circle cx="490" cy="190" r="16" fill="none" stroke="#00FF50" strokeWidth="1.5"/>
                  <path d="M 482 190 L 488 196 L 498 183" fill="none" stroke="#00FF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="455" y1="190" x2="473" y2="190" stroke="#00FF50" strokeWidth="1.5" markerEnd="url(#ag1)"/>
                  <text x="400" y="230" textAnchor="middle" fill="#00FF50" fontSize="11" fontFamily="sans-serif">sem intervenção humana</text>
                </svg>
              ),
            },
            {
              label: 'A ineficiência técnica',
              title: 'O custo da falta de arquitetura',
              description: 'Sem engenharia de prompts e seleção correta de modelos, você paga até 5x mais caro por cada tarefa executada. Não é o uso da IA que é caro, é a sua falta de otimização técnica que destrói a sua margem.',
              cta: 'Ver como otimizar',
              link: '#servicos',
              visual: (
                <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',display:'block'}}>
                  <rect width="600" height="280" fill="#0a0a0a"/>
                  {/* Axes */}
                  <line x1="70" y1="220" x2="540" y2="220" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <line x1="70" y1="40" x2="70" y2="220" stroke="#2a2a2a" strokeWidth="1.5"/>
                  {/* Y axis labels */}
                  <text x="58" y="224" textAnchor="end" fill="#444" fontSize="11" fontFamily="monospace">1x</text>
                  <text x="58" y="170" textAnchor="end" fill="#444" fontSize="11" fontFamily="monospace">2x</text>
                  <text x="58" y="116" textAnchor="end" fill="#444" fontSize="11" fontFamily="monospace">3x</text>
                  <text x="58" y="62" textAnchor="end" fill="#444" fontSize="11" fontFamily="monospace">5x</text>
                  {/* Grid lines */}
                  <line x1="70" y1="170" x2="540" y2="170" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4"/>
                  <line x1="70" y1="116" x2="540" y2="116" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4"/>
                  <line x1="70" y1="62"  x2="540" y2="62"  stroke="#1a1a1a" strokeWidth="1" strokeDasharray="4 4"/>
                  {/* Red line - sem otimização (goes up steeply) */}
                  <path d="M 100 215 C 200 200 320 130 510 55" fill="none" stroke="#ef4444" strokeWidth="2.5"/>
                  <circle cx="510" cy="55" r="4" fill="#ef4444"/>
                  <text x="515" y="52" fill="#ef4444" fontSize="11" fontFamily="sans-serif">Sem WWAI</text>
                  {/* Green line - com WWAI (stays low) */}
                  <path d="M 100 215 C 200 215 350 210 510 195" fill="none" stroke="#00FF50" strokeWidth="2.5"/>
                  <circle cx="510" cy="195" r="4" fill="#00FF50"/>
                  <text x="515" y="198" fill="#00FF50" fontSize="11" fontFamily="sans-serif">Com WWAI</text>
                  {/* X axis label */}
                  <text x="305" y="242" textAnchor="middle" fill="#444" fontSize="11" fontFamily="sans-serif">Volume de tarefas</text>
                  {/* Y axis label */}
                  <text x="20" y="135" textAnchor="middle" fill="#444" fontSize="11" fontFamily="sans-serif" transform="rotate(-90,20,135)">Custo por tarefa</text>
                  {/* Annotation */}
                  <line x1="510" y1="55" x2="510" y2="195" stroke="#333" strokeWidth="1" strokeDasharray="3 3"/>
                  <text x="510" y="128" textAnchor="middle" fill="#888" fontSize="11" fontFamily="sans-serif">5x</text>
                </svg>
              ),
            },
            {
              label: 'A falha estratégica',
              title: 'A perigosa ilusão do "Eu já uso IA"',
              description: 'Acreditar que ter uma assinatura do ChatGPT é estar performando é o que torna seu negócio obsoleto. Enquanto você gasta tempo tentando fazer o prompt funcionar, o mercado escala com fluxos que não dependem do seu tempo.',
              cta: 'Quero escalar de verdade',
              link: '#cta-final',
              visual: (
                <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'auto',display:'block'}}>
                  <defs>
                    <marker id="ag3" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#00FF50"/></marker>
                  </defs>
                  <rect width="600" height="280" fill="#0a0a0a"/>
                  <line x1="300" y1="20" x2="300" y2="265" stroke="#1e1e1e" strokeWidth="1"/>
                  <text x="150" y="38" textAnchor="middle" fill="#555" fontSize="10" fontFamily="monospace" letterSpacing="3">SEU TEMPO</text>
                  <text x="450" y="38" textAnchor="middle" fill="#00FF50" fontSize="10" fontFamily="monospace" letterSpacing="3">PIPELINE WWAI</text>
                  {/* LEFT: clock */}
                  <circle cx="150" cy="150" r="72" fill="none" stroke="#333" strokeWidth="1.5"/>
                  <circle cx="150" cy="150" r="4" fill="#555"/>
                  {/* Hour hand pointing to ~10 */}
                  <line x1="150" y1="150" x2="122" y2="110" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* Minute hand pointing to ~2 */}
                  <line x1="150" y1="150" x2="178" y2="105" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                  {/* Clock ticks */}
                  {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
                    const rad = (deg - 90) * Math.PI / 180
                    const x1 = parseFloat((150 + 65 * Math.cos(rad)).toFixed(4))
                    const y1 = parseFloat((150 + 65 * Math.sin(rad)).toFixed(4))
                    const x2 = parseFloat((150 + 72 * Math.cos(rad)).toFixed(4))
                    const y2 = parseFloat((150 + 72 * Math.sin(rad)).toFixed(4))
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333" strokeWidth={i % 3 === 0 ? 2 : 1}/>
                  })}
                  <text x="150" y="236" textAnchor="middle" fill="#ef4444" fontSize="12" fontFamily="sans-serif">6h/dia perdidas</text>
                  {/* RIGHT: pipeline */}
                  <rect x="330" y="62"  width="90" height="32" rx="6" fill="#001a00" stroke="#00FF50" strokeWidth="1"/>
                  <text x="375" y="83" textAnchor="middle" fill="#00FF50" fontSize="11" fontFamily="sans-serif">Recebe lead</text>
                  <line x1="375" y1="94" x2="375" y2="108" stroke="#00FF50" strokeWidth="1.5" markerEnd="url(#ag3)"/>
                  <rect x="330" y="110" width="90" height="32" rx="6" fill="#001a00" stroke="#00FF50" strokeWidth="1"/>
                  <text x="375" y="131" textAnchor="middle" fill="#00FF50" fontSize="11" fontFamily="sans-serif">Qualifica</text>
                  <line x1="375" y1="142" x2="375" y2="156" stroke="#00FF50" strokeWidth="1.5" markerEnd="url(#ag3)"/>
                  <rect x="330" y="158" width="90" height="32" rx="6" fill="#001a00" stroke="#00FF50" strokeWidth="1"/>
                  <text x="375" y="179" textAnchor="middle" fill="#00FF50" fontSize="11" fontFamily="sans-serif">Responde</text>
                  <line x1="375" y1="190" x2="375" y2="204" stroke="#00FF50" strokeWidth="1.5" markerEnd="url(#ag3)"/>
                  <rect x="330" y="206" width="90" height="32" rx="6" fill="#001a00" stroke="#00FF50" strokeWidth="1"/>
                  <text x="375" y="227" textAnchor="middle" fill="#00FF50" fontSize="11" fontFamily="sans-serif">Fecha</text>
                  {/* "24/7" badge */}
                  <rect x="440" y="138" width="48" height="22" rx="11" fill="#00FF50"/>
                  <text x="464" y="154" textAnchor="middle" fill="#000" fontSize="11" fontFamily="monospace" fontWeight="bold">24/7</text>
                </svg>
              ),
            },
          ] as Array<{label:string;title:string;description:string;cta:string;link:string;visual:React.ReactNode}>).map((feature, index) => (
            <div key={index} className={`fade-up feature-row ${index % 2 !== 0 ? 'reverse' : ''}`} style={{
              marginBottom: index < 2 ? '120px' : '0',
            }}>
              {/* Visual SVG */}
              <div className="feature-visual">
                {feature.visual}
              </div>

              {/* Texto */}
              <div className="feature-text">
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#00FF50', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  {feature.label}
                </p>
                <h3 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#111', lineHeight: '1.3' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.7', marginBottom: '32px' }}>
                  {feature.description}
                </p>
                <a href={feature.link} className="feature-cta">
                  {feature.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos">
        <div className="container">
          <div className="servicos-header fade-up">
            <p className="section-label">O Método WWAI</p>
            <h2 className="section-headline">O que entregamos</h2>
          </div>
          <div className="cards-grid">
            <div className="service-card fade-up stagger-1">
              <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <rect x="4" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <rect x="17" y="8" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <rect x="17" y="28" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <rect x="30" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <line x1="14" y1="23" x2="17" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="22" y1="18" x2="22" y2="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="27" y1="13" x2="30" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="27" y1="33" x2="30" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <h3 className="service-title">Consultoria e Estratégia de IA</h3>
              <p className="service-body">
                Mapeamos gargalos, diminuímos custos e automatizamos sua operação. Um plano de
                ação prático para implementar IA onde ela realmente gera lucro e escala,
                tirando o peso do operacional das suas mãos.
              </p>
            </div>
            <div className="service-card fade-up stagger-2">
              <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <polyline points="4,34 14,22 20,28 28,14 34,20 40,8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="40" cy="8" r="2.5" fill="currentColor" />
                <line x1="4" y1="38" x2="40" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </svg>
              <h3 className="service-title">Otimização de Custos e Modelos</h3>
              <p className="service-body">
                Reduzimos seu gasto operacional através de Engenharia de Prompts avançada,
                uso de Skills específicas e seleção inteligente de modelos. Você para de
                desperdiçar recursos e passa a extrair o máximo de cada IA.
              </p>
            </div>
            <div className="service-card fade-up stagger-3">
              <svg className="service-icon" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <circle cx="22" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="9" cy="28" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="35" cy="28" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16.5 18.5 C13 21 11 23 10.5 23.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M27.5 18.5 C31 21 33 23 33.5 23.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M13.5 31 C16 34 20 36 22 36 C24 36 28 34 30.5 31" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <h3 className="service-title">Comunidade Exclusiva WWAI</h3>
              <p className="service-body">
                Acesso direto a uma comunidade para networking, suporte técnico e atualizações
                de mercado em primeira mão. Esteja sempre um passo à frente da concorrência,
                trocando experiências com quem tem resultado utilizando IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final">
        <div className="container">
          <div className="cta-box fade-up">
            <h2 className="section-headline">Pronto para escalar com IA?</h2>
            <p className="section-sub">
              Agende uma conversa gratuita e descubra como reduzir custos e multiplicar resultados.
            </p>
            <a href="mailto:contato@wwaico.com" className="btn-large">
              Quero começar →
            </a>
          </div>
        </div>
      </section>

      {/* SÓCIOS */}
      <section id="socios">
        <div className="container">
          <div className="socios-header fade-up">
            <p className="section-label">As pessoas por trás da WWAI</p>
            <h2 className="section-headline">Os sócios</h2>
            <p className="section-sub">
              Líderes que construíram empresas reais e agora unem forças para levar IA ao próximo nível.
            </p>
          </div>
          <div className="socios-grid">
            {socios.map((s, i) => (
              <div key={s.name} className={`socio-card fade-up stagger-${i + 1}`}>
                <div className="socio-avatar">{s.initial}</div>
                <p className="socio-name">{s.name}</p>
                <p className="socio-creds">{s.creds}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato">
        <div className="footer-brand">
          <a href="#" className="nav-logo">WWAI</a>
          <p className="footer-tagline">
            Inteligência Artificial aplicada para empresas que querem crescer de verdade.
          </p>
        </div>
        <div className="footer-right">
          <p className="footer-email">
            <a href="mailto:contato@wwaico.com">contato@wwaico.com</a>
          </p>
          <p className="footer-social">
            <a href="https://instagram.com/wwai.co" target="_blank" rel="noreferrer">@wwai.co</a>
          </p>
          <p className="footer-copy">© 2026 WWAI. Todos os direitos reservados.</p>
          <p className="footer-micro">Feito com IA · para resultados reais</p>
        </div>
      </footer>
    </>
  )
}
