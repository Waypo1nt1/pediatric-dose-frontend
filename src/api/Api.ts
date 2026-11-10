/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SchemesDrugDose {
  drug_dose_name?: string;
  id?: number;
  image_url?: string;
  is_creator?: number;
  likes_count?: number;
  max_daily_dose_mg?: number;
  recommended_adult_dose_mg?: number;
  short_info?: string;
  video_url?: string;
}

export interface SchemesDrugDoseFeed {
  drug_dose_name?: string;
  id?: number;
  image_url?: string;
  is_creator?: number;
  is_liked?: number;
  likes_count?: number;
  max_daily_dose_mg?: number;
  recommended_adult_dose_mg?: number;
  short_info?: string;
  video_url?: string;
}

export interface SchemesLikeDrugDoseRequest {
  value: 0 | 1;
}

export interface SchemesLoginUserRequest {
  login: string;
  password: string;
}

export interface SchemesLoginUserResponse {
  access_token?: string;
  expires_in?: number;
  id?: number;
  is_moderator?: boolean;
  login?: string;
  token_type?: string;
}

export interface SchemesPublishDrugDoseRequest {
  max_daily_dose_mg: number;
  recommended_adult_dose_mg: number;
  /** @maxLength 500 */
  short_info: string;
}

export interface SchemesRegisterUserRequest {
  /** @maxLength 25 */
  login: string;
  /** @maxLength 100 */
  password: string;
}

export interface SchemesUser {
  id?: number;
  login?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Расчёт детской дозы препарата
 * @version 1.0
 * @baseUrl http://localhost:8080/api
 * @contact
 *
 * Веб-сервис доз препаратов: каталог, лента, черновик, публикация, лайки и пользователи
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  drugDoses = {
    /**
     * @description Опубликованные дозы препаратов с фильтром по взрослой дозе. Доступно без авторизации
     *
     * @tags Услуги
     * @name DrugDosesList
     * @summary Список доз препаратов
     * @request GET:/drug_doses
     */
    drugDosesList: (
      query?: {
        /** Нижняя граница взрослой дозы, мг */
        min_adult_dose?: number;
        /** Верхняя граница взрослой дозы, мг */
        max_adult_dose?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemesDrugDose[], void>({
        path: `/drug_doses`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Создаёт черновик текущего пользователя и грузит изображение и видео в хранилище
     *
     * @tags Услуги
     * @name DrugDosesCreate
     * @summary Добавление дозы препарата
     * @request POST:/drug_doses
     * @secure
     */
    drugDosesCreate: (
      data: {
        /** Наименование препарата */
        drug_dose_name: string;
        /**
         * Изображение
         * @format binary
         */
        image: File;
        /**
         * Видео
         * @format binary
         */
        video: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemesDrugDose, void>({
        path: `/drug_doses`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Черновик текущего пользователя
     *
     * @tags Услуги
     * @name DrugDoseDraftDetail
     * @summary Черновик дозы препарата
     * @request GET:/drug_doses/draft
     * @secure
     */
    drugDoseDraftDetail: (params: RequestParams = {}) =>
      this.request<SchemesDrugDose, void>({
        path: `/drug_doses/draft`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Без ид отдаёт первую опубликованную дозу, с ид - указанную, с next=true - следующую за ней. Поле is_liked показывает, лайкнул ли её текущий пользователь. Доступно без авторизации
     *
     * @tags Услуги
     * @name DrugDoseFeedDetail
     * @summary Лента доз препаратов
     * @request GET:/drug_doses/feed/{drug_dose_id}
     */
    drugDoseFeedDetail: (
      drugDoseId?: number,
      query?: {
        /** Получить следующую дозу препарата */
        next?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<SchemesDrugDoseFeed, void>({
        path: `/drug_doses/feed/${drugDoseId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Заполняет описание и дозы и переводит черновик текущего пользователя в опубликованные
     *
     * @tags Услуги
     * @name DrugDosePublishUpdate
     * @summary Публикация дозы препарата
     * @request PUT:/drug_doses/publish
     * @secure
     */
    drugDosePublishUpdate: (
      request: SchemesPublishDrugDoseRequest,
      params: RequestParams = {},
    ) =>
      this.request<SchemesDrugDose, void>({
        path: `/drug_doses/publish`,
        method: "PUT",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Логическое удаление своей дозы препарата, статус меняется на deleted
     *
     * @tags Услуги
     * @name DrugDosesDelete
     * @summary Удаление дозы препарата
     * @request DELETE:/drug_doses/{drug_dose_id}
     * @secure
     */
    drugDosesDelete: (drugDoseId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/drug_doses/${drugDoseId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Значение 1 ставит лайк, 0 убирает
     *
     * @tags Услуги
     * @name DrugDoseLikeCreate
     * @summary Лайк дозы препарата
     * @request POST:/drug_doses/{drug_dose_id}/like
     * @secure
     */
    drugDoseLikeCreate: (
      drugDoseId: number,
      request: SchemesLikeDrugDoseRequest,
      params: RequestParams = {},
    ) =>
      this.request<SchemesDrugDose, void>({
        path: `/drug_doses/${drugDoseId}/like`,
        method: "POST",
        body: request,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Проверяет логин и пароль и возвращает JWT для заголовка Authorization
     *
     * @tags Пользователь
     * @name LoginCreate
     * @summary Аутентификация
     * @request POST:/users/login
     */
    loginCreate: (
      request: SchemesLoginUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<SchemesLoginUserResponse, void>({
        path: `/users/login`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Кладёт текущий токен в чёрный список Redis до конца его срока жизни
     *
     * @tags Пользователь
     * @name LogoutCreate
     * @summary Деавторизация
     * @request POST:/users/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Создаёт пользователя, пароль хранится хешем
     *
     * @tags Пользователь
     * @name RegisterCreate
     * @summary Регистрация
     * @request POST:/users/register
     */
    registerCreate: (
      request: SchemesRegisterUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<SchemesUser, void>({
        path: `/users/register`,
        method: "POST",
        body: request,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
