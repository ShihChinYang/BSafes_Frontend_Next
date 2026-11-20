import { useMemo, useState } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';

import { isTwinPaper } from '../../lib/twinPaperAppTheme';
import SupportLayout from '../../components/twinPaper/support/SupportLayout';
import BSafesSupportRedirect from '../../components/twinPaper/support/BSafesSupportRedirect';
import { ARTICLES, CATEGORIES, articlesIn } from '../../components/twinPaper/support';

// Every word must match; title hits rank above summary hits, above body hits.
function searchArticles(query) {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return null;
    return ARTICLES.map((a) => {
        const t = a.title.toLowerCase(), s = a.summary.toLowerCase(), x = a.text.toLowerCase();
        let score = 0;
        for (const w of words) {
            const hit = (t.includes(w) ? 10 : 0) + (s.includes(w) ? 4 : 0) + (x.includes(w) ? 1 : 0);
            if (!hit) return null;
            score += hit;
        }
        return { a, score };
    }).filter(Boolean).sort((p, q) => q.score - p.score).map((h) => h.a);
}

function ArticleList({ articles }) {
    return (
        <ul className="sp-list">
            {articles.map((a) => (
                <li key={a.slug}>
                    <Link href={`/support/${a.slug}`}>
                        <span>{a.title}</span>
                        <small>{a.summary}</small>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function SupportHome() {
    const [query, setQuery] = useState('');
    const results = useMemo(() => searchArticles(query), [query]);

    return (
        <SupportLayout description="Guides for capturing, organizing and protecting the Twins of your paper pages.">
            <section className="sp-hero">
                <Container>
                    <div className="sp-kicker">Help center</div>
                    <h1>How can we help?</h1>
                    <p className="sp-lede">Guides for capturing, organizing and protecting the Twins of your paper pages.</p>
                    <div className="sp-search">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                        <input
                            type="search"
                            placeholder="Search articles"
                            autoComplete="off"
                            aria-label="Search articles"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    {results && (
                        <div className="sp-results" aria-live="polite">
                            {results.length ? <ArticleList articles={results} /> : <p className="sp-muted">No articles match. Try different words.</p>}
                        </div>
                    )}
                </Container>
            </section>
            {!results && (
                <Container>
                    {CATEGORIES.map((c) => (
                        <section className="sp-cat" id={c.id} key={c.id}>
                            <div className="sp-cat-head">
                                <h2>{c.name}</h2>
                                <p>{c.desc}</p>
                            </div>
                            <ArticleList articles={articlesIn(c.id)} />
                        </section>
                    ))}
                </Container>
            )}
        </SupportLayout>
    );
}

export default function Support() {
    return isTwinPaper ? <SupportHome /> : <BSafesSupportRedirect />;
}
