import { test, expect } from "@playwright/test";

test("Verify product display on Home page", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  const productContainer = page.getByRole("main");
  await expect(productContainer).toBeVisible();

  const samsungGalaxyS6 = page.getByRole("link", { name: "Samsung galaxy s6" });
  await expect(samsungGalaxyS6).toBeVisible();

  const nokiaLumia = page.getByRole("link", { name: "Nokia lumia 1520" });
  await expect(nokiaLumia).toBeVisible();

  const nexus6 = page.getByRole("link", { name: "Nexus 6" });
  await expect(nexus6).toBeVisible();

  const productPrice = page.getByText("$360");
  await expect(productPrice).toBeVisible();
});