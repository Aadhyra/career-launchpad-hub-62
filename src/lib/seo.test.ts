import { describe, expect, it } from "vitest";
import { getPageSeo } from "./seo";

describe("search page scope", () => {
  it("makes the public catalogue discoverable", () => {
    expect(getPageSeo("/courses").indexable).toBe(true);
    expect(getPageSeo("/internships").indexable).toBe(true);
    expect(getPageSeo("/services").indexable).toBe(true);
  });
  it("excludes operational and account pages", () => {
    for (const path of ["/admin/login", "/superadmin", "/dashboard", "/update-password", "/apply", "/unknown"]) {
      expect(getPageSeo(path).indexable).toBe(false);
    }
  });
  it("normalizes trailing slashes to the same page", () => {
    expect(getPageSeo("/courses/").path).toBe("/courses");
    expect(getPageSeo("/").path).toBe("/");
  });
});