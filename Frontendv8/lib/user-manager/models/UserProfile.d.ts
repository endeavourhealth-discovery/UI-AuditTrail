import { Region } from "./Region";
import { UserOrganisationProject } from "./UserOrganisationProject";
export declare class UserProfile {
    uuid: string;
    username: string;
    forename: string;
    surname: string;
    email: string;
    mobile: string;
    photo: string;
    region: Region;
    organisationProjects: UserOrganisationProject[];
}
