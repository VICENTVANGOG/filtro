import { ILogin, ILoginResponse } from "../model/ILogin"

export class PageController {
  url: string
  constructor(url: string) {
    this.url = url
  }

  async login(data: ILogin, endpoint: string): Promise<ILoginResponse> {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log(response.status)

    const token: ILoginResponse = await response.json()

    return token;
  }

}