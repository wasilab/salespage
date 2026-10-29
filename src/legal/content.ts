export type LegalDoc = {
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

// Draft text — have it reviewed by counsel before relying on it.
export const DOCS: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    summary: "How Xploreto collects, uses and protects information submitted through this website.",
    updated: "October 2026",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "When you request access, we collect the organization name, email address and phone number you submit in the signup form.",
          "We do not collect payment details through this website.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use this information to review your request, contact you about the platform and arrange demos. We do not sell your information.",
        ],
      },
      {
        heading: "Retention and your rights",
        body: [
          "We keep signup requests only as long as needed to respond and follow up. You can ask us to access, correct or delete your information at any time by emailing us.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    summary: "The terms that apply when you use the Xploreto website and request access to the platform.",
    updated: "October 2026",
    sections: [
      {
        heading: "Use of this website",
        body: [
          "This website describes the Xploreto platform and lets you request access or explore a demo. You agree to provide accurate information and not to misuse the site or demo environments.",
        ],
      },
      {
        heading: "Demo access",
        body: [
          "Demo environments are provided for evaluation only, may contain sample data and may change or be withdrawn without notice.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The website and demos are provided \"as is\" without warranties. To the extent permitted by law, Xploreto Labs is not liable for indirect or consequential losses arising from their use.",
        ],
      },
    ],
  },
};
