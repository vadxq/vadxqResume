import axios from 'axios';
import chalk from "chalk";

const instance = axios.create({
  timeout: 10000
});

instance.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    return config;
  },
  (error: any) => {
    // do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (!error.response || !error.response.status) {
      console.log(chalk.red(`Network Error!`));
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 401:
        console.log(
          chalk.red(`401 Unauthorized!\n\n`)
        );
        break;
      case 403:
        console.log(
          chalk.red(
            `403 Forbidden!\n`
          )
        );
        break;
      case 404:
        console.log(
          chalk.red(
            `404 Not found!\n`
          )
        );
        break;
      default:
        console.log(chalk.red(`network is error!\n`));
        break;
    }
    return Promise.reject(error);
  }
);

export default instance;