"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, User, FileText } from "lucide-react";
import { PageTransition, StaggerContainer, StaggerItem, FadeIn } from "@/components/shared/Motion";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  tags: string;
  publishedAt: string | null;
  author: { name: string | null } | null;
}

export default function BlogPage() {
  return (
    <PageTransition>
      <BlogContent />
    </PageTransition>
  );
}

function BlogContent() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/blog?limit=20")
      .then((r) => r.json())
      .then((res) => {
        setPosts(res.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHero
        overline="Blog AMC"
        title={
          <>
            Insights sobre{" "}
            <span className="bg-gradient-to-r from-sky-200 to-blue-300 bg-clip-text text-transparent">
              manejo de efectivo
            </span>
          </>
        }
        description="Artículos técnicos, guías y novedades sobre equipos de conteo, detección de falsificaciones, calibración y mejores prácticas para tu negocio."
        icon={FileText}
      />

      <div className="container-amc py-10">
        <Breadcrumb items={[{ label: "Blog" }]} />

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">Próximamente</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Estamos preparando contenido técnico de calidad. Vuelve pronto para leer nuestros primeros artículos.
              </p>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-base card-hover overflow-hidden block h-full group"
                >
                  <div className="aspect-video bg-gradient-to-br from-muted to-surface-2 flex items-center justify-center">
                    {post.coverImage ? (
                       
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="w-12 h-12 text-secondary group-hover:scale-110 transition-transform" strokeWidth={1} />
                    )}
                  </div>
                  <div className="p-5">
                    {post.tags && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.split(",").slice(0, 2).map((tag) => (
                          <span key={tag} className="badge-neutral">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        {post.author?.name && (
                          <>
                            <User className="w-3 h-3" />
                            <span>{post.author.name}</span>
                          </>
                        )}
                      </div>
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString("es-PE", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </>
  );
}
