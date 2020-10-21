import { t, Selector } from 'testcafe';

fixture("Some test").page("localhost:4000")

test("Click button", async () => {
    await t.click(Selector("#click_me")).expect(Selector("#heading").innerText).eql("This is a Heading");

})

test("Click button 2", async () => {
    await t.click(Selector("#click_me")).expect(Selector("#heading").innerText).eql("This is a Heading");

})

test("Click button 3", async () => {
    await t.click(Selector("#click_me")).expect(Selector("#heading").innerText).eql("This is a Heading");

})