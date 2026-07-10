import { test, expect } from "@playwright/test";

test("Verify sending a contact message with valid data", async ({ page }) => {
  await page.goto("https://demoblaze.com");

  await page.getByRole("link", { name: "Contact" }).click();

  const modal = page.getByRole("dialog", { name: "New message" });
  await expect(modal).toBeVisible();

  await modal.getByLabel("Contact Email:").fill("testuser@example.com");
  await modal.getByLabel("Contact Name:").fill("John Doe");
  await modal.getByLabel("Message:").fill("This is a test inquiry message.");

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Thanks for the message!!");
    await dialog.accept();
  });

  await modal.getByRole("button", { name: "Send message" }).click();
});