interface FetchWrapperDefaults {
  appRoot?: string;
  queryParameters?: Object;
  headers?: Object;
  defaultErrorHandler?:
    | ((
        err: Error,
        resolve: (value: any) => void,
        reject: (reason?: any) => void
      ) => void)
    | null;
  defaultResponseParser?: ((r: Response) => Promise<any>) | null;
  corsMode?: "cors" | "no-cors";
  credentials?: "include" | "omit" | "same-origin";
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

let defaultQueryParameters: Object = {};
let defaultHeaders: Object = {};
let defaultAppRoot: string = "";
let defaultErrorHandler:
  | ((
      err: Error,
      resolve: (value: any) => void,
      reject: (reason?: any) => void
    ) => void)
  | null = null;
let defaultResponseParser: ((r: Response) => Promise<any>) | null = null;
let corsMode: RequestMode = "cors";
let credentials: RequestCredentials = "include";

const setHeaders = (headers: Headers, toSet?: any): void => {
  Object.keys(toSet ?? {}).forEach((k) => {
    const h: any = toSet[k];

    headers.set(k, h instanceof Function ? h() : h);
  });
};

const addQueryParameters = (url: string, parameters?: any): string => {
  if (!url || !parameters) return url;

  Object.keys(parameters).forEach((k: string) => {
    let p = parameters[k];
    let v = p instanceof Function ? p() : p;
    v = typeof v === "object" ? JSON.stringify(v) : v;
    let c = url.indexOf("?") >= 0 ? "&" : "?";
    url += `${c}${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
  });

  return url;
};

const prepareBodyWithFile = (body: any): any => {
  // if with file is passed, withBody should be sent through without stringifying
  // TODO: Determine whether a body has to be sent or if it can be omitted
  return body;
};

const buildFetch = (fw: FetchWrapper): Promise<any> => {
  return new Promise(
    (resolve: (value: any) => void, reject: (reason?: any) => void) =>
      fetch(
        `${defaultAppRoot}${addQueryParameters(
          fw.url,
          defaultQueryParameters
        )}`,
        {
          mode: corsMode,
          method: fw.method,
          headers: (() => {
            const headers = new Headers();

            setHeaders(headers, defaultHeaders);
            setHeaders(headers, fw.headers);

            return headers;
          })(),
          credentials: credentials,
          body: fw.body
            ? JSON.stringify(fw.body)
            : fw.data
            ? prepareBodyWithFile(fw.data)
            : null,
        }
      )
        .then((r: Response) => {
          return defaultResponseParser
            ? defaultResponseParser(r)
            : new Promise((_resolve: (value: any) => void) => _resolve(r));
        })
        .then((r: any) => resolve(r))
        .catch((err: Error) =>
          defaultErrorHandler
            ? defaultErrorHandler(err, resolve, reject)
            : reject(err)
        )
  );
};

/**
 * A wrapper for fetch calls providing a composable API.
 */
export class FetchWrapper {
  url: string;
  headers: Object;
  body: any;
  data: Object | null;
  method: Method;

  constructor(url: string) {
    this.url = url;
    this.headers = {};
    this.data = null;
    this.method = "GET";
  }

  cleanUrl = (values?: any) => {
    Object.keys(values ?? {}).forEach((k) => {
      let v = values[k];
      this.url = this.url.replace(`{${k}}`, v);
    });

    return this;
  };

  withHeaders = (headers: Object) => {
    this.headers = headers;

    return this;
  };

  withBody = (body: any) => {
    this.body = body;

    return this;
  };

  withFormData = (data: Object) => {
    this.data = data;

    return this;
  };

  withQueryParameters = (parameters: Object) => {
    this.url = addQueryParameters(this.url, parameters);

    return this;
  };

  get = (): Promise<any> => {
    this.method = "GET";

    return buildFetch(this);
  };

  post = (): Promise<any> => {
    this.method = "POST";

    return buildFetch(this);
  };

  put = (): Promise<any> => {
    this.method = "PUT";

    return buildFetch(this);
  };

  delete = (): Promise<any> => {
    this.method = "DELETE";

    return buildFetch(this);
  };

  patch = (): Promise<any> => {
    this.method = "PATCH";

    return buildFetch(this);
  };
}

/**
 * Goes to the specified url and performs a fetch.
 * @param {string} url The url to go fetch from
 * @returns {FetchWrapper} A FetchWrapper object to compose the call with
 */
const goFetch = (url: string): FetchWrapper => new FetchWrapper(url);

/**
 * Configures default settings for the GoFetch library.
 * @param {Object} defaults The defaults to configure the library with
 * @param {string} defaults.appRoot The default root for the fetch calls
 * @param {Object} defaults.queryParameters The default query parameters to be applied to all fetch calls
 * @param {Object} defaults.headers The default headers to be applied to all fetch calls
 */
const configureGoFetch = (defaults: FetchWrapperDefaults): void => {
  if (defaults.appRoot !== undefined) defaultAppRoot = defaults.appRoot;
  if (defaults.queryParameters !== undefined)
    defaultQueryParameters = defaults.queryParameters;
  if (defaults.headers !== undefined) defaultHeaders = defaults.headers;
  if (defaults.defaultErrorHandler !== undefined)
    defaultErrorHandler = defaults.defaultErrorHandler;
  if (defaults.defaultResponseParser !== undefined)
    defaultResponseParser = defaults.defaultResponseParser;
  if (defaults.corsMode !== undefined) corsMode = defaults.corsMode;
  if (defaults.credentials !== undefined) credentials = defaults.credentials;
};

const contentTypes = {
  json: "application/json",
  html: "text/html",
  text: "text/plain",
  xml: "text/xml",
  encodedForm: "application/x-www-form-urlencoded",
  multipartForm: "multipart/form-data",
  pdf: "application/pdf",
};

export { goFetch, configureGoFetch, contentTypes };
