export class Activity {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  pathImage?: string;
  city: string;
  interest: string;
  image: any;
  address: string;
  metadataImage: {
    filename: string;
    mimeType: string;
    data: string;
  };
}
