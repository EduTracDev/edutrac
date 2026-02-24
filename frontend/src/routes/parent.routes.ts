const home = "/parent";

export enum ParentRoutes {
  root = home,
  dashboard = `${root}/dashboard`,
  children = `${root}/children`,
  attendance = `${root}/attendance`,
  messages = `${root}/messages`,
  settings = `${root}/settings`,
  profile = `${root}/profile`,
}
