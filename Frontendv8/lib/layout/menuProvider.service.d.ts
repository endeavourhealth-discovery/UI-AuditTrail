import { MenuOption } from './models/MenuOption';
export declare abstract class AbstractMenuProvider {
    abstract getClientId(): string;
    abstract getMenuOptions(): MenuOption[];
    abstract getApplicationTitle(): string;
}
