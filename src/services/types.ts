export type Url = {
  id: string;
  longUrl: string;
  password?: string;
  alias?: string;
  createdAt: string;
  expiry?: string;
};

export type UrlNoId = Omit<Url, "id">;
