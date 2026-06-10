import Image from "next/image";
import { Factory } from "@phosphor-icons/react/dist/ssr";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { MediaSlot } from "@/components/ui/media-slot";
import {
  team,
  productionShots,
  type TeamMember,
  type ProductionShot,
} from "@/lib/content";

export function Team() {
  return (
    <Section id="team" tone="paper">
      <SectionHeading
        eyebrow="Кто делает вашу кухню"
        title="Своё производство и живые люди за ним"
        subtitle="Мы не перепродаём — режем, красим и собираем сами в цеху под Минском. Эти люди приедут на замер, изготовят и установят вашу кухню."
      />

      {/* Команда */}
      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => (
          <RevealItem key={`${m.name}-${i}`}>
            <MemberCard member={m} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Производство */}
      <Reveal delay={0.1}>
        <div className="mt-14 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          <Factory weight="duotone" className="h-5 w-5 text-clay" />
          Наш цех
        </div>
      </Reveal>

      <RevealGroup className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {productionShots.map((shot, i) => (
          <RevealItem key={`${shot.caption}-${i}`}>
            <ProductionCard shot={shot} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone bg-paper shadow-soft">
      <Portrait member={member} />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-ink">{member.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-clay">{member.role}</p>
        {member.quote && (
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
            «{member.quote}»
          </p>
        )}
      </div>
    </article>
  );
}

function Portrait({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={member.photo}
          alt={`${member.name} — ${member.role}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <MediaSlot
      label="Фото сотрудника"
      aspect="aspect-[4/5]"
      rounded="rounded-none"
    />
  );
}

function ProductionCard({ shot }: { shot: ProductionShot }) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-stone bg-paper shadow-soft">
      <div className="relative overflow-hidden">
        <MediaSlot
          src={shot.image}
          alt={shot.caption}
          label="Фото цеха"
          aspect="aspect-[4/3]"
          rounded="rounded-none"
          sizes="(max-width: 640px) 50vw, 25vw"
          className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>
      <figcaption className="px-4 py-3 text-sm font-medium text-ink/80">
        {shot.caption}
      </figcaption>
    </figure>
  );
}
