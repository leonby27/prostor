import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewsRow } from "@/components/sections/reviews-row";

export function Reviews() {
  return (
    <Section tone="sand">
      <SectionHeading
        eyebrow="Отзывы"
        title="Что говорят те, у кого уже стоит наша кухня"
        subtitle="Средняя оценка 4.9 из 5 по 320+ отзывам. Вот несколько — с фото их кухонь, без правок и приукрашивания."
      />

      <ReviewsRow />
    </Section>
  );
}
