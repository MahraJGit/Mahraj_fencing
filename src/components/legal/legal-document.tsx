import Link from "next/link";

type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  after?: readonly string[];
};

function BoldLead({ text }: { text: string }) {
  const idx = text.indexOf(": ");
  if (idx > 0 && idx < 48) {
    return (
      <>
        <strong className="font-bold text-ink">{text.slice(0, idx + 1)}</strong>
        {text.slice(idx + 1)}
      </>
    );
  }
  return <>{text}</>;
}

export function LegalDocument({
  intro,
  privacyNote,
  sections,
  lastUpdated,
  contact,
  entireAgreement,
}: {
  intro: readonly string[];
  privacyNote?: string;
  sections: readonly LegalSection[];
  lastUpdated: string;
  contact?: {
    title: string;
    intro: string;
    email: string;
    phone: string;
    address: string;
  };
  entireAgreement?: {
    before: string;
    linkLabel: string;
    linkHref: string;
    after: string;
  };
}) {
  return (
    <article className="prose-content mx-auto max-w-3xl">
      {intro.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}

      {privacyNote ? (
        <p>
          Details on how we handle your personal information are in our{" "}
          <Link
            href="/privacy"
            className="font-bold text-brand hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      ) : null}

      {sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="font-heading text-xl font-bold text-ink sm:text-2xl">
            {section.title}
          </h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="mt-3">
              {paragraph}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
              {section.bullets.map((item) => (
                <li key={item}>
                  <BoldLead text={item} />
                </li>
              ))}
            </ul>
          ) : null}
          {section.after?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="mt-3">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <p className="mt-10 text-sm text-body">
        <strong className="font-bold text-ink">Last updated:</strong>{" "}
        {lastUpdated}
      </p>

      {contact ? (
        <section className="mt-10">
          <h2 className="font-heading text-xl font-bold text-ink sm:text-2xl">
            {contact.title}
          </h2>
          <p className="mt-3">{contact.intro}</p>
          <ul className="mt-4 space-y-2 text-body">
            <li>
              <strong className="font-bold text-ink">Email:</strong>{" "}
              <a
                href={`mailto:${contact.email}`}
                className="font-bold text-brand hover:underline"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <strong className="font-bold text-ink">Phone:</strong>{" "}
              {contact.phone}
            </li>
            <li>
              <strong className="font-bold text-ink">Address:</strong>{" "}
              {contact.address}
            </li>
          </ul>
        </section>
      ) : null}

      {entireAgreement ? (
        <p className="mt-10">
          <strong className="font-bold text-ink">Entire Agreement:</strong>{" "}
          {entireAgreement.before}{" "}
          <Link
            href={entireAgreement.linkHref}
            className="font-bold text-brand hover:underline"
          >
            {entireAgreement.linkLabel}
          </Link>
          {entireAgreement.after}
        </p>
      ) : null}
    </article>
  );
}
