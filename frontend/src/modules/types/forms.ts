export interface AnnouncementFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
}
export interface AnnouncementFormElement extends HTMLFormElement {
  readonly elements: AnnouncementFormElements;
}

export interface ClassFormElements extends HTMLFormControlsCollection {
  className: HTMLInputElement;
  category: HTMLSelectElement;
}
export interface ClassFormElement extends HTMLFormElement {
  readonly elements: ClassFormElements;
}
