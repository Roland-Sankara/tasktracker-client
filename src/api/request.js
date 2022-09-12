const request = (endpoint, method, values) => {
  const apiUrl = `https://tasktracker-api.herokuapp.com/api/v1${endpoint}`;

  return fetch(apiUrl, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: values ? JSON.stringify(values) : null,
  })
    .then((res) => {
      if (!res.ok)
        throw new Error("Failed to fetch");
      return res.json();
    })
    .catch((error) => {
      return error;
    });
};

export { request };
