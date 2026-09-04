import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { clinic, doctors, priceExamples, reviews, services } from './content/site'
import priceCatalogData from './content/prices.json'

type PriceRow =
  | { type: 'group'; title: string; code?: string }
  | { type: 'item'; code: string; name: string; price: string; sourcePrice: string }
type PriceCategory = { title: string; slug: string; sourceUrl: string; note: string; rows: PriceRow[] }
const priceCatalog = priceCatalogData as PriceCategory[]

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

function ToothMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 52 52" aria-hidden="true">
      <rect x="1.5" y="1.5" width="49" height="49" rx="3" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M15 13c5-5 8 0 11 0s6-5 11 0c5 6 0 15-2 20-2 5-3 9-6 9-3 0-1-8-3-8s0 8-3 8c-3 0-4-4-6-9-2-5-7-14-2-20Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M10 35c3 5 8 8 16 8s13-3 16-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Brand() {
  return <Link to="/" className="brand" aria-label="Стоматология Зубок — на главную"><ToothMark /><span><strong>ЗУБОК</strong><small>стоматология в Казани</small></span></Link>
}

const nav = [
  ['/services', 'Услуги'], ['/doctors', 'Врачи'], ['/prices', 'Цены'], ['/about', 'О клинике'], ['/contacts', 'Контакты'],
]

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  return <>
    <div className="utility-bar"><div className="container utility-inner"><span>Казань, ул. Толбухина, 5</span><span>Пн—Пт 09:00—19:00 · Сб 09:00—14:00</span></div></div>
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span>{open ? 'Закрыть' : 'Меню'}</span><i aria-hidden="true" /></button>
        <nav id="main-nav" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Основная навигация">
          {nav.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        </nav>
        <a className="header-call" href={clinic.phones[0].href}><span>Позвонить</span><strong>{clinic.phones[0].display}</strong></a>
      </div>
    </header>
  </>
}

function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div><Brand /><p className="footer-note">Комплексная стоматологическая помощь в Казани с приоритетом сохранения собственных зубов.</p></div>
      <div><h2>Пациентам</h2><Link to="/services">Услуги</Link><Link to="/doctors">Врачи</Link><Link to="/prices">Цены</Link><Link to="/reviews">Отзывы</Link></div>
      <div><h2>Клиника</h2><Link to="/about">О клинике и документы</Link><Link to="/contacts">Контакты и режим работы</Link><a href={`mailto:${clinic.emails[1]}`}>{clinic.emails[1]}</a></div>
      <div className="footer-contact"><h2>Запись по телефону</h2>{clinic.phones.map((p) => <a key={p.href} href={p.href}>{p.display}</a>)}<p>{clinic.address}</p></div>
    </div>
    <div className="container footer-bottom"><span>Независимый концепт обновления сайта. Не является официальным сайтом клиники.</span><strong>Имеются противопоказания. Необходима консультация специалиста.</strong></div>
  </footer>
}

function Layout() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); document.body.classList.remove('nav-open') }, [location.pathname])
  return <><a href="#content" className="skip-link">К содержанию</a><Header /><main id="content"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/:slug" element={<ServiceDetail />} />
    <Route path="/doctors" element={<Doctors />} />
    <Route path="/prices" element={<Prices />} />
    <Route path="/about" element={<About />} />
    <Route path="/reviews" element={<Reviews />} />
    <Route path="/contacts" element={<Contacts />} />
    <Route path="*" element={<NotFound />} />
  </Routes></main><Footer /></>
}

