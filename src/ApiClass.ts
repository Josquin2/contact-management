export class Api {
  protected readonly url: string;

  constructor() {
    this.url = "something";
  }

  private async request(
    method: string,
    endpoint: string,
    body?: object
  ): Promise<any> {
    try {
      const response = await fetch(`${this.url}/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(
          `Error making ${method.toUpperCase()} request: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        `Error making ${method.toUpperCase()} request: ${
          (error as Error).message
        }`
      );
    }
  }

  async getObjects(endpoint: string): Promise<any> {
    return this.request("GET", endpoint);
  }

  async post(endpoint: string, body: object): Promise<any> {
    return this.request("POST", endpoint, body);
  }

  async put(endpoint: string, body: object): Promise<any> {
    return this.request("PUT", endpoint, body);
  }

  async delete(endpoint: string, body: object): Promise<any> {
    return this.request("DELETE", endpoint, body);
  }
}
