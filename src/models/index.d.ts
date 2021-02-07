import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Site {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Site>);
  static copyOf(source: Site, mutator: (draft: MutableModel<Site>) => MutableModel<Site> | void): Site;
}