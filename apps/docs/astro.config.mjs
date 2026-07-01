// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
	site: "https://manovaspace.github.io",
	base: "/ts",
	integrations: [
		starlight({
			title: "manovaspace",
			tagline: "MIT TypeScript open commons (@manovaspace/*)",
			editLink: {
				baseUrl:
					"https://github.com/manovaspace/ts/edit/main/apps/docs/src/content/docs/",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/manovaspace/ts",
				},
				{
					icon: "external",
					label: "Design system",
					href: "https://manovaspace.github.io/design-system/",
				},
				{
					icon: "external",
					label: "npm",
					href: "https://www.npmjs.com/org/manovaspace",
				},
			],
			sidebar: [
				{ label: "Getting started", slug: "getting-started" },
				{
					label: "Packages",
					items: [
						{ label: "tsconfig", slug: "packages/tsconfig" },
						{ label: "markdown", slug: "packages/markdown" },
						{ label: "pwa", slug: "packages/pwa" },
						{
							label: "observability",
							slug: "packages/observability",
						},
					],
				},
				{
					label: "Design system",
					items: [
						{
							label: "tokens, ui, devtools",
							link: "https://manovaspace.github.io/design-system/",
						},
					],
				},
				{ label: "Contributing", slug: "contributing" },
			],
		}),
	],
});
