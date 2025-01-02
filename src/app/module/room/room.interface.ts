export enum TRoomType {
  Single = "Single",
  Double = "Double",
  Suite = "Suite",
  Deluxe = "Deluxe",
  Family = "Family",
  Twin = "Twin",
  Studio = "Studio",
  Presidential = "Presidential",
  Accessible = "Accessible",
}

export enum TAmenity {
  WiFi = "WiFi",
  TV = "TV",
  AirConditioning = "Air Conditioning",
  MiniBar = "Mini-bar",
  RoomService = "Room Service",
  SwimmingPool = "Swimming Pool",
  Gym = "Gym",
  Parking = "Parking",
  PetFriendly = "Pet Friendly",
}

export type TDateRange = {
  start: Date;
  end: Date;
};

export type TRoom = {
  roomName: string;
  roomNumber: number;
  type: TRoomType;
  description: string;
  pricePerNight: number;
  amenities: TAmenity[];
  capacity: number;
  isAvailable: boolean;
  images: string[];
  isDeleted: boolean;
  bookedDates: TDateRange[];
  floorNumber?: number;
};
