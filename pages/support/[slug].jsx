import Link from 'next/link';
import Container from 'react-bootstrap/Container';

import { isTwinPaper } from '../../lib/twinPaperAppTheme';
import SupportLayout from '../../components/twinPaper/support/SupportLayout';
import BSafesSupportRedirect from '../../components/twinPaper/support/BSafesSupportRedirect';
import { ARTICLES, getArticle, getCategory, articlesIn } from '../../components/twinPaper/support';

// output: 'export' needs every article path at build time.
export function getStaticPaths() {
    return { paths: ARTICLES.map((a) => ({ params: { slug: a.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
    return { props: { slug: params.slug } };
}

function SupportArticle({ slug }) {
    const article = getArticle(slug);
    const category = getCategory(article.category);
    const siblings = articlesIn(article.category);
    const next = siblings[siblings.indexOf(article) + 1];
    const Body = article.Body;

    return (
        <SupportLayout title={article.title} description={article.summary}>
            <Container>
                <div className="sp-article-layout">
                    <aside className="sp-side" aria-label={`${category.name} articles`}>
                        <Link className="sp-back" href="/support">← All topics</Link>
                        <div className="sp-eyebrow">{category.name}</div>
                        <ul>
                            {siblings.map((a) => (
                                <li key={a.slug}>
                                    <Link href={`/support/${a.slug}`} aria-current={a.slug === slug ? 'page' : undefined}>{a.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <article className="sp-article">
                        <nav className="sp-crumbs" aria-label="Breadcrumb">
                            <Link href="/support">Help center</Link> / <Link href={`/support#${category.id}`}>{category.name}</Link>
                        </nav>
                        <h1>{article.title}</h1>
                        <p className="sp-lede">{article.summary}</p>
                        <div className="sp-prose">
                            <Body />
                        </div>
                        {next && (
                            <Link className="sp-next" href={`/support/${next.slug}`}>
                                <small>Next</small>
                                <span>{next.title} →</span>
                            </Link>
                        )}
                    </article>
                </div>
            </Container>
        </SupportLayout>
    );
}

export default function SupportArticlePage({ slug }) {
    return isTwinPaper ? <SupportArticle slug={slug} /> : <BSafesSupportRedirect />;
}
