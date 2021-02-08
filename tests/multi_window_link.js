import { Selector, t } from 'testcafe';

fixture("Multiple Window Testing").page("localhost:4000")

const clickPayWithPaypal = async () => {
    const buttonIframe = Selector('#smart-button-container iframe');
    const payWithPaypalButton = Selector('[data-funding-source="paypal"]');

    await t
        .switchToIframe(buttonIframe)
        .expect(payWithPaypalButton.with({ visibilityCheck: true }).exists)
        .ok({ timeout: 40000 })
        .hover(payWithPaypalButton)
        .click(payWithPaypalButton)
        .switchToMainWindow();
}

const clickContinueButtonWithRetry = async () => {
    const acceptAllButton = Selector('#acceptAllButton');
    const continueButton = Selector('[data-testid="submit-button-initial"]');
    if (await acceptAllButton.visible) await t.click(acceptAllButton);
    await t.setNativeDialogHandler(() => true).click(continueButton);
    if (await continueButton.visible) await t.click(continueButton);
}

test("Click link to open window", async () => {
    await t.click(Selector("#click_link"));
    const child = await t.getCurrentWindow();
    await t.closeWindow(child);
});

test("Enter child window multiple times", async () => {
    await clickPayWithPaypal();

    await t
      .typeText(Selector('#email'), 'paypal-regressions-us-cafe@change.org')
      .click(Selector('#btnNext'))
      .typeText(Selector('#password'), 'C#6wg??l')
      .click(Selector('#btnLogin'));
    await clickContinueButtonWithRetry();

    // Repeat
    await clickPayWithPaypal();
    await clickContinueButtonWithRetry();

    // Repeat
    await clickPayWithPaypal();
    await t.click(Selector('[data-testid="submit-button-initial"]')).wait(750);
});

test("Submit form, open window", async () => {
    await t
        .typeText(Selector("#text_1"), "Text 1")
        .typeText(Selector("#text_2"), "Text 2")
        .click(Selector("#click_submit"))
    const child = await t.getCurrentWindow();
    await t
        .expect(Selector("h1").innerText).eql("Example Domain")
        .closeWindow(child)
        .expect(Selector("h1").innerText).eql("This is a Heading");
});
