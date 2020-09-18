export default interface ICreatePointDTO {
  name: string;
  address: {
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
