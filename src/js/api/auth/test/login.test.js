import { login } from "../login";

// TODO Make login mock jest test,
// login function returns valid token when provided with valid credentials. ?

// Login test items
const TOKEN = "hf65ef3je3f73thn78vh89w789";
const BAD_EMAIL = "Jester@gmail.com";
const EMAIL = "Jester@noroff.no";
const PASSWORD = "h83i8y0fvf";

const user = {
  name: "tony",
  email: EMAIL,
};

const fetchSuccess = () => {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve({ ...user, TOKEN }),
  });
};

const fetchFailure = (status = 404, statusText = "Not Found") => {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
};

// Login function does not provide undefined/null return on bad input

/**
 * Test if the login post function returns valid token or not
 */
describe("Login", () => {
  /**
   * should pass if valid credentials is passed in.
   */
  it("Returns a valid token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const item = await login(EMAIL, PASSWORD);
    expect(EMAIL).toMatch("@noroff.no");
    expect(PASSWORD.length).toBeGreaterThanOrEqual(8);
    expect(item.TOKEN).toEqual(TOKEN);
  });
  /**
   * Should pass if credential does not meet the requirements
   */
  it("Returns undefined when an HTTP 404 error is received", async () => {
    global.fetch = jest.fn(() => fetchFailure());
    await expect(login(BAD_EMAIL, PASSWORD)).rejects.toThrow("Not Found");
  });
});
