import { login } from "../login";

/**
 * user content mock
 */
const BAD_EMAIL = "Jester@gmail.com";
const EMAIL = "Jester@noroff.no";
const PASSWORD = "h83i8y0fvf";

/**
 * mock token
 */
const TOKEN = "hf65ef3je3f73thn78vh89w789";

/**
 * mock user
 */
const user = {
  name: "Tony",
  email: EMAIL,
};

/**
 * Mock fetch to return successful api fetch
 * @returns status fetch success
 */
const fetchSuccess = () => {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve({ ...user, TOKEN }),
  });
};

/**
 * Mock fetch to return failed api fetch
 * @param {number} status contains the error value
 * @param {string} statusText contains the statusText value
 * @returns status fetch failure
 */
const fetchFailure = (status = 404, statusText = "Not Found") => {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
};

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
    expect(PASSWORD.length).toBeGreaterThanOrEqual(8);
    expect(item.email).toMatch("Jester@noroff.no");
    expect(item.name).toMatch("Tony");
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
