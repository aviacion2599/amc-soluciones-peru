"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2, FileText } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/shared/Motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export default function BlogPostPage({ slug }: { slug: string }) {
  return (
    <PageTransition>
      <BlogPostContent slug={slug} />
    </PageTransition>
  );
}

function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/blog`)
      .then((r) => r.json())
      .then((res) => {
        const found = (res.data || []).find((p: any) => p.slug === slug);
        if (!found) {
          setError(true);
          setLoading(false);
          return;
        }
        // Fetch full content (would need a /api/blog/[slug] endpoint; for now use the list version)
        setPost(found);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container-amc py-20 max-w-3xl">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !post) {
    notFound();
  }

  // JSON-LD BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author?.name ? { "@type": "Person", name: post.author.name } : undefined,
    image: post.coverImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" aria-hidden="true" />
        <div className="container-amc relative py-16">
          <FadeIn>
            <div className="max-w-3xl">
              {post.tags && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.split(",").map((tag: string) => (
                    <span key={tag} className="glass-card px-3 py-1 rounded-full text-xs text-slate-200">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="display-1 text-white mb-4 text-balance">{post.title}</h1>
              <p className="text-lg text-slate-200 leading-relaxed mb-6">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                {post.author?.name && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                )}
                {post.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("es-PE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container-amc py-6">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </div>

      {/* Content */}
      <article className="container-amc max-w-3xl pb-20">
        <FadeIn>
          {post.coverImage && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              { }
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.content || post.excerpt}
            </p>
          </div>

          {/* Footer del artículo */}
          <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
          </div>
        </FadeIn>
      </article>
    </>
  );
}
