function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
async function mockApiResponse(location: string): Promise<Response> {
  switch (location) {
    // positive case
    case "london":
      return new Response(
        JSON.stringify({ available: 1, humidity: 5, temperature: 20 })
      );
    // invalid schema case
    case "newyork":
      return new Response(JSON.stringify({ available: 1 }));
    // loading data from client case
    case "delhi":
      await delay(2000);
      return new Response(
        JSON.stringify({ available: 1, humidity: 10, temperature: 30 })
      );
    // network error case
    case "istanbul":
      return new Response(JSON.stringify({ available: 0 }), {
        status: 502,
        statusText: "Server timed out",
      });
    // data unavailable case
    case "mumbai":
      return new Response(JSON.stringify({ available: 0 }));
    default:
      return new Response(JSON.stringify({ available: 0 }));
  }
}

export { mockApiResponse };
