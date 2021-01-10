import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Home {
  readonly id: string;
  readonly MLS: string;
  readonly Street1: string;
  readonly Street2?: string;
  readonly City: string;
  readonly State: string;
  readonly ZipCode: number;
  readonly Neighborhood?: string;
  readonly SalesPrice: number;
  readonly DateListed: string;
  readonly Bedrooms: number;
  readonly Photos?: (string | null)[];
  readonly Bathrooms: number;
  readonly GarageSize: number;
  readonly SquareFeet: number;
  readonly LotSize?: number;
  readonly Description?: string;
  constructor(init: ModelInit<Home>);
  static copyOf(source: Home, mutator: (draft: MutableModel<Home>) => MutableModel<Home> | void): Home;
}