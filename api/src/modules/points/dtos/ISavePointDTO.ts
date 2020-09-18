export default interface ISavePointDTO {
  id: string;
  name: string;
  address: {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    latitude: string;
    longitude: string;
    complement: string;
  };
}
