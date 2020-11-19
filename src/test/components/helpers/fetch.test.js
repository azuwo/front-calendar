import {
  fetchSinToken,
  fetchConToken,
} from "../../../components/helpers/fetch";

jest.setTimeout(10000);

describe("test in Fech Helper", () => {
  let token = "";

  test("fetchSinToken should work", async () => {
    const resp = await fetchSinToken(
      "auth",
      { email: "nando@gmail.com", password: "123456" },
      "POST"
    );
    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test("fetchConToken should work ", async () => {
    localStorage.setItem("token", token);

    const resp = await fetchConToken(
      "events/5f9aa8af06a52cc258212ff1",
      {},
      "DELETE"
    );
    const body = await resp.json();

    expect(body.msg).toBe("Event doesnt exist");
  });
});
