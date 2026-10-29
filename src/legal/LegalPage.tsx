import { Link, Navigate, useParams } from "react-router-dom";
import { SEOHead } from "../utility/components/SEOHead";
import { DOCS } from "./content";

const STYLES = `
.legal-root { text-align: left; min-height: 100vh; background: #030712; color: #D1D5DB; font-family: Inter, system-ui, sans-serif; }
.legal-wrap { max-width: 760px; margin: 0 auto; padding: 32px 20px 80px; }
.legal-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; font-size: 14px; }
.legal-top a { color: #818CF8; text-decoration: none; }
.legal-top a:hover { text-decoration: underline; }
.legal-root h1 { color: #fff; font-size: 34px; margin: 0 0 6px; }
.legal-updated { color: #6B7280; font-size: 13px; margin-bottom: 32px; }
.legal-root h2 { color: #fff; font-size: 19px; margin: 32px 0 8px; }
.legal-root p { line-height: 1.7; margin: 0 0 12px; font-size: 15px; }
.legal-tabs { display: flex; gap: 16px; }
.legal-tabs .active { color: #fff; border-bottom: 2px solid #6366F1; }
`;

export const LegalPage = () => {
  const { doc } = useParams();
  const page = doc ? DOCS[doc] : undefined;
  if (!page) return <Navigate to="/" replace />;

  return (
    <div className="legal-root">
      <SEOHead title={`${page.title} | Xploreto`} description={page.summary} />
      <style>{STYLES}</style>
      <div className="legal-wrap">
        <nav className="legal-top">
          <Link to="/">← Back to home</Link>
          <div className="legal-tabs">
            {Object.entries(DOCS).map(([slug, d]) => (
              <Link key={slug} to={`/${slug}`} className={slug === doc ? "active" : undefined}>
                {d.title}
              </Link>
            ))}
          </div>
        </nav>
        <h1>{page.title}</h1>
        <div className="legal-updated">Last updated: {page.updated}</div>
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        <p>
          Questions? Contact <a href="mailto:contact@xploreto.com" style={{ color: "#818CF8" }}>contact@xploreto.com</a>.
        </p>
      </div>
    </div>
  );
};