function Arrow() { return <span aria-hidden="true">↗</span> }
function Breadcrumbs({ current, parent }: { current: string, parent?: [string, string] }) {
  return <nav className="breadcrumbs" aria-label="Хлебные крошки"><Link to="/">Главная</Link><span>/</span>{parent && <><Link to={parent[0]}>{parent[1]}</Link><span>/</span></>}<span aria-current="page">{current}</span></nav>
}
function PageIntro({ eyebrow, title, text }: { eyebrow: string, title: string, text: string }) {
  return <section className="page-intro"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>
}
function CallBand({ title = 'Обсудим, какой врач и приём вам нужны' }: { title?: string }) {
  return <section className="call-band"><div className="container call-band-inner"><div><span className="eyebrow light">Запись и вопросы</span><h2>{title}</h2></div><div><a href={clinic.phones[0].href}>{clinic.phones[0].display}</a><Link className="button button-light" to="/contacts">Все контакты <Arrow /></Link></div></div></section>
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-rule" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Стоматология на ул. Толбухина</span>
          <h1>Сохраняем каждый зуб, когда это возможно</h1>
          <p>Комплексный подход к лечению: от терапии и ортодонтии до протезирования и имплантации. Приём ведут врачи с профильным образованием и многолетним опытом.</p>
          <div className="hero-actions"><a className="button" href={clinic.phones[0].href}>Записаться по телефону <Arrow /></a><Link className="text-link" to="/services">Выбрать направление <Arrow /></Link></div>
          <dl className="hero-facts"><div><dt>Консультация стоматолога</dt><dd>0 ₽</dd></div><div><dt>Рядом</dt><dd>ул. Толбухина, 5 · ост. «Кафе „Сирень“»</dd></div></dl>
        </div>
        <div className="hero-visual"><div className="image-frame"><img src={asset('/assets/source/002.JPG')} alt="Зал ожидания клиники «Зубок»" /><span>Настоящая клиника<br />на ул. Толбухина</span></div><div className="hero-mark"><ToothMark /></div></div>
      </div>
    </section>

    <section className="section services-preview">
      <div className="container"><div className="section-heading"><div><span className="eyebrow">Направления лечения</span><h2>От первого осмотра<br />до восстановления улыбки</h2></div><p>Пять основных направлений собраны в одном месте. Выберите причину обращения — на приёме врач уточнит диагноз и план лечения.</p></div>
        <div className="service-path">{services.map((s, i) => <Link to={`/services/${s.slug}`} className="service-row" key={s.slug}><span className="service-number">0{i + 1}</span><strong>{s.title}</strong><p>{s.short}</p><Arrow /></Link>)}</div>
        <Link className="button button-outline" to="/services">Все услуги <Arrow /></Link>
      </div>
    </section>

    <section className="section trust-section"><div className="container trust-grid"><div className="trust-photo"><img src={asset('/assets/source/003.JPG')} alt="Регистратура стоматологии «Зубок»" /><span>Регистратура клиники</span></div><div className="trust-copy"><span className="eyebrow light">Подход клиники</span><h2>Сначала — сохранить.<br />Удаление — крайняя мера.</h2><p>В клинике используют зубосохраняющие методы и подбирают материалы разных ценовых категорий. Пациент может обсудить с врачом доступные варианты до начала лечения.</p><ul className="check-list"><li>Стерилизация и работа по стандартам безопасности лечения</li><li>Сертифицированные материалы и обезболивающие средства</li><li>Накопительные скидки от 5% до 10%, заявленные клиникой</li></ul><Link className="text-link light" to="/about">Подробнее о клинике и лицензии <Arrow /></Link></div></div></section>

    <section className="section team-preview"><div className="container"><div className="section-heading"><div><span className="eyebrow">Врачи</span><h2>Специалисты, которых можно узнать до приёма</h2></div><p>Образование, специализации и данные об аккредитации сотрудников.</p></div><div className="doctor-strip">{doctors.slice(0, 4).map((d) => <article className="doctor-card" key={d.name}><img src={asset(`/assets/source/${d.image}`)} alt={d.name} /><div><h3>{d.name}</h3><p>{d.role}</p><small>{d.since}</small></div></article>)}</div><Link className="button button-outline" to="/doctors">Вся команда <Arrow /></Link></div></section>

    <section className="section price-teaser"><div className="container price-teaser-grid"><div><span className="eyebrow">Прозрачнее о стоимости</span><h2>Понятные примеры,<br />из чего складывается цена</h2><p>Итоговая стоимость зависит от состояния зуба и объёма лечения. На странице цен можно посмотреть состав процедур и стоимость услуг.</p><Link className="button" to="/prices">Посмотреть цены <Arrow /></Link></div><div className="cost-note"><span>Расчёт лечения</span><strong>Лечение глубокого кариеса</strong><div><span>Консультация</span><b>0 ₽</b></div><div><span>Анестезия</span><b>700 ₽</b></div><div><span>Восстановление зуба</span><b>5 500 ₽</b></div><footer><span>Примерный итог</span><strong>6 500 ₽</strong></footer></div></div></section>

    <CallBand title="Позвоните — подскажем, к какому специалисту записаться" />
  </>
}

function Services() {
  return <><PageIntro eyebrow="Все направления" title="Стоматологическая помощь для разных задач" text="От лечения кариеса до восстановления отсутствующих зубов. Окончательный план формируется только после осмотра и диагностики." /><section className="section service-index"><div className="container"><div className="service-index-grid">{services.map((s, i) => <Link key={s.slug} to={`/services/${s.slug}`} className="service-tile"><span>0{i + 1}</span><div><h2>{s.title}</h2><p>{s.short}</p></div><Arrow /></Link>)}</div></div></section><CallBand /></>
}

