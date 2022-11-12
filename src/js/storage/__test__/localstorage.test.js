import { save, load } from "../../storage/index.js";
import { logout } from "../../api/auth/logout";

/**
 * Tests localstorage functions, sets localstorage key, checks if it exists
 * also checks that the token does not exist when logging out.
 */
describe("storage", () => {
  it("Saves key to localStorage and can retrieves key from localStorage, logout function works correctly", () => {
    const key = "token";
    const value = ["nr3ig334go5u9y349"];
    const stringifiedValue = JSON.stringify(value);
    save(key, value);
    expect(load(key)).toEqual(value);
    expect(localStorage.getItem(key)).toEqual(stringifiedValue);
    logout();
    expect(localStorage.getItem(key)).toEqual(null);
  });
});
