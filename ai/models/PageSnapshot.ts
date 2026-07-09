export interface ImageSnapshot {

    alt: string;

    src: string;

}

export interface PageSnapshot {

    name: string;

    url: string;

    title: string;

    html: string;

    headings: string[];

    links: string[];

    buttons: string[];

    forms: string[];

    images: ImageSnapshot[];

}