function ServiceDetail() {
  const { slug } = useParams(); const service = services.find((s) => s.slug === slug)
  if (!service) return <NotFound />
  const index = services.findIndex((s) => s.slug === slug); const next = services[(index + 1) % services.length]
  return <><section className="detail-hero"><div className="container"><Breadcrumbs current={service.title} parent={['/services', 'Услуги']} /><div className="detail-grid"><div><span className="eyebrow">Направление лечения</span><h1>{service.title}</h1><p>{service.lead}</p><a className="button" href={clinic.phones[0].href}>Записаться по телефону <Arrow /></a></div><div className={`detail-art ${service.image ? '' : 'no-image'}`}>{service.image ? <img src={asset(service.image)} alt={`Иллюстрация: ${service.title.toLowerCase()}`} /> : <ToothMark />}<span>Решение принимает врач<br />после очного осмотра</span></div></div></div></section><section className="section"><div className="container two-column"><div><span className="eyebrow">В клинике</span><h2>Что входит в направление</h2></div><ul className="detail-list">{service.points.map((x) => <li key={x}>{x}</li>)}</ul></div></section><section className="next-route"><div className="container"><span>Следующее направление</span><Link to={`/services/${next.slug}`}>{next.title} <Arrow /></Link></div></section><CallBand /></>
}

function Doctors() {
  return <><PageIntro eyebrow="Команда" title="Врачи клиники «Зубок»" text="Профильное образование, специализация и опыт каждого врача — без анонимных карточек и рекламных обещаний." /><section className="section"><div className="container doctors-grid">{doctors.map((d) => <article className="doctor-profile" key={d.name}><img src={asset(`/assets/source/${d.image}`)} alt={d.name} /><div><h2>{d.name}</h2><p>{d.role}</p>{d.since && <strong>{d.since}</strong>}{d.education && <small>Образование: {d.education}</small>}<a href={clinic.phones[0].href}>Записаться по телефону <Arrow /></a></div></article>)}</div></section><CallBand title="Запишитесь к врачу по телефону регистратуры" /></>
}

function Prices() {
  const [active, setActive] = useState(priceCatalog[0].slug)
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase('ru')
  return <>
    <PageIntro eyebrow="Прайс-лист" title="Цены на услуги клиники" text="Выберите направление или найдите нужную услугу по названию или медицинскому коду." />
    <section className="price-toolbar"><div className="container"><nav aria-label="Разделы прайс-листа">{priceCatalog.map((category) => <button key={category.slug} type="button" className={active === category.slug ? 'active' : ''} onClick={() => { setActive(category.slug); setQuery('') }}>{category.title}</button>)}</nav><label className="price-search"><span>Найти услугу или код</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Например: анестезия" /></label></div></section>
    <section className="section full-prices"><div className="container">
      <div className="price-notice"><strong>Важно</strong><p>Цены носят информативный характер и могут меняться. Точную стоимость и состав лечения врач определяет после осмотра.</p><a href={clinic.phones[0].href}>{clinic.phones[0].display}</a></div>
      {priceCatalog.filter((category) => normalizedQuery || category.slug === active).map((category) => {
        const visible = normalizedQuery ? category.rows.filter((row) => row.type === 'item' && `${row.code} ${row.name}`.toLocaleLowerCase('ru').includes(normalizedQuery)) : category.rows
        if (!visible.length) return null
        return <article className="price-category" id={`price-${category.slug}`} key={category.slug}><header><div><span className="eyebrow">Направление</span><h2>{category.title}</h2></div></header><div className="price-table" role="table" aria-label={category.title}><div className="price-columns" role="row"><span role="columnheader">Код</span><span role="columnheader">Услуга</span><span role="columnheader">Цена</span></div>{visible.map((row, index) => row.type === 'group' ? <div className="price-group" role="row" key={`${row.title}-${index}`}><span role="cell">{row.title}</span>{row.code && <small role="cell">{row.code}</small>}</div> : <div className="price-service" role="row" key={`${row.code}-${index}`}><code role="cell">{row.code}</code><span role="cell">{row.name}</span><strong role="cell">{row.price}</strong></div>)}</div></article>
      })}
      {normalizedQuery && !priceCatalog.some((category) => category.rows.some((row) => row.type === 'item' && `${row.code} ${row.name}`.toLocaleLowerCase('ru').includes(normalizedQuery))) && <div className="price-empty"><h2>Ничего не найдено</h2><p>Попробуйте сократить запрос или выбрать направление выше.</p></div>}
      {!normalizedQuery && <section className="example-costs"><div className="section-heading"><div><span className="eyebrow">Как складывается стоимость</span><h2>Два примера расчёта</h2></div><p>Состав процедур и итоговая стоимость зависят от клинической ситуации.</p></div>{priceExamples.map((p) => <article className="price-example" key={p.title}><h2>{p.title}</h2>{p.rows.map(([label, value], i) => <div className="price-row" key={`${label}-${i}`}><span>{label}</span><strong>{value}</strong></div>)}<footer><span>Примерный итог</span><strong>{p.total}</strong></footer></article>)}</section>}
    </div></section>
    <CallBand title="Точную стоимость можно определить после осмотра" />
  </>
}

