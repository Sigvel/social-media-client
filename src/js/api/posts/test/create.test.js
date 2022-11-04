import { createPost } from "../create";

// TODO Make create item mock jest test.
// Create item function creates a new item on the API

const TEST_TITLE = "Mister goodyear";
const BODY = "test body";
const TEST_URL = "https://gomgomjalla.jpg";
const TAGS = "";
const post = {
  title: TEST_TITLE,
  body: BODY,
  media: TEST_URL,
  tags: TAGS,
};

const fetchSuccess = () => {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve({ ...post }),
  });
};

const fetchFailure = (status = 404, statusText = "Not Found") => {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
};

describe("Create posts", () => {
  /**
   * should pass if valid credentials is passed in.
   */
  it("Returns a successfully created post on valid input", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const item = await createPost(TEST_TITLE, BODY, TEST_URL, TAGS);
    expect(item.title).toBeDefined();
    expect(item.body).toEqual(BODY);
    expect(item.tags).toEqual(TAGS);
    expect(item.media).toMatch(/\.(jpg|jpeg|png|webp|avif|gif)(?=\?.+|$)/);
    expect(item).toEqual(post);
  });
  /**
   * Should pass if credential does not meet the requirements
   */
  it("Returns undefined when an HTTP 404 error is received", async () => {
    global.fetch = jest.fn(() => fetchFailure());
    await expect(createPost(212, [])).rejects.toThrow("Not Found");
  });
});
