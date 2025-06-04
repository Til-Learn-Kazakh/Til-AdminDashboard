class AdminPages {
  private readonly baseUrl = "/admin";

  DASHBOARD = `${this.baseUrl}/dashboard`;
  CALENDAR = `${this.baseUrl}/calendar`;
  PROFILE = `${this.baseUrl}/profile`;
  FORMS_ELEMENTS = `${this.baseUrl}/forms/form-elements`;
  FORMS_LAYOUT = `${this.baseUrl}/forms/form-layout`;
  TABLES = `${this.baseUrl}/tables`;
  COMPANY_USERS = `${this.baseUrl}/company-users`;
  USERS = `${this.baseUrl}/users`;
  SETTINGS = `${this.baseUrl}/settings`;
  SECTION = `${this.baseUrl}/section`;
  UNIT = `${this.baseUrl}/unit`;
  TASK = `${this.baseUrl}/task`;
  CHARTS = `${this.baseUrl}/charts/basic-chart`;
  ALERTS = `${this.baseUrl}/ui-elements/alerts`;
  BUTTONS = `${this.baseUrl}/ui-elements/buttons`;
}

class AuthPages {
  private readonly baseUrl = "/auth";

  LOGIN = `${this.baseUrl}/login`;
  SIGNUP = `${this.baseUrl}/signup`;
}

class PrimaryPages {
  private readonly baseUrl = "/";

  HOME = `${this.baseUrl}`;
}

export const ADMIN_PAGES = new AdminPages();
export const AUTH_PAGES = new AuthPages();
export const PRIMARY_PAGES = new PrimaryPages();
