export const sectionAnchors = ['hero', 'about', 'projects', 'career', 'contact'] as const;

export type SectionAnchor = (typeof sectionAnchors)[number];
