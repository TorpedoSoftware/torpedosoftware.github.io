import { describe, it, expect } from "vitest";
import { siteSchema, aboutSchema, teamSchema, projectsSchema, careersSchema } from "../schemas";

describe("content schemas", () => {
  describe("siteSchema", () => {
    it("accepts valid site content", () => {
      const valid = {
        name: "Test Co",
        tagline: "Hello",
        email: "test@example.com",
        socials: [{ label: "GitHub", url: "https://github.com" }],
      };
      expect(() => siteSchema.parse(valid)).not.toThrow();
    });

    it("rejects site content missing required fields", () => {
      const invalid = { name: "Test" };
      expect(() => siteSchema.parse(invalid)).toThrow();
    });
  });

  describe("aboutSchema", () => {
    it("accepts valid about content", () => {
      const valid = { intro: "Hello", paragraphs: ["p1", "p2"] };
      expect(() => aboutSchema.parse(valid)).not.toThrow();
    });

    it("accepts about content with pillars", () => {
      const valid = {
        intro: "Hello",
        paragraphs: ["p1"],
        pillars: [{ title: "Open Source", description: "We share our work." }],
      };
      expect(() => aboutSchema.parse(valid)).not.toThrow();
    });

    it("rejects about content with non-array paragraphs", () => {
      const invalid = { intro: "Hello", paragraphs: "not an array" };
      expect(() => aboutSchema.parse(invalid)).toThrow();
    });
  });

  describe("teamSchema", () => {
    it("accepts valid team members", () => {
      const valid = [{ name: "Zack", role: "Founder", image: "/team/zack.jpg", order: 1 }];
      expect(() => teamSchema.parse(valid)).not.toThrow();
    });

    it("rejects members missing required fields", () => {
      const invalid = [{ name: "Zack" }];
      expect(() => teamSchema.parse(invalid)).toThrow();
    });
  });

  describe("projectsSchema", () => {
    it("accepts a valid project array", () => {
      const valid = [{ title: "Lua Learning", description: "A game", primaryUrl: "https://example.com" }];
      expect(() => projectsSchema.parse(valid)).not.toThrow();
    });

    it("accepts projects with optional fields", () => {
      const valid = [
        {
          title: "Lua Learning",
          description: "A game",
          primaryUrl: "https://example.com",
          awards: [{ title: "Most Educational Game", year: 2020 }],
          links: [{ title: "Play", url: "https://example.com" }],
          image: "/projects/lualearning.jpg",
        },
      ];
      expect(() => projectsSchema.parse(valid)).not.toThrow();
    });

    it("rejects projects missing required fields", () => {
      const invalid = [{ title: "Lua Learning" }];
      expect(() => projectsSchema.parse(invalid)).toThrow();
    });
  });

  describe("careersSchema", () => {
    it("accepts valid careers content", () => {
      const valid = {
        accepting: true,
        intro: "We're hiring",
        ctaLabel: "Get in touch",
        openings: [{ title: "2D Artist", description: "Draw things" }],
      };
      expect(() => careersSchema.parse(valid)).not.toThrow();
    });

    it("accepts careers with no openings", () => {
      const valid = { accepting: false, intro: "No openings", ctaLabel: "Reach out", openings: [] };
      expect(() => careersSchema.parse(valid)).not.toThrow();
    });

    it("rejects careers missing ctaLabel", () => {
      const invalid = { accepting: true, intro: "We're hiring", openings: [] };
      expect(() => careersSchema.parse(invalid)).toThrow();
    });
  });
});
