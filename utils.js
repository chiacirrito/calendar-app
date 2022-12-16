const c = (el) => document.createElement(el);

const q = (el) => document.querySelector(el);

const GET = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

const POST = async (url, body) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const DELETE = async (URL) => {
  return await fetch(`${URL}`, {
    method: "DELETE",
  });
};

const PATCH = async (URL, body) => {
  return await fetch(`${URL}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export { c, q, GET, POST, DELETE, PATCH };
