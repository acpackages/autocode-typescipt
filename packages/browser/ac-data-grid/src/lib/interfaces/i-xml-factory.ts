export interface IAcDGXmlElement {
    name: string;
    properties?: XmlAttributes;
    children?: XmlElement[];
    textNode?: string | null;
}

export interface IAcDGHeaderElement {
    [key: string]: string | undefined;
    version?: string;
    standalone?: string;
    encoding?: string;
}

export interface IAcDGXmlAttributes {
    prefixedAttributes?: PrefixedXmlAttributes[];
    rawMap?: any;
}

export interface IAcDGPrefixedXmlAttributes {
    prefix: string;
    map: any;
}
