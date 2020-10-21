import { t, Selector } from 'testcafe';

fixture("Some test").page("localhost:4000")

test("Click link to open window", async () => {
    await t.click(Selector("#click_link"));
    const child = await t.getCurrentWindow();
    await t.closeWindow(child);
});

test("Click link within iFrame to open window", async () => {
    const buttonIframe = Selector('#smart-button-container iframe');
    const payWithPaypalButton = Selector('[data-funding-source="paypal"]');
    const parent = await t.getCurrentWindow();
    console.log(parent);
    await t
        .switchToIframe(buttonIframe)
        .expect(payWithPaypalButton.with({ visibilityCheck: true }).exists)
        .ok({ timeout: 40000 })
        .hover(payWithPaypalButton)
        .click(payWithPaypalButton)
        .switchToMainWindow();
    await t.wait(2000);
    const child = await t.getCurrentWindow();
    console.log(child);
    await t.closeWindow(child);
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
