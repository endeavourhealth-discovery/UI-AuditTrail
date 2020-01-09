import { ApplicationPolicyAttribute } from "./ApplicationPolicyAttribute";
export declare class Project {
    uuid: string;
    name: string;
    leadUser: string;
    technicalLeadUser: string;
    consentModelId: number;
    deidentificationLevel: number;
    projectTypeId: number;
    securityInfrastructureId: number;
    ipAddress: string;
    summary: string;
    businessCase: string;
    objectives: string;
    securityArchitectureId: number;
    storageProtocolId: number;
    publishers: {
        [key: string]: string;
    };
    subscribers: {
        [key: string]: string;
    };
    basePopulation: {
        [key: string]: string;
    };
    dataSet: {
        [key: string]: string;
    };
    dsas: {
        [key: string]: string;
    };
    applicationPolicyAttributes: ApplicationPolicyAttribute[];
}
