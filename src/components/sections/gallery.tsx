import Image from "next/image";
import { Ruler, Clock, Tag, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MediaSlot } from "@/components/ui/media-slot";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/lib/content";

export function Gallery() {
  return (
    <Section id="gallery" tone="paper">
      <SectionHeading
        eyebrow="Наши работы"
        title="Кухни, которые уже готовят ужины"
        subtitle="Реальные проекты — с ценой и сроком. Каждую собирали под конкретную квартиру и пожелания хозяев."
      />

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <RevealItem key={p.id}>
            <ProjectCard project={p} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12 flex justify-center">
        <Button href="#quiz" variant="outline" size="lg">
          Хочу такую же кухню
        </Button>
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone bg-paper shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden">
        <MediaSlot
          src={project.image}
          alt={project.title}
          label="Фото проекта"
          aspect="aspect-[4/3]"
          rounded="rounded-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />

        {/* Фото «до» поверх — проявляется при наведении */}
        {project.beforeImage && (
          <>
            <Image
              src={project.beforeImage}
              alt={`${project.title} — до`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-paper backdrop-blur-sm">
              <span className="group-hover:hidden">после · наведите</span>
              <span className="hidden group-hover:inline">до ремонта</span>
            </span>
          </>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
          {project.style}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">
          {project.title}
        </h3>
        {project.location && (
          <p className="mt-1.5 flex items-center gap-1 text-sm text-muted">
            <MapPin weight="fill" className="h-3.5 w-3.5 shrink-0 text-clay/70" />
            {project.location}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Ruler weight="duotone" className="h-4 w-4 text-clay" />
            {project.size}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock weight="duotone" className="h-4 w-4 text-clay" />
            {project.term}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-display font-bold text-ink">
            <Tag weight="duotone" className="h-4 w-4 text-clay" />
            {project.price}
          </span>
        </div>
      </div>
    </article>
  );
}
