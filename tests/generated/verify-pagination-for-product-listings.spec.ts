import { test, expect } from "@playwright/test";

test("Verify pagination for product listings", async ({ page }) => {
    await page.goto("https://demoblaze.com");

    const firstPageItemCount = await page.getByRole("link", { name: /Samsung galaxy s6|Nokia lumia 1570|Nexus 6/ }).count();
    expect(firstPageItemCount).toBeGreaterThan(0);

    const nextButton = page.getByRole("button", { name: "Next" });
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    const secondPageItemCount = await page.getByRole("link", { name: /Sony xperia z5|HTC One M9|Sony vaio i5/ }).count();
    expect(secondPageItemCount).toBeGreaterThan(0);

    const previousButton = page.getByRole("button", { name: "Previous" });
    await expect(previousButton).toBeVisible();
});