function About() {
  return <><PageIntro eyebrow="О клинике" title="Практичный подход и знакомое место" text="ООО «Зубная Клиника» работает под брендом «Зубок» на улице Толбухина в Казани. В основе подхода — сохранение зубов и понятный выбор лечения." /><section className="section about-story"><div className="container about-grid"><div className="about-images"><img src={asset('/assets/source/002.JPG')} alt="Зал ожидания клиники" /><img src={asset('/assets/source/004.JPG')} alt="Стенд сотрудников клиники" /></div><div><span className="eyebrow">Принципы</span><h2>Комплексный подход к каждому пациенту</h2><p>Удаление рассматривается как крайняя мера, когда современные зубосохраняющие методы уже не позволяют восстановить зуб. Клиника использует материалы разных производителей, поэтому пациент может обсуждать варианты стоимости лечения.</p><p>Накопительная система скидок от 5% до 10% на все виды услуг.</p><Link className="text-link" to="/doctors">Познакомиться с врачами <Arrow /></Link></div></div></section><section className="section documents-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Документы</span><h2>Лицензия открыта для просмотра</h2></div><p>Лицензия и выписка из реестра доступны для просмотра.</p></div><div className="documents"><a href={asset('/assets/source/litsenziya4.jpg')} target="_blank" rel="noreferrer"><img src={asset('/assets/source/litsenziya4.jpg')} alt="Лицензия стоматологической клиники" /><span>Открыть лицензию <Arrow /></span></a><a href={asset('/assets/source/vipisska_licenzii.jpg')} target="_blank" rel="noreferrer"><img src={asset('/assets/source/vipisska_licenzii.jpg')} alt="Выписка из реестра лицензий" /><span>Открыть выписку <Arrow /></span></a></div></div></section><CallBand /></>
}

function Reviews() {
  return <><PageIntro eyebrow="Отзывы пациентов" title="Слова благодарности врачам клиники" text="Отзывы пациентов о лечении, внимании врачей и атмосфере клиники." /><section className="section"><div className="container reviews-list">{reviews.map((r, i) => <article key={r.name}><span className="quote-mark">“</span><blockquote>{r.text}</blockquote><footer><strong>{r.name}</strong><span>{r.date || `Отзыв ${String(i + 1).padStart(2, '0')}`}</span></footer></article>)}</div></section><CallBand /></>
}

function Contacts() {
  const mapUrl = 'https://yandex.ru/maps/?text=' + encodeURIComponent(clinic.address)
  return <><PageIntro eyebrow="Контакты" title="Позвоните или приезжайте в клинику" text="Регистратура подскажет свободное время и поможет выбрать специалиста по причине обращения." /><section className="section contact-section"><div className="container contact-grid"><div className="contact-main"><span className="eyebrow">Телефоны</span>{clinic.phones.map((p) => <a className="contact-phone" key={p.href} href={p.href}>{p.display}</a>)}<div className="contact-address"><h2>{clinic.address}</h2><p>{clinic.landmark}</p><a className="button button-outline" href={mapUrl} target="_blank" rel="noreferrer">Открыть в Яндекс Картах <Arrow /></a></div><div className="contact-emails"><span>E-mail</span>{clinic.emails.map((e) => <a key={e} href={`mailto:${e}`}>{e}</a>)}</div></div><div className="contact-aside"><img src={asset('/assets/source/001.JPG')} alt="Вход в стоматологию «Зубок» на улице Толбухина" /><div className="schedule"><h2>Режим работы</h2>{clinic.schedule.map(([day, time]) => <div key={day}><span>{day}</span><strong>{time}</strong></div>)}</div></div></div></section><section className="free-care"><div className="container"><h2>Государственная гарантия бесплатной медицинской помощи</h2><p>Получить медицинскую помощь можно по адресам: ул. Космонавтов, 42, телефон 279-75-13; ул. Чернышевского, 10/6, телефоны 291-01-03 и 291-01-10 (круглосуточная неотложная стоматологическая помощь).</p></div></section></>
}

function NotFound() { return <section className="not-found"><div className="container"><span>404</span><h1>Такой страницы нет</h1><p>Перейдите к услугам клиники или вернитесь на главную.</p><div><Link className="button" to="/">На главную <Arrow /></Link><Link className="text-link" to="/services">Все услуги <Arrow /></Link></div></div></section> }

export default function App() { return <Layout /> }
