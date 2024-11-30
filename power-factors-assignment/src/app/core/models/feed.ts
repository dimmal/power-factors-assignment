export interface Feed {
  version: string;
  title: string;
  home_page_url: string;
  feed_url: string;
  description: string;
  next_url: string;
  nullable: boolean;
  id: string;
  next_id: string;
  items: FeedLine[];
}

export interface FeedLine {
  id: string;
  url: string;
  title: string;
  content_text: string;
  date_modified: string;
  nullable: boolean;
  _feed_entry: FeedEntry;
}

export interface FeedEntry {
  uuid: string;
  status: string;
  title: string;
  businessName: string;
  municipal: string;
  sistEndret: string;
}

export interface FeedEntryContent {
  uuid: string;
  sistEndret: string;
  status: string;
  ad_content: FeedAdd;

}

export interface FeedAdd {
  uuid: string;
  published: string;
  expires: string;
  updated: string;
  workLocations: FeedLocation[];
  contactList: FeedContact[];
  title: string;
  description: string;
  sourceurl: string;
  source: string;
  applicationUrl: string;
  applicationDue: string;
  occupationCategories: FeedCategory[];
  categoryList: FeedCategory[];
  jobtitle: string;
  link: string;
  employer: FeedEmployer;
  engagementtype: string;
  extent: string;
  starttime: string;
  positioncount: string;
  nullable: boolean;
  sector: string;
}

export interface FeedLocation {
  country: string;
  address: string;
  city: string;
  postalCode: string;
  county: string;
  municipal: string;
}

export interface FeedContact {
  name: string;
  email: string;
  phone: string;
  role: string;
  title: string;
}

export interface FeedEmployer {
  name: string;
  orgnr: string;
  description: string;
  homepage: string;
}

export interface FeedOccupation {
  level1: string;
  level2: string;
}

export interface FeedCategory {
  categoryType: string;
  code: string;
  name: string;
  description: string;
  score: number;
}