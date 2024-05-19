type Props = {
  email: string;
  password: string;
};
type Credential = {
  email: string;
  password: string;
};

const LS_CREDENTIAL_KEY = '202405062139';
const MSG_ERR_NO_KEY = 'check for ".env" file and "LS_CREDENTIAL_KEY" key';
const MSG_ERR_NO_DATA = 'no data';
const MSG_OK = 'ok';

export class LStorage {
  public saveCredentials({ email, password }: Props): Promise<string> {
    try {
      if (!LS_CREDENTIAL_KEY) return Promise.reject(MSG_ERR_NO_KEY);
      const str = JSON.stringify({ email, password });
      const encryptedStr = this.encode(str);
      localStorage.setItem(LS_CREDENTIAL_KEY, encryptedStr);
      localStorage.setItem('logged', 'true');
      return Promise.resolve(MSG_OK);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public getCredentials(): Promise<Credential | string> {
    try {
      if (!LS_CREDENTIAL_KEY) return Promise.reject(MSG_ERR_NO_KEY);
      const encData = localStorage.getItem(LS_CREDENTIAL_KEY);
      if (!encData) return Promise.reject(MSG_ERR_NO_DATA);
      const data = this.decode(encData);
      return Promise.resolve(JSON.parse(data));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public resetCredentials(): Promise<string> {
    if (!LS_CREDENTIAL_KEY) return Promise.reject(MSG_ERR_NO_KEY);
    localStorage.removeItem(LS_CREDENTIAL_KEY);
    return Promise.resolve(MSG_OK);
  }

  private encode = (str: string) => btoa(str);

  private decode = (str: string) => atob(str);
}
